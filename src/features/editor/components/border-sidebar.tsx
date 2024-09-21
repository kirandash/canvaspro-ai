import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import ElementsSidebarHeader from "@/features/editor/components/elements-sidebar-header";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import { STROKE_DASH_ARRAY, STROKE_WIDTH } from "@/features/editor/constants";
import { Editor, SelectedTool } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  selectedTool: SelectedTool;
  onChangeSelectedTool: (tool: SelectedTool) => void;
  editor: Editor | undefined;
};

const BorderSidebar = ({
  selectedTool,
  onChangeSelectedTool,
  editor,
}: Props) => {
  const strokeWidth = editor?.getActiveObjectStrokeWidth() ?? STROKE_WIDTH;
  const onChange = (strokeWidth: number) => {
    editor?.addStrokeWidth(strokeWidth);
  };

  const strokeDashArray =
    editor?.getActiveObjectStrokeDashArray() ?? STROKE_DASH_ARRAY;
  const onChangeStrokeType = (dashArray: number[]) => {
    editor?.addStrokeDashArray(dashArray);
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
          <Label>Border style</Label>
          <div className="flex gap-2">
            <Button
              variant={"outline"}
              onClick={() => {
                // solid border
                onChangeStrokeType([]);
              }}
              className={cn(
                "border-2",
                JSON.stringify(strokeDashArray) === `[]`
                  ? "border-violet-500"
                  : ""
              )}
            >
              <div className="w-6 border-white border-2" />
            </Button>
            <Button
              variant={"outline"}
              onClick={() => {
                // dashed border
                onChangeStrokeType([10, 5]);
              }}
              className={cn(
                "border-2",
                JSON.stringify(strokeDashArray) === `[10,5]`
                  ? "border-violet-500"
                  : ""
              )}
            >
              <div className="w-6 border-white border-2 border-dashed" />
            </Button>
            <Button
              variant={"outline"}
              onClick={() => {
                // dotted border
                onChangeStrokeType([1, 3]);
              }}
              className={cn(
                "border-2",
                JSON.stringify(strokeDashArray) === `[1,3]`
                  ? "border-violet-500"
                  : ""
              )}
            >
              <div className="w-6 border-white border-2 border-dotted" />
            </Button>
            {/* <Button
              variant={"outline"}
              onClick={() => {
                // double border
                onChangeStrokeType([10, 5, 5, 5]);
              }}
            >
              <div className="w-6 border-white border-2 border-double" />
            </Button> */}
          </div>
        </div>
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

export default BorderSidebar;
