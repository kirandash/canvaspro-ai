import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ColorPicker } from "@/features/editor/components/color-picker";
import ElementsSidebarHeader from "@/features/editor/components/elements-sidebar-header";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import { WORKSPACE_BACKGROUND_COLOR } from "@/features/editor/constants";
import { Editor, SelectedTool } from "@/features/editor/types";
import { cn } from "@/lib/utils";

type Props = {
  selectedTool: SelectedTool;
  onChangeSelectedTool: (tool: SelectedTool) => void;
  editor: Editor | undefined;
};

const WorkspaceBackgroundColorSidebar = ({
  selectedTool,
  onChangeSelectedTool,
  editor,
}: Props) => {
  const workspaceBackgroundColor =
    editor?.workspaceBackgroundColor ?? WORKSPACE_BACKGROUND_COLOR;
  const onChange = (color: string) => {
    editor?.addWorkspaceBackgroundColor(color);
  };

  return (
    <aside
      className={cn(
        "bg-neutral-800 shadow z-50 w-90 h-full flex flex-col relative",
        selectedTool === "workspace-background-color" ? "visible" : "hidden"
      )}
    >
      <ElementsSidebarHeader title="Workspace Background Color" />
      <ScrollArea className="whitespace-nowrap">
        <div className="flex w-max space-x-2 p-4">
          <ColorPicker color={workspaceBackgroundColor} onChange={onChange} />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <ToolSidebarClose onClick={() => onChangeSelectedTool("select")} />
    </aside>
  );
};

export default WorkspaceBackgroundColorSidebar;
