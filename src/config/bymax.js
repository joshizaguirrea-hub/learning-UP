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
 * espanol+ingles en UNA sola peticion (sin pegar dos audios -> sin micro-pausas).
 * El Worker usa el PRIMER motor que tengas configurado, por calidad:
 *   1) Azure Speech   (secrets AZURE_TTS_KEY + AZURE_TTS_REGION) - 500k chars/mes gratis
 *   2) OpenAI TTS     (secret OPENAI_API_KEY)                    - calidad premium
 *   3) Google Chirp3-HD (tu GOOGLE_TTS_KEY actual, SIN key nueva) - una sola persona
 *
 * -> Si ya tienes GOOGLE_TTS_KEY en el Worker, solo pon esto en true y funciona.
 * Mientras este en false, la Clase/Conversacion usan INMERSION (Bymax habla en
 * UN idioma con una voz fluida; las correcciones salen como TEXTO TIP:).
 */
export const BYMAX_MULTILINGUAL = true;

/** True si debemos intentar la voz multilingue de una sola voz (Azure). */
export const multilingualEnabled = () => bymaxAiEnabled && BYMAX_MULTILINGUAL;

