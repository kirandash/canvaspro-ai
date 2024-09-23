import { Button } from "@/components/ui/button";
import {
  FILL_COLOR,
  FONT_FAMILY,
  FONT_WEIGHT,
  STROKE_COLOR,
} from "@/features/editor/constants";
import { Editor, SelectedTool } from "@/features/editor/types";
import { isTextType } from "@/features/editor/utils";
import { cn } from "@/lib/utils";
import { ArrowDownFromLine, ArrowUpFromLine, Bold, Italic } from "lucide-react";
import React from "react";
import { MdFormatColorText } from "react-icons/md";
import { RxBorderWidth, RxTransparencyGrid } from "react-icons/rx";

type Props = {
  editor: Editor | undefined;
  selectedTool: SelectedTool;
  onChangeSelectedTool: (tool: SelectedTool) => void;
};

const Toolbar = ({ editor, selectedTool, onChangeSelectedTool }: Props) => {
  // useState to keep track of the font weight because it's not tracked in editor
  const initialFontWeight = editor?.getActiveObjectFontWeight() ?? FONT_WEIGHT;
  const [fontWeight, setFontWeight] = React.useState(initialFontWeight);
  const initialFontStyle = editor?.getActiveObjectFontStyle() ?? "normal";
  const [fontStyle, setFontStyle] = React.useState(initialFontStyle);

  // Editor properties don't need local state because they have state in the editor
  const fillColor = editor?.getActiveObjectFillColor() ?? FILL_COLOR;
  const strokeColor = editor?.getActiveObjectStrokeColor() ?? STROKE_COLOR;
  const fontFamily = editor?.getActiveObjectFontFamily() ?? FONT_FAMILY;

  const selectedObject = editor?.selectedObjects[0];
  const isText = isTextType(selectedObject?.type);

  const changeFontWeight = () => {
    if (!selectedObject || !isText) return;
    const newFontWeightValue = fontWeight > 500 ? 400 : 700;
    editor?.addFontWeight(newFontWeightValue);
    // Update the local state because the state is not saved in the editor
    setFontWeight(newFontWeightValue);
  };

  const changeFontStyle = () => {
    if (!selectedObject || !isText) return;
    const newFontStyleValue = fontStyle === "italic" ? "normal" : "italic";
    editor?.addFontStyle(newFontStyleValue);
    // Update the local state because the state is not saved in the editor
    setFontStyle(newFontStyleValue);
  };

  if (editor?.selectedObjects.length === 0) {
    return <div className="h-10 my-2" />;
  }

  return (
    <div className="flex justify-center w-full my-2">
      <div className="shrink-0 h-10 bg-neutral-800 shadow py-1 gap-1 z-50 overflow-x-auto flex items-center min-w-80 rounded-lg justify-center">
        {/* Fill Color */}
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
        {/* Font Family */}
        {isText && (
          <Button
            variant={"ghost"}
            onClick={() => onChangeSelectedTool("font")}
            className={cn(
              "text-left",
              selectedTool === "font" ? "bg-neutral-600" : ""
            )}
          >
            <div className="max-w-24 text-ellipsis overflow-hidden text-nowrap">
              {fontFamily}
            </div>
          </Button>
        )}
        {/* Text Color */}
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
        {/* Font weight */}
        {isText && (
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={changeFontWeight}
            className={cn(fontWeight > 500 ? "bg-neutral-600" : "")}
          >
            <Bold className="size-6" />
          </Button>
        )}
        {/* Font Style */}
        {isText && (
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={changeFontStyle}
            className={cn(fontStyle === "italic" ? "bg-neutral-600" : "")}
          >
            <Italic className="size-6" />
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
