/**
 * data/units/a2-work-jobs.js — Unidad tematica "Work & jobs" (A2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Listening/Speaking con audio/IA.
 */

export const A2_WORK_JOBS = {
  id: "a2-work-jobs",
  language: "en",
  level: "A2",
  title: "Work & jobs",
  subtitle: "Hablar de oficios y experiencias con present perfect",

  cando: [
    "Puedo nombrar oficios y lugares de trabajo.",
    "Puedo hablar de experiencias con present perfect (ever/never).",
    "Puedo usar just / already / yet.",
    "Puedo preguntar y responder sobre experiencias laborales.",
  ],

  vocab: [
    { id: "a2wj-1", term: "job", translation: "trabajo / empleo", example: "She has a good job." },
    { id: "a2wj-2", term: "nurse", translation: "enfermero/a", example: "My aunt is a nurse." },
    { id: "a2wj-3", term: "engineer", translation: "ingeniero/a", example: "He is an engineer." },
    { id: "a2wj-4", term: "waiter", translation: "mesero", example: "I have worked as a waiter." },
    { id: "a2wj-5", term: "office", translation: "oficina", example: "I work in an office." },
    { id: "a2wj-6", term: "to earn", translation: "ganar (dinero)", example: "She earns a good salary." },
    { id: "a2wj-7", term: "experience", translation: "experiencia", example: "Have you got experience?" },
    { id: "a2wj-8", term: "already", translation: "ya", example: "I have already finished." },
    { id: "a2wj-9", term: "yet", translation: "todavia / aun", example: "I haven't started yet." },
    { id: "a2wj-10", term: "just", translation: "recien / acabar de", example: "She has just arrived." },
    { id: "a2wj-11", term: "manager", translation: "gerente / jefe", example: "The manager is friendly." },
    { id: "a2wj-12", term: "to apply", translation: "postular", example: "I applied for the job." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a2wj-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: experiencias de trabajo",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Marta's search\n" +
          "Marta is looking for a new job. She has worked in many places. She has been a waiter and a shop " +
          "assistant. She has never worked in an office, but she wants to try. 'Have you ever used this " +
          "software?' asks the manager. 'Yes, I have already learned it,' says Marta. She hasn't got the " +
          "job yet, but she has just finished the interview and feels positive.\n\n" +
          "TEXT 2 - A quick chat\n" +
          "A: Have you ever worked abroad? B: Yes, I have. I worked in Canada for a year. A: Wow! Have you " +
          "found a new job yet? B: Not yet, but I've just applied for one as an engineer. A: Good luck! " +
          "You have a lot of experience. B: Thanks! I hope they call me soon.",
        glossary: [
          { term: "has worked / has been", translation: "ha trabajado / ha sido" },
          { term: "has never worked", translation: "nunca ha trabajado" },
          { term: "Have you ever...?", translation: "alguna vez has...?" },
          { term: "already / yet", translation: "ya / todavia" },
          { term: "just", translation: "recien" },
          { term: "manager / abroad", translation: "gerente / en el extranjero" },
          { term: "to apply", translation: "postular" },
          { term: "Good luck!", translation: "buena suerte!" },
        ],
        keyPhrases: [
          "Busca donde ha trabajado cada persona y donde nunca.",
          "Fijate en already, yet y just.",
        ],
        check: [
          { prompt: "T1: Where has Marta never worked?", choices: ["A shop", "A restaurant", "An office"], answer: 2 },
          { prompt: "T1: Has Marta got the job?", choices: ["Yes", "Not yet", "She refused it"], answer: 1 },
          { prompt: "T1: What has she just finished?", choices: ["A course", "The interview", "A project"], answer: 1 },
          { prompt: "T2: Where did B work abroad?", choices: ["Canada", "Spain", "Italy"], answer: 0 },
          { prompt: "T2: Has B found a new job yet?", choices: ["Yes", "Not yet", "Never"], answer: 1 },
          { prompt: "T2: What job did B just apply for?", choices: ["Waiter", "Engineer", "Nurse"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "a2wj-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: oficios y tiempo",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "job / office", translation: "trabajo / oficina" },
        { term: "nurse / engineer", translation: "enfermero / ingeniero" },
        { term: "waiter / manager", translation: "mesero / gerente" },
        { term: "to earn / to apply", translation: "ganar dinero / postular" },
        { term: "already / yet", translation: "ya / todavia" },
        { term: "just / experience", translation: "recien / experiencia" },
      ],
      activities: [
        {
          id: "a2wj-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "nurse", right: "enfermero/a" },
            { left: "engineer", right: "ingeniero/a" },
            { left: "waiter", right: "mesero" },
            { left: "manager", right: "gerente" },
          ] },
        },
        {
          id: "a2wj-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "office", right: "oficina" },
            { left: "to earn", right: "ganar dinero" },
            { left: "to apply", right: "postular" },
            { left: "experience", right: "experiencia" },
          ] },
        },
        {
          id: "a2wj-vocab-a3", type: "cloze",
          prompt: "Completa: 'She has ___ arrived.' (recien)",
          payload: { answer: "just" },
          explain: "'just' = recien / acabar de.",
        },
        {
          id: "a2wj-vocab-a4", type: "cloze",
          prompt: "Completa: 'I ___ for the job.' (postular -> pasado)",
          payload: { answer: "applied" },
          explain: "'apply' -> 'applied'.",
        },
        {
          id: "a2wj-vocab-a5", type: "cloze",
          prompt: "Completa: 'The ___ is friendly.' (gerente)",
          payload: { answer: "manager" },
          explain: "'Manager' = gerente / jefe.",
        },
        {
          id: "a2wj-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'todavia no' (in negatives)?",
          payload: { choices: ["already", "yet", "just"], answer: 1 },
          explain: "'yet' va al final en negativos y preguntas.",
        },
        {
          id: "a2wj-vocab-a7", type: "multiple_choice",
          prompt: "Which person serves food in a restaurant?",
          payload: { choices: ["engineer", "waiter", "nurse"], answer: 1 },
          explain: "'Waiter' = mesero.",
        },
        {
          id: "a2wj-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["office", "an", "I", "in", "work"], answer: ["I", "work", "in", "an", "office"] },
          explain: "'I work in an office' = trabajo en una oficina.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "a2wj-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: present perfect",
      intro: "Competencia de GRAMATICA. Aprende el present perfect para experiencias.",
      grammar: {
        title: "Present perfect (experiencias)",
        form: "have/has + past participle · Have you ever...? · never / just / already / not ... yet",
        desc: "Sirve para hablar de experiencias de vida y acciones recientes sin decir cu\u00e1ndo exactamente.",
        rule: "'have/has + participio' (has con he/she/it). 'Have you ever...?' pregunta por experiencias; 'never' = nunca; 'just' = reci\u00e9n; 'already' = ya; 'not ... yet' = todav\u00eda no.",
        examples: ["I have worked as a waiter.", "Have you ever been to London?", "She hasn't finished yet."],
        explain: { tr: ["He trabajado como mesero.", "\u00bfAlguna vez has estado en Londres?", "Ella no ha terminado todav\u00eda."] },
        mistakes: [
          { wrong: "I have work here.", right: "I have worked here." },
          { wrong: "Have you ever went there?", right: "Have you ever been there?" },
          { wrong: "She has finish yet.", right: "She hasn't finished yet." },
        ],
      },
      activities: [
        {
          id: "a2wj-gram-a1", type: "cloze",
          prompt: "Completa: 'I have ___ as a waiter.' (work -> participio)",
          payload: { answer: "worked" },
          explain: "Participio regular: worked.",
        },
        {
          id: "a2wj-gram-a2", type: "cloze",
          prompt: "Completa: 'She ___ never worked in an office.' (has/have)",
          payload: { answer: "has" },
          explain: "Con she/he/it: 'has'.",
        },
        {
          id: "a2wj-gram-a3", type: "cloze",
          prompt: "Completa: 'Have you ever ___ to London?' (go -> participio)",
          payload: { answer: "been" },
          explain: "El participio de 'go' (para experiencias) es 'been'.",
        },
        {
          id: "a2wj-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["I haven't finished yet.", "I haven't finish yet.", "I don't finished yet."], answer: 0 },
          explain: "Present perfect negativo: haven't + participio.",
        },
        {
          id: "a2wj-gram-a5", type: "multiple_choice",
          prompt: "Choose the correct question:",
          payload: { choices: ["Have you ever go there?", "Have you ever been there?", "Do you ever been there?"], answer: 1 },
          explain: "Present perfect: have + participio (been).",
        },
        {
          id: "a2wj-gram-a6", type: "word_bank",
          prompt: "Ordena la pregunta:",
          payload: { words: ["ever", "Have", "worked", "you", "here?"], answer: ["Have", "you", "ever", "worked", "here?"] },
          explain: "Have + you + ever + worked + here?",
        },
        {
          id: "a2wj-gram-a7", type: "word_bank",
          prompt: "Ordena la frase con 'never':",
          payload: { words: ["never", "I've", "in", "worked", "an", "office"], answer: ["I've", "never", "worked", "in", "an", "office"] },
          explain: "I've + never + worked + in + an + office.",
        },
        {
          id: "a2wj-gram-a8", type: "cloze",
          prompt: "Completa: 'I have ___ finished my work.' (ya)",
          payload: { answer: "already" },
          explain: "'already' = ya (va antes del participio).",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "a2wj-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: tus experiencias",
      intro: "Competencia de ESCRITURA. Construye frases sobre tu experiencia, frase por frase.",
      activities: [
        {
          id: "a2wj-write-a1", type: "word_bank",
          prompt: "1. Di que has trabajado en una tienda:",
          payload: { words: ["a", "I", "worked", "in", "have", "shop"], answer: ["I", "have", "worked", "in", "a", "shop"] },
        },
        {
          id: "a2wj-write-a2", type: "word_bank",
          prompt: "2. Di que nunca has trabajado en una oficina:",
          payload: { words: ["never", "I've", "in", "worked", "an", "office"], answer: ["I've", "never", "worked", "in", "an", "office"] },
        },
        {
          id: "a2wj-write-a3", type: "word_bank",
          prompt: "3. Pregunta si alguna vez fue a Londres:",
          payload: { words: ["ever", "Have", "to", "you", "been", "London?"], answer: ["Have", "you", "ever", "been", "to", "London?"] },
        },
        {
          id: "a2wj-write-a4", type: "word_bank",
          prompt: "4. Di que acabas de postular a un empleo:",
          payload: { words: ["a", "I've", "for", "just", "applied", "job"], answer: ["I've", "just", "applied", "for", "a", "job"] },
        },
        {
          id: "a2wj-write-a5", type: "word_bank",
          prompt: "5. Di que todavia no has terminado:",
          payload: { words: ["yet", "I", "finished", "haven't"], answer: ["I", "haven't", "finished", "yet"] },
        },
        {
          id: "a2wj-write-a6", type: "multiple_choice",
          prompt: "6. Which word means 'ya'?",
          payload: { choices: ["already", "yet", "never"], answer: 0 },
        },
        {
          id: "a2wj-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["Have you ever eat sushi?", "Have you ever eaten sushi?", "Do you ever eaten sushi?"], answer: 1 },
        },
        {
          id: "a2wj-write-a8", type: "multiple_choice",
          prompt: "8. 'She has just arrived' means she arrived...",
          payload: { choices: ["a long time ago", "a moment ago", "tomorrow"], answer: 1 },
        },
      ],
    },
  ],
};
