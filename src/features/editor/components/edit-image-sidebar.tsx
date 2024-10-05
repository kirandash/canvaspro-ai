import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ElementsSidebarHeader from "@/features/editor/components/elements-sidebar-header";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import { filters } from "@/features/editor/constants";
import { Editor, SelectedTool } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = {
  selectedTool: SelectedTool;
  onChangeSelectedTool: (tool: SelectedTool) => void;
  editor: Editor | undefined;
};

const EditImageSidebar = ({
  selectedTool,
  onChangeSelectedTool,
  editor,
}: Props) => {
  // 🚨 TODO: Make getActiveObjectImageFilters work, currently filter from canvas is not same as the filter in constant hence can not be compared to find the active match
  const [imageFilter, setImageFilter] = useState("");
  const selectedObject = editor?.selectedObjects[0];
  const isImage = selectedObject?.type === "image";

  const changeImageFilter = (filter: string) => {
    if (!selectedObject || !isImage) return;
    editor?.addImageFilter(filter);
    // Update the local state because the state is not saved in the editor
    setImageFilter(filter);
  };

  return (
    <aside
      className={cn(
        "bg-neutral-800 shadow z-50 w-90 h-full flex flex-col relative",
        selectedTool === "edit-image" ? "visible" : "hidden"
      )}
    >
      <ElementsSidebarHeader title="Image" />
      <ScrollArea className="whitespace-nowrap">
        <div className="grid grid-cols-3 p-4">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={"ghost"}
              onClick={() => changeImageFilter(filter)}
              className={cn(
                "w-full",
                imageFilter === filter ? "bg-neutral-600" : ""
              )}
            >
              {filter}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={() => onChangeSelectedTool("select")} />
    </aside>
  );
};

export default EditImageSidebar;
