/**
 * data/units/a1-routine.js — Unidad tematica "Daily routine" (A1).
 *
 * Datos PUROS. Rutinas diarias con present simple + adverbios de frecuencia y
 * la hora. Sigue el ciclo PPP del estandar de calidad (ver PLAN-DE-ESTUDIO.md).
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
    // ---------------- APRENDE ----------------
    {
      id: "a1r-l0",
      order: 1,
      phase: "learn",
      skills: ["reading", "vocabulary"],
      title: "Aprende: un dia normal",
      intro:
        "Lee la rutina de una persona y estudia el present simple y la frecuencia. " +
        "Aqui solo se lee y se aprende.",
      teachesVocab: true,
      content: {
        reading:
          "Peter is a nurse. He gets up at six o'clock every day. He always has breakfast " +
          "at six thirty. Then he goes to work by bus. He starts work at seven and finishes " +
          "at three. In the evening, he usually cooks dinner and watches TV. He sometimes " +
          "reads a book. He never goes to bed late because he is tired.",
        glossary: [
          { term: "gets up", translation: "se levanta" },
          { term: "every day", translation: "todos los dias" },
          { term: "by bus", translation: "en autobus" },
          { term: "in the evening", translation: "por la tarde/noche" },
          { term: "cooks dinner", translation: "cocina la cena" },
          { term: "tired", translation: "cansado" },
        ],
        keyPhrases: [
          "I get up at... (Me levanto a las...)",
          "He/She goes to work. (El/Ella va al trabajo.)",
          "What time is it? (Que hora es?)",
          "I always / usually / never... (Yo siempre / usualmente / nunca...)",
        ],
        note:
          "Present simple: con he/she/it el verbo lleva -s (works, goes, watches). " +
          "Los adverbios de frecuencia van ANTES del verbo principal: 'I always drink coffee'.",
        grammar: {
          title: "Present simple (rutinas)",
          form: "I/you/we/they + verbo · he/she/it + verbo + s",
          examples: [
            "I work in a hospital.",
            "She works in a hospital.",
            "He always gets up early.",
          ],
          mistakes: [
            { wrong: "He get up at six.", right: "He gets up at six." },
            { wrong: "I drink always coffee.", right: "I always drink coffee." },
          ],
        },
        check: [
          { prompt: "What is Peter's job?", choices: ["Teacher", "Nurse", "Driver"], answer: 1 },
          { prompt: "When does he go to bed?", choices: ["Late", "Not late", "At noon"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ---------------- PRESENTACION ----------------
    {
      id: "a1r-l1",
      order: 2,
      phase: "present",
      skills: ["grammar", "vocabulary"],
      title: "Presentacion: preguntar por la rutina",
      intro:
        "Para preguntar por rutinas usamos 'do/does': 'What time do you get up?'. Lee el dialogo.",
      dialogue: [
        "A: What time do you get up?",
        "B: I usually get up at seven. And you?",
        "A: I get up at six. Do you have breakfast at home?",
        "B: Yes, I always have breakfast before work.",
      ],
      activities: [
        {
          id: "a1r-l1-a1", type: "multiple_choice",
          prompt: "How do you ask about someone's routine?",
          payload: { choices: ["What time do you get up?", "What time you get up?", "What time gets you up?"], answer: 0 },
          explain: "Para preguntas en present simple usamos 'do' + sujeto + verbo base.",
        },
        {
          id: "a1r-l1-a2", type: "matching",
          prompt: "Empareja la frecuencia con su significado:",
          payload: { pairs: [
            { left: "always", right: "siempre" },
            { left: "sometimes", right: "a veces" },
            { left: "never", right: "nunca" },
          ] },
        },
      ],
    },

    // ---------------- PRACTICA ----------------
    {
      id: "a1r-l2",
      order: 3,
      phase: "practice",
      skills: ["grammar", "vocabulary"],
      title: "Practica: present simple",
      intro: "Completa, elige y ordena para practicar.",
      activities: [
        {
          id: "a1r-l2-a1", type: "cloze",
          prompt: "Completa: 'She ___ to work by bus.' (goes/go)",
          payload: { answer: "goes" },
          explain: "Con 'she' el verbo 'go' se vuelve 'goes'.",
        },
        {
          id: "a1r-l2-a2", type: "cloze",
          prompt: "Completa: 'I ___ get up early.' (siempre)",
          payload: { answer: "always" },
          explain: "El adverbio de frecuencia va antes del verbo: I always get up.",
        },
        {
          id: "a1r-l2-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "He finish work at five.",
            "He finishes work at five.",
            "He finishing work at five.",
          ], answer: 1 },
          explain: "Con 'he' el verbo lleva -es: finishes.",
        },
        {
          id: "a1r-l2-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["at", "get", "I", "up", "seven"], answer: ["I", "get", "up", "at", "seven"] },
          explain: "Orden: I + get up + at + (hora).",
        },
        {
          id: "a1r-l2-a5", type: "cloze",
          prompt: "Completa: 'We have ___ at eight.' (desayuno)",
          payload: { answer: "breakfast" },
          explain: "'Breakfast' = desayuno. 'Have breakfast' = desayunar.",
        },
      ],
    },

    // ---------------- PRODUCCION ----------------
    {
      id: "a1r-l3",
      order: 4,
      phase: "produce",
      skills: ["writing", "grammar"],
      title: "Produccion: describe tu rutina",
      intro:
        "Tarea real: construye frases sobre tu dia. Ordena cada frase.",
      activities: [
        {
          id: "a1r-l3-a1", type: "word_bank",
          prompt: "Di a que hora te levantas:",
          payload: { words: ["up", "I", "at", "get", "six"], answer: ["I", "get", "up", "at", "six"] },
        },
        {
          id: "a1r-l3-a2", type: "word_bank",
          prompt: "Di lo que siempre haces:",
          payload: { words: ["always", "I", "coffee", "drink"], answer: ["I", "always", "drink", "coffee"] },
        },
        {
          id: "a1r-l3-a3", type: "word_bank",
          prompt: "Di a que hora terminas de trabajar:",
          payload: { words: ["work", "I", "at", "finish", "five"], answer: ["I", "finish", "work", "at", "five"] },
        },
        {
          id: "a1r-l3-a4", type: "multiple_choice",
          prompt: "Which sentence is about the night?",
          payload: { choices: ["I get up at seven.", "I go to bed at eleven.", "I have breakfast."], answer: 1 },
        },
      ],
    },
  ],
};
