/**
 * data/units/a2-last-weekend.js — Unidad tematica "Last weekend" (A2).
 *
 * Datos PUROS. MODELO DESACOPLADO POR COMPETENCIA. Listening/Speaking con audio/IA.
 */

export const A2_LAST_WEEKEND = {
  id: "a2-last-weekend",
  language: "en",
  level: "A2",
  title: "Last weekend",
  subtitle: "Narrar lo que hiciste en pasado (regular e irregular)",

  cando: [
    "Puedo narrar acciones pasadas con el pasado simple.",
    "Puedo usar verbos irregulares comunes (go/went, have/had).",
    "Puedo hacer preguntas y negaciones con 'did/didn't'.",
    "Puedo contar una anecdota corta de mi fin de semana.",
  ],

  vocab: [
    { id: "a2lw-1", term: "to go (went)", translation: "ir (fue)", example: "I went to the beach." },
    { id: "a2lw-2", term: "to have (had)", translation: "tener (tuvo)", example: "We had a great time." },
    { id: "a2lw-3", term: "to meet (met)", translation: "conocer/encontrar (conocio)", example: "I met my friends." },
    { id: "a2lw-4", term: "to buy (bought)", translation: "comprar (compro)", example: "She bought a new phone." },
    { id: "a2lw-5", term: "to eat (ate)", translation: "comer (comio)", example: "We ate pizza." },
    { id: "a2lw-6", term: "to see (saw)", translation: "ver (vio)", example: "I saw a good film." },
    { id: "a2lw-7", term: "to take (took)", translation: "tomar (tomo)", example: "He took many photos." },
    { id: "a2lw-8", term: "to come (came)", translation: "venir (vino)", example: "My cousin came home." },
    { id: "a2lw-9", term: "beach", translation: "playa", example: "The beach was beautiful." },
    { id: "a2lw-10", term: "party", translation: "fiesta", example: "There was a party on Saturday." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a2lw-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: un fin de semana ocupado",
      intro: "Competencia de LECTURA. Lee la historia y comprueba que entendiste.",
      content: {
        reading:
          "Last weekend was very busy. On Saturday morning, I went to the beach with my friends. " +
          "We took a lot of photos and ate ice cream. In the evening, we had a party at Ana's house. " +
          "I met her cousin, who came from Spain. On Sunday, I bought a new book and saw a great film " +
          "at the cinema. I didn't study, but I relaxed a lot. It was a perfect weekend!",
        keyPhrases: [
          "Ordena los eventos: sabado manana, sabado noche, domingo.",
          "Fijate en los verbos irregulares en pasado.",
        ],
        check: [
          { prompt: "Where did the person go on Saturday?", choices: ["The office", "The beach", "The gym"], answer: 1 },
          { prompt: "Did the person study on Sunday?", choices: ["Yes", "No", "Only math"], answer: 1 },
          { prompt: "Where was the party?", choices: ["At Ana's house", "At the beach", "At the cinema"], answer: 0 },
          { prompt: "Where did the cousin come from?", choices: ["Italy", "Spain", "France"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "a2lw-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: verbos irregulares",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "go / went", translation: "ir / fue" },
        { term: "have / had", translation: "tener / tuvo" },
        { term: "eat / ate", translation: "comer / comio" },
        { term: "see / saw", translation: "ver / vio" },
        { term: "buy / bought", translation: "comprar / compro" },
        { term: "meet / met", translation: "conocer / conocio" },
      ],
      activities: [
        {
          id: "a2lw-vocab-a1", type: "matching",
          prompt: "Empareja el verbo con su pasado irregular:",
          payload: { pairs: [
            { left: "go", right: "went" },
            { left: "have", right: "had" },
            { left: "see", right: "saw" },
          ] },
        },
        {
          id: "a2lw-vocab-a2", type: "multiple_choice",
          prompt: "Which is the past of 'buy'?",
          payload: { choices: ["buyed", "bought", "buys"], answer: 1 },
          explain: "'buy' -> 'bought' (irregular).",
        },
        {
          id: "a2lw-vocab-a3", type: "cloze",
          prompt: "Completa: 'We ___ pizza last night.' (comer -> pasado)",
          payload: { answer: "ate" },
          explain: "'eat' -> 'ate'.",
        },
        {
          id: "a2lw-vocab-a4", type: "cloze",
          prompt: "Completa: 'He ___ many photos.' (tomar -> pasado)",
          payload: { answer: "took" },
          explain: "'take' -> 'took'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "a2lw-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: pasado simple",
      intro: "Competencia de GRAMATICA. Aprende afirmativo, negativo y pregunta en pasado.",
      grammar: {
        title: "Pasado simple (afirmativo, negativo, pregunta)",
        form: "afirm: verbo pasado · neg: didn't + base · preg: Did + sujeto + base?",
        examples: ["I went to the beach.", "I didn't go to work.", "Did you see the film?"],
        mistakes: [
          { wrong: "I didn't went home.", right: "I didn't go home." },
          { wrong: "Did you saw it?", right: "Did you see it?" },
        ],
      },
      activities: [
        {
          id: "a2lw-gram-a1", type: "cloze",
          prompt: "Completa: 'I ___ to the beach.' (ir -> pasado)",
          payload: { answer: "went" },
          explain: "'go' -> 'went'.",
        },
        {
          id: "a2lw-gram-a2", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["She didn't bought a phone.", "She didn't buy a phone.", "She don't buy a phone."], answer: 1 },
          explain: "Con 'didn't' el verbo va en base: 'didn't buy'.",
        },
        {
          id: "a2lw-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct question:",
          payload: { choices: ["Did you went home?", "Did you go home?", "Do you went home?"], answer: 1 },
          explain: "Con 'Did', el verbo va en base.",
        },
        {
          id: "a2lw-gram-a4", type: "word_bank",
          prompt: "Ordena la pregunta:",
          payload: { words: ["did", "What", "do?", "you"], answer: ["What", "did", "you", "do?"] },
          explain: "Orden: What + did + you + do?",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "a2lw-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: cuenta tu finde",
      intro: "Competencia de ESCRITURA. Construye frases sobre tu fin de semana. Ordena cada frase.",
      activities: [
        {
          id: "a2lw-write-a1", type: "word_bank",
          prompt: "Di que fuiste a la playa:",
          payload: { words: ["the", "I", "to", "went", "beach"], answer: ["I", "went", "to", "the", "beach"] },
        },
        {
          id: "a2lw-write-a2", type: "word_bank",
          prompt: "Di que la pasaste bien:",
          payload: { words: ["a", "I", "time", "had", "great"], answer: ["I", "had", "a", "great", "time"] },
        },
        {
          id: "a2lw-write-a3", type: "word_bank",
          prompt: "Di que no estudiaste:",
          payload: { words: ["study", "I", "didn't"], answer: ["I", "didn't", "study"] },
        },
        {
          id: "a2lw-write-a4", type: "multiple_choice",
          prompt: "Which is the past of 'meet'?",
          payload: { choices: ["meeted", "met", "meets"], answer: 1 },
        },
      ],
    },
  ],
};
