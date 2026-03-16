import { CircleAlert, X, RotateCcw } from "lucide-react";

import { ImageCanvas } from "@/components/image-canvas";
import { ImageDropzone } from "@/components/image-dropzone";
import { PromptBar } from "@/components/prompt-bar";
import { ResultsSummary } from "@/components/results-summary";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useImageUpload } from "@/hooks/use-image-upload";
import { usePrediction } from "@/hooks/use-prediction";

function App() {
  const image = useImageUpload();
  const prediction = usePrediction();

  const handlePredict = (prompt: string) => {
    if (image.base64) {
      prediction.run(image.base64, prompt);
    }
  };

  const handleReset = () => {
    image.clear();
    prediction.clearResult();
    prediction.clearError();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">SAM3 Segmenter</h1>
          <p className="text-sm text-muted-foreground">
            Upload an image and describe what to detect.
          </p>
        </header>

        {prediction.error && (
          <Alert variant="destructive">
            <CircleAlert className="size-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>{prediction.error}</span>
              <button onClick={prediction.clearError} className="ml-2 shrink-0">
                <X className="size-4" />
              </button>
            </AlertDescription>
          </Alert>
        )}

        {image.dataUrl ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground truncate max-w-xs">{image.file?.name}</p>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="size-3.5" />
                Reset
              </Button>
            </div>

            <ImageCanvas
              imageSrc={image.dataUrl}
              boxes={prediction.result?.boxes ?? []}
              scores={prediction.result?.scores ?? []}
              originalWidth={prediction.result?.width ?? 1}
              originalHeight={prediction.result?.height ?? 1}
            />

            <PromptBar
              onPredict={handlePredict}
              isLoading={prediction.isLoading}
              disabled={false}
            />

            {prediction.result && (
              <ResultsSummary
                numInstances={prediction.result.num_instances}
                scores={prediction.result.scores}
              />
            )}
          </div>
        ) : (
          <ImageDropzone
            isDragging={image.isDragging}
            onDragOver={image.onDragOver}
            onDragLeave={image.onDragLeave}
            onDrop={image.onDrop}
            onFileChange={image.onFileChange}
          />
        )}
      </div>
    </div>
  );
}

export default App;
