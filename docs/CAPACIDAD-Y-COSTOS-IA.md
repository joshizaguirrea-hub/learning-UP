# Capacidad y Costos de IA — Antes de Lanzar a Escala

> Que pasa el dia que esto deje de ser "un proyecto con unos pocos alumnos" y
> se convierta en 2000+ estudiantes conectados. Precios oficiales verificados
> el **2026-11-17** (fuentes al final) -- **vuelve a verificarlos antes de
> comprometer presupuesto real**, estos numeros cambian sin aviso.
>
> Relacionado: `worker/bymax-worker.js` (limite anti-abuso), `worker/README.md`
> (como se despliega), `ADR-007` en `DECISIONS.md`.

---

## 0. TL;DR (si solo lees un parrafo)

- El cuello de botella **no es Cloudflare** (Workers Paid, $5/mes, sobra).
- El cuello de botella es la **cuenta personal gratuita de Gemini** (10
  peticiones/minuto, 250/dia, PARA TODA LA APP, no por usuario) y el
  **presupuesto prepago de OpenAI** (TTS).
- Costo estimado real con 2000 estudiantes **registrados**: entre **~$115 y
  ~$720/mes** en adopcion normal, con un techo de hasta **~$7,200/mes** si
  TODOS usaran la IA al maximo TODOS los dias sin ningun freno de gasto.
- El arreglo de hoy (limite por `userId` en vez de por IP, ver commit
  `10786e4`) evita que un salon de clase comparta cupo, pero **no resuelve**
  la capacidad global de la cuenta gratuita de Gemini. Eso requiere pasar a
  tier pagado + fijar topes de GASTO (no solo de peticiones).

---

## 1. Que paso (el disparador de este documento)

Dando una clase de italiano en vivo, la IA se corto a los ~30 minutos.
Causa confirmada en el codigo: el limite anti-abuso (`LIMITE_DIARIO = 60`
peticiones/dia) se contaba **por IP**, y cada turno de una llamada de voz
gasta **2 peticiones** (1 chat + 1 audio TTS que no esta en cache, porque lo
que dice la IA en vivo nunca es exactamente igual). 60 / 2 = 30 turnos, que a
ritmo de conversacion normal (~1 intercambio/minuto) son... 30 minutos. No es
un timer escondido: es que se acabo el cupo justo ahi.

Peor aun: ese cupo es **por IP**, asi que un salon entero detras de la misma
red (NAT de colegio/oficina) se repartia el MISMO cupo de 60. Ya corregido
(ver `tests/worker-usage-limit.test.mjs`), pero expuso que nunca se habia
hecho el ejercicio de "¿y si esto despega de verdad?".

---

## 2. Modelo de costo por peticion (con precios oficiales reales)

### Precios verificados (2026-11-17)

| Proveedor / recurso | Precio |
|---|---|
| Gemini 2.5 Flash — input (tier pagado) | $0.30 / 1M tokens |
| Gemini 2.5 Flash — output (tier pagado) | $2.50 / 1M tokens |
| Gemini free tier | 10 peticiones/min, 250/dia, 250k tokens/min — **TOTAL de la app**, no por usuario |
| OpenAI `gpt-4o-mini-tts` — texto de entrada | $0.60 / 1M tokens |
| OpenAI `gpt-4o-mini-tts` — audio generado | $12.00 / 1M audio-tokens |
| Cloudflare Workers Paid | $5/mes, 10M peticiones/mes incluidas |
| Cloudflare KV (Paid) | 1M lecturas y 1M escrituras/mes incluidas |

Fuentes: `ai.google.dev/gemini-api/docs/pricing`,
`ai.google.dev/gemini-api/docs/rate-limits`, `openai.com/api/pricing`,
`developers.cloudflare.com/workers/platform/pricing`.

### Costo estimado por "turno hablado" (chat + audio de la respuesta)

Supuestos de trabajo (etiquetados como ESTIMACION — no hay telemetria real
todavia; validar con un piloto antes de confiar el presupuesto a ciegas):

| Pieza | Supuesto | Costo |
|---|---|---|
| Chat (Gemini) | ~600 tokens entrada (prompt del sistema + historial) + ~90 tokens salida ("2 a 5 frases", regla del propio prompt) | ~$0.0004 |
| TTS (OpenAI) | ~15s de audio por respuesta hablada (~300 audio-tokens estimados) | ~$0.0036 |
| **Total por turno** | | **~$0.0040** (el audio es ~90% del costo) |

