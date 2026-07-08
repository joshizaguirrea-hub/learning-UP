"""Motor de base de datos y sesiones (SQLModel)."""
from __future__ import annotations

from collections.abc import Iterator

from sqlmodel import Session, SQLModel, create_engine

from app.config import settings

# check_same_thread=False es necesario para SQLite con FastAPI (multiples hilos).
_connect_args = {"check_same_thread": False} if settings.DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(settings.DATABASE_URL, echo=False, connect_args=_connect_args)


def init_db() -> None:
    """Crea las tablas si no existen. Importa modelos para registrarlos."""
    import app.models  # noqa: F401  (registra los modelos en metadata)

    SQLModel.metadata.create_all(engine)


def get_session() -> Iterator[Session]:
    """Dependencia de FastAPI: entrega una sesion por request."""
    with Session(engine) as session:
        yield session
