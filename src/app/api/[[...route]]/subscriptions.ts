import { db } from "@/db/drizzle";
import { subscriptions } from "@/db/schema";
import { checkIsActive } from "@/features/subscription/lib";
import { stripe } from "@/lib/stripe";
import { verifyAuth } from "@hono/auth-js";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import Stripe from "stripe";

const app = new Hono()
  .post("/billing-portal", verifyAuth(), async (c) => {
    const auth = c.get("authUser");

    if (!auth.token?.id || typeof auth.token.id !== "string") {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, auth.token.id));

    if (!subscription) {
      return c.json({ error: "Subscription not found" }, 404);
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_URL}`,
    });

    if (!session.url) {
      return c.json({ error: "Failed to create session" }, 400);
    }

    return c.json({ data: session.url });
  })
  .get("/current", verifyAuth(), async (c) => {
    const auth = c.get("authUser");

    if (!auth.token?.id || typeof auth.token.id !== "string") {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, auth.token.id));

    const active = checkIsActive(subscription);

    return c.json({
      data: {
        ...subscription,
        active,
      },
    });
  })
  .post("/checkout", verifyAuth(), async (c) => {
    const auth = c.get("authUser");

    if (!auth.token?.id || typeof auth.token.id !== "string") {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_URL}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}?canceled=true`,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: auth.token.email || undefined,
      // to configure which products are available for purchase
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      // this is the metadata using which stripes webhook will identify which user made the purchase and send the update to that user
      metadata: {
        userId: auth.token.id,
      },
    });

    console;

    const url = session.url;

    if (!url) {
      return c.json({ error: "Failed to create session" }, 400);
    }

    return c.json({ data: url });
  })
  .post("/webhook", async (c) => {
    const body = await c.req.text();
    const signature = c.req.header("Stripe-Signature") as string;

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      return c.json({ error: "Stripe webhook secret is not set" }, 400);
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return c.json({ error: "Webhook signature verification failed" }, 400);
    }

    const session = event.data.object as Stripe.Checkout.Session;

    // This will be called when the checkout session is completed
    if (event.type === "checkout.session.completed") {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      if (!session?.metadata?.userId) {
        return c.json({ error: "Invalid session" }, 400);
      }

      await db.insert(subscriptions).values({
        status: subscription.status,
        userId: session.metadata.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Update db when payment is successful - this is called when there is an update
    if (event.type === "invoice.payment_succeeded") {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      if (!session?.metadata?.userId) {
        return c.json({ error: "Invalid session" }, 400);
      }

      await db
        .update(subscriptions)
        .set({
          status: subscription.status,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          updatedAt: new Date(),
        })
        .where(eq(subscriptions.userId, subscription.id));
    }

    // It's important to return a 200 status code to Stripe to confirm that the webhook was received correctly.
    // Warning: if you don't pass then stripe might assume that you have an error. And multiple errors might cause your webhook to be disabled or locked
    return c.json(null, 200);
  });

export default app;
