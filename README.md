# 🎨 Cognitive Canvas

## 🎯 Problem Statement

**The Blank Canvas Syndrome**: Entrepreneurs, students, and hackathon teams struggle with the overwhelming challenge of starting from scratch. Traditional brainstorming tools are either:
- Too rigid (linear chat interfaces)
- Too isolated (single AI responses without validation)
- Too abstract (ideas without actionable steps)

**The cost?** Brilliant ideas abandoned, projects never started, opportunities missed.

## 💡 Our Solution

**Cognitive Canvas** is an intelligent visual workspace where multiple AI agents collaborate with you to:
1. **🧠 Brainstorm** - Generate 3 focused startup ideas tailored to your profile:
   - 🎓 **Student Mode**: Budget-friendly ideas ($0-200) buildable in 10-15hrs/week
   - 💼 **Entrepreneur Mode**: High-growth B2B/SaaS ideas with $100k+ potential
   - ⚡ **Hackathon Mode**: 24-48hr buildable projects with impressive demos
2. **🔍 Critique** - Get constructive feedback on strengths and challenges
3. **🗺️ Roadmap** - Create strategic development phases
4. **✅ Task Breakdown** - Transform phases into actionable tasks with **time ranges** (2-4h) and **difficulty ratings** (Easy/Medium/Hard)
5. **📊 Pitch Deck** - Generate investor-ready 8-slide presentations with PDF export

**What Makes Us Different:**
- **Persona-Aware Brainstorming**: AI adapts ideas to your context (student vs entrepreneur vs hackathon)
- **Spatial Visual Thinking**: Unlike linear chat interfaces, ideas flow naturally on an infinite canvas
- **Multi-Agent Collaboration**: 5 specialized AI agents work together, not just one generic chatbot
- **End-to-End Workflow**: From first idea to investor pitch, all in one tool

---

## 🏗️ Architecture

### Multi-Agent System Design

```
┌─────────────────────────────────────────────────────────────┐
│                    React Flow Canvas (UI)                    │
│  • Infinite visual workspace for spatial ideation           │
│  • Real-time streaming from AI agents                       │
│  • Interactive node-based workflow                          │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│         Nginx API Gateway (Port 8080)                        │
│  • Containerized microservices architecture                 │
│  • Intelligent routing to specialized agents                │
│  • Streaming response orchestration                         │
└─────────────────┬───────────────────────────────────────────┘
                  │
        ┌─────────┴─────────┬─────────────┬─────────────┬─────────────┐
        ▼                   ▼             ▼             ▼             ▼
┌──────────────┐  ┌──────────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ Brainstormer │  │   Critic     │  │ Roadmap  │  │   Task   │  │Pitch Deck│
│    Agent     │  │    Agent     │  │  Agent   │  │  Agent   │  │  Agent   │
├──────────────┤  ├──────────────┤  ├──────────┤  ├──────────┤  ├──────────┤
│ Meta Llama   │  │ Meta Llama   │  │ Meta Llama│ │ Cerebras │  │Meta Llama│
│ 3.3 70B      │  │ via          │  │ via      │  │ Llama    │  │ 3.3 70B  │
│ (OpenRouter) │  │ OpenRouter   │  │OpenRouter│  │ 3.1 8B   │  │(OpenRouter)│
│              │  │              │  │          │  │          │  │          │
│ Creative     │  │ Analytical   │  │ Strategic│  │ Fast     │  │ Investor │
│ Ideation +   │  │ Feedback     │  │ Planning │  │ Execution│  │ Storytell│
│Budget-Aware  │  │              │  │          │  │          │  │   ing    │
└──────────────┘  └──────────────┘  └──────────┘  └──────────┘  └──────────┘
```

### Technology Stack

**Frontend**
- ⚛️ React 19.1.1 + TypeScript 5.8.3
- 🎨 React Flow (@xyflow/react) - Interactive node-based canvas
- ⚡ Vite 7.1.7 - Lightning-fast development
- 🎯 Axios - Streaming response handling

**Backend**
- 🐍 Python 3.11 + FastAPI
- 🤖 **Meta Llama 3.3 70B** (via OpenRouter) - Creative brainstorming, critique, roadmaps & pitch decks
- 🚀 **Cerebras AI** (Llama 3.1 8B) - Ultra-fast task generation (20x faster inference!)
- 🐳 **Docker + Nginx Gateway** - Microservices orchestration (5 agents!)

**Why This Stack?**
- **Meta Llama**: Best-in-class open-source LLM for nuanced creative tasks
- **Cerebras**: Specialized hardware for blazing-fast structured output
- **Docker**: Clean agent isolation with containerized microservices
- **React Flow**: Visual thinking requires spatial representation

---

## 🌟 Key Features

### 1. **Workspace Management** 💾
- **Save Canvases**: Save your work with custom names
- **Load Anytime**: Browse and load any saved canvas instantly
- **Edit Canvas Names**: Rename your saved canvases with a click (NEW!)
- **Multiple Projects**: Organize different business ideas separately
- **Quick Switching**: Easy context switching between canvases
- **Delete Old Work**: Clean up unwanted saves
- **LocalStorage**: All data saved locally in your browser

### 2. **Intelligent Multi-Agent Collaboration**
Unlike single-model systems, our agents specialize:
- **Brainstormer** uses Llama 3.3 70B for creative ideation with **persona-aware prompts** (Student/Entrepreneur/Hackathon)
- **Critic** provides balanced feedback with strengths & challenges
- **Roadmap** creates strategic phase-based plans
- **Task** leverages Cerebras for instant actionable breakdowns with **time ranges** (2-4h) and **difficulty ratings** (Easy/Medium/Hard)
- **Pitch Deck** generates investor-ready 8-slide presentations with PDF export

