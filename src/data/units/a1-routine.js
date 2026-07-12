/**
 * data/units/a1-routine.js — Unidad tematica "Daily routine" (A1).
 *
 * Datos PUROS. MODELO DESACOPLADO POR COMPETENCIA. Listening/Speaking con audio/IA.
 */

export const A1_ROUTINE = {
  id: "a1-routine",
  language: "en",
  level: "A1",
  title: "Daily routine",
  subtitle: "Hablar de tu dia a dia, la hora y la frecuencia",

  cando: [
    "Puedo describir mi rutina diaria.",
    "Puedo usar el present simple (I get up, she works).",
    "Puedo decir la hora de forma basica.",
    "Puedo usar adverbios de frecuencia (always, usually, never).",
  ],

  vocab: [
    { id: "a1r-1", term: "to get up", translation: "levantarse", example: "I get up at seven." },
    { id: "a1r-2", term: "to have breakfast", translation: "desayunar", example: "We have breakfast at eight." },
    { id: "a1r-3", term: "to go to work", translation: "ir al trabajo", example: "He goes to work by bus." },
    { id: "a1r-4", term: "to start", translation: "empezar", example: "My classes start at nine." },
    { id: "a1r-5", term: "to finish", translation: "terminar", example: "I finish work at five." },
    { id: "a1r-6", term: "to go to bed", translation: "acostarse", example: "She goes to bed at eleven." },
    { id: "a1r-7", term: "always", translation: "siempre", example: "I always drink coffee." },
    { id: "a1r-8", term: "usually", translation: "usualmente", example: "We usually walk to school." },
    { id: "a1r-9", term: "sometimes", translation: "a veces", example: "He sometimes reads at night." },
    { id: "a1r-10", term: "never", translation: "nunca", example: "I never eat late." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a1r-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: un dia normal",
      intro: "Competencia de LECTURA. Lee la rutina de Peter y comprueba que entendiste.",
      content: {
        reading:
          "Peter is a nurse. He gets up at six o'clock every day. He always has breakfast " +
          "at six thirty. Then he goes to work by bus. He starts work at seven and finishes " +
          "at three. In the evening, he usually cooks dinner and watches TV. He sometimes " +
          "reads a book. He never goes to bed late because he is tired.",
        keyPhrases: [
          "Busca las horas: cuando se levanta? cuando termina?",
          "Fijate en los adverbios: always, usually, sometimes, never.",
        ],
        check: [
          { prompt: "What is Peter's job?", choices: ["Teacher", "Nurse", "Driver"], answer: 1 },
          { prompt: "When does he go to bed?", choices: ["Late", "Not late", "At noon"], answer: 1 },
          { prompt: "How does he go to work?", choices: ["By car", "By bus", "On foot"], answer: 1 },
          { prompt: "What time does he start work?", choices: ["Six", "Seven", "Three"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "a1r-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: rutina y frecuencia",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "to get up", translation: "levantarse" },
        { term: "to have breakfast", translation: "desayunar" },
        { term: "to go to work", translation: "ir al trabajo" },
        { term: "to start / to finish", translation: "empezar / terminar" },
        { term: "to go to bed", translation: "acostarse" },
        { term: "always / usually / sometimes / never", translation: "siempre / usualmente / a veces / nunca" },
      ],
      activities: [
        {
          id: "a1r-vocab-a1", type: "matching",
          prompt: "Empareja la frecuencia con su significado:",
          payload: { pairs: [
            { left: "always", right: "siempre" },
            { left: "sometimes", right: "a veces" },
            { left: "never", right: "nunca" },
          ] },
        },
        {
          id: "a1r-vocab-a2", type: "cloze",
          prompt: "Completa: 'We have ___ at eight.' (desayuno)",
          payload: { answer: "breakfast" },
          explain: "'Breakfast' = desayuno.",
        },
        {
          id: "a1r-vocab-a3", type: "multiple_choice",
          prompt: "Which sentence is about the night?",
          payload: { choices: ["I get up at seven.", "I go to bed at eleven.", "I have breakfast."], answer: 1 },
          explain: "'Go to bed' = acostarse (de noche).",
        },
        {
          id: "a1r-vocab-a4", type: "cloze",
          prompt: "Completa: 'I ___ work at five.' (terminar)",
          payload: { answer: "finish" },
          explain: "'Finish' = terminar.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "a1r-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: present simple",
      intro: "Competencia de GRAMATICA. Aprende el present simple y practicalo.",
      grammar: {
        title: "Present simple (rutinas)",
        form: "I/you/we/they + verbo · he/she/it + verbo + s",
        examples: ["I work in a hospital.", "She works in a hospital.", "He always gets up early."],
        mistakes: [
          { wrong: "He get up at six.", right: "He gets up at six." },
          { wrong: "I drink always coffee.", right: "I always drink coffee." },
        ],
      },
      activities: [
        {
          id: "a1r-gram-a1", type: "cloze",
          prompt: "Completa: 'She ___ to work by bus.' (goes/go)",
          payload: { answer: "goes" },
          explain: "Con 'she' el verbo 'go' se vuelve 'goes'.",
        },
        {
          id: "a1r-gram-a2", type: "cloze",
          prompt: "Completa: 'I ___ get up early.' (siempre)",
          payload: { answer: "always" },
          explain: "El adverbio de frecuencia va antes del verbo.",
        },
        {
          id: "a1r-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["He finish work at five.", "He finishes work at five.", "He finishing work at five."], answer: 1 },
          explain: "Con 'he' el verbo lleva -es: finishes.",
        },
        {
          id: "a1r-gram-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["at", "get", "I", "up", "seven"], answer: ["I", "get", "up", "at", "seven"] },
          explain: "Orden: I + get up + at + (hora).",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "a1r-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: describe tu rutina",
      intro: "Competencia de ESCRITURA. Construye frases sobre tu dia. Ordena cada frase.",
      activities: [
        {
          id: "a1r-write-a1", type: "word_bank",
          prompt: "Di a que hora te levantas:",
          payload: { words: ["up", "I", "at", "get", "six"], answer: ["I", "get", "up", "at", "six"] },
        },
        {
          id: "a1r-write-a2", type: "word_bank",
          prompt: "Di lo que siempre haces:",
          payload: { words: ["always", "I", "coffee", "drink"], answer: ["I", "always", "drink", "coffee"] },
        },
        {
          id: "a1r-write-a3", type: "word_bank",
          prompt: "Di a que hora terminas de trabajar:",
          payload: { words: ["work", "I", "at", "finish", "five"], answer: ["I", "finish", "work", "at", "five"] },
        },
        {
          id: "a1r-write-a4", type: "multiple_choice",
          prompt: "Which verb means 'levantarse'?",
          payload: { choices: ["to get up", "to go to bed", "to finish"], answer: 0 },
        },
      ],
    },
  ],
};
