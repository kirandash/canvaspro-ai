import { CANVAS_JSON_KEYS } from "@/features/editor/constants";
import { fabric } from "fabric";
import { useEffect, useRef } from "react";

type Props = {
  autoZoom: () => void;
  canvas: fabric.Canvas | null;
  initialState: React.MutableRefObject<string | undefined>;
  canvasHistory: React.MutableRefObject<string[]>;
  setHistoryIndex: React.Dispatch<React.SetStateAction<number>>;
};

const useLoadState = ({
  autoZoom,
  canvas,
  initialState,
  canvasHistory,
  setHistoryIndex,
}: Props) => {
  // This will make sure that the initial state is loaded only once
  const initialzed = useRef(false);

  useEffect(() => {
    if (!initialzed.current && initialState.current && canvas) {
      canvas.loadFromJSON(JSON.parse(initialState.current), () => {
        // on load, we need to save the current state of the canvas to history
        const currentState = JSON.stringify(canvas.toJSON(CANVAS_JSON_KEYS));
        canvasHistory.current = [currentState];
        setHistoryIndex(0);
        autoZoom();
      });
    }
  }, [
    canvas,
    initialState, // no need to add initialState here because it's a ref but vscode doesn't understand
    canvasHistory, // no need to add canvasHistory here because it's a ref but vscode doesn't understand
    setHistoryIndex, // no need to add setHistoryIndex here because it's a ref but vscode doesn't understand
    autoZoom,
  ]);
};

export default useLoadState;
