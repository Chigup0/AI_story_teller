from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import os
import models
from database import engine
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = os.getenv("CORS_ORIGINS", "").split(",")
# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # adjust when deploying
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/video/{video_id}")
def video_sender(video_id: str, request: Request):
    video_path = f"video/{video_id}"
    if not os.path.exists(video_path):
        raise HTTPException(status_code=404, detail="Video not found")

    file_size = os.path.getsize(video_path)
    range_header = request.headers.get("range")
    start, end = 0, file_size - 1

    if range_header:
        range_match = range_header.replace("bytes=", "").split("-")
        start = int(range_match[0]) if range_match[0] else 0
        if range_match[1]:
            end = int(range_match[1])

    chunk_size = (end - start) + 1

    def iterfile(path, start: int, end: int):
        with open(path, "rb") as f:
            f.seek(start)
            yield f.read(chunk_size)

    headers = {
        "Content-Range": f"bytes {start}-{end}/{file_size}",
        "Accept-Ranges": "bytes",
        "Content-Length": str(chunk_size),
        "Content-Type": "video/mp4",
    }

    return StreamingResponse(iterfile(video_path, start, end), status_code=206, headers=headers)

