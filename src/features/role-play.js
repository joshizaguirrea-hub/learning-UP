/**
 * features/role-play.js — Reading role-play: interpretar un dialogo con Bymax.
 *
 * El alumno elige un personaje de un pasaje-dialogo y lo INTERPRETA leyendo sus
 * lineas en voz alta; Bymax hace el otro personaje (voz TTS). Cada linea del
 * alumno se puntua vs el guion (reusa gradeDictation via core/role-play). Al
 * final, un puntaje de la escena que alimenta el Speaking Score.
 *
 * Reusa: motor puro core/role-play.js, splitTexts (reading-lab), speakBilingual
 * (TTS), createDictation (mic), recordSpeakingScore + dashboard ligero propio.
 */
import { el } from "../ui/dom.js";
import { UNITS } from "../data/units/index.js";
import { splitTexts } from "../core/reading-lab.js";
import {
  parseDialogue, dialogueSpeakers, isDialogue, buildScript, scoreLine, sessionScore,
} from "../core/role-play.js";
import { speakBilingual } from "../ui/speech.js";
import { cancelCloud } from "../ui/cloud-tts.js";
import { speechSupported, createDictation } from "../ui/mic.js";
import { recordSpeakingScore, scoreLabel } from "../core/speaking-score.js";
import { currentUser } from "../services/auth.js";

/** Junta pasajes-dialogo de TODAS las unidades (cualquier nivel). */
function gatherDialogues() {
  const out = [];
  for (const u of UNITS) {
    for (const l of u.lessons || []) {
      const reading = l?.content?.reading;
      if (!reading) continue;
      for (const p of splitTexts(reading)) {
        if (!isDialogue(p.body)) continue;
        out.push({ title: p.title || l.title, body: p.body, unit: u.title, level: u.level });
      }
    }
  }
  return out;
}

