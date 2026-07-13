/**
 * features/lesson-player.js — Reproductor de leccion estilo "clase" (paso a paso).
 *
 * Capa de feature. Flujo tipo Duolingo PERO con nuestra ventaja: primero la
 * CLASE (reglas/normas de lo que se va a aprender) y luego las practicas, una
 * por una, con barra de progreso arriba, feedback inmediato con sonido y una
 * pantalla final de logros que aparecen "uno tras otro". Tema oscuro.
 *
 * Pasos = [intro] + [pasos de clase] + [una actividad por paso] + [final].
 */
import { findLesson } from "../data/units/index.js";
import { grade } from "../core/activities.js";
import { completeLesson } from "../services/course.js";
import { ensureCards } from "../services/srs.js";
import { recordActivity } from "../services/profiles.js";
import { speakButton } from "../ui/speech.js";
import { el, mount } from "../ui/dom.js";
import { announce, focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";
import { playCorrect, playWrong, playAchievement, playFanfare } from "../ui/sound.js";
import { robotBubble, robotHelpButton, openRobotHint, robotAvatar, robotReadButton, robotName, openRobotSetup } from "../ui/robot.js";
import { isRobotConfigured } from "../ui/robot-prefs.js";

const CARD = "max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 min-h-[70vh] flex flex-col";
const PRIMARY = "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-5 py-3 rounded-xl " +
  "hover:from-indigo-400 hover:to-fuchsia-400 focus:outline focus:outline-2 focus:outline-indigo-400 w-full text-center";
const OK_BTN = "bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-5 py-3 rounded-xl " +
  "hover:brightness-110 focus:outline focus:outline-2 focus:outline-emerald-400 w-full text-center";
const BOX = "bg-slate-800/60 rounded-lg p-4";

export async function renderLessonPlayer(container, params, user) {
  const found = findLesson(params.id);
  if (!found) {
    mount(container, el("div", { class: CARD }, el("p", { class: "text-slate-300" }, "Leccion no encontrada."),
      el("button", { class: "mt-4 " + PRIMARY, onclick: () => go("/student") }, "Volver")));
    return;
  }
  const { unit, lesson } = found;
  const steps = buildSteps(unit, lesson);
  const activityTotal = steps.filter((s) => s.kind === "activity").length;
  // La regla de la unidad (de su leccion de gramatica) para las pistas del Profe Robo.
  const unitGrammar = unit.lessons.find((l) => l.grammar)?.grammar || null;
  // Voz del profe: espanol nativo en A1-A2; ingles (inmersion) de B1 en adelante.
  const robotLang = (unit.level === "A1" || unit.level === "A2") ? "es-MX" : "en-US";

  const state = { idx: 0, correct: 0, checked: new Set() };

  // Primera vez: que el alumno elija avatar y nombre para su robot.
  renderStep();
  if (!isRobotConfigured()) openRobotSetup(() => renderStep());

  // -------------------------------------------------------------------------
  function renderStep() {
    if (state.idx >= steps.length) return renderComplete();
    const step = steps[state.idx];
    const pct = Math.round((state.idx / steps.length) * 100);

    let body, footer;
    if (step.kind === "intro") {
      ({ body, footer } = introStep());
    } else if (step.kind === "teach") {
      ({ body, footer } = teachStep(step));
    } else {
      ({ body, footer } = activityStep(step));
    }

    mount(container, el("div", { class: CARD },
      topBar(unit, pct),
      el("div", { class: "flex-1 mt-6" }, body),
      el("div", { class: "mt-6" }, footer)));
    focusMainHeading(container);
  }

  function next() { state.idx++; renderStep(); }

  // ---- Paso: intro / bienvenida a la clase --------------------------------
  function introStep() {
    const body = el("div", { class: "text-center" },
      el("div", { class: "flex justify-center" }, robotAvatar("lg")),
      el("span", { class: "inline-block mt-3 text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300" }, unit.level + " - " + unit.title),
      el("h1", { class: "text-2xl font-bold mt-3 text-slate-100" }, lesson.title),
      el("div", { class: "mt-4 text-left" },
        robotBubble("Hola, soy " + robotName() + "! Vamos a aprender esto paso a paso. Primero la clase y luego practicamos. Tu puedes!", { lang: robotLang })),
      lesson.intro ? el("p", { class: "mt-4 text-slate-300" }, lesson.intro) : null,
      el("div", { class: "mt-4 text-left " + BOX },
        el("p", { class: "text-sm font-semibold text-slate-200" }, "En esta clase vas a:"),
        el("ul", { class: "mt-2 space-y-1" },
          ...unit.cando.slice(0, 4).map((c) =>
            el("li", { class: "flex gap-2 text-sm text-slate-300" },
              el("span", { class: "text-emerald-400" }, "+"), c)))));
    const footer = el("button", { class: PRIMARY, onclick: next }, "Empezar la clase");
    return { body, footer };
  }

  // ---- Paso: clase (reglas / lectura / glosario / nota) -------------------
  function teachStep(step) {
    const body = el("div", {},
      step.robot ? robotBubble(step.robot, { lang: robotLang }) : null,
      step.robot ? robotReadButton(step.robot, robotLang) : null,
      el("div", { class: "mt-4" }, step.node));
    const footer = el("button", { class: PRIMARY, onclick: next }, step.last ? "Ir a practicar" : "Continuar");
    return { body, footer };
  }

  // ---- Paso: una actividad con feedback inmediato -------------------------
  function activityStep(step) {
    const act = step.act;
    const idxNum = step.number;
    const { node, getResponse } = renderActivity(act, idxNum);
    const headRow = el("div", { class: "flex items-center justify-between gap-3" },
      el("p", { class: "text-xs uppercase tracking-wide text-slate-400" }, "Practica " + idxNum + " de " + activityTotal),
      robotHelpButton(() => openRobotHint(unitGrammar, act, robotLang)));
    const body = el("div", {}, headRow, el("div", { class: "mt-4" }, node));
    const footerHost = el("div", {});

    const checkBtn = el("button", {
      class: PRIMARY,
      onclick: () => {
        const response = getResponse();
        if (response == null || response === "" || (Array.isArray(response) && response.length === 0)) {
          announce("Responde primero.");
          return;
        }
        const ok = grade(act, response);
        if (ok && !state.checked.has(idxNum)) { state.correct++; }
        state.checked.add(idxNum);
        lockNode(node);
        ok ? playCorrect() : playWrong();
        body.append(feedbackBanner(ok, act));
        mount(footerHost, el("button", { class: ok ? OK_BTN : PRIMARY, onclick: next },
          state.idx === steps.length - 1 ? "Terminar" : "Continuar"));
        announce(ok ? "Correcto" : "Incorrecto");
      },
    }, "Comprobar");

    mount(footerHost, checkBtn);
    return { body, footer: footerHost };
  }

  // ---- Pantalla final: logros que aparecen uno tras otro ------------------
  async function renderComplete() {
    const total = activityTotal;
    const ratio = total === 0 ? 1 : state.correct / total;
    const passed = ratio >= 0.6;
    const xp = 10 + state.correct * 5;

    let saveError = null;
    if (passed) {
      const saved = await completeLesson(user.id, lesson.id, Math.round(ratio * 100));
      if (!saved.ok) saveError = saved.error;
      try {
        if (lesson.teachesVocab) await ensureCards(user.id, unit.vocab);
        await recordActivity(user.id);
      } catch (e) {
        console.error("[leccion] efecto secundario fallo:", e);
      }
    }

    if (!passed) {
      mount(container, el("div", { class: CARD },
        topBar(unit, 100),
        el("div", { class: "flex-1 mt-6 text-center" },
          el("div", { class: "text-5xl" }, "\uD83D\uDCAA"),
          el("h1", { class: "text-2xl font-bold mt-3 text-slate-100" }, "Casi lo logras"),
          el("p", { class: "mt-2 text-slate-300" },
            "Tuviste " + state.correct + "/" + total + ". Necesitas 60%. Repasa la clase e intenta de nuevo."),
          feedback(false, "No pasa nada: equivocarse es parte de aprender.")),
        el("div", { class: "mt-6" },
          el("button", { class: PRIMARY, onclick: () => { state.idx = 0; state.correct = 0; state.checked = new Set(); renderStep(); } }, "Reintentar la leccion"))));
      focusMainHeading(container);
      return;
    }

    // Aprobado: construimos los logros y los revelamos escalonadamente.
    const achievements = [];
    achievements.push({ icon: "\u2B50", text: "+" + xp + " puntos de experiencia" });
    achievements.push({ icon: "\u2705", text: "Leccion completada: " + lesson.title });
    achievements.push({ icon: "\uD83C\uDFAF", text: state.correct + "/" + total + " respuestas correctas" });
    if (lesson.teachesVocab) achievements.push({ icon: "\uD83D\uDCDA", text: "Vocabulario anadido a tu repaso (SRS)" });
    achievements.push({ icon: "\uD83D\uDD25", text: "Racha del dia +1" });
    if (saveError) achievements.push({ icon: "\u26A0\uFE0F", text: "Aviso: no se guardo en la nube (" + saveError + ")" });

    const list = el("div", { class: "mt-6 space-y-3" });
    const body = el("div", { class: "flex-1 mt-4 text-center" },
      el("div", { class: "text-6xl" }, "\uD83C\uDF89"),
      el("h1", { class: "text-2xl font-bold mt-3 text-slate-100" }, "Clase completada!"),
      el("p", { class: "mt-1 text-slate-400 text-sm" }, "Bien hecho. Esto ganaste:"),
      list);

    mount(container, el("div", { class: CARD },
      topBar(unit, 100),
      body,
      el("div", { class: "mt-6" },
        el("button", { class: OK_BTN, onclick: () => go("/unidad/" + unit.id) }, "Volver a la unidad"))));
    focusMainHeading(container);
    playFanfare();

    // Revelacion escalonada con sonidito por cada logro.
    achievements.forEach((a, i) => {
      const item = el("div", {
        class: "flex items-center gap-3 " + BOX + " text-left",
        style: "opacity:0; transform: translateY(10px); transition: all .35s ease;",
      },
        el("span", { class: "text-2xl" }, a.icon),
        el("span", { class: "text-slate-200 font-medium" }, a.text));
      list.append(item);
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
        playAchievement(i);
      }, 500 + i * 650);
    });
    announce("Clase completada. Ganaste " + xp + " puntos.");
  }
}

