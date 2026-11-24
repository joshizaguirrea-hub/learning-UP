/**
 * features/kana-lab.js — "Escritura japonesa": laboratorio de Hiragana.
 *
 * NUEVO SEGMENTO (pedido de Joshua, ver docs/ROADMAP-JAPONES.md): aprender a
 * LEER/ESCRIBIR kana de verdad vive AQUI, separado del avance tematico de las
 * unidades (que ahora va en romaji -- ver ui/bilingual-term.js). Independiente
 * del nivel/unidad: se entra desde el hub y se avanza a tu propio ritmo.
 *
 * RE-ESTRUCTURA (pedido de Joshua): antes de memorizar caracteres sueltos, el
 * alumno necesita FAMILIARIZARSE con el panorama completo -- que es el kana,
 * como se organiza la tabla (gojuon) y como las silabas se INTEGRAN para
 * formar palabras. Por eso la pantalla principal ahora tiene DOS partes:
 *   1) "Conoce el sistema" (nivel basico): que es hiragana/katakana/kanji,
 *      la tabla COMPLETA del gojuon (46 sonidos, marcando que filas ya se
 *      pueden practicar) y un ejemplo real de como se arma una palabra.
 *   2) "Practica por lotes": el ciclo de siempre (Aprende -> Quiz -> SRS),
 *      SOLO sobre las filas que ya tienen contenido (ver data/kana-hiragana.js).
 *
 * FASE 1 de la practica (sin cambios): RECONOCER el caracter -- leerlo y
 * encontrarlo entre opciones. Nada de trazos/teclado todavia (Fase 2+ del
 * roadmap). Ciclo por lote: Aprende (flashcard + mnemotecnia + audio +
 * ejemplo) -> Quiz (opcion multiple) -> alimenta el SRS (mismo motor que el
 * vocabulario, ver services/srs.js -- un caracter es, ni mas ni menos, una
 * tarjeta mas que recordar).
 */
import { el, mount, replaceKids } from "../ui/dom.js";
import { ICONS } from "../ui/icons.js";
import { backHome, screenHeader } from "../ui/hub-ui.js";
import { speakButton } from "../ui/speech.js";
import { playCorrect, playWrong } from "../ui/sound.js";
import { kanaRows, charsForRow, buildKanaQuiz, scorePct } from "../core/kana-lab.js";
import { GOJUON_TABLE, readyRows } from "../data/kana-hiragana.js";
import { ensureCards, getCardsByIds, saveCard } from "../services/srs.js";
import { review, newCard } from "../core/srs.js";

const ROW_LABEL = {
  a: "Vocales \u00b7 a i u e o",
  ka: "Fila \u304b \u00b7 ka ki ku ke ko",
  sa: "Fila \u3055 \u00b7 sa shi su se so",
  ta: "Fila \u305f \u00b7 ta chi tsu te to",
  na: "Fila \u306a \u00b7 na ni nu ne no",
  ha: "Fila \u306f \u00b7 ha hi fu he ho",
  ma: "Fila \u307e \u00b7 ma mi mu me mo",
  ya: "Fila \u3084 \u00b7 ya yu yo",
  ra: "Fila \u3089 \u00b7 ra ri ru re ro",
  wa: "Fila \u308f \u00b7 wa wo",
  n: "\u3093 (n) \u00b7 cierra silabas",
};
const OK_CLS = "border-emerald-400 bg-emerald-500/25 text-emerald-100";
const BAD_CLS = "border-rose-400 bg-rose-500/25 text-rose-100";

// Desglose de una palabra conocida (ya aparece en ja1-konnichiwa) para mostrar
// COMO SE INTEGRAN las silabas: se concatenan, sin espacios entre ellas.
const WORD_BREAKDOWN = {
  word: "\u3053\u3093\u306b\u3061\u306f", romaji: "konnichiwa", translation: "hola (durante el dia)",
  parts: [
    { kana: "\u3053", romaji: "ko" }, { kana: "\u3093", romaji: "n" }, { kana: "\u306b", romaji: "ni" },
    { kana: "\u3061", romaji: "chi" }, { kana: "\u306f", romaji: "wa*" },
  ],
};

