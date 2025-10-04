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
            temperature=0.7,
            max_tokens=150,  # Limit tokens to prevent long responses
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
    model = "meta-llama/llama-3.3-70b-instruct"  # Latest Llama 3 (Llama 4 not released yet)
    
    # Detect if user wants budget-friendly ideas
    user_input_lower = request.prompt.lower()
    is_budget_conscious = any(keyword in user_input_lower for keyword in [
        'student', 'bootstrap', 'low cost', 'no cost', 'cheap', 'affordable',
        'hackathon', 'low budget', 'minimal funding', 'no money', 'free'
    ])
    
    if is_budget_conscious:
        # Budget-aware brainstorming for students/hackathon teams
        system_prompt = """You are a creative brainstorming assistant specializing in UNIQUE, LOW-COST/NO-COST innovative ideas.

CRITICAL RULES:
- Output EXACTLY 3 lines
- Each line: number, period, space, then 4-7 words
- NO extra text, NO explanations, NO duplicates
- Each idea MUST be UNIQUE and DIFFERENT from each other
- Focus on ideas requiring MINIMAL or ZERO initial capital
- Leverage free tools: Discord, GitHub, Notion, Canva, Google Sheets, WhatsApp, open-source AI
- Be CREATIVE and INNOVATIVE - avoid generic/common ideas
- Think of emerging trends, unique niches, underserved markets

CREATIVITY REQUIREMENTS:
- Idea 1: Focus on a NOVEL use of free platforms
- Idea 2: Target an UNUSUAL niche or demographic
- Idea 3: Combine TWO unexpected concepts

EXAMPLES (DO NOT COPY - BE ORIGINAL):

User: "Student startup idea"
1. AI-powered Discord study accountability bot
2. GitHub repo analytics for recruiters
3. Notion habit tracker templates marketplace

User: "Hackathon project low budget"
1. WhatsApp bot for neighborhood safety
2. Chrome extension carbon footprint tracker
3. Open-source AI resume roast generator

Now respond with EXACTLY 3 UNIQUE, CREATIVE, LOW-COST ideas. DO NOT repeat similar concepts!"""
    else:
        # Standard brainstorming with high creativity
        system_prompt = """You are a highly creative brainstorming assistant. Output EXACTLY 3 UNIQUE, INNOVATIVE ideas.

CRITICAL RULES:
- Output ONLY 3 lines
- Each line: number, period, space, then 4-7 words
- NO extra text, NO explanations, NO duplicates
- Each idea MUST be DISTINCTLY DIFFERENT from the others
- Think OUTSIDE THE BOX - avoid obvious/generic ideas
- Consider emerging technologies, untapped markets, unique business models

CREATIVITY REQUIREMENTS:
- Idea 1: Focus on an INNOVATIVE technology application
- Idea 2: Target an UNDERSERVED market segment
- Idea 3: Reimagine an EXISTING concept in a novel way

EXAMPLES (DO NOT COPY - BE ORIGINAL):

User: "Mobile game idea"
1. AI-generated personalized story RPG game
2. Meditation app with biometric feedback
3. Multiplayer cooking competition with AR

User: "Restaurant concept"
1. Zero-waste subscription meal prep service
2. Virtual reality global cuisine experiences
3. Pop-up mystery ingredient chef challenges

User: "Social media app"
1. Voice-only professional networking platform
2. Skill-swap community learning marketplace
3. AI-matched accountability partner finder

Now respond with EXACTLY 3 UNIQUE, CREATIVE ideas. Make each one DISTINCTLY DIFFERENT!"""
    
    return StreamingResponse(stream_generator(request.prompt, model, system_prompt), media_type='text/plain')
