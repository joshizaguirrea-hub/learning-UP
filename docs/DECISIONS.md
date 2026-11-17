# Registro de Decisiones (ADRs) — Plataforma de Idiomas

> Formato ADR (Architecture Decision Record). Cada decision es corta,
> con contexto, decision y consecuencias. Las decisiones no se borran:
> si cambian, se marcan como "Reemplazada por ADR-XXX".

---

## ADR-001 — Stack gratuito: JS + Supabase + GitHub Pages (PWA)

- **Estado:** Aceptada (2026-07-06)
- **Contexto:** El proyecto es personal y con presupuesto limitado; debe ser
  gratuito hasta conseguir ingresos o patrocinio. Se evaluo FastAPI (Python),
  pero requiere un servidor corriendo y los free tiers se duermen o expiran.
- **Decision:** Frontend en HTML + Tailwind + JavaScript (ES Modules), backend
  con Supabase free tier, hosting en GitHub Pages, como PWA. Mismo stack que
  Fit Match (ya conocido por el equipo).
- **Consecuencias:**
  - (+) Costo $0, despliegue simple, ya lo sabemos operar.
  - (+) Supabase da auth + Postgres + storage + realtime sin backend propio.
  - (-) Logica sensible (pagos) requerira Edge Functions o servicio externo luego.
  - Si llega patrocinio, se puede migrar a un backend dedicado sin rehacer el front.

## ADR-002 — ES Modules desde el dia uno (sin build, sin cache-busting manual)

- **Estado:** Aceptada (2026-07-06)
- **Contexto:** Fit Match sufrio con 33 scripts y `?v=N` manual (deuda tecnica
  documentada). No queremos repetirlo.
- **Decision:** Usar `import`/`export` nativos con UN punto de entrada
  (`src/main.js`). La version de cache la maneja el Service Worker leyendo `VERSION`.
- **Consecuencias:**
  - (+) Sin herramientas de build; funciona directo en GitHub Pages.
  - (+) Un solo lugar para versionar cache.
  - (-) Requiere servir por HTTP (no `file://`) para que los modulos carguen.

## ADR-003 — Arquitectura por capas con dependencia unidireccional

- **Estado:** Aceptada (2026-07-06)
- **Contexto:** Queremos una base solida y modulos faciles de entender.
- **Decision:** Capas `data -> core -> features -> ui`, con `services` (I/O)
  inyectados. `core` es logica pura y nunca importa UI ni servicios.
- **Consecuencias:**
  - (+) Los motores (pricing, placement, plan) son testeables sin navegador.
  - (+) Cambiar Supabase por otro backend solo toca `services/`.
  - (-) Un poco mas de ceremonia al inicio (vale la pena).

## ADR-004 — MVP solo 18+ (politica de edad)

- **Estado:** Aceptada (2026-07-06) — proviene de `DISENO.md`
- **Contexto:** La interaccion 1-a-1 por video con menores implica carga legal
  fuerte (COPPA, GDPR-K). Patron de la industria: italki/Preply exigen 18+;
  Open English separo un producto "Junior".
- **Decision:** El MVP acepta solo mayores de 18. Un producto "Junior" separado
  queda para fase futura.
- **Consecuencias:** (+) Lanzamiento legalmente mas simple. (-) No captamos el
  segmento infantil todavia.

## ADR-005 — Techo de cobro escalonado por nivel + rating

- **Estado:** Aceptada (2026-07-06) — proviene de `DISENO.md`
- **Contexto:** Un techo unico ahuyenta a los mejores profesores.
- **Decision:** El techo sube con el nivel maximo del profesor y con su rating.
  Implementado en `core/pricing.js` (logica pura).
- **Consecuencias:** (+) Protege al alumno y retiene talento. (-) Reglas de
  precio un poco mas complejas (encapsuladas en un modulo).

## ADR-006 — Desactivar el candado de sesion de Supabase (navigator.locks)

- **Estado:** Aceptada (2026-07-06) — leccion heredada de Fit Match
- **Contexto:** En Fit Match, el candado entre-pestanas que usa supabase-js
  (navigator.locks) dejaba el login colgado en "Ingresando..." para siempre en
  ciertos navegadores/contextos.
- **Decision:** Al crear el cliente pasamos `auth.lock` como una funcion que
  ejecuta directamente el callback (`async (_n, _t, fn) => await fn()`),
  desactivando el candado. Config en `src/config/supabase.js`.
- **Consecuencias:** (+) Evita el cuelgue de login conocido. (-) Sin el candado
  entre-pestanas; aceptable para el MVP (sin operaciones criticas concurrentes
  entre pestanas).

## ADR-007 — Limite de IA por USUARIO (no por IP) + checklist de capacidad pre-lanzamiento

- **Estado:** Aceptada (2026-11-17)
- **Contexto:** En una clase en vivo, la IA se corto a los ~30 min. Causa:
  `LIMITE_DIARIO` (anti-abuso, `worker/bymax-worker.js`) se contaba **por IP**,
  y una llamada de voz gasta ~2 peticiones/turno (chat + TTS sin cache) -> 60
  cupos / 2 = 30 turnos = ~30 min de conversacion fluida. Ademas, un salon de
  clase entero detras de la MISMA IP (NAT compartida) se repartia ese UNICO
  cupo -- el primero en gastarlo dejaba mudos a los demas.
- **Decision:** `controlarUso()` arma el bucket del contador por `userId`
  (Supabase) cuando el cliente esta logueado, y solo cae a IP para anonimos.
  `services/bymax-ai.js` manda el `userId` automaticamente (via
  `currentUser()`) en CADA llamada, sin tocar cada pantalla que usa el chat.
  Se documento ademas, en `docs/CAPACIDAD-Y-COSTOS-IA.md`, el modelo de costo
  real (precios oficiales de Gemini/OpenAI/Cloudflare) y un checklist de
  aristas pendientes para soportar ~2000 estudiantes conectados: la cuenta
  gratuita de Gemini (10 peticiones/min, 250/dia PARA TODA LA APP) es el
  cuello de botella real, no Cloudflare.
- **Consecuencias:**
  - (+) Un salon de clase ya no comparte cupo entre alumnos (ver
    `tests/worker-usage-limit.test.mjs`).
  - (+) Queda documentado el presupuesto estimado (~$115-$720/mes en
    adopcion normal con 2000 registrados; techo de ~$7,200/mes sin frenos de
    gasto) y la secuencia recomendada antes de abrir el lanzamiento a escala.
  - (-) La capacidad GLOBAL de la app sigue limitada por el tier gratuito de
    Gemini hasta que se contrate un tier pagado y se confirme su RPM real --
    este ADR NO resuelve eso, solo evita que empeore por reparto de IP.

_Ultima actualizacion: 2026-11-17 · Autor: Horus_
