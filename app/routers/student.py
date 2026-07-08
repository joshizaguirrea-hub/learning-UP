"""Rutas del estudiante: dashboard."""
from __future__ import annotations

from fastapi import APIRouter, Depends, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from sqlmodel import Session, select

from app.database import get_session
from app.deps import get_current_user
from app.models import StudentProfile, User, UserRole
from app.templates_engine import templates

router = APIRouter()


@router.get("/student", response_class=HTMLResponse)
def student_dashboard(
    request: Request,
    user: User | None = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """Panel principal del estudiante."""
    if user is None or user.role != UserRole.STUDENT:
        return RedirectResponse(url="/login", status_code=303)

    profile = session.exec(
        select(StudentProfile).where(StudentProfile.user_id == user.id)
    ).first()

    return templates.TemplateResponse(
        request,
        "student/dashboard.html",
        {"user": user, "profile": profile},
    )
