import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";

type Props = {
  onClick: () => void;
};

const ToolSidebarClose = ({ onClick }: Props) => {
  return (
    <Button
      variant={"outline"}
      size={"icon"}
      onClick={onClick}
      className="absolute -right-10 rounded-full top-2 border-none"
    >
      <X />
    </Button>
  );
};

export default ToolSidebarClose;
