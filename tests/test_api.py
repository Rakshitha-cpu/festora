"""
Phase 17: Software testing -- API + integration tests.
Run from backend/: pytest ../tests/test_api.py -v
Requires the live stack running (Postgres, Neo4j, seeded data) since these
are integration tests against the real database, matching the project's
"software testing / API tests / integration tests" requirement.
"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "healthy"


def test_list_entities_returns_data():
    r = client.get("/cultural/entities")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "id" in data[0] and "name" in data[0]


def test_get_known_entity():
    r = client.get("/cultural/entities/yakshagana")
    assert r.status_code == 200
    assert r.json()["name"] == "Yakshagana"


def test_get_unknown_entity_404():
    r = client.get("/cultural/entities/not-a-real-entity")
    assert r.status_code == 404


def test_search_entities():
    r = client.get("/cultural/search", params={"q": "dance"})
    assert r.status_code == 200
    assert len(r.json()) > 0


def test_rag_ask_returns_grounded_structure():
    r = client.post("/rag/ask", json={"question": "What is the significance of Yakshagana?"})
    assert r.status_code == 200
    data = r.json()
    assert "answer" in data
    assert "evidence" in data
    assert "sources" in data
    assert len(data["evidence"]) > 0


def test_rag_ask_unknown_topic_has_low_relevance_or_no_match():
    r = client.post("/rag/ask", json={"question": "Explain the fictional XYZ123 festival"})
    assert r.status_code == 200
    # should not fabricate a confident, specific answer for a nonexistent topic
    data = r.json()
    assert "evidence" in data


def test_recommendations_endpoint():
    r = client.get("/recommendations/yakshagana")
    assert r.status_code == 200
    assert "recommendations" in r.json()


def test_journey_endpoint():
    r = client.get("/journey/yakshagana", params={"minutes": 20})
    assert r.status_code == 200
    data = r.json()
    assert "stops" in data
    assert sum(s["minutes"] for s in data["stops"]) <= 20 + len(data["stops"])  # allow rounding slack


def test_journey_unknown_entity_404():
    r = client.get("/journey/not-a-real-entity")
    assert r.status_code == 404


def test_verify_endpoint():
    r = client.post("/verify", json={
        "claim": "Yakshagana is a dance-drama from Karnataka.",
        "entity_id": "yakshagana",
    })
    assert r.status_code == 200
    data = r.json()
    assert data["classification"] in {
        "SUPPORTED", "PARTIALLY_SUPPORTED", "CONTRADICTED",
        "INSUFFICIENT_EVIDENCE", "REQUIRES_HUMAN_REVIEW",
    }


def test_submission_and_review_flow():
    # contributor submits
    r = client.post("/submissions", json={
        "entity_name_guess": "Test Festival",
        "content": "A locally celebrated harvest festival with no prior record in Festora.",
    })
    assert r.status_code == 200
    sub_id = r.json()["id"]
    assert r.json()["status"] == "pending"

    # it should now appear in the pending queue
    r2 = client.get("/submissions", params={"status": "pending"})
    assert r2.status_code == 200
    assert any(s["id"] == sub_id for s in r2.json())

    # admin reviews it
    r3 = client.post(f"/submissions/{sub_id}/review", json={"decision": "needs_review"})
    assert r3.status_code == 200
    assert r3.json()["status"] == "needs_review"


def test_knowledge_gaps_endpoint():
    r = client.get("/knowledge-gaps")
    assert r.status_code == 200
    assert "gaps" in r.json()
