# 🎨 Cognitive Canvas

> **AI-Powered Idea Studio** - Multi-agent visual workspace for entrepreneurs, students, and hackathon teams

## ⚠️ **IMPORTANT FOR JUDGES: This app uses RIGHT-CLICK interactions!**
> **Quick Guide:**  
> 1. **Right-click on canvas** → Enter your idea  
> 2. **Right-click on generated nodes** → Access AI agents (Criticize, Roadmap, Tasks, Pitch Deck)  
> 3. **Don't use single-click** - you'll miss the core functionality!

> 📅 **Documentation Note**: Usage instructions added post-submission (2025-10-06 13:25 UTC)  
> to clarify interaction model based on user testing feedback. No code changes made.

---

## 🚀 Live Demo
- **Frontend**: https://cognitive-canvas-hackathon.vercel.app
- **Backend API**: https://cognitive-canvas-hackathon-production.up.railway.app
- **API Health**: https://cognitive-canvas-hackathon-production.up.railway.app/ (Returns 200 OK)
- **GitHub**: https://github.com/somyatambi/cognitive-canvas-hackathon

---

## 📖 **Quick Start Guide**

### **Step 1: Select Your Persona**
Choose based on your situation:
- 🎓 **Student** - Budget: $0-200, skills-focused, weekend projects
- 💼 **Entrepreneur** - Revenue-driven, B2B scalable solutions  
- ⚡ **Hackathon** - 48-hour timeline, team-based execution

### **Step 2: Enter Starting Idea**
Type your initial concept (e.g., "AI-powered study planner for college students")

### **Step 3: Generate & Navigate** (RIGHT-CLICK REQUIRED!)
1. Click **"Generate Ideas"** → Get 3 persona-specific variations
2. **Right-click on Brainstormer node** → Select "🔍 Criticize"
3. **Right-click on Critic node** → Select "🗺️ Generate Roadmap"
4. **Right-click on Roadmap node** → Select "📋 Generate Tasks"
5. **Right-click on Roadmap node** → Select "🎤 Generate Pitch Deck"

**⏱️ Total time: ~2 minutes**

---

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
- 🐍 Python 3.9 + FastAPI
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
- **Edit Canvas Names**: Rename your saved canvases with a click
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

### 3. **Persona-Based Idea Generation** 🎯
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
- **Usage**: 4 out of 5 agents (brainstormer, critic, roadmap, pitch deck)
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

### Live Demo
**Try it now**: https://cognitive-canvas-hackathon.vercel.app

### Local Development

**Prerequisites**
- Docker
- Node.js 18+
- OpenRouter API key ([get here](https://openrouter.ai/keys))
- Cerebras API key ([get here](https://cloud.cerebras.ai/))

**Setup**

1. **Clone the repository**
```bash
git clone https://github.com/somyatambi/cognitive-canvas-hackathon.git
cd cognitive-canvas-hackathon
```

2. **Set up environment variables**
```bash
# Create .env file in root directory
echo "OPENROUTER_API_KEY=your-key-here" > .env
echo "CEREBRAS_API_KEY=your-key-here" >> .env
```

3. **Start backend with Docker**
```bash
docker build -t cognitive-canvas-backend .
docker run -p 8080:8080 --env-file .env cognitive-canvas-backend
```

4. **Start frontend**
```bash
cd frontend
npm install
npm run dev
```

5. **Open browser** → http://localhost:5173

### Deployment
- **Frontend**: Vercel (https://cognitive-canvas-hackathon.vercel.app)
- **Backend**: Railway (https://cognitive-canvas-hackathon-production.up.railway.app)
- **Environment Variables**: Set in Railway dashboard - `OPENROUTER_API_KEY`, `CEREBRAS_API_KEY`, `PORT=8080`

---

## 👥 Team

**Team Name**: The Iterators

**Members**:
- **Somya Tambi** - [@somyatambi](https://github.com/somyatambi)
- **Sojas Nayak** - [@sojasnayak](https://github.com/sojasnayak)

**Hackathon**: WeMakeDevs Fullstack GenAI Hackathon 2025

---

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical deep dive into multi-agent system
- **[SPONSOR_TECH_USAGE.md](./SPONSOR_TECH_USAGE.md)** - Detailed sponsor technology integration
- **[DEMO_SCRIPT.md](./DEMO_SCRIPT.md)** - 3-minute demo guide
- **[DEPLOYMENT_URLS.md](./DEPLOYMENT_URLS.md)** - Live deployment links and verification

---

## 🔗 Links

- **Live App**: https://cognitive-canvas-hackathon.vercel.app
- **Backend API**: https://cognitive-canvas-hackathon-production.up.railway.app
- **GitHub**: https://github.com/somyatambi/cognitive-canvas-hackathon

---

**Built with ❤️ for WeMakeDevs GenAI Hackathon 2025**