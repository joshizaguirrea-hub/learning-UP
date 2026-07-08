"""Configuracion central de la aplicacion."""
from __future__ import annotations

import os


class Settings:
    """Ajustes simples leidos de variables de entorno (con defaults sanos)."""

    APP_NAME: str = "Plataforma de Idiomas"
    # En produccion, SECRET_KEY DEBE venir de una variable de entorno.
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-only-change-me-in-prod")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./app.db")
    SESSION_COOKIE: str = "idiomas_session"


settings = Settings()
