import * as material from "material-colors";

export const fonts = [
  "Arial",
  "Arial Black",
  "Comic Sans MS",
  "Courier New",
  "Georgia",
  "Impact",
  "Lucida Console",
  "Lucida Sans Unicode",
  "Palatino Linotype",
  "Tahoma",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana",
];

export const colors = [
  material.red["500"],
  material.pink["500"],
  material.purple["500"],
  material.deepPurple["500"],
  material.indigo["500"],
  material.blue["500"],
  material.lightBlue["500"],
  material.cyan["500"],
  material.teal["500"],
  material.green["500"],
  material.lightGreen["500"],
  material.lime["500"],
  material.yellow["500"],
  material.amber["500"],
  material.orange["500"],
  material.deepOrange["500"],
  material.brown["500"],
  material.grey["500"],
  material.blueGrey["500"],
  "transparent",
];

export const filters = [
  "mono",
  "Polaroid",
  "technicolor",
  "sepia",
  "kodachrome",
  "brightness",
  "contrast",
  "brownie",
  "vintage",
  "pixelate",
  "blur",
  "sharpen",
  "emboss",
  "invert",
  "remove-color",
  // "gamma",
  "blacknwhite",
  "blend-color",
  "vibrance",
  "huerotate",
  "noise",
  // "gradient-transparency",
  "resize",
];

export const selectionOnlyTools = [
  "fill",
  "stroke-width",
  "stroke-color",
  "font",
  "opacity",
  "filter",
  "remove-bg",
];

export const FILL_COLOR = "rgba(0,0,0,0.7)";
export const STROKE_COLOR = "rgba(0,0,0,1)";
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY = [];
export const OPACITY = 1;
export const FONT_SIZE = 40;
export const FONT_FAMILY = "Arial";
export const FONT_WEIGHT = 400;

export const RECTANGLE_OPTIONS = {
  width: 500,
  height: 500,
  fill: FILL_COLOR,
};

export const CIRCLE_OPTIONS = {
  radius: 200,
  width: 200,
  height: 200,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

export const TEXT_OPTIONS = {
  type: "textbox",
  left: 150,
  top: 150,
  width: 400,
  fill: FILL_COLOR,
  fontSize: FONT_SIZE,
  fontFamily: FONT_FAMILY,
};

export const TRIANGLE_OPTIONS = {
  width: 500,
  height: 500,
  fill: FILL_COLOR,
};

export const DIAMOND_OPTIONS = {
  width: 700,
  height: 700,
  fill: FILL_COLOR,
};

export const PENTAGON_OPTIONS = {
  width: 500,
  height: 500,
  fill: FILL_COLOR,
};

export const HEXAGON_OPTIONS = {
  width: 500,
  height: 500,
  fill: FILL_COLOR,
};
