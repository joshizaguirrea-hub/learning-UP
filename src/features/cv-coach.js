/**
 * features/cv-coach.js — CV Coach con IA (#/cv).
 *
 * 10 modos guiados (los prompts que pidio el usuario) para pulir el CV en INGLES
 * de cara a una entrevista. Cada modo pide solo los datos que necesita y arma un
 * prompt para Bymax (askBymax). Resultado: contenido de CV en ingles + notas en
 * espanol, separados (sin spanglish).
 *
 * PRIVACIDAD: todo es EFIMERO. El CV son datos personales -> NO se guarda en la
 * base ni en localStorage; vive solo en memoria mientras la pantalla esta abierta.
 */
import { getStudentProfile } from "../services/profiles.js";
import { ICONS } from "../ui/icons.js";
import { el, mount } from "../ui/dom.js";
import { accentGrad } from "../ui/theme.js";
import { focusMainHeading, announce } from "../ui/a11y.js";
import { backHome, screenHeader } from "../ui/hub-ui.js";
import { askBymax } from "../services/bymax-ai.js";
import { bymaxAiEnabled } from "../config/bymax.js";
import { extractTextFromFile } from "../ui/file-text.js";

// Prefijo comun: define el idioma de salida y el estilo (sin spanglish, sin markdown).
const PREFIX =
  "Actua como un coach experto de CV (curriculum) y reclutamiento para hispanohablantes " +
  "que buscan empleo en ingles. REGLAS: el contenido del CV va en INGLES; las notas o " +
  "explicaciones para el alumno van en ESPANOL bajo un encabezado 'Notas:' al final. " +
  "No mezcles idiomas dentro de una misma linea. Sin markdown ni asteriscos: usa saltos " +
  "de linea y guiones simples. Se concreto y accionable.\n\n";

// Campos reutilizables (DRY).
const F = {
  jobTitle: { key: "jobTitle", label: "Puesto al que aplicas", type: "text", placeholder: "Ej. Data Analyst" },
  industry: { key: "industry", label: "Industria / sector", type: "text", placeholder: "Ej. Retail, Fintech..." },
  cv: { key: "cv", label: "Pega tu CV (o la seccion relevante)", type: "textarea", rows: 8, placeholder: "Pega aqui el texto de tu CV..." },
  jobDesc: { key: "jobDesc", label: "Descripcion del puesto (oferta)", type: "textarea", rows: 6, placeholder: "Pega la descripcion de la vacante..." },
};

