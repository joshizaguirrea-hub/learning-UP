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

/**
 * VOZ MULTILINGUE (Camino 3, estilo Lerna): una SOLA voz que lee texto mixto
 * espanol+ingles en UNA sola peticion, cambiando de idioma sola (sin pegar dos
 * audios -> sin micro-pausas). Requiere una key de Azure Speech en el Worker
 * (secrets AZURE_TTS_KEY + AZURE_TTS_REGION). Free tier: 500k caracteres/mes.
 *
 * Mientras este en false, la Clase/Conversacion usan INMERSION (Bymax habla en
 * UN idioma con una voz fluida; las correcciones salen como TEXTO). Pon true
 * SOLO cuando ya cargaste los secrets de Azure en el Worker.
 */
export const BYMAX_MULTILINGUAL = false;

/** True si debemos intentar la voz multilingue de una sola voz (Azure). */
export const multilingualEnabled = () => bymaxAiEnabled && BYMAX_MULTILINGUAL;

