/**
 * features/bymax-session.js — Motor compartido de sesiones con Bymax (chat IA).
 *
 * DRY: tanto la CONVERSACION libre como la CLASE 1 a 1 son el mismo modal (mascota
 * viva + microfono + voz bilingue + memoria de turnos). Lo unico que cambia es el
 * `mode` que viaja al Worker (elige el prompt) y los textos del encabezado. Cada
 * feature (conversation.js, class-tutor.js) solo llama a openBymaxSession(cfg).
 *
 * Sin dependencias raras: fetch nativo. La key vive en el Worker, no aqui.
 */
import { el } from "../ui/dom.js";
import { robotName } from "../ui/robot.js";
import { teacherVoice } from "../ui/robot-prefs.js";
import { setBymaxTalking } from "../ui/bymax-mascot.js";
import { mountTeacher } from "../ui/teacher-presenter.js";
import { bymaxEmote } from "../ui/avatars.js";
import { speakSmart, robotChirp } from "../ui/speech.js";
import { cancelCloud } from "../ui/cloud-tts.js";
import { speechSupported, createDictation } from "../ui/mic.js";
import { ICONS } from "../ui/icons.js";
import { micCode, languageName } from "../data/languages.js";
import { openVocabHelp } from "./vocab-help.js";
import { BYMAX_WORKER_URL, bymaxAiEnabled, multilingualEnabled } from "../config/bymax.js";
import { buildNotebookPrompt } from "../core/notebook.js";
import { parseFeedback } from "../core/feedback.js";
import { addToNotebook } from "../ui/notebook-store.js";
import { sessionEnd } from "../ui/session-end.js";
import { difficultyPrompt, clampLevel, levelLabel, DEFAULT_LEVEL, makeSkillKey, getSkillLevel, setSkillLevel } from "../core/difficulty.js";
import { sessionTheme } from "../ui/session-theme.js";
import { getGrammarSidebarWidth, setGrammarSidebarWidth, GRAMMAR_SIDEBAR_LIMITS } from "../ui/prefs.js";

/** Tope de `topic` que acepta el Worker (lo corta a 700). */
const TOPIC_MAX = 700;

/** Burbuja de mensaje (alumno o Bymax). `who="sys"` = aviso centrado de la app.
 * `theme` decide el color (ver ui/session-theme.js); default = look de siempre. */
function bubble(text, who, theme) {
  if (who === "sys") {
    return el("div", { class: "flex justify-center" },
      el("div", {
        class: "text-[11px] uppercase tracking-wider font-semibold text-violet-300 " +
          "bg-violet-500/10 border border-violet-500/30 rounded-full px-3 py-1",
      }, text));
  }
  const mine = who === "me";
  return el("div", { class: "flex " + (mine ? "justify-end" : "justify-start") },
    el("div", {
      class: "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line " +
        (mine ? theme.bubbleMe : theme.bubbleBot),
    }, text));
}

/**
 * Abre una sesion con Bymax (conversacion o clase).
 * @param {object} cfg
 * @param {"conversation"|"class"} cfg.mode - modo que elige el prompt del Worker
 * @param {string} cfg.topic - tema (titulo de la unidad)
 * @param {string} cfg.level - nivel MCER (A1..C2)
 * @param {string} cfg.title - titulo del encabezado
 * @param {string} cfg.subtitle - subtitulo del encabezado
 * @param {string} [cfg.placeholder] - placeholder del input
 * @param {string} [cfg.ariaLabel] - etiqueta del dialogo
 * @param {object[]} [cfg.vocab] - glosario de la unidad. Si viene, aparece el POP
 *   "Palabras" con el lexico ya presentado (termino + traduccion + audio).
 * @param {string} [cfg.theme] - "grammar" para el look con banner de degradado
 *   (ver ui/session-theme.js). Sin esto, el look de siempre (DEFAULT).
 * @param {HTMLElement} [cfg.sidebar] - si viene, la sesion se abre a PANTALLA
 *   COMPLETA con este panel a la derecha (chat a la izquierda) en vez del
 *   modal centrado de siempre. Pensado para features/grammar-sidebar.js.
 */
