import type { PredictRequest, PredictResponse } from "./types";

export async function predict(request: PredictRequest): Promise<PredictResponse> {
  const res = await fetch("/api/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.detail ?? `Server error: ${res.status}`);
  }

  return res.json();
}
