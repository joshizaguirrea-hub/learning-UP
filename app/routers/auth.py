"""Rutas de autenticacion: registro, login y logout."""
from __future__ import annotations

from fastapi import APIRouter, Depends, Form, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from sqlmodel import Session, select

from app.config import settings
from app.database import get_session
from app.models import StudentProfile, TeacherProfile, User, UserRole
from app.security import hash_password, make_session_token, verify_password
from app.templates_engine import templates

router = APIRouter()


@router.get("/register", response_class=HTMLResponse)
def register_form(request: Request):
    """Muestra el formulario de registro."""
    return templates.TemplateResponse(request, "register.html", {"error": None})


@router.post("/register")
def register(
    request: Request,
    full_name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    role: str = Form(...),
    is_adult: str | None = Form(None),
    session: Session = Depends(get_session),
):
    """Crea la cuenta + perfil segun rol. MVP: solo mayores de 18."""
    email = email.strip().lower()

    # Politica de edad: MVP solo 18+.
    if is_adult != "on":
        return templates.TemplateResponse(
            request,
            "register.html",
            {"error": "Debes confirmar que eres mayor de 18 anos."},
            status_code=400,
        )

    if role not in (UserRole.STUDENT.value, UserRole.TEACHER.value):
        return templates.TemplateResponse(
            request,
            "register.html",
            {"error": "Rol invalido."},
            status_code=400,
        )

    existing = session.exec(select(User).where(User.email == email)).first()
    if existing:
        return templates.TemplateResponse(
            request,
            "register.html",
            {"error": "Ese correo ya esta registrado."},
            status_code=400,
        )

    user = User(
        email=email,
        password_hash=hash_password(password),
        full_name=full_name.strip(),
        role=UserRole(role),
    )
    session.add(user)
    session.commit()
    session.refresh(user)

    # Crear el perfil correspondiente.
    if user.role == UserRole.STUDENT:
        session.add(StudentProfile(user_id=user.id))
    else:
        session.add(TeacherProfile(user_id=user.id))
    session.commit()

    return _login_redirect(user)


@router.get("/login", response_class=HTMLResponse)
def login_form(request: Request):
    """Muestra el formulario de login."""
    return templates.TemplateResponse(request, "login.html", {"error": None})


@router.post("/login")
def login(
    request: Request,
    email: str = Form(...),
    password: str = Form(...),
    session: Session = Depends(get_session),
):
    """Valida credenciales y crea la sesion."""
    email = email.strip().lower()
    user = session.exec(select(User).where(User.email == email)).first()
    if not user or not verify_password(password, user.password_hash):
        return templates.TemplateResponse(
            request,
            "login.html",
            {"error": "Correo o contrasena incorrectos."},
            status_code=400,
        )
    return _login_redirect(user)


@router.get("/logout")
def logout():
    """Cierra sesion borrando la cookie."""
    resp = RedirectResponse(url="/", status_code=303)
    resp.delete_cookie(settings.SESSION_COOKIE)
    return resp


def _login_redirect(user: User) -> RedirectResponse:
    """Crea la cookie de sesion y redirige al dashboard segun rol."""
    target = "/student" if user.role == UserRole.STUDENT else "/teacher"
    resp = RedirectResponse(url=target, status_code=303)
    resp.set_cookie(
        settings.SESSION_COOKIE,
        make_session_token(user.id),
        httponly=True,
        samesite="lax",
    )
    return resp
