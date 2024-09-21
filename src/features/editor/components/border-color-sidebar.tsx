import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ColorPicker } from "@/features/editor/components/color-picker";
import ElementsSidebarHeader from "@/features/editor/components/elements-sidebar-header";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import { STROKE_COLOR } from "@/features/editor/constants";
import { Editor, SelectedTool } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  selectedTool: SelectedTool;
  onChangeSelectedTool: (tool: SelectedTool) => void;
  editor: Editor | undefined;
};

const BorderColorSidebar = ({
  selectedTool,
  onChangeSelectedTool,
  editor,
}: Props) => {
  const color = editor?.getActiveObjectStrokeColor() ?? STROKE_COLOR;
  const onChange = (color: string) => {
    editor?.addStrokeColor(color);
  };

  return (
    <aside
      className={cn(
        "bg-neutral-800 shadow z-50 w-90 h-full flex flex-col relative",
        selectedTool === "stroke-color" ? "visible" : "hidden"
      )}
    >
      <ElementsSidebarHeader title="Border Color" />
      <ScrollArea className="whitespace-nowrap">
        <div className="flex w-max space-x-2 p-4">
          <ColorPicker color={color} onChange={onChange} />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <ToolSidebarClose onClick={() => onChangeSelectedTool("select")} />
    </aside>
  );
};

export default BorderColorSidebar;
