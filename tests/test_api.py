import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_health():
    r = client.get("/api/health")
    assert r.status_code == 200
    assert r.json()["status"] == "healthy"


def test_intentions_roundtrip():
    r = client.post("/api/community/intentions", json={"text": "test"})
    assert r.status_code == 200
    ids = [i["id"] for i in client.get("/api/community/intentions").json()["intentions"]]
    assert r.json()["entry"]["id"] in ids


def test_oracle_chat():
    r = client.post("/api/oracle/chat", json={"query": "stress"})
    assert r.status_code == 200
    assert "response" in r.json()
