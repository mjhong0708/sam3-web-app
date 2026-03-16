import { BOX_COLORS } from "./image-canvas";

interface ResultsSummaryProps {
  numInstances: number;
  scores: number[];
}

export function ResultsSummary({ numInstances, scores }: ResultsSummaryProps) {
  if (numInstances === 0) {
    return (
      <p className="text-sm text-muted-foreground">No instances found. Try a different prompt.</p>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">
        Found {numInstances} instance{numInstances !== 1 ? "s" : ""}
      </p>
      <div className="flex flex-wrap gap-3">
        {scores.map((score, i) => (
          <div key={i} className="flex items-center gap-1.5 text-sm">
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: BOX_COLORS[i % BOX_COLORS.length] }}
            />
            <span className="text-muted-foreground">{(score * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
