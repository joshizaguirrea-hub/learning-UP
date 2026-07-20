/**
 * ui/theme.js — Sistema de acentos SEMANTICO de Learning UP.
 *
 * En vez de gradientes sueltos y aleatorios por toda la app (efecto arcoiris),
 * definimos UN set de acentos con SIGNIFICADO. Asi los colores comunican:
 *   brand    -> lo principal / marca (indigo->fucsia)
 *   speak    -> hablar / conversar (verde-teal = crecimiento, confianza)
 *   practice -> practica intensiva / trampas (calido = energia, atencion)
 *   reward   -> premios / medallas (ambar = logro)
 *   story    -> narrativa / cuentos (violeta = imaginacion)
 *   share    -> compartir / social (fucsia-violeta)
 *
 * Cada valor es un gradiente Tailwind de 3 paradas (profundidad). DRY: un solo
 * lugar para el color de la app.
 */
export const ACCENTS = {
  brand:    "from-indigo-500 via-purple-600 to-fuchsia-600",
  speak:    "from-emerald-400 via-teal-500 to-cyan-600",
  practice: "from-rose-500 via-red-500 to-orange-600",
  reward:   "from-amber-400 via-amber-500 to-orange-600",
  story:    "from-indigo-500 via-violet-600 to-fuchsia-700",
  share:    "from-fuchsia-500 via-purple-600 to-violet-700",
};

/** Devuelve el gradiente Tailwind de un acento (fallback: brand). */
export function accentGrad(name) {
  return ACCENTS[name] || ACCENTS.brand;
}
