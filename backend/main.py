from fastapi import FastAPI
from dotenv import load_dotenv
from routes.interview import router as interview_router

load_dotenv()

app = FastAPI(title="PrepPilot AI Backend")

app.include_router(interview_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "PrepPilot AI backend is running"}