// ---------------------------------------------------------------------------
// Construccion de pasos a partir de la leccion (clase + practicas).
// ---------------------------------------------------------------------------
function buildSteps(unit, lesson) {
  const steps = [{ kind: "intro" }];
  const c = lesson.content || {};

  const teach = [];
  const reading = c.reading || lesson.passage;
  if (reading) teach.push({ node: readingSection(reading), robot: "Leamos juntos. Fijate en las frases clave del texto." });
  const grammar = c.grammar || lesson.grammar;
  if (grammar) teach.push({ node: grammarBox(grammar), robot: "Estas son las reglas de hoy: tu superpoder. Leelas con calma." });
  const glossary = c.glossary || lesson.glossary;
  if (glossary?.length) teach.push({ node: glossarySection(glossary), robot: "Estas palabras te van a servir mucho. Toca el altavoz para oirlas." });
  if (c.keyPhrases?.length) teach.push({ node: keyPhrasesSection(c.keyPhrases), robot: "Frases utiles para sonar mas natural." });
  const note = c.note || lesson.note;
  if (note) teach.push({ node: noteSection(note), robot: "Ojo con esta nota: es el detalle que marca la diferencia." });
  if (lesson.dialogue?.length) teach.push({ node: dialogueSection(lesson.dialogue), robot: "Escucha el dialogo e imita la entonacion." });

  teach.forEach((t, i) => steps.push({ kind: "teach", node: t.node, robot: t.robot, last: i === teach.length - 1 }));

  // Actividades: primero las de comprension de la lectura, luego las practicas.
  const acts = [];
  (c.check || []).forEach((q) =>
    acts.push({ type: "multiple_choice", prompt: q.prompt, payload: { choices: q.choices, answer: q.answer } }));
  (lesson.activities || []).forEach((a) => acts.push(a));

  acts.forEach((act, i) => steps.push({ kind: "activity", act, number: i + 1 }));
  return steps;
}

