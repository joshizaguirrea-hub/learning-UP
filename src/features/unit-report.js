/**
 * features/unit-report.js — "Boletin de la unidad": dashboard de resultados.
 *
 * Al terminar una unidad, muestra la CALIFICACION global + el desglose por
 * competencia (grammar, vocabulary, reading, listening, writing, speaking...),
 * senala en que fallaste y que repasar, y deja practicar tus errores de gramatica.
 * Reusa las piezas visuales del feedback de habla (feedback-dashboard.js) -> DRY.
 * Guarda la calificacion por unidad (ui/unit-report-store.js).
 */
import { el } from "../ui/dom.js";
import { ICONS } from "../ui/icons.js";
import { scoreLabel } from "../core/speaking-score.js";
import { buildUnitReport, PASS } from "../core/unit-report.js";
import { SKILL_META } from "../data/skill-meta.js";
import { saveUnitReport } from "../ui/unit-report-store.js";
import {
  scoreRing, areaCard, scorePill, sectionCard, vocabChipsCard, errorsCard, tabsView,
} from "./feedback-dashboard.js";

// Etiqueta + gradiente por competencia (literature no esta en SKILL_META).
const LIT = { label: "Literatura", gradient: "from-violet-500 to-purple-700" };
const metaFor = (id) => SKILL_META[id] || (id === "literature" ? LIT : { label: id, gradient: "from-slate-500 to-slate-700" });

const TIPS = {
  grammar: "Repasa la estructura y practica tus errores t\u00edpicos abajo.",
  vocabulary: "Vuelve al Vocab Lab y a tu repaso (SRS) para fijar las palabras.",
  reading: "Relee el texto buscando datos concretos antes de responder.",
  listening: "Vuelve al dictado: escucha en trozos y escribe lo que oigas.",
  writing: "Arma la frase pieza por pieza y cuida el orden de las palabras.",
  speaking: "Escucha y repite en voz alta, imitando el ritmo del audio.",
  literature: "Apoya cada idea con una cita concreta del texto.",
};

/** Insignia verde/ambar de una nota (o 'pendiente'). */
function scoreBadge(l) {
  if (!l.done) return el("span", { class: "text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-600/40 text-slate-300" }, "Pendiente");
  if (l.score === null) return el("span", { class: "text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-600/30 text-emerald-200" }, "Hecho");
  const ok = l.score >= PASS;
  const cls = ok ? "bg-emerald-600/30 text-emerald-200" : "bg-amber-600/30 text-amber-200";
  return el("span", { class: "text-[11px] font-bold px-2 py-0.5 rounded-full " + cls }, l.score + "/100");
}

function lessonRow(l) {
  return el("div", { class: "flex items-center justify-between gap-2 rounded-lg bg-slate-800/60 border border-slate-700 px-3 py-2" },
    el("span", { class: "text-sm text-slate-200 truncate" }, l.title),
    scoreBadge(l));
}

/** Nodo de la pestana de una competencia. */
function skillTab(skill, report, unit) {
  const meta = metaFor(skill.id);
  const kids = [
    scorePill({ label: meta.label, value: skill.value === null ? 0 : skill.value }),
    el("div", { class: "mt-3 space-y-1.5" }, ...skill.lessons.map(lessonRow)),
  ];

  if (skill.pending) {
    kids.push(el("p", { class: "mt-3 text-sm text-amber-300 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3" },
      "Te falta terminar esta competencia para evaluarla del todo."));
  } else if (skill.weak) {
    kids.push(el("div", { class: "mt-3 rounded-xl border p-3 text-amber-300 border-amber-500/30 bg-amber-500/10" },
      el("p", { class: "text-sm font-bold" }, "Puntos de mejora"),
      el("p", { class: "mt-1 text-sm text-slate-200" }, TIPS[skill.id] || "Rep\u00e1sala con calma y vuelve a intentarlo.")));
  } else {
    kids.push(el("p", { class: "mt-3 text-sm text-emerald-300 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3" },
      "\u00a1Bien! Dominaste esta competencia."));
  }

  // Extra por competencia: gramatica -> practicar errores; vocabulario -> repaso.
  if (skill.id === "grammar" && report.grammarMistakes.length) {
    kids.push(errorsCard(report.grammarMistakes));
  }
  if (skill.id === "vocabulary" && skill.weak && (unit.vocab || []).length) {
    const items = unit.vocab.slice(0, 12).map((v) => ({ word: v.term, note: v.translation || "" }));
    kids.push(vocabChipsCard({ title: "Palabras para repasar", icon: "\uD83D\uDD01", tone: "sky" }, items, "sky"));
  }

  return el("div", {}, ...kids);
}

