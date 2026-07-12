/**
 * data/units/a1-home.js — Unidad tematica "My home" (A1).
 *
 * Datos PUROS. La casa con there is/there are y preposiciones de lugar.
 * Sigue el ciclo PPP del estandar de calidad (ver PLAN-DE-ESTUDIO.md).
 */

export const A1_HOME = {
  id: "a1-home",
  language: "en",
  level: "A1",
  title: "My home",
  subtitle: "Describir tu casa y decir donde estan las cosas",

  cando: [
    "Puedo nombrar las habitaciones y muebles de una casa.",
    "Puedo usar 'there is' y 'there are'.",
    "Puedo decir donde estan las cosas (in, on, under, next to).",
    "Puedo describir mi casa de forma simple.",
  ],

  vocab: [
    { id: "a1hm-1", term: "house", translation: "casa", example: "My house is small." },
    { id: "a1hm-2", term: "room", translation: "habitacion / cuarto", example: "There are three rooms." },
    { id: "a1hm-3", term: "kitchen", translation: "cocina", example: "The kitchen is big." },
    { id: "a1hm-4", term: "bedroom", translation: "dormitorio", example: "My bedroom is upstairs." },
    { id: "a1hm-5", term: "bathroom", translation: "bano", example: "The bathroom is next to my room." },
    { id: "a1hm-6", term: "table", translation: "mesa", example: "There is a table in the kitchen." },
    { id: "a1hm-7", term: "chair", translation: "silla", example: "There are four chairs." },
    { id: "a1hm-8", term: "bed", translation: "cama", example: "The cat is on the bed." },
    { id: "a1hm-9", term: "window", translation: "ventana", example: "There is a big window." },
    { id: "a1hm-10", term: "door", translation: "puerta", example: "The door is open." },
  ],

  lessons: [
    // ---------------- APRENDE ----------------
    {
      id: "a1hm-l0",
      order: 1,
      phase: "learn",
      skills: ["reading", "vocabulary"],
      title: "Aprende: la casa de Sam",
      intro:
        "Lee la descripcion de una casa y estudia 'there is/are' y las preposiciones. " +
        "Aqui solo se lee y se aprende.",
      teachesVocab: true,
      content: {
        reading:
          "This is Sam's house. It is small but nice. There is a kitchen, a bathroom and two " +
          "bedrooms. In the kitchen, there is a table and there are four chairs. There is a big " +
          "window next to the door. In Sam's bedroom, there is a bed and a small table. His book " +
          "is on the table and his shoes are under the bed. Sam loves his home.",
        glossary: [
          { term: "there is", translation: "hay (singular)" },
          { term: "there are", translation: "hay (plural)" },
          { term: "on", translation: "sobre / encima de" },
          { term: "under", translation: "debajo de" },
          { term: "next to", translation: "al lado de" },
          { term: "in", translation: "en / dentro de" },
        ],
        keyPhrases: [
          "There is a... (Hay un/una...)",
          "There are two... (Hay dos...)",
          "It is on/under/next to... (Esta sobre/debajo/al lado de...)",
          "My house is small but nice. (Mi casa es pequena pero linda.)",
        ],
        note:
          "'There is' + singular (there is a table). 'There are' + plural (there are chairs). " +
          "Las preposiciones de lugar dicen DONDE esta algo: in, on, under, next to.",
        grammar: {
          title: "there is / there are",
          form: "There is + sustantivo singular · There are + sustantivo plural",
          examples: [
            "There is a bed in the room.",
            "There are two windows.",
          ],
          mistakes: [
            { wrong: "There is two chairs.", right: "There are two chairs." },
            { wrong: "There are a table.", right: "There is a table." },
          ],
        },
        check: [
          { prompt: "How many bedrooms are there?", choices: ["One", "Two", "Three"], answer: 1 },
          { prompt: "Where are Sam's shoes?", choices: ["On the table", "Under the bed", "In the kitchen"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ---------------- PRESENTACION ----------------
    {
      id: "a1hm-l1",
      order: 2,
      phase: "present",
      skills: ["grammar", "vocabulary"],
      title: "Presentacion: describir un cuarto",
      intro:
        "Para describir un lugar usamos 'there is/are' + preposiciones. Lee el dialogo.",
      dialogue: [
        "A: Is there a table in your room?",
        "B: Yes, there is. And there are two chairs next to it.",
        "A: Nice! Is there a window?",
        "B: Yes, there is a big window on the wall.",
      ],
      activities: [
        {
          id: "a1hm-l1-a1", type: "multiple_choice",
          prompt: "Which is correct for one bed?",
          payload: { choices: ["There are a bed.", "There is a bed.", "There be a bed."], answer: 1 },
          explain: "Con un objeto singular usamos 'There is'.",
        },
        {
          id: "a1hm-l1-a2", type: "matching",
          prompt: "Empareja la preposicion con su significado:",
          payload: { pairs: [
            { left: "on", right: "sobre" },
            { left: "under", right: "debajo de" },
            { left: "next to", right: "al lado de" },
          ] },
        },
      ],
    },

    // ---------------- PRACTICA ----------------
    {
      id: "a1hm-l2",
      order: 3,
      phase: "practice",
      skills: ["grammar", "vocabulary"],
      title: "Practica: there is/are y lugar",
      intro: "Completa, elige y ordena para practicar.",
      activities: [
        {
          id: "a1hm-l2-a1", type: "cloze",
          prompt: "Completa: 'There ___ four chairs.' (hay, plural)",
          payload: { answer: "are" },
          explain: "Con plural usamos 'there are'.",
        },
        {
          id: "a1hm-l2-a2", type: "cloze",
          prompt: "Completa: 'The book is ___ the table.' (sobre)",
          payload: { answer: "on" },
          explain: "'On' = sobre / encima de.",
        },
        {
          id: "a1hm-l2-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "There is two bedrooms.",
            "There are two bedrooms.",
            "There be two bedrooms.",
          ], answer: 1 },
          explain: "Dos dormitorios = plural = 'there are'.",
        },
        {
          id: "a1hm-l2-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["a", "There", "is", "kitchen"], answer: ["There", "is", "a", "kitchen"] },
          explain: "Orden: There + is + a + (habitacion).",
        },
        {
          id: "a1hm-l2-a5", type: "cloze",
          prompt: "Completa: 'The cat is ___ the bed.' (debajo de)",
          payload: { answer: "under" },
          explain: "'Under' = debajo de.",
        },
      ],
    },

    // ---------------- PRODUCCION ----------------
    {
      id: "a1hm-l3",
      order: 4,
      phase: "produce",
      skills: ["writing", "grammar"],
      title: "Produccion: describe tu casa",
      intro:
        "Tarea real: construye frases para describir tu casa. Ordena cada frase.",
      activities: [
        {
          id: "a1hm-l3-a1", type: "word_bank",
          prompt: "Di que hay en tu cocina:",
          payload: { words: ["a", "There", "table", "is"], answer: ["There", "is", "a", "table"] },
        },
        {
          id: "a1hm-l3-a2", type: "word_bank",
          prompt: "Di cuantas habitaciones hay:",
          payload: { words: ["two", "There", "bedrooms", "are"], answer: ["There", "are", "two", "bedrooms"] },
        },
        {
          id: "a1hm-l3-a3", type: "word_bank",
          prompt: "Di donde esta el libro:",
          payload: { words: ["on", "book", "The", "the", "table", "is"],
                     answer: ["The", "book", "is", "on", "the", "table"] },
        },
        {
          id: "a1hm-l3-a4", type: "multiple_choice",
          prompt: "Which is a room?",
          payload: { choices: ["chair", "kitchen", "window"], answer: 1 },
        },
      ],
    },
  ],
};
