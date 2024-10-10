import { OPACITY } from "@/features/editor/constants";
import { fabric } from "fabric";
import { RGBColor } from "react-color";
import { uuid } from "uuidv4";

export const downloadURI = (uri: string, extension: string) => {
  const link = document.createElement("a");
  link.download = `${uuid()}.${extension}`;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const generateFilter = (filter: string) => {
  let effect;
  switch (filter) {
    case "mono":
      effect = new fabric.Image.filters.Grayscale();
      break;
    case "Polaroid":
      // @ts-expect-error: Polaroid is not in the TypeScript definitions
      effect = new fabric.Image.filters.Polaroid();
      break;
    case "technicolor":
      // @ts-expect-error: Technicolor is not in the TypeScript definitions
      effect = new fabric.Image.filters.Technicolor();
      break;
    case "sepia":
      effect = new fabric.Image.filters.Sepia();
      break;
    case "kodachrome":
      // @ts-expect-error: Kodachrome is not in the TypeScript definitions
      effect = new fabric.Image.filters.Kodachrome();
      break;
    case "brightness":
      effect = new fabric.Image.filters.Brightness({ brightness: 0.4 });
      break;
    case "contrast":
      effect = new fabric.Image.filters.Contrast({ contrast: 0.4 });
      break;
    case "brownie":
      // @ts-expect-error: Brownie is not in the TypeScript definitions
      effect = new fabric.Image.filters.Brownie();
      break;
    case "vintage":
      // @ts-expect-error: Vintage is not in the TypeScript definitions
      effect = new fabric.Image.filters.Vintage();
      break;
    case "pixelate":
      effect = new fabric.Image.filters.Pixelate({ blocksize: 4 });
      break;
    case "blur":
      effect = new fabric.Image.filters.Blur({ blur: 0.5 });
      break;
    case "sharpen":
      effect = new fabric.Image.filters.Convolute({
        matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
      });
      break;
    case "emboss":
      effect = new fabric.Image.filters.Convolute({
        matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
      });
      break;
    case "sharpen":
      effect = new fabric.Image.filters.Convolute({
        matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
      });
      break;
    case "invert":
      effect = new fabric.Image.filters.Invert();
      break;
    case "remove-color":
      // @ts-expect-error: RemoveColor is not in the TypeScript definitions
      effect = new fabric.Image.filters.RemoveColor({
        distance: 0.6,
        threshold: 0.2,
      });
      break;
    // case "gamma":
    //   // @ts-expect-error: Gamma is not in the TypeScript definitions
    //   effect = new fabric.Image.filters.Gamma({
    //     gamma: 0.5,
    //   });
    //   break;
    case "blacknwhite":
      // @ts-expect-error: BlackWhite is not in the TypeScript definitions
      effect = new fabric.Image.filters.BlackWhite();
      break;
    case "blend-color":
      effect = new fabric.Image.filters.BlendColor({
        color: "#f55",
        mode: "multiply",
      });
      break;
    case "vibrance":
      // @ts-expect-error: Vibrance is not in the TypeScript definitions
      effect = new fabric.Image.filters.Vibrance({
        vibrance: 1,
      });
      break;
    case "huerotate":
      effect = new fabric.Image.filters.HueRotation({
        rotation: 0.5,
      });
      break;
    case "noise":
      effect = new fabric.Image.filters.Noise();
      break;
    // case "gradient-transparency":
    //   effect = new fabric.Image.filters.GradientTransparency({
    //     threshold: 0.2,
    //   });
    //   break;
    case "resize":
      effect = new fabric.Image.filters.Resize({
        resizeType: "hermite",
        scaleX: 0.5,
        scaleY: 0.5,
      });
      break;
    default:
      effect = null;
      return;
  }

  return effect;
};

export function isTextType(type: string | undefined) {
  return type === "text" || type === "i-text" || type === "textbox";
}

export function rgbaObjectToString(color: RGBColor | "transparent") {
  if (color === "transparent") {
    return `rgba(0, 0, 0, 0)`;
  }
  const alpha = color.a ?? OPACITY;

  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}

// This function is used to transform the text object to textbox object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformText = (objects: any) => {
  if (!objects) return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  objects.forEach((object: any) => {
    // This is recursively calling the function to transform the text
    if (object.objects) {
      transformText(object.objects);
    } else {
      object.type === "text" && (object.type = "textbox");
    }
  });
};
