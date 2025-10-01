import os
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI

class CriticRequest(BaseModel):
    prompt: str

app = FastAPI()

client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key=os.getenv("OPENROUTER_API_KEY"),
)

@app.post("/generate")
async def generate_criticism(request: CriticRequest):
    """
    Takes a business idea and uses the powerful Cerebras model to find potential flaws.
    """
    try:
        model_identifier = "openai/gpt-oss-120b"

        completion = client.chat.completions.create(
          model=model_identifier,
          messages=[
             {
              "role": "system",
              "content": "You are a sharp business analyst. Your job is to find the single most critical flaw or risk in a business idea and explain it concisely.",
            },
            {
              "role": "user",
              "content": f"Business Idea: {request.prompt}",
            },
          ],
        )
        response_text = completion.choices[0].message.content
        return {"response": response_text}
    except Exception as e:
        return {"error": str(e)}