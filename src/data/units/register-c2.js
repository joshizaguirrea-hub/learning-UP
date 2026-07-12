/**
 * data/units/register-c2.js — Unidad tematica "Mastering register" (C2).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: fronting (orden marcado).
 */

export const REGISTER_C2 = {
  id: "register-c2",
  language: "en",
  level: "C2",
  title: "Mastering register",
  subtitle: "Dominar el registro y el enfasis con fronting",

  cando: [
    "Puedo adaptar el registro con total control.",
    "Puedo usar el fronting para dar enfasis estilistico.",
    "Puedo elegir la estructura por su efecto.",
    "Puedo escribir con precision de nivel casi nativo.",
  ],

  vocab: [
    { id: "c2reg-1", term: "register", translation: "registro", example: "Match the register to the context." },
    { id: "c2reg-2", term: "formal", translation: "formal", example: "Use a formal tone here." },
    { id: "c2reg-3", term: "colloquial", translation: "coloquial", example: "That's too colloquial." },
    { id: "c2reg-4", term: "emphasis", translation: "enfasis", example: "Put emphasis on the key word." },
    { id: "c2reg-5", term: "to convey", translation: "transmitir", example: "Words convey attitude." },
    { id: "c2reg-6", term: "connotation", translation: "connotacion", example: "The word has a negative connotation." },
    { id: "c2reg-7", term: "eloquent", translation: "elocuente", example: "She is an eloquent speaker." },
    { id: "c2reg-8", term: "appropriate", translation: "apropiado", example: "Choose an appropriate style." },
    { id: "c2reg-9", term: "understatement", translation: "atenuacion", example: "British humour loves understatement." },
    { id: "c2reg-10", term: "subtle", translation: "sutil", example: "A subtle change of tone." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c2reg-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: el poder del registro",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "Rarely is register given the attention it deserves. So subtle are its effects that few notice " +
          "them. Down came the formal tone, and up rose a warmer voice. Never before had she conveyed " +
          "such authority with so few words. Little did the audience know how carefully each phrase had " +
          "been chosen. What an eloquent speaker she was! An expert in tone, she matched every word to " +
          "its context, avoiding anything too colloquial.",
        keyPhrases: [
          "Fijate en el fronting: So subtle are..., Down came..., Little did they know..., What an... she was!",
          "Colocar al inicio un elemento inusual crea enfasis estilistico.",
        ],
        check: [
          { prompt: "What is rarely given attention?", choices: ["Register", "Money", "Time"], answer: 0 },
          { prompt: "How were the effects of register?", choices: ["Loud", "Subtle", "Absent"], answer: 1 },
          { prompt: "What did the audience not know?", choices: ["How carefully phrases were chosen", "The time", "The topic"], answer: 0 },
          { prompt: "What did she avoid?", choices: ["Anything too colloquial", "Speaking", "Formality"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "c2reg-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: registro y estilo",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "register / emphasis", translation: "registro / enfasis" },
        { term: "formal / colloquial", translation: "formal / coloquial" },
        { term: "connotation / understatement", translation: "connotacion / atenuacion" },
        { term: "to convey", translation: "transmitir" },
        { term: "appropriate / eloquent", translation: "apropiado / elocuente" },
        { term: "subtle", translation: "sutil" },
      ],
      activities: [
        {
          id: "c2reg-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "register", right: "registro" },
            { left: "subtle", right: "sutil" },
            { left: "eloquent", right: "elocuente" },
          ] },
        },
        {
          id: "c2reg-vocab-a2", type: "cloze",
          prompt: "Completa: 'That's too ___.' (coloquial)",
          payload: { answer: "colloquial" },
          explain: "'Colloquial' = coloquial / informal.",
        },
        {
          id: "c2reg-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'transmitir'?",
          payload: { choices: ["to convey", "to choose", "to notice"], answer: 0 },
          explain: "'To convey' = transmitir.",
        },
        {
          id: "c2reg-vocab-a4", type: "cloze",
          prompt: "Completa: 'Choose an ___ style.' (apropiado)",
          payload: { answer: "appropriate" },
          explain: "'Appropriate' = apropiado.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "c2reg-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: fronting",
      intro: "Competencia de GRAMATICA. Aprende el fronting para enfasis estilistico.",
      grammar: {
        title: "Fronting (marked word order)",
        form: "elemento inusual al inicio (+ inversion si es negativo/adverbial)",
        examples: ["So beautiful was the view that we stayed.", "Down came the rain.", "Little did they know."],
        mistakes: [
          { wrong: "So the view was beautiful that we stayed.", right: "So beautiful was the view that we stayed." },
          { wrong: "Little they knew.", right: "Little did they know." },
        ],
      },
      activities: [
        {
          id: "c2reg-gram-a1", type: "cloze",
          prompt: "Completa: 'So subtle ___ its effects that few notice.' (auxiliar)",
          payload: { answer: "are" },
          explain: "Tras 'So + adjetivo' fronteado se invierte: are its effects.",
        },
        {
          id: "c2reg-gram-a2", type: "multiple_choice",
          prompt: "Choose the correct fronting:",
          payload: { choices: ["Little did they know the truth.", "Little they did know the truth.", "Little they knew did the truth."], answer: 0 },
          explain: "'Little did + sujeto + base' (inversion tras adverbio negativo fronteado).",
        },
        {
          id: "c2reg-gram-a3", type: "multiple_choice",
          prompt: "Choose the emphatic (fronted) sentence:",
          payload: { choices: ["The rain came down.", "Down came the rain.", "Rain the down came."], answer: 1 },
          explain: "'Down came the rain' fronteando el adverbio para efecto dramatico.",
        },
        {
          id: "c2reg-gram-a4", type: "word_bank",
          prompt: "Ordena el fronting:",
          payload: { words: ["did", "know", "Little", "they"], answer: ["Little", "did", "they", "know"] },
          explain: "Orden: Little + did + they + know.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "c2reg-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: enfasis con estilo",
      intro: "Competencia de ESCRITURA. Construye frases con fronting. Ordena cada frase.",
      activities: [
        {
          id: "c2reg-write-a1", type: "word_bank",
          prompt: "Frasea con enfasis (poco sabian):",
          payload: { words: ["did", "know", "Little", "they"], answer: ["Little", "did", "they", "know"] },
        },
        {
          id: "c2reg-write-a2", type: "word_bank",
          prompt: "Di que ella es una oradora elocuente:",
          payload: { words: ["eloquent", "She", "an", "is", "speaker"], answer: ["She", "is", "an", "eloquent", "speaker"] },
        },
        {
          id: "c2reg-write-a3", type: "word_bank",
          prompt: "Aconseja igualar el registro al contexto:",
          payload: { words: ["the", "Match", "context", "register", "the", "to"], answer: ["Match", "the", "register", "to", "the", "context"] },
        },
        {
          id: "c2reg-write-a4", type: "multiple_choice",
          prompt: "Fronting is used for...",
          payload: { choices: ["grammar errors", "stylistic emphasis", "asking questions"], answer: 1 },
        },
      ],
    },
  ],
};