/** Pantalla principal: familiarizacion con el sistema + practica por lotes. */
export async function renderKanaLab(container, user) {
  const ready = readyRows();
  mount(container, el("div", { class: "max-w-3xl mx-auto space-y-6" },
    backHome(),
    screenHeader({
      icon: ICONS.book, grad: "from-rose-500 to-pink-700",
      title: "Escritura japonesa", subtitle: "Conoce el sistema y aprende a LEER hiragana, a tu ritmo",
    }),
    whatIsKanaCard(),
    gojuonCard(ready, user),
    wordBreakdownCard(),
    el("section", {},
      el("h2", { class: "text-sm font-bold uppercase tracking-wide text-slate-400 mb-3" }, "Practica por lotes"),
      el("div", { class: "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3" },
        ...kanaRows().map((row) => rowCard(row, user))))));
}

/** Nivel basico 1: que es el kana (vs kanji) y para que sirve cada sistema. */
function whatIsKanaCard() {
  return panel(
    el("h2", { class: "font-bold text-rose-300" }, "\u00bfQu\u00e9 es el kana?"),
    el("p", { class: "mt-2 text-sm text-slate-300 leading-relaxed" },
      "El japones NO usa un alfabeto como el espanol (una letra = un sonido). Usa ",
      el("b", { class: "text-slate-100" }, "silabarios"), ": cada caracter representa una ",
      el("b", { class: "text-slate-100" }, "silaba completa"), " (ej. \u304b se lee 'ka', nunca solo 'k')."),
    el("div", { class: "mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2" },
      systemChip("\u3072\u3089\u304c\u306a", "Hiragana", "Palabras y gramatica japonesa. Por esto empezamos aqui.", "text-rose-300 border-rose-400/30 bg-rose-500/10"),
      systemChip("\u30ab\u30bf\u30ab\u30ca", "Katakana", "Palabras prestadas de otros idiomas (coffee \u2192 kohi\u014d) y nombres extranjeros.", "text-sky-300 border-sky-400/30 bg-sky-500/10"),
      systemChip("\u6f22\u5b57", "Kanji", "Ideas/conceptos completos (prestados del chino). Se aprenden despues de dominar hiragana.", "text-amber-300 border-amber-400/30 bg-amber-500/10")));
}

function systemChip(sample, title, desc, cls) {
  return el("div", { class: "rounded-xl border p-3 " + cls },
    el("p", { class: "text-2xl font-black" }, sample),
    el("p", { class: "text-sm font-bold mt-1 text-slate-100" }, title),
    el("p", { class: "text-xs text-slate-400 mt-1 leading-snug" }, desc));
}

