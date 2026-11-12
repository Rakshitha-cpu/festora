"""
Phase 18: Evaluation harness.
Runs the live API against tests/eval_dataset.json -- a held-out set,
separate from the seed data used to build the system -- and reports
concrete metrics: RAG retrieval accuracy, verification classification
accuracy, and recommendation precision@5.

Usage (from backend/, with the server running on :8000):
    python ../tests/run_evaluation.py
"""
import json
import os
import requests

API = "http://127.0.0.1:8000"
DATASET_PATH = os.path.join(os.path.dirname(__file__), "eval_dataset.json")


def load_dataset():
    with open(DATASET_PATH) as f:
        return json.load(f)


def eval_rag(questions):
    correct = 0
    for q in questions:
        r = requests.post(f"{API}/rag/ask", json={"question": q["question"]})
        data = r.json()
        top_entity_ids = {e["entity_id"] for e in data.get("evidence", [])}
        hit = q["expected_entity_id"] in top_entity_ids
        correct += int(hit)
        print(f"  [{'OK' if hit else 'MISS'}] {q['question']} -> top entities: {top_entity_ids}")
    total = len(questions)
    print(f"\nRAG retrieval accuracy: {correct}/{total} = {correct/total:.1%}")
    return correct / total


def eval_verification(claims):
    correct = 0
    for c in claims:
        r = requests.post(f"{API}/verify", json={"claim": c["claim"], "entity_id": c["entity_id"]})
        data = r.json()
        actual = data.get("classification")
        hit = actual == c["expected_label"]
        correct += int(hit)
        print(f"  [{'OK' if hit else 'MISS'}] '{c['claim'][:50]}...' -> {actual} (expected {c['expected_label']})")
    total = len(claims)
    print(f"\nVerification classification accuracy: {correct}/{total} = {correct/total:.1%}")
    return correct / total


def eval_recommendations(scenarios):
    precisions = []
    for s in scenarios:
        r = requests.get(f"{API}/recommendations/{s['seed_entity_id']}")
        data = r.json()
        top5_ids = {rec["id"] for rec in data.get("recommendations", [])[:5]}
        expected = set(s["expected_in_top_5"])
        hits = len(top5_ids & expected)
        precision = hits / len(expected) if expected else 0
        precisions.append(precision)
        print(f"  seed={s['seed_entity_id']}: got {top5_ids}, expected overlap with {expected} -> {precision:.0%}")
    avg = sum(precisions) / len(precisions) if precisions else 0
    print(f"\nRecommendation precision@5 (avg): {avg:.1%}")
    return avg


def main():
    data = load_dataset()
    print("=== RAG Retrieval ===")
    rag_score = eval_rag(data["rag_questions"])
    print("\n=== Verification Agent ===")
    verify_score = eval_verification(data["verification_claims"])
    print("\n=== Recommendation Engine ===")
    rec_score = eval_recommendations(data["recommendation_scenarios"])

    print("\n=== Summary ===")
    print(f"RAG retrieval accuracy:      {rag_score:.1%}")
    print(f"Verification accuracy:       {verify_score:.1%}")
    print(f"Recommendation precision@5:  {rec_score:.1%}")


if __name__ == "__main__":
    main()
