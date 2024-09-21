import { useCallback, useMemo, useState } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "./useAutoResize";
import { CreateEditorProps, Editor } from "@/features/editor/types";
import {
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  FILL_COLOR,
  PENTAGON_OPTIONS,
  RECTANGLE_OPTIONS,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  TRIANGLE_OPTIONS,
} from "@/features/editor/constants";
import { useCanvasEvents } from "@/features/editor/hooks/useCanvasEvents";
import { isTextType } from "@/features/editor/utils";

const createEditor = ({
  canvas,
  fillColor,
  strokeColor,
  strokeWidth,
  setFillColor,
  setStrokeColor,
  setStrokeWidth,
  selectedObjects,
  strokeDashArray,
  setStrokeDashArray,
}: CreateEditorProps): Editor => {
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
        // override the default fill, stroke and strokeWidth with the current values to preserve the current values
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth,
        strokeDashArray,
      });
      addObjectToCanvas(rectangleObject);
    },
    addCircle: () => {
      const circleObject = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        // override the default fill, stroke and strokeWidth with the current values
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth,
        strokeDashArray,
      });
      addObjectToCanvas(circleObject);
    },
    addTriangle: () => {
      const triangleObject = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        // override the default fill, stroke and strokeWidth with the current values
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth,
        strokeDashArray,
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
          // override the default fill, stroke and strokeWidth with the current values
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth,
          strokeDashArray,
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
          // override the default fill, stroke and strokeWidth with the current values
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth,
          strokeDashArray,
        }
      );
      addObjectToCanvas(diamondObject);
    },
    addPentagon: () => {
      // Pentagon is a 5 sided polygon
      const WIDTH = PENTAGON_OPTIONS.width;
      const HEIGHT = PENTAGON_OPTIONS.height;
      const pentagonObject = new fabric.Polygon(
        [
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 3 },
          { x: (WIDTH * 2) / 3, y: HEIGHT },
          { x: WIDTH / 3, y: HEIGHT },
          { x: 0, y: HEIGHT / 3 },
        ],
        {
          ...PENTAGON_OPTIONS,
          // override the default fill, stroke and strokeWidth with the current values
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth,
          strokeDashArray,
        }
      );
      addObjectToCanvas(pentagonObject);
    },
    addHexagon: () => {
      // Hexagon is a 6 sided polygon
      const WIDTH = PENTAGON_OPTIONS.width;
      const HEIGHT = PENTAGON_OPTIONS.height;
      const hexagonObject = new fabric.Polygon(
        [
          { x: WIDTH / 4, y: 0 },
          { x: (WIDTH * 3) / 4, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: (WIDTH * 3) / 4, y: HEIGHT },
          { x: WIDTH / 4, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 },
        ],
        {
          ...PENTAGON_OPTIONS,
          // override the default fill, stroke and strokeWidth with the current values
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth,
          strokeDashArray,
        }
      );
      addObjectToCanvas(hexagonObject);
    },
    addFillColor: (color: string) => {
      setFillColor(color);
      // const activeObject = canvas.getActiveObject();
      // if (activeObject) {
      //   activeObject.set({ fill: color });
      // }
      canvas.getActiveObjects().forEach((object) => {
        object.set({ fill: color });
      });
      // This is required to re-render the canvas after changing the fill color
      canvas.renderAll();
    },
    addStrokeColor: (color: string) => {
      setStrokeColor(color);
      canvas.getActiveObjects().forEach((object) => {
        // Hack to set the color of the text object because text object does not have a stroke property
        if (isTextType(object.type)) {
          object.set({ fill: color });
          return;
        }
        object.set({ stroke: color });
      });
      canvas.renderAll();
    },
    addStrokeWidth: (width: number) => {
      setStrokeWidth(width);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeWidth: width });
      });
      canvas.renderAll();
    },
    addStrokeDashArray: (dashArray: number[]) => {
      setStrokeDashArray(dashArray);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeDashArray: dashArray });
      });
      canvas.renderAll();
    },
    canvas,
    fillColor, // editor fill color
    getActiveObjectFillColor: () => {
      const activeObject = selectedObjects[0];

      if (activeObject) {
        return (activeObject.get("fill") as string) ?? fillColor; // active object fill color
      }
      return fillColor;
    },
    getActiveObjectStrokeColor: () => {
      const activeObject = selectedObjects[0];

      if (activeObject) {
        return activeObject.get("stroke") ?? strokeColor;
      }
      return strokeColor;
    },
    getActiveObjectStrokeWidth: () => {
      const activeObject = selectedObjects[0];

      if (activeObject) {
        return activeObject.get("strokeWidth") ?? strokeWidth;
      }
      return strokeWidth;
    },
    getActiveObjectStrokeDashArray: () => {
      const activeObject = selectedObjects[0];

      if (activeObject) {
        return activeObject.get("strokeDashArray") ?? strokeDashArray;
      }
      return strokeDashArray;
    },
    strokeColor,
    strokeWidth,
    selectedObjects,
  };
};

type Props = {
  selectionClearedCallback: () => void;
};

const useEditor = ({ selectionClearedCallback }: Props) => {
  const [canvasWrapper, setCanvasWrapper] = useState<HTMLDivElement | null>(
    null
  );
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  // 🚨 TODO: Check why "^_" is not being ignored in eslint
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const [fillColor, setFillColor] = useState<string>(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState<string>(FILL_COLOR);
  const [strokeWidth, setStrokeWidth] = useState<number>(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] =
    useState<number[]>(STROKE_DASH_ARRAY);

  useCanvasEvents({
    canvas,
    setSelectedObjects,
    selectionClearedCallback,
  });

  useAutoResize({
    canvasWrapper,
    canvas,
  });

  const editor = useMemo(() => {
    if (canvas) {
      return createEditor({
        canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        setFillColor,
        setStrokeColor,
        setStrokeWidth,
        selectedObjects,
        strokeDashArray,
        setStrokeDashArray,
      });
    }
    return undefined;
  }, [
    canvas,
    fillColor,
    strokeColor,
    strokeWidth,
    selectedObjects,
    strokeDashArray,
  ]);

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
