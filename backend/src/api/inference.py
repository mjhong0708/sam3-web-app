import torch
from transformers.image_utils import ImageInput
from typing import TypedDict
from .state import state

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"


class Results(TypedDict):
    outputs: any
    scores: torch.Tensor
    boxes: torch.Tensor
    masks: torch.Tensor


def predict(image: ImageInput, prompt: str) -> Results:
    if not state.is_initialized:
        state.initialize()

    inputs = state.processor(images=image, text=prompt, return_tensors="pt").to(DEVICE)
    with torch.no_grad():
        outputs = state.model(**inputs)

    # Post-process results
    results = state.processor.post_process_instance_segmentation(
        outputs, threshold=0.6, mask_threshold=0.6, target_sizes=inputs.get("original_sizes").tolist()
    )[0]
    results["outputs"] = outputs
    return results
