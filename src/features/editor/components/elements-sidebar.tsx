import { ScrollArea } from "@/components/ui/scroll-area";
import ElementsSidebarHeader from "@/features/editor/components/elements-sidebar-header";
import Shape from "@/features/editor/components/shape";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import { SelectedTool } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { Circle, Diamond, Square, Triangle } from "lucide-react";
import React from "react";

type Props = {
  selectedTool: SelectedTool;
  onChangeSelectedTool: (tool: SelectedTool) => void;
};

const ElementsSidebar = ({ selectedTool, onChangeSelectedTool }: Props) => {
  return (
    <aside
      className={cn(
        "bg-neutral-800 shadow z-50 w-90 h-full flex flex-col relative",
        selectedTool === "shapes" ? "visible" : "hidden"
      )}
    >
      <ElementsSidebarHeader title="Shapes" />
      <ScrollArea className="whitespace-nowrap">
        <div className="flex w-max space-x-2 p-4">
          <Shape onClick={() => {}} icon={Square} />
          <Shape onClick={() => {}} icon={Circle} />
          <Shape onClick={() => {}} icon={Triangle} />
          <Shape onClick={() => {}} icon={Triangle} className="rotate-180" />
          <Shape onClick={() => {}} icon={Diamond} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={() => onChangeSelectedTool("select")} />
    </aside>
  );
};

export default ElementsSidebar;
