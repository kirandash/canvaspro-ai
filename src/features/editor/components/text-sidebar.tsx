import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ElementsSidebarHeader from "@/features/editor/components/elements-sidebar-header";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import { Editor, SelectedTool } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import React from "react";
import { TfiText } from "react-icons/tfi";

type Props = {
  selectedTool: SelectedTool;
  onChangeSelectedTool: (tool: SelectedTool) => void;
  editor: Editor | undefined;
};

const TextSidebar = ({ selectedTool, onChangeSelectedTool, editor }: Props) => {
  return (
    <aside
      className={cn(
        "bg-neutral-800 shadow z-50 w-90 h-full flex flex-col relative",
        selectedTool === "text" ? "visible" : "hidden"
      )}
    >
      <ElementsSidebarHeader title="Text" />
      <ScrollArea className="whitespace-nowrap">
        <div className="flex flex-col space-y-4 p-4">
          <Button
            className="bg-violet-600 hover:bg-violet-700 text-white flex gap-2"
            onClick={() => {
              editor?.addText("Your paragraph text", {
                fontSize: 8,
              });
            }}
          >
            <TfiText />
            Add a text box
          </Button>
          <Label>Default Text Styles</Label>
          <Button
            className="bg-violet-600 hover:bg-violet-700 text-white flex gap-2 text-4xl h-auto"
            onClick={() => {
              editor?.addText("Add a heading", {
                fontSize: 36,
                fontWeight: "bold",
              });
            }}
          >
            Add a heading
          </Button>
          <Button
            className="bg-violet-600 hover:bg-violet-700 text-white flex gap-2 text-xl h-auto"
            onClick={() => {
              editor?.addText("Add a subheading", {
                fontSize: 20,
                fontWeight: "bold",
              });
            }}
          >
            Add a subheading
          </Button>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <ToolSidebarClose onClick={() => onChangeSelectedTool("select")} />
    </aside>
  );
};

export default TextSidebar;
