import { useFetchSubscription } from "@/features/subscription/api/use-fetch-subscription";
import { useSubscriptionDialog } from "@/features/subscription/store/use-subscription-dialog";

export const usePaywall = () => {
  const subscriptionDialog = useSubscriptionDialog();
  const { data: subscription, isLoading: isLoadingSubscription } =
    useFetchSubscription();

  const shouldShowPaywall = !subscription?.active;

  return {
    isLoading: isLoadingSubscription,
    shouldShowPaywall,
    triggerPaywall: () => {
      {
        subscriptionDialog.onOpen();
      }
    },
  };
};
