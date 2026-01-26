# Bitácora de Desarrollo — StackX

Fecha de inicio: 2026-01-26

## Tareas completadas

- [x] Crear estructura inicial del backend (FastAPI)
- [x] Añadir modelos SQLAlchemy (`Category`, `Technology`, `Attribute`, `TechScore`, `Compatibility`) — `backend/app/models.py`
- [x] Configurar conexión a base de datos y `SessionLocal` — `backend/app/database.py`
- [x] Implementar lógica de recomendador (media ponderada) — `backend/app/recommender.py`
- [x] Añadir cliente IA con fallback (Ollama env var) — `backend/app/ai_client.py`
- [x] Crear endpoint `POST /recommend-stack/` — `backend/app/routes/recommend.py`
- [x] Añadir Pydantic schemas — `backend/app/schemas.py`
- [x] Añadir seed de ejemplo para tecnologías y atributos — `backend/app/seed_data.py`
- [x] Crear `README.md` con instrucciones básicas — `README.md`
- [x] Scaffold frontend Next.js y GROQ client stub — `frontend/` (package.json, next.config.js, lib/groqClient.js)
- [x] Añadir página principal con sliders que consumen la API — `frontend/pages/index.jsx`
- [x] Añadir listado de tecnologías con GROQ (fallback si no configurado) — `frontend/pages/tech.jsx`
- [x] Añadir Dockerfiles para backend y frontend
- [x] Añadir `docker-compose.yml`, `Makefile` y `.env.example` para desarrollo local
- [x] Añadir GitHub Actions CI básica — `.github/workflows/ci.yml`
- [x] Añadir script de sincronización con Sanity/GROQ — `backend/app/sanity_sync.py`
- [x] Añadir endpoint admin `/admin/sync-groq/` y protección por token opcional — `backend/app/routes/admin.py`
- [x] Implementar scheduler APScheduler para sincronizaciones periódicas — `backend/app/scheduler.py`
- [x] Añadir documentación de uso del admin y del sincronizador en `README.md`

## Tareas pendientes / Recomendadas

- [ ] Proteger endpoints con autenticación completa (JWT o similar) para producción
- [ ] Implementar workers asíncronos (Celery/RQ) para procesamiento en background escalable
- [ ] Implementar vector store y pipeline RAG para justificaciones con LLMs
- [ ] Añadir pruebas unitarias e integración (backend + frontend E2E)
- [ ] Añadir Docker Compose secrets y producción-ready configs (Postgres managed, Redis, vector DB)
- [ ] Implementar CI/CD con despliegues canary/blue-green
- [ ] Mejorar el modelo de datos: materialized views, índices y migraciones (Alembic)
- [ ] Añadir observabilidad: métricas, logs estructurados y tracing
- [ ] Añadir una página de administración y UI para gestionar `tech_scores` y compatibilidades

## Cambios realizados (archivos clave)

- `backend/requirements.txt`: dependencias incluidas (`fastapi`, `uvicorn`, `sqlalchemy`, `pydantic`, `requests`, `psycopg2-binary`, `apscheduler`)
- `backend/app/*`: modelos, DB, lógica, rutas, AI client, scheduler, sanity sync
- `frontend/*`: Next.js scaffold, pages, GROQ client, recommendation service
- `docker-compose.yml`, `Makefile`, `.env.example` para desarrollo local
- `.github/workflows/ci.yml` para build básico

## Cómo ejecutar localmente (resumen)

1. Backend (entorno virtual):
```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.app.main:app --reload
```

2. Sembrar datos de ejemplo:
```bash
python - <<'PY'
from backend.app.database import SessionLocal
from backend.app.seed_data import seed
db = SessionLocal()
seed(db)
db.close()
PY
```

3. Frontend (Next.js):
```bash
cd frontend
npm install
npm run dev
```

4. Opcional: levantar con Docker Compose (requiere Docker):
```bash
docker-compose up --build
```

## Notas

- El endpoint admin `/admin/sync-groq/` está protegido por `ADMIN_TOKEN` si esta variable está definida.
- El cliente IA usa `OLLAMA_URL` cuando está configurado; de lo contrario devuelve una justificación templada y determinista.