/** Los 10 modos: id, titulo, descripcion, campos y como arma el prompt. */
export const CV_MODES = [
  {
    id: "summary", title: "Mejora tu resumen profesional",
    desc: "Reescribe tu summary: conciso, atractivo y acorde al puesto.",
    fields: [F.jobTitle, F.industry, { key: "current", label: "Tu resumen actual", type: "textarea", rows: 5, placeholder: "Pega tu professional summary actual..." }],
    build: (v) => PREFIX + `Reescribe el RESUMEN PROFESIONAL para un puesto de "${v.jobTitle}" en "${v.industry}". ` +
      "Hazlo conciso, atractivo y alineado a las expectativas del puesto; refleja fortalezas, habilidades " +
      "relevantes y anos de experiencia de forma convincente. Entrega 2 versiones mejoradas en ingles.\n\nResumen actual:\n" + v.current,
  },
  {
    id: "achievements", title: "Logros con metricas",
    desc: "Convierte responsabilidades en logros medibles con numeros.",
    fields: [{ key: "bullets", label: "Puntos / tareas de un rol anterior", type: "textarea", rows: 7, placeholder: "Pega los bullets o describe lo que hacias..." }],
    build: (v) => PREFIX + "Re-trabaja estos puntos para que se centren en LOGROS MEDIBLES en vez de responsabilidades " +
      "genericas. Hazlos orientados a resultados, con verbos de accion fuertes e incluye numeros o metricas siempre que " +
      "sea posible (si faltan datos, deja placeholders como [X%] o [N]). Entrega los bullets mejorados en ingles.\n\nPuntos:\n" + v.bullets,
  },
  {
    id: "ats", title: "Optimizar para ATS",
    desc: "Palabras clave de la oferta, natural y legible.",
    fields: [F.jobDesc, F.cv],
    build: (v) => PREFIX + "Optimiza el contenido del CV para pasar filtros ATS y seguir siendo facil de leer para " +
      "reclutadores humanos. Incluye palabras clave y frases relevantes de la oferta de forma natural. Marca que " +
      "keywords agregaste. Entrega el CV optimizado en ingles.\n\nDescripcion del puesto:\n" + v.jobDesc + "\n\nCV actual:\n" + v.cv,
  },
  {
    id: "pivot", title: "Cambio de carrera",
    desc: "Resalta habilidades transferibles a un campo nuevo.",
    fields: [
      { key: "prevField", label: "Campo anterior", type: "text", placeholder: "Ej. Atencion al cliente" },
      { key: "newField", label: "Campo nuevo", type: "text", placeholder: "Ej. UX Design" },
      { key: "content", label: "Tu resumen y logros actuales", type: "textarea", rows: 6, placeholder: "Pega tu resumen y logros..." },
    ],
    build: (v) => PREFIX + `Ayudame en una transicion de "${v.prevField}" a "${v.newField}". Reescribe el resumen y los ` +
      "logros clave para resaltar HABILIDADES TRANSFERIBLES y argumentar por que soy buen fit aunque no tenga " +
      "experiencia directa. Entrega en ingles.\n\nContenido actual:\n" + v.content,
  },
  {
    id: "audit", title: "Auditoria de CV",
    desc: "Detecta partes vagas, prolijas o sin impacto.",
    fields: [F.cv],
    build: (v) => PREFIX + "Audita todo este CV y senala donde estoy siendo demasiado vago, prolijo o sin suficiente " +
      "impacto. Da tu opinion sobre tono, estructura y como enfatizar mejor liderazgo, resultados o innovacion. " +
      "Prioriza las 5 mejoras de mayor impacto. Las observaciones van en 'Notas:' (espanol); si reescribes frases, en ingles.\n\nCV:\n" + v.cv,
  },
  {
    id: "format", title: "Formato moderno",
    desc: "Diseno escaneable en 10 segundos, lo reciente primero.",
    fields: [F.cv],
    build: (v) => PREFIX + "Sugiere un formato/diseno mejor que enfatice mi experiencia mas reciente y habilidades clave, " +
      "restando importancia a roles antiguos y menos relevantes. Que se vea moderno y sea escaneable en menos de 10 segundos. " +
      "Describe la estructura recomendada SECCION POR SECCION y el orden. \n\nCV actual:\n" + v.cv,
  },
  {
    id: "align", title: "Alinear al puesto",
    desc: "Reestructura tu historial para calzar con la vacante.",
    fields: [F.jobDesc, { key: "history", label: "Tu historial laboral", type: "textarea", rows: 7, placeholder: "Pega tu experiencia / historial..." }],
    build: (v) => PREFIX + "Basandote en esta descripcion del puesto, reescribe o reestructura mi historial laboral para " +
      "que se alinee mejor con las habilidades y calificaciones principales que buscan. Concentrate en alinear el lenguaje " +
      "y la redaccion. Entrega el historial reescrito en ingles.\n\nDescripcion del puesto:\n" + v.jobDesc + "\n\nHistorial:\n" + v.history,
  },
  {
    id: "skills", title: "Habilidades tecnicas",
    desc: "Arma la seccion de skills y herramientas que destaque.",
    fields: [{ key: "experience", label: "Describe brevemente tu experiencia", type: "textarea", rows: 5, placeholder: "Ej. 3 anos analizando datos con SQL y Excel..." }],
    build: (v) => PREFIX + "Con base en mi experiencia, escribe una seccion de HABILIDADES y HERRAMIENTAS TECNICAS que " +
      "destaque para los gerentes de contratacion, agrupada por categorias (ej. Lenguajes, Herramientas, Metodologias). " +
      "Entrega en ingles.\n\nExperiencia:\n" + v.experience,
  },
  {
    id: "headline", title: "Titular y subtitulo",
    desc: "Un headline potente con tu propuesta de valor.",
    fields: [
      { key: "target", label: "Puesto / objetivo", type: "text", placeholder: "Ej. Senior Project Manager" },
      { key: "profile", label: "Breve perfil tuyo", type: "textarea", rows: 4, placeholder: "En 2-3 lineas, quien eres profesionalmente..." },
    ],
    build: (v) => PREFIX + `Escribe un TITULAR (headline) y SUBTITULO de CV concisos pero poderosos para el objetivo ` +
      `"${v.target}", que digan de inmediato el tipo de puesto que busco, mi propuesta de valor y que me hace destacar. ` +
      "Da 3 opciones en ingles.\n\nPerfil:\n" + v.profile,
  },
  {
    id: "recruiter", title: "Actua como reclutador",
    desc: "Bymax revisa tu CV como hiring manager.",
    fields: [{ key: "role", label: "Industria / Rol", type: "text", placeholder: "Ej. Marketing en Retail" }, F.cv],
    build: (v) => PREFIX + `Actua como un gerente de contratacion en "${v.role}". Con base en este CV, dime que te haria mas ` +
      "propenso a invitarme a una entrevista y que deberia cambiar, cortar o agregar para mejorar mis posibilidades. " +
      "Da una lista priorizada y un veredicto (llamarias a entrevista si/no y por que). Observaciones en 'Notas:' (espanol).\n\nCV:\n" + v.cv,
  },
];

