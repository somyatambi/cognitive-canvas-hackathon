# 🧪 Quick Test Guide

## Test Cerebras Integration

To verify Cerebras is working after adding the API key:

### Method 1: Through the App (Recommended)

1. **Start the app** (if not already running):
   ```bash
   docker-compose up -d
   cd frontend
   npm run dev
   ```

2. **Generate a test workflow**:
   - Open `http://localhost:5173`
   - Enter prompt: "mobile app for fitness tracking"
   - Wait for 3 ideas to appear
   - Click "Select & Expand Idea" on any idea
   - Click "Generate Roadmap" button

3. **Trigger Cerebras (Task Agent)**:
   - Wait for roadmap phases to appear
   - Click **"Break Down Tasks"** button
   - This will call the task-agent which uses Cerebras

4. **Check logs**:
   ```bash
   docker logs cognitive-canvas-backend-task-agent-1 --tail 50
   ```

   ✅ **SUCCESS** - You should see:
   ```
   [TASK AGENT] Attempting Cerebras API with model: llama3.1-8b
   ```

   ❌ **FAILURE** - If you see this instead:
   ```
   [TASK AGENT] Using OpenRouter fallback
   ```
   This means Cerebras key is invalid or missing.

### Method 2: Direct API Test

Test the task-agent directly:

```bash
curl -X POST http://localhost:8080/task/generate \
  -H "Content-Type: application/json" \
  -d "{\"prompt\": \"Phase 1: Setup Development Environment\nPhase 2: Build Core Features\nPhase 3: Testing & Deployment\"}"
```

Then check logs:
```bash
docker logs cognitive-canvas-backend-task-agent-1 --tail 20
```

### Method 3: Verify Environment Variable

Check if the key is loaded in the container:

```bash
docker exec cognitive-canvas-backend-task-agent-1 printenv CEREBRAS_API_KEY
```

✅ **Should output**: `csk-8xe6f4rhvp46d4r44prc5rny4m2pr5e4k5pwf9xmpfdjwre4`

---

## Test All 5 Agents

### 1. Brainstormer Agent ✅
- Enter any prompt
- Wait for 3 concise ideas (5-7 words each)
- Should use Meta Llama 3.3 70B

### 2. Critic Agent ✅
- Click "Get Critique" on any idea
- Wait for improvements to appear
- Should use Meta Llama 3.3 70B

### 3. Roadmap Agent ✅
- Click "Select & Expand Idea" → "Generate Roadmap"
- Wait for phases to appear
- Should use Meta Llama 3.3 70B

### 4. Task Agent ✅ (Cerebras!)
- Click "Break Down Tasks" on roadmap
- Wait for categorized tasks (Discovery, Build, Test)
- Should use **Cerebras Llama 3.1 8B**

### 5. Pitch Deck Agent ✅
- Click "Generate Pitch Deck" on any idea
- Wait for slide content to appear
- Click "Download PDF" button
- Should use Meta Llama 3.3 70B

---

## Expected Performance

| Agent | Model | Expected Response Time | Notes |
|-------|-------|------------------------|-------|
| Brainstormer | Llama 3.3 70B | 3-5 seconds | 3 ideas, 5-7 words each |
| Critic | Llama 3.3 70B | 3-5 seconds | Structured improvements |
| Roadmap | Llama 3.3 70B | 4-6 seconds | 3-5 phases |
| **Task** | **Cerebras 8B** | **0.2-0.5 seconds** | 20x faster! |
| Pitch Deck | Llama 3.3 70B | 5-7 seconds | 6-8 slides |

---

## Troubleshooting

### Issue: Cerebras still using fallback

**Check 1**: Verify key in .env file
```bash
cat .env | grep CEREBRAS
```
Should show: `CEREBRAS_API_KEY="csk-8xe6f4rhvp46d4r44prc5rny4m2pr5e4k5pwf9xmpfdjwre4"`

**Check 2**: Restart containers
```bash
docker-compose down
docker-compose up -d
```

**Check 3**: Verify key is loaded in container
```bash
docker exec cognitive-canvas-backend-task-agent-1 printenv CEREBRAS_API_KEY
```

**Check 4**: Check for API errors
```bash
docker logs cognitive-canvas-backend-task-agent-1
```

### Issue: No response from agents

**Check**: All containers running?
```bash
docker ps
```
Should show 6 containers:
- brainstormer-agent
- critic-agent
- roadmap-agent
- task-agent
- pitch-deck-agent
- nginx-gateway

**Fix**: Restart everything
```bash
docker-compose down
docker-compose up -d --build
```

---

## Prize Eligibility Checklist

Before submission, verify:

### ✅ Meta Llama Prize
- [ ] 4 out of 5 agents use Llama 3.3 70B
- [ ] Test brainstormer generates 3 ideas
- [ ] Test critic provides improvements
- [ ] Test roadmap generates phases
- [ ] Test pitch deck generates slides

### ✅ Cerebras Prize
- [ ] Task agent uses Cerebras (check logs!)
- [ ] Response time <1 second (20x faster claim)
- [ ] No fallback to OpenRouter in logs
- [ ] API key verified in container

### ✅ Docker Prize
- [ ] All 6 containers running
- [ ] Documentation honest (no false "MCP" claims)
- [ ] `docker-compose up` works
- [ ] Nginx routing working

---

**Last Updated**: After applying Cerebras API key fix
**Status**: Ready for final testing before submission ✨
