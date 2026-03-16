from pydantic import BaseModel


class InferenceRequest(BaseModel):
    image: str  # Base64-encoded image string
    prompt: str


class InferenceResponse(BaseModel):
    width: int
    height: int
    num_instances: int
    scores: list[float]
    boxes: list[list[float]]
    masks: list[list[list[float]]]
