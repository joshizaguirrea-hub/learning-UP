/**
 * data/units/pt16-esporte.js — Unidade A2 pt-BR "Tempo livre e esporte"
 * (advérbios de frequência: sempre, geralmente, às vezes, raramente, nunca).
 *
 * Dados PUROS. term = portugues (meta), translation = espanhol (L1 do aluno).
 */

export const PT16_ESPORTE = {
  id: "pt16-esporte",
  language: "pt",
  level: "A2",
  title: "Tempo livre e esporte",
  subtitle: "Adverbios de frecuencia (sempre, geralmente, às vezes, raramente, nunca) + deportes",

  cando: [
    "Puedo hablar de deportes y actividades de tiempo libre que me gustan.",
    "Puedo usar adverbios de frecuencia (sempre, geralmente, às vezes, raramente, nunca).",
    "Puedo usar 'gostar de' + infinitivo para decir que me gusta hacer algo.",
    "Puedo preguntar con que frecuencia alguien hace algo.",
  ],

  vocab: [
    { id: "pt16e-1", term: "jogar futebol", translation: "jugar futbol", example: "Jogo futebol todo domingo." },
    { id: "pt16e-2", term: "fazer esporte", translation: "hacer deporte", example: "Faço esporte três vezes por semana." },
    { id: "pt16e-3", term: "nadar", translation: "nadar", example: "Gosto de nadar na piscina." },
    { id: "pt16e-4", term: "correr", translation: "correr", example: "Corro no parque de manhã." },
    { id: "pt16e-5", term: "sempre", translation: "siempre", example: "Vou sempre à academia." },
    { id: "pt16e-6", term: "geralmente", translation: "generalmente/a menudo", example: "Jogo geralmente aos sábados." },
    { id: "pt16e-7", term: "às vezes", translation: "a veces", example: "Às vezes assisto aos jogos na TV." },
    { id: "pt16e-8", term: "raramente", translation: "raras veces", example: "Raramente faço ioga." },
    { id: "pt16e-9", term: "nunca", translation: "nunca", example: "Nunca vou à piscina no inverno." },
    { id: "pt16e-10", term: "a academia", translation: "el gimnasio", example: "Vou à academia duas vezes por semana." },
    { id: "pt16e-11", term: "a partida", translation: "el partido", example: "Assisti a um jogo de futebol." },
    { id: "pt16e-12", term: "o treino", translation: "el entrenamiento", example: "O treino é às seis." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "pt16e-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: o tempo livre",
      intro: "Competencia de LECTURA. Lee DOS textos en portugues y responde las preguntas.",
      content: {
        reading:
          "TEXTO 1 - O tempo livre do Lucas\n" +
          "Gosto muito de fazer esporte. Jogo sempre futebol aos domingos com os amigos e vou geralmente à " +
          "academia, umas três vezes por semana. Às vezes corro no parque de manhã cedo. Não gosto de nadar, " +
          "então nunca vou à piscina. Meu esporte favorito é o futebol, mas também gosto de assistir às " +
          "partidas de tênis na TV.\n\n" +
          "TEXTO 2 - Uma entrevista\n" +
          "A: Com que frequência você faz esporte? B: Faço esporte quase todo dia. Vou à academia três " +
          "vezes por semana e corro duas vezes. A: Você gosta de nadar? B: Sim, gosto muito, mas raramente " +
          "vou à piscina porque não tenho tempo. A: E qual é o seu esporte favorito? B: Com certeza o " +
          "futebol, jogo sempre com o meu time aos sábados.",
        glossary: [
          { term: "sempre / geralmente", translation: "siempre / generalmente" },
          { term: "às vezes / raramente", translation: "a veces / raras veces" },
          { term: "nunca", translation: "nunca" },
          { term: "fazer esporte", translation: "hacer deporte" },
          { term: "a academia", translation: "el gimnasio" },
          { term: "a partida", translation: "el partido" },
          { term: "com que frequência...?", translation: "con que frecuencia...?" },
          { term: "o time", translation: "el equipo" },
        ],
        keyPhrases: [
          "Los adverbios de frecuencia pueden ir ANTES o DESPUES del verbo en portugues: 'Sempre vou' o 'Vou sempre' (mas flexible que en italiano/espanol).",
          "'Nunca' NO necesita doble negacion si va antes del verbo: 'Nunca vou' (a diferencia de 'não vou nunca', con 'não').",
        ],
        check: [
          { prompt: "T1: Quando Lucas joga futebol?", choices: ["Aos domingos", "Aos sábados", "Todo dia"], answer: 0 },
          { prompt: "T1: Quantas vezes por semana vai à academia?", choices: ["Umas três vezes", "Uma vez", "Cinco vezes"], answer: 0 },
          { prompt: "T1: Por que ele nunca vai à piscina?", choices: ["Não gosta de nadar", "Não tem tempo", "É muito caro"], answer: 0 },
          { prompt: "T2: Quantas vezes por semana corre B?", choices: ["Duas vezes", "Três vezes", "Uma vez"], answer: 0 },
          { prompt: "T2: Por que B vai raramente à piscina?", choices: ["Não tem tempo", "Não gosta", "É longe"], answer: 0 },
          { prompt: "T2: Qual é o esporte favorito de B?", choices: ["O futebol", "O tênis", "A natação"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "pt16e-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: o esporte",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "jogar futebol / fazer esporte", translation: "jugar futbol / hacer deporte" },
        { term: "nadar / correr", translation: "nadar / correr" },
        { term: "sempre / geralmente", translation: "siempre / generalmente" },
        { term: "às vezes / raramente", translation: "a veces / raras veces" },
        { term: "nunca", translation: "nunca" },
        { term: "a academia", translation: "el gimnasio" },
        { term: "a partida", translation: "el partido" },
        { term: "o treino", translation: "el entrenamiento" },
      ],
      activities: [
        {
          id: "pt16e-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "sempre", right: "siempre" },
            { left: "geralmente", right: "generalmente" },
            { left: "às vezes", right: "a veces" },
            { left: "raramente", right: "raras veces" },
          ] },
        },
        {
          id: "pt16e-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "nunca", right: "nunca" },
            { left: "a academia", right: "el gimnasio" },
            { left: "a partida", right: "el partido" },
            { left: "fazer esporte", right: "hacer deporte" },
          ] },
        },
        {
          id: "pt16e-vocab-a3", type: "cloze",
          prompt: "Completa: 'Vou ___ à academia.' (siempre)",
          payload: { answer: "sempre" },
          explain: "'sempre' = siempre.",
        },
        {
          id: "pt16e-vocab-a4", type: "cloze",
          prompt: "Completa: '___ vou à piscina.' (nunca)",
          payload: { answer: "Nunca" },
          explain: "'nunca' antes del verbo, sin 'não'.",
        },
        {
          id: "pt16e-vocab-a5", type: "cloze",
          prompt: "Completa: '___ corro no parque.' (a veces)",
          payload: { answer: "Às vezes" },
          explain: "'às vezes' = a veces.",
        },
        {
          id: "pt16e-vocab-a6", type: "multiple_choice",
          prompt: "Como se diz 'a menudo juego tenis'?",
          payload: { choices: ["Jogo geralmente tênis.", "Jogo nunca tênis.", "Jogo raramente tênis."], answer: 0 },
          explain: "'geralmente' = a menudo/generalmente.",
        },
        {
          id: "pt16e-vocab-a7", type: "multiple_choice",
          prompt: "O que significa 'com que frequência'?",
          payload: { choices: ["cuanto cuesta", "con que frecuencia", "a que hora"], answer: 1 },
          explain: "'com que frequência' = con que frecuencia.",
        },
        {
          id: "pt16e-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["futebol", "Jogo", "sempre"], answer: ["Jogo", "sempre", "futebol"] },
          explain: "'Jogo sempre futebol'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "pt16e-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: os advérbios de frequência",
      intro: "Competencia de GRAMATICA. Aprende a decir cada cuanto haces algo.",
      grammar: {
        title: "Os advérbios de frequência",
        chart: {
          title: "ADVÉRBIOS DE FREQUÊNCIA",
          maps: "100% (sempre) -> 0% (nunca)",
          groups: [
            {
              label: "ALTA FREQUÊNCIA", color: "rose",
              forms: [
                { form: "SEMPRE", subjects: "siempre (100%)" },
                { form: "GERALMENTE", subjects: "generalmente" },
              ],
            },
            {
              label: "BAIXA FREQUÊNCIA", color: "green",
              forms: [
                { form: "ÀS VEZES", subjects: "a veces" },
                { form: "RARAMENTE", subjects: "raras veces" },
                { form: "NUNCA", subjects: "nunca (0%)" },
              ],
            },
          ],
        },
        form: "advérbio antes o despues del verbo; 'nunca' no necesita doble negacion si va antes",
        desc: "Los adverbios de frecuencia indican cada cuanto pasa algo, de 'siempre' (100%) a 'nunca' (0%). En portugues son mas flexibles de posicion que en italiano o espanol: pueden ir ANTES o DESPUES del verbo ('Sempre jogo' o 'Jogo sempre'). 'Nunca' es especial: si va ANTES del verbo, NO necesita 'não' (Nunca vou à piscina).",
        rule: "Orden flexible: [advérbio] + verbo, o verbo + [advérbio] (Sempre jogo / Jogo sempre). Con NUNCA: NUNCA + verbo (sin 'não'). Pregunta de frecuencia: 'Com que frequência + presente + ...?'.",
        examples: ["Vou sempre à academia.", "Jogo geralmente aos sábados.", "Às vezes corro.", "Nunca vou à piscina no inverno."],
        explain: { tr: ["Siempre voy al gimnasio.", "Generalmente juego los sabados.", "A veces corro.", "Nunca voy a la piscina en invierno."] },
        mistakes: [
          { wrong: "Eu nunca não vou à piscina.", right: "Eu nunca vou à piscina." },
          { wrong: "Geralmente eu jogo futebol aos domingo.", right: "Geralmente eu jogo futebol aos domingos." },
          { wrong: "Eu vou nunca à piscina.", right: "Eu nunca vou à piscina." },
        ],
      },
      activities: [
        {
          id: "pt16e-gram-a1", type: "cloze",
          prompt: "Completa: 'Vou ___ à academia.' (siempre)",
          payload: { answer: "sempre" },
          explain: "'sempre' = siempre.",
        },
        {
          id: "pt16e-gram-a2", type: "cloze",
          prompt: "Completa: 'Eu ___ vou à piscina no inverno.' (nunca)",
          payload: { answer: "nunca" },
          explain: "'nunca' antes del verbo.",
        },
        {
          id: "pt16e-gram-a3", type: "cloze",
          prompt: "Completa: '___ corro de manhã.' (a veces)",
          payload: { answer: "Às vezes" },
          explain: "'às vezes' = a veces.",
        },
        {
          id: "pt16e-gram-a4", type: "multiple_choice",
          prompt: "Onde pode ir o advérbio de frequência em português?",
          payload: { choices: ["somente antes do verbo", "antes ou depois do verbo", "somente no final da frase"], answer: 1 },
          explain: "Es flexible: antes o despues del verbo.",
        },
        {
          id: "pt16e-gram-a5", type: "multiple_choice",
          prompt: "Quando 'nunca' vai antes do verbo, precisa de 'não'?",
          payload: { choices: ["sim, sempre", "não", "às vezes"], answer: 1 },
          explain: "'nunca' antes del verbo ya niega por si solo.",
        },
        {
          id: "pt16e-gram-a6", type: "multiple_choice",
          prompt: "Escolha a frase correta:",
          payload: { choices: ["Eu nunca não vou à piscina.", "Eu nunca vou à piscina.", "Eu vou nunca à piscina."], answer: 1 },
          explain: "'nunca' antes del verbo, sin 'não' redundante.",
        },
        {
          id: "pt16e-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["tênis", "Jogo", "geralmente"], answer: ["Jogo", "geralmente", "tênis"] },
          explain: "'Jogo geralmente tênis'.",
        },
        {
          id: "pt16e-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["à", "Nunca", "piscina", "vou"], answer: ["Nunca", "vou", "à", "piscina"] },
          explain: "'Nunca vou à piscina'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "pt16e-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: o seu tempo livre",
      intro: "Competencia de ESCRITURA. Cuenta que haces en tu tiempo libre, frase por frase.",
      activities: [
        {
          id: "pt16e-write-a1", type: "word_bank",
          prompt: "1. Di que siempre juegas futbol los domingos:",
          payload: { words: ["aos", "Jogo", "futebol", "domingos", "sempre"], answer: ["Jogo", "sempre", "futebol", "aos", "domingos"] },
        },
        {
          id: "pt16e-write-a2", type: "word_bank",
          prompt: "2. Di que nunca nadas:",
          payload: { words: ["Nunca", "nado"], answer: ["Nunca", "nado"] },
        },
        {
          id: "pt16e-write-a3", type: "word_bank",
          prompt: "3. Di que a menudo vas al gimnasio:",
          payload: { words: ["academia", "Vou", "geralmente", "à"], answer: ["Vou", "geralmente", "à", "academia"] },
        },
        {
          id: "pt16e-write-a4", type: "word_bank",
          prompt: "4. Pregunta con que frecuencia hace deporte (voce):",
          payload: { words: ["faz", "Com", "esporte", "frequência", "que", "você"], answer: ["Com", "que", "frequência", "você", "faz", "esporte"] },
        },
        {
          id: "pt16e-write-a5", type: "word_bank",
          prompt: "5. Di que a veces corres en el parque:",
          payload: { words: ["no", "Às", "corro", "vezes", "parque"], answer: ["Às", "vezes", "corro", "no", "parque"] },
        },
        {
          id: "pt16e-write-a6", type: "multiple_choice",
          prompt: "6. 'Raramente' significa:",
          payload: { choices: ["siempre", "raras veces", "nunca"], answer: 1 },
        },
        {
          id: "pt16e-write-a7", type: "multiple_choice",
          prompt: "7. Qual é correto?",
          payload: { choices: ["Eu nunca vou à piscina.", "Eu vou nunca à piscina.", "Eu nunca não vou à piscina."], answer: 0 },
        },
        {
          id: "pt16e-write-a8", type: "multiple_choice",
          prompt: "8. 'Às vezes' significa:",
          payload: { choices: ["siempre", "a veces", "nunca"], answer: 1 },
        },
      ],
    },
  ],
};
