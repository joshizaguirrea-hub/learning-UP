/**
 * data/units/money-b1.js — Unidad tematica "Money & shopping" (B1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: second conditional.
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
    { id: "mon-11", term: "to waste", translation: "malgastar", example: "Don't waste your money." },
    { id: "mon-12", term: "bargain", translation: "ganga", example: "This jacket is a real bargain." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "mon-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: si tuviera mas dinero",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Emma and money\n" +
          "Emma is careful with money. She saves a little every month and follows a budget. She never " +
          "spends more than she earns. 'If I had a lot of money,' she says, 'I would travel around the " +
          "world and help my family.' She can't afford an expensive car, but she is happy. 'If I won the " +
          "lottery, I wouldn't stop working. I would start a small business.'\n\n" +
          "TEXT 2 - Shopping smart\n" +
          "A: That jacket is a real bargain! There's a 50% discount. B: Nice! But I don't want to waste " +
          "money. A: If I were you, I would buy it. It's cheap and good quality. B: OK, I'll pay in cash. " +
          "A: If you spent less on coffee, you'd save a lot! B: True. I should make a budget.",
        glossary: [
          { term: "to save / to spend", translation: "ahorrar / gastar" },
          { term: "If I had..., I would...", translation: "Si tuviera..., yo..." },
          { term: "can't afford", translation: "no puedo permitirme" },
          { term: "budget / bargain", translation: "presupuesto / ganga" },
          { term: "discount / cash", translation: "descuento / efectivo" },
          { term: "to waste money", translation: "malgastar dinero" },
          { term: "If I were you", translation: "si yo fuera tu" },
          { term: "good quality", translation: "buena calidad" },
        ],
        keyPhrases: [
          "Fijate en el segundo condicional: If + past, would + base.",
          "Busca que haria Emma con mucho dinero.",
        ],
        check: [
          { prompt: "T1: What does Emma do every month?", choices: ["Spends a lot", "Saves a little", "Borrows money"], answer: 1 },
          { prompt: "T1: What would she do with a lot of money?", choices: ["Travel and help family", "Stop saving", "Buy nothing"], answer: 0 },
          { prompt: "T1: If she won the lottery, would she stop working?", choices: ["Yes", "No", "Maybe"], answer: 1 },
          { prompt: "T2: Why is the jacket a bargain?", choices: ["It's new", "50% discount", "It's rare"], answer: 1 },
          { prompt: "T2: How will B pay?", choices: ["By card", "In cash", "Later"], answer: 1 },
          { prompt: "T2: What should B make?", choices: ["A budget", "A cake", "A call"], answer: 0 },
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
        { term: "to afford / to waste", translation: "poder pagar / malgastar" },
        { term: "budget / bargain", translation: "presupuesto / ganga" },
        { term: "to borrow / to lend", translation: "pedir prestado / prestar" },
        { term: "discount / cash", translation: "descuento / efectivo" },
        { term: "to earn / expensive", translation: "ganar dinero / caro" },
      ],
      activities: [
        {
          id: "mon-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "to save", right: "ahorrar" },
            { left: "to spend", right: "gastar" },
            { left: "cash", right: "efectivo" },
            { left: "budget", right: "presupuesto" },
          ] },
        },
        {
          id: "mon-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to borrow", right: "pedir prestado" },
            { left: "to lend", right: "prestar" },
            { left: "discount", right: "descuento" },
            { left: "bargain", right: "ganga" },
          ] },
        },
        {
          id: "mon-vocab-a3", type: "cloze",
          prompt: "Completa: 'I can't ___ a car.' (permitirme)",
          payload: { answer: "afford" },
          explain: "'To afford' = poder pagar / permitirse.",
        },
        {
          id: "mon-vocab-a4", type: "cloze",
          prompt: "Completa: 'Don't ___ your money.' (malgastar)",
          payload: { answer: "waste" },
          explain: "'To waste' = malgastar.",
        },
        {
          id: "mon-vocab-a5", type: "cloze",
          prompt: "Completa: 'This jacket is a real ___.' (ganga)",
          payload: { answer: "bargain" },
          explain: "'Bargain' = ganga.",
        },
        {
          id: "mon-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'prestar' (dar prestado)?",
          payload: { choices: ["to borrow", "to lend", "to save"], answer: 1 },
          explain: "'To lend' = prestar (tu das). 'To borrow' = pedir prestado.",
        },
        {
          id: "mon-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'descuento'?",
          payload: { choices: ["discount", "budget", "cash"], answer: 0 },
          explain: "'Discount' = descuento.",
        },
        {
          id: "mon-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["cash", "I'll", "in", "pay"], answer: ["I'll", "pay", "in", "cash"] },
          explain: "'I'll pay in cash' = pagare en efectivo.",
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
        desc: "Sirve para imaginar cosas que hoy NO son reales, y decir qu\u00e9 pasar\u00eda si ocurrieran. Ejemplo: 'Si tuviera dinero, viajar\u00eda'.",
        form: "If + past simple, subject + would + verbo base",
        explain: {
          tr: [
            "Si tuviera dinero, viajar\u00eda.",
            "Si ganara, no dejar\u00eda de trabajar.",
            "Si yo fuera t\u00fa, lo comprar\u00eda.",
          ],
          parts: [
            { label: "If + past simple", fn: "La condici\u00f3n: la situaci\u00f3n que imaginamos. El verbo va en pasado, aunque hablemos del presente o del futuro. No es algo real, solo lo suponemos." },
            { label: "subject + would + verbo base", fn: "El resultado: lo que pasar\u00eda si esa condici\u00f3n se cumpliera. Es la consecuencia imaginaria, la que solo ocurrir\u00eda en ese caso." },
          ],
        },
        examples: ["If I had money, I would travel.", "If I won, I wouldn't stop working.", "If I were you, I'd buy it."],
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
          id: "mon-gram-a3", type: "cloze",
          prompt: "Completa: 'If I ___ you, I'd buy it.' (were/was)",
          payload: { answer: "were" },
          explain: "'If I were you' es la forma correcta (consejo).",
        },
        {
          id: "mon-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct second conditional:",
          payload: { choices: ["If I was rich, I will travel.", "If I were rich, I would travel.", "If I am rich, I would travel."], answer: 1 },
          explain: "If + past (were), ... would + base.",
        },
        {
          id: "mon-gram-a5", type: "multiple_choice",
          prompt: "Which is a second conditional?",
          payload: { choices: ["If it rains, I will stay.", "If I had time, I would help.", "I am going to save."], answer: 1 },
          explain: "If + past, ... would + base.",
        },
        {
          id: "mon-gram-a6", type: "word_bank",
          prompt: "Ordena el condicional:",
          payload: { words: ["had", "If", "I", "money,", "travel", "I'd"], answer: ["If", "I", "had", "money,", "I'd", "travel"] },
          explain: "If + I + had + money, + I'd + travel.",
        },
        {
          id: "mon-gram-a7", type: "word_bank",
          prompt: "Ordena el consejo hipotetico:",
          payload: { words: ["you,", "If", "I", "buy", "were", "it", "I'd"], answer: ["If", "I", "were", "you,", "I'd", "buy", "it"] },
          explain: "If + I + were + you, + I'd + buy + it.",
        },
        {
          id: "mon-gram-a8", type: "cloze",
          prompt: "Completa: 'If you spent less, you ___ save more.' (would/will)",
          payload: { answer: "would", alt: ["'d"] },
          explain: "Segundo condicional: would + base.",
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
      intro: "Competencia de ESCRITURA. Construye frases hipoteticas, frase por frase.",
      activities: [
        {
          id: "mon-write-a1", type: "word_bank",
          prompt: "1. Di que si tuvieras dinero viajarias:",
          payload: { words: ["had", "If", "I", "money,", "travel", "I'd"], answer: ["If", "I", "had", "money,", "I'd", "travel"] },
        },
        {
          id: "mon-write-a2", type: "word_bank",
          prompt: "2. Di que ahorras un poco cada mes:",
          payload: { words: ["month", "I", "a", "save", "little", "every"], answer: ["I", "save", "a", "little", "every", "month"] },
        },
        {
          id: "mon-write-a3", type: "word_bank",
          prompt: "3. Di que pagaras en efectivo:",
          payload: { words: ["cash", "I'll", "in", "pay"], answer: ["I'll", "pay", "in", "cash"] },
        },
        {
          id: "mon-write-a4", type: "word_bank",
          prompt: "4. Da un consejo hipotetico:",
          payload: { words: ["you,", "If", "I", "buy", "were", "it", "I'd"], answer: ["If", "I", "were", "you,", "I'd", "buy", "it"] },
        },
        {
          id: "mon-write-a5", type: "word_bank",
          prompt: "5. Di que no quieres malgastar dinero:",
          payload: { words: ["money", "I", "waste", "don't", "to", "want"], answer: ["I", "don't", "want", "to", "waste", "money"] },
        },
        {
          id: "mon-write-a6", type: "multiple_choice",
          prompt: "6. Which is a second conditional?",
          payload: { choices: ["If it rains, I will stay.", "If I had time, I would help.", "I am going to save."], answer: 1 },
        },
        {
          id: "mon-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["If I was you, I would...", "If I were you, I would...", "If I am you, I will..."], answer: 1 },
        },
        {
          id: "mon-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'permitirse (pagar)'?",
          payload: { choices: ["to afford", "to waste", "to spend"], answer: 0 },
        },
      ],
    },
  ],
};
