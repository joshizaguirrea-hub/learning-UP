/**
 * data/units/a2-making-plans.js — Unidad tematica "Making plans" (A2).
 *
 * Datos PUROS. MODELO DESACOPLADO POR COMPETENCIA. Listening/Speaking con audio/IA.
 */

export const A2_MAKING_PLANS = {
  id: "a2-making-plans",
  language: "en",
  level: "A2",
  title: "Making plans",
  subtitle: "Hablar del futuro con going to y will",

  cando: [
    "Puedo hablar de planes con 'be going to'.",
    "Puedo usar 'will' para decisiones y ofertas del momento.",
    "Puedo hacer y aceptar invitaciones.",
    "Puedo hablar de mis intenciones para el futuro.",
  ],

  vocab: [
    { id: "a2mp-1", term: "plan", translation: "plan", example: "What are your plans?" },
    { id: "a2mp-2", term: "tomorrow", translation: "manana", example: "I'm going to study tomorrow." },
    { id: "a2mp-3", term: "next week", translation: "la proxima semana", example: "We'll travel next week." },
    { id: "a2mp-4", term: "to invite", translation: "invitar", example: "I'm going to invite my friends." },
    { id: "a2mp-5", term: "party", translation: "fiesta", example: "There's going to be a party." },
    { id: "a2mp-6", term: "free", translation: "libre / disponible", example: "Are you free on Friday?" },
    { id: "a2mp-7", term: "to meet", translation: "quedar / verse", example: "Let's meet at six." },
    { id: "a2mp-8", term: "busy", translation: "ocupado", example: "I'm busy this weekend." },
    { id: "a2mp-9", term: "idea", translation: "idea", example: "That's a great idea!" },
    { id: "a2mp-10", term: "to decide", translation: "decidir", example: "I'll decide later." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a2mp-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: planes para el finde",
      intro: "Competencia de LECTURA. Lee los planes y comprueba que entendiste.",
      content: {
        reading:
          "This weekend is going to be busy. On Saturday, I'm going to visit my grandparents. " +
          "In the evening, my friends and I are going to have a party. It's going to be fun! " +
          "On Sunday, I'm not sure yet. Maybe I'll stay at home, or maybe I'll go to the cinema. " +
          "If it rains, I'll read a book. What are your plans?",
        keyPhrases: [
          "Distingue planes (going to) de decisiones del momento (will).",
          "Busca el plan del sabado y las opciones del domingo.",
        ],
        check: [
          { prompt: "What is the plan for Saturday?", choices: ["Stay home", "Visit grandparents", "Work"], answer: 1 },
          { prompt: "What will happen if it rains on Sunday?", choices: ["Read a book", "Go out", "Study"], answer: 0 },
          { prompt: "What is on Saturday evening?", choices: ["A party", "A meeting", "A class"], answer: 0 },
          { prompt: "Is the person sure about Sunday?", choices: ["Yes", "No, not yet", "Yes, working"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "a2mp-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: planes e invitaciones",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "plan / idea", translation: "plan / idea" },
        { term: "tomorrow / next week", translation: "manana / la proxima semana" },
        { term: "to invite", translation: "invitar" },
        { term: "free / busy", translation: "libre / ocupado" },
        { term: "to meet", translation: "quedar / verse" },
        { term: "to decide", translation: "decidir" },
      ],
      activities: [
        {
          id: "a2mp-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "free", right: "disponible" },
            { left: "busy", right: "ocupado" },
            { left: "tomorrow", right: "manana" },
          ] },
        },
        {
          id: "a2mp-vocab-a2", type: "cloze",
          prompt: "Completa: 'That's a great ___!' (idea)",
          payload: { answer: "idea" },
          explain: "'That's a great idea!' = Es una gran idea!",
        },
        {
          id: "a2mp-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'invitar'?",
          payload: { choices: ["to decide", "to invite", "to meet"], answer: 1 },
          explain: "'To invite' = invitar.",
        },
        {
          id: "a2mp-vocab-a4", type: "cloze",
          prompt: "Completa: 'I'm ___ this weekend.' (ocupado)",
          payload: { answer: "busy" },
          explain: "'Busy' = ocupado.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "a2mp-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: going to / will",
      intro: "Competencia de GRAMATICA. Aprende la diferencia entre going to y will.",
      grammar: {
        title: "be going to / will",
        form: "am/is/are + going to + base · will + base",
        examples: ["I'm going to study tonight.", "I'll call you later."],
        mistakes: [
          { wrong: "I'm going to studying.", right: "I'm going to study." },
          { wrong: "I will to help you.", right: "I'll help you." },
        ],
      },
      activities: [
        {
          id: "a2mp-gram-a1", type: "cloze",
          prompt: "Completa: 'I'm going to ___ my friends.' (invitar)",
          payload: { answer: "invite" },
          explain: "'going to' + verbo base.",
        },
        {
          id: "a2mp-gram-a2", type: "cloze",
          prompt: "Completa: 'I ___ help you.' (oferta del momento -> will)",
          payload: { answer: "will", alt: ["'ll"] },
          explain: "Oferta del momento: 'I'll help you' (will).",
        },
        {
          id: "a2mp-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["She is going to studies.", "She is going to study.", "She going to study."], answer: 1 },
          explain: "'is going to' + verbo base.",
        },
        {
          id: "a2mp-gram-a4", type: "multiple_choice",
          prompt: "Which one is an offer at the moment of speaking?",
          payload: { choices: ["I'm going to travel next year.", "I'll carry that for you.", "I visit my aunt every week."], answer: 1 },
          explain: "Decision/oferta del momento = 'will'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "a2mp-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: haz planes",
      intro: "Competencia de ESCRITURA. Construye frases sobre tus planes. Ordena cada frase.",
      activities: [
        {
          id: "a2mp-write-a1", type: "word_bank",
          prompt: "Di que vas a estudiar manana:",
          payload: { words: ["study", "I'm", "to", "going", "tomorrow"], answer: ["I'm", "going", "to", "study", "tomorrow"] },
        },
        {
          id: "a2mp-write-a2", type: "word_bank",
          prompt: "Ofrece traer comida:",
          payload: { words: ["bring", "I'll", "food", "some"], answer: ["I'll", "bring", "some", "food"] },
        },
        {
          id: "a2mp-write-a3", type: "word_bank",
          prompt: "Pregunta si estan libres el sabado:",
          payload: { words: ["free", "Are", "Saturday?", "you", "on"], answer: ["Are", "you", "free", "on", "Saturday?"] },
        },
        {
          id: "a2mp-write-a4", type: "multiple_choice",
          prompt: "Which expresses a plan already decided?",
          payload: { choices: ["I'll maybe go.", "I'm going to visit my aunt.", "I go tomorrow."], answer: 1 },
        },
      ],
    },
  ],
};
