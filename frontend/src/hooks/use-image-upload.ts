import { useState, type DragEvent, type ChangeEvent } from "react";

interface ImageUploadState {
  file: File | null;
  dataUrl: string | null;
  base64: string | null;
}

function fileToBase64(file: File): Promise<{ dataUrl: string; base64: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(",")[1];
      resolve({ dataUrl, base64 });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function useImageUpload() {
  const [state, setState] = useState<ImageUploadState>({
    file: null,
    dataUrl: null,
    base64: null,
  });
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const { dataUrl, base64 } = await fileToBase64(file);
    setState({ file, dataUrl, base64 });
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clear = () => {
    setState({ file: null, dataUrl: null, base64: null });
  };

  return {
    ...state,
    isDragging,
    onDragOver,
    onDragLeave,
    onDrop,
    onFileChange,
    clear,
  };
}
