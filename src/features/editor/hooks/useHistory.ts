import { CANVAS_JSON_KEYS } from "@/features/editor/constants";
import { fabric } from "fabric";
import React, { useCallback } from "react";

type Props = {
  canvas: fabric.Canvas | null;
  saveCallback?: (values: {
    json: string;
    height: number;
    width: number;
  }) => void;
};

export const useHistory = ({ canvas, saveCallback }: Props) => {
  const [historyIndex, setHistoryIndex] = React.useState<number>(0); // To keep track of the current index in the history array. We will disable undo/redo buttons if we are at the beginning or end of the array
  const canvasHistory = React.useRef<string[]>([]); // JSON stringified history of our canvas
  // The canvas events will be triggered when we undo/redo the history so we need to skip saving the current state of the canvas otherwise it will be added to the history array
  const skipSave = React.useRef<boolean>(false); // To skip saving the current state of the canvas when we undo/redo

  // we are using useCallback because we want save fn to be able to call in other dependencies
  const save = React.useCallback(
    (skip = false) => {
      if (!canvas) return;
      // 🚨 toJSON by default will not export all properties to JSON. Please make sure to manually add any properties you might wanna preserve
      const currentCanvasState = canvas.toJSON(CANVAS_JSON_KEYS);
      const currentCanvasStateString = JSON.stringify(currentCanvasState);

      if (!skipSave.current && !skip) {
        canvasHistory.current.push(currentCanvasStateString);
        setHistoryIndex(canvasHistory.current.length - 1);
      }

      const workspace = canvas
        .getObjects()
        .find((object) => object.name === "defaultCanvasWorkspace");
      const height = workspace?.height || 0;
      const width = workspace?.width || 0;

      saveCallback?.({
        json: currentCanvasStateString,
        height,
        width,
      });
    },
    [canvas, saveCallback]
  );

  const canUndo = useCallback(() => {
    return historyIndex > 0;
  }, [historyIndex]);

  const canRedo = useCallback(() => {
    return historyIndex < canvasHistory.current.length - 1;
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (!canvas || !canUndo()) return;

    // skip saving the current state of the canvas to history
    // 🚨 Important: This should be executed before the canvas.clear() method
    skipSave.current = true;

    // clear the canvas before loading the previous state
    canvas?.clear().renderAll();

    // decrement the history index
    const prevHistoryIndex = historyIndex - 1;
    const prevHistory = JSON.parse(canvasHistory.current[prevHistoryIndex]);

    // load the previous state of the canvas from the history array
    canvas.loadFromJSON(prevHistory, () => {
      // after loading the canvas state, render the canvas
      canvas.renderAll();
      setHistoryIndex(prevHistoryIndex);
      skipSave.current = false;
    });
  }, [canvas, historyIndex, canUndo]);

  const redo = useCallback(() => {
    if (!canvas || !canRedo()) return;

    // skip saving the current state of the canvas to history
    // 🚨 Important: This should be executed before the canvas.clear() method
    skipSave.current = true;

    // clear the canvas before loading the next state
    canvas?.clear().renderAll();

    // increment the history index
    const nextHistoryIndex = historyIndex + 1;
    const nextHistory = JSON.parse(canvasHistory.current[nextHistoryIndex]);

    // load the next state of the canvas from the history array
    canvas.loadFromJSON(nextHistory, () => {
      // after loading the canvas state, render the canvas
      canvas.renderAll();
      setHistoryIndex(nextHistoryIndex);
      skipSave.current = false;
    });
  }, [canvas, historyIndex, canRedo]);

  return { save, canUndo, canRedo, undo, redo, setHistoryIndex, canvasHistory };
};
