/**
 * data/units/a1-shopping.js — Unidad tematica "Shopping & prices" (A1).
 *
 * Datos PUROS. MODELO DESACOPLADO POR COMPETENCIA. Listening/Speaking con audio/IA.
 */

export const A1_SHOPPING = {
  id: "a1-shopping",
  language: "en",
  level: "A1",
  title: "Shopping & prices",
  subtitle: "Comprar cosas, preguntar precios y usar this/that",

  cando: [
    "Puedo preguntar precios con 'How much...?'.",
    "Puedo usar this/that/these/those.",
    "Puedo nombrar ropa y objetos comunes.",
    "Puedo hacer una compra simple en una tienda.",
  ],

  vocab: [
    { id: "a1sh-1", term: "shop", translation: "tienda", example: "The shop is open." },
    { id: "a1sh-2", term: "price", translation: "precio", example: "What is the price?" },
    { id: "a1sh-3", term: "money", translation: "dinero", example: "I don't have money today." },
    { id: "a1sh-4", term: "cheap", translation: "barato", example: "This shirt is cheap." },
    { id: "a1sh-5", term: "expensive", translation: "caro", example: "Those shoes are expensive." },
    { id: "a1sh-6", term: "shirt", translation: "camisa", example: "I like this blue shirt." },
    { id: "a1sh-7", term: "shoes", translation: "zapatos", example: "These shoes are nice." },
    { id: "a1sh-8", term: "bag", translation: "bolsa / bolso", example: "How much is that bag?" },
    { id: "a1sh-9", term: "to buy", translation: "comprar", example: "I want to buy a hat." },
    { id: "a1sh-10", term: "to pay", translation: "pagar", example: "Can I pay by card?" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a1sh-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: de compras",
      intro: "Competencia de LECTURA. Lee la escena en la tienda y comprueba que entendiste.",
      content: {
        reading:
          "Nora is in a clothes shop. She wants to buy a shirt. 'How much is this blue shirt?' " +
          "she asks. 'It's fifteen dollars,' says the man. 'And these shoes?' 'Those shoes are " +
          "forty dollars.' Nora thinks the shoes are expensive, but the shirt is cheap. She buys " +
          "the shirt and pays with money. 'Thank you!' she says.",
        keyPhrases: [
          "Busca los precios de la camisa y los zapatos.",
          "Fijate en 'cheap' (barato) y 'expensive' (caro).",
        ],
        check: [
          { prompt: "How much is the shirt?", choices: ["15 dollars", "40 dollars", "50 dollars"], answer: 0 },
          { prompt: "What does Nora buy?", choices: ["The shoes", "The shirt", "A bag"], answer: 1 },
          { prompt: "How much are the shoes?", choices: ["15 dollars", "40 dollars", "25 dollars"], answer: 1 },
          { prompt: "What does Nora think about the shoes?", choices: ["Cheap", "Expensive", "Old"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "a1sh-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: tienda y ropa",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "shop / price / money", translation: "tienda / precio / dinero" },
        { term: "cheap / expensive", translation: "barato / caro" },
        { term: "shirt", translation: "camisa" },
        { term: "shoes", translation: "zapatos" },
        { term: "bag", translation: "bolsa / bolso" },
        { term: "to buy / to pay", translation: "comprar / pagar" },
      ],
      activities: [
        {
          id: "a1sh-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "cheap", right: "barato" },
            { left: "expensive", right: "caro" },
            { left: "money", right: "dinero" },
          ] },
        },
        {
          id: "a1sh-vocab-a2", type: "cloze",
          prompt: "Completa: 'I want to ___ a hat.' (comprar)",
          payload: { answer: "buy" },
          explain: "'To buy' = comprar.",
        },
        {
          id: "a1sh-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'caro'?",
          payload: { choices: ["cheap", "expensive", "money"], answer: 1 },
          explain: "'Expensive' = caro.",
        },
        {
          id: "a1sh-vocab-a4", type: "multiple_choice",
          prompt: "Which one do you wear on your feet?",
          payload: { choices: ["shirt", "shoes", "bag"], answer: 1 },
          explain: "'Shoes' = zapatos (para los pies).",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "a1sh-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: this/that y precios",
      intro: "Competencia de GRAMATICA. Aprende this/that/these/those y How much y practicalos.",
      grammar: {
        title: "this / that / these / those",
        form: "singular: this (cerca) / that (lejos) · plural: these / those",
        examples: ["This shirt is nice.", "Those shoes are expensive."],
        mistakes: [
          { wrong: "How much are this shirt?", right: "How much is this shirt?" },
          { wrong: "This shoes are cheap.", right: "These shoes are cheap." },
        ],
      },
      activities: [
        {
          id: "a1sh-gram-a1", type: "cloze",
          prompt: "Completa: 'How much ___ these shoes?' (son/estan)",
          payload: { answer: "are" },
          explain: "Con plural (these shoes): 'are'.",
        },
        {
          id: "a1sh-gram-a2", type: "cloze",
          prompt: "Completa: '___ shirt is cheap.' (esta, cerca)",
          payload: { answer: "This" },
          explain: "'This' = este/esta (una cosa, cerca).",
        },
        {
          id: "a1sh-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["Those shoes is expensive.", "Those shoes are expensive.", "That shoes are expensive."], answer: 1 },
          explain: "'Those shoes' es plural: 'are'.",
        },
        {
          id: "a1sh-gram-a4", type: "word_bank",
          prompt: "Ordena la pregunta:",
          payload: { words: ["is", "How", "this", "much", "bag?"], answer: ["How", "much", "is", "this", "bag?"] },
          explain: "Orden: How much + is + this + (objeto)?",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "a1sh-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: haz una compra",
      intro: "Competencia de ESCRITURA. Construye frases para comprar en una tienda. Ordena cada frase.",
      activities: [
        {
          id: "a1sh-write-a1", type: "word_bank",
          prompt: "Pregunta el precio de una camisa:",
          payload: { words: ["is", "How", "this", "much", "shirt?"], answer: ["How", "much", "is", "this", "shirt?"] },
        },
        {
          id: "a1sh-write-a2", type: "word_bank",
          prompt: "Di que quieres comprar zapatos:",
          payload: { words: ["buy", "I", "to", "want", "shoes"], answer: ["I", "want", "to", "buy", "shoes"] },
        },
        {
          id: "a1sh-write-a3", type: "word_bank",
          prompt: "Pregunta si puedes pagar con tarjeta:",
          payload: { words: ["pay", "Can", "I", "by", "card?"], answer: ["Can", "I", "pay", "by", "card?"] },
        },
        {
          id: "a1sh-write-a4", type: "multiple_choice",
          prompt: "Which word means 'barato'?",
          payload: { choices: ["cheap", "expensive", "money"], answer: 0 },
        },
      ],
    },
  ],
};
