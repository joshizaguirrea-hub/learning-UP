/**
 * data/units/work-world-b2.js — Unidad tematica "The world of work" (B2).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: reported speech (preguntas y ordenes).
 */

export const WORK_WORLD_B2 = {
  id: "work-world-b2",
  language: "en",
  level: "B2",
  title: "The world of work",
  subtitle: "Entrevistas, negociacion y reportar lo que se dijo",

  cando: [
    "Puedo hablar del mundo laboral con vocabulario preciso.",
    "Puedo reportar preguntas y ordenes (reported speech avanzado).",
    "Puedo relatar una entrevista o reunion.",
    "Puedo escribir un resumen profesional de una conversacion.",
  ],

  vocab: [
    { id: "b2wk-1", term: "interview", translation: "entrevista", example: "The interview went well." },
    { id: "b2wk-2", term: "candidate", translation: "candidato", example: "She was the best candidate." },
    { id: "b2wk-3", term: "to hire", translation: "contratar", example: "They decided to hire him." },
    { id: "b2wk-4", term: "deadline", translation: "fecha limite", example: "We met the deadline." },
    { id: "b2wk-5", term: "to negotiate", translation: "negociar", example: "He negotiated a higher salary." },
    { id: "b2wk-6", term: "workload", translation: "carga de trabajo", example: "My workload is heavy." },
    { id: "b2wk-7", term: "colleague", translation: "colega", example: "My colleagues are supportive." },
    { id: "b2wk-8", term: "achievement", translation: "logro", example: "It was a great achievement." },
    { id: "b2wk-9", term: "to resign", translation: "renunciar", example: "She resigned last week." },
    { id: "b2wk-10", term: "promotion", translation: "ascenso", example: "He earned a promotion." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "b2wk-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: la entrevista",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "After the interview, Marco told his friend about it. The manager had asked him why he " +
          "wanted the job and whether he could work under pressure. She also asked how many years of " +
          "experience he had. Then she told him to send his references and to wait for a call. Marco " +
          "said he felt confident. A week later, the company decided to hire him and offered a good " +
          "salary. He had negotiated well and finally got the promotion he wanted.",
        keyPhrases: [
          "Fijate en preguntas reportadas: asked why he wanted, asked whether he could.",
          "Fijate en ordenes reportadas: told him to send, to wait.",
        ],
        check: [
          { prompt: "What did the manager ask about?", choices: ["His hobbies", "Why he wanted the job", "His family"], answer: 1 },
          { prompt: "What did she tell him to do?", choices: ["Send references and wait", "Start immediately", "Go home"], answer: 0 },
          { prompt: "Did the company hire Marco?", choices: ["Yes", "No", "Not sure"], answer: 0 },
          { prompt: "What did Marco do well?", choices: ["He negotiated", "He arrived late", "He refused"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "b2wk-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: el mundo laboral",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "interview / candidate", translation: "entrevista / candidato" },
        { term: "to hire / to resign", translation: "contratar / renunciar" },
        { term: "to negotiate", translation: "negociar" },
        { term: "workload", translation: "carga de trabajo" },
        { term: "achievement / promotion", translation: "logro / ascenso" },
        { term: "deadline / colleague", translation: "fecha limite / colega" },
      ],
      activities: [
        {
          id: "b2wk-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "interview", right: "entrevista" },
            { left: "to hire", right: "contratar" },
            { left: "workload", right: "carga de trabajo" },
          ] },
        },
        {
          id: "b2wk-vocab-a2", type: "cloze",
          prompt: "Completa: 'He ___ a higher salary.' (negociar -> pasado)",
          payload: { answer: "negotiated" },
          explain: "'To negotiate' = negociar; pasado: negotiated.",
        },
        {
          id: "b2wk-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'renunciar'?",
          payload: { choices: ["to hire", "to resign", "to negotiate"], answer: 1 },
          explain: "'To resign' = renunciar.",
        },
        {
          id: "b2wk-vocab-a4", type: "cloze",
          prompt: "Completa: 'It was a great ___.' (logro)",
          payload: { answer: "achievement" },
          explain: "'Achievement' = logro.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "b2wk-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: reportar preguntas y ordenes",
      intro: "Competencia de GRAMATICA. Aprende a reportar preguntas y ordenes.",
      grammar: {
        title: "Reported questions & commands",
        form: "pregunta: asked + (if/whether/wh-) + sujeto + verbo · orden: told + persona + to + base",
        examples: ["'Do you work?' -> She asked if I worked.", "'Wait!' -> He told me to wait."],
        mistakes: [
          { wrong: "She asked why did I want it.", right: "She asked why I wanted it." },
          { wrong: "He told to wait me.", right: "He told me to wait." },
        ],
      },
      activities: [
        {
          id: "b2wk-gram-a1", type: "cloze",
          prompt: "Completa: 'She asked ___ I could work under pressure.' (si)",
          payload: { answer: "if", alt: ["whether"] },
          explain: "Preguntas de si/no reportadas: 'if' o 'whether'.",
        },
        {
          id: "b2wk-gram-a2", type: "multiple_choice",
          prompt: "'Where do you live?' Report it:",
          payload: { choices: ["She asked where do I live.", "She asked where I lived.", "She asked where did I live."], answer: 1 },
          explain: "En reportadas el orden es normal (sujeto+verbo) y retrocede el tiempo.",
        },
        {
          id: "b2wk-gram-a3", type: "multiple_choice",
          prompt: "'Send your references.' Report it:",
          payload: { choices: ["She told me send references.", "She told me to send references.", "She said me to send references."], answer: 1 },
          explain: "Ordenes: told + persona + to + base.",
        },
        {
          id: "b2wk-gram-a4", type: "word_bank",
          prompt: "Ordena la orden reportada:",
          payload: { words: ["to", "He", "wait", "told", "me"], answer: ["He", "told", "me", "to", "wait"] },
          explain: "Orden: He + told + me + to + wait.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "b2wk-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: resume una entrevista",
      intro: "Competencia de ESCRITURA. Construye frases reportando una entrevista. Ordena cada frase.",
      activities: [
        {
          id: "b2wk-write-a1", type: "word_bank",
          prompt: "Reporta que ella pregunto si podias empezar:",
          payload: { words: ["asked", "She", "could", "if", "I", "start"], answer: ["She", "asked", "if", "I", "could", "start"] },
        },
        {
          id: "b2wk-write-a2", type: "word_bank",
          prompt: "Reporta que te dijo que esperaras una llamada:",
          payload: { words: ["to", "She", "for", "wait", "told", "me", "a", "call"], answer: ["She", "told", "me", "to", "wait", "for", "a", "call"] },
        },
        {
          id: "b2wk-write-a3", type: "word_bank",
          prompt: "Di que conseguiste el ascenso:",
          payload: { words: ["the", "I", "promotion", "got"], answer: ["I", "got", "the", "promotion"] },
        },
        {
          id: "b2wk-write-a4", type: "multiple_choice",
          prompt: "Which verb is used for reported commands?",
          payload: { choices: ["said", "told", "asked"], answer: 1 },
        },
      ],
    },
  ],
};
