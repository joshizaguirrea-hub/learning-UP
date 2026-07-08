# Arquitectura — Plataforma de Idiomas (LinguaPath)

> Documento vivo. Define la arquitectura objetivo desde el dia uno, aprendiendo
> de la deuda tecnica que Fit Match documento (archivos monstruo, cache-busting
> manual, JS inline). Aqui NO repetimos esos errores.
>
> Regla de oro: **un archivo, una responsabilidad** (max 600 lineas), ES Modules
> nativos, y dependencias en una sola direccion.

---

## 1. Stack (elegido por restriccion de costo = $0)

- **Frontend:** HTML + Tailwind (CDN) + JavaScript **ES Modules** (sin framework, sin build).
- **Backend (BaaS):** **Supabase** free tier -> auth, Postgres, storage (KYC), realtime.
- **Hosting:** GitHub Pages (deploy desde `main`, sin build step). Costo $0.
- **PWA:** Service Worker con version unica desde `VERSION` (sin `?v=N` manual).
- **Pagos / Video / IA:** se integran en fases posteriores (cuando haya ingresos o
  patrocinio). El nucleo del MVP es 100% gratuito.

> Decision registrada en `docs/DECISIONS.md` (ADR-001).

---

## 2. Principios de arquitectura

1. **Capas con dependencia unidireccional:**
   ```
   data  ->  core  ->  features  ->  ui
                \-> services (I/O) inyectados donde se necesiten
   ```
   - `data` y `core` son **puros** (sin I/O, sin DOM) => faciles de testear.
   - `core` NUNCA importa `ui` ni `services`. La logica de negocio no sabe de pantallas.
   - `services` (Supabase) se inyectan; los motores reciben datos, no clientes.
2. **Un archivo, una responsabilidad.** Maximo 600 lineas. Si crece, se parte.
3. **ES Modules nativos** (`import`/`export`) con UN punto de entrada
   (`<script type="module" src="src/main.js">`). Sin cache-busting manual.
4. **Sin logica en el HTML.** Los `.html` son solo markup + el script de entrada.
5. **Fuente unica de version** (`VERSION`) para el Service Worker y assets.
6. **Accesibilidad WCAG 2.2 AA** desde el inicio (modulo `ui/a11y.js`).

---

## 3. Estructura de carpetas

```
plataforma-idiomas/
├── index.html            # landing (marketing) + entrada a la app
├── app.html              # shell de la app autenticada (dashboard)
├── manifest.json         # PWA
├── sw.js                 # Service Worker (cache offline)
├── VERSION               # fuente unica de version
├── DISENO.md             # documento de diseno de negocio (el "que" y el "por que")
├── docs/
│   ├── ARCHITECTURE.md   # este archivo (el "como" tecnico)
│   └── DECISIONS.md      # registro de decisiones (ADRs)
├── src/
│   ├── main.js           # punto de entrada: arranca router + sesion
│   ├── config/
│   │   └── supabase.js   # cliente Supabase (unico lugar con las llaves publicas)
│   ├── data/             # catalogos / datos puros (sin logica)
│   │   ├── cefr.js       # niveles MCER (A1..C2) + descripciones
│   │   └── languages.js  # idiomas soportados (MVP: ingles)
│   ├── core/             # motores de logica PURA (testeables, sin I/O)
│   │   ├── pricing.js    # techo de cobro escalonado por nivel + rating
│   │   ├── placement.js  # motor del examen adaptativo (fase siguiente)
│   │   └── plan.js       # generador de plan de estudio (fase siguiente)
│   ├── services/         # I/O externo (Supabase). El unico que toca la red.
│   │   ├── auth.js       # registro / login / logout / sesion
│   │   └── profiles.js   # perfiles de estudiante / profesor
│   ├── features/         # cada feature aislada (orquesta core + services + ui)
│   │   ├── auth-ui.js    # formularios de registro / login
│   │   ├── student.js    # dashboard del estudiante
│   │   └── teacher.js    # dashboard del profesor
│   └── ui/               # presentacion reutilizable (DOM, router, a11y)
│       ├── dom.js        # helpers minimos de DOM (crear/seleccionar)
│       ├── router.js     # router por hash (#/ruta), sin dependencias
│       └── a11y.js       # utilidades de accesibilidad
├── sql/                  # migraciones numeradas e idempotentes para Supabase
│   └── 001_users_profiles.sql
├── styles/
│   └── app.css           # estilos propios sobre Tailwind
└── tests/
    └── README.md         # como correr las pruebas (Playwright, fase siguiente)
```

---

## 4. Flujo de datos (ejemplo: registro)

```
[auth-ui.js]  (feature: captura el formulario)
     |  llama
     v
[services/auth.js]  (I/O: habla con Supabase Auth)
     |  al exito, crea perfil
     v
[services/profiles.js]  (I/O: inserta en tabla student/teacher)
     |
     v
[ui/router.js]  navega a #/student o #/teacher
```

La UI nunca habla con Supabase directamente: **siempre pasa por `services/`**.
Los motores de `core/` (ej. `pricing.js`) reciben datos ya cargados y devuelven
resultados; no hacen fetch.

---

## 5. Modelo de datos (Supabase / Postgres)

Ver `sql/001_users_profiles.sql`. Entidades del MVP:

- `profiles` — extiende `auth.users` de Supabase (rol, nombre).
- `student_profiles` — nivel MCER, idioma objetivo, si hizo el examen.
- `teacher_profiles` — pais, nivel maximo que ensena, tarifa, rating, estado KYC.

Las tablas de examen, plan, reservas y bitacora se agregan en migraciones
posteriores (`002_...`, `003_...`), numeradas y ordenadas.

---

## 6. Roadmap por fases (reversible con git)

**Fase 0 — Base solida (ESTA)**
- [x] `DISENO.md` (negocio) + `docs/ARCHITECTURE.md` + `docs/DECISIONS.md`.
- [x] Estructura de carpetas por capas.
- [x] `sql/001_users_profiles.sql` (esquema del MVP + RLS).
- [x] Nucleo puro de ejemplo: `core/pricing.js` + `data/cefr.js` (testeables).
- [x] Config de Supabase + servicios de auth/perfiles.
- [x] Landing + shell de app + router + PWA.

**Fase 1 — Examen de ubicacion + plan**
- [ ] `core/placement.js` (motor adaptativo CAT, logica pura).
- [ ] `core/plan.js` (generador de plan segun nivel).
- [ ] UI del examen + persistencia en Supabase.
- [ ] Pruebas E2E (Playwright).

**Fase 2 — Marketplace de profesores**
- [ ] KYC (subida de documentos a Supabase Storage).
- [ ] Agenda, reservas, bitacora, reviews.

**Fase 3 — Integraciones de pago**
- [ ] Stripe (cuando haya ingresos/patrocinio), video embebido, IA.

---

## 7. Convenciones

- **Nombres de archivo:** `kebab-case.js`. Sin prefijos (las carpetas ya dan contexto).
- **JS:** `const`/`let` (nunca `var`), funciones flecha para callbacks, `async/await`.
- **Exports:** nombrados (evitar `export default` salvo punto de entrada claro).
- **SQL:** migraciones numeradas e idempotentes (`IF NOT EXISTS`).
- **Commits:** pequenos, en espanol, tipo `feat/fix/refactor(scope): ...`.
- **Cada feature nueva:** su modulo en `features/` + su prueba en `tests/`.
- **Secretos:** solo las llaves PUBLICAS de Supabase (anon key) van al front.
  Las llaves de servicio jamas se exponen en el cliente.

_Ultima actualizacion: 2026-07-06 · Autor: Horus_
