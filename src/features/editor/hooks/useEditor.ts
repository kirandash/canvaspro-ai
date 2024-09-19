import { useCallback, useMemo, useState } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "./useAutoResize";
import { CreateEditorProps, Editor } from "@/features/editor/types";
import {
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  RECTANGLE_OPTIONS,
  TRIANGLE_OPTIONS,
} from "@/features/editor/constants";

const createEditor = ({ canvas }: CreateEditorProps): Editor => {
  const getWorkSpace = () => {
    return canvas
      .getObjects()
      .find((object) => object.name === "defaultCanvasWorkspace");
  };

  const centerObject = (object: fabric.Object) => {
    const workspace = getWorkSpace();
    const workspaceCenter = workspace?.getCenterPoint();
    if (!workspaceCenter) return;
    // Use _centerObject to center the object properly in the workspace. Note that centerObject does not work as expected if sidebar is open as the center point has changed after opening the sidebar. centerObject does not accept a second argument so we use _centerObject instead
    // canvas?.centerObject(rectangleObject);
    // @ts-expect-error: _centerObject is not in the TypeScript definitions
    canvas._centerObject(object, workspaceCenter);
  };

  const addObjectToCanvas = (object: fabric.Object) => {
    // Tip: Center the object before adding it to the canvas to make sure the center alignment is not recorded in the canvas history
    centerObject(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  return {
    addRectangle: () => {
      const rectangleObject = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        rx: 30,
        ry: 30,
      });
      addObjectToCanvas(rectangleObject);
    },
    addCircle: () => {
      const circleObject = new fabric.Circle(CIRCLE_OPTIONS);
      addObjectToCanvas(circleObject);
    },
    addTriangle: () => {
      const triangleObject = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
      });
      addObjectToCanvas(triangleObject);
    },
    addInverseTriangle: () => {
      // This will show the rotation control at the bottom of the triangle hence we will use a polygon instead of a triangle with angle: 180
      // const triangleObject = new fabric.Triangle({
      //   ...TRIANGLE_OPTIONS,
      //    angle: 180,
      // });
      const WIDTH = TRIANGLE_OPTIONS.width;
      const HEIGHT = TRIANGLE_OPTIONS.height;
      const triangleObject = new fabric.Polygon(
        [
          { x: 0, y: 0 },
          { x: WIDTH, y: 0 },
          { x: WIDTH / 2, y: HEIGHT },
        ],
        {
          ...TRIANGLE_OPTIONS,
        }
      );
      addObjectToCanvas(triangleObject);
    },
    addDiamond: () => {
      const WIDTH = DIAMOND_OPTIONS.width;
      const HEIGHT = DIAMOND_OPTIONS.height;
      const diamondObject = new fabric.Polygon(
        [
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: WIDTH / 2, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 },
        ],
        {
          ...DIAMOND_OPTIONS,
        }
      );
      addObjectToCanvas(diamondObject);
    },
  };
};

const useEditor = () => {
  const [canvasWrapper, setCanvasWrapper] = useState<HTMLDivElement | null>(
    null
  );
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useAutoResize({
    canvasWrapper,
    canvas,
  });

  const editor = useMemo(() => {
    if (canvas) {
      return createEditor({
        canvas,
      });
    }
    return undefined;
  }, [canvas]);

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

      // Add a rectangle object to the canvas - For testing purposes
      // const rectangleObject = new fabric.Rect({
      //   width: 300,
      //   height: 300,
      //   fill: "red",
      // });

      // initialCanvas.add(rectangleObject);
      // initialCanvas.centerObject(rectangleObject);
    },
    []
  );

  return { init, editor };
};

export { useEditor };
