import { useState, useCallback } from "react";

import type { PredictResponse } from "@/lib/types";

import { predict } from "@/lib/api";

export function usePrediction() {
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async (image: string, prompt: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await predict({ image, prompt });
      setResult(res);
    } catch (e) {
      const message =
        e instanceof TypeError && e.message === "Failed to fetch"
          ? "Cannot reach the server. Is the backend running on port 3000?"
          : e instanceof Error
            ? e.message
            : "Unknown error";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);
  const clearResult = useCallback(() => setResult(null), []);

  return { result, isLoading, error, run, clearError, clearResult };
}
