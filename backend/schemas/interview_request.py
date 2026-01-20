from pydantic import BaseModel

class InterviewRequest(BaseModel):
    answer: str
