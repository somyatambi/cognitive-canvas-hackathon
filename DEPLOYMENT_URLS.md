# 🚀 Cognitive Canvas - Deployment URLs

## Live Application
- **Frontend (Vercel)**: https://cognitive-canvas-hackathon.vercel.app
- **Backend (Railway)**: https://cognitive-canvas-hackathon-production.up.railway.app
- **GitHub Repository**: https://github.com/somyatambi/cognitive-canvas-hackathon

## Technology Stack
- **Frontend**: React 19, TypeScript, Vite, ReactFlow
- **Backend**: FastAPI (Python), Nginx
- **AI Models**: 
  - Meta Llama 3.3 70B (via OpenRouter) - Brainstormer, Critic, Roadmap, Pitch Deck agents
  - Cerebras Llama 3.1 8B - Task agent (ultra-fast)
- **Deployment**: Vercel (frontend), Railway (backend)
- **Sponsor Technologies**: Docker MCP, Cerebras AI, Meta Llama

## Backend Endpoints (All Working ✅)
- `POST /brainstorm` - Generate startup ideas
- `POST /criticize` - Critique ideas with strengths/challenges
- `POST /roadmap` - Create strategic roadmap
- `POST /tasks` - Break down into actionable tasks
- `POST /pitchdeck` - Generate investor pitch deck

## Verification
Backend is fully operational and tested:
```bash
curl -X POST https://cognitive-canvas-hackathon-production.up.railway.app/brainstorm \
  -H "Content-Type: application/json" \
  -d '{"prompt": "test"}'
```

## Submission Date
October 5, 2025 - WeMakeDevs GenAI Hackathon 2025
