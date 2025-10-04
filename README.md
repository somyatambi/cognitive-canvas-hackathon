# 🎨 Cognitive Canvas

> Transform ideas into action with AI-powered collaborative brainstorming on an infinite visual canvas.

![Meta Llama](https://img.shields.io/badge/Meta-Llama_3.3_70B-0081FB?style=for-the-badge&logo=meta)
![Cerebras](https://img.shields.io/badge/Cerebras-AI_Inference-00D4AA?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-MCP_Gateway-2496ED?style=for-the-badge&logo=docker)

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
│              Docker MCP Gateway (Port 8080)                  │
│  • Model Context Protocol implementation                    │
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
- 🐳 **Docker + MCP Gateway** - Microservices orchestration (5 agents!)

**Why This Stack?**
- **Meta Llama**: Best-in-class open-source LLM for nuanced creative tasks
- **Cerebras**: Specialized hardware for blazing-fast structured output
- **Docker MCP**: Clean agent isolation with intelligent routing
- **React Flow**: Visual thinking requires spatial representation

---

## 🌟 Key Features

### 1. **Intelligent Multi-Agent Collaboration**
Unlike single-model systems, our agents specialize:
- **Brainstormer** uses Llama 3.3 70B for creative ideation (few-shot learning with strict constraints)
- **Critic** provides balanced feedback with strengths & challenges
- **Roadmap** creates strategic phase-based plans
- **Task** leverages Cerebras for instant actionable breakdowns

### 2. **Visual Canvas Interface**
- Infinite workspace for non-linear thinking
- Node-based representation of ideas, critiques, roadmaps, and tasks
- Visual connections show idea evolution
- Professional gradient-based design system

### 3. **Smart Workflow Orchestration**
- Context-aware menu options (different actions for different node types)
- Automatic Brainstormer → Critic conversation flow
- Seamless "Select & Expand Idea" workflow
- Task categorization (🚀 Quick Wins | 🎯 Core Tasks | 📈 Growth Goals)

### 4. **Streaming Real-Time Responses**
- Watch AI agents "think" in real-time
- No loading spinners - immediate feedback
- Professional loading overlays with animations

---

## 🚀 Getting Started

### Prerequisites

- Docker Desktop installed ([Download here](https://www.docker.com/products/docker-desktop/))
- Node.js 20+ for frontend development
- API Keys:
  - **OpenRouter** ([Sign up](https://openrouter.ai/)) - Free tier includes Llama models
  - **Cerebras** ([Get API key](https://cloud.cerebras.ai/)) - Free inference credits

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/somyatambi/cognitive-canvas-hackathon.git
cd cognitive-canvas-hackathon
```

2. **Set up environment variables**
```bash
# Create .env file in root directory
cp .env.example .env

# Add your API keys:
OPENROUTER_API_KEY=your_openrouter_key_here
CEREBRAS_API_KEY=your_cerebras_key_here
```

3. **Start the backend services**
```bash
docker-compose up --build
```
This starts:
- 4 AI agent services (brainstormer, critic, roadmap, task)
- Nginx MCP Gateway on `http://localhost:8080`

4. **Start the frontend**
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

5. **Start creating!**
- Enter a project idea in the input field
- Click "Brainstorm Ideas" to generate 3 focused concepts
- Right-click nodes for contextual actions
- Watch your idea evolve on the canvas!

---

## 📸 Screenshots

### Main Canvas Interface
*[Screenshot of the infinite canvas with multiple connected nodes]*

### AI-Powered Brainstorming
*[Screenshot showing 3 generated ideas in beautiful card format]*

### Task Breakdown
*[Screenshot of color-coded task cards with effort estimates]*

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

### ✅ Docker MCP Gateway (Required for Docker Prize)
- **Implementation**: Custom FastAPI-based Model Context Protocol gateway
- **Usage**: Orchestrates 4 microservices with intelligent routing
- **Why Docker MCP?**:
  - Clean agent isolation
  - Scalable architecture
  - Production-ready deployment pattern

**Technical Highlight**: Our MCP Gateway routes requests to specialized agents, implementing a microservices pattern that scales horizontally.

---

## 🎨 Design Philosophy

### Professional Modern UI
- Gradient-based color system for visual hierarchy
- Smooth animations and transitions
- Responsive design for all screen sizes
- Category-specific color coding (Impact 🎯, Creativity 💡, Technical ⚙️)

### User Experience Principles
1. **Immediate Feedback**: Streaming responses, no waiting
2. **Visual Clarity**: Clean typography, ample whitespace
3. **Contextual Actions**: Smart menus based on node type
4. **Progressive Disclosure**: Complex workflows feel simple

---

## 🧪 Demo Video Script (2 minutes)

**[0:00-0:15] Hook + Problem**
> "Ever stared at a blank canvas, unsure where to start? You're not alone. 74% of entrepreneurs say ideation is their biggest challenge."

**[0:15-0:45] Solution Demo - Brainstorm**
> "Meet Cognitive Canvas. Let's say I want to build an EdTech startup. I type my vision... *[typing animation]* ...and click Brainstorm."
> *[Show 3 ideas appearing on canvas in real-time]*
> "Three focused ideas appear instantly, powered by Meta's Llama 3.3 70B."

**[0:45-1:15] Critique & Refine**
> "I love idea #2. Right-click, 'Select & Expand Idea.' Now the Critic Agent analyzes it..."
> *[Show critique node with strengths/challenges appearing]*
> "Balanced feedback. Real strengths, real challenges. I can refine based on this."

**[1:15-1:45] Roadmap & Tasks**
> "Let's create a roadmap... *[phases appear vertically]* ...and break down Phase 1 into tasks."
> *[Show task cards with categories and time estimates]*
> "Cerebras AI generates these in milliseconds. 🚀 Quick Wins, 🎯 Core Tasks, 📈 Growth Goals."

**[1:45-2:00] Closing**
> "From blank canvas to actionable plan in 2 minutes. Built with Meta Llama, Cerebras AI, and Docker."
> *[Show tech stack badges]*
> "Cognitive Canvas - Where ideas become reality."

---

## 💪 What We Learned

### Technical Growth
- **Multi-Provider Orchestration**: Learned to combine different AI providers (OpenRouter, Cerebras) based on task requirements
- **Streaming Architecture**: Implemented real-time server-sent events for smooth UX
- **Docker MCP Gateway**: Built production-ready microservices routing
- **React Flow Mastery**: Created custom nodes with intelligent content parsing

### Prompt Engineering
- Few-shot learning beats instructional prompts for strict output constraints
- Model selection matters: Llama 3.3 70B for creativity, Cerebras for speed
- System prompts require iteration and testing with real users

### Design Insights
- Spatial representation (canvas) beats linear chat for brainstorming
- Visual feedback (streaming text) reduces perceived latency
- Category-based color coding improves information hierarchy

---

## 🔮 Future Enhancements

- **Collaborative Mode**: Multiple users brainstorming on the same canvas
- **Export to Tools**: Push tasks directly to Jira, Notion, or Trello
- **Voice Agents**: Integration with LiveKit for voice-based brainstorming
- **Idea Library**: Save and remix past brainstorming sessions
- **Custom Agents**: Let users create specialized agents for their domain

---

## 📝 License

MIT License - Feel free to build upon this project!

---

## 🙏 Acknowledgments

- **Meta** for providing world-class open-source Llama models
- **Cerebras** for democratizing ultra-fast AI inference
- **Docker** for enabling clean microservices architecture
- **WeMakeDevs** for organizing this incredible hackathon

---

## 👥 Team

Built by **Somya Tambi** for the WeMakeDevs Fullstack GenAI Hackathon 2025

- GitHub: [@somyatambi](https://github.com/somyatambi)
- Project Repo: [cognitive-canvas-hackathon](https://github.com/somyatambi/cognitive-canvas-hackathon)

---

**Ready to transform your ideas into reality?** 🚀

[Try Cognitive Canvas Now](#getting-started) | [Watch Demo Video](#) | [Read Architecture Docs](./ARCHITECTURE.md)
