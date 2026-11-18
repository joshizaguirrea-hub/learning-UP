/**
 * ui/session-theme.js — "Traje" visual de una sesion con profesor (Megan,
 * Mathias, Susan...). El motor de chat (features/bymax-session.js) es UNO
 * SOLO para Conversacion, Entrevistas y las 6 competencias -- no se duplica
 * (DRY). Lo unico que cambia por pantalla es el ESTILO: colores del banner,
 * de las burbujas y de las tarjetas de TIP.
 *
 * PEDIDO EXPLICITO de Joshua: Gramatica debe verse con el mismo lenguaje
 * visual "bonito" del mazo de verbos (banner con degradado, tarjetas con
 * sombra, insignias de color) -- SIN tocar Conversacion, Entrevistas ni las
 * demas competencias, y SIN cambiar la forma de dar la clase (sigue siendo
 * un chat en vivo con Megan, no tarjetas estaticas).
 *
 * `DEFAULT` reproduce EXACTO el estilo que ya existia en bymax-session.js
 * antes de este cambio -- cero diferencia visual para quien no pida un tema.
 * `GRAMMAR` reusa el degradado de SKILL_META.grammar (misma identidad de
 * color que el resto de la app usa para Gramatica) y el lenguaje de tarjetas
 * con sombra + insignias que ya usan ui/example-card.js y features/bonus.js.
 */
import { SKILL_META } from "../data/skill-meta.js";

const DEFAULT = {
  key: "default",
  // null = header plano de siempre (fila simple, sin banner). Ver bymax-session.js.
  headerBanner: null,
  headerTitle: "font-bold text-emerald-300",
  headerSubtitle: "text-xs text-slate-400",
  card: "bg-slate-900 border border-slate-700",
  closeBtn: "bg-white/5 text-slate-300 hover:bg-white/10",
  bubbleBot: "bg-slate-800/90 border border-slate-700 text-slate-100 rounded-bl-sm",
  bubbleMe: "bg-emerald-500/25 border border-emerald-500/40 text-emerald-50 rounded-br-sm",
  tipBox: "bg-amber-500/10 border border-amber-500/30 text-amber-200",
  pill: "bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700",
  finishPillReady: "bg-emerald-600/20 border border-emerald-500/40 text-emerald-200 hover:bg-emerald-600/30",
};

const GRAMMAR = {
  key: "grammar",
  // Mismo degradado que SKILL_META.grammar (icono de Gramatica en toda la app):
  // identidad de color consistente, no un color nuevo inventado para esta pantalla.
  headerBanner: "bg-gradient-to-r " + SKILL_META.grammar.gradient + " shadow-lg shadow-indigo-950/40",
  headerTitle: "font-bold text-white text-base",
  headerSubtitle: "text-xs text-white/80",
  card: "bg-slate-900 border-2 border-indigo-500/30 shadow-2xl shadow-indigo-950/50",
  closeBtn: "bg-white/15 text-white hover:bg-white/25",
  // Burbuja de Megan con mas presencia (tarjeta elevada), estilo example-card.js.
  bubbleBot: "bg-slate-800 border border-indigo-500/30 text-slate-100 rounded-bl-sm shadow-md",
  bubbleMe: "bg-gradient-to-br from-indigo-500 to-blue-600 border border-indigo-400/40 text-white rounded-br-sm shadow-md",
  // Mismo lenguaje de insignia que las tarjetas de ejemplo (ui/example-card.js).
  tipBox: "bg-indigo-500/10 border border-indigo-400/30 text-indigo-200",
  pill: "bg-indigo-500/10 border border-indigo-400/40 text-indigo-200 hover:bg-indigo-500/20",
  finishPillReady: "bg-gradient-to-r from-indigo-500 to-blue-600 border border-indigo-400/50 text-white hover:brightness-110",
};

const THEMES = { default: DEFAULT, grammar: GRAMMAR };

/** @param {string} [key] - "grammar" o vacio/desconocido -> DEFAULT (sin cambios). */
export function sessionTheme(key) {
  return THEMES[key] || DEFAULT;
}
