from pydantic import BaseModel
from typing import List

class InterviewFeedback(BaseModel):
    score: int
    strengths: List[str]
    improvements: List[str]
