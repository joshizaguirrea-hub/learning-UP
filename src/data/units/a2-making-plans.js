/**
 * data/units/a2-making-plans.js — Unidad tematica "Making plans" (A2).
 *
 * Datos PUROS. Futuro con 'be going to' (planes) y 'will' (decisiones/ofertas).
 * Ciclo PPP del estandar de calidad (ver PLAN-DE-ESTUDIO.md).
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
    {
      id: "a2mp-l0",
      order: 1,
      phase: "learn",
      skills: ["reading", "vocabulary"],
      title: "Aprende: planes para el finde",
      intro:
        "Lee los planes y estudia 'going to' y 'will'. Aqui solo se lee y se aprende.",
      teachesVocab: true,
      content: {
        reading:
          "This weekend is going to be busy. On Saturday, I'm going to visit my grandparents. " +
          "In the evening, my friends and I are going to have a party. It's going to be fun! " +
          "On Sunday, I'm not sure yet. Maybe I'll stay at home, or maybe I'll go to the cinema. " +
          "If it rains, I'll read a book. What are your plans?",
        glossary: [
          { term: "going to visit", translation: "voy a visitar (plan)" },
          { term: "going to have", translation: "vamos a tener (plan)" },
          { term: "I'll stay", translation: "me quedare (decision del momento)" },
          { term: "I'll go", translation: "ire" },
          { term: "not sure yet", translation: "aun no estoy seguro" },
          { term: "maybe", translation: "quizas" },
        ],
        keyPhrases: [
          "I'm going to... (Voy a... plan decidido)",
          "I'll... (decision del momento / oferta)",
          "Are you free on...? (Estas libre el...?)",
          "That's a great idea! (Es una gran idea!)",
        ],
        note:
          "'be going to' = planes YA decididos ('I'm going to visit'). 'will' = decisiones del momento, " +
          "ofertas y predicciones ('I'll help you', 'It'll rain'). Ambos hablan del futuro.",
        grammar: {
          title: "be going to / will",
          form: "am/is/are + going to + base · will + base",
          examples: [
            "I'm going to study tonight.",
            "I'll call you later.",
          ],
          mistakes: [
            { wrong: "I'm going to studying.", right: "I'm going to study." },
            { wrong: "I will to help you.", right: "I'll help you." },
          ],
        },
        check: [
          { prompt: "What is the plan for Saturday?", choices: ["Stay home", "Visit grandparents", "Work"], answer: 1 },
          { prompt: "What will happen if it rains on Sunday?", choices: ["Read a book", "Go out", "Study"], answer: 0 },
        ],
      },
      activities: [],
    },
    {
      id: "a2mp-l1",
      order: 2,
      phase: "present",
      skills: ["grammar", "vocabulary"],
      title: "Presentacion: invitar y aceptar",
      intro: "Usamos 'going to' para planes y 'will' para ofertas. Lee el dialogo.",
      dialogue: [
        "A: Are you free on Saturday? We're going to have a party.",
        "B: Sounds great! I'll bring some food.",
        "A: Perfect. It's going to be fun!",
        "B: I'm sure it will!",
      ],
      activities: [
        {
          id: "a2mp-l1-a1", type: "multiple_choice",
          prompt: "Which expresses a plan already decided?",
          payload: { choices: ["I'll maybe go.", "I'm going to visit my aunt.", "I go tomorrow."], answer: 1 },
          explain: "'be going to' = plan decidido.",
        },
        {
          id: "a2mp-l1-a2", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "free", right: "disponible" },
            { left: "busy", right: "ocupado" },
            { left: "tomorrow", right: "manana" },
          ] },
        },
      ],
    },
    {
      id: "a2mp-l2",
      order: 3,
      phase: "practice",
      skills: ["grammar", "vocabulary"],
      title: "Practica: going to y will",
      intro: "Completa, elige y ordena para practicar.",
      activities: [
        {
          id: "a2mp-l2-a1", type: "cloze",
          prompt: "Completa: 'I'm going to ___ my friends.' (invitar)",
          payload: { answer: "invite" },
          explain: "'going to' + verbo base: 'going to invite'.",
        },
        {
          id: "a2mp-l2-a2", type: "cloze",
          prompt: "Completa: 'I ___ help you.' (oferta del momento -> contraccion de will)",
          payload: { answer: "will", alt: ["'ll"] },
          explain: "Oferta del momento: 'I'll help you' (will).",
        },
        {
          id: "a2mp-l2-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "She is going to studies.",
            "She is going to study.",
            "She going to study.",
          ], answer: 1 },
          explain: "'is going to' + verbo base: 'going to study'.",
        },
        {
          id: "a2mp-l2-a4", type: "word_bank",
          prompt: "Ordena la pregunta:",
          payload: { words: ["free", "Are", "Friday?", "you", "on"],
                     answer: ["Are", "you", "free", "on", "Friday?"] },
          explain: "Orden: Are + you + free + on + Friday?",
        },
        {
          id: "a2mp-l2-a5", type: "cloze",
          prompt: "Completa: 'That's a great ___!' (idea)",
          payload: { answer: "idea" },
          explain: "'That's a great idea!' = Es una gran idea!",
        },
      ],
    },
    {
      id: "a2mp-l3",
      order: 4,
      phase: "produce",
      skills: ["writing", "grammar"],
      title: "Produccion: haz planes",
      intro: "Tarea real: construye frases para hablar de tus planes. Ordena cada frase.",
      activities: [
        {
          id: "a2mp-l3-a1", type: "word_bank",
          prompt: "Di que vas a estudiar manana:",
          payload: { words: ["study", "I'm", "to", "going", "tomorrow"],
                     answer: ["I'm", "going", "to", "study", "tomorrow"] },
        },
        {
          id: "a2mp-l3-a2", type: "word_bank",
          prompt: "Ofrece traer comida:",
          payload: { words: ["bring", "I'll", "food", "some"],
                     answer: ["I'll", "bring", "some", "food"] },
        },
        {
          id: "a2mp-l3-a3", type: "word_bank",
          prompt: "Pregunta si estan libres el sabado:",
          payload: { words: ["free", "Are", "Saturday?", "you", "on"],
                     answer: ["Are", "you", "free", "on", "Saturday?"] },
        },
        {
          id: "a2mp-l3-a4", type: "multiple_choice",
          prompt: "Which one is an offer at the moment of speaking?",
          payload: { choices: ["I'm going to travel next year.", "I'll carry that for you.", "I visit my aunt every week."], answer: 1 },
        },
      ],
    },
  ],
};
