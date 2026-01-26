# Stack Recommender (prototype)

Backend prototype with FastAPI, SQLAlchemy and a simple recommender engine.

Run locally:

```bash
python -m pip install -r backend/requirements.txt
uvicorn backend.app.main:app --reload
```

The server will create a local SQLite DB at `dev.db`. To seed sample data, run a short script (use Python REPL):

```py
from backend.app.database import SessionLocal
from backend.app.seed_data import seed
db = next(SessionLocal())
seed(db)
```

Admin sync endpoint
-------------------

Trigger a GROQ/Sanity sync via the admin endpoint (runs in background). If you want to protect this endpoint, set `ADMIN_TOKEN` in your environment and provide it with the request either as an `Authorization: Bearer <token>` header or `X-ADMIN-TOKEN: <token>`.

Example:

```bash
curl -X POST "http://localhost:8000/admin/sync-groq/" -H "Authorization: Bearer your_admin_token_here"
```

Bitácora
-------

Se añadió `BITACORA.md` en la raíz del proyecto con un registro de tareas realizadas y pendientes, instrucciones de ejecución y notas de seguridad.
Periodic sync
-------------

If you set `SANITY_PROJECT_ID`, the app will run an immediate sync at startup and schedule periodic syncs every `SYNC_INTERVAL_SECONDS` (default 3600). You can adjust `SYNC_INTERVAL_SECONDS` in your environment.

