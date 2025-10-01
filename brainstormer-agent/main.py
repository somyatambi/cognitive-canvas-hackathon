import os
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware # <-- 1. IMPORT THIS

class AgentRequest(BaseModel):
    prompt: str

app = FastAPI()

# 2. ADD THIS MIDDLEWARE CONFIGURATION
# This tells the backend to allow requests from your frontend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows all origins, suitable for a hackathon.
    allow_credentials=True,
    allow_methods=["*"], # Allows all HTTP methods.
    allow_headers=["*"], # Allows all headers.
)

client = OpenAI(base_url="https://openrouter.ai/api/v1", api_key=os.getenv("OPENROUTER_API_KEY"))

@app.post("/generate")
async def generate_response(request: AgentRequest):
    try:
        completion = client.chat.completions.create(
          model="meta-llama/llama-3.1-8b-instruct",
          messages=[
            {"role": "system", "content": "You are a creative brainstorming assistant. Generate three related ideas. Each idea must be a short title, no more than 5-7 words. Use a numbered list."},
            {"role": "user", "content": request.prompt},
          ],
        )
        return {"response": completion.choices[0].message.content}
    except Exception as e:
        return {"error": str(e)}