// ---------------------------------------------------------------------------
// Barra superior: cerrar (X) + barra de progreso que se va llenando.
// ---------------------------------------------------------------------------
function topBar(unit, pct) {
  return el("div", { class: "flex items-center gap-3" },
    el("a", { href: "#/unidad/" + unit.id, class: "text-slate-400 hover:text-slate-200 text-xl leading-none", "aria-label": "Salir de la leccion" }, "\u2715"),
    el("div", { class: "flex-1 bg-slate-800 rounded-full h-3", role: "progressbar",
      "aria-valuenow": String(pct), "aria-valuemin": "0", "aria-valuemax": "100" },
      el("div", { class: "bg-gradient-to-r from-emerald-400 to-teal-400 h-3 rounded-full transition-all duration-500", style: "width:" + pct + "%" })));
}

// ---------------------------------------------------------------------------
// Feedback inmediato por actividad (banner tipo Duolingo).
// ---------------------------------------------------------------------------
function feedbackBanner(ok, act) {
  return el("div", {
    class: "mt-4 rounded-xl p-4 border " +
      (ok ? "border-emerald-600/60 bg-emerald-900/25" : "border-red-700/60 bg-red-900/25"),
  },
    el("p", { class: "font-bold " + (ok ? "text-emerald-300" : "text-red-300") },
      ok ? "\u2714 Correcto!" : "\u2716 No exactamente"),
    !ok ? el("p", { class: "mt-1 text-sm text-slate-200" }, "Respuesta: " + correctAnswerText(act)) : null,
    act.explain ? el("p", { class: "mt-2 text-sm text-slate-300" }, "Por que: " + act.explain) : null);
}

