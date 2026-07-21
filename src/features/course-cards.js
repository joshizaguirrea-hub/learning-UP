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
import { unlockedUnitIds } from "../core/progression.js";

const PANEL = "bg-slate-900 border border-slate-800 rounded-2xl";

// Paleta de gradientes vibrantes; cada unidad toma uno (ciclico) para que el
// mosaico se vea colorido y facil de distinguir de un vistazo. Ordenados con
// intencion: azules/teal (confianza), violetas (premium), verde (progreso),
// calidos (energia, pocos) y rosas/cyan para variedad.
const TILES = [
  "from-indigo-500 via-blue-600 to-blue-800",
  "from-fuchsia-500 via-purple-600 to-purple-800",
  "from-emerald-400 via-teal-600 to-teal-800",
  "from-amber-400 via-orange-600 to-orange-800",
  "from-rose-500 via-pink-600 to-rose-800",
  "from-cyan-400 via-sky-600 to-blue-800",
  "from-violet-500 via-indigo-600 to-indigo-800",
  "from-lime-400 via-green-600 to-emerald-800",
];

/** Emoji tematico segun palabras clave del titulo (personalidad + memoria visual). */
function topicEmoji(title = "") {
  const t = title.toLowerCase();
  const map = [
    [/(work|career|job|office|business)/, "\uD83D\uDCBC"],
    [/(travel|plan|trip|vacation|holiday)/, "\u2708\uFE0F"],
    [/(tech|internet|computer|digital|online)/, "\uD83D\uDCBB"],
    [/(environment|nature|planet|climate|green)/, "\uD83C\uDF31"],
    [/(education|learn|school|study|university)/, "\uD83D\uDCDA"],
    [/(money|shop|finance|bank|buy)/, "\uD83D\uDCB0"],
    [/(relationship|family|friend|love|people)/, "\uD83D\uDC9E"],
    [/(media|news|press|journal)/, "\uD83D\uDCF0"],
    [/(health|lifestyle|fitness|body|wellness)/, "\uD83D\uDCAA"],
    [/(food|eat|restaurant|cook|meal)/, "\uD83C\uDF7D\uFE0F"],
    [/(home|house|city|place)/, "\uD83C\uDFE0"],
    [/(sport|game|play)/, "\u26BD"],
    [/(music|art|culture|movie|film)/, "\uD83C\uDFB5"],
    [/(weather|season)/, "\u26C5"],
  ];
  for (const [re, emoji] of map) if (re.test(t)) return emoji;
  return "\u2728";
}

/**
 * Seccion "Tu curso" con las unidades del nivel como mosaico cuadrado.
 * @param {Array} units - unidades del nivel
 * @param {Object} progressMap - id de leccion -> { status }
 */
export function courseCards(units, progressMap) {
  // Sendero secuencial: cada unidad se desbloquea al completar la anterior.
  const completed = new Set(
    Object.entries(progressMap).filter(([, v]) => v?.status === "done").map(([id]) => id));
  const unlocked = unlockedUnitIds(units, completed);

  const tiles = units.length
    ? units.map((u, i) => unlocked.has(u.id) ? unitTile(u, progressMap, i) : lockedTile(u, i))
    : [el("p", { class: "text-sm text-slate-400" }, "Pronto habra mas unidades para tu nivel.")];

  return el("section", { class: PANEL + " p-5" },
    el("div", { class: "flex items-center justify-between flex-wrap gap-2" },
      el("h2", { class: "text-lg font-bold" }, "Tu curso"),
      el("span", { class: "text-xs text-slate-500" }, `${units.length} temas`)),
    el("p", { class: "text-slate-400 text-sm mt-1" }, "Completa una unidad para desbloquear la siguiente."),
    el("div", { class: "mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3" }, ...tiles));
}

