import { fabric } from "fabric";
import { ITextboxOptions, ITextOptions } from "fabric/fabric-impl";

export type SelectedTool =
  | "templates"
  | "text"
  | "shapes"
  | "settings"
  | "projects"
  | "ai"
  | "remove-bg"
  | "select"
  | "draw"
  | "fill"
  | "uploads"
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
  addFontSize: (fontSize: number) => void;
  addPhoto: (url: string) => void;
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
  addFontStyle: (fontStyle: "italic" | "normal") => void;
  addFontAlign: (textAlign: ITextOptions["textAlign"]) => void;
  deleteObjects: () => void;
  fillColor: string;
  getActiveObjectOpacity: () => number;
  getActiveObjectFillColor: () => string;
  getActiveObjectFontFamily: () => string;
  getActiveObjectFontStyle: () => "italic" | "normal";
  getActiveObjectFontWeight: () => number;
  getActiveObjectStrokeColor: () => string;
  getActiveObjectStrokeWidth: () => number;
  getActiveObjectStrokeDashArray: () => number[];
  getActiveObjectUnderline: () => boolean;
  getActiveObjectLineThrough: () => boolean;
  getActiveObjectTextCase: () => "lowercase" | "uppercase" | "normal";
  getActiveObjectFontSize: () => number;
  getActiveFontAlign: () => ITextOptions["textAlign"];
  strokeColor: string;
  strokeWidth: number;
  selectedObjects: fabric.Object[];
  sendBackwards: () => void;
  toggleUnderline: () => void;
  toggleLineThrough: () => void;
  toggleCase: () => void;
};
