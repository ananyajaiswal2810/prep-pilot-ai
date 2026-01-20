from dotenv import load_dotenv
load_dotenv()  # MUST be first

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.interview import router as interview_router

app = FastAPI(
    title="PrepPilot AI Backend",
    description="Backend for PrepPilot AI interview feedback agent",
    version="1.0.0",
)

# ✅ CORS — allow frontend (local + deployed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # safe for demo / student project
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ API routes
app.include_router(interview_router, prefix="/api")

# ✅ Health check (VERY useful for Render)
@app.get("/")
def root():
    return {"status": "PrepPilot AI backend running"}