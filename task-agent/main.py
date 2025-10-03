import os
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

# 1. Define the request model
class AgentRequest(BaseModel):
    prompt: str

# 2. Initialize the FastAPI app and add middleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Initialize the API client once
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

# 4. Define the async stream generator once
async def stream_generator(prompt: str, model: str, system_prompt: str):
    try:
        stream = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            stream=True
        )
        for chunk in stream:
            content = chunk.choices[0].delta.content
            if content:
                yield content
    except Exception as e:
        print(f"Error in stream_generator: {e}")
        yield "An error occurred while streaming the response."

# 5. Define the API endpoint
@app.post("/generate")
async def generate_response(request: AgentRequest):
    model = "openai/gpt-oss-120b"
    system_prompt = "You are an expert project manager. The user will give you a high-level project phase. Break it down into a checklist of 3-5 concrete, actionable tasks. Respond ONLY with a markdown checklist. Example: - [ ] Task 1 description... - [ ] Task 2 description..."
    return StreamingResponse(stream_generator(request.prompt, model, system_prompt), media_type='text/plain')