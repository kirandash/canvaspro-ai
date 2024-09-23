import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ElementsSidebarHeader from "@/features/editor/components/elements-sidebar-header";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import { FONT_FAMILY, fonts } from "@/features/editor/constants";
import { Editor, SelectedTool } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  selectedTool: SelectedTool;
  onChangeSelectedTool: (tool: SelectedTool) => void;
  editor: Editor | undefined;
};

const FontSidebar = ({ selectedTool, onChangeSelectedTool, editor }: Props) => {
  const fontFamily = editor?.getActiveObjectFontFamily() ?? FONT_FAMILY;

  return (
    <aside
      className={cn(
        "bg-neutral-800 shadow z-50 w-90 h-full flex flex-col relative",
        selectedTool === "font" ? "visible" : "hidden"
      )}
    >
      <ElementsSidebarHeader title="Font" />
      <ScrollArea className="whitespace-nowrap">
        <div className="flex flex-col space-y-2 p-4">
          {fonts.map((font) => (
            <Button
              key={font}
              variant={"ghost"}
              onClick={() => editor?.addFontFamily(font)}
              className={cn(
                "w-full",
                fontFamily === font ? "bg-neutral-600" : ""
              )}
              style={{ fontFamily: font }}
            >
              {font}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <ToolSidebarClose onClick={() => onChangeSelectedTool("select")} />
    </aside>
  );
};

export default FontSidebar;
