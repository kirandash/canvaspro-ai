"use client";

import { SubscriptionDialog } from "@/features/subscription/components/subscription-dialog";
import { useEffect, useState } from "react";

// This component is used to render the dialog components in the app
export const Dialogs = () => {
  // Important: This is a workaround to prevent the dialog from rendering on the server because the dialog uses zustand and it might cause some hydration issues if it's rendered on the server
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <SubscriptionDialog />;
};
