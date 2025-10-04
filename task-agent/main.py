import os
import traceback
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

# 3. Initialize Cerebras API client (blazing fast for structured output!)
# This demonstrates multi-provider orchestration: Llama for creativity, Cerebras for speed
cerebras_client = OpenAI(
    base_url="https://api.cerebras.ai/v1",
    api_key=os.getenv("CEREBRAS_API_KEY")
)

# Fallback to OpenRouter if Cerebras fails
openrouter_client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

# 4. Define the async stream generator with fallback
async def stream_generator(prompt: str, model: str, system_prompt: str, use_cerebras: bool = True):
    try:
        if use_cerebras:
            print(f"[TASK AGENT] Attempting Cerebras API with model: {model}")
            client = cerebras_client
        else:
            print(f"[TASK AGENT] Using OpenRouter fallback with model: {model}")
            client = openrouter_client
            
        stream = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            stream=True,
            max_tokens=1500,
            temperature=0.7
        )
        
        has_content = False
        for chunk in stream:
            content = chunk.choices[0].delta.content
            if content:
                has_content = True
                yield content
        
        if not has_content:
            print("[TASK AGENT] WARNING: Stream completed but no content received")
            yield "No tasks generated. Please try again."
            
    except Exception as e:
        error_details = traceback.format_exc()
        print(f"[TASK AGENT] ERROR in stream_generator: {e}")
        print(f"[TASK AGENT] Full traceback:\n{error_details}")
        
        # Try fallback to OpenRouter if Cerebras failed
        if use_cerebras:
            print("[TASK AGENT] Cerebras failed, trying OpenRouter fallback...")
            async for content in stream_generator(prompt, "meta-llama/llama-3.3-70b-instruct", system_prompt, use_cerebras=False):
                yield content
        else:
            yield f"Error: Unable to generate tasks. Please check API configuration.\n\nDetails: {str(e)}"

# 5. Define the API endpoint
@app.post("/generate")
async def generate_response(request: AgentRequest):
    # Using Cerebras for ultra-fast structured output generation
    # Cerebras inference is 20x faster than traditional GPU inference!
    model = "llama3.1-8b"  # Cerebras-optimized Llama model
    system_prompt = """You are a strategic project architect with expertise in task breakdown and execution planning.

Given a project phase or goal, create a comprehensive, professional task breakdown with:
- Clear, action-oriented task titles
- Smart categorization (🚀 Quick Wins | 🎯 Core Tasks | 📈 Growth Goals)
- Brief context for why each task matters
- Realistic effort estimates (1-4 hours per task)

Format each task as: [Category] Task Title (Effort: Xh) - Brief context

Example:
🚀 Set up project repository (Effort: 1h) - Foundation for version control and collaboration
🎯 Design database schema (Effort: 3h) - Critical for data integrity and scalability
🎯 Implement authentication flow (Effort: 4h) - Security backbone of the application
📈 Add analytics tracking (Effort: 2h) - Enables data-driven decisions

Provide 5-7 tasks total. Be specific, actionable, and inspiring."""
    return StreamingResponse(stream_generator(request.prompt, model, system_prompt), media_type='text/plain')