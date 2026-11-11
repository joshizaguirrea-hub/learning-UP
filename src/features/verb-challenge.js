/**
 * features/verb-challenge.js — Practica de un verbo como RETO, no como formulario.
 *
 * POR QUE
 * -------
 * Version anterior: las 3 practicas (elegir el pasado, completar una frase,
 * completar otra) se apilaban TODAS a la vez, con un <input type="text"> liso
 * para el hueco. Funcionaba, pero se sentia un formulario que rellenar, no un
 * reto. Feedback directo del alumno: "quiero que esto sea mas atractivo y
 * retador, encuentra el metodo".
 *
 * DOS CAMBIOS DE FONDO (mismo contenido exacto: sigue siendo
 * core/verb-practice.js quien genera los 3 ejercicios; aqui solo cambia COMO
 * se presentan y se responden):
 *
 *  1. UN RETO A LA VEZ, no una lista larga. "Reto 1 de 3" con puntitos de
 *     progreso -- ritmo de mini-juego, no scroll de tramite.
 *  2. El ejercicio de "completar" (cloze) se resuelve con FICHAS DE LETRAS
 *     desordenadas -- un rompecabezas de palabra, no un campo de texto. Es
 *     la MISMA respuesta: reconocer y ordenar en vez de recordar la
 *     ortografia exacta de cero. Mas intuitivo para quien recien aprende el
 *     verbo, y notablemente mas entretenido de tocar.
 *
 * Sonido + racha + ficha-pop/shake (ui/sound.js y las clases .answer-pop /
 * .answer-shake / .combo-badge que YA existen en app.css para las lecciones)
 * para que acertar SE SIENTA bien, no solo quede registrado.
 *
 * MEMORIA DE PROGRESO (fix de un bug real reportado por el alumno): antes
 * esto era puro estado en memoria (variables `idx`/`solvedCount` dentro del
 * closure) -- si el alumno cambiaba de app o se iba a otra pantalla a medio
 * reto, al volver TODO se reiniciaba desde el Reto 1, aunque ya hubiera
 * acertado 1 o 2. Ahora:
 *   (a) si el verbo YA esta dominado (`opts.alreadyMastered`), se muestra de
 *       una un estado "Ya dominas este verbo" en vez de obligar a rehacer el
 *       reto completo otra vez -- con boton opcional para repasar si quiere.
 *   (b) mientras el reto esta EN CURSO, se autoguarda el avance (idx +
 *       solvedCount) via core/resume.js, y al reabrir se retoma ahi, no
 *       desde cero.
 */
import { el, mount } from "../ui/dom.js";
import { playCorrect, playWrong } from "../ui/sound.js";
import { normalize } from "../core/activities.js";
import { buildPractice } from "../core/verb-practice.js";
import { makeResumeKey, saveProgress, loadProgress, clearProgress } from "../core/resume.js";
import { ICONS } from "../ui/icons.js";

export { makeResumeKey };

const LEVEL_CLS = {
  Facil: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Intermedio: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Dificil: "bg-red-500/20 text-red-300 border-red-500/30",
};

/** Combo flotante (mismo look que en las lecciones): aparece y se borra sola. */
function comboBadge(host, streak) {
  host.style.position = host.style.position || "relative";
  const badge = el("div", {
    class: "combo-badge pointer-events-none absolute left-1/2 -top-2 z-20 " +
      "bg-amber-400 text-slate-900 font-extrabold px-4 py-2 rounded-full shadow-lg",
  }, "\uD83D\uDD25 Racha x" + streak + "!");
  host.append(badge);
  setTimeout(() => badge.remove(), 1300);
}

/** Letras de una palabra, desordenadas (reintenta si el azar la deja en orden). */
function scramble(word) {
  const letters = word.split("").map((ch, i) => ({ id: i, ch }));
  let out = letters;
  let tries = 0;
  do {
    out = [...letters].sort(() => Math.random() - 0.5);
    tries++;
  } while (tries < 5 && word.length > 2 && out.map((l) => l.ch).join("") === word);
  return out;
}

/** Tarjeta "ya lo sabes": se ve al reabrir un verbo YA dominado, en vez de
 * obligar a rehacer el reto desde cero cada vez que se reabre. */
function masteredCard(onRedo) {
  return el("div", {
    class: "mt-5 text-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-5",
  },
    el("p", { class: "text-emerald-300 font-bold text-lg flex items-center justify-center gap-2" },
      el("span", { class: "w-6 h-6 shrink-0", html: ICONS.check }), "\u00a1Ya dominas este verbo!"),
    el("p", { class: "mt-1 text-sm text-slate-400" }, "Tu avance queda guardado. No hace falta repetir el reto."),
    el("button", {
      type: "button",
      class: "mt-3 text-sm text-slate-300 underline hover:text-white focus:outline focus:outline-2 focus:outline-indigo-400 rounded",
      onclick: onRedo,
    }, "Practicar otra vez de todos modos"));
}

