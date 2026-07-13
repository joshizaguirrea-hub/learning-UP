/**
 * data/units/a1-routine.js — Unidad tematica "Daily routine" (A1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Listening/Speaking con audio/IA.
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
    { id: "a1r-11", term: "early", translation: "temprano", example: "She wakes up early." },
    { id: "a1r-12", term: "late", translation: "tarde", example: "He goes to bed late." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a1r-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: un dia normal",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Peter the nurse\n" +
          "Peter is a nurse. He gets up at six o'clock every day. He always has breakfast at six thirty. " +
          "Then he goes to work by bus. He starts work at seven and finishes at three. In the evening, he " +
          "usually cooks dinner and watches TV. He sometimes reads a book. He never goes to bed late " +
          "because he is tired.\n\n" +
          "TEXT 2 - Two friends\n" +
          "A: What time do you get up? B: I usually get up at seven. And you? A: I get up early, at six. " +
          "B: Do you have breakfast at home? A: Yes, I always do. B: I sometimes skip breakfast. That's bad! " +
          "A: Yes! And what time do you go to bed? B: Quite late, around midnight.",
        glossary: [
          { term: "gets up", translation: "se levanta" },
          { term: "every day", translation: "todos los dias" },
          { term: "by bus", translation: "en autobus" },
          { term: "in the evening", translation: "por la tarde/noche" },
          { term: "early / late", translation: "temprano / tarde" },
          { term: "to skip breakfast", translation: "saltarse el desayuno" },
          { term: "around midnight", translation: "alrededor de medianoche" },
          { term: "tired", translation: "cansado" },
        ],
        keyPhrases: [
          "Busca las horas de cada actividad.",
          "Fijate en los adverbios: always, usually, sometimes, never.",
        ],
        check: [
          { prompt: "T1: What is Peter's job?", choices: ["Teacher", "Nurse", "Driver"], answer: 1 },
          { prompt: "T1: When does he go to bed?", choices: ["Late", "Not late", "At noon"], answer: 1 },
          { prompt: "T1: How does he go to work?", choices: ["By car", "By bus", "On foot"], answer: 1 },
          { prompt: "T2: What time does B usually get up?", choices: ["Six", "Seven", "Eight"], answer: 1 },
          { prompt: "T2: Who gets up early, at six?", choices: ["A", "B", "Nobody"], answer: 0 },
          { prompt: "T2: What does B sometimes do?", choices: ["Skip breakfast", "Wake up early", "Cook dinner"], answer: 0 },
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
        { term: "to get up / to go to bed", translation: "levantarse / acostarse" },
        { term: "to have breakfast", translation: "desayunar" },
        { term: "to go to work", translation: "ir al trabajo" },
        { term: "to start / to finish", translation: "empezar / terminar" },
        { term: "early / late", translation: "temprano / tarde" },
        { term: "always / usually / sometimes / never", translation: "siempre / usualmente / a veces / nunca" },
      ],
      activities: [
        {
          id: "a1r-vocab-a1", type: "matching",
          prompt: "Empareja la frecuencia (1/2):",
          payload: { pairs: [
            { left: "always", right: "siempre" },
            { left: "usually", right: "usualmente" },
            { left: "sometimes", right: "a veces" },
            { left: "never", right: "nunca" },
          ] },
        },
        {
          id: "a1r-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to get up", right: "levantarse" },
            { left: "to go to bed", right: "acostarse" },
            { left: "early", right: "temprano" },
            { left: "late", right: "tarde" },
          ] },
        },
        {
          id: "a1r-vocab-a3", type: "cloze",
          prompt: "Completa: 'We have ___ at eight.' (desayuno)",
          payload: { answer: "breakfast" },
          explain: "'Breakfast' = desayuno.",
        },
        {
          id: "a1r-vocab-a4", type: "cloze",
          prompt: "Completa: 'I ___ work at five.' (terminar)",
          payload: { answer: "finish" },
          explain: "'Finish' = terminar.",
        },
        {
          id: "a1r-vocab-a5", type: "cloze",
          prompt: "Completa: 'She wakes up ___.' (temprano)",
          payload: { answer: "early" },
          explain: "'Early' = temprano.",
        },
        {
          id: "a1r-vocab-a6", type: "multiple_choice",
          prompt: "Which sentence is about the night?",
          payload: { choices: ["I get up at seven.", "I go to bed at eleven.", "I have breakfast."], answer: 1 },
          explain: "'Go to bed' = acostarse (de noche).",
        },
        {
          id: "a1r-vocab-a7", type: "multiple_choice",
          prompt: "Which word means '100% of the time'?",
          payload: { choices: ["never", "always", "sometimes"], answer: 1 },
          explain: "'Always' = siempre.",
        },
        {
          id: "a1r-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["work", "go", "to", "I"], answer: ["I", "go", "to", "work"] },
          explain: "'go to work' = ir al trabajo.",
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
        form: "I/you/we/they + verbo · he/she/it + verbo + s · adverbio de frecuencia ANTES del verbo",
        examples: ["I work in a hospital.", "She works in a hospital.", "He always gets up early.", "We never eat late."],
        explain: { tr: ["Yo trabajo en un hospital.", "Ella trabaja en un hospital.", "\u00c9l siempre se levanta temprano.", "Nosotros nunca comemos tarde."] },
        mistakes: [
          { wrong: "He get up at six.", right: "He gets up at six." },
          { wrong: "I drink always coffee.", right: "I always drink coffee." },
          { wrong: "She go to work.", right: "She goes to work." },
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
          prompt: "Completa: 'He ___ work at five.' (finish -> 3a persona)",
          payload: { answer: "finishes" },
          explain: "Con 'he' el verbo lleva -es: finishes.",
        },
        {
          id: "a1r-gram-a3", type: "cloze",
          prompt: "Completa: 'I ___ get up early.' (siempre)",
          payload: { answer: "always" },
          explain: "El adverbio de frecuencia va antes del verbo.",
        },
        {
          id: "a1r-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["He finish work at five.", "He finishes work at five.", "He finishing work at five."], answer: 1 },
          explain: "Con 'he' el verbo lleva -es.",
        },
        {
          id: "a1r-gram-a5", type: "multiple_choice",
          prompt: "Where does the frequency adverb go?",
          payload: { choices: ["I drink always coffee.", "I always drink coffee.", "Always I drink coffee."], answer: 1 },
          explain: "Antes del verbo principal: I always drink.",
        },
        {
          id: "a1r-gram-a6", type: "cloze",
          prompt: "Completa la pregunta: 'What time ___ you get up?' (do/does)",
          payload: { answer: "do" },
          explain: "Con 'you' la pregunta usa 'do'.",
        },
        {
          id: "a1r-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["at", "get", "I", "up", "seven"], answer: ["I", "get", "up", "at", "seven"] },
          explain: "Orden: I + get up + at + (hora).",
        },
        {
          id: "a1r-gram-a8", type: "word_bank",
          prompt: "Ordena con adverbio:",
          payload: { words: ["never", "late", "eat", "I"], answer: ["I", "never", "eat", "late"] },
          explain: "Orden: I + never + eat + late.",
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
      intro: "Competencia de ESCRITURA. Construye tu rutina completa, frase por frase.",
      activities: [
        {
          id: "a1r-write-a1", type: "word_bank",
          prompt: "1. Di a que hora te levantas:",
          payload: { words: ["up", "I", "at", "get", "six"], answer: ["I", "get", "up", "at", "six"] },
        },
        {
          id: "a1r-write-a2", type: "word_bank",
          prompt: "2. Di lo que siempre haces:",
          payload: { words: ["always", "I", "coffee", "drink"], answer: ["I", "always", "drink", "coffee"] },
        },
        {
          id: "a1r-write-a3", type: "word_bank",
          prompt: "3. Di a que hora empiezas a trabajar:",
          payload: { words: ["work", "I", "at", "start", "nine"], answer: ["I", "start", "work", "at", "nine"] },
        },
        {
          id: "a1r-write-a4", type: "word_bank",
          prompt: "4. Di a que hora terminas de trabajar:",
          payload: { words: ["work", "I", "at", "finish", "five"], answer: ["I", "finish", "work", "at", "five"] },
        },
        {
          id: "a1r-write-a5", type: "word_bank",
          prompt: "5. Di lo que haces a veces por la noche:",
          payload: { words: ["read", "I", "a", "sometimes", "book"], answer: ["I", "sometimes", "read", "a", "book"] },
        },
        {
          id: "a1r-write-a6", type: "multiple_choice",
          prompt: "6. Which verb means 'levantarse'?",
          payload: { choices: ["to get up", "to go to bed", "to finish"], answer: 0 },
        },
        {
          id: "a1r-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct sentence:",
          payload: { choices: ["She goes to bed late.", "She go to bed late.", "She going to bed late."], answer: 0 },
        },
        {
          id: "a1r-write-a8", type: "multiple_choice",
          prompt: "8. 'I never eat late' means I eat late...",
          payload: { choices: ["always", "0% of the time", "sometimes"], answer: 1 },
        },
      ],
    },
  ],
};
