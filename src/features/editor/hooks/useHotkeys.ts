import { fabric } from "fabric";
import { useEvent } from "react-use";

type Props = {
  canvas: fabric.Canvas | null;
  copy: () => void;
  paste: () => void;
  undo: () => void;
  redo: () => void;
  save: (skip?: boolean) => void;
};

export const useHotkeys = ({
  canvas,
  copy,
  paste,
  undo,
  redo,
  save,
}: Props) => {
  useEvent("keydown", (event) => {
    const isCtrlKey = event.ctrlKey || event.metaKey;
    const isBackspace = event.key === "Backspace";
    const isInput = ["input", "textarea"].includes(
      (event.target as HTMLElement).tagName.toLowerCase()
    );

    // If the user is typing in an input field, we don't want to trigger the hotkeys
    if (isInput || !canvas) return;

    if (isBackspace) {
      canvas.remove(...canvas.getActiveObjects());
      // Clear the active object
      canvas.discardActiveObject();
    }

    if (isCtrlKey && event.key === "z") {
      event.preventDefault();
      undo();
    }

    if (isCtrlKey && event.key === "y") {
      event.preventDefault();
      redo();
    }

    if (isCtrlKey && event.key === "c") {
      event.preventDefault();
      copy();
    }

    if (isCtrlKey && event.key === "v") {
      event.preventDefault();
      paste();
    }

    if (isCtrlKey && event.key === "a") {
      event.preventDefault();
      canvas.discardActiveObject();

      const allObjects = canvas
        .getObjects()
        .filter((obj) => obj.name !== "defaultCanvasWorkspace");

      if (allObjects.length === 0) return;

      canvas.setActiveObject(
        new fabric.ActiveSelection(allObjects, { canvas })
      );

      canvas.renderAll();
    }

    if (isCtrlKey && event.key === "s") {
      event.preventDefault();
      // save the current state of the canvas into DB but not to the history
      save(true);
    }
  });
};
