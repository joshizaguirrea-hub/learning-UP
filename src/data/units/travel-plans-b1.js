/**
 * data/units/travel-plans-b1.js — Unidad tematica "Travel & Plans" (B1).
 *
 * Datos PUROS. MODELO DESACOPLADO POR COMPETENCIA (ver work-career-b1.js): cada
 * leccion entrena UNA competencia con contenido UNICO. Listening/Speaking con audio/IA.
 */

export const TRAVEL_PLANS_B1 = {
  id: "travel-plans-b1",
  language: "en",
  level: "B1",
  title: "Travel & Plans",
  subtitle: "Hacer planes de viaje, reservar y pedir informacion",

  cando: [
    "Puedo hablar de mis planes de viaje con 'going to' y 'will'.",
    "Puedo reservar un hotel y preguntar por servicios.",
    "Puedo pedir y dar direcciones.",
    "Puedo escribir un correo para reservar o pedir informacion.",
  ],

  vocab: [
    { id: "tp-1", term: "flight", translation: "vuelo", example: "My flight leaves at 6 a.m." },
    { id: "tp-2", term: "to book", translation: "reservar", example: "I want to book a room." },
    { id: "tp-3", term: "luggage", translation: "equipaje", example: "My luggage is very heavy." },
    { id: "tp-4", term: "check-in", translation: "registro / facturacion", example: "Check-in is at 3 p.m." },
    { id: "tp-5", term: "round trip", translation: "viaje redondo / ida y vuelta", example: "A round trip is cheaper." },
    { id: "tp-6", term: "to depart", translation: "salir / partir", example: "The train departs on time." },
    { id: "tp-7", term: "delay", translation: "retraso", example: "There was a two-hour delay." },
    { id: "tp-8", term: "boarding pass", translation: "pase de abordar", example: "Show your boarding pass here." },
    { id: "tp-9", term: "sightseeing", translation: "turismo / pasear viendo lugares", example: "We went sightseeing all day." },
    { id: "tp-10", term: "to arrive", translation: "llegar", example: "We arrive tomorrow morning." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "tp-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: planear un viaje",
      intro:
        "Competencia de LECTURA. Lee la historia de Sofia y comprueba que entendiste el texto.",
      content: {
        reading:
          "Sofia is planning a trip to Canada. She is going to book a round trip flight next week. " +
          "Her flight departs on Friday morning, so she will arrive in Toronto in the afternoon. " +
          "She only takes one small piece of luggage. At the airport she gets her boarding pass and " +
          "waits for check-in. She hopes there is no delay. In Toronto she is going to do a lot of " +
          "sightseeing and visit her cousin.",
        keyPhrases: [
          "Skim primero: de que trata el texto en general?",
          "Localiza datos concretos: destino, dia del vuelo, hora de llegada.",
          "Deduce por contexto palabras nuevas (boarding pass, check-in).",
        ],
        check: [
          { prompt: "Where is Sofia going?", choices: ["Canada", "Mexico", "Spain"], answer: 0 },
          { prompt: "When does her flight depart?", choices: ["Friday morning", "Sunday night", "Monday"], answer: 0 },
          { prompt: "How much luggage does she take?", choices: ["Three big bags", "One small piece", "None"], answer: 1 },
          { prompt: "What will she do in Toronto?", choices: ["Work", "Sightseeing and visit her cousin", "Study"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "tp-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: palabras de viaje",
      intro:
        "Competencia de VOCABULARIO. Estudia el glosario y practica. Al terminar entran a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "to book", translation: "reservar" },
        { term: "round trip", translation: "ida y vuelta" },
        { term: "flight", translation: "vuelo" },
        { term: "to depart", translation: "salir/partir" },
        { term: "luggage", translation: "equipaje" },
        { term: "boarding pass", translation: "pase de abordar" },
        { term: "delay", translation: "retraso" },
        { term: "sightseeing", translation: "turismo" },
      ],
      activities: [
        {
          id: "tp-vocab-a1", type: "matching",
          prompt: "Empareja palabra y significado:",
          payload: { pairs: [
            { left: "flight", right: "vuelo" },
            { left: "delay", right: "retraso" },
            { left: "luggage", right: "equipaje" },
            { left: "to book", right: "reservar" },
          ] },
        },
        {
          id: "tp-vocab-a2", type: "cloze",
          prompt: "Completa: 'I want to ___ a hotel room.' (reservar)",
          payload: { answer: "book" },
          explain: "'To book' = reservar (hotel, vuelo, mesa...).",
        },
        {
          id: "tp-vocab-a3", type: "cloze",
          prompt: "Completa: 'There was a two-hour ___.' (retraso)",
          payload: { answer: "delay" },
          explain: "'Delay' = retraso.",
        },
        {
          id: "tp-vocab-a4", type: "multiple_choice",
          prompt: "Which word means 'ida y vuelta'?",
          payload: { choices: ["boarding pass", "round trip", "check-in"], answer: 1 },
          explain: "'Round trip' = viaje de ida y vuelta.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "tp-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: going to vs will",
      intro:
        "Competencia de GRAMATICA. Aprende la diferencia entre 'going to' y 'will' y practicala.",
      grammar: {
        title: "Futuro: going to vs will",
        form: "going to = plan decidido  |  will = prediccion o decision del momento",
        examples: [
          "I'm going to visit Canada. (ya lo decidi)",
          "It's cold, I'll take a jacket. (decision ahora)",
          "I think it will rain tomorrow. (prediccion)",
        ],
        mistakes: [
          { wrong: "I will visit Canada, I booked it.", right: "I'm going to visit Canada, I booked it." },
        ],
      },
      activities: [
        {
          id: "tp-gram-a1", type: "multiple_choice",
          prompt: "'I already booked it, I ___ visit Canada.' (plan decidido)",
          payload: { choices: ["will", "am going to", "would"], answer: 1 },
          explain: "Ya reservaste = plan decidido, se usa 'going to'.",
        },
        {
          id: "tp-gram-a2", type: "multiple_choice",
          prompt: "'It's cold! I ___ take a jacket.' (decision del momento)",
          payload: { choices: ["will", "am going to", "was going to"], answer: 0 },
          explain: "Reaccionas al frio ahora = decision del momento = 'will'.",
        },
        {
          id: "tp-gram-a3", type: "word_bank",
          prompt: "Ordena la frase (plan de viaje):",
          payload: { words: ["going", "I'm", "to", "Canada", "visit"], answer: ["I'm", "going", "to", "visit", "Canada"] },
        },
        {
          id: "tp-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "What time the train departs?",
            "What time does the train depart?",
            "What time do the train departs?",
          ], answer: 1 },
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "tp-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: correo de reserva",
      intro:
        "Competencia de ESCRITURA. Tarea real: construye las frases de un correo para reservar un hotel.",
      activities: [
        {
          id: "tp-write-a1", type: "word_bank",
          prompt: "Saludo formal:",
          payload: { words: ["Sir", "Madam", "or", "Dear"], answer: ["Dear", "Sir", "or", "Madam"] },
        },
        {
          id: "tp-write-a2", type: "word_bank",
          prompt: "Di lo que quieres:",
          payload: { words: ["to", "a", "room", "I'd", "book", "like"], answer: ["I'd", "like", "to", "book", "a", "room"] },
        },
        {
          id: "tp-write-a3", type: "word_bank",
          prompt: "Da las fechas:",
          payload: { words: ["from", "the", "5th", "8th", "to", "the"], answer: ["from", "the", "5th", "to", "the", "8th"] },
        },
        {
          id: "tp-write-a4", type: "multiple_choice",
          prompt: "Best closing:",
          payload: { choices: ["Cheers!", "I look forward to your reply.", "Bye!"], answer: 1 },
        },
      ],
    },
  ],
};
