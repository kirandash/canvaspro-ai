import { SidebarItem } from "@/features/editor/components/sidebar-item";
import { SelectedTool } from "@/features/editor/types";
import {
  CloudUpload,
  Folder,
  PanelsLeftBottom,
  PenLine,
  Settings,
  Shapes,
  Type,
  Wand,
} from "lucide-react";

type Props = {
  selectedTool: SelectedTool;
  onChangeSelectedTool: (tool: SelectedTool) => void;
};

const Sidebar = ({ selectedTool, onChangeSelectedTool }: Props) => {
  return (
    <aside className="flex flex-col bg-zinc-900 w-18 h-full overflow-y-auto">
      <ul className="flex flex-col">
        <SidebarItem
          icon={PanelsLeftBottom}
          label="Design"
          isActive={selectedTool === "templates"}
          onClick={() => onChangeSelectedTool("templates")}
          disabled
        />
        <SidebarItem
          icon={Shapes}
          label="Elements"
          isActive={selectedTool === "shapes"}
          onClick={() => onChangeSelectedTool("shapes")}
        />
        <SidebarItem
          icon={Type}
          label="Text"
          isActive={selectedTool === "text"}
          onClick={() => onChangeSelectedTool("text")}
        />
        <SidebarItem
          icon={CloudUpload}
          label="Uploads"
          isActive={selectedTool === "uploads"}
          onClick={() => onChangeSelectedTool("uploads")}
        />
        <SidebarItem
          icon={PenLine}
          label="Draw"
          isActive={selectedTool === "draw"}
          onClick={() => onChangeSelectedTool("draw")}
        />
        <SidebarItem
          icon={Folder}
          label="Projects"
          isActive={selectedTool === "projects"}
          onClick={() => onChangeSelectedTool("projects")}
          disabled
        />
        <SidebarItem
          icon={Wand}
          label="AI"
          isActive={selectedTool === "ai"}
          onClick={() => onChangeSelectedTool("ai")}
        />
        <SidebarItem
          icon={Settings}
          label="Settings"
          isActive={selectedTool === "settings"}
          onClick={() => onChangeSelectedTool("settings")}
          disabled
        />
      </ul>
    </aside>
  );
};

export default Sidebar;
