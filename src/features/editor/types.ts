import { fabric } from "fabric";

export type SelectedTool =
  | "templates"
  | "text"
  | "shapes"
  | "settings"
  | "projects"
  | "ai"
  | "remove-bg"
  | "select"
  | "images"
  | "draw"
  | "fill"
  | "stroke-width"
  | "stroke-color"
  | "font"
  | "opacity"
  | "filter";

export type CreateEditorProps = {
  canvas: fabric.Canvas;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  setFillColor: (color: string) => void;
  setStrokeColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
  selectedObjects: fabric.Object[];
};

export type Editor = {
  addRectangle: () => void;
  addCircle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
  addPentagon: () => void;
  addHexagon: () => void;
  addFillColor: (color: string) => void;
  addStrokeColor: (color: string) => void;
  addStrokeWidth: (width: number) => void;
  canvas: fabric.Canvas;
  fillColor: string;
  getActiveObjectFillColor: () => string;
  getActiveObjectStrokeColor: () => string;
  strokeColor: string;
  strokeWidth: number;
  selectedObjects: fabric.Object[];
};
