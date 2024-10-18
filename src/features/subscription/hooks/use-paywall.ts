import { useSubscriptionDialog } from "@/features/subscription/store/use-subscription-dialog";

export const usePaywall = () => {
  const subscriptionDialog = useSubscriptionDialog();

  const shouldShowPaywall = true;

  return {
    isLoading: false,
    shouldShowPaywall,
    triggerPaywall: () => {
      {
        subscriptionDialog.onOpen();
      }
    },
  };
};
