import { useRef, useEffect, useCallback } from "react";

const BOX_COLORS = ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6", "#ec4899"];

interface ImageCanvasProps {
  imageSrc: string;
  boxes: number[][];
  scores: number[];
  originalWidth: number;
  originalHeight: number;
}

export { BOX_COLORS };

export function ImageCanvas({
  imageSrc,
  boxes,
  scores,
  originalWidth,
  originalHeight,
}: ImageCanvasProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    const displayedWidth = img.clientWidth;
    const displayedHeight = img.clientHeight;
    canvas.width = displayedWidth;
    canvas.height = displayedHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, displayedWidth, displayedHeight);

    const scaleX = displayedWidth / originalWidth;
    const scaleY = displayedHeight / originalHeight;

    boxes.forEach((box, i) => {
      const [x1, y1, x2, y2] = box;
      const color = BOX_COLORS[i % BOX_COLORS.length];

      const sx = x1 * scaleX;
      const sy = y1 * scaleY;
      const sw = (x2 - x1) * scaleX;
      const sh = (y2 - y1) * scaleY;

      // Draw box
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(sx, sy, sw, sh);

      // Draw label
      const label = `${(scores[i] * 100).toFixed(1)}%`;
      ctx.font = "600 12px system-ui, sans-serif";
      const textWidth = ctx.measureText(label).width;
      const labelHeight = 20;
      const labelY = sy > labelHeight ? sy - labelHeight : sy;

      ctx.fillStyle = color;
      ctx.fillRect(sx, labelY, textWidth + 10, labelHeight);
      ctx.fillStyle = "#ffffff";
      ctx.fillText(label, sx + 5, labelY + 14);
    });
  }, [boxes, scores, originalWidth, originalHeight]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new ResizeObserver(() => draw());
    observer.observe(img);
    return () => observer.disconnect();
  }, [draw]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="relative inline-block w-full">
      <img
        ref={imgRef}
        src={imageSrc}
        alt="Uploaded"
        className="max-w-full h-auto block rounded-lg"
        onLoad={draw}
      />
      <canvas ref={canvasRef} className="absolute top-0 left-0 pointer-events-none" />
    </div>
  );
}
