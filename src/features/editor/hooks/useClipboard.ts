import { fabric } from "fabric";
import { useCallback, useRef } from "react";

type Props = {
  canvas: fabric.Canvas | null;
};

export const useClipboard = ({ canvas }: Props) => {
  // clipboard ref to store the current copied object
  // 🚨 TODO: copy paste from clipboard does not work well when we switch active selection between objects
  const clipboard = useRef<fabric.Object | null>(null);

  const copy = useCallback(() => {
    if (!canvas) return;
    // Copy the active object
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.clone((cloned: fabric.Object) => {
        clipboard.current = cloned;
      });
    }
  }, [canvas]);

  const paste = useCallback(() => {
    if (!canvas || !clipboard.current) return;

    clipboard.current.clone((clonedObj: fabric.Object) => {
      // discard the active selection on paste
      canvas.discardActiveObject();

      // Setting the left and top position of the pasted object to be 10px more than the original object for a better UX
      clonedObj.set({
        left: (clonedObj.left ?? 0) + 50,
        top: (clonedObj.top ?? 0) + 50,
        evented: true,
      });

      if (
        clonedObj.type === "activeSelection" &&
        clonedObj instanceof fabric.ActiveSelection
      ) {
        // activeSelection needs a reference to the canvas.
        clonedObj.canvas = canvas;
        clonedObj.forEachObject((obj: fabric.Object) => {
          canvas.add(obj);
        });
        clonedObj.setCoords();
      } else {
        canvas.add(clonedObj);
      }

      // Incrementing the top and left position for the next pasted object
      if (clipboard.current) {
        clipboard.current.top = (clipboard.current.top ?? 0) + 50;
        clipboard.current.left = (clipboard.current.left ?? 0) + 50;
      }

      // Set the pasted object as the active object on the canvas
      canvas.setActiveObject(clonedObj);
      canvas.requestRenderAll();
    });
  }, [canvas]);

  return {
    copy,
    paste,
  };
};
