# Festora — Deployment

This scaffold runs entirely locally via docker-compose. Moving to
production requires accounts and manual setup that only you can do --
this doc gives the exact steps.

## Target architecture (per project plan)
- React frontend -> Vercel
- FastAPI backend -> Render
- Postgres + pgvector -> a managed cloud Postgres with the pgvector
  extension enabled (Render Postgres, Supabase, or Neon)
- Neo4j -> Neo4j Aura (free tier available)
- AI -> Gemini API (already using this)

## Steps
1. **Neo4j Aura**: create a free instance at https://neo4j.com/cloud/aura --
   note the new `neo4j+s://` URI, username, password. Re-run
   `graph/seed.cypher` against it once created.
2. **Managed Postgres with pgvector**: create an instance, enable the
   `vector` extension (`CREATE EXTENSION IF NOT EXISTS vector;`), get the
   connection string.
3. **Render (backend)**: connect your GitHub repo, set the root to
   `backend/`, build command `pip install -r requirements.txt`, start
   command `uvicorn app.main:app --host 0.0.0.0 --port $PORT`. Add all
   `.env` variables (pointing at the cloud Postgres/Neo4j from steps 1-2)
   as Render environment variables.
4. **Vercel (frontend)**: connect the repo, root `frontend/`, framework
   preset Vite. Set an environment variable for the API base URL and
   update `App.jsx`'s `API` constant to read from it instead of
   hardcoding `127.0.0.1:8000`.
5. **CORS**: once deployed, update `main.py`'s `allow_origins` from `"*"`
   to your actual Vercel domain before considering this production-ready.

## Not done in this scaffold
No CI/CD pipeline, no secrets management beyond `.env`, no rate limiting,
no authentication on admin routes. Treat this as a working demo
deployment path, not a hardened production setup.
