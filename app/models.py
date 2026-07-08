"""Modelos de datos (entidades) del MVP.

Se incluyen las entidades del nucleo para registro/login y perfiles.
Las entidades de examen, plan, marketplace, etc. se agregaran en fases
posteriores (ver DISENO.md).
"""
from __future__ import annotations

from datetime import datetime
from enum import Enum

from sqlmodel import Field, SQLModel


class UserRole(str, Enum):
    """Roles del sistema."""

    STUDENT = "student"
    TEACHER = "teacher"
    ADMIN = "admin"


class CefrLevel(str, Enum):
    """Niveles del Marco Comun Europeo de Referencia (MCER/CEFR)."""

    A1 = "A1"
    A2 = "A2"
    B1 = "B1"
    B2 = "B2"
    C1 = "C1"
    C2 = "C2"
    NATIVE = "Native"


class KycStatus(str, Enum):
    """Estado de verificacion de documentos del profesor."""

    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"


class User(SQLModel, table=True):
    """Cuenta base. Un usuario tiene un rol y, opcionalmente, un perfil."""

    id: int | None = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    password_hash: str
    full_name: str
    role: UserRole
    created_at: datetime = Field(default_factory=datetime.utcnow)


class StudentProfile(SQLModel, table=True):
    """Perfil de estudiante."""

    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", index=True, unique=True)
    native_language: str | None = None
    target_language: str = "en"  # MVP: ingles
    cefr_level: CefrLevel | None = None  # se define tras el examen de ubicacion
    placement_done: bool = False


class TeacherProfile(SQLModel, table=True):
    """Perfil de profesor."""

    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", index=True, unique=True)
    country: str | None = None
    bio: str | None = None
    teaches_language: str = "en"  # MVP: ingles
    # Nivel maximo que puede ensenar (se asigna tras el examen de conocimiento).
    max_cefr_level: CefrLevel | None = None
    hourly_rate: float | None = None
    rating_avg: float = 0.0
    kyc_status: KycStatus = KycStatus.PENDING
    knowledge_exam_done: bool = False
