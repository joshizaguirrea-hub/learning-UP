/**
 * features/villain-gallery.js — "Galeria de villanos": tus errores VENCIDOS.
 *
 * Reencuadre emocional del repaso de errores: en vez de una lista de cosas en
 * las que fallaste (culpa), cada error que terminas dominando se vuelve un
 * "villano derrotado" coleccionable -- mismo dato de siempre (ui/notebook-store
 * .js -> defeated[]), solo que presentado como trofeo, no como regano.
 */
import { el } from "../ui/dom.js";
import { loadDefeated } from "../ui/notebook-store.js";
import { villainFor } from "../core/villains.js";

/** Tarjeta de un villano vencido: sello "VENCIDO", emoji, nombre, la correccion. */
function villainCard(d) {
  const v = villainFor(d);
  return el("div", {
    class: "relative rounded-2xl border-2 border-dashed border-emerald-500/40 bg-slate-800/60 p-3 pt-4 overflow-hidden text-center",
  },
    el("span", {
      class: "absolute -right-7 top-2 rotate-45 text-[9px] font-black uppercase tracking-widest " +
        "bg-emerald-500 text-slate-900 px-8 py-0.5 shadow",
    }, "Vencido"),
    el("p", { class: "text-4xl", "aria-hidden": "true" }, v.emoji),
    el("p", { class: "mt-1 font-bold text-slate-100 text-sm leading-tight" }, v.name),
    el("p", { class: "mt-2 text-xs text-slate-400 leading-snug" },
      el("span", { class: "line-through text-rose-400" }, d.wrong),
      el("br"),
      el("span", { class: "text-emerald-300 font-semibold" }, d.right)),
    d.defeatedAt ? el("p", { class: "mt-2 text-[10px] text-slate-500" }, fmtDate(d.defeatedAt)) : null);
}

function fmtDate(ts) {
  try {
    return new Date(ts).toLocaleDateString("es-MX", { day: "numeric", month: "short" });
  } catch {
    return null;
  }
}

function emptyState() {
  return el("div", { class: "text-center py-8 text-sm text-slate-400" },
    el("p", { class: "text-4xl mb-2", "aria-hidden": "true" }, "\uD83C\uDFC6"),
    el("p", {}, "Todavia no has vencido ning\u00fan villano."),
    el("p", { class: "mt-1 text-xs text-slate-500" },
      "Practica tus errores con el bot\u00f3n de abajo: cada uno que domines se queda aqu\u00ed de trofeo."));
}

/**
 * Abre la Galeria de villanos de una unidad (overlay, mismo estilo que el Cuaderno).
 * @param {object} unit
 * @param {object} [user]
 */
export function openVillainGallery(unit, user) {
  const defeated = loadDefeated(user?.id, unit?.id);
  const close = () => overlay.remove();

  const grid = defeated.length
    ? el("div", { class: "grid grid-cols-2 sm:grid-cols-3 gap-3 mt-1" }, ...defeated.map(villainCard))
    : emptyState();

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[90vh]",
    role: "dialog", "aria-label": "Galeria de villanos vencidos", "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      el("div", { class: "w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 grid place-items-center text-white" }, "\uD83C\uDFC6"),
      el("div", { class: "flex-1 min-w-0" },
        el("p", { class: "font-bold text-emerald-300 truncate" }, "Galer\u00eda de villanos"),
        el("p", { class: "text-xs text-slate-400" }, defeated.length + " vencido" + (defeated.length === 1 ? "" : "s") + " \u00b7 " + (unit?.title || ""))),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    el("div", { class: "mt-3 overflow-y-auto pr-1", style: "max-height:70vh" }, grid));

  const overlay = el("div", {
    class: "fixed inset-0 z-[60] bg-slate-950/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);
}
