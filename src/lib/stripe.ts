import Stripe from "stripe";

const accessKey = process.env.STRIPE_SECRET_KEY;
if (!accessKey) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(accessKey, {
  apiVersion: "2024-09-30.acacia",
  typescript: true,
});
