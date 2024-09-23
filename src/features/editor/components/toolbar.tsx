import { Button } from "@/components/ui/button";
import { FILL_COLOR, STROKE_COLOR } from "@/features/editor/constants";
import { Editor, SelectedTool } from "@/features/editor/types";
import { isTextType } from "@/features/editor/utils";
import { cn } from "@/lib/utils";
import { ArrowDownFromLine, ArrowUpFromLine } from "lucide-react";
import React from "react";
import { MdFormatColorText } from "react-icons/md";
import { RxBorderWidth, RxTransparencyGrid } from "react-icons/rx";

type Props = {
  editor: Editor | undefined;
  selectedTool: SelectedTool;
  onChangeSelectedTool: (tool: SelectedTool) => void;
};

const Toolbar = ({ editor, selectedTool, onChangeSelectedTool }: Props) => {
  const fillColor = editor?.getActiveObjectFillColor();
  const strokeColor = editor?.getActiveObjectStrokeColor();
  const selectedObject = editor?.selectedObjects[0];
  const isText = isTextType(selectedObject?.type);

  if (editor?.selectedObjects.length === 0) {
    return <div className="h-10 my-2" />;
  }

  return (
    <div className="flex justify-center w-full my-2">
      <div className="shrink-0 h-10 bg-neutral-800 shadow py-1 gap-1 z-50 overflow-x-auto flex items-center min-w-80 rounded-lg justify-center">
        {!isText && (
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => onChangeSelectedTool("fill")}
            className={cn(selectedTool === "fill" ? "bg-neutral-600" : "")}
          >
            <div
              className="rounded size-6"
              style={{
                backgroundColor:
                  typeof fillColor === "string" ? fillColor : FILL_COLOR,
              }}
            />
          </Button>
        )}
        {isText && (
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => onChangeSelectedTool("fill")}
            className={cn(selectedTool === "fill" ? "bg-neutral-600" : "")}
          >
            <MdFormatColorText
              className="size-6"
              style={{
                fill: typeof fillColor === "string" ? fillColor : FILL_COLOR,
              }}
            />
          </Button>
        )}
        {!isText && (
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => onChangeSelectedTool("stroke-color")}
            className={cn(
              selectedTool === "stroke-color" ? "bg-neutral-600" : ""
            )}
          >
            <div
              className="rounded size-6 border-2"
              style={{
                borderColor:
                  typeof strokeColor === "string" ? strokeColor : STROKE_COLOR,
              }}
            />
          </Button>
        )}
        {!isText && (
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => onChangeSelectedTool("stroke-width")}
            className={cn(
              selectedTool === "stroke-width" ? "bg-neutral-600" : ""
            )}
          >
            <RxBorderWidth className="size-6" />
          </Button>
        )}
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => editor?.bringForward()}
        >
          <ArrowUpFromLine className="size-6" />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => editor?.sendBackwards()}
        >
          <ArrowDownFromLine className="size-6" />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => onChangeSelectedTool("opacity")}
          className={cn(selectedTool === "opacity" ? "bg-neutral-600" : "")}
        >
          <RxTransparencyGrid className="size-6" />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
