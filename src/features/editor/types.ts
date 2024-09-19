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
};

export type Editor = {
  addRectangle: () => void;
  addCircle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
};
