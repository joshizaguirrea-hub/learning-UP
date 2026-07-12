/**
 * data/units/economy-b2.js — Unidad tematica "Money & economy" (B2).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: narrative tenses (past perfect continuous).
 */

export const ECONOMY_B2 = {
  id: "economy-b2",
  language: "en",
  level: "B2",
  title: "Money & economy",
  subtitle: "Hablar de economia y narrar con tiempos del pasado",

  cando: [
    "Puedo hablar de economia, ahorro e inversion.",
    "Puedo narrar usando past perfect y past perfect continuous.",
    "Puedo ordenar eventos del pasado con claridad.",
    "Puedo escribir una narracion de causas y consecuencias.",
  ],

  vocab: [
    { id: "b2eco-1", term: "economy", translation: "economia", example: "The economy is growing." },
    { id: "b2eco-2", term: "to invest", translation: "invertir", example: "She invested in stocks." },
    { id: "b2eco-3", term: "profit", translation: "ganancia", example: "The company made a profit." },
    { id: "b2eco-4", term: "debt", translation: "deuda", example: "They paid off their debt." },
    { id: "b2eco-5", term: "to afford", translation: "poder pagar", example: "We couldn't afford it." },
    { id: "b2eco-6", term: "inflation", translation: "inflacion", example: "Inflation is rising." },
    { id: "b2eco-7", term: "income", translation: "ingresos", example: "His income increased." },
    { id: "b2eco-8", term: "to save", translation: "ahorrar", example: "They had been saving for years." },
    { id: "b2eco-9", term: "loan", translation: "prestamo", example: "She took out a loan." },
    { id: "b2eco-10", term: "wealth", translation: "riqueza", example: "Wealth is not everything." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "b2eco-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: la historia de un negocio",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "By the time Ana opened her shop, she had been saving for ten years. She had already paid " +
          "off her debt and had taken out a small loan. At first, business was slow because inflation " +
          "had risen. She had been working sixteen hours a day before she finally made a profit. " +
          "Customers loved her products, which she had designed herself. She had never invested before, " +
          "but her income grew and her small business became a real success.",
        keyPhrases: [
          "Fijate en past perfect: had saved, had paid, had risen (antes de otro pasado).",
          "Fijate en past perfect continuous: had been saving / working (duracion antes de otro pasado).",
        ],
        check: [
          { prompt: "How long had Ana been saving?", choices: ["Ten years", "One year", "Two months"], answer: 0 },
          { prompt: "Why was business slow at first?", choices: ["Inflation had risen", "No products", "Bad location"], answer: 0 },
          { prompt: "How many hours had she been working?", choices: ["Eight", "Sixteen", "Four"], answer: 1 },
          { prompt: "Had she invested before?", choices: ["Yes, often", "No, never", "Once"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "b2eco-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: dinero y economia",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "economy / inflation", translation: "economia / inflacion" },
        { term: "to invest / profit", translation: "invertir / ganancia" },
        { term: "debt / loan", translation: "deuda / prestamo" },
        { term: "income / wealth", translation: "ingresos / riqueza" },
        { term: "to afford", translation: "poder pagar" },
        { term: "to save", translation: "ahorrar" },
      ],
      activities: [
        {
          id: "b2eco-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "profit", right: "ganancia" },
            { left: "debt", right: "deuda" },
            { left: "income", right: "ingresos" },
          ] },
        },
        {
          id: "b2eco-vocab-a2", type: "cloze",
          prompt: "Completa: 'She ___ in stocks.' (invertir -> pasado)",
          payload: { answer: "invested" },
          explain: "'To invest' = invertir; pasado: invested.",
        },
        {
          id: "b2eco-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'prestamo'?",
          payload: { choices: ["loan", "profit", "wealth"], answer: 0 },
          explain: "'Loan' = prestamo.",
        },
        {
          id: "b2eco-vocab-a4", type: "cloze",
          prompt: "Completa: '___ is rising.' (inflacion)",
          payload: { answer: "Inflation" },
          explain: "'Inflation' = inflacion.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "b2eco-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: tiempos narrativos",
      intro: "Competencia de GRAMATICA. Aprende past perfect y past perfect continuous.",
      grammar: {
        title: "Narrative tenses (past perfect / continuous)",
        form: "past perfect: had + participio · past perfect continuous: had been + -ing",
        examples: ["She had saved for years before she opened it.", "He had been working all day when I called."],
        mistakes: [
          { wrong: "She had save for years.", right: "She had saved for years." },
          { wrong: "He had been work all day.", right: "He had been working all day." },
        ],
      },
      activities: [
        {
          id: "b2eco-gram-a1", type: "cloze",
          prompt: "Completa: 'She had ___ off her debt.' (pay -> participio)",
          payload: { answer: "paid" },
          explain: "past perfect: had + participio (paid).",
        },
        {
          id: "b2eco-gram-a2", type: "cloze",
          prompt: "Completa: 'He had been ___ all day.' (work -> -ing)",
          payload: { answer: "working" },
          explain: "past perfect continuous: had been + verbo-ing.",
        },
        {
          id: "b2eco-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "By the time I arrived, she had already left.",
            "By the time I arrived, she has already left.",
            "By the time I arrived, she leaves.",
          ], answer: 0 },
          explain: "past perfect (had left) para lo anterior a otro pasado.",
        },
        {
          id: "b2eco-gram-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["been", "They", "saving", "years", "had", "for"], answer: ["They", "had", "been", "saving", "for", "years"] },
          explain: "Orden: They + had + been + saving + for + years.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "b2eco-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: narra una historia",
      intro: "Competencia de ESCRITURA. Construye frases con tiempos narrativos. Ordena cada frase.",
      activities: [
        {
          id: "b2eco-write-a1", type: "word_bank",
          prompt: "Di que llevaban anos ahorrando:",
          payload: { words: ["been", "They", "saving", "years", "had", "for"], answer: ["They", "had", "been", "saving", "for", "years"] },
        },
        {
          id: "b2eco-write-a2", type: "word_bank",
          prompt: "Di que ya habia pagado su deuda:",
          payload: { words: ["paid", "She", "her", "had", "debt"], answer: ["She", "had", "paid", "her", "debt"] },
        },
        {
          id: "b2eco-write-a3", type: "word_bank",
          prompt: "Di que sus ingresos aumentaron:",
          payload: { words: ["income", "Her", "increased"], answer: ["Her", "income", "increased"] },
        },
        {
          id: "b2eco-write-a4", type: "multiple_choice",
          prompt: "Which is past perfect continuous?",
          payload: { choices: ["She had saved.", "She had been saving.", "She saves."], answer: 1 },
        },
      ],
    },
  ],
};
