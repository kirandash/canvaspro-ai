import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import ElementsSidebarHeader from "@/features/editor/components/elements-sidebar-header";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import { OPACITY } from "@/features/editor/constants";
import { Editor, SelectedTool } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import React, { useEffect, useMemo } from "react";

type Props = {
  selectedTool: SelectedTool;
  onChangeSelectedTool: (tool: SelectedTool) => void;
  editor: Editor | undefined;
};

const TransparencySidebar = ({
  selectedTool,
  onChangeSelectedTool,
  editor,
}: Props) => {
  const initialOpacity = editor?.getActiveObjectOpacity() ?? OPACITY;
  const [opacity, setOpacity] = React.useState(initialOpacity);
  // Memoizing a dependency of another Hook - useEffect
  // https://react.dev/reference/react/useMemo
  const selectedObject = useMemo(
    () => editor?.selectedObjects[0],
    [editor?.selectedObjects[0]]
  );

  const onChange = (opacity: number) => {
    editor?.addObjectOpacity(opacity);
    setOpacity(opacity);
  };

  useEffect(() => {
    if (selectedObject) setOpacity(selectedObject?.get("opacity") ?? OPACITY);
  }, [selectedObject]);

  return (
    <aside
      className={cn(
        "bg-neutral-800 shadow z-50 w-90 h-full flex flex-col relative",
        selectedTool === "opacity" ? "visible" : "hidden"
      )}
    >
      <ElementsSidebarHeader title="Transparency" />
      <ScrollArea className="whitespace-nowrap">
        <div className="flex flex-col space-y-4 p-4">
          <Slider
            value={[opacity]}
            onValueChange={(values) => onChange(values[0])}
            min={0}
            max={1}
            step={0.01}
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <ToolSidebarClose onClick={() => onChangeSelectedTool("select")} />
    </aside>
  );
};

export default TransparencySidebar;
