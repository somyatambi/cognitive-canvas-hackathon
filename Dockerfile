# Multi-stage build for all agents
FROM python:3.9-slim as base

WORKDIR /app

# Install nginx for routing
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Install Python dependencies for all agents
COPY brainstormer-agent/requirements.txt /app/brainstormer-requirements.txt
COPY critic-agent/requirements.txt /app/critic-requirements.txt
COPY roadmap-agent/requirements.txt /app/roadmap-requirements.txt
COPY task-agent/requirements.txt /app/task-requirements.txt
COPY pitch-deck-agent/requirements.txt /app/pitch-deck-requirements.txt

RUN pip install --no-cache-dir -r /app/brainstormer-requirements.txt \
    && pip install --no-cache-dir -r /app/critic-requirements.txt \
    && pip install --no-cache-dir -r /app/roadmap-requirements.txt \
    && pip install --no-cache-dir -r /app/task-requirements.txt \
    && pip install --no-cache-dir -r /app/pitch-deck-requirements.txt

# Copy all agent code
COPY brainstormer-agent /app/brainstormer-agent
COPY critic-agent /app/critic-agent
COPY roadmap-agent /app/roadmap-agent
COPY task-agent /app/task-agent
COPY pitch-deck-agent /app/pitch-deck-agent

# Create startup script
RUN echo '#!/bin/bash\n\
cd /app/brainstormer-agent && uvicorn main:app --host 0.0.0.0 --port 8001 &\n\
cd /app/critic-agent && uvicorn main:app --host 0.0.0.0 --port 8002 &\n\
cd /app/roadmap-agent && uvicorn main:app --host 0.0.0.0 --port 8003 &\n\
cd /app/task-agent && uvicorn main:app --host 0.0.0.0 --port 8004 &\n\
cd /app/pitch-deck-agent && uvicorn main:app --host 0.0.0.0 --port 8005 &\n\
nginx -g "daemon off;"\n\
' > /app/start.sh && chmod +x /app/start.sh

EXPOSE 8080

CMD ["/app/start.sh"]
