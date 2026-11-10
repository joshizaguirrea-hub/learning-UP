/**
 * features/vocab-class.js — Clase de PRESENTACION de vocabulario con Bymax.
 *
 * El POP de Vocabulary del hub ya no salta directo a la practica: primero Bymax
 * DA LA CLASE (fase de input comprensible). Se presenta, y va palabra por palabra
 * diciendola en el IDIOMA META (voz nativa), mostrando su traduccion y un ejemplo
 * real, y
 * poniendo al alumno a REPETIRLA en voz alta (mic si el navegador lo soporta;
 * autoevaluacion honesta si no). Al terminar, encadena con la ESCALERA de
 * practica (openVocabLab) -> input primero, output despues.
 *
 * DRY total: voz (speakMono/speakSequence), mic (mic.js), coach visual palabra
 * por palabra (coachView de speaking.js), y la lista de palabras (vocabTeachList,
 * logica pura de core/vocab-lab.js).
 */
import { el, replaceKids } from "../ui/dom.js";
import { speakMono, speakSequence } from "../ui/speech.js";
import { cancelCloud } from "../ui/cloud-tts.js";
import { speechSupported, createDictation } from "../ui/mic.js";
import { coachView } from "./speaking.js";
import { ICONS } from "../ui/icons.js";
import { playCorrect } from "../ui/sound.js";
import { teacherFace } from "../ui/bymax-mascot.js";
import { robotName } from "../ui/robot.js";
import { vocabTeachList } from "../core/vocab-lab.js";
import { openVocabLab } from "./vocab-lab.js";
import { unitTts, unitMic } from "../data/languages.js";
import { makeResumeKey, saveProgress, loadProgress, clearProgress, resumeCard } from "../ui/resume.js";
import { buildContentTabs } from "../ui/content-tabs.js";
import { askBymax } from "../services/bymax-ai.js";
import { bymaxAiEnabled } from "../config/bymax.js";
import { stripMd, parseDeepenAnswer } from "../core/ai-deepen.js";

// Nombre en espanol del idioma META (L1) para la copia de la intro.
const L1_LANG = { en: "ingles", pt: "portugues", it: "italiano", fr: "frances", ja: "japones", es: "espanol" };
// Como pedirle la ampliacion de una palabra al profe IA: en el idioma META,
// 3 ejemplos ELABORADOS (no de juguete) + conjugacion SOLO si de verdad es un
// verbo. Nunca se inventa la conjugacion a mano para cientos de palabras --
// eso arriesgaria mostrar una forma irregular MAL (ej. "be" -> "beed"). La IA
// ya sabe conjugar bien; aqui solo se le pide el formato.
function deepenPrompt(term, translation, langName, isVerb) {
  return (
    `Actua como profesor de ${langName} para un hispanohablante. La palabra o frase de vocabulario es ` +
    `"${term}" (significado: "${translation}"). Responde EXACTAMENTE en este formato, sin texto extra antes ` +
    "ni despues, sin markdown ni asteriscos:\n\n" +
    "EJEMPLOS:\n" +
    `1. <frase natural y elaborada en ${langName} usando la palabra, en un contexto distinto a uno basico>\n` +
    "   = <traduccion al espanol>\n" +
    `2. <otra frase, en OTRO contexto/situacion>\n   = <traduccion>\n` +
    `3. <otra frase, en OTRO contexto mas>\n   = <traduccion>\n\n` +
    "NOTA GRAMATICAL:\n" +
    "<1-2 frases en espanol con algo UTIL y ESPECIFICO para usar bien esta palabra: su categoria " +
    "gramatical, una preposicion que la acompana, si es contable/incontable, un error comun de " +
    "hispanohablantes con ella, o su registro formal/informal. Nada generico.>\n" +
    (isVerb
      ? "\nCONJUGACION (esta palabra ES un verbo):\n" +
        "- Presente: <forma> -> <ejemplo corto>\n" +
        "- Pasado: <forma> -> <ejemplo corto>\n" +
        "- Participio: <forma> -> <ejemplo corto>\n"
      : "")
  );
}

