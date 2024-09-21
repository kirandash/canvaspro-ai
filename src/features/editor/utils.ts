import { RGBColor } from "react-color";

export function isTextType(type: string | undefined) {
  return type === "text" || type === "i-text" || type === "textbox";
}

export function rgbaObjectToString(color: RGBColor | "transparent") {
  if (color === "transparent") {
    return `rgba(0, 0, 0, 0)`;
  }
  const alpha = color.a ?? 1;

  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}