/** Nivel basico 2: la tabla COMPLETA del gojuon (46 sonidos), ya o proximamente. */
function gojuonCard(ready, user) {
  const cols = ["a", "i", "u", "e", "o"];
  return panel(
    el("h2", { class: "font-bold text-rose-300" }, "\u00bfC\u00f3mo se organiza la tabla? (gojuon)"),
    el("p", { class: "mt-2 text-sm text-slate-300 leading-relaxed" },
      "Las 5 columnas son SIEMPRE las mismas 5 vocales (a-i-u-e-o); cada fila agrega una consonante. " +
      "Aprenderla de un tiron es mucho; por eso se practica fila por fila abajo."),
    el("div", { class: "mt-3 overflow-x-auto" },
      el("table", { class: "mx-auto border-separate", style: "border-spacing: 6px" },
        el("tbody", {},
          ...GOJUON_TABLE.map((rowDef) => {
            const isReady = ready.includes(rowDef.row);
            return el("tr", {},
              el("td", { class: "text-xs text-slate-500 font-bold pr-1 align-middle" }, rowDef.label),
              ...cols.map((_, i) => {
                const cell = rowDef.cells[i];
                if (!cell) return el("td", { class: "w-11 h-11" });
                return el("td", {},
                  isReady
                    ? el("button", {
                        type: "button",
                        class: "w-11 h-11 rounded-lg bg-rose-500/15 border border-rose-400/40 text-rose-200 " +
                          "font-bold hover:bg-rose-500/25 focus:outline focus:outline-2 focus:outline-rose-400",
                        title: cell.romaji,
                        onclick: () => openRow(rowDef.row, charsForRow(rowDef.row), user),
                      }, cell.kana)
                    : el("div", {
                        class: "w-11 h-11 rounded-lg bg-slate-800/60 border border-slate-700 text-slate-500 " +
                          "grid place-items-center font-bold opacity-60",
                        title: "Proximamente",
                      }, cell.kana));
              }));
          }))),
    ),
    el("div", { class: "mt-3 flex flex-wrap gap-4 text-xs" },
      el("span", { class: "inline-flex items-center gap-1.5 text-slate-400" },
        el("span", { class: "w-3 h-3 rounded bg-rose-500/40 border border-rose-400/60 inline-block" }), "Ya puedes practicarla (toca el caracter)"),
      el("span", { class: "inline-flex items-center gap-1.5 text-slate-500" },
        el("span", { class: "w-3 h-3 rounded bg-slate-800 border border-slate-700 inline-block" }), "Pr\u00f3ximamente")));
}

/** Nivel basico 3: como se INTEGRAN las silabas para formar una palabra real. */
function wordBreakdownCard() {
  return panel(
    el("h2", { class: "font-bold text-rose-300" }, "\u00bfC\u00f3mo se integran en palabras?"),
    el("p", { class: "mt-2 text-sm text-slate-300 leading-relaxed" },
      "Las silabas se escriben UNA tras otra, sin espacios entre ellas -- igual que armar un collar de cuentas. " +
      "Una palabra que ya conoces de tus clases:"),
    el("div", { class: "mt-3 flex flex-wrap items-center justify-center gap-1.5" },
      ...WORD_BREAKDOWN.parts.map((p) => el("div", { class: "rounded-lg bg-slate-800/60 border border-slate-700 px-3 py-2 text-center" },
        el("p", { class: "text-2xl font-black text-slate-100" }, p.kana),
        el("p", { class: "text-xs text-rose-300 mt-0.5" }, p.romaji)))),
    el("div", { class: "mt-3 text-center" },
      el("p", { class: "text-3xl font-black text-slate-100" }, WORD_BREAKDOWN.word),
      el("p", { class: "text-lg text-rose-300 font-semibold mt-1" }, WORD_BREAKDOWN.romaji),
      el("p", { class: "text-sm text-slate-400 mt-1" }, WORD_BREAKDOWN.translation),
      el("p", { class: "text-xs text-slate-500 mt-1 italic" }, "*\u306f se escribe 'ha' pero aqui suena 'wa' -- una excepcion que aprenderas con la practica."),
      speakButton(WORD_BREAKDOWN.word, { lang: "ja" })));
}

/** Tarjeta contenedora generica para las 3 secciones de familiarizacion. */
function panel(...children) {
  return el("section", { class: "rounded-2xl bg-slate-900 border border-slate-800 p-5" }, ...children);
}

function rowCard(row, user) {
  const chars = charsForRow(row);
  return el("button", {
    type: "button",
    class: "text-left rounded-2xl bg-slate-900 border border-slate-800 p-5 hover:border-rose-400 " +
      "transition focus:outline focus:outline-2 focus:outline-rose-400",
    onclick: () => openRow(row, chars, user),
  },
    el("p", { class: "text-3xl font-black text-slate-100 tracking-wider" }, chars.map((k) => k.kana).join(" ")),
    el("p", { class: "mt-2 text-sm font-semibold text-rose-300" }, ROW_LABEL[row] || row),
    el("p", { class: "mt-1 text-xs text-slate-500" }, chars.length + " caracteres"));
}

