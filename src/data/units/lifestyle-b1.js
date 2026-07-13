/**
 * data/units/lifestyle-b1.js — Unidad tematica "Health & lifestyle" (B1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: deduccion + too/enough.
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
    { id: "life-11", term: "to exercise", translation: "hacer ejercicio", example: "You should exercise daily." },
    { id: "life-12", term: "wellbeing", translation: "bienestar", example: "Sleep improves wellbeing." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "life-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: una vida sana",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Daniel's habits\n" +
          "Daniel looks tired all the time. He must be very stressed, or he might not sleep enough. He " +
          "eats too much junk food and doesn't have enough energy for exercise. His doctor says he can't " +
          "be healthy with these habits. 'You should change your diet and avoid sugar,' she says. 'You " +
          "need more balance.' Now Daniel sleeps eight hours, eats better and feels fit.\n\n" +
          "TEXT 2 - Talking about wellbeing\n" +
          "A: You look great! What's your secret? B: I exercise every morning and I avoid junk food. A: I'm " +
          "too tired to exercise. B: You might not sleep enough. A: True, I sleep too little. B: You should " +
          "relax more. Good sleep is the key to wellbeing.",
        glossary: [
          { term: "must be / might not", translation: "debe estar / quizas no" },
          { term: "can't be", translation: "no puede estar" },
          { term: "too much / not enough", translation: "demasiado / no suficiente" },
          { term: "junk food / diet", translation: "comida chatarra / dieta" },
          { term: "to avoid / to relax", translation: "evitar / relajarse" },
          { term: "fit / balance", translation: "en forma / equilibrio" },
          { term: "wellbeing", translation: "bienestar" },
          { term: "the key to", translation: "la clave para" },
        ],
        keyPhrases: [
          "Fijate en las deducciones: must be, might not, can't be.",
          "Fijate en 'too much' y 'enough'.",
        ],
        check: [
          { prompt: "T1: Why is Daniel probably tired?", choices: ["He sleeps a lot", "He might not sleep enough", "He exercises too much"], answer: 1 },
          { prompt: "T1: What does he eat too much of?", choices: ["Vegetables", "Junk food", "Fruit"], answer: 1 },
          { prompt: "T1: What does the doctor suggest?", choices: ["Change his diet", "Eat more sugar", "Sleep less"], answer: 0 },
          { prompt: "T2: What is B's secret?", choices: ["Exercise and avoid junk food", "Sleeping late", "Eating sugar"], answer: 0 },
          { prompt: "T2: Why is A too tired?", choices: ["Sleeps too little", "Works too little", "Eats vegetables"], answer: 0 },
          { prompt: "T2: What is the key to wellbeing?", choices: ["Good sleep", "Junk food", "Stress"], answer: 0 },
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
        { term: "fit / to exercise", translation: "en forma / hacer ejercicio" },
        { term: "to avoid / wellbeing", translation: "evitar / bienestar" },
      ],
      activities: [
        {
          id: "life-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "habit", right: "habito" },
            { left: "stress", right: "estres" },
            { left: "diet", right: "dieta" },
            { left: "balance", right: "equilibrio" },
          ] },
        },
        {
          id: "life-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to relax", right: "relajarse" },
            { left: "to avoid", right: "evitar" },
            { left: "fit", right: "en forma" },
            { left: "wellbeing", right: "bienestar" },
          ] },
        },
        {
          id: "life-vocab-a3", type: "cloze",
          prompt: "Completa: 'Try to ___ sugar.' (evitar)",
          payload: { answer: "avoid" },
          explain: "'To avoid' = evitar.",
        },
        {
          id: "life-vocab-a4", type: "cloze",
          prompt: "Completa: 'Running keeps me ___.' (en forma)",
          payload: { answer: "fit" },
          explain: "'Fit' = en forma.",
        },
        {
          id: "life-vocab-a5", type: "cloze",
          prompt: "Completa: 'You should ___ daily.' (hacer ejercicio)",
          payload: { answer: "exercise" },
          explain: "'To exercise' = hacer ejercicio.",
        },
        {
          id: "life-vocab-a6", type: "multiple_choice",
          prompt: "Which is unhealthy food?",
          payload: { choices: ["junk food", "balance", "sleep"], answer: 0 },
          explain: "'Junk food' = comida chatarra.",
        },
        {
          id: "life-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'bienestar'?",
          payload: { choices: ["wellbeing", "stress", "habit"], answer: 0 },
          explain: "'Wellbeing' = bienestar.",
        },
        {
          id: "life-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["balance", "Life", "needs"], answer: ["Life", "needs", "balance"] },
          explain: "'Life needs balance' = la vida necesita equilibrio.",
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
          { wrong: "She might to be sick.", right: "She might be sick." },
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
          id: "life-gram-a3", type: "cloze",
          prompt: "Completa: 'I don't sleep ___.' (suficiente, va al final)",
          payload: { answer: "enough" },
          explain: "'enough' va despues del verbo o antes del sustantivo.",
        },
        {
          id: "life-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["She can't to be sick.", "She might be sick.", "She might to be sick."], answer: 1 },
          explain: "Modal + verbo base sin 'to': 'might be'.",
        },
        {
          id: "life-gram-a5", type: "multiple_choice",
          prompt: "Which means it is impossible?",
          payload: { choices: ["He must be sick.", "He might be sick.", "He can't be sick."], answer: 2 },
          explain: "'can't be' = deduccion de imposibilidad.",
        },
        {
          id: "life-gram-a6", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["enough", "sleep", "don't", "I"], answer: ["I", "don't", "sleep", "enough"] },
          explain: "I + don't + sleep + enough.",
        },
        {
          id: "life-gram-a7", type: "word_bank",
          prompt: "Ordena la deduccion:",
          payload: { words: ["tired", "He", "be", "must"], answer: ["He", "must", "be", "tired"] },
          explain: "He + must + be + tired.",
        },
        {
          id: "life-gram-a8", type: "cloze",
          prompt: "Completa: 'It's ___ difficult for me.' (demasiado)",
          payload: { answer: "too" },
          explain: "'too' + adjetivo = demasiado.",
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
      intro: "Competencia de ESCRITURA. Construye consejos saludables, frase por frase.",
      activities: [
        {
          id: "life-write-a1", type: "word_bank",
          prompt: "1. Aconseja evitar el azucar:",
          payload: { words: ["sugar", "You", "avoid", "should"], answer: ["You", "should", "avoid", "sugar"] },
        },
        {
          id: "life-write-a2", type: "word_bank",
          prompt: "2. Di que necesitas mas equilibrio:",
          payload: { words: ["balance", "I", "more", "need"], answer: ["I", "need", "more", "balance"] },
        },
        {
          id: "life-write-a3", type: "word_bank",
          prompt: "3. Haz una deduccion (debe estar cansado):",
          payload: { words: ["tired", "He", "be", "must"], answer: ["He", "must", "be", "tired"] },
        },
        {
          id: "life-write-a4", type: "word_bank",
          prompt: "4. Di que no duermes suficiente:",
          payload: { words: ["enough", "I", "sleep", "don't"], answer: ["I", "don't", "sleep", "enough"] },
        },
        {
          id: "life-write-a5", type: "word_bank",
          prompt: "5. Aconseja hacer ejercicio a diario:",
          payload: { words: ["daily", "You", "exercise", "should"], answer: ["You", "should", "exercise", "daily"] },
        },
        {
          id: "life-write-a6", type: "multiple_choice",
          prompt: "6. Which means it is impossible?",
          payload: { choices: ["He must be sick.", "He might be sick.", "He can't be sick."], answer: 2 },
        },
        {
          id: "life-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["It's enough easy.", "It's easy enough.", "It's easy too."], answer: 1 },
        },
        {
          id: "life-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'comida chatarra'?",
          payload: { choices: ["junk food", "balance", "diet"], answer: 0 },
        },
      ],
    },
  ],
};
