import { fabric } from "fabric";
import { ITextboxOptions } from "fabric/fabric-impl";

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
  fontFamily: string;
  setFontFamily: (fontFamily: string) => void;
  strokeColor: string;
  strokeWidth: number;
  strokeDashArray: number[];
  setFillColor: (color: string) => void;
  setStrokeColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
  setStrokeDashArray: (dashArray: number[]) => void;
  selectedObjects: fabric.Object[];
};

export type Editor = {
  addRectangle: () => void;
  addCircle: () => void;
  addText: (text: string, options?: ITextboxOptions) => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
  addFillColor: (color: string) => void;
  addPentagon: () => void;
  addHexagon: () => void;
  addObjectOpacity: (opacity: number) => void;
  addStrokeColor: (color: string) => void;
  addStrokeWidth: (width: number) => void;
  addStrokeDashArray: (dashArray: number[]) => void;
  bringForward: () => void;
  canvas: fabric.Canvas;
  addFontFamily: (fontFamily: string) => void;
  addFontWeight: (fontWeight: number) => void;
  fillColor: string;
  getActiveObjectOpacity: () => number;
  getActiveObjectFillColor: () => string;
  getActiveObjectFontFamily: () => string;
  getActiveObjectFontWeight: () => number;
  getActiveObjectStrokeColor: () => string;
  getActiveObjectStrokeWidth: () => number;
  getActiveObjectStrokeDashArray: () => number[];
  strokeColor: string;
  strokeWidth: number;
  selectedObjects: fabric.Object[];
  sendBackwards: () => void;
};
