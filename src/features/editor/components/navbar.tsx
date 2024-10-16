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
import ProfileButton from "@/features/auth/components/profile-button";
import Logo from "@/features/editor/components/logo";
import { Editor, SelectedTool } from "@/features/editor/types";
import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { useMutationState } from "@tanstack/react-query";
import {
  Cloud,
  CloudDownload,
  CloudOff,
  CloudUpload,
  File,
  FileImage,
  LoaderPinwheel,
  MousePointer2,
  Redo2,
  Scaling,
  Undo2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useFilePicker } from "use-file-picker";

type Props = {
  id: string;
  selectedTool: SelectedTool;
  onChangeSelectedTool: (tool: SelectedTool) => void;
  editor: Editor | undefined;
};

const Navbar = ({ id, selectedTool, onChangeSelectedTool, editor }: Props) => {
  const data = useMutationState({
    filters: {
      mutationKey: ["project", { id }],
      exact: true,
    },
    select: (mutation) => mutation.state.status,
  });

  // Get the current status of the most recent mutation because we might have multiple mutations
  const currentStatus = data[data.length - 1];

  const isError = currentStatus === "error";
  const isPending = currentStatus === "pending";

  const workspace = editor?.getWorkspace();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { openFilePicker } = useFilePicker({
    accept: ".json",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = (e) => {
          const content = e.target?.result;
          editor?.importJson(content as string);
        };
      }
    },
  });

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
            <Button
              variant={isDesktop ? "default" : "ghost"}
              size={isDesktop ? "default" : "icon"}
            >
              <span className="lg:flex hidden">File</span>
              <File className="flex lg:hidden" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="min-w-32 sm:min-w-80 max-w-32 sm:max-w-80"
          >
            <DropdownMenuLabel className="text-ellipsis overflow-hidden text-nowrap">
              Graphic Design Saas Platform YouTube Thumbnail
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex gap-2 cursor-pointer"
              onClick={() => openFilePicker()}
            >
              <CloudDownload />
              Import JSON file
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2 cursor-pointer"
              onClick={() => editor?.exportJson()}
            >
              <CloudUpload />
              Export JSON file
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2 cursor-pointer"
              onClick={() => editor?.exportJpg()}
            >
              <FileImage />
              Export JPG
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2 cursor-pointer"
              onClick={() => editor?.exportPng()}
            >
              <FileImage />
              Export PNG
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2 cursor-pointer"
              onClick={() => editor?.exportSvg()}
            >
              <FileImage />
              Export SVG
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant={isDesktop ? "default" : "ghost"}
              size={isDesktop ? "default" : "icon"}
            >
              <span className="lg:flex hidden">Resize</span>
              <Scaling className="flex lg:hidden" />
            </Button>
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
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => editor?.undo()}
          disabled={!editor?.canUndo()}
        >
          <Undo2 />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => editor?.redo()}
          disabled={!editor?.canRedo()}
        >
          <Redo2 />
        </Button>
        {/* Save */}
        {!isPending && !isError && (
          <Button variant={"ghost"} className="flex gap-1">
            <Cloud />
            Saved
          </Button>
        )}
        {!isPending && isError && (
          <Button variant={"ghost"} className="flex gap-1">
            <CloudOff />
            Failed
          </Button>
        )}
        {isPending && (
          <Button variant={"ghost"} className="flex gap-1">
            <LoaderPinwheel className="animate-spin" />
            Saving
          </Button>
        )}
        <div className="ml-auto">
          <ProfileButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
