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
import { findLesson, unitsForLevel } from "../data/units/index.js";
import { isAtLeast } from "../data/cefr.js";
import { grade } from "../core/activities.js";
import { completeLesson } from "../services/course.js";
import { ensureCards } from "../services/srs.js";
import { recordActivity } from "../services/profiles.js";
import { el, mount } from "../ui/dom.js";
import { announce, focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";
import { playCorrect, playWrong, playAchievement, playFanfare } from "../ui/sound.js";
import { robotBubble, robotHelpButton, openRobotHint, robotAvatar, robotReadButton, robotName, openRobotSetup, robotReact, openWhyWrong } from "../ui/robot.js";
import { isRobotConfigured } from "../ui/robot-prefs.js";
import { richText } from "../ui/richtext.js";
import { speak, speakSequence } from "../ui/speech.js";
import { ICONS } from "../ui/icons.js";
import { readingSection, glossarySection, keyPhrasesSection, noteSection, dialogueSection, grammarBox } from "./lesson-teaching.js";
import { confettiBurst } from "../ui/confetti.js";
import { celebrate } from "../ui/celebrate.js";
import { getCourseProgress } from "../services/course.js";
import { line } from "../ui/robot-lines.js";

const CARD = "lesson-card step-enter max-w-2xl w-full mx-auto bg-slate-900/55 backdrop-blur-xl border border-white/10 " +
  "rounded-3xl p-6 sm:p-8 min-h-[68vh] flex flex-col";
const PRIMARY = "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-5 py-3 rounded-xl " +
  "hover:from-indigo-400 hover:to-fuchsia-400 focus:outline focus:outline-2 focus:outline-indigo-400 w-full text-center " +
  "shadow-lg shadow-indigo-900/40 transition active:scale-[0.98]";
const OK_BTN = "bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-5 py-3 rounded-xl " +
  "hover:brightness-110 focus:outline focus:outline-2 focus:outline-emerald-400 w-full text-center " +
  "shadow-lg shadow-emerald-900/40 transition active:scale-[0.98]";
const BOX = "bg-white/5 border border-white/5 rounded-xl p-4";

export async function renderLessonPlayer(container, params, user) {
  const found = findLesson(params.id);
  if (!found) {
    mount(container, el("div", { class: CARD }, el("p", { class: "text-slate-300" }, "Leccion no encontrada."),
      el("button", { class: "mt-4 " + PRIMARY, onclick: () => go("/student") }, "Volver")));
    return;
  }
  const { unit, lesson } = found;
  // Idioma/voz del profe: espanol nativo en A1-A2; ingles (inmersion) de B1 en adelante.
  // Guia de Bymax: espanol en A1-B2, ingles (inmersion) solo en C1-C2.
  const robotLang = isAtLeast(unit.level, "C1") ? "en-US" : "es-MX";
  const steps = buildSteps(unit, lesson, robotLang);
  const activityTotal = steps.filter((s) => s.kind === "activity").length;
  // La regla de la unidad (de su leccion de gramatica) para las pistas del Profe Robo.
  const unitGrammar = unit.lessons.find((l) => l.grammar)?.grammar || null;

  const state = { idx: 0, correct: 0, checked: new Set(), streak: 0, bestStreak: 0, hearts: 3 };

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
      topBar(unit, pct, state),
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
        robotBubble(line("greeting", robotLang, { name: robotName() }), { lang: robotLang })),
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
      robotHelpButton(() => openRobotHint(unitGrammar, act, robotLang, unit.level)));
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
        const firstTime = !state.checked.has(idxNum);
        if (ok && firstTime) state.correct++;
        // Racha y corazones (solo cuenta el primer intento de cada ejercicio).
        if (firstTime) {
          if (ok) {
            state.streak++;
            state.bestStreak = Math.max(state.bestStreak, state.streak);
            if (state.streak >= 2) showCombo(body, state.streak);
          } else {
            state.streak = 0;
            state.hearts = Math.max(0, state.hearts - 1);
          }
        }
        state.checked.add(idxNum);
        lockNode(node);
        // Avisa a la actividad que ya se comprobo (ej. listening revela transcripcion).
        node.dispatchEvent(new CustomEvent("activity:checked", { detail: { ok } }));
        ok ? playCorrect() : playWrong();
        robotReact(ok, robotLang);
        // Refresca la barra superior (corazones/racha) sin re-render del ejercicio.
        const card = container.firstElementChild;
        if (card && card.firstElementChild) {
          card.replaceChild(topBar(unit, Math.round((state.idx / steps.length) * 100), state), card.firstElementChild);
        }
        body.append(feedbackBanner(ok, act, unitGrammar, robotLang, unit.level));
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
        topBar(unit, 100, state),
        el("div", { class: "flex-1 mt-6 text-center" },
          el("div", { class: "text-5xl" }, "\uD83D\uDCAA"),
          el("h1", { class: "text-2xl font-bold mt-3 text-slate-100" }, "Casi lo logras"),
          el("p", { class: "mt-2 text-slate-300" },
            "Tuviste " + state.correct + "/" + total + ". Necesitas 60%. Repasa la clase e intenta de nuevo."),
          feedback(false, "No pasa nada: equivocarse es parte de aprender.")),
        el("div", { class: "mt-6" },
          el("button", { class: PRIMARY, onclick: () => { state.idx = 0; state.correct = 0; state.checked = new Set(); state.streak = 0; state.bestStreak = 0; state.hearts = 3; renderStep(); } }, "Reintentar la leccion"))));
      focusMainHeading(container);
      return;
    }

    // Aprobado: construimos los logros y los revelamos escalonadamente.
    const heartBonus = state.hearts * 5;
    const streakBonus = state.bestStreak >= 3 ? 10 : 0;
    const totalXp = xp + heartBonus + streakBonus;

    const achievements = [];
    achievements.push({ icon: "\u2B50", text: "+" + totalXp + " puntos de experiencia" });
    achievements.push({ icon: "\u2705", text: "Leccion completada: " + lesson.title });
    achievements.push({ icon: "\uD83C\uDFAF", text: state.correct + "/" + total + " respuestas correctas" });
    if (state.bestStreak >= 3) achievements.push({ icon: "\uD83D\uDD25", text: "Mejor combo: x" + state.bestStreak + " (+" + streakBonus + " XP)" });
    if (state.hearts === 3) achievements.push({ icon: "\uD83D\uDC96", text: "Sin errores! Vidas intactas (+" + heartBonus + " XP)" });
    else if (state.hearts > 0) achievements.push({ icon: "\u2764\uFE0F", text: state.hearts + " vidas restantes (+" + heartBonus + " XP)" });
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
      topBar(unit, 100, state),
      body,
      el("div", { class: "mt-6" },
        el("button", { class: OK_BTN, onclick: () => go("/unidad/" + unit.id) }, "Volver a la unidad"))));
    focusMainHeading(container);
    playFanfare();
    confettiBurst();

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
    announce("Clase completada. Ganaste " + totalXp + " puntos.");

    // Celebracion EPICA al aprobar el TEST FINAL de la unidad (fin de unidad).
    // Si ademas quedo completo TODO el nivel, la version es "grand".
    if (passed && lesson.kind === "test") {
      let grand = false;
      try {
        const prog = await getCourseProgress(user.id);
        const doneIds = new Set(Object.entries(prog)
          .filter(([, v]) => v.status === "done").map(([id]) => id));
        grand = unitsForLevel(unit.level).every((u) => u.lessons.every((l) => doneIds.has(l.id)));
      } catch (e) { console.error("[leccion] no pude verificar fin de nivel:", e); }
      setTimeout(() => celebrate({
        title: grand ? "\u00a1Nivel " + unit.level + " completado!" : "\u00a1Unidad completada!",
        subtitle: grand ? "Dominaste todo el nivel " + unit.level : unit.title,
        grand,
      }), 600);
    }
  }
}

