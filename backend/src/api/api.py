import base64
from io import BytesIO

from fastapi import HTTPException
from fastapi.routing import APIRouter
from PIL import Image

from .inference import predict
from .models import InferenceRequest, InferenceResponse
from .state import state

router = APIRouter(prefix="/api")


@router.post("/predict", response_model=InferenceResponse)
async def predict_endpoint(request: InferenceRequest) -> InferenceResponse:
    if not state.is_initialized:
        state.initialize()

    image_data = base64.b64decode(request.image)
    image = Image.open(BytesIO(image_data)).convert("RGB")

    try:
        results = predict(image, request.prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    response = InferenceResponse(
        width=image.width,
        height=image.height,
        num_instances=results["scores"].shape[0],
        scores=results["scores"].cpu().tolist(),
        boxes=results["boxes"].cpu().tolist(),
        masks=results["masks"].cpu().tolist(),
    )
    return response
