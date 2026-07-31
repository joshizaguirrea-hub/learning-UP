# Roadmap — Learning UP

> Backlog vivo del proyecto. Marca `[x]` al cerrar. Lo grande y por hacer arriba,
> lo terminado se resume en la BITACORA.md (que es el diario detallado).

Version actual: **v0.268.0**

---

## Plan diario (L-V) — arranca 2026-07-31

> Objetivos por dia habil (lunes a viernes). Marca `[x]` al terminar cada uno.
> Al cerrar el dia, el detalle fino se resume en `BITACORA.md`. Ritmo: varios
> objetivos/dia. Estrategia: **cerrar pendientes primero, luego contenido nuevo.**

### Viernes 2026-07-31 (HOY)
- [x] Pushear los 2 commits pendientes (Italiano A1 + fix i18n) -> live en Pages
- [ ] QA microfono (v0.266) en Chrome: validar avisos no-speech / permiso /
      idioma no soportado / red en la clase con IA
- [ ] Validar Italiano A1 en preview (`?preview=1`): recorrer it1-it8 y confirmar
      que lectura, glosario y gramatica suenan en voz **it-IT**

### Lunes 2026-08-03
- [ ] Publicar Italiano A1: quitar `draft:true` en `languages.js` + bump version +
      validadores + push
- [ ] Boton "rehacer plan" para cuentas viejas sin plan en localStorage
- [ ] Smoke test en Chrome (Ctrl+Shift+R)

### Martes 2026-08-04
- [ ] Coach diario: "Empezar la clase" lanza DIRECTO la actividad de `startSkill`
      (hoy solo navega a la unidad)
- [ ] Meta diaria contada por POPs individuales (hoy cuenta lecciones completas)

### Miercoles 2026-08-05
- [ ] Arrancar **Frances A1** (fr): fr1 "Bonjour!" (saluts + verbe etre) +
      fr2 "La famille" (avoir + possessifs), en modo `draft`
- [ ] Cablear catalogo `fr` en `languages.js` (voz fr-FR ya existe)

### Jueves 2026-08-06
- [ ] Frances A1: fr3 "La routine" (present -er) + fr4 "La nourriture" (aimer/manger)
- [ ] `auditContent` del bloque fr (objetivo: 0 errores)

### Viernes 2026-08-07
- [ ] Frances A1: fr5 + fr6
- [ ] Validadores (check_js + check_imports) + commit

### Lunes 2026-08-10
- [ ] Frances A1: fr7 + fr8 -> **Frances A1 COMPLETO (8/8)**
- [ ] Auditoria final + decidir publicar o dejar en draft

### Martes 2026-08-11
- [ ] Arrancar **Japones A1** o **Portugues A2 / Italiano A2** (a definir segun avance)

---

## Sesion 2026-07-31 — Plan del dia

- [ ] **1. ROADMAP.md formal** — este archivo. Backlog por escrito para no depender
      solo de la memoria del kennel. (En progreso)

- [x] **2. Cazar el `en-US` hardcodeado (i18n del motor bilingue)** (v0.267.0)
      La "clase" (lesson-teaching.js) y el "escuchar el pasaje completo" leen con
      voz INGLESA aunque la unidad sea pt/it. Hay que enhebrar el idioma META
      (`unitTts(unit)`) hasta las funciones de voz:
      - `readingSection` / `readingItems` / `turnItem` (lectura + dialogos)
      - `dialogueSection`
      - `glossarySection` (el termino es idioma meta)
      - `grammarBox` (zona "English": formula + ejemplos = idioma meta;
        la zona "El profe te explica" SIGUE en es-MX)
      - Las voces HD Chirp3 `en-US-*` solo deben usarse cuando el idioma es ingles.
      - Call sites en `lesson-player.js` (`buildSteps`) pasan `unitTts(unit)`.

- [ ] **3. Terminar Italiano A1 (unidades 5-8)** — espejo del arco de portugues:
      - [x] `it5-casa` — "La casa": c'e / ci sono (hay) + preposizioni + verbo stare
      - [x] `it6-spesa` — "Fare la spesa": numeri + questo/quello + verbo volere
      - [x] `it7-tempolibero` — "Il tempo libero": potere/andare + infinito + attivita
      - [x] `it8-ieri` — "Ieri": passato prossimo con avere (-are -> -ato)
      Cada una: reading (2 textos + glossary + check) + vocabulary (12 vocab + 8 act)
      + grammar (chart + 8 act) + writing (8 act). Registrar en `units/index.js`.
      Con it1-it8 el Italiano A1 queda COMPLETO (8 unidades).
      HECHO (v0.268.0): 8/8 unidades, auditContent 0 errores, score 100%. Sigue en
      `draft: true` (visible solo en preview) hasta decidir publicar.

- [ ] **4. QA del microfono (v0.266)** — levantar server local y validar que la
      clase con IA avisa bien los estados del microfono (no-speech, permiso,
      idioma no soportado, red). Probar en Chrome (Ctrl+Shift+R).

---

## Backlog / ideas futuras

- [ ] Ensenar francES (fr) y japonES (ja) al catalogo (voz ya cableada; falta contenido A1).
- [ ] Completar Portugues A2 (hoy pt solo tiene A1).
- [ ] Completar Italiano A2.
- [ ] Coach diario: "Empezar la clase" que lance directo la actividad de la
      competencia `startSkill` (hoy navega a la unidad).
- [ ] Meta diaria por POPs individuales (hoy cuenta lecciones completas).
- [ ] Boton "rehacer plan" para cuentas viejas sin plan en localStorage.

---

## Notas de arquitectura utiles

- **Idioma meta por unidad:** `unit.language` ("en" | "pt" | "it"). Helpers en
  `src/data/languages.js`: `unitTts(unit)` (voz), `unitMic(unit)` (STT/BCP-47).
- **Feature flags de idioma:** `LANGUAGES` en `languages.js`. `draft: true` =
  oculto al publico, visible en modo preview (ver `ui/nav.js: isPreview`).
- **Motor de voz:** `src/ui/speech.js`. `speak(text, lang, opts)` y
  `speakSequence(items)`. `baseOf(lang)` ya soporta en/es/pt/it/fr/ja.
- **Convencion i18n:** en cada feature, `const tts = unitTts(unit)` y se pasa
  `tts` como `lang` a `speak`/`speakSequence`.
- **Sin emojis en archivos** (un hook los quita). Sin build (100% estatico).
- **Tests:** `npm test` (unitarios en `tests/`). E2E Playwright en `tests-e2e/`.
