import os
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware # <-- 1. IMPORT THIS

class AgentRequest(BaseModel):
    prompt: str

app = FastAPI()

# 2. ADD THIS MIDDLEWARE CONFIGURATION
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(base_url="https://openrouter.ai/api/v1", api_key=os.getenv("OPENROUTER_API_KEY"))

@app.post("/generate")
async def generate_response(request: AgentRequest):
    try:
        completion = client.chat.completions.create(
          model="openai/gpt-oss-120b",
          messages=[
            {"role": "system", "content": "You are a sharp business analyst. Find the single most critical flaw in an idea and summarize it in a single, impactful sentence of 15-20 words."},
            {"role": "user", "content": request.prompt},
          ],
        )
        return {"response": completion.choices[0].message.content}
    except Exception as e:
        return {"error": str(e)}