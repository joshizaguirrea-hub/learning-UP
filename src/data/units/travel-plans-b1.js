/**
 * data/units/travel-plans-b1.js — Unidad tematica "Travel & Plans" (B1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Listening/Speaking con audio/IA.
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
    { id: "tp-5", term: "round trip", translation: "ida y vuelta", example: "A round trip is cheaper." },
    { id: "tp-6", term: "to depart", translation: "salir / partir", example: "The train departs on time." },
    { id: "tp-7", term: "delay", translation: "retraso", example: "There was a two-hour delay." },
    { id: "tp-8", term: "boarding pass", translation: "pase de abordar", example: "Show your boarding pass here." },
    { id: "tp-9", term: "sightseeing", translation: "turismo", example: "We went sightseeing all day." },
    { id: "tp-10", term: "to arrive", translation: "llegar", example: "We arrive tomorrow morning." },
    { id: "tp-11", term: "reservation", translation: "reservacion", example: "I have a reservation for two." },
    { id: "tp-12", term: "destination", translation: "destino", example: "Our destination is Rome." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "tp-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: planear un viaje",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Sofia's trip\n" +
          "Sofia is planning a trip to Canada. She is going to book a round trip flight next week. Her " +
          "flight departs on Friday morning, so she will arrive in Toronto in the afternoon. She only " +
          "takes one small piece of luggage. At the airport she gets her boarding pass and waits for " +
          "check-in. She hopes there is no delay. In Toronto she is going to do a lot of sightseeing and " +
          "visit her cousin.\n\n" +
          "TEXT 2 - Booking a hotel\n" +
          "A: Good morning. I'd like to book a room, please. B: Of course. For how many nights? A: Three " +
          "nights, from the 5th. B: A single or a double room? A: A double, please. B: Perfect, I have a " +
          "reservation for you. Check-in is at 3 p.m. A: Great, thank you!",
        glossary: [
          { term: "going to book", translation: "va a reservar (plan)" },
          { term: "will arrive", translation: "llegara" },
          { term: "boarding pass / check-in", translation: "pase de abordar / registro" },
          { term: "delay / round trip", translation: "retraso / ida y vuelta" },
          { term: "I'd like to book", translation: "quisiera reservar" },
          { term: "reservation", translation: "reservacion" },
          { term: "single / double room", translation: "habitacion individual / doble" },
          { term: "destination", translation: "destino" },
        ],
        keyPhrases: [
          "Distingue planes (going to) de predicciones (will).",
          "Fijate como se reserva un hotel en el Texto 2.",
        ],
        check: [
          { prompt: "T1: Where is Sofia going?", choices: ["Canada", "Mexico", "Spain"], answer: 0 },
          { prompt: "T1: When does her flight depart?", choices: ["Friday morning", "Sunday night", "Monday"], answer: 0 },
          { prompt: "T1: What will she do in Toronto?", choices: ["Work", "Sightseeing and visit her cousin", "Study"], answer: 1 },
          { prompt: "T2: What does A want to book?", choices: ["A flight", "A room", "A car"], answer: 1 },
          { prompt: "T2: For how many nights?", choices: ["Two", "Three", "Five"], answer: 1 },
          { prompt: "T2: What time is check-in?", choices: ["1 p.m.", "3 p.m.", "5 p.m."], answer: 1 },
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
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "flight / to depart", translation: "vuelo / salir" },
        { term: "to book / reservation", translation: "reservar / reservacion" },
        { term: "luggage / boarding pass", translation: "equipaje / pase de abordar" },
        { term: "check-in / delay", translation: "registro / retraso" },
        { term: "round trip / destination", translation: "ida y vuelta / destino" },
        { term: "sightseeing / to arrive", translation: "turismo / llegar" },
      ],
      activities: [
        {
          id: "tp-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "flight", right: "vuelo" },
            { left: "delay", right: "retraso" },
            { left: "luggage", right: "equipaje" },
            { left: "to book", right: "reservar" },
          ] },
        },
        {
          id: "tp-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "boarding pass", right: "pase de abordar" },
            { left: "reservation", right: "reservacion" },
            { left: "destination", right: "destino" },
            { left: "sightseeing", right: "turismo" },
          ] },
        },
        {
          id: "tp-vocab-a3", type: "cloze",
          prompt: "Completa: 'I want to ___ a hotel room.' (reservar)",
          payload: { answer: "book" },
          explain: "'To book' = reservar.",
        },
        {
          id: "tp-vocab-a4", type: "cloze",
          prompt: "Completa: 'There was a two-hour ___.' (retraso)",
          payload: { answer: "delay" },
          explain: "'Delay' = retraso.",
        },
        {
          id: "tp-vocab-a5", type: "cloze",
          prompt: "Completa: 'Our ___ is Rome.' (destino)",
          payload: { answer: "destination" },
          explain: "'Destination' = destino.",
        },
        {
          id: "tp-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'ida y vuelta'?",
          payload: { choices: ["boarding pass", "round trip", "check-in"], answer: 1 },
          explain: "'Round trip' = viaje de ida y vuelta.",
        },
        {
          id: "tp-vocab-a7", type: "multiple_choice",
          prompt: "You show this to board a plane:",
          payload: { choices: ["boarding pass", "luggage", "delay"], answer: 0 },
          explain: "'Boarding pass' = pase de abordar.",
        },
        {
          id: "tp-vocab-a8", type: "word_bank",
          prompt: "Ordena la peticion:",
          payload: { words: ["a", "book", "to", "I'd", "room", "like"], answer: ["I'd", "like", "to", "book", "a", "room"] },
          explain: "I'd + like + to + book + a + room.",
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
      intro: "Competencia de GRAMATICA. Aprende la diferencia entre 'going to' y 'will'.",
      grammar: {
        title: "Futuro: going to vs will",
        form: "going to = decided plan · will = prediction or on-the-spot decision",
        examples: ["I'm going to visit Canada. (ya lo decidi)", "It's cold, I'll take a jacket. (ahora)", "I think it will rain. (prediccion)"],
        explain: { tr: ["Voy a visitar Canad\u00e1. (ya lo decid\u00ed)", "Hace fr\u00edo, llevar\u00e9 una chaqueta. (ahora)", "Creo que va a llover. (predicci\u00f3n)"] },
        mistakes: [
          { wrong: "I will visit Canada, I booked it.", right: "I'm going to visit Canada, I booked it." },
          { wrong: "I'm going to studying.", right: "I'm going to study." },
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
          id: "tp-gram-a3", type: "cloze",
          prompt: "Completa: 'The plane will ___ at 9 a.m.' (partir, base)",
          payload: { answer: "depart", alt: ["leave"] },
          explain: "will + verbo base: 'will depart'.",
        },
        {
          id: "tp-gram-a4", type: "cloze",
          prompt: "Completa: 'She is ___ to travel next week.' (going/go)",
          payload: { answer: "going" },
          explain: "be + going to + base.",
        },
        {
          id: "tp-gram-a5", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "What time the train departs?",
            "What time does the train depart?",
            "What time do the train departs?",
          ], answer: 1 },
          explain: "Pregunta present simple: does + sujeto + base.",
        },
        {
          id: "tp-gram-a6", type: "word_bank",
          prompt: "Ordena el plan de viaje:",
          payload: { words: ["going", "I'm", "to", "Canada", "visit"], answer: ["I'm", "going", "to", "visit", "Canada"] },
          explain: "I'm + going to + visit + Canada.",
        },
        {
          id: "tp-gram-a7", type: "word_bank",
          prompt: "Ordena la prediccion:",
          payload: { words: ["rain", "It", "will", "tomorrow"], answer: ["It", "will", "rain", "tomorrow"] },
          explain: "It + will + rain + tomorrow.",
        },
        {
          id: "tp-gram-a8", type: "cloze",
          prompt: "Completa (oferta): 'That bag is heavy. I ___ carry it for you.' (will/'ll)",
          payload: { answer: "will", alt: ["'ll"] },
          explain: "Oferta del momento = 'will'.",
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
      intro: "Competencia de ESCRITURA. Construye un correo para reservar un hotel, frase por frase.",
      activities: [
        {
          id: "tp-write-a1", type: "word_bank",
          prompt: "1. Saludo formal:",
          payload: { words: ["Sir", "Madam", "or", "Dear"], answer: ["Dear", "Sir", "or", "Madam"] },
        },
        {
          id: "tp-write-a2", type: "word_bank",
          prompt: "2. Di lo que quieres:",
          payload: { words: ["to", "a", "room", "I'd", "book", "like"], answer: ["I'd", "like", "to", "book", "a", "room"] },
        },
        {
          id: "tp-write-a3", type: "word_bank",
          prompt: "3. Da las fechas:",
          payload: { words: ["from", "the", "5th", "8th", "to", "the"], answer: ["from", "the", "5th", "to", "the", "8th"] },
        },
        {
          id: "tp-write-a4", type: "word_bank",
          prompt: "4. Pregunta por el registro:",
          payload: { words: ["is", "What", "check-in?", "time"], answer: ["What", "time", "is", "check-in?"] },
        },
        {
          id: "tp-write-a5", type: "word_bank",
          prompt: "5. Habla de tu plan de turismo:",
          payload: { words: ["sightseeing", "I'm", "to", "going", "do"], answer: ["I'm", "going", "to", "do", "sightseeing"] },
        },
        {
          id: "tp-write-a6", type: "multiple_choice",
          prompt: "6. Best closing:",
          payload: { choices: ["Cheers!", "I look forward to your reply.", "Bye!"], answer: 1 },
        },
        {
          id: "tp-write-a7", type: "multiple_choice",
          prompt: "7. Which expresses a decided plan?",
          payload: { choices: ["I'll maybe go.", "I'm going to travel in July.", "I travel now."], answer: 1 },
        },
        {
          id: "tp-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'reservar'?",
          payload: { choices: ["to depart", "to book", "to arrive"], answer: 1 },
        },
      ],
    },

    // ================= LISTENING =================
    {
      id: "tp-listen",
      order: 5,
      phase: "practice",
      skills: ["listening"],
      title: "Listening: entiende planes de viaje",
      intro:
        "Competencia de LISTENING (comprension auditiva). Escucha cada audio las veces que " +
        "necesites y responde. El texto esta OCULTO a proposito para entrenar el oido; puedes " +
        "abrir la transcripcion despues si quieres.",
      activities: [
        {
          id: "tp-listen-a1", type: "listening",
          prompt: "1. Escucha y responde:",
          payload: {
            audio: "I'm going to travel to Canada next Friday.",
            question: "When is the person going to travel?",
            choices: ["Next Friday", "Next Monday", "Tomorrow"], answer: 0,
          },
        },
        {
          id: "tp-listen-a2", type: "listening",
          prompt: "2. Escucha y responde:",
          payload: {
            audio: "My flight departs at six a.m., so I will arrive in the afternoon.",
            question: "What time does the flight depart?",
            choices: ["At 6 a.m.", "At 6 p.m.", "In the afternoon"], answer: 0,
          },
        },
        {
          id: "tp-listen-a3", type: "listening",
          prompt: "3. Escucha y escribe la respuesta:",
          payload: {
            audio: "I'd like to book a double room for three nights, please.",
            question: "How many nights? (escribe el numero en ingles)",
            answer: "three", alt: ["3"],
          },
        },
        {
          id: "tp-listen-a4", type: "listening",
          prompt: "4. Escucha el dialogo y responde:",
          payload: {
            audio: "A: Is check-in at three p.m.? B: Yes, that's right, at three.",
            question: "What time is check-in?",
            choices: ["3 p.m.", "5 p.m.", "At noon"], answer: 0,
          },
        },
        {
          id: "tp-listen-a5", type: "listening",
          prompt: "5. Escucha y responde:",
          payload: {
            audio: "There was a two-hour delay, but we finally arrived at our destination.",
            question: "What was the problem at the airport?",
            choices: ["A delay", "A cancellation", "Lost luggage"], answer: 0,
          },
        },
        {
          id: "tp-listen-a6", type: "listening",
          prompt: "6. Escucha y escribe la respuesta:",
          payload: {
            audio: "Remember to show your boarding pass at the gate.",
            question: "What do you show at the gate? (dos palabras)",
            answer: "boarding pass", alt: ["a boarding pass", "the boarding pass"],
          },
        },
      ],
    },
  ],
};
