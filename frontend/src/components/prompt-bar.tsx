import { Loader2, Search } from "lucide-react";
import { useState, type KeyboardEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PromptBarProps {
  onPredict: (prompt: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

export function PromptBar({ onPredict, isLoading, disabled }: PromptBarProps) {
  const [prompt, setPrompt] = useState("");

  const canSubmit = prompt.trim().length > 0 && !disabled && !isLoading;

  const handleSubmit = () => {
    if (canSubmit) onPredict(prompt.trim());
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder='Describe what to find (e.g. "orange cat")'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        className="flex-1"
      />
      <Button onClick={handleSubmit} disabled={!canSubmit}>
        {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
        {isLoading ? "Detecting..." : "Detect"}
      </Button>
    </div>
  );
}