function stripMd(t) { return String(t).replace(/\*\*/g, "").replace(/[*_`]/g, "").replace(/^#+\s*/gm, ""); }

/** Bloque de resultado (copiar + descargar + texto) reutilizado por Pro y modos. */
function buildResultBlock(text) {
  const pre = el("div", { class: "rounded-2xl bg-slate-950/60 border border-slate-800 p-4 whitespace-pre-wrap text-slate-100 text-sm leading-relaxed" }, text);
  const copyBtn = el("button", { type: "button",
    class: "inline-flex items-center gap-2 border border-indigo-500/40 bg-indigo-500/10 text-indigo-200 px-3 py-2 rounded-xl hover:bg-indigo-500/20",
    onclick: async () => {
      try { await navigator.clipboard.writeText(text); copyBtn.lastChild.textContent = "Copiado!"; setTimeout(() => (copyBtn.lastChild.textContent = "Copiar"), 1500); }
      catch { copyBtn.lastChild.textContent = "No se pudo"; }
    } },
    el("span", { class: "w-5 h-5", html: ICONS.check }), el("span", {}, "Copiar"));
  const dlBtn = el("button", { type: "button",
    class: "inline-flex items-center gap-2 border border-emerald-500/40 bg-emerald-500/10 text-emerald-200 px-3 py-2 rounded-xl hover:bg-emerald-500/20",
    onclick: () => {
      // Descarga efimera: genera el .txt en el navegador; el CV nunca sale del equipo.
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = el("a", { href: url, download: "CV_Learning_UP.txt" });
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      dlBtn.lastChild.textContent = "Descargado!"; setTimeout(() => (dlBtn.lastChild.textContent = "Descargar (.txt)"), 1500);
    } },
    el("span", { class: "w-5 h-5", html: ICONS.download || ICONS.check }), el("span", {}, "Descargar (.txt)"));
  return el("div", { class: "space-y-2" },
    el("div", { class: "flex flex-wrap justify-end gap-2" }, dlBtn, copyBtn), pre);
}

/** Prompt del flujo estrella: CV completo de alta calidad, listo para ATS. */
function buildPro(v) {
  return PREFIX +
    "MISION: Actua como reclutador senior y experto en ATS. Con el CV base, el puesto objetivo y las skills " +
    "requeridas, ENTREGA UN CV COMPLETO DE ALTA CALIDAD en ingles, listo para aplicar, optimizado para ATS y " +
    "con estandares actuales.\n" +
    "ESTRUCTURA (en este orden, una sola columna, sin tablas ni iconos para que el ATS lo lea):\n" +
    "1) Nombre + headline (puesto objetivo)\n2) Contacto (usa placeholders [Email] [Telefono] [LinkedIn] [Ciudad] si faltan)\n" +
    "3) Professional Summary (3-4 lineas, orientado a resultados)\n4) Core Skills (agrupadas; incluye NATURALMENTE las skills requeridas)\n" +
    "5) Professional Experience (bullets con verbos de accion y metricas; usa [X%] o [N] donde falten datos)\n" +
    "6) Education\n7) Certifications / Extras si aplica\n" +
    "REGLAS ATS: integra keywords del puesto y de las skills de forma natural; fechas claras; sin graficos ni caracteres raros.\n" +
    "Al final, en 'Notas:' (espanol): (a) que keywords agregaste, (b) 3 cosas que el candidato debe completar, (c) puntaje ATS estimado 0-100.\n\n" +
    "Puesto objetivo:\n" + v.jobTitle + "\n\nSkills requeridas:\n" + (v.skills || "(no especificadas)") + "\n\nCV base del candidato:\n" + v.cv;
}

export async function renderCvCoach(container, user) {
  const profile = await getStudentProfile(user.id).catch(() => null);
  const level = profile?.cefr_level || "B2";
  showList();

  // ---- Vista 1: lista de los 10 modos --------------------------------------
  function showList() {
    const cards = CV_MODES.map((m, i) =>
      el("button", { type: "button",
        class: "text-left flex items-start gap-3 rounded-2xl bg-slate-900 border border-slate-800 p-4 " +
          "hover:bg-slate-800/70 hover:-translate-y-0.5 transition focus:outline focus:outline-2 focus:outline-indigo-400",
        onclick: () => showForm(m) },
        el("span", { class: "w-8 h-8 shrink-0 grid place-items-center rounded-full bg-indigo-500/20 text-indigo-300 font-black" }, String(i + 1)),
        el("div", { class: "min-w-0" },
          el("p", { class: "font-bold text-slate-100" }, m.title),
          el("p", { class: "text-sm text-slate-400 mt-0.5" }, m.desc))));

    mount(container, el("div", { class: "max-w-3xl mx-auto space-y-5" },
      backHome("text-fuchsia-300 hover:text-fuchsia-200"),
      screenHeader({ icon: ICONS.book, grad: accentGrad("story"),
        title: "CV Coach con IA", subtitle: "Pule tu CV en ingles para la entrevista" }),
      privacyNote(),
      !bymaxAiEnabled
        ? el("div", { class: "rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 text-amber-200 text-sm" },
            "Bymax IA no esta activo ahora mismo. Intenta mas tarde.")
        : null,
      el("p", { class: "text-sm text-slate-400" }, "Elige que quieres trabajar:"),
      featuredProCard(),
      el("p", { class: "text-sm text-slate-400 pt-1" }, "O trabaja una parte especifica:"),
      el("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-3" }, ...cards)));
    focusMainHeading(container);
  }

  /** Tarjeta grande destacada -> flujo "CV de alta calidad". */
  function featuredProCard() {
    return el("button", { type: "button",
      class: "w-full text-left relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-emerald-500 via-teal-600 to-teal-800 " +
        "shadow-xl hover:-translate-y-0.5 transition focus:outline focus:outline-2 focus:outline-white/70",
      onclick: showPro },
      el("span", { class: "absolute top-3 right-3 text-[10px] font-black tracking-widest bg-black/25 text-white px-2 py-1 rounded-full" }, "RECOMENDADO"),
      el("div", { class: "flex items-start gap-3" },
        el("span", { class: "w-12 h-12 shrink-0 grid place-items-center rounded-2xl bg-white/20 text-white", html: ICONS.briefcase || ICONS.book }),
        el("div", { class: "min-w-0" },
          el("p", { class: "text-lg font-black text-white" }, "CV de alta calidad (todo en uno)"),
          el("p", { class: "text-white/90 text-sm mt-0.5" },
            "Sube tu CV, di el puesto y las skills requeridas. Bymax, como reclutador experto, te devuelve un CV completo optimizado para ATS."))));
  }

  // ---- Vista Pro: subir CV + puesto + skills -> CV de alta calidad ---------
  function showPro() {
    const cvInput = el("textarea", {
      class: "w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2.5 text-slate-100 resize-y " +
        "focus:outline focus:outline-2 focus:outline-indigo-500",
      rows: "8", maxlength: "12000", placeholder: "Se llena solo al subir tu archivo, o pega aqui el texto de tu CV..." });
    const jobInput = el("input", { type: "text", maxlength: "160", autocomplete: "off",
      class: "w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2.5 text-slate-100 focus:outline focus:outline-2 focus:outline-indigo-500",
      placeholder: "Ej. Data Analyst en Fintech" });
    const skillsInput = el("textarea", {
      class: "w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2.5 text-slate-100 resize-y focus:outline focus:outline-2 focus:outline-indigo-500",
      rows: "3", maxlength: "600", placeholder: "Ej. SQL, Python, Power BI, storytelling con datos, ingles B2..." });

    const fileStatus = el("span", { class: "text-xs text-slate-400", role: "status" }, "");
    const fileInput = el("input", { type: "file", accept: ".pdf,.docx,.txt,.md", class: "sr-only",
      onchange: async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        fileStatus.textContent = "Leyendo " + file.name + "...";
        try {
          const text = await extractTextFromFile(file);
          cvInput.value = text;
          fileStatus.textContent = "Listo: " + file.name + " (" + text.length + " caracteres). Revisa el texto abajo.";
        } catch (err) {
          fileStatus.textContent = "";
          status.textContent = err.message || "No pude leer el archivo.";
        }
      } });
    const uploadLabel = el("label", {
      class: "inline-flex items-center gap-2 cursor-pointer border border-indigo-500/40 bg-indigo-500/10 text-indigo-200 " +
        "px-4 py-2.5 rounded-xl hover:bg-indigo-500/20 focus-within:outline focus-within:outline-2 focus-within:outline-indigo-400" },
      el("span", { class: "w-5 h-5", html: ICONS.download || ICONS.book }),
      el("span", {}, "Subir CV (PDF, DOCX o TXT)"), fileInput);

    const status = el("p", { class: "mt-2 text-xs text-slate-500 min-h-[1rem]", role: "status" }, "");
    const out = el("div", { class: "mt-3" });

    const genBtn = el("button", { type: "button",
      class: "mt-3 w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold px-5 py-3 rounded-xl " +
        "hover:brightness-110 focus:outline focus:outline-2 focus:outline-emerald-400 disabled:opacity-50",
      onclick: run }, "Crear mi CV de alta calidad");

    async function run() {
      const v = { cv: cvInput.value.trim(), jobTitle: jobInput.value.trim(), skills: skillsInput.value.trim() };
      if (!v.cv) { status.textContent = "Sube tu CV o pega su texto primero."; return; }
      if (!v.jobTitle) { status.textContent = "Dime el puesto al que aplicas."; return; }
      if (!bymaxAiEnabled) { status.textContent = "Bymax IA no esta activo ahora."; return; }

      genBtn.disabled = true;
      status.textContent = "Bymax esta creando tu CV (esto puede tardar unos segundos)...";
      out.replaceChildren();
      announce("Generando CV");

      const { answer, error } = await askBymax({ mode: "chat", topic: "cv", level, question: buildPro(v) });
      genBtn.disabled = false;
      if (error || !answer) { status.textContent = "No pude ahora: " + (error || "intenta de nuevo."); return; }
      status.textContent = "Listo. Revisa, ajusta los placeholders y copialo.";
      out.replaceChildren(buildResultBlock(stripMd(answer)));
    }

    const backBtn = el("button", { type: "button",
      class: "mb-1 inline-flex items-center gap-1.5 font-semibold text-fuchsia-300 hover:text-fuchsia-200 focus:outline focus:outline-2 focus:outline-indigo-400 rounded",
      onclick: showList },
      el("span", { html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><path d="M15 18l-6-6 6-6"/></svg>' }),
      "Volver");

    mount(container, el("div", { class: "max-w-2xl mx-auto space-y-4" },
      backBtn,
      screenHeader({ icon: ICONS.briefcase || ICONS.book, grad: "from-emerald-500 to-teal-600",
        title: "CV de alta calidad", subtitle: "Subir CV + puesto + skills -> CV listo para ATS" }),
      privacyNote(),
      el("div", { class: "flex flex-wrap items-center gap-3" }, uploadLabel, fileStatus),
      el("label", { class: "block" }, el("span", { class: "text-sm font-semibold text-slate-300" }, "Tu CV (texto)"), el("div", { class: "mt-1" }, cvInput)),
      el("label", { class: "block" }, el("span", { class: "text-sm font-semibold text-slate-300" }, "Puesto al que aplicas"), el("div", { class: "mt-1" }, jobInput)),
      el("label", { class: "block" }, el("span", { class: "text-sm font-semibold text-slate-300" }, "Skills requeridas por la vacante"), el("div", { class: "mt-1" }, skillsInput)),
      genBtn, status, out));
    focusMainHeading(container);
  }

  // ---- Vista 2: formulario de un modo + resultado --------------------------
  function showForm(mode) {
    const inputs = {};
    const fieldEls = mode.fields.map((f) => {
      const common = {
        class: "w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2.5 text-slate-100 " +
          "focus:outline focus:outline-2 focus:outline-indigo-500",
        placeholder: f.placeholder || "",
      };
      const input = f.type === "textarea"
        ? el("textarea", { ...common, rows: String(f.rows || 5), maxlength: "5000", class: common.class + " resize-y" })
        : el("input", { ...common, type: "text", maxlength: "160", autocomplete: "off" });
      inputs[f.key] = input;
      return el("label", { class: "block" },
        el("span", { class: "text-sm font-semibold text-slate-300" }, f.label),
        el("div", { class: "mt-1" }, input));
    });

    const status = el("p", { class: "mt-2 text-xs text-slate-500 min-h-[1rem]", role: "status" }, "");
    const out = el("div", { class: "mt-3" });

    const genBtn = el("button", { type: "button",
      class: "mt-3 w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-5 py-3 " +
        "rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-indigo-400 disabled:opacity-50",
      onclick: run }, "Generar con Bymax");

    async function run() {
      const values = {};
      let missing = false;
      for (const f of mode.fields) {
        values[f.key] = inputs[f.key].value.trim();
        if (!values[f.key]) missing = true;
      }
      if (missing) { status.textContent = "Completa los campos primero."; return; }
      if (!bymaxAiEnabled) { status.textContent = "Bymax IA no esta activo ahora."; return; }

      genBtn.disabled = true;
      status.textContent = "Bymax esta trabajando tu CV...";
      out.replaceChildren();
      announce("Generando");

      const question = mode.build(values);
      const { answer, error } = await askBymax({ mode: "chat", topic: "cv", level, question });
      genBtn.disabled = false;

      if (error || !answer) { status.textContent = "No pude ahora: " + (error || "intenta de nuevo."); return; }
      status.textContent = "Listo. Revisa y ajusta a tu gusto.";
      out.replaceChildren(buildResultBlock(stripMd(answer)));
    }

    const backBtn = el("button", { type: "button",
      class: "mb-1 inline-flex items-center gap-1.5 font-semibold text-fuchsia-300 hover:text-fuchsia-200 focus:outline focus:outline-2 focus:outline-indigo-400 rounded",
      onclick: showList },
      el("span", { html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><path d="M15 18l-6-6 6-6"/></svg>' }),
      "Modos");

    mount(container, el("div", { class: "max-w-2xl mx-auto space-y-4" },
      backBtn,
      screenHeader({ icon: ICONS.book, grad: accentGrad("story"), title: mode.title, subtitle: mode.desc }),
      privacyNote(),
      el("div", { class: "space-y-3" }, ...fieldEls),
      genBtn, status, out));
    focusMainHeading(container);
  }
}

/** Aviso de privacidad (CV = datos personales). */
function privacyNote() {
  return el("div", { class: "flex items-start gap-2 rounded-xl bg-slate-800/50 border border-slate-700 p-3" },
    el("span", { class: "w-5 h-5 text-emerald-300 shrink-0 mt-0.5", html: ICONS.lock }),
    el("p", { class: "text-xs text-slate-400" },
      "Privacidad: lo que pegues aqui es efimero. No se guarda en tu cuenta ni en el dispositivo; solo se usa para esta consulta."));
}
