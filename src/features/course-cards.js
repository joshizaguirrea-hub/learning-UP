/**
 * features/course-cards.js — Unidades del nivel como MOSAICO de tarjetas cuadradas.
 *
 * Capa de feature (presentacion). El curso es el protagonista del inicio: cada
 * unidad (tema) es una tarjeta CUADRADA y vistosa. Al tocarla se navega a la
 * pantalla completa de la unidad (#/unidad/:id) con todo su contenido.
 *
 * La logica de progreso ya viene calculada; aqui solo se orquesta y pinta.
 */
import { ICONS } from "../ui/icons.js";
import { el } from "../ui/dom.js";

const PANEL = "bg-slate-900 border border-slate-800 rounded-2xl";

// Paleta de gradientes vibrantes; cada unidad toma uno (ciclico) para que el
// mosaico se vea colorido y facil de distinguir de un vistazo.
const TILES = [
  "from-indigo-500 to-blue-700",
  "from-fuchsia-500 to-purple-700",
  "from-emerald-500 to-teal-700",
  "from-amber-500 to-orange-700",
  "from-rose-500 to-pink-700",
  "from-cyan-500 to-sky-700",
  "from-violet-500 to-indigo-700",
  "from-lime-500 to-green-700",
];

/**
 * Seccion "Tu curso" con las unidades del nivel como mosaico cuadrado.
 * @param {Array} units - unidades del nivel
 * @param {Object} progressMap - id de leccion -> { status }
 */
export function courseCards(units, progressMap) {
  const tiles = units.length
    ? units.map((u, i) => unitTile(u, progressMap, i))
    : [el("p", { class: "text-sm text-slate-400" }, "Pronto habra mas unidades para tu nivel.")];

  return el("section", { class: PANEL + " p-5" },
    el("div", { class: "flex items-center justify-between flex-wrap gap-2" },
      el("h2", { class: "text-lg font-bold" }, "Tu curso"),
      el("span", { class: "text-xs text-slate-500" }, `${units.length} temas`)),
    el("p", { class: "text-slate-400 text-sm mt-1" }, "Toca un tema para ver su contenido y avanzar de nivel."),
    el("div", { class: "mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3" }, ...tiles));
}

/** Una tarjeta CUADRADA de unidad (tema), enlazada a su pantalla completa. */
function unitTile(unit, progressMap, i) {
  const total = unit.lessons.length;
  const done = unit.lessons.filter((l) => progressMap[l.id]?.status === "done").length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const complete = total > 0 && done === total;
  const grad = TILES[i % TILES.length];

  return el("a", {
    href: `#/unidad/${unit.id}`,
    class: `group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br ${grad} ` +
      "shadow-lg hover:brightness-110 hover:scale-[1.02] transition-transform " +
      "focus:outline focus:outline-2 focus:outline-white/70",
    "aria-label": `${unit.title}, nivel ${unit.level}, ${done} de ${total} lecciones`,
  },
    // Velo oscuro para legibilidad del texto sobre el gradiente.
    el("div", { class: "absolute inset-0 bg-slate-950/35" }),
    el("div", { class: "relative h-full p-3 sm:p-4 flex flex-col" },
      // Fila superior: nivel + check si esta completa.
      el("div", { class: "flex items-center justify-between" },
        el("span", { class: "text-[10px] font-mono font-bold bg-black/35 text-white px-2 py-0.5 rounded" }, unit.level),
        complete
          ? el("span", { class: "w-6 h-6 rounded-full bg-white/25 text-white flex items-center justify-center", html: ICONS.check })
          : null),
      // Titulo del tema (centro-abajo).
      el("div", { class: "flex-1 flex items-end" },
        el("h3", { class: "text-white font-extrabold text-base sm:text-lg leading-tight drop-shadow" }, unit.title)),
      // Barra de progreso + conteo.
      el("div", { class: "mt-2" },
        el("div", { class: "w-full bg-black/30 rounded-full h-1.5" },
          el("div", { class: "bg-white h-1.5 rounded-full transition-all", style: `width:${pct}%` })),
        el("p", { class: "mt-1 text-[11px] text-white/85" }, `${done}/${total} lecciones`))));
}
