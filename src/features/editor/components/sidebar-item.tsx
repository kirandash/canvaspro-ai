import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
};

export const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
  onClick,
  disabled,
}: SidebarItemProps) => {
  return (
    <Button
      onClick={onClick}
      variant={"ghost"}
      className={
        "flex items-center px-2 py-3 text-stone-300 flex-col gap-1 w-full h-full aspect-video"
      }
      disabled={disabled}
    >
      <Icon
        className={cn("shrink-0", isActive ? "stroke-cyan-600  rounded" : "")}
      />
      <span className="text-xs">{label}</span>
    </Button>
  );
};
