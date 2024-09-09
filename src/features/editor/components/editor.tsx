"use client";

import React, { useEffect, useRef } from "react";
import { useEditor } from "@/features/editor/hooks/useEditor";
import { fabric } from "fabric";

const Editor = () => {
  const { init } = useEditor();

  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      // This will make sure that the controls of the objects are above the overlay
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({
      initialCanvasWrapper: canvasWrapperRef.current!,
      initialCanvas: canvas,
    });
  }, [init]);

  return (
    <div className="h-full flex flex-col">
      <div className="h-full flex-1 bg-neutral-800" ref={canvasWrapperRef}>
        {/* Canvas resizing is difficult hence we are using a div as canvasWrapperRef and we will use a resize observer to see if canvasWrapperRef is resized and use the width and height from there to set width and height of canvas */}
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default Editor;
