# 🎯 For Judges - Quick Evaluation Guide

> **TL;DR**: Cognitive Canvas is a multi-agent visual brainstorming platform that uses 5 specialized AI agents (Meta Llama + Cerebras) in a Docker microservices architecture to transform ideas into investor-ready pitches.

---

## 🚀 Quick Demo (3 Minutes)

### Start the App
```bash
# 1. Set up environment
cp .env.example .env
# Add your OPENROUTER_API_KEY and CEREBRAS_API_KEY to .env

# 2. Start backend (5 Docker containers)
docker-compose up -d

# 3. Start frontend
cd frontend && npm install && npm run dev

# 4. Open http://localhost:5173
```

### Test the Workflow
1. **Right-click** on "My New Business Idea" node
2. Click **"🧠 Brainstorm Ideas"**
3. **NEW FEATURE**: Choose your persona:
   - 🎓 **Student** → Get ideas with $0-200 budget (Notion templates, TikTok channels)
   - 💼 **Entrepreneur** → Get B2B SaaS ideas with $100k+ potential
   - ⚡ **Hackathon** → Get 24-48hr buildable projects (Chrome extensions, AI integrations)
4. Watch **3 AI-generated ideas** appear in real-time
5. **Right-click** an idea → "🧐 Criticize" → See strengths/challenges
6. **Right-click** → "🗺️ Generate Roadmap" → See 4-5 strategic phases
7. **Right-click** a roadmap phase → "✅ Break Down Tasks"
   - **NEW FEATURE**: Tasks show **time ranges** (2-4h) and **difficulty ratings** (Easy/Medium/Hard)
8. **Right-click** roadmap → "📊 Generate Pitch Deck" → Download PDF

**Expected Time**: Full workflow completes in ~2 minutes

---

## 🏆 Sponsor Technology Integration

### ✅ Meta Llama (4 out of 5 agents)
**Model**: `meta-llama/llama-3.3-70b-instruct` via OpenRouter

**Where Used**:
- 🧠 **Brainstormer Agent**: Creative ideation with **persona-aware prompts** (NEW!)
- 🧐 **Critic Agent**: Analytical feedback
- 🗺️ **Roadmap Agent**: Strategic planning
- 📊 **Pitch Deck Agent**: Investor storytelling

**Advanced Techniques**:
- **Persona-Aware Prompting**: Different system prompts for Student/Entrepreneur/Hackathon
- **Few-Shot Learning**: Shows exact format instead of describing it
- **Maximum Anti-Repetition**: `frequency_penalty=2.0`, `presence_penalty=2.0`
- **Dynamic Blacklisting**: Explicitly bans previously generated ideas

**Proof**: See `brainstormer-agent/main.py` lines 29-139 (3 persona prompts)

---

### ✅ Cerebras AI (Task Agent)
**Model**: `llama3.1-8b` (Cerebras-optimized)

**Why Cerebras**: 20x faster inference for structured output generation

**Enhancement**: Tasks now include:
- **Time Ranges**: `(Effort: 2-4h)` instead of single estimates
- **Difficulty Ratings**: `(Difficulty: Medium)` for skill assessment
- **Categories**: 🚀 Quick Wins, 🎯 Core Tasks, 📈 Growth Goals

**Proof**: See `task-agent/main.py` lines 87-112 (enhanced prompt with time ranges + difficulty)

---

### ✅ Docker (Full Microservices Architecture)
**Implementation**: Nginx gateway + 5 containerized FastAPI agents

**Architecture**:
```
Frontend (React) → Nginx Gateway (Port 8080) → 5 Agent Containers
                         ↓
        ┌────────┬────────┬────────┬────────┬────────┐
        │Brainstorm│Critic│Roadmap│ Task  │ Pitch  │
        │(Llama)  │(Llama)│(Llama)│(Cerebras)│(Llama)│
        └────────┴────────┴────────┴────────┴────────┘
```

**Why This Matters**:
- Clean agent isolation (each agent is independent)
- Scalable horizontally (can add more agent instances)
- Production-ready deployment pattern
- Demonstrates multi-provider orchestration (OpenRouter + Cerebras)

**Proof**: See `docker-compose.yml` (5 services) and `nginx.conf` (routing logic)

---

## 💡 Innovation Highlights

### 1. **Persona-Aware AI** (NEW!)
**Problem**: Generic brainstorming gives irrelevant ideas  
**Solution**: AI adapts to your context  
- Student → $0-200 budget, 10-15hrs/week
- Entrepreneur → $100k+ potential, B2B focus
- Hackathon → 24-48hr builds with existing APIs

**Judge Test**: Generate ideas with all 3 personas. Verify students get simple ideas (Notion templates), entrepreneurs get B2B SaaS, hackathons get technical projects.

### 2. **Enhanced Task Estimates** (NEW!)
**Problem**: Single-hour estimates don't account for skill variance  
**Solution**: Time ranges + difficulty ratings  
- `(Effort: 2-4h | Difficulty: Medium)` is more realistic than `(Effort: 3h)`
- Color-coded difficulty badges (Green=Easy, Orange=Medium, Red=Hard)

**Judge Test**: Generate tasks from roadmap. Verify each task shows time range and color-coded difficulty badge.

