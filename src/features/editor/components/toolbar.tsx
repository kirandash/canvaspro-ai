import { Button } from "@/components/ui/button";
import StepperInput from "@/components/ui/stepper-input";
import { useRemoveBackground } from "@/features/ai/api/use-remove-background";
import {
  FILL_COLOR,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  STROKE_COLOR,
} from "@/features/editor/constants";
import { Editor, SelectedTool } from "@/features/editor/types";
import { isTextType } from "@/features/editor/utils";
import { cn } from "@/lib/utils";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ArrowDownFromLine,
  ArrowUpFromLine,
  Bold,
  CopyPlus,
  Crown,
  Italic,
  LockKeyhole,
  LockKeyholeOpen,
  Strikethrough,
  Trash2,
  Underline,
} from "lucide-react";
import React from "react";
import { MdFormatColorText } from "react-icons/md";
import { RiImageEditLine } from "react-icons/ri";
import {
  RxBorderWidth,
  RxLetterCaseUppercase,
  RxTransparencyGrid,
} from "react-icons/rx";

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
  const initialUnderline = editor?.getActiveObjectUnderline() ?? false;
  const [underline, setUnderline] = React.useState(initialUnderline);
  const initialLineThrough = editor?.getActiveObjectLineThrough() ?? false;
  const [lineThrough, setLineThrough] = React.useState(initialLineThrough);
  const initialTextCase = editor?.getActiveObjectTextCase() ?? "normal";
  const [textCase, setTextCase] = React.useState(initialTextCase);
  const initialFontAlign = editor?.getActiveFontAlign() ?? "left";
  const [fontAlign, setFontAlign] = React.useState(initialFontAlign);
  const initialFontSize = editor?.getActiveObjectFontSize() ?? FONT_SIZE;
  const [fontSize, setFontSize] = React.useState(initialFontSize);

  // Editor properties don't need local state because they have state in the editor
  const fillColor = editor?.getActiveObjectFillColor() ?? FILL_COLOR;
  const strokeColor = editor?.getActiveObjectStrokeColor() ?? STROKE_COLOR;
  const fontFamily = editor?.getActiveObjectFontFamily() ?? FONT_FAMILY;

  const selectedObject = editor?.selectedObjects[0];
  const isText = isTextType(selectedObject?.type);
  const isImage = selectedObject?.type === "image";

  // @ts-expect-error - currentSrc is not in the type definition
  const currentImageSrc = selectedObject?._originalElement?.currentSrc;
  const mutation = useRemoveBackground();

  const onRemoveBackground = async () => {
    mutation.mutateAsync({ image: currentImageSrc }).then(({ data }) => {
      // 🚨 TODO: Instead of adding new photo replace the existing photo
      editor?.addPhoto(data);
    });
  };

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

  const changeUnderline = () => {
    if (!selectedObject || !isText) return;
    const newUnderlineValue = !underline;
    editor?.toggleUnderline();
    // Update the local state because the state is not saved in the editor
    setUnderline(newUnderlineValue);
  };

  const changeLineThrough = () => {
    if (!selectedObject || !isText) return;
    const newLineThroughValue = !lineThrough;
    editor?.toggleLineThrough();
    // Update the local state because the state is not saved in the editor
    setLineThrough(newLineThroughValue);
  };

  const changeTextCase = () => {
    if (!selectedObject || !isText) return;
    const newTextCaseValue = textCase === "uppercase" ? "normal" : "uppercase";
    editor?.toggleCase();
    // Update the local state because the state is not saved in the editor
    setTextCase(newTextCaseValue);
  };

  const changeFontAlign = () => {
    if (!selectedObject || !isText) return;
    // solution 1: to increment through the alignment options
    // const alignmentOrder = ["left", "center", "right", "justify"];
    // const currentIndex = alignmentOrder.indexOf(fontAlign);
    // const newFontAlignValue =
    //   alignmentOrder[(currentIndex + 1) % alignmentOrder.length];
    // solution 2: using a dictionary
    const alignmentOptions = {
      left: "center",
      center: "right",
      right: "justify",
      justify: "left",
    } as {
      [key: string]: string;
    };
    const newFontAlignValue = alignmentOptions[fontAlign];
    editor?.addFontAlign(newFontAlignValue);
    // Update the local state because the state is not saved in the editor
    setFontAlign(newFontAlignValue);
  };

  const changeFontSize = (value: number) => {
    if (!selectedObject || !isText) return;
    editor?.addFontSize(value);
    // Update the local state because the state is not saved in the editor
    setFontSize(value);
  };

  if (editor?.selectedObjects.length === 0) {
    return <div className="h-10 my-2" />;
  }

  return (
    <div className="flex justify-center w-full my-2">
      <div className="shrink-0 h-10 bg-neutral-800 shadow py-1 gap-1 z-50 overflow-x-auto flex items-center min-w-80 rounded-lg justify-center">
        {/* Fill Color */}
        {!isText && !isImage && (
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
        {/* Font Size */}
        {isText && <StepperInput value={fontSize} setValue={changeFontSize} />}
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
        {/* Underline */}
        {isText && (
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={changeUnderline}
            className={cn(underline === true ? "bg-neutral-600" : "")}
          >
            <Underline className="size-6" />
          </Button>
        )}
        {/* Line through */}
        {isText && (
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={changeLineThrough}
            className={cn(lineThrough === true ? "bg-neutral-600" : "")}
          >
            <Strikethrough className="size-6" />
          </Button>
        )}
        {/* Uppercase */}
        {isText && (
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={changeTextCase}
            className={cn(textCase === "uppercase" ? "bg-neutral-600" : "")}
          >
            <RxLetterCaseUppercase className="size-6" />
          </Button>
        )}
        {/* Font Align */}
        {isText && (
          <Button variant={"ghost"} size={"icon"} onClick={changeFontAlign}>
            {(() => {
              if (fontAlign === "left") return <AlignLeft />;
              if (fontAlign === "center") return <AlignCenter />;
              if (fontAlign === "right") return <AlignRight />;
              return <AlignJustify />;
            })()}
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
        {/* Edit Image */}
        {isImage && (
          <Button
            variant={"ghost"}
            onClick={() => onRemoveBackground()}
            className={cn("flex gap-1")}
            disabled={mutation.isPending}
          >
            BG Remover
            <Crown className="size-3 fill-zinc-300" />
          </Button>
        )}
        {/* BG Remover */}
        {isImage && (
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => onChangeSelectedTool("edit-image")}
            className={cn(
              selectedTool === "edit-image" ? "bg-neutral-600" : ""
            )}
          >
            <RiImageEditLine className="size-6" />
          </Button>
        )}
        {/* Stroke Width */}
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
        {/* Duplicate Object */}
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => {
            editor?.copy();
            editor?.paste();
          }}
        >
          <CopyPlus className="size-6" />
        </Button>
        {/* Delete Object */}
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => editor?.deleteObjects()}
        >
          <Trash2 className="size-6" />
        </Button>
        {/* Lock Object */}
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => editor?.lockObjects()}
        >
          <LockKeyhole className="size-6" />
        </Button>
        {/* Unlock Object */}
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => editor?.unlockObjects()}
        >
          <LockKeyholeOpen className="size-6" />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
