import { useCallback, useState } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "./useAutoResize";

const useEditor = () => {
  const [canvasWrapper, setCanvasWrapper] = useState<HTMLDivElement | null>(
    null
  );
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useAutoResize({
    canvasWrapper,
    canvas,
  });

  const init = useCallback(
    ({
      initialCanvasWrapper,
      initialCanvas,
    }: {
      initialCanvasWrapper: HTMLDivElement;
      initialCanvas: fabric.Canvas;
    }) => {
      console.log("Initializing Editor... 🚀");

      // Set the canvas properties - Object properties
      fabric.Object.prototype.set({
        cornerColor: "#FFF",
        cornerStyle: "circle",
        borderColor: "#8b3dff",
        borderScaleFactor: 2.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 0.8,
        cornerStrokeColor: "#8b3dff",
      });

      // Create a rectangle object to define the workspace of the canvas
      const defaultCanvasWorkspace = new fabric.Rect({
        width: 1080,
        height: 1920,
        name: "defaultCanvasWorkspace",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0,0,0,0.3)",
          blur: 10,
        }),
      });
      // Set the height and width of the canvas-container div to the height and width of the canvas wrapper. offsetHeight vs clientHeight: https://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively
      initialCanvas.setHeight(initialCanvasWrapper.offsetHeight);
      initialCanvas.setWidth(initialCanvasWrapper.offsetWidth);

      // Define the workspace of the canvas
      initialCanvas.add(defaultCanvasWorkspace);
      initialCanvas.centerObject(defaultCanvasWorkspace);
      // element outside the defaultCanvasWorkspace rectangle will not be visible
      initialCanvas.clipPath = defaultCanvasWorkspace;

      // Set the canvas to the state
      setCanvas(initialCanvas);
      setCanvasWrapper(initialCanvasWrapper);

      const rectangleObject = new fabric.Rect({
        width: 300,
        height: 300,
        fill: "red",
      });

      initialCanvas.add(rectangleObject);
      initialCanvas.centerObject(rectangleObject);
    },
    []
  );

  return { init };
};

export { useEditor };
