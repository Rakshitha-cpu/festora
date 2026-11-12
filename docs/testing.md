# Festora — Testing

## Test suite
`tests/test_api.py` -- integration tests against the live FastAPI app,
covering: health check, entity listing/search, RAG grounding, verification
classification, recommendations, journey planning, and the contributor
submission -> admin review flow.

## Running
```
cd backend
pip install -r requirements-dev.txt
pytest ../tests/test_api.py -v
```
Requires Postgres + Neo4j running and seeded (see README quickstart) --
these are true integration tests, not isolated unit tests with mocks,
matching the plan's "API tests / Integration tests" requirement.

## Still to add for full Phase 17 coverage
- Unit tests for individual service functions (recommendation scoring,
  journey time allocation) with mocked DB/graph calls
- Authentication tests (once JWT auth is added to admin endpoints)
- Frontend component tests
