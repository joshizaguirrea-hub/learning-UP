/**
 * data/motivations.js — Razones para aprender (datos puros).
 * Alimentan la personalizacion del perfil ("Mis metas").
 */
export const MOTIVATIONS = [
  { id: "work", label: "Trabajo / carrera", emoji: "\uD83D\uDCBC" },
  { id: "travel", label: "Viajar", emoji: "\u2708\uFE0F" },
  { id: "exam", label: "Examen / certificacion", emoji: "\uD83C\uDF93" },
  { id: "study", label: "Estudios / academico", emoji: "\uD83D\uDCDA" },
  { id: "family", label: "Familia / amigos", emoji: "\uD83D\uDC6A" },
  { id: "hobby", label: "Hobby / cultura", emoji: "\uD83C\uDFA8" },
];

/** Devuelve la motivacion por id (o null). */
export function motivationById(id) {
  return MOTIVATIONS.find((m) => m.id === id) || null;
}
