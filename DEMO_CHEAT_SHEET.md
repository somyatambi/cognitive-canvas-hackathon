# 🎬 Demo Guide

## 🚀 Quick Start

```bash
# Start backend
docker-compose up --build

# Start frontend (new terminal)
cd frontend
npm run dev

# Open browser
http://localhost:5173
```

---

## 🎯 Demo Flow (2 minutes)

### Step 1: Brainstorm (0:00-0:45)
1. Right-click the starting node
2. Click "🧠 Brainstorm Ideas"
3. **Watch 3 ideas stream in** (Meta Llama 3.3 70B)
4. Point out: "Powered by Meta Llama, generating focused ideas"

### Step 2: Expand & Execute (0:45-2:00)
1. Right-click idea #2 → "Select & Expand Idea"
2. **Show critique** (strengths/challenges)
3. Right-click critique → "Create Roadmap"
4. **Show roadmap phases**
5. Right-click Phase 1 → "Break Down Tasks"
6. **Emphasize**: "Tasks appear instantly - Cerebras AI is 20x faster!"
7. **Show task cards** with categories

**Closing:**
- Point to sponsor badges at bottom
- "Built with Meta Llama, Cerebras, and Docker microservices"

---

## 💬 Key Talking Points

**Problem (5 sec):**  
> "Starting from scratch is hard. We solve the blank canvas problem."

**Solution (5 sec):**  
> "AI agents brainstorm, critique, plan, and create tasks on a visual canvas."

**Tech Stack (5 sec):**  
> "Meta Llama 3.3 70B for creativity, Cerebras for speed, Docker for orchestration."

**Unique Value (5 sec):**  
> "Unlike chatbots, we use spatial thinking. Unlike single-AI tools, we use specialized agents."

---

## 🏆 Sponsor Tech Highlights

### Meta Llama
- ✅ When ideas appear: "Powered by Meta Llama 3.3 70B"
- ✅ 4 out of 5 agents use Meta Llama

### Cerebras
- ✅ When tasks appear: "Cerebras generates these in 200ms!"
- ✅ 20x faster than GPU inference

### Docker
- ✅ "5 microservices orchestrated via Docker Compose"
- ✅ Production-ready containerized architecture

---

## 🐛 Troubleshooting

**Ideas don't appear:**
- Check: `docker-compose logs brainstormer-agent`
- Verify OPENROUTER_API_KEY in .env

**Tasks are slow:**
- Verify CEREBRAS_API_KEY in .env
- Check: `docker-compose logs task-agent`

**Frontend won't start:**
- `rm -rf node_modules && npm install`

---

## 🎤 30-Second Pitch

> "Cognitive Canvas solves the blank canvas problem. Five specialized AI agents collaborate on a visual workspace - Meta Llama 3.3 70B for creative ideation and strategic planning, Cerebras AI for 20x faster task generation, all orchestrated through Docker microservices. From blank canvas to executable plan in under 2 minutes."

---

**Ready to demo! 🚀**

