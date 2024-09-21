import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import ElementsSidebarHeader from "@/features/editor/components/elements-sidebar-header";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import { STROKE_WIDTH } from "@/features/editor/constants";
import { Editor, SelectedTool } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  selectedTool: SelectedTool;
  onChangeSelectedTool: (tool: SelectedTool) => void;
  editor: Editor | undefined;
};

const BorderWidthSidebar = ({
  selectedTool,
  onChangeSelectedTool,
  editor,
}: Props) => {
  const strokeWidth = editor?.getActiveObjectStrokeWidth() ?? STROKE_WIDTH;
  const onChange = (strokeWidth: number) => {
    editor?.addStrokeWidth(strokeWidth);
  };

  return (
    <aside
      className={cn(
        "bg-neutral-800 shadow z-50 w-90 h-full flex flex-col relative",
        selectedTool === "stroke-width" ? "visible" : "hidden"
      )}
    >
      <ElementsSidebarHeader title="Border" />
      <ScrollArea className="whitespace-nowrap">
        <div className="flex flex-col space-y-4 p-4">
          <Label>Border weight</Label>
          <Slider
            value={[strokeWidth]}
            onValueChange={(values) => onChange(values[0])}
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <ToolSidebarClose onClick={() => onChangeSelectedTool("select")} />
    </aside>
  );
};

export default BorderWidthSidebar;
