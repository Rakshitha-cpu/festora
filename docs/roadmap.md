# Festora Roadmap — Status

## Built in this scaffold
- [x] Phase 0: Docs skeleton
- [x] Phase 1: Repo structure
- [x] Phase 2: Seed dataset (15 entities)
- [x] Phase 3: Postgres models + entity/search APIs
- [x] Phase 4: Neo4j seed script + example Cypher queries
- [x] Phase 5: RAG pipeline (local embeddings + pgvector, optional Gemini generation)
- [x] Phase 6: Multimodal artifact upload endpoint (Gemini Vision, mock fallback)
- [~] Phase 11 (partial): Minimal React frontend that talks to the live API

## Not yet built — next steps for you
- [ ] Phase 7: Wire AI → Graph → RAG into one orchestrated call
- [ ] Phase 8: Verification Agent (claim extraction + SUPPORTED/CONTRADICTED/etc.)
- [ ] Phase 9: Recommendation Engine (hybrid: interactions + graph + embeddings)
- [ ] Phase 10: AI Journey Planner
- [ ] Phase 11: Full Agent Orchestrator
- [ ] Phase 12: Full polished frontend (all pages from the plan)
- [ ] Phase 13-14: Contributor + Admin review flows
- [ ] Phase 15: Multilingual/oral pipeline (Kannada + English first)
- [ ] Phase 16: Knowledge gap detection
- [ ] Phase 17-18: Testing + evaluation harness with held-out test set
- [ ] Phase 19: Deployment (Vercel/Render/Neo4j Aura configs)
- [ ] Phase 20: Full documentation set

Build order recommendation unchanged from the original plan: don't start Phase 12 (full UI)
until Phase 7 (AI→Graph→RAG integration) is working end to end — that's your real MVP milestone.
