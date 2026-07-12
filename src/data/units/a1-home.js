/**
 * data/units/a1-home.js — Unidad tematica "My home" (A1).
 *
 * Datos PUROS. MODELO DESACOPLADO POR COMPETENCIA. Listening/Speaking con audio/IA.
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
    // ================= READING =================
    {
      id: "a1hm-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: la casa de Sam",
      intro: "Competencia de LECTURA. Lee la descripcion y comprueba que entendiste.",
      content: {
        reading:
          "This is Sam's house. It is small but nice. There is a kitchen, a bathroom and two " +
          "bedrooms. In the kitchen, there is a table and there are four chairs. There is a big " +
          "window next to the door. In Sam's bedroom, there is a bed and a small table. His book " +
          "is on the table and his shoes are under the bed. Sam loves his home.",
        keyPhrases: [
          "Cuenta las habitaciones y los muebles.",
          "Fijate en las preposiciones: on, under, next to.",
        ],
        check: [
          { prompt: "How many bedrooms are there?", choices: ["One", "Two", "Three"], answer: 1 },
          { prompt: "Where are Sam's shoes?", choices: ["On the table", "Under the bed", "In the kitchen"], answer: 1 },
          { prompt: "How many chairs are in the kitchen?", choices: ["Two", "Four", "Six"], answer: 1 },
          { prompt: "Where is the big window?", choices: ["Next to the door", "In the bathroom", "Under the bed"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "a1hm-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: casa y muebles",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "house / room", translation: "casa / cuarto" },
        { term: "kitchen", translation: "cocina" },
        { term: "bedroom / bathroom", translation: "dormitorio / bano" },
        { term: "table / chair", translation: "mesa / silla" },
        { term: "bed", translation: "cama" },
        { term: "window / door", translation: "ventana / puerta" },
      ],
      activities: [
        {
          id: "a1hm-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "kitchen", right: "cocina" },
            { left: "bed", right: "cama" },
            { left: "door", right: "puerta" },
          ] },
        },
        {
          id: "a1hm-vocab-a2", type: "multiple_choice",
          prompt: "Which is a room?",
          payload: { choices: ["chair", "kitchen", "window"], answer: 1 },
          explain: "'Kitchen' (cocina) es una habitacion.",
        },
        {
          id: "a1hm-vocab-a3", type: "cloze",
          prompt: "Completa: 'There is a big ___.' (ventana)",
          payload: { answer: "window" },
          explain: "'Window' = ventana.",
        },
        {
          id: "a1hm-vocab-a4", type: "multiple_choice",
          prompt: "Which word means 'silla'?",
          payload: { choices: ["table", "chair", "bed"], answer: 1 },
          explain: "'Chair' = silla.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "a1hm-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: there is/are y lugar",
      intro: "Competencia de GRAMATICA. Aprende there is/are y preposiciones y practicalos.",
      grammar: {
        title: "there is / there are",
        form: "There is + singular · There are + plural",
        examples: ["There is a bed in the room.", "There are two windows."],
        mistakes: [
          { wrong: "There is two chairs.", right: "There are two chairs." },
          { wrong: "There are a table.", right: "There is a table." },
        ],
      },
      activities: [
        {
          id: "a1hm-gram-a1", type: "cloze",
          prompt: "Completa: 'There ___ four chairs.' (hay, plural)",
          payload: { answer: "are" },
          explain: "Con plural: 'there are'.",
        },
        {
          id: "a1hm-gram-a2", type: "cloze",
          prompt: "Completa: 'The book is ___ the table.' (sobre)",
          payload: { answer: "on" },
          explain: "'On' = sobre / encima de.",
        },
        {
          id: "a1hm-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["There is two bedrooms.", "There are two bedrooms.", "There be two bedrooms."], answer: 1 },
          explain: "Dos dormitorios = plural = 'there are'.",
        },
        {
          id: "a1hm-gram-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["a", "There", "is", "kitchen"], answer: ["There", "is", "a", "kitchen"] },
          explain: "Orden: There + is + a + (habitacion).",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "a1hm-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: describe tu casa",
      intro: "Competencia de ESCRITURA. Construye frases para describir tu casa. Ordena cada frase.",
      activities: [
        {
          id: "a1hm-write-a1", type: "word_bank",
          prompt: "Di que hay en tu cocina:",
          payload: { words: ["a", "There", "table", "is"], answer: ["There", "is", "a", "table"] },
        },
        {
          id: "a1hm-write-a2", type: "word_bank",
          prompt: "Di cuantas habitaciones hay:",
          payload: { words: ["two", "There", "bedrooms", "are"], answer: ["There", "are", "two", "bedrooms"] },
        },
        {
          id: "a1hm-write-a3", type: "word_bank",
          prompt: "Di donde esta el libro:",
          payload: { words: ["on", "book", "The", "the", "table", "is"], answer: ["The", "book", "is", "on", "the", "table"] },
        },
        {
          id: "a1hm-write-a4", type: "multiple_choice",
          prompt: "Which word means 'debajo de'?",
          payload: { choices: ["on", "under", "next to"], answer: 1 },
        },
      ],
    },
  ],
};
