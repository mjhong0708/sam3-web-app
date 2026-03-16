from dataclasses import dataclass

import torch
from rich.console import Console
from transformers import Sam3Model, Sam3Processor

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
console = Console()


@dataclass
class AppState:
    model: Sam3Model | None = None
    processor: Sam3Processor | None = None

    def initialize(self):
        console.log("Initializing model and processor...")
        self.model = Sam3Model.from_pretrained("facebook/sam3").to(DEVICE)
        self.processor = Sam3Processor.from_pretrained("facebook/sam3")
        console.log("Model and processor initialized.")

    @property
    def is_initialized(self) -> bool:
        return self.model is not None and self.processor is not None


state = AppState()
