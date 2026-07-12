/**
 * data/units/a2-work-jobs.js — Unidad tematica "Work & jobs" (A2).
 *
 * Datos PUROS. Introduccion al present perfect (ever/never/just/already/yet) con
 * vocabulario de oficios. Ciclo PPP del estandar de calidad (ver PLAN-DE-ESTUDIO.md).
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
  ],

  lessons: [
    {
      id: "a2wj-l0",
      order: 1,
      phase: "learn",
      skills: ["reading", "vocabulary"],
      title: "Aprende: experiencias de trabajo",
      intro:
        "Lee las experiencias y estudia el present perfect. Aqui solo se lee y se aprende.",
      teachesVocab: true,
      content: {
        reading:
          "Marta is looking for a new job. She has worked in many places. She has been a waiter " +
          "and a shop assistant. She has never worked in an office, but she wants to try. 'Have you " +
          "ever used this software?' asks the manager. 'Yes, I have already learned it,' says Marta. " +
          "She hasn't got the job yet, but she has just finished the interview and feels positive.",
        glossary: [
          { term: "has worked", translation: "ha trabajado" },
          { term: "has been", translation: "ha sido" },
          { term: "has never worked", translation: "nunca ha trabajado" },
          { term: "Have you ever...?", translation: "Alguna vez has...?" },
          { term: "already", translation: "ya" },
          { term: "not ... yet", translation: "todavia no" },
        ],
        keyPhrases: [
          "I have worked / been / done... (Present perfect)",
          "Have you ever...? (Alguna vez has...?)",
          "I've never... (Nunca he...)",
          "I've just / already... / not yet. (Recien / ya... / todavia no.)",
        ],
        note:
          "Present perfect = have/has + participio. Sirve para EXPERIENCIAS sin decir cuando: " +
          "'I have worked here'. 'ever' en preguntas, 'never' en negativo, 'just/already' antes del " +
          "participio, 'yet' al final en preguntas y negativos.",
        grammar: {
          title: "Present perfect (experiencias)",
          form: "have/has + participio (worked, been, done)",
          examples: [
            "I have worked as a waiter.",
            "Have you ever been to London?",
            "She hasn't finished yet.",
          ],
          mistakes: [
            { wrong: "I have work here.", right: "I have worked here." },
            { wrong: "Have you ever went there?", right: "Have you ever been there?" },
          ],
        },
        check: [
          { prompt: "Where has Marta never worked?", choices: ["A shop", "A restaurant", "An office"], answer: 2 },
          { prompt: "Has Marta got the job?", choices: ["Yes", "Not yet", "She refused it"], answer: 1 },
        ],
      },
      activities: [],
    },
    {
      id: "a2wj-l1",
      order: 2,
      phase: "present",
      skills: ["grammar", "vocabulary"],
      title: "Presentacion: preguntar por experiencias",
      intro: "Usamos 'Have you ever...?' para preguntar por experiencias. Lee el dialogo.",
      dialogue: [
        "A: Have you ever worked in a restaurant?",
        "B: Yes, I have. I've been a waiter for two years.",
        "A: Have you started the new job yet?",
        "B: No, not yet. I start next Monday.",
      ],
      activities: [
        {
          id: "a2wj-l1-a1", type: "multiple_choice",
          prompt: "Choose the correct question:",
          payload: { choices: ["Have you ever go there?", "Have you ever been there?", "Do you ever been there?"], answer: 1 },
          explain: "Present perfect: have + participio (been), no 'go'.",
        },
        {
          id: "a2wj-l1-a2", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "nurse", right: "enfermero/a" },
            { left: "office", right: "oficina" },
            { left: "to earn", right: "ganar dinero" },
          ] },
        },
      ],
    },
    {
      id: "a2wj-l2",
      order: 3,
      phase: "practice",
      skills: ["grammar", "vocabulary"],
      title: "Practica: present perfect",
      intro: "Completa, elige y ordena para practicar.",
      activities: [
        {
          id: "a2wj-l2-a1", type: "cloze",
          prompt: "Completa: 'I have ___ as a waiter.' (work -> participio)",
          payload: { answer: "worked" },
          explain: "Participio regular: worked.",
        },
        {
          id: "a2wj-l2-a2", type: "cloze",
          prompt: "Completa: 'She ___ never worked in an office.' (has/have)",
          payload: { answer: "has" },
          explain: "Con she/he/it: 'has'.",
        },
        {
          id: "a2wj-l2-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "I haven't finished yet.",
            "I haven't finish yet.",
            "I don't finished yet.",
          ], answer: 0 },
          explain: "Present perfect negativo: haven't + participio (finished).",
        },
        {
          id: "a2wj-l2-a4", type: "word_bank",
          prompt: "Ordena la pregunta:",
          payload: { words: ["ever", "Have", "worked", "you", "here?"],
                     answer: ["Have", "you", "ever", "worked", "here?"] },
          explain: "Orden: Have + you + ever + worked + here?",
        },
        {
          id: "a2wj-l2-a5", type: "cloze",
          prompt: "Completa: 'She has ___ arrived.' (recien)",
          payload: { answer: "just" },
          explain: "'just' = recien / acabar de: has just arrived.",
        },
      ],
    },
    {
      id: "a2wj-l3",
      order: 4,
      phase: "produce",
      skills: ["writing", "grammar"],
      title: "Produccion: tus experiencias",
      intro: "Tarea real: construye frases sobre tu experiencia. Ordena cada frase.",
      activities: [
        {
          id: "a2wj-l3-a1", type: "word_bank",
          prompt: "Di que has trabajado en una tienda:",
          payload: { words: ["a", "I", "worked", "in", "have", "shop"],
                     answer: ["I", "have", "worked", "in", "a", "shop"] },
        },
        {
          id: "a2wj-l3-a2", type: "word_bank",
          prompt: "Di que nunca has trabajado en una oficina:",
          payload: { words: ["never", "I've", "in", "worked", "an", "office"],
                     answer: ["I've", "never", "worked", "in", "an", "office"] },
        },
        {
          id: "a2wj-l3-a3", type: "word_bank",
          prompt: "Pregunta si alguna vez fue a Londres:",
          payload: { words: ["ever", "Have", "to", "you", "been", "London?"],
                     answer: ["Have", "you", "ever", "been", "to", "London?"] },
        },
        {
          id: "a2wj-l3-a4", type: "multiple_choice",
          prompt: "Which word means 'todavia no' (in negatives)?",
          payload: { choices: ["already", "yet", "just"], answer: 1 },
        },
      ],
    },
  ],
};
