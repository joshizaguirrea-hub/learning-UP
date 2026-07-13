/**
 * data/units/experiences-b1.js — Unidad tematica "Experiences" (B1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: present perfect continuous (for/since).
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
    { id: "exp-11", term: "goal", translation: "meta / objetivo", example: "My goal is to speak fluently." },
    { id: "exp-12", term: "so far", translation: "hasta ahora", example: "So far, so good." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "exp-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: una vida de experiencias",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Maya's life\n" +
          "Maya has had many amazing experiences. She has been learning English for six years, and it has " +
          "really improved. She has lived abroad since 2019 and has been working as a guide recently. 'I " +
          "have been trying new things all my life,' she says. Living in another country was a big " +
          "challenge, but she has achieved a lot. She has been travelling around Asia for three months.\n\n" +
          "TEXT 2 - Learning a skill\n" +
          "A: How long have you been playing the guitar? B: For two years. I've improved a lot. A: Have " +
          "you achieved your goal? B: Not yet, but so far I'm happy. I've been practising every day since " +
          "January. A: That's amazing! B: Thanks. Practice is the key.",
        glossary: [
          { term: "has been learning", translation: "ha estado aprendiendo" },
          { term: "has been working", translation: "ha estado trabajando" },
          { term: "for / since", translation: "durante / desde" },
          { term: "to achieve / goal", translation: "lograr / meta" },
          { term: "to improve / challenge", translation: "mejorar / reto" },
          { term: "abroad / recently", translation: "en el extranjero / recientemente" },
          { term: "so far", translation: "hasta ahora" },
          { term: "the key", translation: "la clave" },
        ],
        keyPhrases: [
          "Fijate en present perfect continuous: has been learning/working.",
          "Fijate en 'for' (periodo) y 'since' (punto de inicio).",
        ],
        check: [
          { prompt: "T1: How long has Maya been learning English?", choices: ["Six years", "Two years", "One year"], answer: 0 },
          { prompt: "T1: Since when has she lived abroad?", choices: ["2019", "2010", "This year"], answer: 0 },
          { prompt: "T1: How long has she been travelling in Asia?", choices: ["Three months", "Three years", "Three weeks"], answer: 0 },
          { prompt: "T2: How long has B played the guitar?", choices: ["Two years", "Five years", "One month"], answer: 0 },
          { prompt: "T2: Has B achieved the goal?", choices: ["Yes", "Not yet", "Never"], answer: 1 },
          { prompt: "T2: Since when has B practised daily?", choices: ["January", "June", "December"], answer: 0 },
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
        { term: "abroad / recently", translation: "en el extranjero / recientemente" },
        { term: "for / since", translation: "durante / desde" },
        { term: "to improve / goal", translation: "mejorar / meta" },
        { term: "amazing / so far", translation: "increible / hasta ahora" },
      ],
      activities: [
        {
          id: "exp-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "abroad", right: "en el extranjero" },
            { left: "challenge", right: "reto" },
            { left: "to improve", right: "mejorar" },
            { left: "goal", right: "meta" },
          ] },
        },
        {
          id: "exp-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to try", right: "probar" },
            { left: "to achieve", right: "lograr" },
            { left: "recently", right: "recientemente" },
            { left: "so far", right: "hasta ahora" },
          ] },
        },
        {
          id: "exp-vocab-a3", type: "cloze",
          prompt: "Completa: 'She ___ her goal.' (lograr -> pasado)",
          payload: { answer: "achieved" },
          explain: "'To achieve' = lograr; pasado: achieved.",
        },
        {
          id: "exp-vocab-a4", type: "cloze",
          prompt: "Completa: 'I want to ___ surfing.' (probar)",
          payload: { answer: "try" },
          explain: "'To try' = intentar / probar.",
        },
        {
          id: "exp-vocab-a5", type: "cloze",
          prompt: "Completa: 'My ___ is to speak fluently.' (meta)",
          payload: { answer: "goal" },
          explain: "'Goal' = meta / objetivo.",
        },
        {
          id: "exp-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'recientemente'?",
          payload: { choices: ["abroad", "recently", "amazing"], answer: 1 },
          explain: "'Recently' = recientemente.",
        },
        {
          id: "exp-vocab-a7", type: "multiple_choice",
          prompt: "Which phrase means 'hasta ahora'?",
          payload: { choices: ["so far", "for now", "at last"], answer: 0 },
          explain: "'So far' = hasta ahora.",
        },
        {
          id: "exp-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["improved", "My", "has", "English"], answer: ["My", "English", "has", "improved"] },
          explain: "'My English has improved' = mi ingles ha mejorado.",
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
          { wrong: "I've worked here for 2019.", right: "I've worked here since 2019." },
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
          id: "exp-gram-a3", type: "cloze",
          prompt: "Completa: 'She has studied ___ 2019.' (punto de inicio)",
          payload: { answer: "since" },
          explain: "'since' + punto de inicio (2019).",
        },
        {
          id: "exp-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["She has been study since 2019.", "She has been studying since 2019.", "She has studying since 2019."], answer: 1 },
          explain: "has been + studying + since + inicio.",
        },
        {
          id: "exp-gram-a5", type: "multiple_choice",
          prompt: "Which word goes with a starting point in time?",
          payload: { choices: ["for", "since", "during"], answer: 1 },
          explain: "'since' + punto de inicio.",
        },
        {
          id: "exp-gram-a6", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["been", "I've", "English", "learning"], answer: ["I've", "been", "learning", "English"] },
          explain: "I've + been + learning + English.",
        },
        {
          id: "exp-gram-a7", type: "word_bank",
          prompt: "Ordena la pregunta:",
          payload: { words: ["have", "How", "long", "you", "been", "playing?"], answer: ["How", "long", "have", "you", "been", "playing?"] },
          explain: "How long + have + you + been + playing?",
        },
        {
          id: "exp-gram-a8", type: "cloze",
          prompt: "Completa: 'They have ___ working all day.' (auxiliar)",
          payload: { answer: "been" },
          explain: "have been + verbo-ing.",
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
      intro: "Competencia de ESCRITURA. Construye frases sobre tus experiencias.",
      activities: [
        {
          id: "exp-write-a1", type: "word_bank",
          prompt: "1. Di que llevas 5 anos trabajando aqui:",
          payload: { words: ["for", "I've", "here", "been", "working", "five", "years"], answer: ["I've", "been", "working", "here", "for", "five", "years"] },
        },
        {
          id: "exp-write-a2", type: "word_bank",
          prompt: "2. Di que has vivido en el extranjero desde 2019:",
          payload: { words: ["abroad", "I've", "since", "lived", "2019"], answer: ["I've", "lived", "abroad", "since", "2019"] },
        },
        {
          id: "exp-write-a3", type: "word_bank",
          prompt: "3. Di que tu ingles ha mejorado:",
          payload: { words: ["improved", "My", "has", "English"], answer: ["My", "English", "has", "improved"] },
        },
        {
          id: "exp-write-a4", type: "word_bank",
          prompt: "4. Pregunta cuanto tiempo lleva tocando la guitarra:",
          payload: { words: ["have", "How", "long", "you", "been", "playing?"], answer: ["How", "long", "have", "you", "been", "playing?"] },
        },
        {
          id: "exp-write-a5", type: "word_bank",
          prompt: "5. Di que has estado practicando cada dia:",
          payload: { words: ["day", "I've", "practising", "been", "every"], answer: ["I've", "been", "practising", "every", "day"] },
        },
        {
          id: "exp-write-a6", type: "multiple_choice",
          prompt: "6. Which word goes with a period of time?",
          payload: { choices: ["for", "since", "at"], answer: 0 },
        },
        {
          id: "exp-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["I have been work here.", "I have been working here.", "I have working here."], answer: 1 },
        },
        {
          id: "exp-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'lograr'?",
          payload: { choices: ["to try", "to achieve", "to improve"], answer: 1 },
        },
      ],
    },
  ],
};
