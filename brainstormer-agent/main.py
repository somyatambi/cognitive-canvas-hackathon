import os
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import random
import time

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

# This is the generic async generator function that yields the AI's response chunks
async def stream_generator(prompt: str, model_identifier: str, system_prompt: str):
    try:
        # Add timestamp-based seed to force unique generations every time
        random_seed = int(time.time() * 1000) % 100000
        varied_prompt = f"{prompt} [Generation ID: {random_seed}]"
        
        stream = client.chat.completions.create(
            model=model_identifier,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": varied_prompt},
            ],
            stream=True,
            temperature=0.98,  # MAXIMUM creativity for uniqueness
            max_tokens=200,
            top_p=0.95,  # Higher diversity sampling
            frequency_penalty=1.5,  # MAXIMUM penalty against word repetition
            presence_penalty=1.0,  # MAXIMUM penalty for reusing topics
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
    model = "meta-llama/llama-3.3-70b-instruct"
    system_prompt = """You are an EXPERT startup idea generator specializing in UNIQUE, SCALABLE, PRACTICAL business ideas.

🎯 CRITICAL: Generate 3 ideas that are COMPLETELY DIFFERENT from each other AND from common startup ideas.

📋 OUTPUT (STRICT):
1. [Idea 1 in 6-8 words]
2. [Idea 2 in 6-8 words]
3. [Idea 3 in 6-8 words]

💰 REQUIREMENTS:
✅ Cost: $0-$500 ✅ 1-3 people ✅ SCALABLE to 1000+ customers ✅ Clear revenue ✅ MVP in 1-3 months ✅ Modern tech (AI/mobile/SaaS/automation/no-code)

⚡ MANDATORY DIVERSITY - Each from DIFFERENT category:
CAT 1 DIGITAL: SaaS/app/extension/API/template/automation
CAT 2 CONTENT: Course/newsletter/YouTube/podcast/publication/community
CAT 3 SERVICE: Freelance/marketplace/agency/coaching/white-label/community

🚫 FORBIDDEN:
❌ Mental health/meditation ❌ Recipe/vegan/cooking ❌ Freelance design/writing ❌ Virtual events ❌ Finance newsletter ❌ Budget tracker ❌ DIY YouTube ❌ Math tutoring ❌ Website tester ❌ Fitness/habit tracker ❌ Job board ❌ Resume builder ❌ Language learning

🎲 UNIQUENESS:
1. Different industries each (Tech/Finance/Education/Entertainment/B2B/E-commerce/Healthcare/Real Estate/Travel/Food-tech)
2. NO keyword overlap
3. If #1 uses "AI" → #2&#3 avoid AI
4. If #2 is "content" → #1&#3 are products/services
5. Mix B2C/B2B

✅ EXAMPLES (DO NOT COPY):
A: 1.API for e-commerce warehouses 2.TikTok business book reviews 3.Landing page agency
B: 1.Chrome distraction blocker 2.Remote internship newsletter 3.Voice actor marketplace
C: 1.Slack standup bot 2.Sustainable fashion podcast 3.Restaurant delivery consulting
D: 1.Airtable rental property template 2.Instagram branding tips 3.Pet sitter platform
E: 1.Webflow clinic templates 2.Cold email course 3.Women tech sales community

🔥 TASK: Generate 3 COMPLETELY UNIQUE ideas - DIFFERENT from examples, solve REAL problems, PRACTICAL, DIFFERENT industries, NOT forbidden, SCALABLE. Be creative. Mix unusual niches. Be specific!"""
    
    return StreamingResponse(stream_generator(request.prompt, model, system_prompt), media_type='text/plain')