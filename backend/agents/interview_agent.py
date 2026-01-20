from pydantic_ai import Agent
from pydantic_ai.models.openrouter import OpenRouterModel

model = OpenRouterModel(
    model_name="meta-llama/llama-3.1-8b-instruct"
)

agent = Agent(
    model=model,
    system_prompt="""
You are an expert technical interviewer.

Evaluate the candidate's answer and return:
- score (1 to 10)
- strengths (list of strings)
- improvements (list of strings)

Be concise, professional, and constructive.
"""
)
