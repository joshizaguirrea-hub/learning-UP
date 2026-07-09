/**
 * features/lesson-player.js — Reproduce una leccion del curso (ciclo PPP).
 *
 * Capa de feature: pinta la teoria + las actividades variadas, las califica con
 * core/activities, marca la leccion completada (services/course) y, si la
 * leccion ensena vocabulario, crea las tarjetas SRS (services/srs).
 */
import { findLesson } from "../data/units/index.js";
import { gradeAll } from "../core/activities.js";
import { completeLesson } from "../services/course.js";
import { ensureCards } from "../services/srs.js";
import { el, mount } from "../ui/dom.js";
import { announce, focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";

const CARD = "max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-sm border border-slate-200";
const PRIMARY = "bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-lg " +
  "hover:bg-indigo-800 focus:outline focus:outline-2 focus:outline-indigo-900";

const PHASE_LABEL = { present: "Presentacion", practice: "Practica", produce: "Produccion" };

export async function renderLessonPlayer(container, params, user) {
  const found = findLesson(params.id);
  if (!found) {
    mount(container, el("div", { class: CARD }, el("p", {}, "Leccion no encontrada."),
      el("button", { class: "mt-4 " + PRIMARY, onclick: () => go("/student") }, "Volver")));
    return;
  }
  const { unit, lesson } = found;

  // Cada actividad se renderiza con un lector de su respuesta.
  const readers = [];
  const activityEls = lesson.activities.map((act, i) => {
    const { node, getResponse } = renderActivity(act, i);
    readers.push(getResponse);
    return node;
  });

  const resultSlot = el("div");
  const submit = el("button", {
    class: "mt-6 " + PRIMARY,
    onclick: async () => {
      const responses = readers.map((r) => r());
      const score = gradeAll(lesson.activities, responses);
      if (!score.passed) {
        mount(resultSlot, feedback(false,
          `Tuviste ${score.correct}/${score.total}. Necesitas 60%. Revisa e intenta otra vez.`));
        announce("Aun no apruebas, intenta de nuevo.");
        return;
      }
      await completeLesson(user.id, lesson.id, Math.round(score.ratio * 100));
      // Si la leccion ensena vocab, sembramos las tarjetas SRS de la unidad.
      if (lesson.teachesVocab) await ensureCards(user.id, unit.vocab);
      mount(resultSlot, el("div", {},
        feedback(true, `Excelente! ${score.correct}/${score.total}. Leccion completada.`),
        lesson.teachesVocab
          ? el("p", { class: "mt-2 text-sm text-slate-600" },
              "Agregamos el vocabulario de la unidad a tu repaso diario (SRS).")
          : null,
        el("button", { class: "mt-4 " + PRIMARY, onclick: () => go(`/unidad/${unit.id}`) }, "Volver a la unidad")));
      announce("Leccion completada.");
    },
  }, "Revisar respuestas");

  const theory = el("section", { class: "mt-4" },
    lesson.intro ? el("p", { class: "text-slate-700" }, lesson.intro) : null,
    lesson.dialogue
      ? el("ul", { class: "mt-4 space-y-1 bg-slate-50 rounded-lg p-4 text-slate-700 text-sm" },
          ...lesson.dialogue.map((line) => el("li", {}, line)))
      : null);

  mount(container, el("div", { class: CARD },
    el("a", { href: `#/unidad/${unit.id}`, class: "text-sm text-indigo-700 underline" }, "< Volver a la unidad"),
    el("div", { class: "flex items-center gap-2 mt-3" },
      el("span", { class: "text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full" }, PHASE_LABEL[lesson.phase] || ""),
      el("h1", { class: "text-2xl font-bold" }, lesson.title)),
    theory,
    el("section", { class: "mt-6 space-y-6" }, ...activityEls),
    submit,
    resultSlot));
  focusMainHeading(container);
}

// ---------------------------------------------------------------------------
// Renderizadores de actividad. Cada uno devuelve { node, getResponse }.
// ---------------------------------------------------------------------------
function renderActivity(act, idx) {
  const title = el("legend", { class: "font-medium text-slate-800" }, `${idx + 1}. ${act.prompt}`);
  switch (act.type) {
    case "multiple_choice": return mcActivity(act, idx, title);
    case "cloze": return clozeActivity(act, title);
    case "word_bank": return wordBankActivity(act, title);
    case "matching": return matchingActivity(act, title);
    default: return { node: el("p", {}, "Tipo de actividad no soportado."), getResponse: () => null };
  }
}

function mcActivity(act, idx, title) {
  let selected = null;
  const opts = act.payload.choices.map((text, ci) => {
    const id = `a${idx}-c${ci}`;
    return el("label", { for: id, class: "flex items-center px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50 cursor-pointer" },
      el("input", { type: "radio", name: `a${idx}`, id, class: "mr-2", onchange: () => { selected = ci; } }), text);
  });
  return {
    node: el("fieldset", {}, title, el("div", { class: "mt-2 space-y-2" }, ...opts)),
    getResponse: () => selected,
  };
}

function clozeActivity(act, title) {
  const input = el("input", { type: "text", class: "mt-2 w-full rounded-md border border-slate-300 px-3 py-2 focus:outline focus:outline-2 focus:outline-indigo-600", placeholder: "Escribe tu respuesta" });
  return { node: el("fieldset", {}, title, input), getResponse: () => input.value };
}

function wordBankActivity(act, title) {
  const chosen = [];
  const answerArea = el("div", { class: "mt-2 min-h-[2.5rem] flex flex-wrap gap-2 bg-slate-50 rounded-md p-2 border border-dashed border-slate-300" });
  const bank = el("div", { class: "mt-2 flex flex-wrap gap-2" });

  function redraw() {
    answerArea.replaceChildren(...chosen.map((w) => el("span", { class: "px-2 py-1 bg-indigo-100 text-indigo-800 rounded" }, w)));
  }
  // Mezcla las palabras para que no vengan en orden.
  const shuffled = [...act.payload.words].sort(() => Math.random() - 0.5);
  shuffled.forEach((w) => {
    const btn = el("button", { type: "button",
      class: "px-3 py-1 border border-slate-300 rounded hover:bg-indigo-50",
      onclick: () => { chosen.push(w); btn.disabled = true; btn.classList.add("opacity-40"); redraw(); } }, w);
    bank.append(btn);
  });
  const clear = el("button", { type: "button", class: "mt-2 text-sm text-indigo-700 underline",
    onclick: () => { chosen.length = 0; redraw(); [...bank.children].forEach((b) => { b.disabled = false; b.classList.remove("opacity-40"); }); } }, "Limpiar");

  return {
    node: el("fieldset", {}, title, answerArea, bank, clear),
    getResponse: () => [...chosen],
  };
}

function matchingActivity(act, title) {
  const rights = act.payload.pairs.map((p) => p.right).sort(() => Math.random() - 0.5);
  const selects = [];
  const rows = act.payload.pairs.map((p, i) => {
    const sel = el("select", { class: "rounded-md border border-slate-300 px-2 py-1.5 focus:outline focus:outline-2 focus:outline-indigo-600" },
      el("option", { value: "" }, "Elige..."),
      ...rights.map((r) => el("option", { value: r }, r)));
    selects[i] = sel;
    return el("div", { class: "flex items-center gap-3 mt-2" },
      el("span", { class: "font-medium w-32" }, p.left), el("span", {}, "->"), sel);
  });
  return {
    node: el("fieldset", {}, title, ...rows),
    getResponse: () => selects.map((s) => s.value),
  };
}

function feedback(ok, msg) {
  return el("div", { role: "alert",
    class: "mt-4 text-sm rounded-md px-3 py-2 " +
      (ok ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
          : "bg-amber-50 border border-amber-200 text-amber-900") }, msg);
}
