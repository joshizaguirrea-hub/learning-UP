/**
 * data/units/travel-plans-b1.js — Unidad tematica "Travel & Plans" (B1).
 *
 * Datos PUROS. Segunda unidad del curso, misma estructura que work-career-b1
 * (ciclo PPP + fase Aprende + vocab para SRS). Demuestra que agregar contenido
 * = solo agregar datos con la misma plantilla de calidad.
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
    {
      id: "tp-l0",
      order: 1,
      phase: "learn",
      skills: ["reading", "vocabulary"],
      title: "Aprende: planear un viaje",
      intro: "Lee la historia y aprende el vocabulario de viajes. Luego lo practicaras.",
      teachesVocab: true,
      content: {
        reading:
          "Sofia is planning a trip to Canada. She is going to book a round trip flight next week. " +
          "Her flight departs on Friday morning, so she will arrive in Toronto in the afternoon. " +
          "She only takes one small piece of luggage. At the airport she gets her boarding pass and " +
          "waits for check-in. She hopes there is no delay. In Toronto she is going to do a lot of " +
          "sightseeing and visit her cousin.",
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
        keyPhrases: [
          "I'm going to... (planes decididos)",
          "I will... (decisiones e ideas espontaneas)",
          "I'd like to book... (Quisiera reservar...)",
          "What time does it depart/arrive? (A que hora sale/llega?)",
        ],
        note:
          "Usa 'going to' para planes ya decididos ('I'm going to travel') y 'will' para " +
          "predicciones o decisiones del momento ('I think it will rain', 'I'll help you').",
      },
      activities: [],
    },
    {
      id: "tp-l1",
      order: 2,
      phase: "present",
      skills: ["grammar", "vocabulary"],
      title: "Presentacion: going to vs will",
      intro: "Comprueba cuando usar 'going to' y cuando 'will'.",
      dialogue: [
        "A: What are your plans for the summer?",
        "B: I'm going to visit Canada. I already booked the flight.",
        "A: Nice! Maybe it will be cold there.",
        "B: True. I'll take a jacket, then.",
      ],
      activities: [
        { id: "tp-l1-a1", type: "multiple_choice",
          prompt: "'I already booked it, I ___ visit Canada.' (plan decidido)",
          payload: { choices: ["will", "am going to", "would"], answer: 1 } },
        { id: "tp-l1-a2", type: "multiple_choice",
          prompt: "'It's cold! I ___ take a jacket.' (decision del momento)",
          payload: { choices: ["will", "am going to", "was going to"], answer: 0 } },
      ],
    },
    {
      id: "tp-l2",
      order: 3,
      phase: "practice",
      skills: ["grammar", "vocabulary"],
      title: "Practica: viajes en contexto",
      intro: "Usa el vocabulario y las estructuras de futuro.",
      activities: [
        { id: "tp-l2-a1", type: "cloze",
          prompt: "Completa: 'I want to ___ a hotel room.' (reservar)",
          payload: { answer: "book" } },
        { id: "tp-l2-a2", type: "cloze",
          prompt: "Completa: 'The plane will ___ at 9 a.m.' (partir)",
          payload: { answer: "depart", alt: ["leave"] } },
        { id: "tp-l2-a3", type: "word_bank",
          prompt: "Ordena la frase (plan de viaje):",
          payload: { words: ["going", "I'm", "to", "Canada", "visit"], answer: ["I'm", "going", "to", "visit", "Canada"] } },
        { id: "tp-l2-a4", type: "matching",
          prompt: "Empareja palabra y significado:",
          payload: { pairs: [
            { left: "flight", right: "vuelo" },
            { left: "delay", right: "retraso" },
            { left: "luggage", right: "equipaje" },
          ] } },
        { id: "tp-l2-a5", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "What time the train departs?",
            "What time does the train depart?",
            "What time do the train departs?",
          ], answer: 1 } },
      ],
    },
    {
      id: "tp-l3",
      order: 4,
      phase: "produce",
      skills: ["writing", "grammar"],
      title: "Produccion: correo de reserva",
      intro: "Construye las frases de un correo para reservar un hotel.",
      activities: [
        { id: "tp-l3-a1", type: "word_bank",
          prompt: "Saludo formal:",
          payload: { words: ["Sir", "Madam", "or", "Dear"], answer: ["Dear", "Sir", "or", "Madam"] } },
        { id: "tp-l3-a2", type: "word_bank",
          prompt: "Di lo que quieres:",
          payload: { words: ["to", "a", "room", "I'd", "book", "like"], answer: ["I'd", "like", "to", "book", "a", "room"] } },
        { id: "tp-l3-a3", type: "word_bank",
          prompt: "Da las fechas:",
          payload: { words: ["from", "the", "5th", "8th", "to", "the"], answer: ["from", "the", "5th", "to", "the", "8th"] } },
        { id: "tp-l3-a4", type: "multiple_choice",
          prompt: "Best closing:",
          payload: { choices: ["Cheers!", "I look forward to your reply.", "Bye!"], answer: 1 } },
      ],
    },
  ],
};
