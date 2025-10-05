# 🎨 Cognitive Canvas

## 🎯 Problem Statement

**The Blank Canvas Syndrome**: Entrepreneurs, students, and hackathon teams struggle with the overwhelming challenge of starting from scratch. Traditional brainstorming tools are either:
- Too rigid (linear chat interfaces)
- Too isolated (single AI responses without validation)
- Too abstract (ideas without actionable steps)

**The cost?** Brilliant ideas abandoned, projects never started, opportunities missed.

## 💡 Our Solution

**Cognitive Canvas** is an intelligent visual workspace where multiple AI agents collaborate with you to:
1. **🧠 Brainstorm** - Generate 3 focused startup ideas tailored to your vision (with budget-aware mode for students!)
2. **🔍 Critique** - Get constructive feedback on strengths and challenges
3. **🗺️ Roadmap** - Create strategic development phases
4. **✅ Task Breakdown** - Transform phases into actionable tasks with time estimates
5. **📊 Pitch Deck** - Generate investor-ready 8-slide presentations (NEW!)

**Special for Students & Bootstrappers:** Our AI detects budget constraints and suggests **low-cost/no-cost** innovative ideas using free tools and platforms.

Unlike traditional chatbots, Cognitive Canvas provides a **spatial thinking environment** where ideas flow naturally on an infinite canvas, creating a visual map of your creative process - from first idea to investor pitch.

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

### 1. **Workspace Management** 💾 (NEW!)
- **Save Canvases**: Save your work with custom names
- **Load Anytime**: Browse and load any saved canvas instantly
- **Multiple Projects**: Organize different business ideas separately
- **Quick Switching**: Easy context switching between canvases
- **Delete Old Work**: Clean up unwanted saves
- **LocalStorage**: All data saved locally in your browser

### 2. **Intelligent Multi-Agent Collaboration**
Unlike single-model systems, our agents specialize:
- **Brainstormer** uses Llama 3.3 70B for creative ideation (few-shot learning with strict constraints)
- **Critic** provides balanced feedback with strengths & challenges
- **Roadmap** creates strategic phase-based plans
- **Task** leverages Cerebras for instant actionable breakdowns
- **Pitch Deck** generates investor-ready 8-slide presentations (NEW!)

### 3. **Visual Canvas Interface**
- Infinite workspace for non-linear thinking
- Node-based representation of ideas, critiques, roadmaps, and tasks
- Visual connections show idea evolution
- Professional gradient-based design system
- Innovative side panel for workspace management

### 4. **Smart Workflow Orchestration**
- Context-aware menu options (different actions for different node types)
- Automatic Brainstormer → Critic conversation flow
- Seamless "Select & Expand Idea" workflow
- Task categorization (🚀 Quick Wins | 🎯 Core Tasks | 📈 Growth Goals)
- PDF export for pitch decks

### 5. **Streaming Real-Time Responses**
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

## 👥 Team

**Team Name**: The Iterators

**Members**:
- **Somya Tambi** - [@somyatambi](https://github.com/somyatambi)
- **Sojas Nayask** - [@sojasnayak](https://github.com/sojasnayak)

**Hackathon**: WeMakeDevs Fullstack GenAI Hackathon 2025

---

**📚 Technical Deep Dive**: See [ARCHITECTURE.md](./ARCHITECTURE.md) for implementation details

**🏆 Sponsor Tech Proof**: See [SPONSOR_TECH_USAGE.md](./SPONSOR_TECH_USAGE.md) for detailed integration


