import os
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

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
            stream=True,
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
    system_prompt = "You are a creative brainstorming assistant. Generate three related ideas. Each idea must be a short title, no more than 5-7 words. Use a numbered list."
    return StreamingResponse(stream_generator(request.prompt, model, system_prompt), media_type='text/plain')