Un "turno" = 1 pregunta del alumno + 1 respuesta hablada de la IA. La llamada
de voz de 30 min que disparo esto fueron ~30 turnos: **~$0.12** esa clase.
Barato por clase individual; el problema es la MULTIPLICACION por 2000.

### Escenarios mensuales para 2000 estudiantes **registrados**

(No todos los registrados usan IA activamente — se asume una fraccion.)

| Escenario | % que usa IA | Uso promedio | Costo/alumno activo/mes | Costo TOTAL/mes |
|---|---|---|---|---|
| **A — Conservador** (beta, poca adopcion) | 15% (300) | 8 turnos/dia, 12 dias activos/mes | $0.38 | **~$115** |
| **B — Moderado** ("alumno intenso" que ya describe el propio codigo) | 40% (800) | 15 turnos/dia, 15 dias activos/mes | $0.90 | **~$720** |
| **C — Agresivo** (todos usan IA seguido) | 100% (2000) | 30 turnos/dia (tope actual), 20 dias/mes | $2.40 | **~$4,800** |
| **D — Peor caso** (sin ningun freno de gasto) | 100% (2000) | 30 turnos/dia, 30 dias/mes | $3.60 | **~$7,200** |

**Lectura:** en adopcion realista, estamos hablando de **cientos de dolares al
mes**, no miles — manejable. Pero sin un tope de GASTO real (no solo de
peticiones), un bug, un ataque, o simplemente mas exito del esperado puede
empujar hacia el escenario D sin que nadie lo note hasta llegar la factura.

---

## 3. Capacidad real: los cuellos de botella (no son los que uno piensa)

| Capa | ¿Aguanta 2000 conectados? | Por que |
|---|---|---|
| Cloudflare Worker | SI | 10M peticiones/mes incluidas en Paid ($5/mes) |
| Cloudflare KV | SI | 1M escrituras/mes incluidas; el batching actual (1 escritura cada 5 peticiones) lo deja comodo |
| **Gemini (chat)** | **NO, en free tier** | 10 peticiones/MINUTO para TODA la app. Con 2000 conectados, se agota en segundos sin importar el dia. Tier pagado necesario, y hay que CONFIRMAR el RPM real que ese tier da (Google lo escala por "usage tier" segun historial de gasto, no es automatico el dia 1) |
| **OpenAI (TTS)** | Depende del presupuesto | No es un limite de "capacidad" sino de dinero: escala con el uso real, hay que fondearlo y ponerle techo |
| Supabase (datos, no IA) | Probablemente no en free tier | Revisar conexiones concurrentes y filas con 2000 usuarios activos (SRS cards, progreso) — candidato a pasar a plan Pro |

---

## 4. Checklist de aristas antes de lanzar (no se trata solo de "subir el limite")

### A. Control de gasto (dinero real)
- [ ] Tope de gasto **duro** configurado DIRECTO en la consola de OpenAI y de
      Google Cloud (budgets + alertas), independiente del contador casero del
      Worker — ese contador es una red de seguridad "blanda" por diseno
      (puede perder hasta `LOTE-1` peticiones si Cloudflare recicla el
      isolate), no un tope financiero real.
- [ ] Alertas automaticas (email/Slack) al cruzar 50% / 80% / 100% del
      presupuesto mensual.
- [ ] Decidir el modelo de negocio: ¿la IA es gratis para los 2000, o es
      feature de un plan pago? Sin ingresos atados al uso de IA, el costo no
      tiene techo natural — lo paga directo quien opere la cuenta.

### B. Capacidad / rate limits (que no se caiga en vivo)
- [ ] Confirmar el RPM REAL del tier pagado de Gemini que se contrate (Google
      lo libera por tiers de uso con historial de facturacion, no es
      instantaneo con solo activar la tarjeta).
- [ ] Fallback entre proveedores para CHAT. Hoy el 100% del chat depende de
      UNA sola cuenta de Gemini; TTS ya tiene cascada (OpenAI -> Azure ->
      Google -> Aura), chat no. Si Gemini da 503 masivo, hoy no hay plan B.
