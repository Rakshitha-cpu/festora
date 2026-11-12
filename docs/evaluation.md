# Festora — Evaluation

## Held-out test set
`tests/eval_dataset.json` is deliberately separate from the seed dataset
used to build the system (per the project plan's Phase 18 requirement:
"Don't evaluate using the same data you used to build the system").
It currently covers:
- 10 RAG questions with expected source entities
- 5 verification claims (mix of true and deliberately false claims)
- 3 recommendation scenarios with expected top-5 overlap

This is a starting point, not a final benchmark -- for a real submission,
grow this to the sizes the plan specifies (50 images, 100 questions, 50
claims, 20 recommendation scenarios) before reporting final numbers.

## Running it
```
cd backend
python ../tests/run_evaluation.py
```
Requires the live stack (Postgres, Neo4j, seeded data, backend running on
:8000). Reports:
- RAG retrieval accuracy (did the expected entity appear in top evidence?)
- Verification classification accuracy (did the label match ground truth?)
- Recommendation precision@5 (fraction of expected related entities recovered)

## Multimodal accuracy
Not yet automated -- requires a labeled image test set (the plan specifies
50 cultural images). The `/api/artifacts/analyze` endpoint returns a
`vision_result.confidence` field per call; log these against known ground
truth labels to compute accuracy/precision/recall/F1 once you have that set.

## Results (run on the 62-entity dataset)
| Metric | Score |
|---|---|
| RAG retrieval accuracy | 100% (10/10) |
| Verification classification accuracy | 80% (4/5) |
| Recommendation precision@5 | 100% (3/3 scenarios) |

## Known limitation: Verification Agent and factual entailment
The one verification miss ("Yakshagana originated in the 20th century in
Punjab" was classified SUPPORTED instead of CONTRADICTED) reveals that the
agent currently weights topical relevance more heavily than factual
entailment. It correctly retrieves evidence *about* the named entity, but
does not robustly check whether specific claimed facts (dates, locations)
within that evidence actually contradict the claim. This is a natural next
iteration: strengthen the verification prompt to explicitly extract and
cross-check discrete facts (who/what/when/where) rather than judging the
claim holistically against retrieved context.
