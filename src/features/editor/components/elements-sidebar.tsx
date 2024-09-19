import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ElementsSidebarHeader from "@/features/editor/components/elements-sidebar-header";
import Shape from "@/features/editor/components/shape";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import { Editor, SelectedTool } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { Circle, Square } from "lucide-react";
import React from "react";
import { FaDiamond } from "react-icons/fa6";
import { IoTriangle } from "react-icons/io5";
import { MdHexagon, MdPentagon } from "react-icons/md";

type Props = {
  selectedTool: SelectedTool;
  onChangeSelectedTool: (tool: SelectedTool) => void;
  editor: Editor | undefined;
};

const ElementsSidebar = ({
  selectedTool,
  onChangeSelectedTool,
  editor,
}: Props) => {
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
          <Shape onClick={() => editor?.addRectangle()} icon={Square} />
          <Shape onClick={() => editor?.addCircle()} icon={Circle} />
          <Shape onClick={() => editor?.addTriangle()} icon={IoTriangle} />
          <Shape
            onClick={() => editor?.addInverseTriangle()}
            icon={IoTriangle}
            className="rotate-180"
          />
          <Shape onClick={() => editor?.addDiamond()} icon={FaDiamond} />
          <Shape onClick={() => editor?.addPentagon()} icon={MdPentagon} />
          <Shape onClick={() => editor?.addHexagon()} icon={MdHexagon} />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <ToolSidebarClose onClick={() => onChangeSelectedTool("select")} />
    </aside>
  );
};

export default ElementsSidebar;
