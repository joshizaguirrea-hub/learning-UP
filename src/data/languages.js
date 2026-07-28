/**
 * data/languages.js — Idiomas que ofrece la plataforma.
 *
 * Datos PUROS. En el MVP solo ingles esta activo; el resto queda listo para
 * activarse cambiando `enabled` a true (arquitectura multi-idioma desde el dia uno).
 */

export const LANGUAGES = [
  { code: "en", name: "Ingles", flag: "GB", enabled: true },
  { code: "es", name: "Espanol", flag: "ES", enabled: false },
  { code: "pt", name: "Portugues", flag: "BR", enabled: true },
  { code: "fr", name: "Frances", flag: "FR", enabled: false },
  { code: "ja", name: "Japones", flag: "JP", enabled: false },
  { code: "it", name: "Italiano", flag: "IT", enabled: false },
];

// Codigos de voz (TTS) y de reconocimiento (micro/STT) por idioma META.
// tts: base que entiende el motor de voz (ui/speech.js: en | es | pt).
// mic: etiqueta BCP-47 para SpeechRecognition (en-US | pt-BR...).
const SPEECH = {
  en: { tts: "en", mic: "en-US" },
  es: { tts: "es", mic: "es-MX" },
  pt: { tts: "pt", mic: "pt-BR" },
};

/** Codigo de voz (TTS) del idioma dado (default "en"). */
export function ttsCode(code) { return (SPEECH[code] || SPEECH.en).tts; }
/** Codigo de microfono (STT) del idioma dado (default "en-US"). */
export function micCode(code) { return (SPEECH[code] || SPEECH.en).mic; }
/** Voz (TTS) del idioma META de una unidad. */
export function unitTts(unit) { return ttsCode(unit?.language || "en"); }
/** Micro (STT) del idioma META de una unidad. */
export function unitMic(unit) { return micCode(unit?.language || "en"); }

/** Solo los idiomas disponibles ahora mismo. */
export function enabledLanguages() {
  return LANGUAGES.filter((l) => l.enabled);
}

/** Busca un idioma por su codigo ISO. */
export function languageByCode(code) {
  return LANGUAGES.find((l) => l.code === code) || null;
}
