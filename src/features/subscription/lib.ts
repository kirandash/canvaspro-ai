import { subscriptions } from "@/db/schema";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const checkIsActive = (
  subscription: typeof subscriptions.$inferSelect
) => {
  let active = false;

  if (
    subscription &&
    subscription.stripePriceId &&
    subscription.currentPeriodEnd
  ) {
    active = subscription.currentPeriodEnd.getTime() + DAY_IN_MS > Date.now();
  }

  return active;
};
