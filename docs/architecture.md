# Festora — Architecture

## System Overview
Festora is a layered system: a source-of-truth relational store (Postgres),
a relationship layer (Neo4j), a semantic retrieval layer (pgvector + local
embeddings), and an AI layer (Gemini for vision + generation), all fronted
by a single FastAPI backend and a React frontend.

## Data Flow (Phase 7 orchestration)
```
Image Upload
   -> Multimodal AI (Gemini Vision) -- identifies candidate entity
   -> Fuzzy match against verified cultural_entities (Postgres)
   -> Knowledge Graph lookup (Neo4j) -- connected entities, 1-2 hop traversal
   -> RAG retrieval (pgvector cosine similarity over entity_chunks)
   -> Answer generation (Gemini, grounded in retrieved chunks)
   -> Verification Agent -- classifies the generated answer against its own evidence
   -> Response: vision result + matched entity + connected culture + evidence +
      explanation + sources + verification label
```

## Services (backend/app/services/)
- `embeddings.py` -- local sentence-transformer wrapper (all-MiniLM-L6-v2)
- `rag.py` -- retrieval + generation
- `multimodal.py` -- Gemini Vision artifact analysis
- `graph.py` -- Neo4j driver + relationship queries
- `orchestrator.py` -- Phase 7 chain (vision -> match -> graph -> RAG -> verify)
- `verification.py` -- Phase 8 claim classification
- `recommendation.py` -- Phase 9 hybrid (graph + content-based) recommender
- `journey.py` -- Phase 10 itinerary builder
- `contributions.py` -- Phase 13-14 submission + admin review
- `knowledge_gaps.py` -- Phase 16 sparse-entity detection

## Databases
- **Postgres** (`festora` db): `users`, `cultural_entities`, `entity_chunks`
  (with a pgvector column), `artifacts`, `submissions`, `user_interactions`
- **Neo4j**: `Entity` nodes (typed by category label), `LOCATED_IN`,
  `RELATED_TO`, `USES`, `CATEGORY`, `CELEBRATED_AT` relationships

## Known Limitations (honest, as of this scaffold)
- The "Orchestrator" (Phase 7/11) is a sequential Python call chain, not a
  formal multi-agent framework -- sufficient for the demo, but should be
  named accurately in any report as a pipeline, not autonomous agents.
- Recommendation Engine is rule-weighted (graph + category + state overlap),
  not a trained ML model -- matches the plan's explicit guidance to avoid
  an unnecessary deep-learning model for a 15-100 entity dataset.
- Verification Agent falls back to a relevance-threshold heuristic when no
  Gemini key is set; results are meaningfully better with a real key.
- No authentication/authorization is implemented on admin endpoints yet --
  `/submissions/{id}/review` and `/knowledge-gaps` are open. Add JWT auth
  before any real deployment.