/** Prompt para corregir el intento de frase PROPIA del alumno (produccion libre). */
function useItFeedbackPrompt(term, translation, langName, attempt) {
  return (
    `Eres profesor de ${langName} para un hispanohablante. El alumno debe usar la palabra/frase ` +
    `"${term}" (significado: "${translation}") en una frase propia. El alumno escribio:\n"${attempt}"\n\n` +
    "Evalua en ESPANOL, MAXIMO 3 lineas, sin markdown ni asteriscos:\n" +
    "- Si la uso bien: felicitalo en una frase breve y, solo si suena mejorable, sugiere UNA variante " +
    "mas natural.\n" +
    "- Si hay un error (gramatica, uso de la palabra, preposicion...): da la version corregida completa " +
    "y UNA frase breve explicando el porque, con carino, sin reganar.\n"
  );
}

/** Escenario gratis (sin IA) para que el alumno produzca su propia frase. */
function scenarioFor(unit, clean) {
  const topic = (unit.title || "").trim();
  return topic
    ? "Tu turno: escribe una frase sobre \u201c" + topic + "\u201d usando \u201c" + clean + "\u201d."
    : "Tu turno: escribe tu propia frase usando \u201c" + clean + "\u201d.";
}

/**
 * Dispara la ampliacion de la palabra (ejemplos + gramatica + conjugacion)
 * SOLA, sin esperar click: el pedido fue que el contenido ya este desplegado
 * como un libro, no escondido detras de un boton. Devuelve DOS cajas
 * (ejemplos / gramatica) que arrancan con un "Generando..." y se llenan
 * JUNTAS cuando responde la UNICA llamada a la IA que hace falta -- viven en
 * columnas distintas del layout de 3 columnas, pero comparten el mismo pedido
 * (no se duplica el costo de IA por separarlas visualmente).
 */
function buildDeepenBoxes(w, langLabel, level) {
  if (!bymaxAiEnabled) return { examplesBox: null, grammarBox: null };
  const isVerb = /^to\s+/i.test(w.term);

  const examplesBox = el("div", { class: "rounded-2xl bg-indigo-500/10 border border-indigo-400/30 p-5" },
    el("p", { class: "text-sm font-bold uppercase tracking-wide text-indigo-300 mb-2" }, "Ejemplos en contexto"),
    el("p", { class: "text-base text-slate-400 italic" }, "Generando ejemplos..."));

  const grammarBox = el("div", { class: "rounded-2xl bg-amber-500/10 border border-amber-400/30 p-5" },
    el("p", { class: "text-sm font-bold uppercase tracking-wide text-amber-300 mb-2 flex items-center gap-1.5" },
      el("span", { class: "w-4 h-4", html: ICONS.bulb }), "Nota gramatical"),
    el("p", { class: "text-base text-slate-400 italic" }, "Generando..."));

  (async () => {
    const { answer, error } = await askBymax({
      mode: "chat", topic: "vocabulario", level: level || "B1", role: "course",
      question: deepenPrompt(w.term, w.translation, langLabel, isVerb),
    });
    if (error || !answer) {
      replaceKids(examplesBox,
        el("p", { class: "text-sm font-bold uppercase tracking-wide text-indigo-300 mb-2" }, "Ejemplos en contexto"),
        el("p", { class: "text-base text-slate-400" }, error || "No pude generar el contenido ahora."));
      grammarBox.remove(); // una sola caja de error basta, no duplicarlo
      return;
    }
    const parsed = parseDeepenAnswer(answer);
    replaceKids(examplesBox,
      el("p", { class: "text-sm font-bold uppercase tracking-wide text-indigo-300 mb-2" }, "Ejemplos en contexto"),
      el("p", { class: "text-lg text-slate-100 whitespace-pre-wrap leading-relaxed text-left" },
        stripMd(parsed.examples) || "Sin ejemplos esta vez."));

    const grammarKids = [el("p", { class: "text-sm font-bold uppercase tracking-wide text-amber-300 mb-2 flex items-center gap-1.5" },
      el("span", { class: "w-4 h-4", html: ICONS.bulb }), "Nota gramatical")];
    grammarKids.push(el("p", { class: "text-lg text-slate-100 leading-relaxed text-left" },
      stripMd(parsed.grammar) || "Sin nota esta vez."));
    if (parsed.conjugation) grammarKids.push(
      el("p", { class: "text-sm font-bold uppercase tracking-wide text-violet-300 mt-4 mb-2" }, "Conjugaci\u00f3n"),
      el("p", { class: "text-lg text-slate-100 whitespace-pre-wrap leading-relaxed text-left" }, stripMd(parsed.conjugation)));
    replaceKids(grammarBox, ...grammarKids);
  })();

  return { examplesBox, grammarBox };
}

