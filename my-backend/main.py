from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def greet(name: str):
    return {"message": f"Hi {name}"}

# @app.get("/generate-video")
# def generate_video(story : str) :
#     if os.path.exists(VIDEO_PATH):
#         return FileResponse(VIDEO_PATH, media_type="video/mp4", filename="output.mp4")
#     return {"error": "Video not found"}