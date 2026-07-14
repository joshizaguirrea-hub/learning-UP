/**
 * config/bymax.js — Configuracion del "Bymax con IA" (opcional).
 *
 * Bymax puede responder dudas libres del alumno usando Gemini, escondido detras
 * de un Cloudflare Worker (ver carpeta /worker y su README.md). El navegador
 * NUNCA ve la API key: solo llama a esta URL del Worker.
 *
 * Para activarlo: despliega el Worker y pega aqui su URL. Mientras este vacio,
 * el chat de Bymax mostrara un aviso amable y NO se rompe nada.
 */

// Pega aqui la URL de tu Cloudflare Worker (ej: https://bymax-ia.tu.workers.dev)
export const BYMAX_WORKER_URL = "https://bymax-ia.joshizaguirrea.workers.dev";

/** True si el Bymax con IA ya esta configurado. */
export const bymaxAiEnabled = /^https?:\/\//.test(BYMAX_WORKER_URL);
