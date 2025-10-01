import os
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI

# Pydantic model for the request body to ensure data is in the expected format
class BrainstormRequest(BaseModel):
    concept: str

# Initialize the FastAPI app
app = FastAPI()

# Initialize the OpenAI client to point to OpenRouter's API
client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key=os.getenv("OPENROUTER_API_KEY"),
)

# Define the API endpoint
@app.post("/generate")
async def generate_brainstorm(request: BrainstormRequest):
    """
    Takes a concept from the user and uses the fast Llama model to brainstorm related ideas.
    """
    try:
        model_identifier = "meta-llama/llama-3.1-8b-instruct"

        completion = client.chat.completions.create(
          model=model_identifier,
          messages=[
            {
              "role": "system",
              "content": "You are a creative brainstorming assistant. You generate three related ideas based on the user's concept. Return only a clear, concise list.",
            },
            {
              "role": "user",
              "content": f"Generate three related ideas for the concept '{request.concept}'.",
            },
          ],
        )
        response_text = completion.choices[0].message.content
        return {"response": response_text}
    except Exception as e:
        return {"error": str(e)}