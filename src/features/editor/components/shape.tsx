import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";
import { IconType } from "react-icons";

type Props = {
  onClick: () => void;
  icon: LucideIcon | IconType;
  className?: string;
};

const Shape = ({ onClick, icon: Icon, className }: Props) => {
  return (
    <Button
      onClick={onClick}
      variant={"ghost"}
      className="p-0 bg-transparent hover:bg-transaprent size-14"
    >
      <Icon className={cn("size-full fill-white stroke-white", className)} />
    </Button>
  );
};

export default Shape;