- [ ] Simular un pico real: ¿que pasa si 200 profesores arrancan su llamada
      de voz en el mismo minuto (ej. las 8am de un lunes)?

### C. Confiabilidad
- [ ] Las claves de Gemini/OpenAI son de una cuenta **personal**. Con 2000
      usuarios reales, cualquier suspension de esa cuenta (fraude de tarjeta,
      revision de ToS, limite de uso personal excedido) apaga la IA de TODA
      la app de un dia para otro. Pasar a cuenta de facturacion empresarial.

### D. Privacidad / legal
- [ ] Confirmar por escrito (Terminos de Google) que el tier PAGADO de Gemini
      NO usa las conversaciones para entrenar modelos (a diferencia del free
      tier, donde si puede pasar — ya advertido en `worker/README.md`).
- [ ] Actualizar el aviso de privacidad de la app mencionando que las
      conversaciones pasan por Google/OpenAI, antes de tener usuarios reales
      en volumen.

### E. Observabilidad (ver venir el problema, no reaccionar al reclamo)
- [ ] Hoy solo existe la barra individual "Uso de IA de hoy" por alumno
      (`features/skill-levels.js`). Falta un panel agregado: gasto total del
      dia/mes, tasa de error de cada proveedor, cuantos alumnos tocaron el
      tope. Aunque sea un reporte simple, no un dashboard elaborado.
- [ ] Loggear cuando el Worker cae a un fallback (ej. Gemini 503) para
      detectar que "el piso" esta fallando antes de que un alumno se queje.

### F. Abuso (evolucionar lo que ya existe, no solo "subir el numero")
- [ ] El bucket por `userId` exige sesion iniciada; un visitante anonimo
      sigue cayendo a IP — sigue siendo abusable creando cuentas gratis en
      cadena. Con 2000 usuarios reales (mas visibilidad = mas tentacion de
      abuso) vale la pena un limite tambien por cuenta-nueva-por-dia o
      verificacion extra en el registro si se detecta patron de abuso.

### G. Infraestructura no-IA que tambien escala
- [ ] Revisar el tier de Supabase (conexiones concurrentes, filas) con 2000
      usuarios activos -- candidato a Pro antes del lanzamiento, no despues.
- [ ] Activar Cloudflare Workers **Paid** ($5/mes) ANTES del dia de
      lanzamiento, no reactivamente cuando se agote el free tier.

### H. Rollout (no abrir la puerta a los 2000 de una sola vez)
- [ ] Lanzamiento por oleadas / lista de espera: abrir de a 100-200 cuentas
      nuevas, mirar el gasto REAL de IA de esa cola antes de abrir la
      siguiente. Los escenarios de la seccion 2 son estimaciones de papel --
      la telemetria real manda.
- [ ] Confirmar que el "apagador" ya existe y funciona: vaciar
      `BYMAX_WORKER_URL` en `config/bymax.js` desactiva TODA la IA sin romper
      el resto de la app (round-trip ya probado en el codigo). Es el boton de
      panico si el gasto se dispara un fin de semana sin nadie mirando.

---

## 5. Recomendacion de secuencia

1. Ya hecho: limite por `userId`, no por IP (commit `10786e4`).
2. Antes de cualquier anuncio publico: activar Cloudflare Workers Paid ($5/mes,
   trivial) + topes de gasto DUROS en las consolas de OpenAI/Google (gratis de
   configurar, critico).
3. Decidir y contratar el tier pagado de Gemini (o evaluar mover el chat
   principal a OpenAI, que ya esta integrado como motor de voz) + confirmar
   su RPM real.
4. Piloto pequeno (100-200 usuarios reales) midiendo gasto real durante 2-4
   semanas, para reemplazar los supuestos de la seccion 2 por numeros de
   verdad.
5. Rollout por oleadas hacia los 2000, con el panel de observabilidad (D) ya
   funcionando antes de la primera oleada grande.

---

_Ultima actualizacion: 2026-11-17 · Autor: Horus · Precios verificados en
`ai.google.dev`, `openai.com/api/pricing` y `developers.cloudflare.com` el
mismo dia — reverificar antes de comprometer presupuesto, estos numeros
cambian sin aviso previo de los proveedores._
