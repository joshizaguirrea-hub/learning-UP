# Auditoria de voz i18n (Italiano/Portugues) - 2026-07-31

> Auditoria de SOLO LECTURA hecha por Horus en la laptop de trabajo (sin correr
> servidor). Objetivo: mapear por que la voz de Italiano/Portugues suena en
> ingles en varias partes, para arreglarlo CON pruebas en la PC personal.

## Resumen ejecutivo

El motor de voz tiene DOS caminos y solo uno soporta idiomas != es/en:

| Funcion (src/ui/speech.js) | Soporta it/pt/fr | Como |
|----------------------------|:----------------:|------|
| `speakButton` / `speakMono` | SI | Rutea a la nube (`cloudSpeak(text, base)`) con `baseOf(lang)` que ya conoce it/pt/fr/ja. Cae al navegador si falla. |
| `speak` / `speakSequence`   | NO | Motor **bilingue es/en**: usa `toBilingualItems` (clasifica cada palabra es/en) y el prefetch/play fuerzan `isEs ? "es" : "en"`. Un texto italiano se lee con voz **inglesa**. |

Regla de oro: **cualquier cosa que pase por `speak()`/`speakSequence()` con un
idioma que no sea es/en, sonara en ingles.**

## Que funciona y que NO en Italiano A1 (voz)

| Zona | Archivo | Mecanismo | Voz it |
|------|---------|-----------|:------:|
| Glosario (por termino) | `features/lesson-teaching.js:205` `glossarySection` | `speakButton(term, {lang: tts})` | OK |
| Lectura "Escuchar todo" | `features/lesson-teaching.js:27,194` `readingSection`/`playSeqButton` | `speakSequence(items)` | ROTA (ingles) |
| Titulo + narracion lectura | `features/lesson-teaching.js:169` `readingItems` | items con `lang: tts` -> `speakSequence` | ROTA |
| Dialogos (turnos) | `features/lesson-teaching.js:141` `turnItem` via `playSeqButton` | `speakSequence` | ROTA |
| Gramatica (ejemplos) | `features/lesson-teaching.js:315` `grammarBox` | REVISAR (si usa speakSequence -> rota; si speakButton -> ok) |
| Actividad opcion elegida (MC) | `features/lesson-player.js:471` `mcActivity` | `speak(text, "en-US")` hardcodeado | ROTA |
| Actividad cloze (banco) | `features/lesson-player.js:506` `clozeActivity` | `speak(word, "en-US")` | ROTA |
| Actividad word_bank | `features/lesson-player.js:546` `wordBankActivity` | `speak(w, "en-US")` | ROTA |
| Actividad listening | `features/lesson-player.js:657` `listeningActivity` | `p.lang || "en-US"` -> `speakSequence` | ROTA |

Nota: `speakButton` (speech.js:415) YA rutea bien: `if (base!=="en" && base!=="es") speakMono(text, lang)`.

## Preguntas de QA para confirmar EN CASA (PC personal)

1. En una unidad de Italiano, toca el altavoz del **Glosario** -> deberia sonar
   en italiano (confirmar que el camino bueno funciona).
2. Toca **"Escuchar todo"** de la Lectura -> hipotesis: suena en ingles (bug).
3. Entra a una **actividad** (opcion multiple / banco de palabras) y toca una
   opcion en italiano -> hipotesis: suena en ingles (bug).
4. Anota cuales suenan mal para priorizar.

## Fix propuesto (hacer CON pruebas en la PC personal)

Estrategia: que `speak()` y `speakSequence()` sepan reproducir un idioma
"mono" (it/pt/fr/ja) en vez de forzar es/en. Opciones:

- **A (recomendada, mas segura):** cuando el `lang`/`def` NO sea es/en, saltar
  `toBilingualItems` y mandar el texto ENTERO a `cloudSpeak(text, base)` con
  `base = baseOf(lang)`. Asi el ingles/espanol siguen EXACTO por el camino
  bilingue de siempre (cero regresion) y it/pt/fr entran por el mono de nube.
  - En `speakSequence`: por item, si `baseOf(it.lang)` es it/pt/fr/ja, usar el
    camino cloud mono (como hace `speakMono`) en vez del `isEs?"es":"en"`.
  - En `speak`: idem antes de partir en `toBilingualItems`.
- **B:** crear `speakSeqMono(items, lang)` y que `playSeqButton` lo use cuando
  `tts` no sea es/en. Mas aislado pero duplica logica (menos DRY).

Ademas, en `lesson-player.js`:
- Threadear `const tts = unitTts(unit);` desde `renderLessonPlayer` -> `activityStep`
  -> `renderActivity(act, idx, tts)` -> `mcActivity/clozeActivity/wordBankActivity/listeningActivity(..., tts)`.
- Reemplazar los `"en-US"` hardcodeados por `tts` (en MC, el default de
  `speakLang` pasa de `"en-US"` a `tts`; el override `speakLang: null` sigue
  desactivando audio como hoy).
- Ojo: para que suene it, las actividades deben usar el camino que soporta it
  (speakMono o speak() ya arreglado por el fix A).

## Recomendacion sobre el ROADMAP

BLOQUEAR "Publicar Italiano A1" (tarea del lunes) hasta cerrar este fix de voz.
Publicar hoy dejaria la lectura/dialogos/actividades sonando en ingles. Primero
arreglamos el motor (opcion A) + threading de actividades, probamos en casa, y
LUEGO se publica.