// ---------------------------------------------------------------------------
// Construccion de pasos a partir de la leccion (clase + practicas).
// ---------------------------------------------------------------------------
function buildSteps(unit, lesson, robotLang = "es-MX") {
  const steps = [{ kind: "intro" }];
  const c = lesson.content || {};

  const teach = [];
  const reading = c.reading || lesson.passage;
  if (reading) teach.push({ node: readingSection(reading), robot: line("reading", robotLang) });
  const grammar = c.grammar || lesson.grammar;
  if (grammar) teach.push({ node: grammarBox(grammar, robotLang, unit.level), robot: line("grammar", robotLang) });
  const glossary = c.glossary || lesson.glossary;
  if (glossary?.length) teach.push({ node: glossarySection(glossary), robot: line("glossary", robotLang) });
  if (c.keyPhrases?.length) teach.push({ node: keyPhrasesSection(c.keyPhrases), robot: line("keyPhrases", robotLang) });
  const note = c.note || lesson.note;
  if (note) teach.push({ node: noteSection(note), robot: line("note", robotLang) });
  if (lesson.dialogue?.length) teach.push({ node: dialogueSection(lesson.dialogue), robot: line("dialogue", robotLang) });

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
// Badge flotante de combo (racha) durante la practica.
function showCombo(host, streak) {
  host.style.position = host.style.position || "relative";
  const badge = el("div", {
    class: "combo-badge pointer-events-none absolute left-1/2 top-1 z-20 " +
      "bg-amber-400 text-slate-900 font-extrabold px-4 py-2 rounded-full shadow-lg",
  }, "\uD83D\uDD25 Combo x" + streak + "!");
  host.append(badge);
  setTimeout(() => badge.remove(), 1400);
}

function topBar(unit, pct, state) {
  const hearts = el("div", { class: "flex items-center gap-1 shrink-0", "aria-label": "Vidas: " + state.hearts + " de 3" },
    ...[0, 1, 2].map((i) => el("span", {
      class: "text-base leading-none transition " + (i < state.hearts ? "" : "opacity-25 grayscale"),
      "aria-hidden": "true",
    }, "\u2764\uFE0F")));
  const streakPill = state.streak >= 2
    ? el("span", { class: "text-xs font-bold text-amber-300 flex items-center gap-1" }, "\uD83D\uDD25 ", "x" + state.streak)
    : null;
  return el("div", {},
    el("div", { class: "flex items-center gap-3" },
      el("a", { href: "#/unidad/" + unit.id,
        class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white text-lg leading-none shrink-0",
        "aria-label": "Salir de la leccion" }, "\u2715"),
      el("div", { class: "flex-1 bg-white/10 rounded-full h-3.5 overflow-hidden", role: "progressbar",
        "aria-valuenow": String(pct), "aria-valuemin": "0", "aria-valuemax": "100" },
        el("div", { class: "progress-glow bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 h-full rounded-full transition-all duration-500", style: "width:" + pct + "%" })),
      el("span", { class: "text-xs font-bold text-emerald-300 tabular-nums w-9 text-right shrink-0" }, pct + "%")),
    el("div", { class: "flex items-center justify-between gap-2 mt-2 h-5" }, streakPill || el("span", {}), hearts));
}

// ---------------------------------------------------------------------------
// Feedback inmediato por actividad (banner tipo Duolingo).
// ---------------------------------------------------------------------------
function feedbackBanner(ok, act, grammar = null, lang = "es-MX", level) {
  const answerText = correctAnswerText(act);
  return el("div", {
    class: "mt-4 rounded-xl p-4 border " +
      (ok ? "border-emerald-600/60 bg-emerald-900/25" : "border-red-700/60 bg-red-900/25"),
  },
    el("p", { class: "font-bold " + (ok ? "text-emerald-300" : "text-red-300") },
      ok ? "\u2714 Correcto!" : "\u2716 No exactamente"),
    !ok ? el("p", { class: "mt-1 text-sm text-slate-200" }, "Respuesta: " + answerText) : null,
    act.explain ? el("p", { class: "mt-2 text-sm text-slate-300" }, "Por que: " + act.explain) : null,
    !ok ? el("button", {
      class: "mt-3 flex items-center gap-2 text-sm text-indigo-200 border border-indigo-500/40 " +
        "bg-indigo-500/10 rounded-xl px-3 py-2 hover:bg-indigo-500/20 focus:outline focus:outline-2 focus:outline-indigo-400",
      onclick: () => openWhyWrong(grammar, act, answerText, lang, level),
    }, robotAvatar("sm"), "Por que me equivoque?") : null);
}

function correctAnswerText(act) {
  const p = act.payload;
  switch (act.type) {
    case "multiple_choice": return p.choices[p.answer];
    case "cloze": return p.answer;
    case "word_bank": return p.answer.join(" ");
    case "matching": return p.pairs.map((x) => x.left + " = " + x.right).join(" | ");
    case "listening": return Array.isArray(p.choices) ? p.choices[p.answer] : p.answer;
    default: return "";
  }
}

/** Desactiva todos los controles dentro de un nodo (bloquea tras comprobar). */
function lockNode(node) {
  node.querySelectorAll("input, button, select").forEach((c) => { c.disabled = true; });
  node.classList.add("opacity-90");
}

// ---------------------------------------------------------------------------
// Bloques de ensenanza (la CLASE) viven en features/lesson-teaching.js.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Renderizadores de actividad. Cada uno devuelve { node, getResponse }.
// ---------------------------------------------------------------------------
function renderActivity(act, idx) {
  const title = el("legend", { class: "font-medium text-slate-100 text-lg" }, richText(act.prompt));
  switch (act.type) {
    case "multiple_choice": return mcActivity(act, idx, title);
    case "cloze": return clozeActivity(act, title);
    case "word_bank": return wordBankActivity(act, title);
    case "matching": return matchingActivity(act, title);
    case "listening": return listeningActivity(act, idx, title);
    default: return { node: el("p", {}, "Tipo no soportado."), getResponse: () => null };
  }
}

function mcActivity(act, idx, title) {
  let selected = null;
  const opts = act.payload.choices.map((text, ci) => {
    const btn = el("button", {
      type: "button",
      class: "block w-full text-left px-4 py-3.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 " +
        "text-slate-200 mt-2.5 transition active:scale-[0.99]",
      onclick: () => {
        selected = ci;
        [...btn.parentNode.children].forEach((c) => c.classList.remove("border-indigo-400", "bg-indigo-500/25"));
        btn.classList.add("border-indigo-400", "bg-indigo-500/25");
      },
    }, text);
    return btn;
  });
  return { node: el("fieldset", {}, title, el("div", { class: "mt-2" }, ...opts)), getResponse: () => selected };
}

function clozeActivity(act, title) {
  const p = act.payload || {};
  // Con TRAMPAS: si hay `choices`, se elige la palabra (banco de opciones) y se
  // PRONUNCIA al tocarla. Sin choices, se escribe libremente (comportamiento clasico).
  if (Array.isArray(p.choices) && p.choices.length) {
    let selected = null;
    const chips = [];
    const shuffled = [...p.choices].sort(() => Math.random() - 0.5);
    shuffled.forEach((word) => {
      const chip = el("button", {
        type: "button",
        class: "px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 text-slate-100 " +
          "hover:bg-white/10 transition active:scale-95 focus:outline focus:outline-2 focus:outline-indigo-400",
        onclick: () => {
          selected = word;
          chips.forEach((c) => c.classList.remove("border-indigo-400", "bg-indigo-500/25"));
          chip.classList.add("border-indigo-400", "bg-indigo-500/25");
          speak(word, "en-US", { rate: 0.9 }); // pronuncia la palabra elegida
        },
      }, word);
      chips.push(chip);
    });
    const hint = el("p", { class: "mt-2 text-xs text-slate-500" }, "Toca una palabra (la escuchar\u00e1s). Cuidado con las trampas.");
    return {
      node: el("fieldset", {}, title, el("div", { class: "mt-3 flex flex-wrap gap-2" }, ...chips), hint),
      getResponse: () => selected,
    };
  }

  const input = el("input", { type: "text",
    class: "mt-3 w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-slate-100 focus:outline focus:outline-2 focus:outline-indigo-500",
    placeholder: "Escribe tu respuesta" });
  return { node: el("fieldset", {}, title, input), getResponse: () => input.value };
}

function wordBankActivity(act, title) {
  const chosen = [];
  const answerArea = el("div", { class: "mt-3 min-h-[3rem] flex flex-wrap gap-2 bg-white/5 rounded-2xl p-3 border border-dashed border-white/20" });
  const bank = el("div", { class: "mt-3 flex flex-wrap gap-2" });

  function redraw() {
    answerArea.replaceChildren(...chosen.map((w, i) =>
      el("button", { type: "button", class: "px-3 py-1.5 bg-indigo-500/30 text-indigo-100 rounded-lg transition active:scale-95 hover:bg-indigo-500/40",
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
      class: "px-3 py-1.5 border border-white/15 bg-white/5 rounded-lg text-slate-200 hover:bg-white/10 transition active:scale-95",
      onclick: () => { if (btn.disabled) return; chosen.push(w); btn.disabled = true; btn.classList.add("opacity-40"); redraw(); } }, w);
    bank.append(btn);
  });

  return { node: el("fieldset", {}, title, answerArea, bank), getResponse: () => [...chosen] };
}

function matchingActivity(act, title) {
  const pairs = act.payload.pairs;
  const answers = new Array(pairs.length).fill(null); // right elegido por cada left
  let selectedLeft = null;
  const bankChips = [];

  const leftRows = [];
  const bank = el("div", { class: "mt-4 flex flex-wrap gap-2" });

  function redraw() {
    // Filas izquierda con su "slot".
    pairs.forEach((p, i) => {
      const row = leftRows[i];
      const slot = row._slot;
      const chosen = answers[i];
      row.classList.toggle("border-indigo-400", selectedLeft === i);
      row.classList.toggle("bg-indigo-500/15", selectedLeft === i);
      if (chosen) {
        slot.textContent = chosen;
        slot.className = "ml-auto px-3 py-1.5 rounded-lg bg-emerald-500/25 text-emerald-100 border border-emerald-500/40";
      } else {
        slot.textContent = "Toca aqu\u00ed";
        slot.className = "ml-auto px-3 py-1.5 rounded-lg bg-white/5 text-slate-500 border border-dashed border-white/20";
      }
    });
    // Banco: deshabilita los rights ya usados.
    bankChips.forEach((chip) => {
      const used = answers.includes(chip.textContent);
      chip.disabled = used;
      chip.classList.toggle("opacity-30", used);
    });
  }

  pairs.forEach((p, i) => {
    const slot = el("span", { class: "ml-auto" }, "");
    const row = el("button", {
      type: "button",
      class: "w-full flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5 text-left " +
        "hover:bg-white/10 transition focus:outline focus:outline-2 focus:outline-indigo-400",
      onclick: () => {
        if (answers[i]) {
          // Si ya tenia respuesta, la libera de vuelta al banco.
          answers[i] = null; selectedLeft = i;
        } else {
          selectedLeft = i;
        }
        redraw();
      },
    }, el("span", { class: "font-medium text-slate-100" }, p.left), slot);
    row._slot = slot;
    leftRows.push(row);
  });

  const rights = pairs.map((p) => p.right).sort(() => Math.random() - 0.5);
  rights.forEach((r) => {
    const chip = el("button", {
      type: "button",
      class: "px-3 py-2 rounded-lg border border-white/15 bg-white/5 text-slate-100 " +
        "hover:bg-white/10 transition active:scale-95 focus:outline focus:outline-2 focus:outline-indigo-400",
      onclick: () => {
        // Coloca en el left seleccionado, o en el primer slot vacio.
        let target = selectedLeft;
        if (target == null || answers[target]) target = answers.findIndex((a) => !a);
        if (target === -1 || target == null) return;
        answers[target] = r;
        selectedLeft = null;
        redraw();
      },
    }, r);
    bankChips.push(chip);
  });
  bank.append(...bankChips);

  redraw();
  return {
    node: el("fieldset", {}, title,
      el("p", { class: "mt-1 text-xs text-slate-500" }, "Toca un elemento de la izquierda y luego su pareja abajo."),
      el("div", { class: "mt-3 space-y-2" }, ...leftRows), bank),
    getResponse: () => answers.map((a) => a || ""),
  };
}

/**
 * Actividad de LISTENING: se ESCUCHA un audio (texto -> voz Chirp3-HD, oculto)
 * y se responde. Reusa la UI de opcion multiple (si hay choices) o de texto
 * libre (cloze). La transcripcion queda escondida hasta que el alumno la abra,
 * para que primero entrene el oido. DRY: no duplicamos MC/cloze.
 * payload: { audio, lang?, question?, choices?, answer, alt?, transcript? }
 */
function listeningActivity(act, idx, title) {
  const p = act.payload;
  const lang = p.lang || "en-US";
  const audioText = String(p.audio || "");
  const play = (rate) => speakSequence([{ text: audioText, lang, opts: { rate } }]);

  const playBtn = el("button", {
    type: "button",
    class: "inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white " +
      "font-semibold px-5 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-indigo-400 " +
      "shadow-lg shadow-indigo-900/40 transition active:scale-[0.98]",
    onclick: () => play(0.9),
  }, el("span", { class: "w-5 h-5 inline-grid place-items-center", html: ICONS.sound }), "Escuchar");

  const slowBtn = el("button", {
    type: "button",
    class: "inline-flex items-center gap-2 border border-white/15 bg-white/5 text-slate-200 " +
      "px-4 py-3 rounded-xl hover:bg-white/10 focus:outline focus:outline-2 focus:outline-indigo-400 transition",
    onclick: () => play(0.6),
  }, "\uD83D\uDC22 M\u00e1s lento");

  // Sub-actividad: MC o cloze, reusando los renderers existentes.
  const qLegend = el("legend", { class: "font-medium text-slate-100" }, richText(p.question || ""));
  const sub = Array.isArray(p.choices)
    ? mcActivity({ payload: { choices: p.choices, answer: p.answer } }, idx, qLegend)
    : clozeActivity({ payload: {} }, qLegend);

  // Transcripcion BLOQUEADA hasta responder (integridad del listening). Se
  // revela sola cuando el paso dispara el evento "activity:checked".
  const transcript = el("details", { class: "mt-4 text-sm hidden" },
    el("summary", { class: "cursor-pointer text-slate-400 hover:text-slate-200 select-none" }, "Ver transcripci\u00f3n"),
    el("p", { class: "mt-2 text-slate-200 bg-white/5 rounded-lg px-3 py-2" }, richText(p.transcript || audioText)));
  const locked = el("p", { class: "mt-4 text-xs text-slate-500 italic" }, "La transcripci\u00f3n se desbloquea al responder.");

  const node = el("fieldset", {}, title,
    el("p", { class: "mt-1 text-xs text-slate-400" }, "Escucha las veces que necesites. El texto est\u00e1 oculto a prop\u00f3sito."),
    el("div", { class: "mt-3 flex flex-wrap gap-2" }, playBtn, slowBtn),
    el("div", { class: "mt-5" }, sub.node),
    transcript, locked);

  // Al comprobar la respuesta, el paso dispara "activity:checked" -> revelamos.
  node.addEventListener("activity:checked", () => {
    transcript.classList.remove("hidden");
    locked.remove();
    // Reactiva SOLO los botones de audio para poder repetir mientras se repasa.
    playBtn.disabled = false;
    slowBtn.disabled = false;
  });

  // Auto-reproduce al aparecer (con un respiro para no pisar otras voces).
  setTimeout(() => play(0.9), 350);

  return { node, getResponse: sub.getResponse };
}

// ---------------------------------------------------------------------------
function feedback(ok, msg) {
  return el("div", { role: "alert",
    class: "mt-4 text-sm rounded-md px-3 py-2 " +
      (ok ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-300"
          : "bg-amber-500/15 border border-amber-500/40 text-amber-300") }, msg);
}
