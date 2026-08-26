# Roadmap — Learning UP

> Backlog vivo del proyecto. Lo abierto y priorizado arriba; lo terminado se
> resume abajo y el detalle fino vive en `BITACORA.md` (el diario).

Version actual: **v0.305.0**  ·  Ultima actualizacion del roadmap: 2026-08-19

---

## Abierto — priorizado

### P1 — Pulir lo que ya existe (rapido, alto impacto)
- [x] **Boton "Ajustar mi plan"** en el coach del dia (v0.305.0). Reusa el flujo
      de onboarding (`/examen`), que al terminar SOBREESCRIBE el plan (meta /
      tiempo / nivel). Nota: las cuentas viejas sin plan YA no quedan sin coach
      -> `coachCard` autogenera un plan por defecto desde el `cefr`; este boton
      permite afinarlo cuando cambie la meta o el tiempo.
- [ ] **Coach "Empezar la clase" lanza DIRECTO la actividad** de la competencia
      `startSkill` del plan, en vez de solo navegar a `#/unidad/:id`. Requiere
      integrar con los POPs de skill (`unit-content` / `skill-class`).
- [ ] **Reading/Listening -> cuaderno de errores.** Hoy los labs de opcion
      multiple (`reading-lab` / `listening-lab`) NO alimentan el cuaderno; solo
      las clases de texto libre (`bymax-session`) lo hacen -> esas pestanas
      quedan vacias. Hacer que registren errores con su `skill`.
- [ ] **Meta diaria por POPs individuales** (hoy cuenta lecciones completas,
      `course_progress`, no ejercicios sueltos).

### P2 — Contenido nuevo (mas trabajo, mas valor para alumnos)
- [ ] **Frances A1** (fr1-fr8) en modo `draft`. Voz `fr-FR` ya cableada; falta
      contenido. Espejo del arco it/pt: reading + vocabulary + grammar + writing
      por unidad; registrar en `units/index.js`; `auditContent` 0 errores.
- [ ] **Japones A1** (ja). Voz `ja-JP` cableada; falta contenido A1.
- [ ] **Portugues A2** (hoy pt solo tiene A1).
- [ ] **Italiano A2** (hoy it solo tiene A1).

### P3 — QA / calidad
- [ ] **QA de microfono** (v0.266) en Chrome: avisos no-speech / permiso /
      idioma no soportado / red, en la clase con IA.
- [ ] **Validar voces it/pt/fr** recorriendo unidades: lectura, dialogos,
      glosario, gramatica y actividades deben sonar en el idioma meta.

---

## Enviado recientemente (resumen — detalle en BITACORA.md)

- [x] **v0.304.0 — Voz del coach del dia con UNA sola voz de mujer.** El saludo
      ("Buenas tardes, Joshua...") sonaba con 3 voces (es+en+hombre) porque
      `speakRobot` partia por idioma y algunos trozos traian audio masculino
      cacheado. Cambiado a `speakMono` (una peticion, una voz). CONFIRMADO OK.
- [x] **v0.303.0 — Voz por profe por defecto.** Con OpenAI TTS activo el Worker
      ignora `gender` y usa `ttsVoice || 'alloy'`; el contenido sin voz explicita
      sonaba masculino. Fix en `cloud-tts.js`: default = Megan (`nova`, mujer);
      personajes hombres de dialogo (`gender:'M'`) -> `onyx`.
- [x] **v0.302.0 — Cuaderno por pestanas** (Gramatica/Vocabulario/Lectura/
      Listening/Escritura/Speaking + Todos); cada error se etiqueta con su skill.
- [x] **v0.296.0 — Cuaderno de errores por unidad** (acumulativo) + la profe
      ENSENA la palabra cuando el alumno la pide + pronombres/vocab del capitulo.
      (Requirio redeploy del Worker — hecho 2026-08-19.)
- [x] **v0.288-0.295 — Profe 3D** (retratos por rol, avatar animado en entrevista,
      lip-sync, saludo con la mano, 3 voces por profe).
- [x] **v0.244-0.246 — Voz fluida + cuestionario/plan de estudio + Coach del dia.**
- [x] **Italiano A1 (8/8) y Portugues A1 publicados**; i18n del motor de voz
      (it/pt/fr/ja suenan en su idioma). Ver `docs/AUDITORIA-VOZ-2026-07-31.md`.

---

## Notas de arquitectura utiles

- **Idioma meta por unidad:** `unit.language` ("en" | "pt" | "it" | "fr" | "ja").
  Helpers en `src/data/languages.js`: `unitTts(unit)` (voz), `unitMic(unit)` (STT).
- **Feature flags de idioma:** `LANGUAGES` en `languages.js`. `draft: true` =
  oculto al publico, visible en preview (`ui/nav.js: isPreview`).
- **Motor de voz:** `src/ui/speech.js`.
  - `speakMono(text, lang, opts)` -> UNA peticion, UNA voz. Usar para texto de la
    profe que mezcla es/en y debe sonar con una sola voz.
  - `speak()` / `speakSequence()` / `speakRobot()` -> PARTEN por idioma en varias
    voces. NO usar para saludos/instrucciones que deban ir con una sola voz.
- **Voz por profe:** `src/ui/robot-prefs.js` `ROLE_TTS_VOICE` (course=nova Megan,
  speaking=onyx Mathias, interview=shimmer Susan) + `teacherVoice(role)`. Con
  OpenAI activo el Worker usa `ttsVoice` (no `gender`); default en `cloud-tts.js`.
- **Convencion i18n:** en cada feature, `const tts = unitTts(unit)` y se pasa
  como `lang` a las funciones de voz.
- **Sin emojis en archivos** (un hook los quita). Sin build (100% estatico).
- **Validadores:** `.venv\Scripts\python tools\check_js.py <archivo>` y
  `tools\check_imports.py`. **Tests:** `npm test` (unit) + Playwright (`tests-e2e/`).
- **Deploy:** push a `main` -> GitHub Pages auto. Worker: copiar `worker/
  bymax-worker.js` al dashboard de Cloudflare (ver `worker/README.md`).