/** Pestana de recomendaciones (que repasar / felicitacion). */
function recsTab(report) {
  const cards = [];
  if (!report.weakSkills.length) {
    cards.push(el("div", { class: "rounded-xl border p-3 text-emerald-300 border-emerald-500/30 bg-emerald-500/10" },
      el("p", { class: "text-sm font-bold" }, "\u00a1Unidad dominada!"),
      el("p", { class: "mt-1 text-sm text-slate-200" }, "Buen trabajo en todas las competencias. Sigue con la siguiente unidad.")));
  } else {
    cards.push(el("div", { class: "rounded-xl border p-3 text-amber-300 border-amber-500/30 bg-amber-500/10" },
      el("p", { class: "text-sm font-bold" }, "Repasa estas competencias"),
      el("div", { class: "mt-2 space-y-2" },
        ...report.weakSkills.map((id) => el("p", { class: "text-sm text-slate-200" },
          el("b", { class: "text-slate-100" }, metaFor(id).label + ": "), TIPS[id] || "")))));
  }
  cards.push(el("div", { class: "mt-3 rounded-xl border p-3 text-indigo-300 border-indigo-500/30 bg-indigo-500/10" },
    el("p", { class: "text-sm font-bold" }, "Consejo"),
    el("p", { class: "mt-1 text-sm text-slate-200" },
      report.passed
        ? "Vas por buen camino. La constancia diaria es lo que mas mueve la aguja."
        : "No pasa nada: repite las competencias flojas y tu nota subira. \u00a1T\u00fa puedes!")));
  return el("div", {}, ...cards);
}

/**
 * Abre el boletin de la unidad en un overlay y guarda la calificacion.
 * @param {object} unit
 * @param {Object} progressMap - { lessonId: {status, score} }
 * @param {object} [user]
 */
export function openUnitReport(unit, progressMap, user) {
  const report = buildUnitReport(unit, progressMap);
  saveUnitReport(user?.id, report);
  const info = scoreLabel(report.score);

  const close = () => overlay.remove();

  // Pestana General: parrilla de competencias (clicable -> salta a su pestana).
  const general = el("div", {});
  const skillTabs = report.skills.map((s) => ({ label: metaFor(s.id).label, node: skillTab(s, report, unit) }));

  const view = tabsView([
    { label: "General", node: general },
    ...skillTabs,
    { label: "Recomendaciones", node: recsTab(report) },
  ]);

  const areas = report.skills.map((s) => {
    const m = metaFor(s.id);
    return { key: s.id, label: m.label, grad: m.gradient, value: s.value === null ? 0 : s.value };
  });
  const idToTab = {};
  report.skills.forEach((s, i) => { idToTab[s.id] = i + 1; });
  general.append(
    el("p", { class: "text-xs uppercase tracking-wide text-sky-400 font-semibold mb-2" }, "Resultados por competencia"),
    el("div", { class: "grid grid-cols-2 gap-2" },
      ...areas.map((a) => areaCard(a, () => view.select(idToTab[a.key])))),
    el("p", { class: "mt-2 text-xs text-slate-500 text-center" }, "Toca una competencia para ver el detalle."));

  const passBadge = el("span", {
    class: "inline-block mt-2 text-xs font-black tracking-widest px-3 py-1 rounded-full " +
      (report.passed ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"),
  }, report.passed ? "APROBADA" : "A REFORZAR");

  const body = el("div", { class: "overflow-y-auto pr-1", style: "max-height: 74vh" },
    el("div", { class: "text-center" },
      el("p", { class: "text-xs uppercase tracking-widest text-slate-500 mb-3" }, "Bolet\u00edn - " + (report.title || "Unidad")),
      scoreRing(report.score),
      el("p", { class: "mt-3 text-xl font-extrabold text-slate-100" }, info.label),
      passBadge,
      el("p", { class: "mt-1 text-xs text-slate-400" }, report.doneLessons + " de " + report.totalLessons + " competencias hechas")),
    view.node,
    el("button", {
      type: "button",
      class: "mt-6 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold hover:brightness-110 focus:outline focus:outline-2 focus:outline-sky-300",
      onclick: close,
    }, "Cerrar"));

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[90vh]",
    role: "dialog", "aria-label": "Boletin de la unidad", "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3 mb-1" },
      el("div", { class: "w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 grid place-items-center text-white", html: ICONS.star }),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-sky-300" }, "Bolet\u00edn de la unidad"),
        el("p", { class: "text-xs text-slate-400" }, "Resumen de lo que aprendiste")),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    body);

  const overlay = el("div", {
    class: "fixed inset-0 z-[60] bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);
  return report;
}
