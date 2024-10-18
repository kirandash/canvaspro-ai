"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSubscriptionDialog } from "@/features/subscription/store/use-subscription-dialog";

export const SubscriptionDialog = () => {
  const { isOpen, onClose } = useSubscriptionDialog();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{"Subscribe to Premium"}</DialogTitle>
          <DialogDescription>
            <p>Upgrade to premium to unlock advanced features:</p>
            <ul className="list-disc pl-4 mt-1">
              <li>Premium Templates</li>
              <li>AI Image generation</li>
              <li>AI based Image background removal</li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"secondary"} onClick={() => {}}>
            Subscribe
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
