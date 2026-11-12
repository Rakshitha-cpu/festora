import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List

app = FastAPI(
    title="Festora: Wisdom OS API",
    description="Cultural Technology for Modern Minds — Problem-Centric Wisdom & Behavioral Science Engine",
    version="2.4.0"
)

# CORS Middleware to allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "system": "Festora: Wisdom OS",
        "version": "2.4.0",
        "status": "online",
        "philosophy": "Problem -> Experience -> Solution -> Application"
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "database": "active", "oracle": "ready"}

class IntentionSubmission(BaseModel):
    text: str
    location: Optional[str] = "Global"

INTENTIONS_STORE = [
    {"id": 1, "text": "Letting go of perfectionism before exams in London.", "location": "London, UK", "hearts": 24},
    {"id": 2, "text": "12-minute sunrise solar reset after 6 months of silence.", "location": "Bengaluru, India", "hearts": 49},
    {"id": 3, "text": "Trataka candle meditation saved my nervous system from tech burnout.", "location": "Toronto, Canada", "hearts": 62},
]

@app.get("/api/community/intentions")
def get_intentions():
    return {"intentions": INTENTIONS_STORE, "global_active_practitioners": 3482}

@app.post("/api/community/intentions")
def post_intention(item: IntentionSubmission):
    new_entry = {
        "id": len(INTENTIONS_STORE) + 1,
        "text": item.text,
        "location": item.location,
        "hearts": 1
    }
    INTENTIONS_STORE.insert(0, new_entry)
    return {"success": True, "entry": new_entry}

class OracleQuery(BaseModel):
    characterId: str = "oracle"
    query: str
    apiKey: Optional[str] = None

@app.post("/api/oracle/chat")
def oracle_chat(req: OracleQuery):
    # Oracle response engine
    return {
        "characterId": req.characterId,
        "query": req.query,
        "response": f"Wisdom OS contemplation for '{req.query}': Align with the circadian dawn, quiet the default mode network with slow breath, and ground in the somatic present.",
        "source": "backend-oracle"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