/** Abre el role-play en un overlay. */
export function openRolePlay(opts = {}) {
  let userId = opts.userId || "anon";
  // Desde "Mas" no llega el user: lo resolvemos aparte (el puntaje se guarda
  // al final de la escena, cuando esto ya termino).
  if (!opts.userId) currentUser().then((u) => { if (u && u.id) userId = u.id; }).catch(() => {});
  const dialogues = gatherDialogues();
  const hasMic = speechSupported();

  const stopAudio = () => { cancelCloud(); if ("speechSynthesis" in window) window.speechSynthesis.cancel(); };
  let dictation = null;
  const cleanup = () => { try { dictation?.abort(); } catch { /* nada */ } stopAudio(); };
  const close = () => { cleanup(); overlay.remove(); };

  const body = el("div", { class: "mt-4 flex-1 min-h-0 overflow-y-auto pr-1" });
  const heading = el("p", { class: "font-bold text-teal-300" }, "Role-play");

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl flex flex-col max-h-[90vh]",
    role: "dialog", "aria-label": "Reading role-play", "aria-modal": "true",
  },
    el("div", { class: "flex items-center justify-between" },
      heading,
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    body);

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);
  document.body.append(overlay);

  if (!dialogues.length) { renderEmpty(); return; }
  renderPicker();

  function renderEmpty() {
    body.replaceChildren(el("p", { class: "text-sm text-slate-300 py-6 text-center" },
      "A\u00fan no hay di\u00e1logos para interpretar. Avanza en tu curso y vuelve."));
  }

  // --- Paso 1: elegir dialogo ------------------------------------------------
  function renderPicker() {
    heading.textContent = "Role-play";
    const rows = dialogues.map((d) => el("button", {
      type: "button",
      class: "w-full text-left px-3 py-3 rounded-xl bg-slate-800/70 border border-slate-700 hover:bg-slate-700/70 focus:outline focus:outline-2 focus:outline-teal-400",
      onclick: () => renderCast(d),
    },
      el("div", { class: "flex items-center gap-2" },
        el("span", { class: "text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 shrink-0" }, d.level || "?"),
        el("span", { class: "text-sm font-semibold text-slate-100" }, d.title)),
      el("p", { class: "text-xs text-slate-400 mt-0.5 line-clamp-1" }, d.unit)));

    body.replaceChildren(
      el("div", { class: "rounded-2xl bg-gradient-to-br from-teal-600/20 to-emerald-600/10 border border-teal-500/30 p-4" },
        el("p", { class: "text-sm text-slate-200 leading-relaxed" },
          "Interpreta un ", el("b", {}, "di\u00e1logo"), " con Bymax: t\u00fa haces un personaje (lees sus l\u00edneas en voz alta) y \u00e9l hace el otro. ",
          hasMic ? "Te puntuar\u00e9 cada l\u00ednea." : "(Sin micr\u00f3fono: practicas la lectura sin puntaje.)")),
      el("p", { class: "mt-4 text-xs uppercase tracking-wide text-teal-400 font-semibold" }, "Elige una escena"),
      el("div", { class: "mt-2 space-y-2" }, ...rows));
  }

  // --- Paso 2: elegir personaje ----------------------------------------------
  function renderCast(dialogue) {
    const turns = parseDialogue(dialogue.body);
    const speakers = dialogueSpeakers(turns);
    heading.textContent = dialogue.title || "Escena";

    const btns = speakers.map((sp) => {
      const lines = turns.filter((t) => t.speaker === sp).length;
      return el("button", {
        type: "button",
        class: "w-full text-left px-4 py-3 rounded-xl bg-slate-800/70 border border-slate-700 hover:bg-slate-700/70 focus:outline focus:outline-2 focus:outline-teal-400",
        onclick: () => runScript(dialogue, buildScript(turns, sp), sp),
      },
        el("p", { class: "font-bold text-slate-100" }, "Personaje " + sp),
        el("p", { class: "text-xs text-slate-400" }, lines + (lines === 1 ? " l\u00ednea" : " l\u00edneas") + " \u00b7 Bymax har\u00e1 el resto"));
    });

    body.replaceChildren(
      el("p", { class: "text-sm text-slate-300" }, "\u00bfQu\u00e9 personaje quieres interpretar?"),
      el("div", { class: "mt-3 space-y-2" }, ...btns),
      el("button", {
        type: "button",
        class: "mt-3 w-full px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-sm hover:bg-white/10",
        onclick: renderPicker,
      }, "\u2190 Otra escena"));
  }

  // --- Paso 3: correr el guion -----------------------------------------------
  function runScript(dialogue, script, userSpeaker) {
    const scores = [];
    step(0);

    function step(i) {
      stopAudio();
      if (i >= script.length) { renderResults(dialogue, script, userSpeaker, scores); return; }
      const turn = script[i];
      const progress = el("p", { class: "text-xs text-slate-500 text-center" }, "L\u00ednea " + (i + 1) + " de " + script.length);
      heading.textContent = "Escena \u00b7 t\u00fa eres " + userSpeaker;
      if (turn.isUser) renderUserTurn(i, turn, progress);
      else renderBotTurn(i, turn, progress);
    }

    function renderBotTurn(i, turn, progress) {
      const next = () => { stopAudio(); step(i + 1); };
      body.replaceChildren(
        progress,
        el("div", { class: "mt-4 rounded-2xl bg-slate-800/60 border border-slate-700 p-4" },
          el("p", { class: "text-xs uppercase tracking-wide text-teal-400 font-semibold" }, "Bymax (" + turn.speaker + ")"),
          el("p", { class: "mt-1 text-lg text-slate-100 leading-relaxed" }, turn.line)),
        el("div", { class: "mt-4 flex gap-2" },
          el("button", {
            type: "button",
            class: "px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-slate-200 text-sm hover:bg-white/10",
            onclick: () => speakBilingual(turn.line),
          }, "\uD83D\uDD0A Repetir"),
          el("button", {
            type: "button",
            class: "flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold hover:brightness-110 focus:outline focus:outline-2 focus:outline-teal-300",
            onclick: next,
          }, "Continuar \u2192")));
      speakBilingual(turn.line); // auto-lee la linea de Bymax
    }

    function renderUserTurn(i, turn, progress) {
      const said = el("p", { class: "mt-2 min-h-[2.5rem] text-slate-300 text-sm bg-slate-800/50 rounded-xl p-3" },
        el("span", { class: "text-slate-500 italic" }, hasMic ? "Toca el micr\u00f3fono y lee tu l\u00ednea..." : "Lee tu l\u00ednea en voz alta."));
      const result = el("div", { class: "mt-3" });

      const micBtn = hasMic ? el("button", {
        type: "button",
        class: "w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white grid place-items-center mx-auto shadow-lg hover:brightness-110 focus:outline focus:outline-2 focus:outline-teal-300",
        "aria-label": "Grabar mi l\u00ednea",
        onclick: () => record(),
      }, "\uD83C\uDFA4") : null;

      const skipBtn = el("button", {
        type: "button",
        class: "mt-4 w-full px-5 py-3 rounded-xl " + (hasMic
          ? "border border-white/10 bg-white/5 text-slate-300 text-sm hover:bg-white/10"
          : "bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold hover:brightness-110"),
        onclick: () => { if (!hasMic) scores.push(1); step(i + 1); },
      }, hasMic ? "Saltar esta l\u00ednea" : "La le\u00ed \u2192");

      body.replaceChildren(
        progress,
        el("div", { class: "mt-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 p-4" },
          el("p", { class: "text-xs uppercase tracking-wide text-teal-300 font-semibold" }, "T\u00fa (" + turn.speaker + ") \u2014 lee esto:"),
          el("p", { class: "mt-1 text-lg text-slate-100 leading-relaxed" }, turn.line)),
        said, result,
        micBtn ? el("div", { class: "mt-4" }, micBtn) : null,
        skipBtn);

      function record() {
        micBtn.disabled = true;
        said.replaceChildren(el("span", { class: "text-teal-300" }, "Escuchando... \u00a1habla!"));
        dictation = createDictation({
          lang: "en-US",
          onInterim: (t) => { said.textContent = t; },
          onFinal: (t) => { said.textContent = t; },
          onEnd: (finalText) => finishUserTurn(i, turn, finalText, said, result),
          onError: () => { said.replaceChildren(el("span", { class: "text-amber-400" }, "No pude o\u00edrte. Toca el micr\u00f3fono otra vez.")); micBtn.disabled = false; },
        });
        dictation.start();
      }
    }

    function finishUserTurn(i, turn, finalText, said, result) {
      const r = scoreLine(turn.line, finalText || "");
      scores.push(r.pct / 100);
      said.replaceChildren(...r.marks.map((m) => m.punct
        ? document.createTextNode(m.word + " ")
        : el("span", { class: (m.hit ? "text-emerald-300" : "text-rose-400 line-through") }, m.word + " ")));
      result.replaceChildren(
        el("p", { class: "text-sm font-bold " + (r.pct >= 70 ? "text-emerald-300" : "text-amber-300") },
          r.pct + "% de la l\u00ednea" + (r.pct >= 90 ? " \u00a1clavada!" : r.pct >= 70 ? " \u00a1bien!" : " \u2014 vuelve a intentar si quieres")),
        el("button", {
          type: "button",
          class: "mt-3 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold hover:brightness-110 focus:outline focus:outline-2 focus:outline-teal-300",
          onclick: () => step(i + 1),
        }, "Siguiente \u2192"));
    }
  }

  // --- Paso 4: resultados ----------------------------------------------------
  function renderResults(dialogue, script, userSpeaker, scores) {
    heading.textContent = "\u00a1Fin de la escena!";
    const userLines = script.filter((s) => s.isUser).length;
    const score = sessionScore(scores);
    const scored = hasMic && scores.length > 0;
    const saved = scored ? recordSpeakingScore(userId, score) : null;
    const info = scoreLabel(score);

    body.replaceChildren(
      el("div", { class: "text-center" },
        scored
          ? el("div", { class: "relative w-28 h-28 rounded-full grid place-items-center mx-auto",
            style: "background: conic-gradient(#2dd4bf " + (score * 3.6) + "deg, rgba(148,163,184,.2) 0deg)" },
            el("div", { class: "w-20 h-20 rounded-full bg-slate-900 grid place-items-center" },
              el("div", {},
                el("p", { class: "text-3xl font-extrabold text-teal-300 leading-none" }, String(score)),
                el("p", { class: "text-[10px] text-slate-400 uppercase tracking-wide" }, "escena"))))
          : el("p", { class: "text-4xl", "aria-hidden": "true" }, "\uD83C\uDFAD"),
        el("p", { class: "mt-3 text-lg font-bold text-slate-100" }, scored ? info.label : "\u00a1Buena interpretaci\u00f3n!"),
        el("p", { class: "text-xs text-slate-400 mt-1" }, "Interpretaste " + userLines + (userLines === 1 ? " l\u00ednea" : " l\u00edneas") + " de " + userSpeaker),
        saved ? el("p", { class: "text-xs text-slate-400 mt-1" },
          "Speaking Score \u00b7 mejor: " + saved.best + " \u00b7 promedio: " + saved.avg + " \u00b7 sesiones: " + saved.sessions) : null),
      el("div", { class: "mt-6 flex gap-2" },
        el("button", {
          type: "button",
          class: "flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold hover:brightness-110 focus:outline focus:outline-2 focus:outline-teal-300",
          onclick: () => renderCast(dialogue),
        }, "Cambiar de papel"),
        el("button", {
          type: "button",
          class: "px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 focus:outline focus:outline-2 focus:outline-white",
          onclick: renderPicker,
        }, "Otra escena")));
  }
}