function correctAnswerText(act) {
  const p = act.payload;
  switch (act.type) {
    case "multiple_choice": return p.choices[p.answer];
    case "cloze": return p.answer;
    case "word_bank": return p.answer.join(" ");
    case "matching": return p.pairs.map((x) => x.left + " = " + x.right).join(" | ");
    default: return "";
  }
}

/** Desactiva todos los controles dentro de un nodo (bloquea tras comprobar). */
function lockNode(node) {
  node.querySelectorAll("input, button, select").forEach((c) => { c.disabled = true; });
  node.classList.add("opacity-90");
}

// ---------------------------------------------------------------------------
// Bloques de ensenanza (la CLASE).
// ---------------------------------------------------------------------------
function readingSection(text) {
  const paras = String(text).split(/\n\n+/);
  return el("section", {},
    el("div", { class: "flex items-center gap-2" },
      el("h2", { class: "font-bold text-lg text-slate-100" }, "Lectura"),
      speakButton(String(text).replace(/\n+/g, " "))),
    el("div", { class: "mt-3 space-y-3" },
      ...paras.map((p) => el("p", { class: "text-slate-200 leading-relaxed " + BOX }, p))));
}

function glossarySection(glossary) {
  return el("section", {},
    el("h2", { class: "font-bold text-lg text-slate-100" }, "Glosario"),
    el("div", { class: "mt-3" }, ...glossary.map((g) =>
      el("div", { class: "flex justify-between items-center gap-4 py-1.5 border-b border-slate-800 last:border-0" },
        el("span", { class: "font-semibold text-slate-100 flex items-center gap-2" }, g.term, speakButton(g.term)),
        el("span", { class: "text-slate-400 text-right" }, g.translation)))));
}

function keyPhrasesSection(phrases) {
  return el("section", {},
    el("h2", { class: "font-bold text-lg text-slate-100" }, "Frases clave"),
    el("ul", { class: "mt-3 space-y-2" },
      ...phrases.map((p) => el("li", { class: "text-sm text-slate-300 flex items-center gap-2 " + BOX }, speakButton(p), p))));
}

function noteSection(note) {
  return el("section", { class: "bg-amber-500/10 border border-amber-500/30 rounded-lg p-4" },
    el("h2", { class: "font-bold text-amber-300" }, "Nota de uso"),
    el("p", { class: "mt-1 text-sm text-amber-200" }, note));
}

function dialogueSection(dialogue) {
  return el("section", {},
    el("h2", { class: "font-bold text-lg text-slate-100" }, "Dialogo"),
    el("ul", { class: "mt-3 space-y-1 " + BOX + " text-slate-300 text-sm" },
      ...dialogue.map((line) => el("li", { class: "flex items-center gap-2" },
        speakButton(line.replace(/^[A-Z]:\s*/, "")), el("span", {}, line)))));
}

function grammarBox(g) {
  return el("section", { class: "border border-indigo-500/30 bg-indigo-500/10 rounded-lg p-4" },
    el("p", { class: "text-xs uppercase tracking-wide text-indigo-300/80" }, "Las reglas"),
    el("h2", { class: "font-bold text-lg text-indigo-200 mt-0.5" }, g.title),
    g.form ? el("p", { class: "mt-2 font-mono text-sm text-indigo-100 bg-slate-900/60 rounded px-3 py-2" }, g.form) : null,
    g.examples?.length ? el("ul", { class: "mt-3 space-y-1" },
      ...g.examples.map((ex) => el("li", { class: "text-sm text-slate-200 flex items-center gap-2" }, speakButton(ex), "- " + ex))) : null,
    g.mistakes?.length ? el("div", { class: "mt-3" },
      el("p", { class: "text-xs font-semibold text-slate-400 uppercase tracking-wide" }, "Errores comunes"),
      el("ul", { class: "mt-1 space-y-1" }, ...g.mistakes.map((m) =>
        el("li", { class: "text-sm" },
          el("span", { class: "text-red-400 line-through" }, m.wrong),
          el("span", { class: "text-slate-500" }, "  ->  "),
          el("span", { class: "text-emerald-400" }, m.right))))) : null);
}