/**
 * Bloque "Tu turno": el alumno PRODUCE su PROPIA frase con la palabra (no solo
 * lee ejemplos ni imita) y el profe IA la corrige. Hasta este punto de la clase
 * todo es INPUT (escuchar/leer) o IMITACION (repetir); este es el primer
 * momento de produccion libre con feedback real -- la parte que mas fija el
 * vocabulario a largo plazo (pushed output). Siempre visible y gratis de
 * intentar: la IA solo se usa cuando el alumno pide que revisen SU frase.
 */
function buildUseItBlock(w, unit, langLabel, level) {
  if (!bymaxAiEnabled) return null;
  const input = el("textarea", {
    rows: "2", maxlength: "200",
    placeholder: "Escribe tu frase aqu\u00ed...",
    class: "w-full rounded-xl bg-slate-950/40 border border-fuchsia-400/30 px-4 py-3 text-slate-100 text-lg " +
      "focus:outline focus:outline-2 focus:outline-fuchsia-400 resize-none",
  });
  const status = el("p", { class: "mt-2 text-sm text-slate-400 min-h-[1.25rem]" }, "");
  const out = el("div", { class: "mt-2" });

  const checkBtn = el("button", {
    type: "button",
    class: "mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-fuchsia-400/40 " +
      "bg-fuchsia-500/20 text-fuchsia-200 font-bold text-lg hover:bg-fuchsia-500/30 " +
      "focus:outline focus:outline-2 focus:outline-fuchsia-400 disabled:opacity-50",
    onclick: async () => {
      const attempt = input.value.trim();
      if (!attempt) { status.textContent = "Escribe algo primero."; return; }
      checkBtn.disabled = true;
      status.textContent = "Revisando tu frase...";
      out.replaceChildren();
      const { answer, error } = await askBymax({
        mode: "chat", topic: "vocabulario", level: level || "B1", role: "course",
        question: useItFeedbackPrompt(w.clean, w.translation, langLabel, attempt),
      });
      checkBtn.disabled = false;
      if (error || !answer) { status.textContent = error || "No pude revisarla ahora."; return; }
      status.textContent = "";
      out.replaceChildren(el("div", {
        class: "rounded-2xl bg-emerald-500/15 border border-emerald-400/30 p-4 text-lg text-slate-100 " +
          "whitespace-pre-wrap leading-relaxed text-left",
      }, stripMd(answer)));
    },
  }, el("span", { class: "w-5 h-5", html: ICONS.check }), "Revisar mi frase");

  return el("div", { class: "rounded-2xl bg-fuchsia-500/10 border border-fuchsia-400/30 p-5" },
    el("p", { class: "text-lg font-bold text-fuchsia-200 flex items-center gap-2" },
      el("span", { class: "w-5 h-5", html: ICONS.chat }), "\u00bfC\u00f3mo la usar\u00edas t\u00fa?"),
    el("p", { class: "mt-1 text-base text-slate-300" }, scenarioFor(unit, w.clean)),
    el("div", { class: "mt-3" }, input),
    checkBtn, status, out);
}
// Saludo HABLADO por Bymax en el idioma META (inmersion desde el segundo uno).
const GREETING = {
  en: (n, c) => `Hi! I'm ${n}. Let's learn ${c} new words together. Listen and repeat after me!`,
  pt: (n, c) => `Oi! Eu sou ${n}. Vamos aprender ${c} palavras novas juntos. Ouca e repita!`,
  it: (n, c) => `Ciao! Sono ${n}. Impariamo ${c} parole nuove insieme. Ascolta e ripeti!`,
  fr: (n, c) => `Salut! Je suis ${n}. Apprenons ${c} nouveaux mots ensemble. Ecoute et repete!`,
};

/**
 * Abre la clase de presentacion de vocabulario de una unidad.
 * @param {object} unit - { title, level, vocab }
 * @param {object} [opts] - { userId, progressId, onComplete } (se PASAN tal cual
 *   a openVocabLab al terminar la clase, que es quien marca la leccion completa).
 */