### 3. **Persona-Based Idea Generation** 🎯 (NEW!)
Before brainstorming, select your profile:
- **🎓 Student**: Ideas with $0-200 budget, 10-15hrs/week, using college skills (Notion templates, TikTok channels, tutoring)
- **💼 Entrepreneur**: B2B SaaS, agencies, marketplaces with $100k+ revenue potential
- **⚡ Hackathon**: 24-48hr buildable projects using existing APIs (ChatGPT, Web3, Chrome extensions)

### 3. **Persona-Based Idea Generation** 🎯 (NEW!)
Before brainstorming, select your profile:
- **🎓 Student**: Ideas with $0-200 budget, 10-15hrs/week, using college skills (Notion templates, TikTok channels, tutoring)
- **💼 Entrepreneur**: B2B SaaS, agencies, marketplaces with $100k+ revenue potential
- **⚡ Hackathon**: 24-48hr buildable projects using existing APIs (ChatGPT, Web3, Chrome extensions)

### 4. **Visual Canvas Interface**
- Infinite workspace for non-linear thinking
- Node-based representation of ideas, critiques, roadmaps, and tasks
- Visual connections show idea evolution
- Professional gradient-based design system
- Innovative side panel for workspace management

### 5. **Smart Workflow Orchestration**
- Context-aware menu options (different actions for different node types)
- Automatic Brainstormer → Critic conversation flow
- Seamless "Select & Expand Idea" workflow
- Task categorization with **detailed estimates**:
  - 🚀 Quick Wins (0.5-2h, Easy difficulty)
  - 🎯 Core Tasks (2-5h, Medium/Hard difficulty)
  - 📈 Growth Goals (1-3h, Easy/Medium difficulty)
- PDF export for pitch decks

### 6. **Streaming Real-Time Responses**
- Watch AI agents "think" in real-time
- No loading spinners - immediate feedback
- Professional loading overlays with animations

---

## 🏆 Sponsor Technology Integration

### ✅ Meta Llama (Required for Meta Prize)
- **Model**: Llama 3.3 70B Instruct
- **Usage**: 3 out of 4 agents (brainstormer, critic, roadmap)
- **Why Llama?**: 
  - Superior instruction following for creative tasks
  - Excellent at nuanced critique and strategic planning
  - Open-source aligns with hackathon values

**Technical Highlight**: We use few-shot learning prompts with Llama 3.3 70B to enforce strict output constraints (exactly 3 ideas, 4-6 words each), demonstrating advanced prompt engineering.

### ✅ Cerebras AI (Required for Cerebras Prize)
- **Model**: Llama 3.1 8B (Cerebras-optimized)
- **Usage**: Task Agent for structured output generation
- **Why Cerebras?**:
  - 20x faster inference than GPU-based solutions
  - Perfect for real-time task generation
  - Demonstrates multi-provider orchestration

**Technical Highlight**: By combining Llama 3.3 70B (creativity) with Cerebras (speed), we showcase intelligent model selection based on use case requirements.

### ✅ Docker Containerized Microservices (Required for Docker Prize)
- **Implementation**: Nginx-based API gateway with FastAPI microservices
- **Usage**: Orchestrates 5 containerized AI agents with intelligent routing
- **Why Docker?**:
  - Clean agent isolation via containers
  - Scalable microservices architecture
  - Production-ready deployment pattern

**Technical Highlight**: Our Nginx gateway routes requests to specialized containerized agents, implementing a microservices pattern that scales horizontally.

---

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for frontend development)
- OpenRouter API key ([get here](https://openrouter.ai/keys))
- Cerebras API key ([get here](https://cloud.cerebras.ai/))

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/somyatambi/cognitive-canvas-hackathon.git
cd cognitive-canvas-hackathon
```

2. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env and add your API keys:
# OPENROUTER_API_KEY=sk-or-v1-your-key-here
# CEREBRAS_API_KEY=csk-your-key-here
```

3. **Start backend services**
```bash
docker-compose up -d
# All 5 agents + Nginx gateway will start on port 8080
```

4. **Start frontend**
```bash
cd frontend
npm install
npm run dev
# Frontend will start on http://localhost:5173
```

5. **Open your browser**
- Navigate to http://localhost:5173
- Right-click on "My New Business Idea" node
- Select "🧠 Brainstorm Ideas"
- Choose your persona (Student/Entrepreneur/Hackathon)
- Watch the magic happen! ✨

### Deployment Notes
For production deployment, update `frontend/src/App.tsx`:
- Replace `localhost:8080` with your backend API URL
- Recommended: Use Render.com or similar Docker-friendly platform for backend
- Frontend can be deployed as static site on Vercel/Netlify

---

## 👥 Team

**Team Name**: The Iterators

**Members**:
- **Somya Tambi** - [@somyatambi](https://github.com/somyatambi)
- **Sojas Nayask** - [@sojasnayak](https://github.com/sojasnayak)

**Hackathon**: WeMakeDevs Fullstack GenAI Hackathon 2025

---

**📚 Technical Deep Dive**: See [ARCHITECTURE.md](./ARCHITECTURE.md) for implementation details

**🏆 Sponsor Tech Proof**: See [SPONSOR_TECH_USAGE.md](./SPONSOR_TECH_USAGE.md) for detailed integration


