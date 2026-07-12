/**
 * data/units/a1-shopping.js — Unidad tematica "Shopping & prices" (A1).
 *
 * Datos PUROS. Compras y precios con this/that/these/those y How much...?
 * Sigue el ciclo PPP del estandar de calidad (ver PLAN-DE-ESTUDIO.md).
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
    // ---------------- APRENDE ----------------
    {
      id: "a1sh-l0",
      order: 1,
      phase: "learn",
      skills: ["reading", "vocabulary"],
      title: "Aprende: de compras",
      intro:
        "Lee una escena en una tienda y estudia this/that/these/those y los precios. " +
        "Aqui solo se lee y se aprende.",
      teachesVocab: true,
      content: {
        reading:
          "Nora is in a clothes shop. She wants to buy a shirt. 'How much is this blue shirt?' " +
          "she asks. 'It's fifteen dollars,' says the man. 'And these shoes?' 'Those shoes are " +
          "forty dollars.' Nora thinks the shoes are expensive, but the shirt is cheap. She buys " +
          "the shirt and pays with money. 'Thank you!' she says.",
        glossary: [
          { term: "How much...?", translation: "Cuanto cuesta...?" },
          { term: "this / that", translation: "este / ese (singular)" },
          { term: "these / those", translation: "estos / esos (plural)" },
          { term: "dollars", translation: "dolares" },
          { term: "cheap", translation: "barato" },
          { term: "expensive", translation: "caro" },
        ],
        keyPhrases: [
          "How much is this? (Cuanto cuesta esto?)",
          "How much are these? (Cuanto cuestan estos?)",
          "It's fifteen dollars. (Cuesta quince dolares.)",
          "Can I pay by card? (Puedo pagar con tarjeta?)",
        ],
        note:
          "this/these = cerca (this shirt, these shoes). that/those = lejos (that bag, those shoes). " +
          "Para 1 cosa: 'How much is...?'. Para varias: 'How much are...?'.",
        grammar: {
          title: "this / that / these / those",
          form: "singular: this (cerca) / that (lejos) · plural: these (cerca) / those (lejos)",
          examples: [
            "This shirt is nice.",
            "Those shoes are expensive.",
          ],
          mistakes: [
            { wrong: "How much are this shirt?", right: "How much is this shirt?" },
            { wrong: "This shoes are cheap.", right: "These shoes are cheap." },
          ],
        },
        check: [
          { prompt: "How much is the shirt?", choices: ["15 dollars", "40 dollars", "50 dollars"], answer: 0 },
          { prompt: "What does Nora buy?", choices: ["The shoes", "The shirt", "A bag"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ---------------- PRESENTACION ----------------
    {
      id: "a1sh-l1",
      order: 2,
      phase: "present",
      skills: ["grammar", "vocabulary"],
      title: "Presentacion: en la tienda",
      intro:
        "Para comprar preguntamos precios y usamos this/that. Lee el dialogo.",
      dialogue: [
        "A: Excuse me, how much is this bag?",
        "B: That bag is twenty dollars.",
        "A: And how much are these shoes?",
        "B: Those shoes are thirty dollars.",
      ],
      activities: [
        {
          id: "a1sh-l1-a1", type: "multiple_choice",
          prompt: "How do you ask the price of one thing?",
          payload: { choices: ["How much are this?", "How much is this?", "How many is this?"], answer: 1 },
          explain: "Para 1 cosa: 'How much is...?'.",
        },
        {
          id: "a1sh-l1-a2", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "cheap", right: "barato" },
            { left: "expensive", right: "caro" },
            { left: "money", right: "dinero" },
          ] },
        },
      ],
    },

    // ---------------- PRACTICA ----------------
    {
      id: "a1sh-l2",
      order: 3,
      phase: "practice",
      skills: ["grammar", "vocabulary"],
      title: "Practica: this/that y precios",
      intro: "Completa, elige y ordena para practicar.",
      activities: [
        {
          id: "a1sh-l2-a1", type: "cloze",
          prompt: "Completa: 'How much ___ these shoes?' (son/estan)",
          payload: { answer: "are" },
          explain: "Con plural (these shoes) usamos 'are'.",
        },
        {
          id: "a1sh-l2-a2", type: "cloze",
          prompt: "Completa: '___ shirt is cheap.' (esta, cerca)",
          payload: { answer: "This" },
          explain: "'This' = este/esta (una cosa, cerca).",
        },
        {
          id: "a1sh-l2-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "Those shoes is expensive.",
            "Those shoes are expensive.",
            "That shoes are expensive.",
          ], answer: 1 },
          explain: "'Those shoes' es plural: 'are'. 'Those' para plural lejano.",
        },
        {
          id: "a1sh-l2-a4", type: "word_bank",
          prompt: "Ordena la pregunta:",
          payload: { words: ["is", "How", "this", "much", "bag?"],
                     answer: ["How", "much", "is", "this", "bag?"] },
          explain: "Orden: How much + is + this + (objeto)?",
        },
        {
          id: "a1sh-l2-a5", type: "cloze",
          prompt: "Completa: 'I want to ___ a hat.' (comprar)",
          payload: { answer: "buy" },
          explain: "'To buy' = comprar.",
        },
      ],
    },

    // ---------------- PRODUCCION ----------------
    {
      id: "a1sh-l3",
      order: 4,
      phase: "produce",
      skills: ["writing", "grammar"],
      title: "Produccion: haz una compra",
      intro:
        "Tarea real: construye frases para comprar en una tienda. Ordena cada frase.",
      activities: [
        {
          id: "a1sh-l3-a1", type: "word_bank",
          prompt: "Pregunta el precio de una camisa:",
          payload: { words: ["is", "How", "this", "much", "shirt?"],
                     answer: ["How", "much", "is", "this", "shirt?"] },
        },
        {
          id: "a1sh-l3-a2", type: "word_bank",
          prompt: "Di que quieres comprar zapatos:",
          payload: { words: ["buy", "I", "to", "want", "shoes"],
                     answer: ["I", "want", "to", "buy", "shoes"] },
        },
        {
          id: "a1sh-l3-a3", type: "word_bank",
          prompt: "Pregunta si puedes pagar con tarjeta:",
          payload: { words: ["pay", "Can", "I", "by", "card?"],
                     answer: ["Can", "I", "pay", "by", "card?"] },
        },
        {
          id: "a1sh-l3-a4", type: "multiple_choice",
          prompt: "Which word means 'caro'?",
          payload: { choices: ["cheap", "expensive", "money"], answer: 1 },
        },
      ],
    },
  ],
};
