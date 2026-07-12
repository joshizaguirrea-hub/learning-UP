/**
 * data/units/culture-identity-c1.js — Unidad tematica "Culture & identity" (C1).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: ellipsis y sustitucion.
 */

export const CULTURE_IDENTITY_C1 = {
  id: "culture-identity-c1",
  language: "en",
  level: "C1",
  title: "Culture & identity",
  subtitle: "Hablar de cultura e identidad con naturalidad (ellipsis)",

  cando: [
    "Puedo hablar de cultura, tradiciones e identidad.",
    "Puedo usar la elipsis y la sustitucion para evitar repetir.",
    "Puedo sonar mas natural en conversacion y escritura.",
    "Puedo escribir sobre mi identidad cultural.",
  ],

  vocab: [
    { id: "c1cu-1", term: "identity", translation: "identidad", example: "Language is part of identity." },
    { id: "c1cu-2", term: "heritage", translation: "herencia / legado", example: "She is proud of her heritage." },
    { id: "c1cu-3", term: "tradition", translation: "tradicion", example: "It's an old tradition." },
    { id: "c1cu-4", term: "belong", translation: "pertenecer", example: "We all want to belong." },
    { id: "c1cu-5", term: "diverse", translation: "diverso", example: "The city is very diverse." },
    { id: "c1cu-6", term: "roots", translation: "raices", example: "She never forgot her roots." },
    { id: "c1cu-7", term: "custom", translation: "costumbre", example: "It's a local custom." },
    { id: "c1cu-8", term: "to preserve", translation: "preservar", example: "We must preserve our culture." },
    { id: "c1cu-9", term: "ancestor", translation: "antepasado", example: "Her ancestors came from Peru." },
    { id: "c1cu-10", term: "sense of belonging", translation: "sentido de pertenencia", example: "A strong sense of belonging." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c1cu-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: raices e identidad",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "Maya loves her culture, and so does her brother. Some people forget their roots; others never " +
          "do. 'I could visit my ancestors' village, and I will,' she says. Her heritage matters to her, " +
          "and it should to everyone. When asked about tradition, she says she preserves it because her " +
          "grandmother did. 'Do you feel a sense of belonging?' 'Yes, I do.' Her diverse community keeps " +
          "old customs alive, and long may it continue.",
        keyPhrases: [
          "Fijate en la elipsis/sustitucion: so does her brother, others never do, and I will, do.",
          "Evitan repetir el verbo completo, sonando mas natural.",
        ],
        check: [
          { prompt: "Who else loves the culture?", choices: ["Her brother", "Nobody", "Her boss"], answer: 0 },
          { prompt: "Does Maya forget her roots?", choices: ["Yes", "No, she never does", "Sometimes"], answer: 1 },
          { prompt: "Why does she preserve tradition?", choices: ["Because her grandmother did", "For money", "By accident"], answer: 0 },
          { prompt: "Does she feel a sense of belonging?", choices: ["Yes, she does", "No", "Not sure"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "c1cu-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: cultura e identidad",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "identity / heritage", translation: "identidad / herencia" },
        { term: "tradition / custom", translation: "tradicion / costumbre" },
        { term: "to belong / sense of belonging", translation: "pertenecer / sentido de pertenencia" },
        { term: "diverse", translation: "diverso" },
        { term: "roots / ancestor", translation: "raices / antepasado" },
        { term: "to preserve", translation: "preservar" },
      ],
      activities: [
        {
          id: "c1cu-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "identity", right: "identidad" },
            { left: "roots", right: "raices" },
            { left: "custom", right: "costumbre" },
          ] },
        },
        {
          id: "c1cu-vocab-a2", type: "cloze",
          prompt: "Completa: 'She is proud of her ___.' (herencia)",
          payload: { answer: "heritage" },
          explain: "'Heritage' = herencia / legado.",
        },
        {
          id: "c1cu-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'diverso'?",
          payload: { choices: ["diverse", "custom", "root"], answer: 0 },
          explain: "'Diverse' = diverso.",
        },
        {
          id: "c1cu-vocab-a4", type: "cloze",
          prompt: "Completa: 'Her ___ came from Peru.' (antepasados)",
          payload: { answer: "ancestors" },
          explain: "'Ancestors' = antepasados.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "c1cu-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: elipsis y sustitucion",
      intro: "Competencia de GRAMATICA. Aprende a evitar repeticiones con elipsis/sustitucion.",
      grammar: {
        title: "Ellipsis & substitution",
        form: "so/neither + auxiliar + sujeto · do/one como sustitutos · respuestas cortas (Yes, I do)",
        examples: ["I love it, and so does she.", "I don't, and neither does he.", "Do you? Yes, I do."],
        mistakes: [
          { wrong: "I love it, and so she loves.", right: "I love it, and so does she." },
          { wrong: "I can't, and neither he can.", right: "I can't, and neither can he." },
        ],
      },
      activities: [
        {
          id: "c1cu-gram-a1", type: "cloze",
          prompt: "Completa: 'She loves it, and so ___ he.' (auxiliar)",
          payload: { answer: "does" },
          explain: "'so does he' = el tambien (evita repetir 'loves').",
        },
        {
          id: "c1cu-gram-a2", type: "cloze",
          prompt: "Completa: 'I don't, and ___ does he.' (tampoco)",
          payload: { answer: "neither" },
          explain: "'neither does he' = el tampoco.",
        },
        {
          id: "c1cu-gram-a3", type: "multiple_choice",
          prompt: "Choose the natural short answer to 'Do you like it?':",
          payload: { choices: ["Yes, I like it very much do.", "Yes, I do.", "Yes, I am."], answer: 1 },
          explain: "Respuesta corta con el auxiliar: 'Yes, I do.'",
        },
        {
          id: "c1cu-gram-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["so", "I", "do", "and", "agree,", "they"], answer: ["I", "agree,", "and", "so", "do", "they"] },
          explain: "Orden: I agree, + and + so + do + they.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "c1cu-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: tu identidad cultural",
      intro: "Competencia de ESCRITURA. Construye frases con elipsis/sustitucion. Ordena cada frase.",
      activities: [
        {
          id: "c1cu-write-a1", type: "word_bank",
          prompt: "Di que tu estas de acuerdo y ellos tambien:",
          payload: { words: ["so", "I", "do", "and", "agree,", "they"], answer: ["I", "agree,", "and", "so", "do", "they"] },
        },
        {
          id: "c1cu-write-a2", type: "word_bank",
          prompt: "Di que debemos preservar nuestra cultura:",
          payload: { words: ["culture", "We", "our", "preserve", "must"], answer: ["We", "must", "preserve", "our", "culture"] },
        },
        {
          id: "c1cu-write-a3", type: "word_bank",
          prompt: "Di que ella nunca olvido sus raices:",
          payload: { words: ["roots", "She", "forgot", "her", "never"], answer: ["She", "never", "forgot", "her", "roots"] },
        },
        {
          id: "c1cu-write-a4", type: "multiple_choice",
          prompt: "Ellipsis and substitution help you...",
          payload: { choices: ["repeat more", "avoid repetition and sound natural", "make errors"], answer: 1 },
        },
      ],
    },
  ],
};
