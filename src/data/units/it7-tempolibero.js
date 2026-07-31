/**
 * data/units/it7-tempolibero.js — Unita A1 italiano "Il tempo libero" (potere/andare).
 *
 * Dati PURI. term = italiano (meta), translation = spagnolo (L1 dello studente).
 */

export const IT7_TEMPOLIBERO = {
  id: "it7-tempolibero",
  language: "it",
  level: "A1",
  title: "Il tempo libero",
  subtitle: "Actividades de ocio con 'potere', 'andare' e invitaciones",

  cando: [
    "Puedo hablar de actividades de tiempo libre.",
    "Puedo usar 'potere' (posso, puoi, puo) para pedir/proponer.",
    "Puedo usar 'andare' (vado, vai, va) con lugares (al cinema, in piscina).",
    "Puedo hacer y aceptar una invitacion sencilla.",
  ],

  vocab: [
    { id: "it7t-1", term: "il tempo libero", translation: "el tiempo libre", example: "Nel tempo libero leggo." },
    { id: "it7t-2", term: "leggere", translation: "leer", example: "Mi piace leggere." },
    { id: "it7t-3", term: "guardare la TV", translation: "ver la tele", example: "Guardo la TV la sera." },
    { id: "it7t-4", term: "ascoltare musica", translation: "escuchar musica", example: "Ascolto musica ogni giorno." },
    { id: "it7t-5", term: "giocare", translation: "jugar", example: "Gioco a calcio." },
    { id: "it7t-6", term: "fare sport", translation: "hacer deporte", example: "Faccio sport il sabato." },
    { id: "it7t-7", term: "il cinema", translation: "el cine", example: "Andiamo al cinema?" },
    { id: "it7t-8", term: "la piscina", translation: "la piscina", example: "Vado in piscina." },
    { id: "it7t-9", term: "ballare", translation: "bailar", example: "Mi piace ballare." },
    { id: "it7t-10", term: "il fine settimana", translation: "el fin de semana", example: "Il fine settimana esco." },
    { id: "it7t-11", term: "insieme", translation: "juntos", example: "Andiamo insieme." },
    { id: "it7t-12", term: "volentieri", translation: "con gusto/encantado", example: "Si, volentieri!" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "it7t-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: che facciamo?",
      intro: "Competencia de LECTURA. Lee DOS textos en italiano y responde las preguntas.",
      content: {
        reading:
          "TESTO 1 - Il weekend di Giulia\n" +
          "Nel tempo libero Giulia fa molte cose. Il sabato fa sport e la sera guarda la TV. " +
          "La domenica le piace leggere e ascoltare musica. Ogni tanto va in piscina con la sorella. " +
          "Giulia ama ballare, ma non gioca a calcio.\n\n" +
          "TESTO 2 - Un invito\n" +
          "A: Ciao! Cosa fai questo fine settimana? B: Non lo so. Possiamo fare qualcosa insieme? " +
          "A: Si! Andiamo al cinema sabato sera? B: Volentieri! A che ora? A: Alle otto. B: Perfetto, ci vediamo li!",
        glossary: [
          { term: "potere (posso / puoi / puo)", translation: "poder (puedo / puedes / puede)" },
          { term: "possiamo", translation: "podemos" },
          { term: "andare (vado / vai / va)", translation: "ir (voy / vas / va)" },
          { term: "andiamo!", translation: "vamos!" },
          { term: "volentieri", translation: "con gusto/encantado" },
          { term: "insieme", translation: "juntos" },
          { term: "a che ora?", translation: "a que hora?" },
          { term: "ci vediamo li", translation: "nos vemos alli" },
        ],
        keyPhrases: [
          "Ojo: tras 'posso/possiamo' va un INFINITIVO (possiamo andare).",
          "'Andare a + lugar' (al cinema) / 'andare in + lugar' (in piscina).",
        ],
        check: [
          { prompt: "T1: Cosa fa Giulia il sabato?", choices: ["Legge", "Fa sport", "Va in piscina"], answer: 1 },
          { prompt: "T1: Cosa NON fa Giulia?", choices: ["Ballare", "Leggere", "Giocare a calcio"], answer: 2 },
          { prompt: "T1: Con chi va in piscina?", choices: ["Con la sorella", "Da sola", "Con un amico"], answer: 0 },
          { prompt: "T2: Dove vogliono andare?", choices: ["In piscina", "Al cinema", "Al mercato"], answer: 1 },
          { prompt: "T2: Quando?", choices: ["Sabato sera", "Domenica", "Venerdi"], answer: 0 },
          { prompt: "T2: A che ora?", choices: ["Alle sette", "Alle otto", "Alle nove"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "it7t-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: attivita del tempo libero",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "il tempo libero", translation: "el tiempo libre" },
        { term: "leggere / ballare", translation: "leer / bailar" },
        { term: "guardare la TV", translation: "ver la tele" },
        { term: "ascoltare musica", translation: "escuchar musica" },
        { term: "giocare / fare sport", translation: "jugar / hacer deporte" },
        { term: "il cinema / la piscina", translation: "el cine / la piscina" },
        { term: "il fine settimana", translation: "el fin de semana" },
        { term: "insieme / volentieri", translation: "juntos / con gusto" },
      ],
      activities: [
        {
          id: "it7t-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "leggere", right: "leer" },
            { left: "ballare", right: "bailar" },
            { left: "giocare", right: "jugar" },
            { left: "cinema", right: "cine" },
          ] },
        },
        {
          id: "it7t-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "piscina", right: "piscina" },
            { left: "insieme", right: "juntos" },
            { left: "volentieri", right: "con gusto" },
            { left: "musica", right: "musica" },
          ] },
        },
        {
          id: "it7t-vocab-a3", type: "cloze",
          prompt: "Completa: 'Nel tempo ___ leggo.' (libre)",
          payload: { answer: "libero" },
          explain: "'Tempo libero' = tiempo libre.",
        },
        {
          id: "it7t-vocab-a4", type: "cloze",
          prompt: "Completa: 'Vado ___ piscina.' (in/a -> in)",
          payload: { answer: "in" },
          explain: "'Andare in piscina'.",
        },
        {
          id: "it7t-vocab-a5", type: "cloze",
          prompt: "Completa: 'Andiamo ___ cinema.' (al)",
          payload: { answer: "al" },
          explain: "'Andare al cinema'.",
        },
        {
          id: "it7t-vocab-a6", type: "multiple_choice",
          prompt: "Cual significa 'hacer deporte'?",
          payload: { choices: ["fare sport", "guardare la TV", "ascoltare musica"], answer: 0 },
          explain: "'Fare sport' = hacer deporte.",
        },
        {
          id: "it7t-vocab-a7", type: "multiple_choice",
          prompt: "Como aceptas una invitacion con gusto?",
          payload: { choices: ["No, grazie.", "Si, volentieri!", "Non lo so."], answer: 1 },
          explain: "'Si, volentieri!' = si, encantado!",
        },
        {
          id: "it7t-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["cinema", "Andiamo", "al"], answer: ["Andiamo", "al", "cinema"] },
          explain: "'Andiamo al cinema' = vamos al cine.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "it7t-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: 'potere' e 'andare'",
      intro: "Competencia de GRAMATICA. Aprende 'potere' y 'andare' (a / in).",
      grammar: {
        title: "'Potere' e 'andare'",
        chart: {
          title: "POTERE / ANDARE",
          maps: "poder / ir",
          groups: [
            {
              label: "POTERE", color: "violet",
              forms: [
                { form: "POSSO / PUOI", subjects: "io / tu" },
                { form: "PUO'", subjects: "lui / lei" },
                { form: "POSSIAMO", subjects: "noi" },
                { form: "POTETE / POSSONO", subjects: "voi / loro" },
              ],
            },
            {
              label: "ANDARE", color: "green",
              forms: [
                { form: "VADO / VAI", subjects: "io / tu" },
                { form: "VA", subjects: "lui / lei" },
                { form: "ANDIAMO / VANNO", subjects: "noi / loro" },
              ],
            },
          ],
        },
        form: "*posso* + infinitivo / *vado* a/in + luogo",
        desc: "'Potere' = poder (posso, puoi, puo...) y siempre va con un INFINITIVO (posso andare). 'Andare' = ir; se usa 'a' con algunos lugares (al cinema) e 'in' con otros (in piscina, in citta).",
        rule: "Potere: io posso, tu puoi, lui/lei puo, noi possiamo, voi potete, loro possono. Andare: io vado, tu vai, lui/lei va, noi andiamo, voi andate, loro vanno. Preposiciones con andare: 'a/al/allo' (al cinema, al mare) e 'in' (in piscina, in citta, in palestra). 'Possiamo...?' sirve para proponer planes.",
        examples: ["Posso venire con te?", "Possiamo andare al cinema?", "Vado in piscina il sabato.", "Loro vanno al mare."],
        explain: { tr: ["Puedo ir contigo?", "Podemos ir al cine?", "Voy a la piscina los sabados.", "Ellos van a la playa."] },
        mistakes: [
          { wrong: "Posso vado al cinema.", right: "Posso andare al cinema." },
          { wrong: "Vado a piscina.", right: "Vado in piscina." },
          { wrong: "Noi possono andare.", right: "Noi possiamo andare." },
        ],
      },
      activities: [
        {
          id: "it7t-gram-a1", type: "cloze",
          prompt: "Completa: 'Io ___ venire?' (poder)",
          payload: { answer: "posso" },
          explain: "io -> 'posso'.",
        },
        {
          id: "it7t-gram-a2", type: "cloze",
          prompt: "Completa: 'Noi ___ andare al cinema.' (poder)",
          payload: { answer: "possiamo" },
          explain: "noi -> 'possiamo'.",
        },
        {
          id: "it7t-gram-a3", type: "cloze",
          prompt: "Completa: 'Io ___ in piscina.' (ir)",
          payload: { answer: "vado" },
          explain: "io -> 'vado'.",
        },
        {
          id: "it7t-gram-a4", type: "cloze",
          prompt: "Completa: 'Vado ___ piscina.' (in/a -> in)",
          payload: { answer: "in" },
          explain: "'in piscina'.",
        },
        {
          id: "it7t-gram-a5", type: "multiple_choice",
          prompt: "Scegli la frase corretta:",
          payload: { choices: ["Posso vado al mare.", "Posso andare al mare.", "Posso andando al mare."], answer: 1 },
          explain: "Tras 'posso' -> infinitivo 'andare'.",
        },
        {
          id: "it7t-gram-a6", type: "multiple_choice",
          prompt: "Como dices 'ellos van al cine'?",
          payload: { choices: ["Loro vanno al cinema.", "Loro va al cinema.", "Loro andiamo al cinema."], answer: 0 },
          explain: "loro -> 'vanno'.",
        },
        {
          id: "it7t-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["andare", "Possiamo", "cinema", "al"], answer: ["Possiamo", "andare", "al", "cinema"] },
          explain: "'Possiamo andare al cinema?'.",
        },
        {
          id: "it7t-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["in", "Vado", "sabato", "piscina", "il"], answer: ["Vado", "in", "piscina", "il", "sabato"] },
          explain: "'Vado in piscina il sabato'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "it7t-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: invita un amico",
      intro: "Competencia de ESCRITURA. Invita a alguien a salir, frase por frase.",
      activities: [
        {
          id: "it7t-write-a1", type: "word_bank",
          prompt: "1. Propon ir juntos al cine:",
          payload: { words: ["andare", "Possiamo", "cinema", "al", "insieme"], answer: ["Possiamo", "andare", "al", "cinema", "insieme"] },
        },
        {
          id: "it7t-write-a2", type: "word_bank",
          prompt: "2. Di que vas a la piscina el sabado:",
          payload: { words: ["in", "Vado", "sabato", "piscina", "il"], answer: ["Vado", "in", "piscina", "il", "sabato"] },
        },
        {
          id: "it7t-write-a3", type: "word_bank",
          prompt: "3. Di que te gusta bailar:",
          payload: { words: ["ballare", "Mi", "piace"], answer: ["Mi", "piace", "ballare"] },
        },
        {
          id: "it7t-write-a4", type: "word_bank",
          prompt: "4. Pregunta a que hora:",
          payload: { words: ["che", "A", "ora"], answer: ["A", "che", "ora"] },
        },
        {
          id: "it7t-write-a5", type: "word_bank",
          prompt: "5. Acepta con gusto:",
          payload: { words: ["volentieri", "Si"], answer: ["Si", "volentieri"] },
        },
        {
          id: "it7t-write-a6", type: "multiple_choice",
          prompt: "6. Cual frase es correcta?",
          payload: { choices: ["Posso andare al mare.", "Posso vado al mare.", "Posso andar al mare."], answer: 0 },
        },
        {
          id: "it7t-write-a7", type: "multiple_choice",
          prompt: "7. 'vamos a la piscina' se dice...",
          payload: { choices: ["Andiamo a piscina.", "Andiamo in piscina.", "Andiamo piscina."], answer: 1 },
        },
        {
          id: "it7t-write-a8", type: "multiple_choice",
          prompt: "8. 'podemos hacer deporte' se dice...",
          payload: { choices: ["Possiamo fare sport.", "Possiamo facciamo sport.", "Possono fare sport."], answer: 0 },
        },
      ],
    },
  ],
};
