export interface PredictRequest {
  image: string; // base64 encoded, no data URL prefix
  prompt: string;
}

export interface PredictResponse {
  width: number;
  height: number;
  num_instances: number;
  scores: number[];
  boxes: number[][]; // each [x1, y1, x2, y2]
  masks: number[][][];
}
