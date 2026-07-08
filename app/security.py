"""Seguridad: hashing de contrasenas y manejo de sesion firmada."""
from __future__ import annotations

import bcrypt
from itsdangerous import BadSignature, URLSafeSerializer

from app.config import settings

_serializer = URLSafeSerializer(settings.SECRET_KEY, salt="session")

# bcrypt trunca a 72 bytes; codificamos y recortamos de forma explicita.
_MAX_BCRYPT_BYTES = 72


def _encode(plain: str) -> bytes:
    return plain.encode("utf-8")[:_MAX_BCRYPT_BYTES]


def hash_password(plain: str) -> str:
    """Devuelve el hash bcrypt de una contrasena."""
    return bcrypt.hashpw(_encode(plain), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    """Comprueba una contrasena contra su hash."""
    try:
        return bcrypt.checkpw(_encode(plain), hashed.encode("utf-8"))
    except ValueError:
        return False


def make_session_token(user_id: int) -> str:
    """Serializa y firma el id de usuario para la cookie de sesion."""
    return _serializer.dumps({"uid": user_id})


def read_session_token(token: str) -> int | None:
    """Lee un token de sesion; devuelve el user_id o None si es invalido."""
    try:
        data = _serializer.loads(token)
    except BadSignature:
        return None
    return data.get("uid")
