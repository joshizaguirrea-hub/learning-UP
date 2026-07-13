/**
 * data/units/a1-home.js — Unidad tematica "My home" (A1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Listening/Speaking con audio/IA.
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
    { id: "a1hm-11", term: "sofa", translation: "sofa", example: "The sofa is in the living room." },
    { id: "a1hm-12", term: "living room", translation: "sala", example: "We watch TV in the living room." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a1hm-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: la casa de Sam",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Sam's house\n" +
          "This is Sam's house. It is small but nice. There is a kitchen, a bathroom and two bedrooms. In " +
          "the kitchen, there is a table and there are four chairs. There is a big window next to the door. " +
          "In Sam's bedroom, there is a bed and a small table. His book is on the table and his shoes are " +
          "under the bed. Sam loves his home.\n\n" +
          "TEXT 2 - The living room\n" +
          "A: Is there a living room in your flat? B: Yes, there is. There is a big sofa and a TV. " +
          "A: Are there any windows? B: Yes, there are two. The cat is always on the sofa! A: And where " +
          "is the kitchen? B: It's next to the living room.",
        glossary: [
          { term: "there is / there are", translation: "hay (singular / plural)" },
          { term: "on / under / next to", translation: "sobre / debajo / al lado de" },
          { term: "in", translation: "en / dentro de" },
          { term: "flat", translation: "departamento" },
          { term: "living room / sofa", translation: "sala / sofa" },
          { term: "window / door", translation: "ventana / puerta" },
          { term: "small but nice", translation: "pequena pero linda" },
          { term: "upstairs", translation: "arriba (piso de arriba)" },
        ],
        keyPhrases: [
          "Cuenta las habitaciones y muebles en cada texto.",
          "Fijate en las preposiciones: on, under, next to, in.",
        ],
        check: [
          { prompt: "T1: How many bedrooms are there?", choices: ["One", "Two", "Three"], answer: 1 },
          { prompt: "T1: Where are Sam's shoes?", choices: ["On the table", "Under the bed", "In the kitchen"], answer: 1 },
          { prompt: "T1: How many chairs are in the kitchen?", choices: ["Two", "Four", "Six"], answer: 1 },
          { prompt: "T2: What is in the living room?", choices: ["A sofa and a TV", "A bed", "A car"], answer: 0 },
          { prompt: "T2: How many windows are there?", choices: ["One", "Two", "None"], answer: 1 },
          { prompt: "T2: Where is the kitchen?", choices: ["Next to the living room", "Upstairs", "Outside"], answer: 0 },
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
        { term: "kitchen / living room", translation: "cocina / sala" },
        { term: "bedroom / bathroom", translation: "dormitorio / bano" },
        { term: "table / chair", translation: "mesa / silla" },
        { term: "bed / sofa", translation: "cama / sofa" },
        { term: "window / door", translation: "ventana / puerta" },
      ],
      activities: [
        {
          id: "a1hm-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "kitchen", right: "cocina" },
            { left: "bedroom", right: "dormitorio" },
            { left: "bathroom", right: "bano" },
            { left: "living room", right: "sala" },
          ] },
        },
        {
          id: "a1hm-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "table", right: "mesa" },
            { left: "chair", right: "silla" },
            { left: "bed", right: "cama" },
            { left: "door", right: "puerta" },
          ] },
        },
        {
          id: "a1hm-vocab-a3", type: "cloze",
          prompt: "Completa: 'There is a big ___.' (ventana)",
          payload: { answer: "window" },
          explain: "'Window' = ventana.",
        },
        {
          id: "a1hm-vocab-a4", type: "cloze",
          prompt: "Completa: 'The ___ is in the living room.' (sofa)",
          payload: { answer: "sofa" },
          explain: "'Sofa' = sofa.",
        },
        {
          id: "a1hm-vocab-a5", type: "cloze",
          prompt: "Completa: 'We watch TV in the ___.' (sala)",
          payload: { answer: "living room" },
          explain: "'Living room' = sala.",
        },
        {
          id: "a1hm-vocab-a6", type: "multiple_choice",
          prompt: "Which is a room?",
          payload: { choices: ["chair", "kitchen", "window"], answer: 1 },
          explain: "'Kitchen' (cocina) es una habitacion.",
        },
        {
          id: "a1hm-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'silla'?",
          payload: { choices: ["table", "chair", "bed"], answer: 1 },
          explain: "'Chair' = silla.",
        },
        {
          id: "a1hm-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["kitchen", "the", "in", "table", "A"], answer: ["A", "table", "in", "the", "kitchen"] },
          explain: "A + table + in + the + kitchen.",
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
        title: "there is / there are + preposiciones",
        form: "There is + singular · There are + plural · on / under / next to / in",
        examples: ["There is a bed in the room.", "There are two windows.", "The book is on the table."],
        explain: { tr: ["Hay una cama en el cuarto.", "Hay dos ventanas.", "El libro est\u00e1 sobre la mesa."] },
        mistakes: [
          { wrong: "There is two chairs.", right: "There are two chairs." },
          { wrong: "There are a table.", right: "There is a table." },
          { wrong: "The cat is in the bed.", right: "The cat is on the bed." },
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
          prompt: "Completa: 'There ___ a big window.' (hay, singular)",
          payload: { answer: "is" },
          explain: "Con singular: 'there is'.",
        },
        {
          id: "a1hm-gram-a3", type: "cloze",
          prompt: "Completa: 'The book is ___ the table.' (sobre)",
          payload: { answer: "on" },
          explain: "'On' = sobre / encima de.",
        },
        {
          id: "a1hm-gram-a4", type: "cloze",
          prompt: "Completa: 'The shoes are ___ the bed.' (debajo de)",
          payload: { answer: "under" },
          explain: "'Under' = debajo de.",
        },
        {
          id: "a1hm-gram-a5", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["There is two bedrooms.", "There are two bedrooms.", "There be two bedrooms."], answer: 1 },
          explain: "Dos dormitorios = plural = 'there are'.",
        },
        {
          id: "a1hm-gram-a6", type: "multiple_choice",
          prompt: "Choose the correct preposition: 'The bathroom is ___ my room.' (al lado de)",
          payload: { choices: ["under", "next to", "on"], answer: 1 },
          explain: "'Next to' = al lado de.",
        },
        {
          id: "a1hm-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["a", "There", "is", "kitchen"], answer: ["There", "is", "a", "kitchen"] },
          explain: "Orden: There + is + a + (habitacion).",
        },
        {
          id: "a1hm-gram-a8", type: "word_bank",
          prompt: "Ordena la frase de lugar:",
          payload: { words: ["on", "cat", "The", "the", "is", "sofa"], answer: ["The", "cat", "is", "on", "the", "sofa"] },
          explain: "The + cat + is + on + the + sofa.",
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
      intro: "Competencia de ESCRITURA. Construye una descripcion de tu casa, frase por frase.",
      activities: [
        {
          id: "a1hm-write-a1", type: "word_bank",
          prompt: "1. Di que hay en tu cocina:",
          payload: { words: ["a", "There", "table", "is"], answer: ["There", "is", "a", "table"] },
        },
        {
          id: "a1hm-write-a2", type: "word_bank",
          prompt: "2. Di cuantas habitaciones hay:",
          payload: { words: ["two", "There", "bedrooms", "are"], answer: ["There", "are", "two", "bedrooms"] },
        },
        {
          id: "a1hm-write-a3", type: "word_bank",
          prompt: "3. Di donde esta el libro:",
          payload: { words: ["on", "book", "The", "the", "table", "is"], answer: ["The", "book", "is", "on", "the", "table"] },
        },
        {
          id: "a1hm-write-a4", type: "word_bank",
          prompt: "4. Describe tu sala:",
          payload: { words: ["a", "There", "sofa", "is", "big"], answer: ["There", "is", "a", "big", "sofa"] },
        },
        {
          id: "a1hm-write-a5", type: "word_bank",
          prompt: "5. Di donde esta el bano:",
          payload: { words: ["to", "The", "next", "bathroom", "my", "is", "room"], answer: ["The", "bathroom", "is", "next", "to", "my", "room"] },
        },
        {
          id: "a1hm-write-a6", type: "multiple_choice",
          prompt: "6. Which word means 'debajo de'?",
          payload: { choices: ["on", "under", "next to"], answer: 1 },
        },
        {
          id: "a1hm-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct sentence:",
          payload: { choices: ["There are a sofa.", "There is a sofa.", "There be a sofa."], answer: 1 },
        },
        {
          id: "a1hm-write-a8", type: "multiple_choice",
          prompt: "8. Where do you usually sleep?",
          payload: { choices: ["In the kitchen", "In the bedroom", "In the bathroom"], answer: 1 },
        },
      ],
    },
  ],
};
