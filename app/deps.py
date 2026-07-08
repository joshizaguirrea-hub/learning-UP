"""Dependencias compartidas: obtener el usuario actual desde la cookie."""
from __future__ import annotations

from fastapi import Depends, Request
from sqlmodel import Session

from app.config import settings
from app.database import get_session
from app.models import User
from app.security import read_session_token


def get_current_user(
    request: Request,
    session: Session = Depends(get_session),
) -> User | None:
    """Devuelve el usuario logueado o None (no lanza error)."""
    token = request.cookies.get(settings.SESSION_COOKIE)
    if not token:
        return None
    user_id = read_session_token(token)
    if user_id is None:
        return None
    return session.get(User, user_id)
