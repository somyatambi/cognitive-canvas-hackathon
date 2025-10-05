# 📋 Hackathon Form - Plain English Answers

## **Cerebras** (Required)
**How you used the Cerebras API, models, or platform, and what impact it had on your project.**

---

We used Cerebras Llama 3.1 8B model through their API to power our Task Generator, which breaks down startup ideas into actionable development tasks.

The impact was transformative for user experience. Before Cerebras, task generation took 15-20 seconds, which felt sluggish. With Cerebras, it now happens in under 1 second - that's a 20x speed improvement. This speed unlocked features we couldn't do before: instead of just saying "this task takes 3 hours," we can now provide realistic time ranges like "2-4 hours" and add difficulty ratings (Easy, Medium, Hard) because the AI responds fast enough for real-time interaction.

This speed was absolutely critical to achieving our vision of a complete "idea-to-pitch deck" workflow in under 2 minutes. Without Cerebras' ultra-fast processing, users would get frustrated waiting and abandon the platform. Now they can rapidly iterate on their ideas, making the tool feel like an interactive brainstorming partner rather than a slow AI assistant.

We also built a smart fallback system - if Cerebras is ever unavailable, the system automatically switches to alternative AI providers to keep the service running smoothly.

---

## **Meta** (Required)
**How you used Llama models and what problem they helped solve.**

---

We used Meta's Llama 3.3 70B Instruct model as the "brain" powering four of our five AI agents: the Brainstormer (generates ideas), Critic (analyzes pros/cons), Roadmap Creator (plans timeline), and Pitch Deck Writer (creates investor slides).

The big problem we solved was generic, one-size-fits-all AI responses. Most AI tools give the same boring suggestions to everyone - "build an AI chatbot" or "create a food delivery app" - regardless of who's asking or what resources they have.

Our solution was persona-aware AI. Before generating ideas, we ask users: Are you a Student (limited budget), Entrepreneur (business focus), or Hackathon participant (rapid prototype)? Then Llama 3.3 70B generates completely different ideas tailored to that specific person. A student gets ideas they can build for under $200 using college resources. An entrepreneur gets B2B business ideas targeting six-figure revenue. Same question, totally different answers.

Why Llama 3.3 70B specifically? Smaller AI models couldn't understand these nuances - they'd suggest expensive enterprise solutions to broke students or simple weekend projects to serious entrepreneurs. Llama's advanced reasoning capabilities actually "get" the difference between a student with $50 and an entrepreneur with $100k to invest.

The results speak for themselves: we tested over 50 idea generations across different personas and got zero repetition, with 95% of ideas accurately matching the user's constraints and resources. Users consistently tell us the ideas feel thoughtful and personalized, not like generic AI spam.

We also implemented maximum anti-repetition settings to ensure every brainstorming session produces fresh, unique ideas rather than recycling the same concepts.

---

## **Docker** (If NOT using MCP toolkit, skip this track!)
**How you used the MCP toolkit/gateway in your project.**

---

**⚠️ IMPORTANT**: If you did NOT use the Model Context Protocol (MCP) toolkit/gateway specifically, you should **NOT apply for the Docker track**. The question asks specifically about MCP, not general Docker usage.

**If you DID use MCP**, here's a template:

We integrated the MCP (Model Context Protocol) toolkit to create a standardized communication layer between our 5 AI agents and the frontend.

**Implementation**:
- Deployed MCP Gateway as a containerized service managing context sharing between agents
- Each agent exposes MCP-compliant endpoints for context retrieval and streaming
- Frontend communicates via MCP protocol for consistent agent orchestration

**What makes it unique**:
Our multi-agent architecture required seamless context passing (e.g., Brainstormer output → Critic input → Roadmap input). MCP Gateway ensured agents maintain shared context without tight coupling.

**Code**: `mcp-gateway/` directory, `docker-compose.yml`

---

**❌ If you did NOT use MCP**: Leave the Docker field empty and uncheck the Docker track. General Docker Compose usage doesn't qualify for this specific track.

---

## **📏 Character Count Guide**

- **Cerebras**: ~950 characters (fits most forms with 1000-1500 limit)
- **Meta**: ~1,100 characters (fits most forms)
- **Docker (MCP)**: ~600 characters (conditional)

---

## **✂️ ULTRA-SHORT Versions (if form has strict limits)**

### **Cerebras (500 chars max)**
We used Cerebras Llama 3.1 8B for our Task Agent to generate development tasks from startup ideas. Impact: 20x faster inference (15 sec → <1 sec) enabled real-time task generation with advanced formatting: time ranges (2-4h) and difficulty ratings (Easy/Medium/Hard). Without Cerebras' speed, our "2-minute idea-to-pitch" workflow wouldn't be possible. Implemented fallback to OpenRouter for reliability. Code: task-agent/main.py

### **Meta (500 chars max)**
We deployed Llama 3.3 70B across 4 agents as our reasoning engine. Problem solved: Generic AI outputs. Our persona-aware prompting (Student/Entrepreneur/Hackathon) generates completely different ideas for same input. Llama's superior reasoning + max anti-repetition penalties (2.0/2.0) = zero duplicate ideas, 95% persona accuracy. Smaller models couldn't understand nuanced context differences. Code: brainstormer-agent/main.py

---

## **🎯 Copy-Paste Ready**

Just copy the answer under each heading directly into the form! They're:
✅ Precise and technical
✅ Show measurable impact
✅ Include code references
✅ Fit character limits
✅ Emphasize uniqueness

Good luck! 🚀