### 3. **Visual Spatial Thinking**
**Problem**: Linear chat interfaces force sequential thinking  
**Solution**: Infinite canvas for non-linear ideation  
- Drag nodes to organize thoughts
- Visual connections show idea evolution
- Multiple conversation threads in one view

**Judge Test**: Create multiple brainstorm branches. Observe how canvas becomes a "mind map" of ideas.

### 4. **Multi-Agent Specialization**
**Problem**: Single AI model tries to do everything (mediocre at all)  
**Solution**: 5 specialized agents excel at specific tasks  
- Llama 3.3 70B for creativity (brainstorming, critique, roadmaps)
- Cerebras for speed (instant task generation)
- Each agent has custom prompts optimized for its role

**Judge Test**: Compare critique quality vs brainstorm output. Critic should be analytical while brainstormer is creative.

---

## 📊 Technical Excellence

### Advanced Prompt Engineering
1. **Persona Prompts**: 3 different system prompts dynamically selected (lines 29-139 in brainstormer-agent/main.py)
2. **Anti-Repetition**: Maximum penalties (2.0/2.0) + dynamic blacklist
3. **Few-Shot Learning**: Shows exact format examples instead of descriptions
4. **Structured Output**: Cerebras optimized for consistent task format

### Production Architecture
1. **Microservices**: Each agent is isolated container
2. **API Gateway**: Nginx routes to appropriate agents
3. **Streaming**: Server-sent events for real-time responses
4. **Scalable**: Can horizontally scale any agent independently

### Code Quality
- Type-safe TypeScript frontend
- Clean Python FastAPI backends
- Environment variable management
- Error handling and loading states

---

## 🎯 Judging Criteria Alignment

### **Innovation** (⭐⭐⭐⭐⭐)
- First persona-aware brainstorming tool
- Visual spatial canvas (not another chatbot)
- Multi-agent orchestration (5 specialized AIs)
- Enhanced task planning (time ranges + difficulty)

### **Technical Execution** (⭐⭐⭐⭐⭐)
- Advanced prompt engineering (persona-aware, few-shot, maximum penalties)
- Production microservices architecture
- Multi-provider AI orchestration (OpenRouter + Cerebras)
- Real-time streaming responses

### **Sponsor Tech Integration** (⭐⭐⭐⭐⭐)
- **Meta Llama**: 4/5 agents with advanced techniques
- **Cerebras**: Enhanced task agent with time ranges + difficulty
- **Docker**: Full microservices, not just containerization

### **User Experience** (⭐⭐⭐⭐⭐)
- Intuitive visual interface
- Real-time feedback (no loading spinners)
- Smooth workflow (brainstorm → critique → roadmap → tasks → pitch)
- Professional design system

### **Completeness** (⭐⭐⭐⭐⭐)
- End-to-end workflow (idea to pitch deck)
- Workspace management (save/load/edit)
- PDF export for pitch decks
- Comprehensive documentation

---

## 📁 Key Files to Review

1. **README.md** - Project overview with Quick Start
2. **SPONSOR_TECH_USAGE.md** - Detailed proof of sponsor tech integration
3. **ARCHITECTURE.md** - Technical architecture deep dive
4. **brainstormer-agent/main.py** - Persona-aware prompting (lines 29-139)
5. **task-agent/main.py** - Enhanced task estimates (lines 87-112)
6. **docker-compose.yml** - Microservices architecture
7. **frontend/src/App.tsx** - Visual canvas implementation

---

## ✅ Quick Verification Checklist

- [ ] Persona selection modal appears when brainstorming
- [ ] Different personas generate appropriate ideas
- [ ] Tasks show time ranges (X-Yh format)
- [ ] Tasks show color-coded difficulty badges
- [ ] All 5 agents respond correctly
- [ ] Streaming responses work (watch text appear in real-time)
- [ ] Pitch deck exports to PDF
- [ ] Canvas save/load/edit works

---

## 🎬 Demo Script (For Presentation)

> "Hi! I'm going to show you Cognitive Canvas - a multi-agent visual brainstorming platform."
> 
> **[Show canvas]**  
> "Instead of a linear chat, we have an infinite canvas where ideas flow spatially."
> 
> **[Right-click → Brainstorm]**  
> "When I brainstorm, I first choose my persona - Student, Entrepreneur, or Hackathon."
> 
> **[Select Student]**  
> "As a student with limited budget, watch how the AI generates practical ideas..."
> 
> **[Ideas appear]**  
> "See? Notion templates, TikTok channel - all doable with $0-200 and college skills."
> 
> **[Right-click → Criticize]**  
> "Now let's critique this idea. Notice how the AI provides balanced feedback..."
> 
> **[Right-click → Roadmap]**  
> "Let's create a strategic roadmap with phases..."
> 
> **[Right-click → Tasks]**  
> "And break it down into tasks. Notice the time ranges - 2-4 hours - and difficulty ratings."
> 
> **[Right-click → Pitch Deck]**  
> "Finally, we generate an investor-ready pitch deck and export to PDF."
> 
> "All powered by Meta Llama 3.3 70B for creativity, Cerebras for speed, and Docker for scalability. Thank you!"

---

**Total Demo Time**: ~3 minutes  
**Wow Factor**: Persona selection + Visual canvas + Real-time streaming + Full workflow

🎉 **Good luck with judging!**
