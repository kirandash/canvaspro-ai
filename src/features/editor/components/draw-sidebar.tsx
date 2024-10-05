import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { ColorPicker } from "@/features/editor/components/color-picker";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import { BRUSH_COLOR, BRUSH_WIDTH } from "@/features/editor/constants";
import { Editor, SelectedTool } from "@/features/editor/types";
import { cn } from "@/lib/utils";

type Props = {
  selectedTool: SelectedTool;
  onChangeSelectedTool: (tool: SelectedTool) => void;
  editor: Editor | undefined;
};

const DrawSidebar = ({ selectedTool, onChangeSelectedTool, editor }: Props) => {
  const brushWidth = editor?.brushWidth ?? BRUSH_WIDTH;
  const onBrushWidthChange = (brushWidth: number) => {
    editor?.addBrushWidth(brushWidth);
  };
  const brushColor = editor?.brushColor ?? BRUSH_COLOR;
  const onBrushColorChange = (color: string) => {
    editor?.addBrushColor(color);
  };

  return (
    <aside
      className={cn(
        "bg-neutral-800 shadow z-50 w-90 h-full flex flex-col relative",
        selectedTool === "draw" ? "visible" : "hidden"
      )}
    >
      <ScrollArea className="whitespace-nowrap">
        <div className="flex w-max space-x-2 p-4">
          <ColorPicker color={brushColor} onChange={onBrushColorChange} />
        </div>
        <div className="flex flex-col space-y-4 p-4">
          <Label>Brush weight</Label>
          <Slider
            value={[brushWidth]}
            onValueChange={(values) => onBrushWidthChange(values[0])}
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <ToolSidebarClose onClick={() => onChangeSelectedTool("select")} />
    </aside>
  );
};

export default DrawSidebar;
