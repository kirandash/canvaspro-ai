import { fabric } from "fabric";
import { useCallback, useEffect } from "react";

type UseAutoResizeProps = {
  canvasWrapper: HTMLDivElement | null;
  canvas: fabric.Canvas | null;
};

const useAutoResize = ({ canvasWrapper, canvas }: UseAutoResizeProps) => {
  // autozoom function takes care of resizing the canvas and workspace
  const autoZoom = useCallback(() => {
    // Ensure canvasWrapper and canvas are available before proceeding
    if (!canvasWrapper || !canvas) return;

    // Get the width and height of the canvas wrapper (container) and adjust the canvas size accordingly
    const { offsetWidth, offsetHeight } = canvasWrapper;
    canvas.setHeight(offsetHeight);
    canvas.setWidth(offsetWidth);

    // Get the center point of the canvas (this is used for zooming)
    const center = canvas.getCenter();

    // Set a zoom ratio (in this case, 80%)
    const zoomRatio = 0.8;

    // Find the workspace object by its name on the canvas, e.g., "defaultCanvasWorkspace"
    const workspace = canvas
      .getObjects()
      .find((obj) => obj.name === "defaultCanvasWorkspace");

    // If no workspace is found, return early
    if (!workspace) return;

    // Calculate the scale needed to fit the workspace within the canvas dimensions
    // @ts-expect-error: findScaleToFit is not in the TypeScript definitions
    const scale = fabric.util.findScaleToFit(workspace, {
      width: offsetWidth,
      height: offsetHeight,
    });

    // Apply the zoom ratio to the calculated scale
    const zoom = zoomRatio * scale;

    // Reset any existing viewport transformations to the default identity matrix
    canvas.setViewportTransform(fabric.iMatrix.concat());

    // Zoom the canvas to the calculated zoom level, centering it around the canvas's center point
    canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom);

    if (!workspace) return;
    // Get the center point of the workspace
    const workspaceCenter = workspace.getCenterPoint();

    // Access the current viewport transformation matrix of the canvas
    const viewportTransform = canvas.viewportTransform;

    // Ensure the canvas has valid dimensions and viewport transformation before proceeding
    if (
      canvas.width === undefined ||
      canvas.height === undefined ||
      !viewportTransform
    )
      return;

    // viewportTransform[0] and viewportTransform[3]: Scaling factors for X and Y axes
    // viewportTransform[4] and viewportTransform[5]: Translation (movement) values for X and Y axes.
    // Adjust the X translation (viewportTransform[4]) so that the workspace's center aligns with the canvas's center horizontally
    // Translation in the X direction (viewportTransform[4])
    // canvas.width / 2: This gives the horizontal center of the canvas.
    // workspaceCenter.x * viewportTransform[0]: The workspaceCenter.x is the X-coordinate of the center of the workspace. Multiplying it by viewportTransform[0] (which is the current scale factor for the X-axis) gives the scaled position of the workspace's center in the X direction.
    // canvas.width / 2 - workspaceCenter.x * viewportTransform[0]: This shifts the workspace such that its center is aligned with the horizontal center of the canvas. The difference between the canvas's center and the workspace's center (scaled) becomes the translation value for the X-axis, which is assigned to viewportTransform[4] (the translation component in the X direction).
    viewportTransform[4] =
      canvas.width / 2 - workspaceCenter.x * viewportTransform[0];

    // Adjust the Y translation (viewportTransform[5]) so that the workspace's center aligns with the canvas's center vertically
    viewportTransform[5] =
      canvas.height / 2 - workspaceCenter.y * viewportTransform[3];

    // Apply the updated viewport transformation matrix to the canvas
    canvas.setViewportTransform(viewportTransform);

    // Clone the workspace object and use it as the clipping path to ensure that content outside the workspace is hidden
    workspace.clone((clonedWorkspace: fabric.Rect) => {
      // Set the canvas's clip path to the cloned workspace
      canvas.clipPath = clonedWorkspace;
      // Request re-render of the canvas to apply all changes
      canvas.requestRenderAll();
    });
  }, [canvasWrapper, canvas]);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    if (canvasWrapper && canvas) {
      resizeObserver = new ResizeObserver(() => {
        console.log("Resizing...");
        autoZoom();
      });

      // Start observing the canvasWrapper
      resizeObserver.observe(canvasWrapper);
    }
  }, [canvasWrapper, canvas, autoZoom]);

  return { autoZoom };
};

export { useAutoResize };
