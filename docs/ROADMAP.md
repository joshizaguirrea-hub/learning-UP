# Roadmap — Learning UP

> Backlog vivo del proyecto. Marca `[x]` al cerrar. Lo grande y por hacer arriba,
> lo terminado se resume en la BITACORA.md (que es el diario detallado).

Version actual: **v0.267.0**

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
      - [ ] `it5-casa` — "La casa": c'e / ci sono (hay) + preposizioni + verbo stare
      - [ ] `it6-spesa` — "Fare la spesa": numeri + questo/quello + verbo volere
      - [ ] `it7-tempolibero` — "Il tempo libero": potere/volere + infinito + attivita
      - [ ] `it8-ieri` — "Ieri": passato prossimo con avere (-are -> -ato)
      Cada una: reading (2 textos + glossary + check) + vocabulary (12 vocab + 8 act)
      + grammar (chart + 8 act) + writing (8 act). Registrar en `units/index.js`.
      Con it1-it8 el Italiano A1 queda COMPLETO (8 unidades).

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
