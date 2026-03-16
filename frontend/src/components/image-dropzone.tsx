import { ImageUp } from "lucide-react";
import { useRef, type DragEvent, type ChangeEvent } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ImageDropzoneProps {
  isDragging: boolean;
  onDragOver: (e: DragEvent) => void;
  onDragLeave: (e: DragEvent) => void;
  onDrop: (e: DragEvent) => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function ImageDropzone({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileChange,
}: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-center gap-4 border-2 border-dashed p-12 cursor-pointer transition-colors",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-muted-foreground/50",
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
    >
      <ImageUp className="size-10 text-muted-foreground" />
      <div className="text-center">
        <p className="text-sm font-medium">Drop an image here or click to browse</p>
        <p className="text-xs text-muted-foreground mt-1">Supports PNG, JPG, WebP</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
    </Card>
  );
}
