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

## ADR-008 — Japones: ROMAJI primero para hablar/vocabulario; kana de verdad en un segmento aparte

- **Estado:** Aceptada (2026-11-23)
- **Contexto:** Japones usa TRES sistemas de escritura (hiragana, katakana,
  kanji), un obstaculo previo e independiente de aprender a hablar -- muy
  distinto a it/pt/fr, donde el alfabeto ya se conoce. El contenido actual
  mostraba el kana como texto PRINCIPAL y el romaji como nota al margen,
  obligando al alumno a decodificar un alfabeto nuevo antes de poder decir
  una frase. Pedido directo de Joshua: que Habla/Vocabulario salga en romaji
  (ej. "Kare wa gakusei desu") y que aprender a leer/escribir kana de verdad
  viva en su propio segmento. De paso se encontro un bug real de audio: el
  motor de voz (`ui/speech.js`) le quitaba los parentesis al texto pero leia
  kana Y romaji SEGUIDOS con la voz japonesa (sonaba duplicado/raro).
- **Decision:**
  1. `core/ja-script.js` (puro): separa "texto (romaji)" en sus dos partes
     (soporta tanto la convencion de UNA linea como la de lecturas con el
     romaji en su propia linea entre parentesis).
  2. `ui/bilingual-term.js`: `termDisplay(text, lang)` pinta romaji GRANDE +
     kana chiquito al lado SOLO para `lang === "ja"`; para cualquier otro
     idioma es identico a `richText()` de siempre (cero riesgo de regresion).
     `speakSource(text, lang)` siempre manda SOLO el kana a la voz -- arregla
     el bug de audio de paso. Se conecto en grammar-sidebar.js, example-card.js
     y vocab-class.js SIN reescribir el contenido ya autorado de las 8
     unidades (es un cambio de PRESENTACION, no de datos).
  3. `core/vocab-lab.js`: la escalera de practica (`buildVocabLadder`) tenia
     niveles de TECLADO (pista por primera letra, deletreo por distancia de
     edicion, texto fijo "en ingles") que no tienen sentido para un
     silabario. Para japones se usan SOLO los niveles de opcion multiple
     (reconocer + trampa auditiva); los demas idiomas no cambian. De paso se
     corrigio el texto fijo "en ingles" -> nombre real del idioma meta.
  4. NUEVO segmento independiente `features/kana-lab.js` + `core/kana-lab.js`
     + `data/kana-hiragana.js` ("Escritura japonesa", ruta `/escritura`,
     4ta puerta del hub SOLO si el idioma activo es japones): ciclo
     Aprende (flashcard + mnemotecnia + ejemplo) -> Quiz (opcion multiple) ->
     alimenta el MISMO `services/srs.js` que el vocabulario (un caracter es
     una tarjeta mas que recordar, no hace falta un motor nuevo). Vertical
     slice: arranca con vocales + fila \u304b + fila \u3055 (15 caracteres);
     el resto esta en `docs/ROADMAP-JAPONES.md`.
- **Consecuencias:**
  - (+) El alumno puede hablar y reconocer vocabulario desde el dia uno sin
    pelear con un alfabeto nuevo; leer/escribir kana se vuelve una meta
    aparte, a su propio ritmo, sin bloquear el avance tematico.
  - (+) Arregla un bug de audio real (voz japonesa leyendo romaji pegado).
  - (+) Cero riesgo para los demas idiomas: toda la logica nueva es
    condicional a `lang === "ja"`, con fallback identico al comportamiento
    anterior.
  - (-) Las lecciones "Writing" de las 8 unidades de japones (sentence-
    building con fichas de KANA) siguen como antes por ahora -- asumen
    literacia en kana que el alumno recien esta construyendo en el nuevo
    segmento. Quedan marcadas para retirar/adaptar en una fase futura (ver
    roadmap) una vez el segmento de Escritura cubra terreno suficiente.

_Ultima actualizacion: 2026-11-23 · Autor: Horus_
