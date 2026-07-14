/**
 * data/units/a2-making-plans.js — Unidad tematica "Making plans" (A2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Listening/Speaking con audio/IA.
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
    { id: "a2mp-11", term: "to celebrate", translation: "celebrar", example: "We're going to celebrate." },
    { id: "a2mp-12", term: "weekend", translation: "fin de semana", example: "This weekend is going to be busy." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a2mp-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: planes para el finde",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - A busy weekend\n" +
          "This weekend is going to be busy. On Saturday, I'm going to visit my grandparents. In the " +
          "evening, my friends and I are going to have a party. It's going to be fun! On Sunday, I'm not " +
          "sure yet. Maybe I'll stay at home, or maybe I'll go to the cinema. If it rains, I'll read a " +
          "book. What are your plans?\n\n" +
          "TEXT 2 - An invitation\n" +
          "A: Are you free on Saturday? We're going to celebrate my birthday. B: Sounds great! I'll bring " +
          "some food. A: Perfect. It's going to be at my house. B: What time? A: Around eight. B: I'll be " +
          "there! Should I invite Sara too? A: Yes, good idea!",
        glossary: [
          { term: "going to visit", translation: "voy a visitar (plan)" },
          { term: "I'll stay / go", translation: "me quedare / ire" },
          { term: "not sure yet", translation: "aun no estoy seguro" },
          { term: "to celebrate", translation: "celebrar" },
          { term: "free / busy", translation: "libre / ocupado" },
          { term: "Sounds great!", translation: "suena genial!" },
          { term: "I'll be there!", translation: "alli estare!" },
          { term: "good idea", translation: "buena idea" },
        ],
        keyPhrases: [
          "Distingue planes (going to) de decisiones del momento (will).",
          "Busca los planes de cada dia y la invitacion.",
        ],
        check: [
          { prompt: "T1: What is the plan for Saturday?", choices: ["Stay home", "Visit grandparents", "Work"], answer: 1 },
          { prompt: "T1: What will happen if it rains on Sunday?", choices: ["Read a book", "Go out", "Study"], answer: 0 },
          { prompt: "T1: Is the person sure about Sunday?", choices: ["Yes", "No, not yet", "Yes, working"], answer: 1 },
          { prompt: "T2: What are they going to celebrate?", choices: ["A birthday", "A wedding", "New Year"], answer: 0 },
          { prompt: "T2: What will B bring?", choices: ["Some food", "Music", "Drinks"], answer: 0 },
          { prompt: "T2: What time is the party?", choices: ["Around six", "Around eight", "Around ten"], answer: 1 },
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
        { term: "to invite / to celebrate", translation: "invitar / celebrar" },
        { term: "free / busy", translation: "libre / ocupado" },
        { term: "to meet / to decide", translation: "quedar / decidir" },
        { term: "party / weekend", translation: "fiesta / fin de semana" },
      ],
      activities: [
        {
          id: "a2mp-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "free", right: "disponible" },
            { left: "busy", right: "ocupado" },
            { left: "tomorrow", right: "manana" },
            { left: "party", right: "fiesta" },
          ] },
        },
        {
          id: "a2mp-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to invite", right: "invitar" },
            { left: "to celebrate", right: "celebrar" },
            { left: "to decide", right: "decidir" },
            { left: "idea", right: "idea" },
          ] },
        },
        {
          id: "a2mp-vocab-a3", type: "cloze",
          prompt: "Completa: 'That's a great ___!' (idea)",
          payload: { answer: "idea" },
          explain: "'That's a great idea!' = Es una gran idea!",
        },
        {
          id: "a2mp-vocab-a4", type: "cloze",
          prompt: "Completa: 'We're going to ___ my birthday.' (celebrar)",
          payload: { answer: "celebrate" },
          explain: "'To celebrate' = celebrar.",
        },
        {
          id: "a2mp-vocab-a5", type: "cloze",
          prompt: "Completa: 'I'm ___ this weekend.' (ocupado)",
          payload: { answer: "busy" },
          explain: "'Busy' = ocupado.",
        },
        {
          id: "a2mp-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'invitar'?",
          payload: { choices: ["to decide", "to invite", "to meet"], answer: 1 },
          explain: "'To invite' = invitar.",
        },
        {
          id: "a2mp-vocab-a7", type: "multiple_choice",
          prompt: "You are available. You are...",
          payload: { choices: ["busy", "free", "tired"], answer: 1 },
          explain: "'Free' = libre / disponible.",
        },
        {
          id: "a2mp-vocab-a8", type: "word_bank",
          prompt: "Ordena la sugerencia:",
          payload: { words: ["at", "meet", "Let's", "six"], answer: ["Let's", "meet", "at", "six"] },
          explain: "'Let's meet at six' = quedemos a las seis.",
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
        form: "am/is/are + going to + base (plan) · will + base (decision del momento / oferta)",
        desc: "Sirve para hablar del futuro: planes que ya tienes y decisiones del momento.",
        rule: "'be going to + base' para planes e intenciones decididas de antes (I'm going to travel). 'will + base' para decisiones del momento, ofertas y predicciones (I'll help you).",
        examples: ["I'm going to study tonight.", "I'll call you later.", "It's going to be fun."],
        explain: { tr: ["Voy a estudiar esta noche.", "Te llamar\u00e9 m\u00e1s tarde.", "Va a ser divertido."] },
        mistakes: [
          { wrong: "I'm going to studying.", right: "I'm going to study." },
          { wrong: "I will to help you.", right: "I'll help you." },
          { wrong: "She going to travel.", right: "She is going to travel." },
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
          id: "a2mp-gram-a3", type: "cloze",
          prompt: "Completa: 'She ___ going to travel.' (is/are)",
          payload: { answer: "is" },
          explain: "Con 'she': is going to.",
        },
        {
          id: "a2mp-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["She is going to studies.", "She is going to study.", "She going to study."], answer: 1 },
          explain: "'is going to' + verbo base.",
        },
        {
          id: "a2mp-gram-a5", type: "multiple_choice",
          prompt: "Which one is an offer at the moment of speaking?",
          payload: { choices: ["I'm going to travel next year.", "I'll carry that for you.", "I visit my aunt every week."], answer: 1 },
          explain: "Decision/oferta del momento = 'will'.",
        },
        {
          id: "a2mp-gram-a6", type: "multiple_choice",
          prompt: "Which expresses a plan already decided?",
          payload: { choices: ["I'll maybe go.", "I'm going to visit my aunt.", "I go tomorrow."], answer: 1 },
          explain: "'be going to' = plan decidido.",
        },
        {
          id: "a2mp-gram-a7", type: "word_bank",
          prompt: "Ordena la pregunta:",
          payload: { words: ["free", "Are", "Friday?", "you", "on"], answer: ["Are", "you", "free", "on", "Friday?"] },
          explain: "Are + you + free + on + Friday?",
        },
        {
          id: "a2mp-gram-a8", type: "word_bank",
          prompt: "Ordena el plan:",
          payload: { words: ["study", "I'm", "to", "going", "tomorrow"], answer: ["I'm", "going", "to", "study", "tomorrow"] },
          explain: "I'm + going to + study + tomorrow.",
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
      intro: "Competencia de ESCRITURA. Construye planes e invitaciones, frase por frase.",
      activities: [
        {
          id: "a2mp-write-a1", type: "word_bank",
          prompt: "1. Di que vas a estudiar manana:",
          payload: { words: ["study", "I'm", "to", "going", "tomorrow"], answer: ["I'm", "going", "to", "study", "tomorrow"] },
        },
        {
          id: "a2mp-write-a2", type: "word_bank",
          prompt: "2. Ofrece traer comida:",
          payload: { words: ["bring", "I'll", "food", "some"], answer: ["I'll", "bring", "some", "food"] },
        },
        {
          id: "a2mp-write-a3", type: "word_bank",
          prompt: "3. Pregunta si estan libres el sabado:",
          payload: { words: ["free", "Are", "Saturday?", "you", "on"], answer: ["Are", "you", "free", "on", "Saturday?"] },
        },
        {
          id: "a2mp-write-a4", type: "word_bank",
          prompt: "4. Invita a alguien a una fiesta:",
          payload: { words: ["to", "We're", "a", "have", "going", "party"], answer: ["We're", "going", "to", "have", "a", "party"] },
        },
        {
          id: "a2mp-write-a5", type: "word_bank",
          prompt: "5. Sugiere quedar a las seis:",
          payload: { words: ["at", "meet", "Let's", "six"], answer: ["Let's", "meet", "at", "six"] },
        },
        {
          id: "a2mp-write-a6", type: "multiple_choice",
          prompt: "6. Which expresses a plan already decided?",
          payload: { choices: ["I'll maybe go.", "I'm going to visit my aunt.", "I go tomorrow."], answer: 1 },
        },
        {
          id: "a2mp-write-a7", type: "multiple_choice",
          prompt: "7. Someone invites you and you accept happily:",
          payload: { choices: ["Sounds great! I'll be there.", "No way.", "I don't know you."], answer: 0 },
        },
        {
          id: "a2mp-write-a8", type: "multiple_choice",
          prompt: "8. Choose the correct one:",
          payload: { choices: ["It's going to be fun.", "It's going be fun.", "It going to be fun."], answer: 0 },
        },
      ],
    },
  ],
};
