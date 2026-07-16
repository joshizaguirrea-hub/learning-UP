# Bymax IA — Guia de despliegue (gratis, fuera de Walmart)

Bymax puede responder dudas libres del alumno usando **Gemini** (gratis) escondido
detras de un **Cloudflare Worker** (gratis). El navegador nunca ve tu API key.

```
Navegador (Learning UP)  ->  Cloudflare Worker (esconde la key)  ->  Gemini  ->  respuesta
```

---

## Paso 1 — Sacar tu API key de Gemini (gratis, ~2 min)

1. Entra a **https://aistudio.google.com** con tu cuenta Google **personal**.
2. Clic en **"Get API key"** (arriba a la izquierda) -> **"Create API key"**.
3. Copia la key (empieza con `AIza...`). **Guardala, NO la pegues en el repo ni en el chat.**

> Free-tier: ~15 peticiones/min, ~1,500/dia. De sobra para Learning UP.

---

## Paso 2 — Crear el Cloudflare Worker (gratis, ~3 min)

1. Entra a **https://dash.cloudflare.com** y crea cuenta (gratis) si no tienes.
2. Menu izquierdo: **Workers & Pages** -> **Create** -> **Create Worker**.
3. Ponle nombre (ej. `bymax-ia`) -> **Deploy** (crea uno de ejemplo).
4. Clic en **"Edit code"**.
5. **Borra todo** y **pega el contenido de `bymax-worker.js`** (el archivo de esta carpeta).
6. Clic **Deploy** (arriba a la derecha).

---

## Paso 3 — Meter tu key como "secret" (segura)

1. En tu Worker: **Settings** -> **Variables and Secrets**.
2. **Add** -> tipo **Secret**:
   - Name: `GEMINI_API_KEY`
   - Value: tu key `AIza...`
3. (Opcional pero recomendado) **Add** -> tipo **Text**:
   - Name: `ALLOWED_ORIGIN`
   - Value: `https://TU-USUARIO.github.io`  (candado: solo tu app puede usar el Worker)
4. **Deploy / Save** para aplicar.

---

## Paso 3.5 — Activar la VOZ de Bymax (Workers AI, gratis)

Esto le da a Bymax voz de espanol nativo en cualquier dispositivo (endpoint /tts).

1. En tu Worker: **Settings** -> **Bindings** (o "Variables and Bindings").
2. **Add** -> tipo **"Workers AI"**.
   - Variable name: `AI`  (exactamente asi, en mayusculas)
3. **Deploy / Save**.

No requiere key ni tarjeta: Workers AI trae free-tier incluido.

---

## Paso 3.6 — Activar el CACHE de audio (KV, opcional pero recomendado)

Los textos de la app son fijos (reglas, ejemplos, lecciones). Con este cache,
cada audio se genera **una sola vez** y luego se sirve al instante desde KV.
Resultado: costo ~**$0** y carga inmediata. Si NO haces este paso, el Worker
funciona igual (solo se salta el cache).

1. En Cloudflare: **Workers & Pages** -> **KV** -> **Create a namespace**.
   - Nombre sugerido: `bymax-audio` (el nombre interno da igual).
2. Vuelve a tu Worker: **Settings** -> **Bindings** -> **Add** -> tipo **"KV namespace"**.
   - Variable name: `AUDIO_KV`  (exactamente asi, en mayusculas)
   - KV namespace: elige `bymax-audio`
3. **Deploy / Save**.

Detalles tecnicos (ya implementados en `bymax-worker.js`):
- Clave = `tts:v1:<lang>:<sha256(lang|voice|text)>`. El prefijo `v1` permite
  invalidar TODO el cache de golpe (subir a `v2`) si cambias la voz global.
- Los audios cacheados devuelven `"cached": true` en el JSON (util para diagnostico).
- El fallback robotico (Google Translate) NO se cachea, para que reintente
  Chirp3-HD la proxima vez.
- TTL de 30 dias por entrada (se regenera solo si caduca).

---

## Paso 4 — Copiar la URL del Worker

En la pagina del Worker veras una URL tipo:

```
https://bymax-ia.TU-SUBDOMINIO.workers.dev
```

**Copiala y pegala en `src/config.js`** (variable `BYMAX_WORKER_URL`).
Eso ultimo lo hace Horus por ti: solo pasale la URL.

---

## Probar rapido (opcional, desde tu terminal)

```bash
curl -X POST https://bymax-ia.TU-SUBDOMINIO.workers.dev ^
  -H "Content-Type: application/json" ^
  -d "{\"question\":\"por que se usa would en el segundo condicional?\"}"
```

Debe responder un JSON con `{ "answer": "..." }`.

---

## Costos

| Pieza | Costo |
|-------|-------|
| Gemini API (free-tier) | $0 |
| Cloudflare Worker (free-tier: 100k req/dia) | $0 |
| **Total** | **$0** |

## Privacidad
En el free-tier de Gemini, Google puede usar los textos para mejorar sus modelos.
Bymax solo manda la pregunta de ingles del alumno (nada sensible). No envies datos
personales por el chat.