/**
 * Construye el bloque de practica de un verbo como una secuencia de RETOS.
 * @param {object} item - verbo {front, past, participle, examples}
 * @param {function} [onComplete] - se llama cuando se resuelven TODOS los retos
 * @param {object} [opts]
 * @param {boolean} [opts.alreadyMastered] - si ya esta dominado, se muestra
 *   el estado "ya lo sabes" en vez del reto (ver masteredCard arriba).
 * @param {string} [opts.resumeKey] - clave de autosave (ver core/resume.js).
 *   Sin ella, el reto sigue funcionando pero SIN memoria entre sesiones.
 * @returns {HTMLElement|null} null si no hay ejercicios que generar (y ya
 *   llama a onComplete por si el verbo no da para practica, ej. sin ejemplos)
 */
export function buildVerbChallenge(item, onComplete, opts = {}) {
  const exercises = buildPractice(item);
  if (!exercises.length) { onComplete?.(); return null; }

  const { alreadyMastered = false, resumeKey } = opts;
  const container = el("div", {});

  function showMastered() {
    mount(container, masteredCard(() => {
      clearProgress(resumeKey);
      mount(container, renderChallenge(0, 0));
    }));
  }

  if (alreadyMastered) {
    showMastered();
  } else {
    const saved = resumeKey ? loadProgress(resumeKey) : null;
    const startIdx = saved && saved.idx > 0 && saved.idx < exercises.length ? saved.idx : 0;
    const startSolved = saved && Number.isFinite(saved.solvedCount) ? saved.solvedCount : startIdx;
    mount(container, renderChallenge(startIdx, startSolved));
  }

  /** Arma la UI del reto, arrancando en `startIdx` (0 = desde el principio). */
  function renderChallenge(startIdx, startSolvedCount) {
    let idx = startIdx;
    let streak = 0;
    let solvedCount = startSolvedCount;

    const stepLabel = el("p", { class: "text-center text-base text-slate-300 font-semibold" }, "");
    const dotsHolder = el("div", { class: "flex justify-center gap-1.5 mt-1.5" });
    const body = el("div", { class: "mt-4" });
    const wrap = el("div", { class: "mt-5 text-left relative" },
      el("p", { class: "text-sm uppercase tracking-wide text-slate-500 text-center" }, "Practica el uso"),
      stepLabel, dotsHolder, body);

    function paintDots() {
      dotsHolder.replaceChildren(...exercises.map((_, i) => el("span", {
        class: "w-2.5 h-2.5 rounded-full transition-colors " +
          (i < solvedCount ? "bg-emerald-400" : i === idx ? "bg-indigo-400 ring-2 ring-indigo-300/50" : "bg-slate-700"),
      })));
    }

    function showStep() {
      stepLabel.textContent = `Reto ${idx + 1} de ${exercises.length}`;
      paintDots();
      mount(body, exerciseCard(exercises[idx]));
    }

    function onSolvedOnce(firstTry) {
      streak = firstTry ? streak + 1 : 0;
      solvedCount++;
      if (streak >= 2) comboBadge(wrap, streak);
      if (idx < exercises.length - 1) {
        idx++;
        saveProgress(resumeKey, { idx, solvedCount }); // autosave: si se va a medio reto, retoma aqui
        setTimeout(showStep, 700);
      } else {
        paintDots();
        clearProgress(resumeKey); // reto completo: ya no hace falta el autosave
        setTimeout(() => onComplete?.(), 500);
      }
    }

    function exerciseCard(ex) {
      let done = false;
      let firstTry = true;
      const fb = el("div", { class: "mt-3 text-sm min-h-[1.5rem]" }, " ");

      const ok = () => {
        if (done) return;
        done = true;
        playCorrect();
        mount(fb, el("div", { role: "status" },
          el("p", { class: "text-emerald-300 font-semibold text-base" }, "\u00a1Correcto! " + (ex.explain || "")),
          ex.why ? el("p", { class: "mt-1 text-slate-400 text-sm" }, "Por qu\u00e9: " + ex.why) : null));
        onSolvedOnce(firstTry);
      };
      const retry = () => {
        firstTry = false;
        playWrong();
        mount(fb, el("p", { class: "text-amber-300 text-base", role: "status" }, "Casi. Intenta de nuevo."));
      };

      const head = el("div", { class: "flex items-center gap-2" },
        el("span", {
          class: "text-xs uppercase font-bold px-2 py-0.5 rounded-full border shrink-0 " +
            (LEVEL_CLS[ex.level] || "bg-slate-700 text-slate-300 border-slate-600"),
        }, ex.level),
        el("p", { class: "text-slate-100 text-base font-medium flex-1" }, ex.prompt));

      const interactive = ex.kind === "choice"
        ? choiceButtons(ex, ok, retry, () => done)
        : letterPuzzle(ex, ok, retry, () => done);

      return el("div", { class: "rounded-2xl bg-slate-800/50 border border-slate-700 p-5" }, head, interactive, fb);
    }

    /** Opcion multiple como chips grandes y tactiles (no una lista de radio). */
    function choiceButtons(ex, ok, retry, isDone) {
      const row = el("div", { class: "mt-4 grid gap-2.5" });
      row.replaceChildren(...ex.choices.map((c, i) => {
        const btn = el("button", {
          type: "button",
          class: "w-full text-center px-4 py-3.5 rounded-2xl border-2 border-slate-700 bg-slate-800/70 " +
            "text-slate-100 font-semibold text-base hover:border-indigo-400 hover:bg-slate-700/70 " +
            "focus:outline focus:outline-2 focus:outline-indigo-400 transition disabled:cursor-default",
          onclick: () => {
            if (isDone()) return;
            void btn.offsetWidth;
            if (i === ex.answer) {
              btn.classList.add("answer-pop", "border-emerald-400", "bg-emerald-500/20", "text-emerald-200");
              [...row.children].forEach((b) => (b.disabled = true));
              ok();
            } else {
              btn.classList.add("answer-shake", "border-red-400", "bg-red-500/10");
              btn.disabled = true;
              retry();
            }
          },
        }, c);
        return btn;
      }));
      return row;
    }

    /** Rompecabezas de letras para el cloze: tocar fichas arma la palabra. */
    function letterPuzzle(ex, ok, retry, isDone) {
      const answer = String(ex.answer);
      const tiles = scramble(answer);
      let built = [];
      const usedIds = new Set();

      const slot = el("div", { class: "mt-4 flex flex-wrap justify-center gap-1.5 min-h-[3rem]" });
      const bank = el("div", { class: "mt-3 flex flex-wrap justify-center gap-1.5" });
      const clearBtn = el("button", {
        type: "button",
        class: "mt-3 mx-auto block text-xs text-slate-400 hover:text-slate-200 underline focus:outline focus:outline-2 focus:outline-indigo-400 rounded",
        onclick: () => { if (isDone()) return; built = []; usedIds.clear(); paint(); },
      }, "Borrar y empezar de nuevo");

      function paint() {
        slot.replaceChildren(...answer.split("").map((_, i) => {
          const letter = built[i];
          return el("span", {
            class: "w-9 h-10 sm:w-10 sm:h-11 rounded-xl border-2 flex items-center justify-center font-black text-lg uppercase " +
              (letter ? "border-indigo-400 bg-indigo-500/20 text-indigo-100" : "border-dashed border-slate-600 text-slate-600"),
          }, letter ? letter.ch : "");
        }));
        bank.replaceChildren(...tiles.map((t) => {
          const used = usedIds.has(t.id);
          const blocked = used || isDone();
          return el("button", {
            type: "button",
            // OJO: el("button", { disabled: false }) IGUAL deja el atributo puesto
            // (setAttribute("disabled","false")), y en HTML basta que el atributo
            // EXISTA para deshabilitar el boton -- su valor no importa. Por eso
            // aqui se manda null/"" en vez de true/false (mismo patron que ya usa
            // el resto de la app, ver unit.js y bymax-session.js).
            disabled: blocked ? "" : null,
            "aria-label": "letra " + t.ch,
            class: "w-9 h-10 sm:w-10 sm:h-11 rounded-xl font-black text-lg uppercase transition focus:outline focus:outline-2 focus:outline-indigo-400 " +
              (used ? "opacity-0 pointer-events-none" : "bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white hover:brightness-110 shadow"),
            onclick: () => {
              if (used || isDone() || built.length >= answer.length) return;
              built.push(t);
              usedIds.add(t.id);
              paint();
              if (built.length === answer.length) checkBuilt();
            },
          }, t.ch);
        }));
      }

      function checkBuilt() {
        const guess = built.map((t) => t.ch).join("");
        if (normalize(guess) === normalize(answer)) { ok(); paint(); }
        else {
          retry();
          setTimeout(() => { built = []; usedIds.clear(); paint(); }, 650);
        }
      }

      paint();
      return el("div", {}, slot, bank, clearBtn);
    }

    showStep();
    return wrap;
  }

  return container;
}
