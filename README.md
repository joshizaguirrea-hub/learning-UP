# Learning UP - Plataforma de Aprendizaje de Idiomas

Plataforma EdTech de dos lados (estudiantes y profesores) para aprender idiomas,
basada en el estandar MCER/CEFR: examen de ubicacion, plan de estudio
personalizado, contenido + IA, y un marketplace de profesores.

> Alcance del MVP: **ingles** primero (arquitectura lista para multi-idioma).
> Proyecto personal. Stack elegido por costo $0 (ver `docs/DECISIONS.md`, ADR-001).

## Documentacion

- `DISENO.md` — diseno de negocio (el "que" y el "por que").
- `docs/ARCHITECTURE.md` — arquitectura tecnica (el "como").
- `docs/DECISIONS.md` — registro de decisiones (ADRs).

## Stack

- **Frontend:** HTML + Tailwind (CDN) + JavaScript **ES Modules** (sin build).
- **Backend (BaaS):** Supabase free tier (auth, Postgres, storage).
- **Hosting:** GitHub Pages. **PWA** con Service Worker.

## Puesta en marcha

### 1. Configurar Supabase (gratis)
1. Crea un proyecto en https://supabase.com
2. En el **SQL Editor**, corre `sql/001_users_profiles.sql`.
3. En **Project Settings -> API**, copia la **URL** y la **anon key**.
4. Pegalas en `src/config/supabase.js`.

### 2. Correr en local
Los ES Modules necesitan servirse por HTTP (no `file://`). Usa cualquier
servidor estatico, por ejemplo con Python:

```bash
python -m http.server 5500
```

Luego abre http://127.0.0.1:5500

### 3. Desplegar (gratis)
Sube el repo a GitHub y activa **GitHub Pages** desde la rama `main`.
No hay paso de build.

## Estructura (arquitectura por capas)

```
src/
  main.js         # punto de entrada (router + sesion + guardias)
  config/         # cliente Supabase (llaves publicas)
  data/           # catalogos puros (cefr, languages)
  core/           # motores de logica pura (pricing, placement, plan)
  services/       # I/O con Supabase (auth, profiles)
  features/       # cada feature aislada (auth-ui, student, teacher)
  ui/             # presentacion reutilizable (dom, router, a11y)
sql/              # migraciones numeradas para Supabase
docs/             # ARCHITECTURE.md, DECISIONS.md
tests/            # pruebas (unitarias de core + E2E)
```

Dependencias en una sola direccion: `data -> core -> features -> ui`, con
`services` inyectados. `core` es puro y testeable sin navegador.

## Pruebas

Ver `tests/README.md`. Los motores de `core/` se prueban con Node (sin navegador);
los flujos completos con Playwright (fase siguiente).
