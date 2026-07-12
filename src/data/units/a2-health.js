/**
 * data/units/a2-health.js — Unidad tematica "Health & body" (A2).
 *
 * Datos PUROS. Salud y consejos con should, must y have to. Ciclo PPP del
 * estandar de calidad (ver PLAN-DE-ESTUDIO.md).
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
    {
      id: "a2hb-l0",
      order: 1,
      phase: "learn",
      skills: ["reading", "vocabulary"],
      title: "Aprende: en el doctor",
      intro:
        "Lee la escena y estudia should, must y have to. Aqui solo se lee y se aprende.",
      teachesVocab: true,
      content: {
        reading:
          "Tom feels sick. He has a headache and a fever. He goes to the doctor. 'You should rest " +
          "and drink a lot of water,' says the doctor. 'You shouldn't go to work today. You must " +
          "take this medicine twice a day. And you have to sleep well.' Tom listens carefully. " +
          "To be healthy, he also has to eat well and do exercise.",
        glossary: [
          { term: "feels sick", translation: "se siente enfermo" },
          { term: "should", translation: "deberia (consejo)" },
          { term: "shouldn't", translation: "no deberia" },
          { term: "must", translation: "debe (obligacion fuerte)" },
          { term: "have to", translation: "tiene que (obligacion)" },
          { term: "twice a day", translation: "dos veces al dia" },
        ],
        keyPhrases: [
          "You should / shouldn't... (Deberias / No deberias...)",
          "You must... (Debes...)",
          "You have to... (Tienes que...)",
          "I have a headache. (Tengo dolor de cabeza.)",
        ],
        note:
          "'should' da CONSEJOS (deberias). 'must' y 'have to' expresan OBLIGACION. Todos van con " +
          "verbo base: 'You should rest', 'You must take', 'You have to sleep'.",
        grammar: {
          title: "should / must / have to",
          form: "sujeto + should/must + verbo base · sujeto + have/has to + verbo base",
          examples: [
            "You should rest.",
            "You must take the medicine.",
            "She has to sleep well.",
          ],
          mistakes: [
            { wrong: "You should to rest.", right: "You should rest." },
            { wrong: "He have to sleep.", right: "He has to sleep." },
          ],
        },
        check: [
          { prompt: "What does Tom have?", choices: ["A cold only", "A headache and fever", "A broken leg"], answer: 1 },
          { prompt: "What should Tom NOT do?", choices: ["Rest", "Drink water", "Go to work"], answer: 2 },
        ],
      },
      activities: [],
    },
    {
      id: "a2hb-l1",
      order: 2,
      phase: "present",
      skills: ["grammar", "vocabulary"],
      title: "Presentacion: dar consejos",
      intro: "Usamos 'should' para aconsejar y 'must/have to' para obligar. Lee el dialogo.",
      dialogue: [
        "A: I have a terrible headache.",
        "B: You should drink water and rest.",
        "A: I have a lot of work, though.",
        "B: You shouldn't work when you're sick. You must see a doctor.",
      ],
      activities: [
        {
          id: "a2hb-l1-a1", type: "multiple_choice",
          prompt: "Choose the correct advice:",
          payload: { choices: ["You should to rest.", "You should rest.", "You should resting."], answer: 1 },
          explain: "'should' + verbo base, sin 'to' y sin -ing.",
        },
        {
          id: "a2hb-l1-a2", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "headache", right: "dolor de cabeza" },
            { left: "fever", right: "fiebre" },
            { left: "medicine", right: "medicina" },
          ] },
        },
      ],
    },
    {
      id: "a2hb-l2",
      order: 3,
      phase: "practice",
      skills: ["grammar", "vocabulary"],
      title: "Practica: should y must",
      intro: "Completa, elige y ordena para practicar.",
      activities: [
        {
          id: "a2hb-l2-a1", type: "cloze",
          prompt: "Completa: 'You ___ rest and drink water.' (consejo)",
          payload: { answer: "should" },
          explain: "'should' da un consejo.",
        },
        {
          id: "a2hb-l2-a2", type: "cloze",
          prompt: "Completa: 'She ___ to sleep well.' (obligacion, has/have)",
          payload: { answer: "has" },
          explain: "Con she/he/it: 'has to'.",
        },
        {
          id: "a2hb-l2-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "You shouldn't works when sick.",
            "You shouldn't work when sick.",
            "You shouldn't to work when sick.",
          ], answer: 1 },
          explain: "'shouldn't' + verbo base: 'shouldn't work'.",
        },
        {
          id: "a2hb-l2-a4", type: "word_bank",
          prompt: "Ordena el consejo:",
          payload: { words: ["should", "You", "a", "see", "doctor"],
                     answer: ["You", "should", "see", "a", "doctor"] },
          explain: "Orden: You + should + see + a + doctor.",
        },
        {
          id: "a2hb-l2-a5", type: "cloze",
          prompt: "Completa: 'I have a ___.' (dolor de cabeza)",
          payload: { answer: "headache" },
          explain: "'Headache' = dolor de cabeza.",
        },
      ],
    },
    {
      id: "a2hb-l3",
      order: 4,
      phase: "produce",
      skills: ["writing", "grammar"],
      title: "Produccion: aconseja a un amigo",
      intro: "Tarea real: construye consejos de salud. Ordena cada frase.",
      activities: [
        {
          id: "a2hb-l3-a1", type: "word_bank",
          prompt: "Aconseja descansar:",
          payload: { words: ["rest", "You", "should"], answer: ["You", "should", "rest"] },
        },
        {
          id: "a2hb-l3-a2", type: "word_bank",
          prompt: "Di que debe tomar la medicina:",
          payload: { words: ["the", "You", "take", "must", "medicine"],
                     answer: ["You", "must", "take", "the", "medicine"] },
        },
        {
          id: "a2hb-l3-a3", type: "word_bank",
          prompt: "Aconseja no ir a trabajar:",
          payload: { words: ["work", "You", "go", "to", "shouldn't"],
                     answer: ["You", "shouldn't", "go", "to", "work"] },
        },
        {
          id: "a2hb-l3-a4", type: "multiple_choice",
          prompt: "Which word means 'doler'?",
          payload: { choices: ["to rest", "to hurt", "to buy"], answer: 1 },
        },
      ],
    },
  ],
};
