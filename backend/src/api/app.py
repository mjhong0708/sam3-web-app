from fastapi import FastAPI

from .api import router

app = FastAPI(title="SAM3 Web App API", version="1.0.0")
app.include_router(router)


@app.get("/health")
async def health_check():
    return {"status": "ok"}

