/**
 * data/units/lifestyle-b1.js — Unidad tematica "Health & lifestyle" (B1).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: modales de deduccion + too/enough.
 */

export const LIFESTYLE_B1 = {
  id: "lifestyle-b1",
  language: "en",
  level: "B1",
  title: "Health & lifestyle",
  subtitle: "Hablar de habitos saludables y hacer deducciones",

  cando: [
    "Puedo hablar de estilo de vida y habitos saludables.",
    "Puedo hacer deducciones con must / might / can't.",
    "Puedo usar 'too' y 'enough'.",
    "Puedo escribir consejos para una vida sana.",
  ],

  vocab: [
    { id: "life-1", term: "habit", translation: "habito", example: "Sleeping well is a good habit." },
    { id: "life-2", term: "diet", translation: "dieta / alimentacion", example: "A balanced diet is important." },
    { id: "life-3", term: "to relax", translation: "relajarse", example: "I relax after work." },
    { id: "life-4", term: "stress", translation: "estres", example: "Too much stress is bad." },
    { id: "life-5", term: "sleep", translation: "sueno / dormir", example: "I need eight hours of sleep." },
    { id: "life-6", term: "fit", translation: "en forma", example: "Running keeps me fit." },
    { id: "life-7", term: "junk food", translation: "comida chatarra", example: "Junk food is unhealthy." },
    { id: "life-8", term: "to avoid", translation: "evitar", example: "Try to avoid sugar." },
    { id: "life-9", term: "energy", translation: "energia", example: "I have no energy today." },
    { id: "life-10", term: "balance", translation: "equilibrio", example: "Life needs balance." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "life-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: una vida sana",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "Daniel looks tired all the time. He must be very stressed, or he might not sleep enough. " +
          "He eats too much junk food and doesn't have enough energy for exercise. His doctor says he " +
          "can't be healthy with these habits. 'You should change your diet and avoid sugar,' she says. " +
          "'You need more balance.' Now Daniel sleeps eight hours, eats better and feels fit. A healthy " +
          "lifestyle isn't too difficult; you just need good habits.",
        keyPhrases: [
          "Fijate en las deducciones: must be, might not, can't be.",
          "Fijate en 'too much' y 'enough'.",
        ],
        check: [
          { prompt: "Why is Daniel probably tired?", choices: ["He sleeps a lot", "He might not sleep enough", "He exercises too much"], answer: 1 },
          { prompt: "What does he eat too much of?", choices: ["Vegetables", "Junk food", "Fruit"], answer: 1 },
          { prompt: "What does the doctor suggest?", choices: ["Change his diet", "Eat more sugar", "Sleep less"], answer: 0 },
          { prompt: "How does Daniel feel now?", choices: ["Tired", "Fit", "Stressed"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "life-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: salud y habitos",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "habit / balance", translation: "habito / equilibrio" },
        { term: "diet / junk food", translation: "dieta / comida chatarra" },
        { term: "to relax / stress", translation: "relajarse / estres" },
        { term: "sleep / energy", translation: "sueno / energia" },
        { term: "fit", translation: "en forma" },
        { term: "to avoid", translation: "evitar" },
      ],
      activities: [
        {
          id: "life-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "habit", right: "habito" },
            { left: "stress", right: "estres" },
            { left: "diet", right: "dieta" },
          ] },
        },
        {
          id: "life-vocab-a2", type: "cloze",
          prompt: "Completa: 'Try to ___ sugar.' (evitar)",
          payload: { answer: "avoid" },
          explain: "'To avoid' = evitar.",
        },
        {
          id: "life-vocab-a3", type: "multiple_choice",
          prompt: "Which is unhealthy food?",
          payload: { choices: ["junk food", "balance", "sleep"], answer: 0 },
          explain: "'Junk food' = comida chatarra.",
        },
        {
          id: "life-vocab-a4", type: "cloze",
          prompt: "Completa: 'Running keeps me ___.' (en forma)",
          payload: { answer: "fit" },
          explain: "'Fit' = en forma.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "life-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: deduccion y too/enough",
      intro: "Competencia de GRAMATICA. Aprende must/might/can't y too/enough.",
      grammar: {
        title: "Modales de deduccion + too / enough",
        form: "must (seguro) / might (posible) / can't (imposible) + base · too + adj · adj + enough",
        examples: ["He must be tired.", "She might be sick.", "It's too difficult.", "It's not easy enough."],
        mistakes: [
          { wrong: "He must to be tired.", right: "He must be tired." },
          { wrong: "It's enough easy.", right: "It's easy enough." },
        ],
      },
      activities: [
        {
          id: "life-gram-a1", type: "cloze",
          prompt: "Completa: 'He looks tired. He ___ be stressed.' (deduccion segura)",
          payload: { answer: "must" },
          explain: "'must' = casi seguro.",
        },
        {
          id: "life-gram-a2", type: "cloze",
          prompt: "Completa: 'He eats ___ much junk food.' (demasiado)",
          payload: { answer: "too" },
          explain: "'too much' + incontable = demasiado.",
        },
        {
          id: "life-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["She can't to be sick.", "She might be sick.", "She might to be sick."], answer: 1 },
          explain: "Modal + verbo base sin 'to': 'might be'.",
        },
        {
          id: "life-gram-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["enough", "sleep", "don't", "I"], answer: ["I", "don't", "sleep", "enough"] },
          explain: "Orden: I + don't + sleep + enough.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "life-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: consejos de vida sana",
      intro: "Competencia de ESCRITURA. Construye consejos saludables. Ordena cada frase.",
      activities: [
        {
          id: "life-write-a1", type: "word_bank",
          prompt: "Aconseja evitar el azucar:",
          payload: { words: ["sugar", "You", "avoid", "should"], answer: ["You", "should", "avoid", "sugar"] },
        },
        {
          id: "life-write-a2", type: "word_bank",
          prompt: "Di que necesitas mas equilibrio:",
          payload: { words: ["balance", "I", "more", "need"], answer: ["I", "need", "more", "balance"] },
        },
        {
          id: "life-write-a3", type: "word_bank",
          prompt: "Haz una deduccion (debe estar cansado):",
          payload: { words: ["tired", "He", "be", "must"], answer: ["He", "must", "be", "tired"] },
        },
        {
          id: "life-write-a4", type: "multiple_choice",
          prompt: "Which means it is impossible?",
          payload: { choices: ["He must be sick.", "He might be sick.", "He can't be sick."], answer: 2 },
        },
      ],
    },
  ],
};
