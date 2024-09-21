import { useEffect } from "react";

type Props = {
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
};

export const useCanvasEvents = ({ canvas, setSelectedObjects }: Props) => {
  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (e) => {
        console.log("Selection created", e);
        setSelectedObjects(e.selected || []);
      });
      canvas.on("selection:updated", (e) => {
        console.log("Selection updated", e);
        setSelectedObjects(e.selected || []);
      });
      canvas.on("selection:cleared", () => {
        console.log("Selection cleared");
        setSelectedObjects([]);
      });
    }

    return () => {
      if (canvas) {
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
      }
    };
    // eslint does not recognize setSelectedObjects as a setState function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas]);
};
