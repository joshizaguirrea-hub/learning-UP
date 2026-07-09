/**
 * data/languages.js — Idiomas que ofrece la plataforma.
 *
 * Datos PUROS. En el MVP solo ingles esta activo; el resto queda listo para
 * activarse cambiando `enabled` a true (arquitectura multi-idioma desde el dia uno).
 */

export const LANGUAGES = [
  { code: "en", name: "Ingles", flag: "GB", enabled: true },
  { code: "es", name: "Espanol", flag: "ES", enabled: false },
  { code: "pt", name: "Portugues", flag: "PT", enabled: false },
  { code: "fr", name: "Frances", flag: "FR", enabled: false },
  { code: "ja", name: "Japones", flag: "JP", enabled: false },
  { code: "it", name: "Italiano", flag: "IT", enabled: false },
];

/** Solo los idiomas disponibles ahora mismo. */
export function enabledLanguages() {
  return LANGUAGES.filter((l) => l.enabled);
}

/** Busca un idioma por su codigo ISO. */
export function languageByCode(code) {
  return LANGUAGES.find((l) => l.code === code) || null;
}
