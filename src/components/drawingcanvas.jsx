import React, { useEffect, useRef, useState } from "react";
import styles from "./drawingcanvas.module.css";

const DrawingCanvas = ({ selectedTool }) => {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const context = canvas.getContext("2d");
    setCtx(context);

    context.lineWidth = 2;
    context.lineCap = "round";
    context.strokeStyle = "black";

    return () => {
      setCtx(null);
    };
  }, []);

  const handleMouseDown = (e) => {
    if (!ctx) return;

    isDrawingRef.current = true;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedTool === "bucket") {
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    } else if (selectedTool === "text") {
      ctx.fillStyle = ctx.strokeStyle;
      ctx.font = "16px Arial";
      ctx.fillText("Your Text Here", x, y);
    } else {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const handleMouseMove = (e) => {
    if (!ctx || !isDrawingRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedTool === "pencil" || selectedTool === "brush") {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const handleMouseUp = () => {
    if (ctx && isDrawingRef.current) {
      ctx.closePath();
    }
    isDrawingRef.current = false;
  };

  const handleMouseOut = () => {
    isDrawingRef.current = false;
  };

  useEffect(() => {
    if (!ctx) return;

    switch (selectedTool) {
      case "pencil":
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        break;
      case "brush":
        ctx.lineWidth = 8;
        ctx.strokeStyle = "blue";
        break;
      case "eraser":
        ctx.lineWidth = 10;
        ctx.strokeStyle = "white";
        break;
      case "eyedrop":

        break;
      case "bucket":

        break;
      case "text":

        break;
      default:
        break;
    }
  }, [selectedTool, ctx]);

  return (
    <div className={styles.canvasContainer}>
      <canvas
        ref={canvasRef}
        id="drawingCanvas"
        className={styles.canvas}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
      ></canvas>
    </div>
  );
};

export default DrawingCanvas;
