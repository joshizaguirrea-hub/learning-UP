/**
 * data/units/work-world-b2.js — Unidad tematica "The world of work" (B2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: reported speech (preguntas y ordenes).
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
    { id: "b2wk-11", term: "references", translation: "referencias", example: "Please send your references." },
    { id: "b2wk-12", term: "salary", translation: "salario", example: "The salary is competitive." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "b2wk-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: la entrevista",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - After the interview\n" +
          "After the interview, Marco told his friend about it. The manager had asked him why he wanted " +
          "the job and whether he could work under pressure. She also asked how many years of experience " +
          "he had. Then she told him to send his references and to wait for a call. Marco said he felt " +
          "confident. A week later, the company decided to hire him and offered a good salary. He had " +
          "negotiated well and finally got the promotion he wanted.\n\n" +
          "TEXT 2 - Office news\n" +
          "A: How did your meeting go? B: The manager asked me if I could lead the project. A: Wow! What " +
          "did you say? B: I said I was ready. She told me to prepare a plan and to meet the deadline. A: " +
          "That's a big achievement! B: Yes. She also asked whether my colleagues would help. I said they " +
          "would.",
        glossary: [
          { term: "asked why he wanted", translation: "pregunto por que queria" },
          { term: "asked whether he could", translation: "pregunto si podia" },
          { term: "told him to send / to wait", translation: "le dijo que enviara / esperara" },
          { term: "to hire / to resign", translation: "contratar / renunciar" },
          { term: "to negotiate / salary", translation: "negociar / salario" },
          { term: "workload / deadline", translation: "carga de trabajo / fecha limite" },
          { term: "references", translation: "referencias" },
          { term: "achievement / promotion", translation: "logro / ascenso" },
        ],
        keyPhrases: [
          "Fijate en preguntas reportadas: asked why he wanted, asked whether he could.",
          "Fijate en ordenes reportadas: told him to send, to wait.",
        ],
        check: [
          { prompt: "T1: What did the manager ask about?", choices: ["His hobbies", "Why he wanted the job", "His family"], answer: 1 },
          { prompt: "T1: What did she tell him to do?", choices: ["Send references and wait", "Start immediately", "Go home"], answer: 0 },
          { prompt: "T1: Did the company hire Marco?", choices: ["Yes", "No", "Not sure"], answer: 0 },
          { prompt: "T2: What did the manager ask B?", choices: ["If he could lead the project", "About his salary", "Nothing"], answer: 0 },
          { prompt: "T2: What did she tell B to do?", choices: ["Prepare a plan and meet the deadline", "Resign", "Take a holiday"], answer: 0 },
          { prompt: "T2: What did she also ask about?", choices: ["The colleagues' help", "The weather", "His car"], answer: 0 },
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
        { term: "to negotiate / salary", translation: "negociar / salario" },
        { term: "workload / deadline", translation: "carga de trabajo / fecha limite" },
        { term: "achievement / promotion", translation: "logro / ascenso" },
        { term: "references / colleague", translation: "referencias / colega" },
      ],
      activities: [
        {
          id: "b2wk-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "interview", right: "entrevista" },
            { left: "to hire", right: "contratar" },
            { left: "workload", right: "carga de trabajo" },
            { left: "salary", right: "salario" },
          ] },
        },
        {
          id: "b2wk-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to resign", right: "renunciar" },
            { left: "achievement", right: "logro" },
            { left: "promotion", right: "ascenso" },
            { left: "references", right: "referencias" },
          ] },
        },
        {
          id: "b2wk-vocab-a3", type: "cloze",
          prompt: "Completa: 'He ___ a higher salary.' (negociar -> pasado)",
          payload: { answer: "negotiated" },
          explain: "'To negotiate' = negociar; pasado: negotiated.",
        },
        {
          id: "b2wk-vocab-a4", type: "cloze",
          prompt: "Completa: 'It was a great ___.' (logro)",
          payload: { answer: "achievement" },
          explain: "'Achievement' = logro.",
        },
        {
          id: "b2wk-vocab-a5", type: "cloze",
          prompt: "Completa: 'Please send your ___.' (referencias)",
          payload: { answer: "references" },
          explain: "'References' = referencias.",
        },
        {
          id: "b2wk-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'renunciar'?",
          payload: { choices: ["to hire", "to resign", "to negotiate"], answer: 1 },
          explain: "'To resign' = renunciar.",
        },
        {
          id: "b2wk-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'ascenso'?",
          payload: { choices: ["promotion", "workload", "deadline"], answer: 0 },
          explain: "'Promotion' = ascenso.",
        },
        {
          id: "b2wk-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["deadline", "We", "the", "met"], answer: ["We", "met", "the", "deadline"] },
          explain: "'We met the deadline' = cumplimos la fecha limite.",
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
        explain: { tr: ["'\u00bfTrabajas?' -> Ella pregunt\u00f3 si yo trabajaba.", "'\u00a1Espera!' -> \u00c9l me dijo que esperara."] },
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
          explain: "En reportadas el orden es normal y retrocede el tiempo.",
        },
        {
          id: "b2wk-gram-a3", type: "multiple_choice",
          prompt: "'Send your references.' Report it:",
          payload: { choices: ["She told me send references.", "She told me to send references.", "She said me to send references."], answer: 1 },
          explain: "Ordenes: told + persona + to + base.",
        },
        {
          id: "b2wk-gram-a4", type: "cloze",
          prompt: "Completa: 'He asked how many years of experience I ___.' (have -> pasado)",
          payload: { answer: "had" },
          explain: "El presente retrocede: have -> had.",
        },
        {
          id: "b2wk-gram-a5", type: "multiple_choice",
          prompt: "Which verb is used for reported commands?",
          payload: { choices: ["said", "told", "asked"], answer: 1 },
          explain: "'told' + persona + to + base para ordenes.",
        },
        {
          id: "b2wk-gram-a6", type: "word_bank",
          prompt: "Ordena la orden reportada:",
          payload: { words: ["to", "He", "wait", "told", "me"], answer: ["He", "told", "me", "to", "wait"] },
          explain: "He + told + me + to + wait.",
        },
        {
          id: "b2wk-gram-a7", type: "word_bank",
          prompt: "Ordena la pregunta reportada:",
          payload: { words: ["if", "She", "worked", "I", "asked"], answer: ["She", "asked", "if", "I", "worked"] },
          explain: "She + asked + if + I + worked.",
        },
        {
          id: "b2wk-gram-a8", type: "cloze",
          prompt: "Completa: 'She asked ___ my colleagues would help.' (si)",
          payload: { answer: "whether", alt: ["if"] },
          explain: "'whether' o 'if' para preguntas de si/no.",
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
      intro: "Competencia de ESCRITURA. Construye frases reportando una entrevista.",
      activities: [
        {
          id: "b2wk-write-a1", type: "word_bank",
          prompt: "1. Reporta que ella pregunto si podias empezar:",
          payload: { words: ["asked", "She", "could", "if", "I", "start"], answer: ["She", "asked", "if", "I", "could", "start"] },
        },
        {
          id: "b2wk-write-a2", type: "word_bank",
          prompt: "2. Reporta que te dijo que esperaras una llamada:",
          payload: { words: ["to", "She", "for", "wait", "told", "me", "a", "call"], answer: ["She", "told", "me", "to", "wait", "for", "a", "call"] },
        },
        {
          id: "b2wk-write-a3", type: "word_bank",
          prompt: "3. Di que conseguiste el ascenso:",
          payload: { words: ["the", "I", "promotion", "got"], answer: ["I", "got", "the", "promotion"] },
        },
        {
          id: "b2wk-write-a4", type: "word_bank",
          prompt: "4. Reporta que pregunto donde trabajabas:",
          payload: { words: ["worked", "He", "where", "asked", "I"], answer: ["He", "asked", "where", "I", "worked"] },
        },
        {
          id: "b2wk-write-a5", type: "word_bank",
          prompt: "5. Di que negociaste un buen salario:",
          payload: { words: ["salary", "I", "a", "good", "negotiated"], answer: ["I", "negotiated", "a", "good", "salary"] },
        },
        {
          id: "b2wk-write-a6", type: "multiple_choice",
          prompt: "6. Which verb is used for reported commands?",
          payload: { choices: ["said", "told", "asked"], answer: 1 },
        },
        {
          id: "b2wk-write-a7", type: "multiple_choice",
          prompt: "7. Report 'Are you ready?':",
          payload: { choices: ["She asked if I was ready.", "She asked was I ready.", "She asked if I am ready."], answer: 0 },
        },
        {
          id: "b2wk-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'contratar'?",
          payload: { choices: ["to resign", "to hire", "to negotiate"], answer: 1 },
        },
      ],
    },
  ],
};
