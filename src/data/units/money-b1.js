/**
 * data/units/money-b1.js — Unidad tematica "Money & shopping" (B1).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: second conditional.
 */

export const MONEY_B1 = {
  id: "money-b1",
  language: "en",
  level: "B1",
  title: "Money & shopping",
  subtitle: "Hablar de dinero, compras y situaciones hipoteticas",

  cando: [
    "Puedo hablar de dinero, ahorro y compras.",
    "Puedo usar el segundo condicional (If + past, would).",
    "Puedo hablar de situaciones imaginarias.",
    "Puedo escribir sobre que haria con mas dinero.",
  ],

  vocab: [
    { id: "mon-1", term: "to save", translation: "ahorrar", example: "I try to save money." },
    { id: "mon-2", term: "to spend", translation: "gastar", example: "She spends too much." },
    { id: "mon-3", term: "to afford", translation: "poder pagar / permitirse", example: "I can't afford a car." },
    { id: "mon-4", term: "budget", translation: "presupuesto", example: "Stick to your budget." },
    { id: "mon-5", term: "to borrow", translation: "pedir prestado", example: "Can I borrow ten dollars?" },
    { id: "mon-6", term: "to lend", translation: "prestar", example: "I'll lend you the money." },
    { id: "mon-7", term: "discount", translation: "descuento", example: "There's a big discount today." },
    { id: "mon-8", term: "expensive", translation: "caro", example: "This phone is expensive." },
    { id: "mon-9", term: "to earn", translation: "ganar (dinero)", example: "He earns a good salary." },
    { id: "mon-10", term: "cash", translation: "efectivo", example: "I'll pay in cash." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "mon-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: si tuviera mas dinero",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "Emma is careful with money. She saves a little every month and follows a budget. She never " +
          "spends more than she earns. 'If I had a lot of money,' she says, 'I would travel around the " +
          "world and help my family.' She can't afford an expensive car, but she is happy. 'If I won " +
          "the lottery, I wouldn't stop working. I would start a small business.' Emma believes that " +
          "if you saved a little every day, you would feel safer.",
        keyPhrases: [
          "Fijate en el segundo condicional: If + past, would + base.",
          "Busca que haria Emma con mucho dinero.",
        ],
        check: [
          { prompt: "What does Emma do every month?", choices: ["Spends a lot", "Saves a little", "Borrows money"], answer: 1 },
          { prompt: "What would she do with a lot of money?", choices: ["Travel and help family", "Stop saving", "Buy nothing"], answer: 0 },
          { prompt: "If she won the lottery, would she stop working?", choices: ["Yes", "No", "Maybe"], answer: 1 },
          { prompt: "What can't Emma afford?", choices: ["Food", "An expensive car", "A budget"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "mon-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: dinero y compras",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "to save / to spend", translation: "ahorrar / gastar" },
        { term: "to afford", translation: "poder pagar" },
        { term: "budget", translation: "presupuesto" },
        { term: "to borrow / to lend", translation: "pedir prestado / prestar" },
        { term: "discount / cash", translation: "descuento / efectivo" },
        { term: "to earn", translation: "ganar dinero" },
      ],
      activities: [
        {
          id: "mon-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "to save", right: "ahorrar" },
            { left: "to spend", right: "gastar" },
            { left: "cash", right: "efectivo" },
          ] },
        },
        {
          id: "mon-vocab-a2", type: "cloze",
          prompt: "Completa: 'I can't ___ a car.' (permitirme)",
          payload: { answer: "afford" },
          explain: "'To afford' = poder pagar / permitirse.",
        },
        {
          id: "mon-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'prestar' (dar prestado)?",
          payload: { choices: ["to borrow", "to lend", "to save"], answer: 1 },
          explain: "'To lend' = prestar (tu das). 'To borrow' = pedir prestado.",
        },
        {
          id: "mon-vocab-a4", type: "cloze",
          prompt: "Completa: 'There's a big ___ today.' (descuento)",
          payload: { answer: "discount" },
          explain: "'Discount' = descuento.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "mon-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: segundo condicional",
      intro: "Competencia de GRAMATICA. Aprende el segundo condicional (situaciones imaginarias).",
      grammar: {
        title: "Second conditional",
        form: "If + past simple, subject + would + verbo base",
        examples: ["If I had money, I would travel.", "If I won, I wouldn't stop working."],
        mistakes: [
          { wrong: "If I would have money, I travel.", right: "If I had money, I would travel." },
          { wrong: "If I had money, I will travel.", right: "If I had money, I would travel." },
        ],
      },
      activities: [
        {
          id: "mon-gram-a1", type: "cloze",
          prompt: "Completa: 'If I had money, I ___ travel.' (would/will)",
          payload: { answer: "would" },
          explain: "Segundo condicional: la consecuencia lleva 'would'.",
        },
        {
          id: "mon-gram-a2", type: "cloze",
          prompt: "Completa: 'If I ___ the lottery, I would help.' (win -> pasado)",
          payload: { answer: "won" },
          explain: "El 'if' lleva pasado: won.",
        },
        {
          id: "mon-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct second conditional:",
          payload: { choices: ["If I was rich, I will travel.", "If I were rich, I would travel.", "If I am rich, I would travel."], answer: 1 },
          explain: "If + past (were), ... would + base.",
        },
        {
          id: "mon-gram-a4", type: "word_bank",
          prompt: "Ordena el condicional:",
          payload: { words: ["had", "If", "I", "money,", "travel", "I'd"], answer: ["If", "I", "had", "money,", "I'd", "travel"] },
          explain: "Orden: If + I + had + money, + I'd + travel.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "mon-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: que harias",
      intro: "Competencia de ESCRITURA. Construye frases hipoteticas. Ordena cada frase.",
      activities: [
        {
          id: "mon-write-a1", type: "word_bank",
          prompt: "Di que si tuvieras dinero viajarias:",
          payload: { words: ["had", "If", "I", "money,", "travel", "I'd"], answer: ["If", "I", "had", "money,", "I'd", "travel"] },
        },
        {
          id: "mon-write-a2", type: "word_bank",
          prompt: "Di que ahorras un poco cada mes:",
          payload: { words: ["month", "I", "a", "save", "little", "every"], answer: ["I", "save", "a", "little", "every", "month"] },
        },
        {
          id: "mon-write-a3", type: "word_bank",
          prompt: "Di que pagaras en efectivo:",
          payload: { words: ["cash", "I'll", "in", "pay"], answer: ["I'll", "pay", "in", "cash"] },
        },
        {
          id: "mon-write-a4", type: "multiple_choice",
          prompt: "Which is a second conditional?",
          payload: { choices: ["If it rains, I will stay.", "If I had time, I would help.", "I am going to save."], answer: 1 },
        },
      ],
    },
  ],
};
