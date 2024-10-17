import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

import Link from "next/link";

export type HomePrimarySidebarItemProps = {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
};

export const HomePrimarySidebarItem = ({
  icon: Icon,
  href,
  label,
  isActive,
  onClick,
}: HomePrimarySidebarItemProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "px-2 py-3 flex items-center text-stone-300 flex-col gap-1 w-full !h-full aspect-video",
        buttonVariants({ variant: "ghost" })
      )}
    >
      <Icon
        className={cn("shrink-0", isActive ? "stroke-cyan-600  rounded" : "")}
      />
      <span className="text-xs">{label}</span>
    </Link>
  );
};
