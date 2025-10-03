# cognitive-canvas-hackathon/roadmap-agent/main.py

import os
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware

class AgentRequest(BaseModel):
    prompt: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(base_url="https://openrouter.ai/api/v1", api_key=os.getenv("OPENROUTER_API_KEY"))

async def stream_generator(prompt: str, model_identifier: str, system_prompt: str):
    try:
        stream = client.chat.completions.create(
            model=model_identifier,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt},
            ],
            stream=True, # <-- THIS ENABLES STREAMING
        )
        for chunk in stream:
            content = chunk.choices[0].delta.content
            if content:
                yield content
    except Exception as e:
        print(f"An error occurred: {e}")
        yield f"Error: {e}"

@app.post("/generate")
async def generate_response(request: AgentRequest):
    try:
        # We use the powerful reasoning model for this task
        model_identifier = "openai/gpt-oss-120b"

        completion = client.chat.completions.create(
          model=model_identifier,
          messages=[
            {
              "role": "system",
              "content": "You are an expert project manager. Your task is to take a business idea and generate a 3-4 phase implementation roadmap. Respond ONLY with a numbered list. Each item in the list MUST follow the exact format: Phase X: [Title] :: [Description]",
            },
            {
              "role": "user",
              "content": f"The business idea is: '{request.prompt}'",
            },
          ],
        )
        return {"response": completion.choices[0].message.content}
    except Exception as e:
        return {"error": str(e)}