export function openBymaxSession(cfg) {
  const { mode = "conversation", topic = "general", level = "B1" } = cfg || {};
  // Tema visual (ver ui/session-theme.js). Sin cfg.theme -> look de siempre,
  // identico en Conversacion/Entrevistas/las demas competencias. Solo cambia
  // cuando quien abre la sesion (ej. features/skill-class.js para Gramatica)
  // lo pide explicitamente.
  const theme = sessionTheme(cfg?.theme);
  // Listening (videollamada): Bymax HABLA pero NO se muestra su texto (ni tips),
  // para entrenar el oido. El alumno responde por voz o escribiendo.
  const hideBotText = cfg?.hideBotText === true;
  // onFinish: callback para MARCAR la clase como completada (progreso). El boton
  // "Terminar y guardar" arranca DESHABILITADO y solo se habilita cuando el alumno
  // completa la practica (finishGoal respuestas reales). NO se auto-completa: un
  // solo audio no debe cerrar la clase.
  const onFinish = typeof cfg?.onFinish === "function" ? cfg.onFinish : null;
  const finishGoal = Math.max(1, cfg?.finishGoal || 4);
  let finished = false;
  function finish() { if (finished) return; finished = true; try { onFinish && onFinish(); } catch (e) { console.error(e); } }
  // Marcadores internos: son ordenes para la IA, no respuestas del alumno.
  const MARKERS = ["[BEGIN]", "[MORE_PRACTICE]"];
  function userTurnCount() {
    return history.filter((h) => h.role === "user" && !MARKERS.includes(h.text)).length;
  }
  // Turnos que ya habia al empezar la ronda ACTUAL. Cada ronda extra vuelve a
  // exigir `finishGoal` respuestas, en vez de nacer ya completada.
  let roundBase = 0;
  function roundTurns() { return Math.max(0, userTurnCount() - roundBase); }
  function refreshFinish() {
    if (!finishBtn) return;
    const left = finishGoal - roundTurns();
    const ready = left <= 0;
    finishBtn.disabled = !ready;
    finishBtn.textContent = ready
      ? "Terminar y guardar \u2713"
      : "Completa la practica (faltan " + left + ")";
  }

  // --- RONDAS EXTRA: al terminar, el alumno decide si sigue y con que nivel ---
  // askMore=true (lo activa quien abre la sesion, ej. la clase de competencia).
  const askMore = cfg?.askMore === true;
  // La dificultad es POR COMPETENCIA: el alumno puede ir en 7 de Reading y en 3
  // de Listening. Se recuerda por (usuario, idioma, competencia) y se reusa la
  // proxima vez que entre a ESA competencia.
  const skillKey = (askMore && cfg?.skill)
    ? makeSkillKey(cfg.userId, cfg?.targetLang || "en", cfg.skill)
    : "";
  // 0 = sin escalon elegido -> NO se inyecta nada al prompt. Las sesiones que no
  // usan dificultad (conversacion, cuento, entrevista) se quedan igual que antes.
  let practiceLevel = 0;
  if (askMore) {
    const base = cfg?.level10 ? clampLevel(cfg.level10) : DEFAULT_LEVEL;
    // Si ya practico esta competencia antes, retoma SU nivel; si no, el sugerido.
    practiceLevel = skillKey ? getSkillLevel(skillKey, base) : base;
  } else if (cfg?.level10) {
    practiceLevel = clampLevel(cfg.level10);
  }
  let rounds = 0;

  /**
   * Cierre de la clase: guarda el progreso y, si la sesion lo pidio, ofrece
   * otra ronda con dificultad a elegir. Si el alumno acepta, NO se cierra el
   * modal: se le pide a la profe una tanda nueva con esa intensidad.
   */
  async function endClass() {
    if (finishBtn) finishBtn.disabled = true;
    finish();                    // marca la leccion completada (una sola vez)
    stopAudio();
    if (!askMore) { close(); return; }

    rounds++;
    const { again, level } = await sessionEnd({
      title: rounds === 1 ? "\u00a1Clase completada!" : "\u00a1Ronda " + rounds + " completada!",
      subtitle: (cfg?.endSubtitle || topic) + " \u00b7 " + roundTurns() + " respuestas",
      level: practiceLevel || DEFAULT_LEVEL,
      skill: cfg?.skill,
    });
    // Recuerda el nivel de ESTA competencia aunque el alumno se vaya: la
    // proxima vez que entre, arranca donde lo dejo.
    practiceLevel = skillKey ? setSkillLevel(skillKey, level) : clampLevel(level);
    if (!again) { close(); return; }

    roundBase = userTurnCount();  // la ronda nueva arranca su propio contador
    refreshFinish();
    push("\u2014 Nueva ronda \u00b7 dificultad " + practiceLevel + " de 10 (" +
      levelLabel(practiceLevel) + ") \u2014", "sys");
    send("[MORE_PRACTICE]", false);
  }
  const name = cfg?.teacher || robotName();
  const ttsVoice = teacherVoice(cfg?.role || "course"); // voz distinta por profe
  const targetLang = cfg?.targetLang || "en";      // idioma META de la sesion
  const micLang = micCode(targetLang);             // STT en el idioma META
  const langLabel = languageName(targetLang).toLowerCase();
  const title = cfg?.title || (name + " \u00b7 " + topic);
  const subtitle = cfg?.subtitle || ("Practica en " + langLabel + " \u00b7 nivel " + level);
  const placeholder = cfg?.placeholder ||
    (bymaxAiEnabled ? "Escribe tu respuesta (o pide ayuda)..." : name + " no esta disponible aun");

  const close = () => { generateNotebook(); dictation?.abort(); stopAudio(); teacher?.dispose(); overlay.remove(); };
  // Corta cualquier voz en curso (nube + navegador) al cerrar.
  function stopAudio() {
    cancelCloud();
    teacher ? teacher.setTalking(false) : setBymaxTalking(false);
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  }
  robotChirp();

  // El profe (robot Bymax o humano 3D) "habla" un rato proporcional al texto.
  let teacher = null; // se asigna al construir la tarjeta (mountTeacher)
  let talkTimer = null;
  function talkFor(text) {
    clearTimeout(talkTimer);
    teacher ? teacher.setTalking(true) : setBymaxTalking(true);
    const ms = Math.min(12000, Math.max(1600, (text ? text.length : 0) * 55));
    talkTimer = setTimeout(() => (teacher ? teacher.setTalking(false) : setBymaxTalking(false)), ms);
  }

  // MEMORIA: turnos previos { role:"user"|"model", text }. Cap 10 (5 intercambios).
  const history = [];
  // TRANSCRIPCION COMPLETA (para el cuaderno de errores): guarda TODOS los turnos
  // reales, no solo la ventana corta de `history`.
  const allTurns = [];
  const MAX_TURNS = 10;
  let busy = false;

  // --- CUADERNO DE ERRORES: al cerrar, la profe evalua la charla y guarda los
  // errores + vocabulario que le falto al alumno, por unidad (acumulativo).
  let notebookDone = false;
  async function generateNotebook() {
    if (notebookDone) return;
    if (!cfg?.unitId || !cfg?.userId || !bymaxAiEnabled) return;
    const userTurns = allTurns.filter((t) => t.role === "user" && t.text !== "[BEGIN]");
    if (userTurns.length < 2) return; // muy corta: no vale la pena molestar al Worker
    notebookDone = true;
    try {
      const res = await fetch(BYMAX_WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode, topic, level, targetLang,
          teacher: name, // la IA debe firmar como Megan/Mathias/Susan, no como el motor
          immersive: false, // queremos la evaluacion en espanol, sin protocolo TIP
          question: buildNotebookPrompt(targetLang),
          history: allTurns.slice(-24),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (data && data.answer) {
        const parsed = parseFeedback(data.answer);
        addToNotebook(cfg.userId, {
          unitId: cfg.unitId, title: cfg.unitTitle || topic, level, lang: targetLang,
          skill: cfg.skill || "", // competencia de esta sesion -> pestana del cuaderno
        }, parsed);
      }
    } catch (e) { console.warn("[Bymax] no se pudo generar el cuaderno:", e); }
  }

  const log = el("div", { class: "flex flex-col gap-2.5 px-1 py-2" });

  const input = el("input", {
    type: "text", maxlength: "800", autocomplete: "off",
    placeholder,
    disabled: bymaxAiEnabled ? undefined : "true",
    class: "flex-1 rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-slate-100 " +
      "focus:outline focus:outline-2 focus:outline-emerald-500 disabled:opacity-50",
  });

  const sendBtn = el("button", {
    type: "button",
    disabled: bymaxAiEnabled ? undefined : "true",
    class: "shrink-0 grid place-items-center w-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 " +
      "text-white text-lg hover:brightness-110 focus:outline focus:outline-2 focus:outline-emerald-400 disabled:opacity-50",
    "aria-label": "Enviar",
  }, "\u27A4");

  function push(text, who) {
    log.append(bubble(text, who, theme));
    log.scrollTop = log.scrollHeight;
  }

  /**
   * Separa la respuesta en lo que se DICE (voz, una sola voz fluida) y lo que
   * se MUESTRA como ayuda/correccion (lineas que empiezan con "TIP:"). Asi el
   * audio nunca mezcla idiomas -> fluidez estilo Lerna.
   */
  function splitSayTip(text) {
    const say = [];
    const tips = [];
    for (const line of String(text).split(/\n/)) {
      const m = line.match(/^\s*(?:TIP|AYUDA|CORRECCION|CORRECCI\u00D3N)\s*:\s*(.*)$/i);
      if (m) { if (m[1].trim()) tips.push(m[1].trim()); }
      else if (line.trim()) say.push(line.trim());
    }
    return { say: say.join("\n"), tips };
  }

  /** Muestra la respuesta del bot con boton de audio (voz de una sola voz). */
  function pushBot(text) {
    const { say, tips } = splitSayTip(text);
    const speakText = say || text;

    // MODO LISTENING (videollamada): sin texto, solo indicador de audio + repetir.
    if (hideBotText) {
      const row = el("div", { class: "flex justify-start" },
        el("button", {
          type: "button",
          class: "inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 bg-slate-800/90 border " +
            "border-slate-700 text-emerald-200 text-sm hover:bg-slate-700 focus:outline focus:outline-2 focus:outline-emerald-400",
          "aria-label": "Escuchar de nuevo a " + name,
          onclick: () => speakSmart(speakText, { targetLang, ttsVoice }),
        }, el("span", { class: "w-5 h-5 shrink-0", html: ICONS.sound }),
          name + " esta hablando... (toca para repetir)"));
      log.append(row);
      log.scrollTop = log.scrollHeight;
      speakSmart(speakText, { targetLang, ttsVoice });
      bymaxEmote("happy");
      talkFor(speakText);
      return;
    }

    const row = el("div", { class: "flex items-start gap-2 justify-start" },
      bubble(say || text, "bot", theme),
      el("button", {
        type: "button",
        class: "shrink-0 mt-1 inline-flex items-center justify-center w-8 h-8 rounded-full text-emerald-300 hover:bg-emerald-500/20",
        "aria-label": "Escuchar respuesta", title: "Escuchar",
        onclick: () => speakSmart(speakText, { targetLang, ttsVoice }), html: ICONS.sound,
      }));
    log.append(row);
    // Correcciones/ayuda: TEXTO abajo (NO se hablan -> no rompen la fluidez).
    for (const tip of tips) {
      log.append(el("div", { class: "flex justify-start" },
        el("div", { class: "max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed flex items-start gap-2 " +
          theme.tipBox },
          el("span", { class: "shrink-0 font-black text-[10px] tracking-widest mt-0.5" }, "TIP"),
          el("span", {}, tip))));
    }
    log.scrollTop = log.scrollHeight;
    // speakSmart: una sola voz fluida (multilingue Azure si esta activa, o mono).
    speakSmart(speakText, { targetLang, ttsVoice });
    // La mascota reacciona: brinco corto de alegria + boca en movimiento.
    bymaxEmote("happy");
    talkFor(speakText);
  }

  /**
   * Envia un turno al Worker.
   * @param {string} q - texto del alumno ("[BEGIN]" para arrancar)
   * @param {boolean} show - si se pinta la burbuja del alumno
   */
  async function send(q, show) {
    if (!q || busy) return;
    if (show) push(q, "me");
    busy = true;
    sendBtn.disabled = true;
    const thinking = bubble(name + " is thinking...", "bot", theme);
    log.append(thinking);
    log.scrollTop = log.scrollHeight;
    bymaxEmote("think"); // la mascota se pone pensativa mientras carga

    // SOLO el fetch decide si hubo error de RED. Todo lo demas (pintar, hablar)
    // va aparte para NO disfrazar un bug de UI/voz como "sin internet".
    let data = null;
    let netError = null;
    // La dificultad elegida viaja DENTRO del topic: asi no hace falta redeploy
    // del Worker para que la profe ajuste la intensidad. OJO: el Worker corta
    // el topic a 700 chars, asi que le RESERVAMOS sitio a la dificultad y
    // recortamos el tema base -> la instruccion nunca se pierde en el tijeretazo.
    let topicNow = topic;
    if (practiceLevel) {
      const diff = difficultyPrompt(practiceLevel, cfg?.skill);
      topicNow = topic.slice(0, Math.max(0, TOPIC_MAX - diff.length - 1)) + "\n" + diff;
    }
    // [MORE_PRACTICE] no es texto del alumno: es la orden de abrir otra tanda.
    const question = q === "[MORE_PRACTICE]"
      ? "[MORE_PRACTICE] El alumno ya termino la clase y PIDIO SEGUIR PRACTICANDO " +
        "con dificultad " + practiceLevel + " de 10. No vuelvas a saludar ni repitas " +
        "la teoria: da directamente un ejercicio nuevo del mismo tema, con la " +
        "intensidad indicada, y pide UNA sola cosa concreta."
      : q;
    try {
      const res = await fetch(BYMAX_WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode, topic: topicNow, level,
          targetLang: cfg?.targetLang || "en", // idioma META (en | pt...)
          teacher: name, // quien habla: Megan (clases), Mathias (speaking), Susan...
          immersive: !multilingualEnabled(), // inmersion salvo que Azure este activo
          question, history: history.slice(-MAX_TURNS),
        }),
      });
      data = await res.json().catch(() => ({}));
      if (!res.ok && data) data._status = res.status;
    } catch (err) {
      netError = err;
      console.error("[Bymax] fallo de red al contactar el Worker:", err);
    }
    thinking.remove();

    if (netError) {
      bymaxEmote("sad");
      push("\u26A0\uFE0F No pude conectar con " + name + ". Revisa tu conexion o " +
        "intenta en un momento. (Detalle en consola F12).", "bot");
    } else if (!data || !data.answer) {
      bymaxEmote("sad");
      const why = [data && data.error, data && data.detail, data && data._status]
        .filter(Boolean).join(" | ");
      push(why ? ("\u26A0\uFE0F " + why) : "Ups, no pude responder ahora. Intenta de nuevo.", "bot");
    } else {
      try { pushBot(data.answer); }
      catch (e) { console.error("[Bymax] error al pintar/hablar la respuesta:", e); push(data.answer, "bot"); }
      history.push({ role: "user", text: q }, { role: "model", text: data.answer });
      allTurns.push({ role: "user", text: q }, { role: "model", text: data.answer });
      if (history.length > MAX_TURNS) history.splice(0, history.length - MAX_TURNS);
      // Habilita "Terminar y guardar" solo cuando se completa la practica.
      refreshFinish();
    }
    busy = false;
    sendBtn.disabled = false;
    input.focus();
  }

  const ask = () => {
    const q = input.value.trim();
    if (!q) return;
    input.value = "";
    send(q, true);
  };
  sendBtn.onclick = ask;
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") ask(); });

  // --- MICROFONO (speech-to-text): habla en ingles y se transcribe -----------
  const MIC_IDLE = "shrink-0 grid place-items-center w-12 rounded-xl bg-slate-800 border border-slate-700 " +
    "text-emerald-300 hover:bg-slate-700 focus:outline focus:outline-2 focus:outline-emerald-400 disabled:opacity-50";
  const MIC_LIVE = "shrink-0 grid place-items-center w-12 rounded-xl bg-red-500 text-white " +
    "animate-pulse focus:outline focus:outline-2 focus:outline-red-300";
  let listening = false;
  let dictation = null;
  const micBtn = el("button", {
    type: "button",
    disabled: bymaxAiEnabled ? undefined : "true",
    class: MIC_IDLE, "aria-label": "Hablar (microfono)", title: "Hablar", html: ICONS.mic,
  });

  function setMic(on) {
    listening = on;
    micBtn.className = on ? MIC_LIVE : MIC_IDLE;
    micBtn.setAttribute("aria-label", on ? "Detener microfono" : "Hablar (microfono)");
    micBtn.innerHTML = on ? ICONS.micOff : ICONS.mic;
    input.placeholder = on ? ("Escuchando... habla en " + langLabel) : placeholder;
  }

  function startMic() {
    if (busy) return;
    stopAudio(); // que el microfono NO capture la voz de Bymax
    if (!dictation) {
      dictation = createDictation({
        lang: micLang,
        onStart: () => setMic(true),
        onInterim: (t) => { input.value = t; },
        onFinal: (t) => { input.value = t; },
        onEnd: (finalText) => {
          setMic(false);
          const q = (finalText || input.value).trim();
          if (q) { input.value = ""; send(q, true); }  // envia solo al terminar de hablar
          else push("No te escuche. Toca el microfono y habla en " + langLabel + " (fuerte y claro). Si no aparece nada, revisa el permiso del microfono.", "bot");
        },
        onError: (code) => {
          setMic(false);
          const MSG = {
            "not-allowed": "No tengo permiso para el microfono. Tocalo en el candado de la barra de direcciones (Chrome) y permite el microfono.",
            "service-not-allowed": "El navegador bloqueo el microfono. Permitelo en el candado de la barra de direcciones.",
            "no-speech": "No escuche nada. Toca el microfono y habla enseguida, fuerte y claro.",
            "audio-capture": "No encuentro un microfono. Conecta o habilita uno y vuelve a intentar.",
            "language-not-supported": "Tu navegador no reconoce voz en " + langLabel + ". Usa Chrome de escritorio, o escribe tu respuesta.",
            "network": "Fallo de red en el reconocimiento de voz. Revisa tu conexion e intenta de nuevo.",
            "aborted": "",
          };
          const m = code in MSG ? MSG[code] : ("No pude usar el microfono (" + code + "). Puedes escribir tu respuesta.");
          if (m) push(m, "bot");
        },
      });
    }
    dictation.start();
  }

  micBtn.onclick = () => {
    if (!bymaxAiEnabled) return;
    if (listening) dictation?.stop();
    else startMic();
  };

  // Boton de ayuda rapida: pide una mano en espanol sin escribir.
  const helpBtn = el("button", {
    type: "button",
    disabled: bymaxAiEnabled ? undefined : "true",
    class: "text-xs px-3 py-1.5 rounded-full " + theme.pill +
      " focus:outline focus:outline-2 focus:outline-emerald-400 disabled:opacity-50",
    onclick: () => send("I'm stuck. Can you help me in Spanish and give me an example answer?", true),
  }, "Ayuda (en espanol)");

  // POP de vocabulario: las palabras que la unidad YA presento, con audio. En un
  // idioma nuevo el alumno se atora por LEXICO que nadie le dio, no por la regla
  // que esta practicando. Tenerlo a la vista evita romper el ritmo de la clase.
  // Solo aparece si la unidad trae glosario (en conversacion libre no hay).
  const vocabBtn = (cfg?.vocab || []).length ? el("button", {
    type: "button",
    class: "text-xs px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/40 text-indigo-200 " +
      "hover:bg-indigo-500/20 focus:outline focus:outline-2 focus:outline-indigo-400 " +
      "inline-flex items-center gap-1",
    onclick: () => openVocabHelp(cfg.vocab, cfg.targetLang || "en", cfg.unitTitle),
    "aria-label": "Ver las palabras que puedes usar en esta clase",
  }, el("span", { class: "w-3.5 h-3.5", html: ICONS.book }), "Palabras") : null;

  // Boton para marcar la clase como completada. Arranca DESHABILITADO; se habilita
  // cuando el alumno completa la practica (finishGoal respuestas). Un audio suelto
  // NO la completa. El color "listo" sale del tema (theme.finishPillReady); el
  // estado deshabilitado (opacity-40) es igual en cualquier tema.
  const finishBtn = onFinish ? el("button", {
    type: "button",
    disabled: "true",
    class: "text-xs px-3 py-1.5 rounded-full " + theme.finishPillReady +
      " focus:outline focus:outline-2 focus:outline-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed",
    onclick: () => { if (finishBtn.disabled) return; endClass(); },
  }, "Completa la practica (faltan " + finishGoal + ")") : null;

  // Arranque: la IA saluda y hace la primera pregunta (no mostramos "[BEGIN]").
  if (bymaxAiEnabled) {
    send("[BEGIN]", false);
  } else {
    push(name + " todavia no esta disponible. Cuando el administrador conecte el Worker (ver carpeta /worker), podras practicar aqui.", "bot");
  }

  const teacherSlot = el("div", { class: "shrink-0" });
  teacher = mountTeacher(teacherSlot, { size: "md", role: cfg?.role || "course" });

  // Encabezado: banner con degradado (tema "grammar", ver ui/session-theme.js)
  // o la fila plana de siempre (DEFAULT) -- mismo contenido, distinto "traje".
  const closeBtn = el("button", {
    class: "grid place-items-center w-9 h-9 rounded-full text-lg shrink-0 " + theme.closeBtn,
    "aria-label": "Cerrar", onclick: close,
  }, "\u2715");
  const headerRow = el("div", {
    class: "flex items-center gap-3" + (theme.headerBanner ? " rounded-2xl p-3 " + theme.headerBanner : ""),
  },
    teacherSlot,
    el("div", { class: "flex-1 min-w-0" },
      el("p", { class: theme.headerTitle }, title),
      el("p", { class: theme.headerSubtitle }, subtitle)),
    closeBtn);

  // PANTALLA COMPLETA + PANEL LATERAL (ej. features/skill-class.js para
  // Gramatica, ver features/grammar-sidebar.js): quien abre la sesion manda
  // cfg.sidebar (un nodo DOM ya armado) y aqui se acomoda a la derecha del
  // chat, en vez del modal centrado de siempre. Sin cfg.sidebar -> CERO
  // cambio (modal clasico), para Conversacion/Entrevistas/las demas competencias.
  const hasSidebar = !!cfg?.sidebar;

  const card = el("div", {
    class: (hasSidebar
      ? "robot-pop flex-1 min-h-0 min-w-0 " + theme.card + " rounded-none lg:rounded-2xl lg:m-3 p-4 sm:p-6 flex flex-col"
      : "robot-pop max-w-lg w-full " + theme.card + " rounded-2xl p-4 sm:p-6 flex flex-col max-h-[92dvh] min-h-0") +
      (theme.card.includes("shadow") ? "" : " shadow-2xl"), // DEFAULT no trae sombra propia -> la de siempre
    role: "dialog", "aria-label": cfg?.ariaLabel || ("Sesion con " + name), "aria-modal": "true",
  },
    headerRow,

    el("div", { class: "mt-3 border-t border-slate-800 pt-2 flex-1 min-h-0 overflow-y-auto" }, log),

    el("div", { class: "mt-2 flex justify-between gap-2" },
      finishBtn || el("span"),
      el("div", { class: "flex gap-2" }, vocabBtn || el("span"), helpBtn)),
    el("div", { class: "mt-2 flex gap-2" }, ...(speechSupported() ? [micBtn] : []), input, sendBtn));

  // Modal clasico (centrado, con backdrop) o pantalla completa con panel
  // lateral de referencia -- ver nota de `hasSidebar` arriba.
  //
  // ANCHO AJUSTABLE del panel (pedido de Joshua: "que el usuario pueda
  // controlar los margenes"). El divisor solo existe/se arrastra en pantallas
  // grandes (lg:): en movil el panel va apilado a lo ancho completo, no tiene
  // sentido "ancho" ahi. Se guarda en localStorage (ui/prefs.js) -> cada quien
  // recuerda su preferencia (chat grande o guia grande) entre sesiones.
  let sidebarAside = null;
  let resizeHandle = null;
  if (hasSidebar) {
    let sidebarW = getGrammarSidebarWidth();
    const applyW = (w) => {
      sidebarW = Math.min(GRAMMAR_SIDEBAR_LIMITS.max, Math.max(GRAMMAR_SIDEBAR_LIMITS.min, w));
      overlay.style.setProperty("--grammar-sidebar-w", sidebarW + "px");
    };

    resizeHandle = el("div", {
      class: "hidden lg:flex w-2 shrink-0 cursor-col-resize items-center justify-center " +
        "bg-slate-800 hover:bg-indigo-500/50 active:bg-indigo-500/70 transition-colors " +
        "focus:outline focus:outline-2 focus:outline-indigo-400",
      role: "separator", "aria-orientation": "vertical",
      "aria-label": "Arrastra (o usa las flechas) para cambiar el ancho de la guia de clase",
      tabindex: "0",
    }, el("span", { class: "w-0.5 h-8 rounded-full bg-slate-600", "aria-hidden": "true" }));

    const onMove = (e) => applyW(window.innerWidth - e.clientX);
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      setGrammarSidebarWidth(sidebarW); // persiste SOLO al soltar (no en cada pixel)
    };
    resizeHandle.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    });
    // Teclado (accesibilidad): flechas izquierda/derecha con el divisor enfocado.
    // Izquierda = guia MAS ancha (mueve el divisor hacia la izquierda), como
    // pidio Joshua textualmente.
    resizeHandle.addEventListener("keydown", (e) => {
      const step = e.shiftKey ? 48 : 16;
      if (e.key === "ArrowLeft") { applyW(sidebarW + step); setGrammarSidebarWidth(sidebarW); }
      else if (e.key === "ArrowRight") { applyW(sidebarW - step); setGrammarSidebarWidth(sidebarW); }
      else return;
      e.preventDefault();
    });
    // Doble clic: vuelve al ancho por defecto (reset rapido si se descontrola).
    resizeHandle.addEventListener("dblclick", () => {
      applyW(GRAMMAR_SIDEBAR_LIMITS.default);
      setGrammarSidebarWidth(sidebarW);
    });

    sidebarAside = el("aside", {
      class: "shrink-0 h-[38vh] lg:h-auto lg:w-[var(--grammar-sidebar-w)] border-t lg:border-t-0 " +
        "border-slate-800 overflow-y-auto p-4 bg-slate-950/40",
      "aria-label": "Guia de referencia de la clase",
    }, cfg.sidebar);
  }

  const overlay = hasSidebar
    ? el("div", { class: "fixed inset-0 z-50 bg-slate-950 flex flex-col lg:flex-row overflow-hidden" },
        card, resizeHandle, sidebarAside)
    : el("div", {
        class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4",
        onclick: (e) => { if (e.target === overlay) close(); },
      }, card);
  if (hasSidebar) overlay.style.setProperty("--grammar-sidebar-w", getGrammarSidebarWidth() + "px");

  document.body.append(overlay);
  if (bymaxAiEnabled) input.focus();
}
