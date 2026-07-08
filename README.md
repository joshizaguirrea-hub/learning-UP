# Plataforma de Aprendizaje de Idiomas

Plataforma EdTech de dos lados (estudiantes y profesores) para aprender idiomas,
basada en el estandar MCER/CEFR, con plan de estudio personalizado, contenido +
IA, y un marketplace de profesores.

> Alcance del MVP: **ingles** primero (arquitectura lista para multi-idioma).
> Ver `DISENO.md` para el documento de diseno completo.

## Stack

- **Backend:** Python + FastAPI + SQLModel
- **Frontend:** HTMX + Tailwind (via CDN en MVP)
- **DB:** SQLite (MVP) -> PostgreSQL (produccion)
- **Auth:** sesiones firmadas + hashing de contrasenas (passlib/bcrypt)

## Desarrollo

```bash
# Crear entorno e instalar dependencias (Walmart index)
uv venv
uv pip install -r requirements.txt --index-url https://pypi.ci.artifacts.walmart.com/artifactory/api/pypi/external-pypi/simple --allow-insecure-host pypi.ci.artifacts.walmart.com

# Correr el servidor
uv run uvicorn app.main:app --reload
```

Luego abrir http://127.0.0.1:8000

## Estructura

```
app/
  main.py          # entrypoint FastAPI
  config.py        # settings
  database.py      # engine + sesion SQLModel
  models.py        # entidades (User, StudentProfile, TeacherProfile, ...)
  security.py      # hashing + sesiones
  routers/
    auth.py        # registro / login / logout
    student.py     # dashboard estudiante
    teacher.py     # dashboard profesor
  templates/       # Jinja2 + HTMX
  static/
```
