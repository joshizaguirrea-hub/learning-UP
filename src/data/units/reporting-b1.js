/**
 * data/units/reporting-b1.js — Unidad tematica "Reporting & opinions" (B1).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: question tags.
 */

export const REPORTING_B1 = {
  id: "reporting-b1",
  language: "en",
  level: "B1",
  title: "Reporting & opinions",
  subtitle: "Dar opiniones, estar de acuerdo y usar question tags",

  cando: [
    "Puedo dar mi opinion y estar de acuerdo o en desacuerdo.",
    "Puedo usar question tags (..., isn't it?).",
    "Puedo pedir confirmacion de forma natural.",
    "Puedo escribir una opinion breve y clara.",
  ],

  vocab: [
    { id: "rep-1", term: "opinion", translation: "opinion", example: "In my opinion, it's true." },
    { id: "rep-2", term: "to agree", translation: "estar de acuerdo", example: "I agree with you." },
    { id: "rep-3", term: "to disagree", translation: "estar en desacuerdo", example: "I disagree with that." },
    { id: "rep-4", term: "point of view", translation: "punto de vista", example: "I see your point of view." },
    { id: "rep-5", term: "to suggest", translation: "sugerir", example: "I suggest a new plan." },
    { id: "rep-6", term: "in my opinion", translation: "en mi opinion", example: "In my opinion, it's fair." },
    { id: "rep-7", term: "however", translation: "sin embargo", example: "It's good; however, it's expensive." },
    { id: "rep-8", term: "to admit", translation: "admitir", example: "I admit I was wrong." },
    { id: "rep-9", term: "true", translation: "cierto / verdad", example: "That's true." },
    { id: "rep-10", term: "right", translation: "correcto / tener razon", example: "You are right." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "rep-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: una conversacion de opiniones",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "Tom and Lisa are talking about remote work. 'Working from home is great, isn't it?' says Tom. " +
          "'In my opinion, yes,' Lisa agrees. 'You save time, don't you?' 'That's true. However, I " +
          "sometimes miss my colleagues.' Tom admits she has a point. 'We should meet once a week, " +
          "shouldn't we?' he suggests. Lisa agrees. They don't always share the same point of view, but " +
          "they respect each other's opinions.",
        keyPhrases: [
          "Fijate en las question tags: isn't it?, don't you?, shouldn't we?",
          "Busca en que estan de acuerdo y en que no.",
        ],
        check: [
          { prompt: "What are they talking about?", choices: ["Remote work", "Travel", "Food"], answer: 0 },
          { prompt: "What does Lisa sometimes miss?", choices: ["Her office chair", "Her colleagues", "The bus"], answer: 1 },
          { prompt: "What does Tom suggest?", choices: ["Never meet", "Meet once a week", "Quit the job"], answer: 1 },
          { prompt: "Do they always share the same view?", choices: ["Yes", "No, but they respect each other", "They argue a lot"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "rep-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: opiniones",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "opinion / point of view", translation: "opinion / punto de vista" },
        { term: "to agree / to disagree", translation: "estar de acuerdo / en desacuerdo" },
        { term: "to suggest", translation: "sugerir" },
        { term: "however", translation: "sin embargo" },
        { term: "to admit", translation: "admitir" },
        { term: "true / right", translation: "cierto / correcto" },
      ],
      activities: [
        {
          id: "rep-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "to agree", right: "estar de acuerdo" },
            { left: "however", right: "sin embargo" },
            { left: "to suggest", right: "sugerir" },
          ] },
        },
        {
          id: "rep-vocab-a2", type: "cloze",
          prompt: "Completa: 'I ___ with that idea.' (estar en desacuerdo)",
          payload: { answer: "disagree" },
          explain: "'To disagree' = estar en desacuerdo.",
        },
        {
          id: "rep-vocab-a3", type: "multiple_choice",
          prompt: "Which phrase introduces your opinion?",
          payload: { choices: ["In my opinion", "By the way", "At last"], answer: 0 },
          explain: "'In my opinion' = en mi opinion.",
        },
        {
          id: "rep-vocab-a4", type: "cloze",
          prompt: "Completa: 'You are ___.' (tienes razon)",
          payload: { answer: "right" },
          explain: "'You are right' = tienes razon.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "rep-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: question tags",
      intro: "Competencia de GRAMATICA. Aprende las question tags para pedir confirmacion.",
      grammar: {
        title: "Question tags",
        form: "afirmativo -> tag negativa (is, isn't it?) · negativo -> tag afirmativa (don't, do you?)",
        examples: ["It's great, isn't it?", "You save time, don't you?", "We should meet, shouldn't we?"],
        mistakes: [
          { wrong: "It's great, is it?", right: "It's great, isn't it?" },
          { wrong: "You like it, don't it?", right: "You like it, don't you?" },
        ],
      },
      activities: [
        {
          id: "rep-gram-a1", type: "cloze",
          prompt: "Completa: 'It's a good idea, ___ it?' (tag de 'is')",
          payload: { answer: "isn't" },
          explain: "Afirmativo 'is' -> tag negativa 'isn't it?'.",
        },
        {
          id: "rep-gram-a2", type: "multiple_choice",
          prompt: "Choose the correct tag: 'You work here, ___?'",
          payload: { choices: ["don't you?", "do you?", "aren't you?"], answer: 0 },
          explain: "Present simple afirmativo -> 'don't you?'.",
        },
        {
          id: "rep-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct tag: 'We should meet, ___?'",
          payload: { choices: ["should we?", "shouldn't we?", "don't we?"], answer: 1 },
          explain: "'should' afirmativo -> 'shouldn't we?'.",
        },
        {
          id: "rep-gram-a4", type: "word_bank",
          prompt: "Ordena la frase con tag:",
          payload: { words: ["nice,", "It's", "it?", "isn't"], answer: ["It's", "nice,", "isn't", "it?"] },
          explain: "Orden: It's + nice, + isn't + it?",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "rep-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: da tu opinion",
      intro: "Competencia de ESCRITURA. Construye frases para opinar. Ordena cada frase.",
      activities: [
        {
          id: "rep-write-a1", type: "word_bank",
          prompt: "Da tu opinion:",
          payload: { words: ["opinion,", "In", "it's", "my", "true"], answer: ["In", "my", "opinion,", "it's", "true"] },
        },
        {
          id: "rep-write-a2", type: "word_bank",
          prompt: "Di que estas de acuerdo con ella:",
          payload: { words: ["her", "I", "with", "agree"], answer: ["I", "agree", "with", "her"] },
        },
        {
          id: "rep-write-a3", type: "word_bank",
          prompt: "Pide confirmacion con una tag:",
          payload: { words: ["good,", "It's", "it?", "isn't"], answer: ["It's", "good,", "isn't", "it?"] },
        },
        {
          id: "rep-write-a4", type: "multiple_choice",
          prompt: "Which word means 'sin embargo'?",
          payload: { choices: ["however", "because", "so"], answer: 0 },
        },
      ],
    },
  ],
};
