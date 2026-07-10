/**
 * features/lesson-player.js — Reproduce una leccion del curso (ciclo PPP).
 *
 * Capa de feature: pinta la teoria + las actividades y las califica con
 * core/activities. Enriquecido con feedback POR PREGUNTA (el "porque"), fase
 * Aprende con recuadro de gramatica y chequeo de comprension. Tema oscuro.
 */
import { findLesson } from "../data/units/index.js";
import { grade, gradeAll } from "../core/activities.js";
import { completeLesson } from "../services/course.js";
import { ensureCards } from "../services/srs.js";
import { recordActivity } from "../services/profiles.js";
import { ICONS } from "../ui/icons.js";
import { speakButton } from "../ui/speech.js";
import { el, mount } from "../ui/dom.js";
import { announce, focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";

const CARD = "max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8";
const PRIMARY = "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-5 py-2.5 rounded-lg " +
  "hover:from-indigo-400 hover:to-fuchsia-400 focus:outline focus:outline-2 focus:outline-indigo-400";
const BOX = "bg-slate-800/60 rounded-lg p-4";
const PHASE_LABEL = { learn: "Aprende", present: "Presentacion", practice: "Practica", produce: "Produccion" };

export async function renderLessonPlayer(container, params, user) {
  const found = findLesson(params.id);
  if (!found) {
    mount(container, el("div", { class: CARD }, el("p", { class: "text-slate-300" }, "Leccion no encontrada."),
      el("button", { class: "mt-4 " + PRIMARY, onclick: () => go("/student") }, "Volver")));
    return;
  }
  const { unit, lesson } = found;

  if (lesson.phase === "learn" || (lesson.content && lesson.activities.length === 0)) {
    return renderLearn(container, unit, lesson, user);
  }
  return renderPractice(container, unit, lesson, user);
}

// ---------------------------------------------------------------------------
// Fases PRACTICA / PRODUCCION: actividades con feedback por pregunta.
// ---------------------------------------------------------------------------
function renderPractice(container, unit, lesson, user) {
  const header = el("div", {},
    backLink(unit),
    el("div", { class: "flex items-center gap-2 mt-3" },
      phaseBadge(lesson.phase),
      el("h1", { class: "text-2xl font-bold" }, lesson.title)));

  const theory = el("section", { class: "mt-4" },
    lesson.intro ? el("p", { class: "text-slate-300" }, lesson.intro) : null,
    lesson.dialogue
      ? el("ul", { class: "mt-4 space-y-1 " + BOX + " text-slate-300 text-sm" },
          ...lesson.dialogue.map((line) => el("li", { class: "flex items-center gap-2" },
            speakButton(line.replace(/^[A-Z]:\s*/, "")), el("span", {}, line))))
      : null);

  showForm();

  function showForm() {
    const readers = [];
    const nodes = lesson.activities.map((act, i) => {
      const { node, getResponse } = renderActivity(act, i);
      readers.push(getResponse);
      return node;
    });

    const submit = el("button", {
      class: "mt-6 " + PRIMARY,
      onclick: () => {
        const responses = readers.map((r) => r());
        if (responses.some((r) => r == null || r === "" || (Array.isArray(r) && r.length === 0))) {
          announce("Responde todas las preguntas.");
        }
        showReview(responses);
      },
    }, "Revisar respuestas");

    mount(container, el("div", { class: CARD }, header, theory,
      el("section", { class: "mt-6 space-y-6" }, ...nodes), submit));
    focusMainHeading(container);
  }

  async function showReview(responses) {
    const score = gradeAll(lesson.activities, responses);
    const reviewNodes = lesson.activities.map((act, i) => reviewNode(act, responses[i], i));

    let saveError = null;
    if (score.passed) {
      const saved = await completeLesson(user.id, lesson.id, Math.round(score.ratio * 100));
      if (!saved.ok) saveError = saved.error;
      // Efectos secundarios (SRS + racha) NO deben tumbar el completado.
      try {
        if (lesson.teachesVocab) await ensureCards(user.id, unit.vocab);
        await recordActivity(user.id);
      } catch (e) {
        console.error("[leccion] efecto secundario fallo:", e);
      }
    }

    const banner = saveError
      ? feedback(false, "No se pudo guardar tu progreso: " + saveError + ". Revisa tu conexion e intenta de nuevo.")
      : feedback(score.passed,
          score.passed
            ? `Muy bien! ${score.correct}/${score.total} correctas. Leccion completada.`
            : `Tuviste ${score.correct}/${score.total}. Necesitas 60%. Repasa las explicaciones e intenta otra vez.`);

    const action = (score.passed && !saveError)
      ? el("button", { class: "mt-6 " + PRIMARY, onclick: () => go(`/unidad/${unit.id}`) }, "Volver a la unidad")
      : el("button", { class: "mt-6 " + PRIMARY, onclick: showForm }, "Reintentar");

    mount(container, el("div", { class: CARD }, header, theory,
      el("section", { class: "mt-6 space-y-3" }, ...reviewNodes), banner, action));
    focusMainHeading(container);
    announce(score.passed ? "Leccion completada." : "Revisa las explicaciones.");
  }
}

/** Tarjeta de revision de una actividad: correcto/incorrecto + solucion + porque. */
function reviewNode(act, response, i) {
  const ok = grade(act, response);
  return el("div", {
    class: "rounded-lg p-4 border " +
      (ok ? "border-emerald-700/60 bg-emerald-900/20" : "border-red-800/60 bg-red-900/20"),
  },
    el("div", { class: "flex items-start gap-2" },
      el("span", { class: "mt-0.5 w-5 h-5 shrink-0 " + (ok ? "text-emerald-400" : "text-red-400"), html: ok ? ICONS.check : ICONS.lock }),
      el("p", { class: "font-medium text-slate-200" }, `${i + 1}. ${act.prompt}`)),
    !ok ? el("p", { class: "mt-2 text-sm text-slate-400" }, "Tu respuesta: " + userAnswerText(act, response)) : null,
    el("p", { class: "mt-1 text-sm " + (ok ? "text-emerald-300" : "text-emerald-300") }, "Correcto: " + correctAnswerText(act)),
    act.explain ? el("p", { class: "mt-2 text-sm text-slate-300 " + BOX }, "Por que: " + act.explain) : null);
}

function correctAnswerText(act) {
  const p = act.payload;
  switch (act.type) {
    case "multiple_choice": return p.choices[p.answer];
    case "cloze": return p.answer;
    case "word_bank": return p.answer.join(" ");
    case "matching": return p.pairs.map((x) => `${x.left} = ${x.right}`).join(" | ");
    default: return "";
  }
}

function userAnswerText(act, r) {
  const p = act.payload;
  switch (act.type) {
    case "multiple_choice": return r == null ? "(sin responder)" : p.choices[r];
    case "cloze": return r ? `"${r}"` : "(vacio)";
    case "word_bank": return r && r.length ? r.join(" ") : "(vacio)";
    case "matching": return p.pairs.map((x, i) => `${x.left} = ${(r && r[i]) || "?"}`).join(" | ");
    default: return "";
  }
}

// ---------------------------------------------------------------------------
// Fase APRENDE: lectura + gramatica + glosario + frases + nota + comprension.
// ---------------------------------------------------------------------------
async function renderLearn(container, unit, lesson, user) {
  const c = lesson.content || {};
  const done = el("div");

  const finishBtn = el("button", {
    class: "mt-6 " + PRIMARY,
    onclick: async () => {
      const saved = await completeLesson(user.id, lesson.id, 100);
      if (!saved.ok) {
        mount(done, feedback(false, "No se pudo guardar tu progreso: " + saved.error + ". Revisa tu conexion e intenta de nuevo."));
        return;
      }
      try {
        if (lesson.teachesVocab) await ensureCards(user.id, unit.vocab);
        await recordActivity(user.id);
      } catch (e) {
        console.error("[leccion] efecto secundario fallo:", e);
      }
      mount(done, el("div", {},
        feedback(true, "Listo! Ya estudiaste el material." +
          (lesson.teachesVocab ? " Agregamos el vocabulario a tu repaso diario (SRS)." : "")),
        el("button", { class: "mt-4 " + PRIMARY, onclick: () => go(`/unidad/${unit.id}`) }, "Continuar a practicar")));
      announce("Material completado.");
    },
  }, "Ya lo estudie");

  mount(container, el("div", { class: CARD },
    backLink(unit),
    el("div", { class: "flex items-center gap-2 mt-3" }, phaseBadge("learn"),
      el("h1", { class: "text-2xl font-bold" }, lesson.title)),
    lesson.intro ? el("p", { class: "mt-3 text-slate-400 text-sm" }, lesson.intro) : null,

    c.reading ? el("section", { class: "mt-6" },
      el("div", { class: "flex items-center gap-2" },
        el("h2", { class: "font-bold text-slate-100" }, "Lectura"),
        speakButton(c.reading)),
      el("div", { class: "mt-2" }, el("p", { class: "text-slate-200 leading-relaxed " + BOX }, c.reading))) : null,

    c.grammar ? grammarBox(c.grammar) : null,

    c.glossary?.length ? section("Glosario",
      el("div", {}, ...c.glossary.map((g) =>
        el("div", { class: "flex justify-between items-center gap-4 py-1.5 border-b border-slate-800 last:border-0" },
          el("span", { class: "font-semibold text-slate-100 flex items-center gap-2" }, g.term, speakButton(g.term)),
          el("span", { class: "text-slate-400 text-right" }, g.translation))))) : null,

    c.keyPhrases?.length ? section("Frases clave",
      el("ul", { class: "space-y-1 text-slate-300" },
        ...c.keyPhrases.map((p) => el("li", { class: "text-sm flex items-center gap-2" }, speakButton(p), "- " + p)))) : null,

    c.note ? el("section", { class: "mt-6 bg-amber-500/10 border border-amber-500/30 rounded-lg p-4" },
      el("h2", { class: "font-bold text-amber-300" }, "Nota de uso"),
      el("p", { class: "mt-1 text-sm text-amber-200" }, c.note)) : null,

    c.check?.length ? comprehension(c.check) : null,

    finishBtn, done));
  focusMainHeading(container);
}

function grammarBox(g) {
  return el("section", { class: "mt-6 border border-indigo-500/30 bg-indigo-500/10 rounded-lg p-4" },
    el("h2", { class: "font-bold text-indigo-300" }, "Gramatica: " + g.title),
    g.form ? el("p", { class: "mt-2 font-mono text-sm text-indigo-200 bg-slate-900/60 rounded px-3 py-2" }, g.form) : null,
    g.examples?.length ? el("ul", { class: "mt-3 space-y-1" },
      ...g.examples.map((ex) => el("li", { class: "text-sm text-slate-200" }, "- " + ex))) : null,
    g.mistakes?.length ? el("div", { class: "mt-3" },
      el("p", { class: "text-xs font-semibold text-slate-400 uppercase tracking-wide" }, "Errores comunes"),
      el("ul", { class: "mt-1 space-y-1" }, ...g.mistakes.map((m) =>
        el("li", { class: "text-sm" },
          el("span", { class: "text-red-400 line-through" }, m.wrong),
          el("span", { class: "text-slate-500" }, "  ->  "),
          el("span", { class: "text-emerald-400" }, m.right))))) : null);
}

/** Chequeo de comprension: preguntas de la lectura con feedback inmediato. */
function comprehension(questions) {
  const items = questions.map((q, qi) => {
    const opts = q.choices.map((text, ci) =>
      el("button", {
        type: "button",
        class: "block w-full text-left px-3 py-2 rounded-md border border-slate-700 hover:bg-slate-800 text-slate-200 mt-1",
        onclick: (e) => {
          const correct = ci === q.answer;
          e.currentTarget.classList.remove("border-slate-700", "hover:bg-slate-800");
          e.currentTarget.classList.add(correct ? "border-emerald-500" : "border-red-500",
            correct ? "bg-emerald-900/30" : "bg-red-900/30");
        },
      }, text));
    return el("div", { class: "mt-3" },
      el("p", { class: "text-sm font-medium text-slate-200" }, `${qi + 1}. ${q.prompt}`),
      el("div", { class: "mt-1" }, ...opts));
  });
  return el("section", { class: "mt-6 " + BOX },
    el("h2", { class: "font-bold text-slate-100" }, "Comprueba que entendiste"),
    el("p", { class: "text-xs text-slate-400 mt-0.5" }, "Toca una opcion para ver si es correcta."),
    ...items);
}

// ---------------------------------------------------------------------------
// Renderizadores de actividad. Cada uno devuelve { node, getResponse }.
// ---------------------------------------------------------------------------
function renderActivity(act, idx) {
  const title = el("legend", { class: "font-medium text-slate-200" }, `${idx + 1}. ${act.prompt}`);
  switch (act.type) {
    case "multiple_choice": return mcActivity(act, idx, title);
    case "cloze": return clozeActivity(act, title);
    case "word_bank": return wordBankActivity(act, title);
    case "matching": return matchingActivity(act, title);
    default: return { node: el("p", {}, "Tipo no soportado."), getResponse: () => null };
  }
}

function mcActivity(act, idx, title) {
  let selected = null;
  const opts = act.payload.choices.map((text, ci) => {
    const id = `a${idx}-c${ci}`;
    return el("label", { for: id, class: "flex items-center px-3 py-2 rounded-md border border-slate-700 hover:bg-slate-800 cursor-pointer text-slate-200" },
      el("input", { type: "radio", name: `a${idx}`, id, class: "mr-2 accent-indigo-500", onchange: () => { selected = ci; } }), text);
  });
  return { node: el("fieldset", {}, title, el("div", { class: "mt-2 space-y-2" }, ...opts)), getResponse: () => selected };
}

function clozeActivity(act, title) {
  const input = el("input", { type: "text",
    class: "mt-2 w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 focus:outline focus:outline-2 focus:outline-indigo-500",
    placeholder: "Escribe tu respuesta" });
  return { node: el("fieldset", {}, title, input), getResponse: () => input.value };
}

function wordBankActivity(act, title) {
  const chosen = [];
  const answerArea = el("div", { class: "mt-2 min-h-[2.5rem] flex flex-wrap gap-2 bg-slate-800/60 rounded-md p-2 border border-dashed border-slate-600" });
  const bank = el("div", { class: "mt-2 flex flex-wrap gap-2" });

  function redraw() {
    answerArea.replaceChildren(...chosen.map((w) => el("span", { class: "px-2 py-1 bg-indigo-500/30 text-indigo-200 rounded" }, w)));
  }
  const shuffled = [...act.payload.words].sort(() => Math.random() - 0.5);
  shuffled.forEach((w) => {
    const btn = el("button", { type: "button",
      class: "px-3 py-1 border border-slate-700 rounded text-slate-200 hover:bg-slate-800",
      onclick: () => { chosen.push(w); btn.disabled = true; btn.classList.add("opacity-40"); redraw(); } }, w);
    bank.append(btn);
  });
  const clear = el("button", { type: "button", class: "mt-2 text-sm text-indigo-400 underline",
    onclick: () => { chosen.length = 0; redraw(); [...bank.children].forEach((b) => { b.disabled = false; b.classList.remove("opacity-40"); }); } }, "Limpiar");

  return { node: el("fieldset", {}, title, answerArea, bank, clear), getResponse: () => [...chosen] };
}

function matchingActivity(act, title) {
  const rights = act.payload.pairs.map((p) => p.right).sort(() => Math.random() - 0.5);
  const selects = [];
  const rows = act.payload.pairs.map((p, i) => {
    const sel = el("select", { class: "rounded-md bg-slate-800 border border-slate-700 text-slate-100 px-2 py-1.5 focus:outline focus:outline-2 focus:outline-indigo-500" },
      el("option", { value: "" }, "Elige..."),
      ...rights.map((r) => el("option", { value: r }, r)));
    selects[i] = sel;
    return el("div", { class: "flex items-center gap-3 mt-2" },
      el("span", { class: "font-medium w-32 text-slate-200" }, p.left), el("span", { class: "text-slate-500" }, "->"), sel);
  });
  return { node: el("fieldset", {}, title, ...rows), getResponse: () => selects.map((s) => s.value) };
}

// ---------------------------------------------------------------------------
// Helpers de UI compartidos.
// ---------------------------------------------------------------------------
function backLink(unit) {
  return el("a", { href: `#/unidad/${unit.id}`, class: "text-sm text-indigo-400 hover:text-indigo-300" }, "< Volver a la unidad");
}
function phaseBadge(phase) {
  const cls = phase === "learn" ? "bg-sky-500/20 text-sky-300" : "bg-indigo-500/20 text-indigo-300";
  return el("span", { class: `text-xs px-2 py-0.5 rounded-full ${cls}` }, PHASE_LABEL[phase] || "");
}
function section(title, body) {
  return el("section", { class: "mt-6" }, el("h2", { class: "font-bold text-slate-100" }, title), el("div", { class: "mt-2" }, body));
}
function feedback(ok, msg) {
  return el("div", { role: "alert",
    class: "mt-4 text-sm rounded-md px-3 py-2 " +
      (ok ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-300"
          : "bg-amber-500/15 border border-amber-500/40 text-amber-300") }, msg);
}
