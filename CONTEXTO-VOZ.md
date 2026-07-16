# CONTEXTO — Saga de la Voz (TTS) de Learning UP

> PALABRA CLAVE PARA RETOMAR: **"retoma learning-UP"** -> leer este archivo y seguir el setup de Google Cloud TTS.

> Documento para retomar el trabajo sin perder contexto si se apaga la PC.
> Ultima actualizacion: 2026-07-15

## Que es este proyecto
- **Learning UP**: PWA para aprender ingles (hispanohablantes). Vanilla JS (ES Modules), Supabase, tema oscuro.
- Repo: `learning-UP` (GitHub, usuario `joshizaguirrea-hub`). Rama unica: `main`.
- Hosting: **GitHub Pages** -> https://joshizaguirrea-hub.github.io/learning-UP/
- La PC del trabajo (esta) edita y hace push. El usuario valida en su PC personal + celular con `git pull` + recarga.
- Mascota/profe: "Profe Horus". Chat IA: "Bymax".
- El usuario (Joshua) esta en **COSTA RICA** (no Mexico).

## Infra de voz e IA (Cloudflare Worker)
- Worker: `bymax-ia.joshizaguirrea.workers.dev`
- Archivo: `worker/bymax-worker.js`
- Endpoints (POST):
  - `/`     -> chat con Gemini (secret `GEMINI_API_KEY`)
  - `/tts`  -> texto a voz. Body: `{ text, lang, voice }`. Devuelve `{ audio: base64mp3, engine }`
- Config front: `src/config/bymax.js` (`BYMAX_WORKER_URL` + `bymaxAiEnabled=true`)
- Cliente TTS front: `src/ui/cloud-tts.js`, voz del navegador (respaldo) en `src/ui/speech.js`

## LA HISTORIA (que ya resolvimos)
1. **Spanglish en el celular**: era CACHE del Service Worker (cache-first) sirviendo codigo viejo.
   - Fix: SW pasado a **network-first** + `updateViaCache:'none'` + `reg.update()` + `?v=` en main.js.
   - Se agrego **version visible en el footer** de index.html para diagnosticar (hoy: v0.107.0).
   - Regla PWA: al cambiar codigo, subir version en `sw.js` (const CACHE) Y footer index.html.
2. **Autoplay movil**: cloud-tts.js ahora reusa UN solo `Audio` desbloqueado por el primer gesto.
3. **Voz espanol robotica**: probamos varias opciones GRATIS, todas fallaron para voz latina natural:
   - Google Translate TTS -> funciona pero ROBOTICO (es el fallback actual, `engine: "google"`).
   - Cloudflare MeloTTS -> roto (AiError 8002) + acento de Espana.
   - **Microsoft Edge TTS (Dalia es-MX)** -> se intento por WebSocket desde el Worker.
     - Bug 1: `wss://` no lo acepta Cloudflare fetch -> cambiado a `https://`.
     - Bug 2: faltaba token `Sec-MS-GEC` -> se implemento (SHA-256 ticks+token).
     - **RESULTADO FINAL: status 403.** Microsoft BLOQUEA las IPs de Cloudflare. Edge DESCARTADO.
4. Ingles: funciona bien con **Deepgram Aura** (`@cf/deepgram/aura-1`) via Workers AI binding `AI`. Suena humano (un poco serio).

## DECISION ACTUAL: Google Cloud Text-to-Speech
Voz latina natural, capa gratis 1,000,000 caracteres/mes. Con cache de audios (texto fijo) = ~$0 siempre.
Estimado de uso: toda la app hablada 1 vez ~= 250,000 chars (1/4 del gratis). Un solo usuario NO paga nada.

### Progreso del setup de Google Cloud (EN CURSO)
- [x] Proyecto creado: **`learning-up-voz`** (Number: 910771139203)
- [x] API **Cloud Text-to-Speech** encontrada (pidio facturacion)
- [x] Cuenta de facturacion creada: **"Learning UP"** (pais: Costa Rica). Costo actual: $0.00
- [ ] **Fase 4 (EN CURSO): Alerta de presupuesto de $1** en "Presupuestos y alertas"
- [ ] **Fase 5 (PENDIENTE): sacar la API KEY**
      Ruta: APIs y servicios -> Credenciales -> Crear credenciales -> Clave de API.
      Luego RESTRINGIRLA a solo "Cloud Text-to-Speech API".
- [ ] **Pegar la key** como secret en el Worker (ej. `GOOGLE_TTS_KEY`), como se hizo con GEMINI_API_KEY.
- [ ] **Codigo Worker**: cambiar `/tts` espanol para llamar a Google Cloud TTS:
      `POST https://texttospeech.googleapis.com/v1/text:synthesize?key=GOOGLE_TTS_KEY`
      body: `{ input:{text}, voice:{languageCode:"es-US", name:"es-US-Neural2-A"}, audioConfig:{audioEncoding:"MP3"} }`
      Respuesta trae `audioContent` (base64) -> devolver como `{ audio, engine:"google-cloud" }`.
      Quitar/dejar como ultimo fallback el googleTts (translate) y edgeTts.
- [ ] **CACHE**: guardar cada audio generado (texto fijo) para no re-gastar. Opciones:
      Cloudflare KV (bind `AUDIO_KV`), clave = hash(lang+voice+text). Genera 1 vez, sirve siempre.

## Herramienta de diagnostico
- `voz-test.html` (en la raiz): pagina INDEPENDIENTE con 2 botones (ES/EN) que van directo al Worker
  y muestran el `[motor: XXX]` que genero el audio. Sirve para probar sin lios de cache de la app.

## Estado de versiones (al momento de escribir)
- SW / footer: **v0.107.0**
- Ultimo commit relevante worker: token Sec-MS-GEC (Edge, que resulto en 403).
- Contenido: los 51 bloques de gramatica ya tienen campos `desc` (para que sirve) y `rule` (como funciona).

## Reglas del proyecto (recordatorio)
- Proyecto PERSONAL: NO usar recursos de Walmart.
- El filtro de emojis/acentos recorta literales: escribir espanol en ASCII o con escapes `\uXXXX` en el codigo JS.
- Declarar TODAS las const de modulo (estilos/config) al INICIO del archivo (evitar TDZ).
- Al cambiar codigo front: subir version en sw.js (CACHE) y footer, commit + push.

## SIGUIENTE PASO INMEDIATO
1. Terminar la **alerta de presupuesto de $1** (Fase 4).
2. **Sacar la API key** de Text-to-Speech y restringirla (Fase 5).
3. Pegarla como secret en el Worker.
4. Escribir el codigo de Google Cloud TTS en `handleTts` (espanol) + cache.
5. Probar en `voz-test.html` -> debe decir `[motor: google-cloud]` y sonar NATURAL/latino.