export function openVocabClass(unit, opts = {}) {
  const words = vocabTeachList(unit);
  const name = robotName();
  const tts = unitTts(unit);   // voz del idioma META (en | pt | it...)
  const mic = unitMic(unit);   // reconocimiento de voz en el idioma META
  const langLabel = L1_LANG[tts] || "el idioma";
  const supported = speechSupported();
  const rkey = makeResumeKey(opts.userId, unit.id, "vocabclass");
  let idx = 0;               // -1 = intro; 0..n-1 = palabras
  let cancelSay = null;      // corta la voz en curso
  let dictation = null;
  let listening = false;

  const stopVoice = () => { try { cancelSay?.(); } catch { /* nada */ } cancelCloud(); };
  const close = () => { dictation?.abort(); stopVoice(); overlay.remove(); };

  function say(text, rate) {
    stopVoice();
    cancelSay = speakMono(text, tts, { rate });
  }

  // Al terminar la clase: cierra este POP y abre la ESCALERA de practica.
  function goPractice() {
    close();
    openVocabLab(unit, opts);
  }

  const progress = el("div", { class: "w-full bg-black/25 rounded-full h-2 mt-3" },
    el("div", { class: "bg-gradient-to-r from-pink-400 to-rose-500 h-2 rounded-full transition-all", style: "width:0%" }));
  const setProgress = (n) => { progress.firstChild.style.width = Math.round(n * 100) + "%"; };

  const stage = el("div", { class: "mt-4 flex-1 min-h-0 overflow-y-auto pr-1" });

  const btn = (label, icon, cls, onclick) => el("button", {
    type: "button", onclick,
    class: "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition " +
      "focus:outline focus:outline-2 focus:outline-pink-300 " + cls,
  }, el("span", { class: "w-5 h-5", html: icon }), label);

  // --- INTRO: Bymax se presenta -----------------------------------------
  function renderIntro() {
    setProgress(0);
    const greeting = (GREETING[tts] || GREETING.en)(name, words.length);
    stage.replaceChildren(
      el("div", { class: "text-center py-4" },
      el("div", { class: "w-28 mx-auto" }, teacherFace("lg")),
      el("h3", { class: "text-xl font-bold text-slate-100 mt-3" }, "\u00a1Hola! Soy " + name),
      el("p", { class: "mt-2 text-slate-300 max-w-sm mx-auto" },
        "Hoy te ense\u00f1o " + words.length + " palabras nuevas de \u201c" + (unit.title || "") + "\u201d. " +
        "Yo las digo en " + langLabel + ", t\u00fa las repites. \u00a1As\u00ed se te pegan de verdad!"),
      el("div", { class: "mt-5 flex flex-wrap gap-2 justify-center" },
        btn("Escuchar a " + name, ICONS.sound,
          "border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10", () => say(greeting, 0.95)),
        btn("Empezar la clase →", ICONS.play,
          "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:brightness-110",
          () => { idx = 0; renderWord(); }))));
    setTimeout(() => say(greeting, 0.95), 350);
  }

  // --- UNA PALABRA: escuchar + traduccion + ejemplo + repetir -----------
  function renderWord() {
    if (idx >= words.length) return renderDone();
    saveProgress(rkey, { idx }); // autosave: si sales, retomas en esta palabra
    setProgress((idx) / words.length);
    const w = words[idx];
    let repeated = false;

    const heardBox = el("p", { class: "mt-2 text-sm text-slate-300 min-h-[1.25rem] text-center" }, "");
    const fb = el("div", { class: "mt-3" });

    const nextBtn = el("button", {
      type: "button",
      class: "mt-6 w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-lg " +
        "px-5 py-4 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-pink-400",
      onclick: () => { stopVoice(); idx++; renderWord(); },
    }, idx === words.length - 1 ? "Terminar clase \u2192" : "Siguiente palabra \u2192");

    // --- Repetir con microfono (una toma) --------------------------------
    function repeatMic() {
      if (listening) { dictation?.stop(); return; }
      heardBox.textContent = "";
      say(w.clean); // oye el modelo antes de repetir
      dictation = createDictation({
        lang: mic,
        onStart: () => { listening = true; repeatBtn.classList.add("animate-pulse"); repeatBtn.lastChild.textContent = "Escuchando... (toca para parar)"; },
        onInterim: (t) => { heardBox.textContent = "\u201c" + t + "\u201d"; },
        onEnd: (finalText) => {
          listening = false; repeatBtn.classList.remove("animate-pulse"); repeatBtn.lastChild.textContent = "Repetir palabra";
          if (finalText) {
            heardBox.textContent = "T\u00fa dijiste: \u201c" + finalText + "\u201d";
            const { node } = coachView(w.clean, finalText, mic);
            fb.replaceChildren(node);
          } else {
            heardBox.textContent = "No te escuch\u00e9. Toca y repite la palabra.";
          }
          repeated = true;
        },
        onError: () => {
          listening = false; repeatBtn.classList.remove("animate-pulse"); repeatBtn.lastChild.textContent = "Repetir palabra";
          heardBox.textContent = "No pude usar el micr\u00f3fono (\u00bfpermiso denegado?).";
        },
      });
      setTimeout(() => dictation?.start(), 800);
    }

    const repeatBtn = supported
      ? btn("Repetir palabra", ICONS.mic,
          "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:brightness-110", repeatMic)
      : btn("La dije en voz alta", ICONS.check,
          "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:brightness-110", () => {
            playCorrect();
            fb.replaceChildren(el("div", { class: "rounded-xl px-4 py-3 text-sm bg-emerald-500/15 border border-emerald-500/40 text-emerald-200" },
              el("p", { class: "font-semibold" }, "\u00a1Bien! Repetir en voz alta fija la pronunciaci\u00f3n.")));
            repeated = true;
          });

    const { examplesBox, grammarBox } = buildDeepenBoxes(w, langLabel, unit.level);
    const useItBlock = buildUseItBlock(w, unit, langLabel, unit.level);
    const grammarTabContent = (grammarBox || useItBlock)
      ? el("div", { class: "flex flex-col gap-3" }, grammarBox, useItBlock)
      : null;

    replaceKids(stage,
      el("p", { class: "text-sm font-bold uppercase tracking-wide text-slate-500" },
        "Palabra " + (idx + 1) + " de " + words.length),

      // TITULO: franja horizontal a todo lo ancho, como la portada de un
      // capitulo de libro -- NO una tarjeta cuadrada que compite por espacio
      // con el contenido de abajo.
      el("div", { class: "mt-2 relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 " +
        "to-fuchsia-600 px-6 sm:px-10 py-5 sm:py-6 shadow-lg shadow-rose-950/40 flex flex-wrap " +
        "items-center justify-center sm:justify-between gap-4 text-center sm:text-left" },
        el("div", { class: "absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/15 blur-2xl", "aria-hidden": "true" }),
        el("div", { class: "absolute -bottom-12 -left-8 w-32 h-32 rounded-full bg-white/10 blur-2xl", "aria-hidden": "true" }),
        el("div", { class: "relative" },
          el("p", { class: "text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow" }, w.clean),
          el("p", { class: "mt-1 text-xl sm:text-2xl text-white/95 font-semibold" }, w.translation)),
        el("div", { class: "relative flex flex-wrap gap-2 justify-center" },
          btn("Escuchar", ICONS.sound,
            "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm text-lg", () => say(w.clean)),
          btn("Lento", ICONS.clock,
            "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm text-lg", () => say(w.clean, 0.55)))),

      // CONTENIDO por PESTAÑAS: antes eran 3 columnas SIEMPRE desplegadas,
      // que en celular se apilaban una debajo de otra y obligaban a scrollear
      // muchisimo para llegar al boton de "Siguiente". Pedido explicito del
      // alumno: que se vea IGUAL en PC y celular, sin depender del ancho de
      // pantalla. Con pestañas solo se ve una seccion a la vez (Atras/
      // Continuar o tocando la pestaña), en CUALQUIER dispositivo.
      buildContentTabs([
        {
          label: "Aprende",
          content: el("div", { class: "flex flex-col gap-3" },
            w.example ? el("div", { class: "rounded-2xl bg-sky-500/10 border border-sky-400/30 p-5" },
              el("p", { class: "text-sm font-bold uppercase tracking-wide text-sky-300 mb-1" }, "Ejemplo"),
              el("p", { class: "text-xl text-slate-100 italic leading-relaxed" }, "\u201c" + w.example + "\u201d"),
              el("div", { class: "mt-2" },
                btn("Escuchar ejemplo", ICONS.sound,
                  "text-base border border-sky-400/30 bg-sky-500/10 text-sky-200 hover:bg-sky-500/20", () => say(w.example, 0.9)))) : null,
            el("div", { class: "rounded-2xl bg-emerald-500/10 border border-emerald-400/30 p-3" },
              el("div", { class: "flex flex-wrap items-center justify-center gap-2" },
                el("p", { class: "text-sm text-slate-300" }, "Repite como " + name + ":"),
                repeatBtn),
              supported ? null : el("p", { class: "mt-1.5 text-xs text-amber-300 text-center" },
                "Tu navegador no tiene micr\u00f3fono. Usa Chrome (PC/Android) para que califique tu pronunciaci\u00f3n."),
              heardBox, fb)),
        },
        { label: "Ejemplos IA", content: examplesBox },
        { label: "Gram\u00e1tica", content: grammarTabContent },
      ]),

      nextBtn);

    // Al mostrar la palabra, la dice sola (input inmediato).
    setTimeout(() => say(w.clean), 300);
  }

  // --- FIN de la clase -> a practicar -----------------------------------
  function renderDone() {
    clearProgress(rkey);
    setProgress(1);
    stage.replaceChildren(el("div", { class: "text-center py-6" },
      el("div", { class: "w-24 mx-auto" }, teacherFace("lg")),
      el("h3", { class: "text-xl font-bold text-slate-100 mt-2" }, "\u00a1Terminamos la clase!"),
      el("p", { class: "mt-2 text-slate-300 max-w-sm mx-auto" },
        "Ya escuchaste y repetiste las " + words.length + " palabras. " +
        "Ahora vamos a FIJARLAS con la escalera de pr\u00e1ctica."),
      el("button", {
        class: "mt-6 w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-pink-400",
        onclick: goPractice,
      }, "Practicar lo aprendido \u2192"),
      el("button", {
        class: "mt-3 text-sm text-slate-400 hover:text-slate-200 underline",
        onclick: () => { idx = -1; renderIntro(); },
      }, "Repasar la clase otra vez")));
  }

  // PANTALLA COMPLETA (casi): esto ya no es un "pop" flotante pequeno -- es la
  // pantalla principal mientras dura la clase, igual que el modo leccion. El
  // contenido se centra en una columna legible (max-w-3xl) pero el fondo y el
  // encabezado ocupan TODO el viewport, sin bordes redondeados ni backdrop de
  // "ventana sobre la app". Header+progreso quedan fijos arriba; solo la
  // palabra hace scroll (stage ya trae su propio overflow-y-auto).
  // OJO ancho: con el contenido ahora en PESTAÑAS (una sola seccion visible a
  // la vez) ya no hace falta el max-w-7xl que se usaba para la rejilla de 3
  // columnas -- una columna angosta se lee igual de bien en PC y en celular,
  // que es justo el punto: MISMO ancho de lectura en cualquier dispositivo.
  const card = el("div", {
    class: "robot-pop w-full h-[100dvh] bg-slate-900 flex flex-col min-h-0",
    role: "dialog", "aria-label": "Clase de vocabulario con " + name, "aria-modal": "true",
  },
    el("div", { class: "w-full max-w-3xl mx-auto flex-1 min-h-0 flex flex-col px-4 sm:px-8 py-4 sm:py-6" },
      el("div", { class: "flex items-center gap-3 shrink-0" },
        el("div", { class: "w-12 shrink-0" }, teacherFace("sm")),
        el("div", { class: "flex-1" },
          el("p", { class: "font-bold text-pink-300" }, "Clase de vocabulario \u00b7 " + (unit.title || "")),
          el("p", { class: "text-xs text-slate-400" }, "Escucha y repite \u00b7 nivel " + (unit.level || ""))),
        el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
      progress, stage));

  const overlay = el("div", { class: "fixed inset-0 z-50 bg-slate-900" }, card);

  document.body.append(overlay);

  if (!words.length) {
    stage.replaceChildren(el("p", { class: "text-slate-400 py-6 text-center" }, "Esta unidad a\u00fan no tiene vocabulario para ense\u00f1ar."));
  } else {
    const saved = loadProgress(rkey);
    if (saved && saved.idx > 0 && saved.idx < words.length) {
      stage.replaceChildren(resumeCard({
        step: saved.idx + 1, total: words.length, accent: "pink",
        onResume: () => { idx = saved.idx; renderWord(); },
        onRestart: () => { clearProgress(rkey); idx = -1; renderIntro(); },
      }));
    } else {
      renderIntro();
    }
  }
}