/** Abre el estudio de un lote: Aprende -> Quiz -> Resultado (overlay). */
function openRow(row, chars, user) {
  let idx = 0;        // indice en la fase "aprende"
  let qIdx = 0;        // indice en la fase "quiz"
  let correct = 0;
  let quiz = [];        // preguntas de la ronda de quiz en curso
  const stats = {};    // charId -> { right, total } para alimentar el SRS

  const stage = el("div", { class: "mt-4" });
  const close = () => overlay.remove();

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl " +
      "max-h-[92dvh] overflow-y-auto",
    role: "dialog", "aria-label": "Escritura: " + (ROW_LABEL[row] || row), "aria-modal": "true",
  },
    el("div", { class: "flex items-center justify-between" },
      el("p", { class: "font-bold text-rose-300" }, ROW_LABEL[row] || row),
      el("button", {
        class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg",
        "aria-label": "Cerrar", onclick: close,
      }, "\u2715")),
    stage);

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);
  document.body.append(overlay);

  // --- FASE 1: Aprende (flashcard + mnemotecnia + ejemplo) ---------------
  function renderLearn() {
    const k = chars[idx];
    const sb = speakButton(k.kana, { lang: "ja" });
    replaceKids(stage,
      el("p", { class: "text-xs uppercase tracking-wide text-slate-500" },
        "Caracter " + (idx + 1) + " de " + chars.length),
      el("div", { class: "mt-3 text-center" },
        el("p", { class: "text-7xl font-black text-slate-100 leading-none" }, k.kana),
        el("p", { class: "mt-2 text-2xl font-bold text-rose-300" }, k.romaji),
        sb ? el("div", { class: "mt-2 flex justify-center" }, sb) : null),
      el("div", { class: "mt-4 rounded-xl bg-slate-800/60 border border-slate-700 p-3" },
        el("p", { class: "text-xs font-bold uppercase text-slate-400 mb-1" }, "Para recordarlo"),
        el("p", { class: "text-sm text-slate-200 leading-relaxed" }, k.mnemonic)),
      el("div", { class: "mt-3 rounded-xl bg-rose-500/10 border border-rose-400/30 p-3" },
        el("p", { class: "text-xs font-bold uppercase text-rose-300 mb-1" }, "Ejemplo"),
        el("p", { class: "text-slate-100" }, k.example.term + " \u2014 " + k.example.translation)),
      el("button", {
        type: "button",
        class: "mt-5 w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold px-5 py-3 " +
          "rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-rose-400",
        onclick: () => { idx++; idx >= chars.length ? startQuiz() : renderLearn(); },
      }, idx === chars.length - 1 ? "Empezar el quiz \u2192" : "Siguiente \u2192"));
  }

  // --- FASE 2: Quiz (opcion multiple, leer + encontrar) -------------------
  function startQuiz() {
    qIdx = 0; correct = 0;
    for (const k in stats) delete stats[k];
    quiz = buildKanaQuiz(chars);
    renderQuiz();
  }

  function renderQuiz() {
    if (qIdx >= quiz.length) return renderDone();
    const q = quiz[qIdx];
    const t = stats[q.charId] || (stats[q.charId] = { right: 0, total: 0 });
    let done = false;
    const fb = el("div");

    const btns = q.options.map((opt) => {
      const b = el("button", {
        type: "button",
        class: "block w-full text-left px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-200 " +
          "mt-2 hover:bg-white/10 transition focus:outline focus:outline-2 focus:outline-rose-400",
        onclick: () => {
          if (done) return;
          done = true;
          const ok = !!opt.correct;
          correct += ok ? 1 : 0;
          t.total++; if (ok) t.right++;
          ok ? playCorrect() : playWrong();
          btns.forEach((x) => {
            if (x._opt.correct) x.className += " " + OK_CLS;
            else if (x === b) x.className += " " + BAD_CLS;
            x.disabled = true;
          });
          fb.replaceChildren(el("p", { class: "mt-3 text-sm font-semibold " + (ok ? "text-emerald-300" : "text-amber-300") },
            ok ? "\u2714 \u00a1Correcto!" : "\u2717 Era: " + q.options.find((o) => o.correct).text));
          next.disabled = false;
        },
      }, opt.text);
      b._opt = opt;
      return b;
    });

    const next = el("button", {
      type: "button", disabled: true,
      class: "mt-4 w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold px-5 py-3 " +
        "rounded-xl hover:brightness-110 disabled:opacity-40 focus:outline focus:outline-2 focus:outline-rose-400",
      onclick: () => { qIdx++; renderQuiz(); },
    }, qIdx === quiz.length - 1 ? "Ver resultado" : "Siguiente \u2192");

    const sb = q.kind === "read" ? speakButton(q.prompt, { lang: "ja" }) : null;
    replaceKids(stage,
      el("p", { class: "text-xs uppercase tracking-wide text-slate-500" },
        "Pregunta " + (qIdx + 1) + " de " + quiz.length),
      el("p", { class: "mt-2 text-sm text-slate-400" },
        q.kind === "read" ? "\u00bfC\u00f3mo se lee?" : "\u00bfCual caracter es \u201c" + q.prompt + "\u201d?"),
      el("div", { class: "mt-1 flex items-center gap-2" },
        el("p", { class: "text-5xl font-black text-slate-100" }, q.prompt),
        sb),
      el("div", { class: "mt-3" }, ...btns),
      fb, next);
  }

  // --- RESULTADO: alimenta el SRS y cierra el ciclo -----------------------
  async function renderDone() {
    const pct = scorePct(correct, quiz.length);
    await syncSrs();
    replaceKids(stage,
      el("div", { class: "text-center py-4" },
        el("p", { class: "text-5xl" }, pct >= 70 ? "\uD83C\uDF89" : "\uD83D\uDCAA"),
        el("h3", { class: "text-xl font-bold text-slate-100 mt-2" },
          pct >= 70 ? "\u00a1Lote dominado!" : "Buen intento"),
        el("p", { class: "mt-2 text-slate-300" },
          "Acertaste " + correct + " de " + quiz.length + " (" + pct + "%)."),
        el("p", { class: "mt-1 text-xs text-slate-500" }, "Estos caracteres entraron a tu repaso diario (SRS)."),
        el("div", { class: "mt-5 flex flex-col gap-2" },
          el("button", {
            class: "bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110",
            onclick: () => { idx = 0; renderLearn(); },
          }, "Repasar este lote otra vez"),
          el("button", {
            class: "text-sm text-slate-400 hover:text-slate-200 underline",
            onclick: close,
          }, "Volver a los lotes"))));
  }

  /** Igual que vocab-lab.js: crea tarjetas si faltan y reprograma cada una. */
  async function syncSrs() {
    if (!user?.id) return;
    try {
      const ids = Object.keys(stats);
      if (!ids.length) return;
      await ensureCards(user.id, chars.filter((c) => ids.includes(c.id)));
      const existing = await getCardsByIds(user.id, ids);
      await Promise.all(ids.map((cid) => {
        const t = stats[cid];
        const cur = existing[cid];
        const c = cur
          ? { ease: Number(cur.ease), interval: cur.interval, reps: cur.reps, due: cur.due }
          : newCard();
        const grade = (t.right / t.total) >= 0.6 ? "good" : "again";
        return saveCard(user.id, cid, review(c, grade));
      }));
    } catch (e) { console.error("[kana-lab] SRS sync fallo:", e); }
  }

  renderLearn();
}
