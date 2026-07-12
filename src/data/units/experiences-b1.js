/**
 * data/units/experiences-b1.js — Unidad tematica "Experiences" (B1).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: present perfect continuous (for/since).
 */

export const EXPERIENCES_B1 = {
  id: "experiences-b1",
  language: "en",
  level: "B1",
  title: "Experiences",
  subtitle: "Hablar de experiencias y de acciones que continuan",

  cando: [
    "Puedo hablar de experiencias de vida.",
    "Puedo usar present perfect continuous (have been + -ing).",
    "Puedo usar 'for' y 'since' con periodos de tiempo.",
    "Puedo escribir sobre algo que llevo tiempo haciendo.",
  ],

  vocab: [
    { id: "exp-1", term: "experience", translation: "experiencia", example: "It was a great experience." },
    { id: "exp-2", term: "to try", translation: "intentar / probar", example: "I want to try surfing." },
    { id: "exp-3", term: "abroad", translation: "en el extranjero", example: "She has lived abroad." },
    { id: "exp-4", term: "since", translation: "desde", example: "I've studied here since 2020." },
    { id: "exp-5", term: "for", translation: "durante (periodo)", example: "I've worked here for five years." },
    { id: "exp-6", term: "to achieve", translation: "lograr", example: "She achieved her goal." },
    { id: "exp-7", term: "challenge", translation: "reto / desafio", example: "It was a big challenge." },
    { id: "exp-8", term: "to improve", translation: "mejorar", example: "My English has improved." },
    { id: "exp-9", term: "recently", translation: "recientemente", example: "I've travelled a lot recently." },
    { id: "exp-10", term: "amazing", translation: "increible", example: "It was an amazing trip." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "exp-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: una vida de experiencias",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "Maya has had many amazing experiences. She has been learning English for six years, and it " +
          "has really improved. She has lived abroad since 2019 and has been working as a guide recently. " +
          "'I have been trying new things all my life,' she says. Living in another country was a big " +
          "challenge, but she has achieved a lot. She has been travelling around Asia for three months " +
          "and doesn't want to stop.",
        keyPhrases: [
          "Fijate en present perfect continuous: has been learning/working.",
          "Fijate en 'for' (periodo) y 'since' (punto de inicio).",
        ],
        check: [
          { prompt: "How long has Maya been learning English?", choices: ["Six years", "Two years", "One year"], answer: 0 },
          { prompt: "Since when has she lived abroad?", choices: ["2019", "2010", "This year"], answer: 0 },
          { prompt: "What has she been doing recently?", choices: ["Working as a guide", "Studying medicine", "Teaching maths"], answer: 0 },
          { prompt: "How long has she been travelling in Asia?", choices: ["Three months", "Three years", "Three weeks"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "exp-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: experiencias",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "experience / challenge", translation: "experiencia / reto" },
        { term: "to try / to achieve", translation: "probar / lograr" },
        { term: "abroad", translation: "en el extranjero" },
        { term: "for / since", translation: "durante / desde" },
        { term: "to improve", translation: "mejorar" },
        { term: "recently / amazing", translation: "recientemente / increible" },
      ],
      activities: [
        {
          id: "exp-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "abroad", right: "en el extranjero" },
            { left: "challenge", right: "reto" },
            { left: "to improve", right: "mejorar" },
          ] },
        },
        {
          id: "exp-vocab-a2", type: "cloze",
          prompt: "Completa: 'She ___ her goal.' (lograr -> pasado)",
          payload: { answer: "achieved" },
          explain: "'To achieve' = lograr; pasado: achieved.",
        },
        {
          id: "exp-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'recientemente'?",
          payload: { choices: ["abroad", "recently", "amazing"], answer: 1 },
          explain: "'Recently' = recientemente.",
        },
        {
          id: "exp-vocab-a4", type: "cloze",
          prompt: "Completa: 'I want to ___ surfing.' (probar)",
          payload: { answer: "try" },
          explain: "'To try' = intentar / probar.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "exp-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: present perfect continuous",
      intro: "Competencia de GRAMATICA. Aprende have been + -ing con for/since.",
      grammar: {
        title: "Present perfect continuous (for / since)",
        form: "have/has been + verbo-ing · for + periodo · since + punto de inicio",
        examples: ["I have been working for five years.", "She has been studying since 2019."],
        mistakes: [
          { wrong: "I have been work here.", right: "I have been working here." },
          { wrong: "I've lived here since five years.", right: "I've lived here for five years." },
        ],
      },
      activities: [
        {
          id: "exp-gram-a1", type: "cloze",
          prompt: "Completa: 'I have been ___ here.' (work -> -ing)",
          payload: { answer: "working" },
          explain: "have been + verbo-ing.",
        },
        {
          id: "exp-gram-a2", type: "cloze",
          prompt: "Completa: 'I've worked here ___ five years.' (periodo)",
          payload: { answer: "for" },
          explain: "'for' + periodo de tiempo (five years).",
        },
        {
          id: "exp-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["She has been study since 2019.", "She has been studying since 2019.", "She has studying since 2019."], answer: 1 },
          explain: "has been + studying + since + punto de inicio.",
        },
        {
          id: "exp-gram-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["been", "I've", "English", "learning"], answer: ["I've", "been", "learning", "English"] },
          explain: "Orden: I've + been + learning + English.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "exp-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: algo que llevas tiempo haciendo",
      intro: "Competencia de ESCRITURA. Construye frases sobre tus experiencias. Ordena cada frase.",
      activities: [
        {
          id: "exp-write-a1", type: "word_bank",
          prompt: "Di que llevas 5 anos trabajando aqui:",
          payload: { words: ["for", "I've", "here", "been", "working", "five", "years"], answer: ["I've", "been", "working", "here", "for", "five", "years"] },
        },
        {
          id: "exp-write-a2", type: "word_bank",
          prompt: "Di que has vivido en el extranjero desde 2019:",
          payload: { words: ["abroad", "I've", "since", "lived", "2019"], answer: ["I've", "lived", "abroad", "since", "2019"] },
        },
        {
          id: "exp-write-a3", type: "word_bank",
          prompt: "Di que tu ingles ha mejorado:",
          payload: { words: ["improved", "My", "has", "English"], answer: ["My", "English", "has", "improved"] },
        },
        {
          id: "exp-write-a4", type: "multiple_choice",
          prompt: "Which word goes with a starting point in time?",
          payload: { choices: ["for", "since", "during"], answer: 1 },
        },
      ],
    },
  ],
};
