/**
 * data/units/a1-shopping.js — Unidad tematica "Shopping & prices" (A1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Listening/Speaking con audio/IA.
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
    { id: "a1sh-11", term: "size", translation: "talla", example: "What size are you?" },
    { id: "a1sh-12", term: "colour", translation: "color", example: "I like this colour." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a1sh-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: de compras",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - In the clothes shop\n" +
          "Nora is in a clothes shop. She wants to buy a shirt. 'How much is this blue shirt?' she asks. " +
          "'It's fifteen dollars,' says the man. 'And these shoes?' 'Those shoes are forty dollars.' Nora " +
          "thinks the shoes are expensive, but the shirt is cheap. She buys the shirt and pays with money. " +
          "'Thank you!' she says.\n\n" +
          "TEXT 2 - Buying a bag\n" +
          "A: Excuse me, how much is that bag? B: This one? It's twenty dollars. A: What colours do you " +
          "have? B: Black, red and blue. A: I'll take the red one. Can I pay by card? B: Of course. Here " +
          "you are. A: Thank you!",
        glossary: [
          { term: "How much...?", translation: "cuanto cuesta...?" },
          { term: "this / that", translation: "este / ese (singular)" },
          { term: "these / those", translation: "estos / esos (plural)" },
          { term: "cheap / expensive", translation: "barato / caro" },
          { term: "to pay by card", translation: "pagar con tarjeta" },
          { term: "colour / size", translation: "color / talla" },
          { term: "I'll take it", translation: "me lo llevo" },
          { term: "Of course", translation: "por supuesto" },
        ],
        keyPhrases: [
          "Busca los precios y si algo es barato o caro.",
          "Fijate en this/that/these/those segun cerca o lejos.",
        ],
        check: [
          { prompt: "T1: How much is the shirt?", choices: ["15 dollars", "40 dollars", "50 dollars"], answer: 0 },
          { prompt: "T1: What does Nora buy?", choices: ["The shoes", "The shirt", "A bag"], answer: 1 },
          { prompt: "T1: What does Nora think about the shoes?", choices: ["Cheap", "Expensive", "Old"], answer: 1 },
          { prompt: "T2: How much is the bag?", choices: ["Twenty dollars", "Ten dollars", "Forty dollars"], answer: 0 },
          { prompt: "T2: Which colour does A choose?", choices: ["Black", "Red", "Blue"], answer: 1 },
          { prompt: "T2: How does A pay?", choices: ["By card", "With cash", "Later"], answer: 0 },
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
        { term: "shirt / shoes", translation: "camisa / zapatos" },
        { term: "bag", translation: "bolsa / bolso" },
        { term: "to buy / to pay", translation: "comprar / pagar" },
        { term: "size / colour", translation: "talla / color" },
      ],
      activities: [
        {
          id: "a1sh-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "cheap", right: "barato" },
            { left: "expensive", right: "caro" },
            { left: "money", right: "dinero" },
            { left: "price", right: "precio" },
          ] },
        },
        {
          id: "a1sh-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "shirt", right: "camisa" },
            { left: "shoes", right: "zapatos" },
            { left: "bag", right: "bolso" },
            { left: "colour", right: "color" },
          ] },
        },
        {
          id: "a1sh-vocab-a3", type: "cloze",
          prompt: "Completa: 'I want to ___ a hat.' (comprar)",
          payload: { answer: "buy" },
          explain: "'To buy' = comprar.",
        },
        {
          id: "a1sh-vocab-a4", type: "cloze",
          prompt: "Completa: 'Can I ___ by card?' (pagar)",
          payload: { answer: "pay" },
          explain: "'To pay' = pagar.",
        },
        {
          id: "a1sh-vocab-a5", type: "cloze",
          prompt: "Completa: 'What ___ are you?' (talla)",
          payload: { answer: "size" },
          explain: "'Size' = talla.",
        },
        {
          id: "a1sh-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'caro'?",
          payload: { choices: ["cheap", "expensive", "money"], answer: 1 },
          explain: "'Expensive' = caro.",
        },
        {
          id: "a1sh-vocab-a7", type: "multiple_choice",
          prompt: "Which one do you wear on your feet?",
          payload: { choices: ["shirt", "shoes", "bag"], answer: 1 },
          explain: "'Shoes' = zapatos.",
        },
        {
          id: "a1sh-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["red", "the", "I'll", "one", "take"], answer: ["I'll", "take", "the", "red", "one"] },
          explain: "'I'll take the red one' = me llevo el rojo.",
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
        title: "this / that / these / those + How much",
        form: "singular: this (cerca) / that (lejos) · plural: these / those · How much is/are...?",
        examples: ["This shirt is nice.", "Those shoes are expensive.", "How much is this?", "How much are these?"],
        mistakes: [
          { wrong: "How much are this shirt?", right: "How much is this shirt?" },
          { wrong: "This shoes are cheap.", right: "These shoes are cheap." },
          { wrong: "How much is these shoes?", right: "How much are these shoes?" },
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
          prompt: "Completa: 'How much ___ this bag?' (es/esta)",
          payload: { answer: "is" },
          explain: "Con singular (this bag): 'is'.",
        },
        {
          id: "a1sh-gram-a3", type: "cloze",
          prompt: "Completa: '___ shirt is cheap.' (esta, cerca)",
          payload: { answer: "This" },
          explain: "'This' = este/esta (una cosa, cerca).",
        },
        {
          id: "a1sh-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["Those shoes is expensive.", "Those shoes are expensive.", "That shoes are expensive."], answer: 1 },
          explain: "'Those shoes' es plural: 'are'.",
        },
        {
          id: "a1sh-gram-a5", type: "multiple_choice",
          prompt: "Which is correct for one thing far away?",
          payload: { choices: ["that bag", "those bag", "these bag"], answer: 0 },
          explain: "'that' = ese (una cosa, lejos).",
        },
        {
          id: "a1sh-gram-a6", type: "word_bank",
          prompt: "Ordena la pregunta:",
          payload: { words: ["is", "How", "this", "much", "bag?"], answer: ["How", "much", "is", "this", "bag?"] },
          explain: "Orden: How much + is + this + (objeto)?",
        },
        {
          id: "a1sh-gram-a7", type: "word_bank",
          prompt: "Ordena la pregunta (plural):",
          payload: { words: ["are", "How", "these", "much", "shoes?"], answer: ["How", "much", "are", "these", "shoes?"] },
          explain: "Con plural: How much + are + these + shoes?",
        },
        {
          id: "a1sh-gram-a8", type: "cloze",
          prompt: "Completa: '___ shoes are new.' (estos, cerca)",
          payload: { answer: "These" },
          explain: "'These' = estos (plural, cerca).",
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
      intro: "Competencia de ESCRITURA. Construye una compra completa, frase por frase.",
      activities: [
        {
          id: "a1sh-write-a1", type: "word_bank",
          prompt: "1. Pregunta el precio de una camisa:",
          payload: { words: ["is", "How", "this", "much", "shirt?"], answer: ["How", "much", "is", "this", "shirt?"] },
        },
        {
          id: "a1sh-write-a2", type: "word_bank",
          prompt: "2. Di que quieres comprar zapatos:",
          payload: { words: ["buy", "I", "to", "want", "shoes"], answer: ["I", "want", "to", "buy", "shoes"] },
        },
        {
          id: "a1sh-write-a3", type: "word_bank",
          prompt: "3. Pregunta que colores hay:",
          payload: { words: ["colours", "What", "have?", "you", "do"], answer: ["What", "colours", "do", "you", "have?"] },
        },
        {
          id: "a1sh-write-a4", type: "word_bank",
          prompt: "4. Pregunta si puedes pagar con tarjeta:",
          payload: { words: ["pay", "Can", "I", "by", "card?"], answer: ["Can", "I", "pay", "by", "card?"] },
        },
        {
          id: "a1sh-write-a5", type: "word_bank",
          prompt: "5. Di que te llevas el rojo:",
          payload: { words: ["red", "the", "I'll", "one", "take"], answer: ["I'll", "take", "the", "red", "one"] },
        },
        {
          id: "a1sh-write-a6", type: "multiple_choice",
          prompt: "6. Which word means 'barato'?",
          payload: { choices: ["cheap", "expensive", "money"], answer: 0 },
        },
        {
          id: "a1sh-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct question:",
          payload: { choices: ["How much is these shoes?", "How much are these shoes?", "How many are these shoes?"], answer: 1 },
        },
        {
          id: "a1sh-write-a8", type: "multiple_choice",
          prompt: "8. The shop assistant gives you the item and says:",
          payload: { choices: ["Here you are.", "Go away.", "I don't know."], answer: 0 },
        },
      ],
    },
  ],
};
