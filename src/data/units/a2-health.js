/**
 * data/units/a2-health.js — Unidad tematica "Health & body" (A2).
 *
 * Datos PUROS. MODELO DESACOPLADO POR COMPETENCIA. Listening/Speaking con audio/IA.
 */

export const A2_HEALTH = {
  id: "a2-health",
  language: "en",
  level: "A2",
  title: "Health & body",
  subtitle: "Hablar de sintomas y dar consejos con should y must",

  cando: [
    "Puedo nombrar partes del cuerpo y sintomas comunes.",
    "Puedo dar consejos con 'should' / 'shouldn't'.",
    "Puedo expresar obligacion con 'must' y 'have to'.",
    "Puedo describir como me siento en el doctor.",
  ],

  vocab: [
    { id: "a2hb-1", term: "headache", translation: "dolor de cabeza", example: "I have a headache." },
    { id: "a2hb-2", term: "fever", translation: "fiebre", example: "She has a fever." },
    { id: "a2hb-3", term: "medicine", translation: "medicina", example: "Take this medicine." },
    { id: "a2hb-4", term: "doctor", translation: "doctor", example: "You should see a doctor." },
    { id: "a2hb-5", term: "to rest", translation: "descansar", example: "You should rest at home." },
    { id: "a2hb-6", term: "sick / ill", translation: "enfermo", example: "He is sick today." },
    { id: "a2hb-7", term: "stomach", translation: "estomago", example: "My stomach hurts." },
    { id: "a2hb-8", term: "to hurt", translation: "doler", example: "My leg hurts." },
    { id: "a2hb-9", term: "healthy", translation: "sano / saludable", example: "Eat healthy food." },
    { id: "a2hb-10", term: "exercise", translation: "ejercicio", example: "You must do exercise." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a2hb-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: en el doctor",
      intro: "Competencia de LECTURA. Lee la escena y comprueba que entendiste.",
      content: {
        reading:
          "Tom feels sick. He has a headache and a fever. He goes to the doctor. 'You should rest " +
          "and drink a lot of water,' says the doctor. 'You shouldn't go to work today. You must " +
          "take this medicine twice a day. And you have to sleep well.' Tom listens carefully. " +
          "To be healthy, he also has to eat well and do exercise.",
        keyPhrases: [
          "Separa los consejos (should) de las obligaciones (must/have to).",
          "Busca que NO debe hacer Tom.",
        ],
        check: [
          { prompt: "What does Tom have?", choices: ["A cold only", "A headache and fever", "A broken leg"], answer: 1 },
          { prompt: "What should Tom NOT do?", choices: ["Rest", "Drink water", "Go to work"], answer: 2 },
          { prompt: "How often must he take the medicine?", choices: ["Once a day", "Twice a day", "Never"], answer: 1 },
          { prompt: "What must he do to be healthy?", choices: ["Eat well and exercise", "Work more", "Sleep less"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "a2hb-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: salud y sintomas",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "headache / fever", translation: "dolor de cabeza / fiebre" },
        { term: "medicine", translation: "medicina" },
        { term: "doctor", translation: "doctor" },
        { term: "to rest", translation: "descansar" },
        { term: "sick / ill", translation: "enfermo" },
        { term: "to hurt / healthy", translation: "doler / saludable" },
      ],
      activities: [
        {
          id: "a2hb-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "headache", right: "dolor de cabeza" },
            { left: "fever", right: "fiebre" },
            { left: "medicine", right: "medicina" },
          ] },
        },
        {
          id: "a2hb-vocab-a2", type: "multiple_choice",
          prompt: "Which word means 'doler'?",
          payload: { choices: ["to rest", "to hurt", "to buy"], answer: 1 },
          explain: "'To hurt' = doler.",
        },
        {
          id: "a2hb-vocab-a3", type: "cloze",
          prompt: "Completa: 'I have a ___.' (dolor de cabeza)",
          payload: { answer: "headache" },
          explain: "'Headache' = dolor de cabeza.",
        },
        {
          id: "a2hb-vocab-a4", type: "multiple_choice",
          prompt: "Which word means 'descansar'?",
          payload: { choices: ["to rest", "to hurt", "to exercise"], answer: 0 },
          explain: "'To rest' = descansar.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "a2hb-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: should / must / have to",
      intro: "Competencia de GRAMATICA. Aprende a aconsejar y obligar y practicalo.",
      grammar: {
        title: "should / must / have to",
        form: "sujeto + should/must + base · sujeto + have/has to + base",
        examples: ["You should rest.", "You must take the medicine.", "She has to sleep well."],
        mistakes: [
          { wrong: "You should to rest.", right: "You should rest." },
          { wrong: "He have to sleep.", right: "He has to sleep." },
        ],
      },
      activities: [
        {
          id: "a2hb-gram-a1", type: "cloze",
          prompt: "Completa: 'You ___ rest and drink water.' (consejo)",
          payload: { answer: "should" },
          explain: "'should' da un consejo.",
        },
        {
          id: "a2hb-gram-a2", type: "cloze",
          prompt: "Completa: 'She ___ to sleep well.' (has/have)",
          payload: { answer: "has" },
          explain: "Con she/he/it: 'has to'.",
        },
        {
          id: "a2hb-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["You shouldn't works when sick.", "You shouldn't work when sick.", "You shouldn't to work when sick."], answer: 1 },
          explain: "'shouldn't' + verbo base.",
        },
        {
          id: "a2hb-gram-a4", type: "word_bank",
          prompt: "Ordena el consejo:",
          payload: { words: ["should", "You", "a", "see", "doctor"], answer: ["You", "should", "see", "a", "doctor"] },
          explain: "Orden: You + should + see + a + doctor.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "a2hb-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: aconseja a un amigo",
      intro: "Competencia de ESCRITURA. Construye consejos de salud. Ordena cada frase.",
      activities: [
        {
          id: "a2hb-write-a1", type: "word_bank",
          prompt: "Aconseja descansar:",
          payload: { words: ["rest", "You", "should"], answer: ["You", "should", "rest"] },
        },
        {
          id: "a2hb-write-a2", type: "word_bank",
          prompt: "Di que debe tomar la medicina:",
          payload: { words: ["the", "You", "take", "must", "medicine"], answer: ["You", "must", "take", "the", "medicine"] },
        },
        {
          id: "a2hb-write-a3", type: "word_bank",
          prompt: "Aconseja no ir a trabajar:",
          payload: { words: ["work", "You", "go", "to", "shouldn't"], answer: ["You", "shouldn't", "go", "to", "work"] },
        },
        {
          id: "a2hb-write-a4", type: "multiple_choice",
          prompt: "Which gives advice (not obligation)?",
          payload: { choices: ["You must rest.", "You should rest.", "You have to rest."], answer: 1 },
        },
      ],
    },
  ],
};
