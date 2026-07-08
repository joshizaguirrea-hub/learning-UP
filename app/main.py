"""Entrypoint de la aplicacion FastAPI."""
from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, Request
from fastapi.responses import HTMLResponse

from app.config import settings
from app.database import init_db
from app.deps import get_current_user
from app.models import User
from app.routers import auth, student, teacher
from app.templates_engine import templates


@asynccontextmanager
async def lifespan(_: FastAPI):
    """Inicializa la base de datos al arrancar."""
    init_db()
    yield


app = FastAPI(title=settings.APP_NAME, lifespan=lifespan)

app.include_router(auth.router)
app.include_router(student.router)
app.include_router(teacher.router)


@app.get("/", response_class=HTMLResponse)
def home(request: Request, user: User | None = Depends(get_current_user)):
    """Landing page."""
    return templates.TemplateResponse(request, "index.html", {"user": user})
