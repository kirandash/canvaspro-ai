import { Button } from "@/components/ui/button";
import { FILL_COLOR } from "@/features/editor/constants";
import { Editor, SelectedTool } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  editor: Editor | undefined;
  selectedTool: SelectedTool;
  onChangeSelectedTool: (tool: SelectedTool) => void;
};

const Toolbar = ({ editor, selectedTool, onChangeSelectedTool }: Props) => {
  const fillColor = editor?.getActiveObjectFillColor();

  if (editor?.selectedObjects.length === 0) {
    return <div className="h-10 my-2" />;
  }

  return (
    <div className="flex justify-center w-full my-2">
      <div className="shrink-0 h-10 bg-neutral-800 shadow py-1 gap-1 z-50 overflow-x-auto flex items-center min-w-80 rounded-lg justify-center">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => onChangeSelectedTool("fill")}
          className={cn(selectedTool === "fill" ? "neutral-600" : "")}
        >
          <div
            className="rounded size-6"
            style={{
              backgroundColor:
                typeof fillColor === "string" ? fillColor : FILL_COLOR,
            }}
          />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