/** Tarjeta BLOQUEADA: mismo tama\u00f1o, en gris, con candado y sin enlace. */
function lockedTile(unit, i) {
  return el("div", {
    class: "relative aspect-[4/3] rounded-2xl overflow-hidden shadow-inner bg-slate-800/60 border border-slate-700/60 cursor-not-allowed",
    "aria-label": `${unit.title}, bloqueada. Completa la unidad anterior para desbloquearla.`,
    "aria-disabled": "true",
    title: "Completa la unidad anterior para desbloquear",
  },
    el("div", { class: "absolute inset-0 grid place-items-center" },
      el("div", { class: "w-12 h-12 rounded-full bg-slate-900/70 grid place-items-center text-slate-400", html: ICONS.lock })),
    el("div", { class: "relative h-full p-3 sm:p-4 flex flex-col" },
      el("div", { class: "flex items-center justify-between" },
        el("span", { class: "text-[10px] font-mono font-bold bg-black/40 text-slate-400 px-2 py-0.5 rounded-md" }, unit.level),
        null),
      el("div", { class: "flex-1" }),
      el("h3", { class: "text-slate-400 font-bold text-sm sm:text-base leading-tight" }, unit.title)));
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
    class: "group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg " +
      "transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl " +
      "focus:outline focus:outline-2 focus:outline-white/70 will-change-transform",
    "aria-label": `${unit.title}, nivel ${unit.level}, ${done} de ${total} lecciones`,
  },
    // 1) Color de base (gradiente diagonal de 3 paradas -> mas profundidad).
    el("div", { class: `absolute inset-0 bg-gradient-to-br ${grad}`, "aria-hidden": "true" }),
    // 2) Brillo/gloss superior-izquierdo (sensacion "vidrio", vivo).
    el("div", { class: "absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full bg-white/25 blur-2xl opacity-70", "aria-hidden": "true" }),
    // 3) Anillo decorativo inferior-derecho (profundidad + textura).
    el("div", { class: "absolute -bottom-10 -right-10 w-36 h-36 rounded-full border-[10px] border-white/10", "aria-hidden": "true" }),
    // 4) Emoji tematico marca de agua (personalidad + memoria visual).
    el("div", { class: "absolute top-2 right-2 text-4xl sm:text-5xl opacity-25 group-hover:opacity-40 group-hover:scale-110 transition duration-300 select-none", "aria-hidden": "true" }, topicEmoji(unit.title)),
    // 5) Sheen que barre al pasar el mouse (dinamismo premium).
    el("div", { class: "card-sheen absolute inset-0", "aria-hidden": "true" }),
    // 6) Sombra SOLO abajo (scrim) -> el color brilla arriba y el texto se lee.
    el("div", { class: "absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/25 to-transparent", "aria-hidden": "true" }),
    // Contenido.
    el("div", { class: "relative h-full p-3 sm:p-4 flex flex-col" },
      el("div", { class: "flex items-center justify-between" },
        el("span", { class: "text-[10px] font-mono font-bold bg-black/40 backdrop-blur-sm text-white px-2 py-0.5 rounded-md" }, unit.level),
        complete
          ? el("span", { class: "w-6 h-6 rounded-full bg-emerald-400/90 text-slate-900 flex items-center justify-center shadow", html: ICONS.check })
          : null),
      el("div", { class: "flex-1 flex items-end" },
        el("h3", { class: "text-white font-extrabold text-sm sm:text-base leading-tight drop-shadow-lg" }, unit.title)),
      el("div", { class: "mt-2" },
        el("div", { class: "flex items-center justify-between mb-1" },
          el("p", { class: "text-[11px] font-semibold text-white/90" }, `${done}/${total} lecciones`),
          pct > 0 ? el("p", { class: "text-[11px] font-bold text-white" }, pct + "%") : null),
        el("div", { class: "w-full bg-black/35 rounded-full h-1.5 overflow-hidden" },
          el("div", { class: "bg-gradient-to-r from-white to-white/80 h-1.5 rounded-full transition-all duration-500", style: `width:${pct}%` })))));
}
