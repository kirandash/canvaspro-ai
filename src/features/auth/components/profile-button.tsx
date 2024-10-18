"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBillingPortal } from "@/features/subscription/api/use-billing-portal";
import { usePaywall } from "@/features/subscription/hooks/use-paywall";
import { LoaderPinwheel } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const ProfileButton = () => {
  const session = useSession();
  const billingPortalMutation = useBillingPortal();
  const { shouldShowPaywall, triggerPaywall, isLoading } = usePaywall();

  if (session.status === "loading") {
    return <LoaderPinwheel className="animate-spin h-[38px] w-[38px]" />;
  }

  if (session.status === "unauthenticated" || !session.data) {
    return null;
  }

  const handleClick = () => {
    if (shouldShowPaywall) {
      triggerPaywall();
      return;
    }
    billingPortalMutation.mutate();
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar className="border border-zinc-500 cursor-pointer">
          <AvatarImage
            src={session.data.user?.image ?? "https://github.com/shadcn.png"}
          />
          <AvatarFallback>
            {session.data.user?.name?.charAt(0).toUpperCase() ?? ""}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-32 sm:min-w-80 max-w-32 sm:max-w-80"
      >
        <DropdownMenuItem
          className="cursor-pointer"
          disabled={isLoading}
          onClick={() => handleClick()}
        >
          Purchase history
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
