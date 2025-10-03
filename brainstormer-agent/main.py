# cognitive-canvas-hackathon/brainstormer-agent/main.py (UPDATED FOR STREAMING)

import os
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse # <-- IMPORT THIS

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

# This is an async generator function that will yield the AI's response chunks
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
    model = "meta-llama/llama-3.1-8b-instruct"
    system_prompt = "You are a creative brainstorming assistant. You generate three related, concise ideas. Each idea should be a short phrase or title, no more than 5-7 words. Use a numbered list."
    # Return a StreamingResponse, which sends data as it's generated
    return StreamingResponse(stream_generator(request.prompt, model, system_prompt), media_type='text/plain')