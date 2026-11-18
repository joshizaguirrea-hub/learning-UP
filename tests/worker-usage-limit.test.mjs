/**
 * tests/worker-usage-limit.test.mjs — Prueba del limitador anti-abuso del
 * Worker (worker/bymax-worker.js) con un KV falso en memoria.
 *
 * POR QUE: el bug real que motivo este cambio -- un salon de clase entero
 * (misma IP de red/NAT) se repartia UN SOLO cupo de 60 peticiones/dia. Esta
 * prueba demuestra que, con `userId`, cada alumno tiene su PROPIO cupo aunque
 * compartan la misma IP; y que sin `userId` (anonimo) el comportamiento viejo
 * (por IP) sigue intacto -- cero regresion.
 *
 * Tambien prueba el "modo economico" (IA SUPLENTE gratis, Workers AI): al
 * agotar el cupo de pago, el alumno NO debe recibir un corte en seco (429) si
 * hay un binding `AI` disponible -- debe seguir recibiendo respuestas (200),
 * solo que de un modelo mas simple. El 429 solo debe aparecer si TAMBIEN el
 * modo economico falla (sin binding AI, como en los tests viejos de arriba).
 *
 * El worker es un modulo ESM normal (export default { fetch }), asi que se
 * puede importar e invocar directo en Node con un `env` falso.
 * Correr con:  node tests/worker-usage-limit.test.mjs
 */
import assert from "node:assert/strict";
import worker from "../worker/bymax-worker.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }
async function testAsync(name, fn) { await fn(); passed++; console.log(`  ok - ${name}`); }

/** KV falso en memoria (misma forma que el binding real de Cloudflare: get/put). */
function fakeKv() {
  const store = new Map();
  return {
    async get(key) { return store.has(key) ? store.get(key) : null; },
    async put(key, value) { store.set(key, value); },
    _store: store,
  };
}

/** Binding Workers AI falso: responde siempre lo mismo, sin red real. */
function fakeAi(respuesta = "Respuesta del modo economico (prueba).") {
  return { run: async () => ({ response: respuesta }) };
}

function fakeEnv(overrides = {}) {
  return { AUDIO_KV: fakeKv(), LIMITE_DIARIO: "4", ...overrides };
}

/** Request de chat falso (lo que manda services/bymax-ai.js), desde una IP fija. */
function chatRequest({ userId, ip = "10.0.0.1" } = {}) {
  return new Request("https://worker.test/", {
    method: "POST",
    headers: { "Content-Type": "application/json", "CF-Connecting-IP": ip },
    body: JSON.stringify({ mode: "conversation", question: "hola", userId }),
  });
}

await testAsync("sin userId: dos peticiones de la MISMA ip comparten el cupo (comportamiento viejo, sin regresion)", async () => {
  const env = fakeEnv();
  // Gemini no esta configurado en el env falso -> el chat fallara DESPUES del
  // control de uso, pero lo que probamos es el status code del LIMITE, no el
  // de la IA. Con tope=4 y LOTE=5 (ninguna escritura intermedia a KV), 5
  // peticiones de la misma IP deben bloquear la 5ta.
  const results = [];
  for (let i = 0; i < 5; i++) {
    const res = await worker.fetch(chatRequest({ ip: "10.0.0.1" }), env);
    results.push(res.status);
  }
  assert.ok(results.includes(429), `deberia bloquear en algun punto: ${results}`);
});

await testAsync("CON userId: dos alumnos distintos en la MISMA ip NO comparten cupo", async () => {
  const env = fakeEnv();
  // Alumno A agota su cupo (tope=4) desde la IP del salon.
  const resultsA = [];
  for (let i = 0; i < 5; i++) {
    resultsA.push((await worker.fetch(chatRequest({ ip: "10.0.0.5", userId: "alumno-a" }), env)).status);
  }
  assert.ok(resultsA.includes(429), "alumno A deberia agotar su propio cupo");

  // Alumno B, MISMA ip (mismo salon/NAT), userId distinto: no deberia estar
  // bloqueado solo porque A ya gasto el suyo.
  const resB = await worker.fetch(chatRequest({ ip: "10.0.0.5", userId: "alumno-b" }), env);
  assert.notEqual(resB.status, 429, "alumno B no deberia heredar el bloqueo de alumno A");
});

await testAsync("/status con userId lee el bucket del alumno, no el de la IP", async () => {
  const env = fakeEnv();
  // Satura el cupo de "profe-joshua" (3 peticiones, tope=4 -> aun no bloquea).
  for (let i = 0; i < 3; i++) {
    await worker.fetch(chatRequest({ ip: "10.0.0.9", userId: "profe-joshua" }), env);
  }
  const statusUrl = "https://worker.test/status?userId=profe-joshua";
  const res = await worker.fetch(new Request(statusUrl, { headers: { "CF-Connecting-IP": "10.0.0.9" } }), env);
  const data = await res.json();
  assert.equal(data.limite, 4);
  assert.ok(data.usados >= 3, `deberia reflejar lo gastado por profe-joshua: ${JSON.stringify(data)}`);

  // Un alumno nuevo (otro userId), MISMA ip: su /status debe verse limpio.
  const resOtro = await worker.fetch(
    new Request("https://worker.test/status?userId=alumno-nuevo", { headers: { "CF-Connecting-IP": "10.0.0.9" } }),
    env,
  );
  const dataOtro = await resOtro.json();
  assert.equal(dataOtro.usados, 0, "un alumno nuevo no deberia heredar el gasto de otro en la misma ip");
});

await testAsync("MODO ECONOMICO: al agotar el cupo de pago, sigue respondiendo (200) con la IA suplente gratis, no 429", async () => {
  const env = fakeEnv({ AI: fakeAi("Claro, sigamos practicando (modo economico).") });

  // Agota el cupo normal del alumno (tope=4).
  let last;
  for (let i = 0; i < 5; i++) {
    last = await worker.fetch(chatRequest({ ip: "10.0.0.20", userId: "alumno-sin-cupo" }), env);
  }
  // Con el binding AI presente, NO deberia cortar en seco: sigue en 200.
  assert.equal(last.status, 200, "deberia seguir respondiendo con la IA suplente, no bloquear");
  const data = await last.json();
  assert.equal(data.brain, "economico", "deberia marcar que la respuesta vino del modo economico");
  assert.ok(data.answer && data.answer.length > 0, "deberia traer una respuesta usable");
});

await testAsync("MODO ECONOMICO: si NI la IA suplente responde, ahi si se corta con 429 (ultimo recurso)", async () => {
  const env = fakeEnv({ AI: { run: async () => { throw new Error("Workers AI caido"); } } });
  let last;
  for (let i = 0; i < 5; i++) {
    last = await worker.fetch(chatRequest({ ip: "10.0.0.21", userId: "alumno-mala-suerte" }), env);
  }
  assert.equal(last.status, 429, "sin ninguna IA disponible, el ultimo recurso sigue siendo el aviso de limite");
  const data = await last.json();
  assert.equal(data.limite, true);
});

console.log(`\n${passed} pruebas en verde.`);