// ---------------------------------------------------------------------------
// Renderizadores de actividad. Cada uno devuelve { node, getResponse }.
// ---------------------------------------------------------------------------
function renderActivity(act, idx) {
  const title = el("legend", { class: "font-medium text-slate-100 text-lg" }, act.prompt);
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
    const btn = el("button", {
      type: "button",
      class: "block w-full text-left px-4 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 mt-2",
      onclick: () => {
        selected = ci;
        [...btn.parentNode.children].forEach((c) => c.classList.remove("border-indigo-400", "bg-indigo-500/20"));
        btn.classList.add("border-indigo-400", "bg-indigo-500/20");
      },
    }, text);
    return btn;
  });
  return { node: el("fieldset", {}, title, el("div", { class: "mt-2" }, ...opts)), getResponse: () => selected };
}

function clozeActivity(act, title) {
  const input = el("input", { type: "text",
    class: "mt-3 w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-slate-100 focus:outline focus:outline-2 focus:outline-indigo-500",
    placeholder: "Escribe tu respuesta" });
  return { node: el("fieldset", {}, title, input), getResponse: () => input.value };
}

function wordBankActivity(act, title) {
  const chosen = [];
  const answerArea = el("div", { class: "mt-3 min-h-[3rem] flex flex-wrap gap-2 bg-slate-800/60 rounded-xl p-3 border border-dashed border-slate-600" });
  const bank = el("div", { class: "mt-3 flex flex-wrap gap-2" });

  function redraw() {
    answerArea.replaceChildren(...chosen.map((w, i) =>
      el("button", { type: "button", class: "px-3 py-1.5 bg-indigo-500/30 text-indigo-100 rounded-lg",
        onclick: () => { chosen.splice(i, 1); restoreBank(); redraw(); } }, w)));
  }
  function restoreBank() {
    [...bank.children].forEach((b) => {
      const stillUsed = chosen.filter((w) => w === b.textContent).length;
      const totalSame = [...bank.children].filter((x) => x.textContent === b.textContent).indexOf(b);
      b.disabled = totalSame < stillUsed;
      b.classList.toggle("opacity-40", b.disabled);
    });
  }
  const shuffled = [...act.payload.words].sort(() => Math.random() - 0.5);
  shuffled.forEach((w) => {
    const btn = el("button", { type: "button",
      class: "px-3 py-1.5 border border-slate-600 rounded-lg text-slate-200 hover:bg-slate-800",
      onclick: () => { if (btn.disabled) return; chosen.push(w); btn.disabled = true; btn.classList.add("opacity-40"); redraw(); } }, w);
    bank.append(btn);
  });

  return { node: el("fieldset", {}, title, answerArea, bank), getResponse: () => [...chosen] };
}

function matchingActivity(act, title) {
  const rights = act.payload.pairs.map((p) => p.right).sort(() => Math.random() - 0.5);
  const selects = [];
  const rows = act.payload.pairs.map((p, i) => {
    const sel = el("select", { class: "rounded-lg bg-slate-800 border border-slate-700 text-slate-100 px-2 py-2 focus:outline focus:outline-2 focus:outline-indigo-500 flex-1" },
      el("option", { value: "" }, "Elige..."),
      ...rights.map((r) => el("option", { value: r }, r)));
    selects[i] = sel;
    return el("div", { class: "flex items-center gap-3 mt-3" },
      el("span", { class: "font-medium w-32 text-slate-100" }, p.left), el("span", { class: "text-slate-500" }, "->"), sel);
  });
  return { node: el("fieldset", {}, title, ...rows), getResponse: () => selects.map((s) => s.value) };
}

// ---------------------------------------------------------------------------
function feedback(ok, msg) {
  return el("div", { role: "alert",
    class: "mt-4 text-sm rounded-md px-3 py-2 " +
      (ok ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-300"
          : "bg-amber-500/15 border border-amber-500/40 text-amber-300") }, msg);
}
