import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Logo from "@/features/editor/components/logo";
import { Editor, SelectedTool } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import {
  CloudDownload,
  CloudUpload,
  FileImage,
  HardDriveUpload,
  MousePointer2,
  Redo2,
  Undo2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Props = {
  selectedTool: SelectedTool;
  onChangeSelectedTool: (tool: SelectedTool) => void;
  editor: Editor | undefined;
};

const Navbar = ({ selectedTool, onChangeSelectedTool, editor }: Props) => {
  const workspace = editor?.getWorkspace();

  const initialCanvasWidth = useMemo(() => {
    return workspace?.width;
  }, [workspace]);

  const initialCanvasHeight = useMemo(() => {
    return workspace?.height;
  }, [workspace]);

  // This will make sure that when the workspace changes, the canvas width and height are updated as workspace might need some time to load and also in future if we add multiple workspaces
  useEffect(() => {
    setCanvasWidth(initialCanvasWidth);
    setCanvasHeight(initialCanvasHeight);
  }, [initialCanvasWidth, initialCanvasHeight]);

  const [canvasWidth, setCanvasWidth] = useState(initialCanvasWidth);
  const [canvasHeight, setCanvasHeight] = useState(initialCanvasHeight);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canvasWidth || !canvasHeight) return;
    editor?.resizeCanvas(canvasWidth, canvasHeight);
  };

  return (
    <nav className="w-full flex items-center h-14 p-2 gap-4">
      <Logo />
      <div className="w-full flex items-center gap-2 h-full">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button>File</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="min-w-32 sm:min-w-80 max-w-32 sm:max-w-80"
          >
            <DropdownMenuLabel className="text-ellipsis overflow-hidden text-nowrap">
              Graphic Design Saas Platform YouTube Thumbnail
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex gap-2 cursor-pointer">
              <CloudDownload />
              Import JSON file
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2 cursor-pointer">
              <CloudUpload />
              Export JSON file
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2 cursor-pointer">
              <FileImage />
              Export JPG
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2 cursor-pointer">
              <FileImage />
              Export PNG
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2 cursor-pointer">
              <FileImage />
              Export SVG
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button>Resize</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="min-w-32 sm:min-w-80 max-w-32 sm:max-w-80"
          >
            <DropdownMenuLabel className="text-ellipsis overflow-hidden text-nowrap">
              Canvas Size
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex gap-2">
              <form onSubmit={onSubmit} className="flex gap-2 flex-col p-2">
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={canvasWidth}
                    onChange={(e) => setCanvasWidth(+e.target.value)}
                    className="w-20 p-1 border border-gray-300 rounded"
                  />
                  <Input
                    type="number"
                    value={canvasHeight}
                    onChange={(e) => setCanvasHeight(+e.target.value)}
                    className="w-20 p-1 border border-gray-300 rounded"
                  />
                </div>
                <Button type="submit">Resize this design</Button>
              </form>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => onChangeSelectedTool("select")}
        >
          <MousePointer2
            className={cn(
              selectedTool === "select" ? "stroke-cyan-600  rounded" : ""
            )}
          />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <Undo2 />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <Redo2 />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <HardDriveUpload />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
