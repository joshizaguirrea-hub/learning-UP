/**
 * data/units/it1-ciao.js — Unita A1 italiano "Ciao!" (saluti + verbo ESSERE).
 *
 * Dati PURI. Stesso schema delle unita di inglese/portoghese (1 lezione = 1
 * competenza). term = italiano (meta), translation = spagnolo (L1 dello studente).
 */

export const IT1_CIAO = {
  id: "it1-ciao",
  language: "it",
  level: "A1",
  title: "Ciao!",
  subtitle: "Saludar, presentarte y usar el verbo 'essere'",

  cando: [
    "Puedo saludar y despedirme en italiano.",
    "Puedo presentarme y decir mi nombre y de donde soy.",
    "Puedo usar el verbo 'essere' (ser) en frases simples.",
    "Puedo preguntar y responder datos personales basicos.",
  ],

  vocab: [
    { id: "it1c-1", term: "ciao", translation: "hola / chau", example: "Ciao! Come stai?" },
    { id: "it1c-2", term: "arrivederci", translation: "adios / hasta la vista", example: "Arrivederci, a domani!" },
    { id: "it1c-3", term: "buongiorno", translation: "buenos dias", example: "Buongiorno, professoressa!" },
    { id: "it1c-4", term: "buonasera", translation: "buenas tardes/noches", example: "Buonasera, signore." },
    { id: "it1c-5", term: "buonanotte", translation: "buenas noches (al dormir)", example: "Buonanotte, a domani." },
    { id: "it1c-6", term: "piacere", translation: "mucho gusto", example: "Piacere, sono Anna." },
    { id: "it1c-7", term: "per favore", translation: "por favor", example: "Un caffe, per favore." },
    { id: "it1c-8", term: "grazie", translation: "gracias", example: "Grazie mille!" },
    { id: "it1c-9", term: "nome", translation: "nombre", example: "Come ti chiami?" },
    { id: "it1c-10", term: "amico/amica", translation: "amigo/a", example: "Questo e il mio amico, Tom." },
    { id: "it1c-11", term: "insegnante", translation: "profesor/a (docente)", example: "Lei e la mia insegnante." },
    { id: "it1c-12", term: "come stai?", translation: "como estas?", example: "Ciao! Come stai?" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "it1c-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: saluti e presentazioni",
      intro: "Competencia de LECTURA. Lee DOS textos en italiano y responde las preguntas.",
      content: {
        reading:
          "TESTO 1 - Anna\n" +
          "Ciao! Mi chiamo Anna. Sono italiana. Sono studentessa. Questo e il mio amico, Tom. " +
          "Lui e del Canada. E insegnante. Piacere! Siamo felici di imparare l'italiano. " +
          "Ciao e benvenuti!\n\n" +
          "TESTO 2 - Una conversazione breve\n" +
          "A: Ciao! Come stai? B: Bene, grazie. E tu? A: Molto bene! Come ti chiami? " +
          "B: Mi chiamo Sara. Sono spagnola. A: Piacere, Sara! B: Piacere mio. Ciao! " +
          "A: Ciao, a domani!",
        glossary: [
          { term: "mi chiamo", translation: "me llamo" },
          { term: "sono", translation: "soy" },
          { term: "questo e", translation: "este es" },
          { term: "lui e / lei e", translation: "el es / ella es" },
          { term: "come stai?", translation: "como estas?" },
          { term: "grazie", translation: "gracias" },
          { term: "piacere mio", translation: "el gusto es mio" },
          { term: "a domani", translation: "hasta manana" },
        ],
        keyPhrases: [
          "Busca datos: de donde es cada persona y que hace.",
          "Fijate en el saludo y la despedida del Testo 2.",
        ],
        check: [
          { prompt: "T1: Di dov'e Anna?", choices: ["Canada", "Italia", "Spagna"], answer: 1 },
          { prompt: "T1: Qual e la professione di Tom?", choices: ["Studente", "Insegnante", "Medico"], answer: 1 },
          { prompt: "T1: Qual e la professione di Anna?", choices: ["Insegnante", "Studentessa", "Medico"], answer: 1 },
          { prompt: "T2: Come si chiama la persona B?", choices: ["Anna", "Sara", "Tom"], answer: 1 },
          { prompt: "T2: Di dov'e Sara?", choices: ["Italia", "Spagna", "Canada"], answer: 1 },
          { prompt: "T2: Come finisce la conversazione?", choices: ["Ciao", "Grazie", "Per favore"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "it1c-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: saluti e persone",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "ciao / arrivederci", translation: "hola / adios" },
        { term: "buongiorno / buonasera", translation: "buenos dias / buenas tardes" },
        { term: "piacere", translation: "mucho gusto" },
        { term: "per favore / grazie", translation: "por favor / gracias" },
        { term: "amico / amica", translation: "amigo/a" },
        { term: "insegnante / studente", translation: "profesor / estudiante" },
        { term: "nome", translation: "nombre" },
        { term: "come stai?", translation: "como estas?" },
      ],
      activities: [
        {
          id: "it1c-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "Ciao", right: "Hola" },
            { left: "Arrivederci", right: "Adios" },
            { left: "Grazie", right: "Gracias" },
            { left: "Per favore", right: "Por favor" },
          ] },
        },
        {
          id: "it1c-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "amico", right: "amigo" },
            { left: "insegnante", right: "profesor" },
            { left: "studente", right: "estudiante" },
            { left: "nome", right: "nombre" },
          ] },
        },
        {
          id: "it1c-vocab-a3", type: "cloze",
          prompt: "Completa el saludo del dia: 'Buon___!' (giorno)",
          payload: { answer: "giorno" },
          explain: "'Buongiorno' = buenos dias.",
        },
        {
          id: "it1c-vocab-a4", type: "cloze",
          prompt: "Completa: 'Un caffe, per ___.' (favor)",
          payload: { answer: "favore" },
          explain: "'Per favore' = por favor.",
        },
        {
          id: "it1c-vocab-a5", type: "cloze",
          prompt: "Completa el 'mucho gusto': '___.' (una palabra)",
          payload: { answer: "piacere" },
          explain: "'Piacere' = mucho gusto.",
        },
        {
          id: "it1c-vocab-a6", type: "multiple_choice",
          prompt: "Cual palabra significa 'profesor/a (docente)'?",
          payload: { choices: ["studente", "insegnante", "amico"], answer: 1 },
          explain: "'Insegnante' = docente / profesor(a).",
        },
        {
          id: "it1c-vocab-a7", type: "multiple_choice",
          prompt: "Como preguntas 'como estas?'",
          payload: { choices: ["Come ti chiami?", "Come stai?", "Di dove sei?"], answer: 1 },
          explain: "'Come stai?' = como estas?",
        },
        {
          id: "it1c-vocab-a8", type: "word_bank",
          prompt: "Ordena la despedida:",
          payload: { words: ["domani", "A", "presto"], answer: ["A", "presto", "domani"] },
          explain: "'A presto' / 'A domani' = hasta pronto / manana.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "it1c-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: il verbo 'essere' (presente)",
      intro: "Competencia de GRAMATICA. Aprende el verbo 'essere' (ser) en presente y practicalo.",
      grammar: {
        title: "Il verbo 'essere' (presente)",
        chart: {
          title: "ESSERE",
          maps: "ESSERE (identidad, origen, profesion)",
          groups: [
            {
              label: "PRESENTE", color: "amber",
              forms: [
                { form: "SONO", subjects: "io" },
                { form: "SEI", subjects: "tu" },
                { form: "E", subjects: "lui, lei" },
                { form: "SIAMO", subjects: "noi" },
                { form: "SIETE", subjects: "voi" },
                { form: "SONO", subjects: "loro" },
              ],
            },
          ],
        },
        form: "io *sono* / tu *sei* / lui-lei *e* / noi *siamo* / voi *siete* / loro *sono*",
        desc: "Sirve para presentarte, decir quien eres, tu profesion y de donde eres.",
        rule: "El verbo 'essere' cambia segun la persona: 'io sono', 'tu sei', 'lui/lei e', 'noi siamo', 'voi siete', 'loro sono'. Ojo: 'io sono' y 'loro sono' se escriben igual pero se entienden por el sujeto.",
        examples: ["Io sono studente.", "Lei e del Canada.", "Noi siamo amici.", "Loro sono insegnanti."],
        explain: { tr: ["Yo soy estudiante.", "Ella es de Canada.", "Nosotros somos amigos.", "Ellos son profesores."] },
        mistakes: [
          { wrong: "Io sei italiano.", right: "Io sono italiano." },
          { wrong: "Lui sono studente.", right: "Lui e studente." },
          { wrong: "Noi e amici.", right: "Noi siamo amici." },
        ],
      },
      activities: [
        {
          id: "it1c-gram-a1", type: "cloze",
          prompt: "Completa: 'Io ___ studente.' (soy)",
          payload: { answer: "sono" },
          explain: "Con 'io' siempre 'sono'.",
        },
        {
          id: "it1c-gram-a2", type: "cloze",
          prompt: "Completa: 'Tu ___ italiano.' (eres)",
          payload: { answer: "sei" },
          explain: "Con 'tu' usamos 'sei'.",
        },
        {
          id: "it1c-gram-a3", type: "cloze",
          prompt: "Completa: 'Lei ___ del Canada.' (es)",
          payload: { answer: "e", alt: ["\u00e8"] },
          explain: "Con lui/lei usamos 'e' (con acento: e).",
        },
        {
          id: "it1c-gram-a4", type: "multiple_choice",
          prompt: "Scegli la frase corretta:",
          payload: { choices: ["Noi e amici.", "Noi siamo amici.", "Noi sono amici."], answer: 1 },
          explain: "Con 'noi' usamos 'siamo'.",
        },
        {
          id: "it1c-gram-a5", type: "multiple_choice",
          prompt: "Scegli la frase corretta:",
          payload: { choices: ["Loro sono insegnanti.", "Loro siete insegnanti.", "Loro sei insegnanti."], answer: 0 },
          explain: "Con 'loro' usamos 'sono'.",
        },
        {
          id: "it1c-gram-a6", type: "word_bank",
          prompt: "Ordena para presentarte:",
          payload: { words: ["chiamo", "Mi", "Anna"], answer: ["Mi", "chiamo", "Anna"] },
          explain: "Orden: Mi + chiamo + (nombre).",
        },
        {
          id: "it1c-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["del", "Io", "Canada", "sono"], answer: ["Io", "sono", "del", "Canada"] },
          explain: "Orden: Io + sono + del + (pais).",
        },
        {
          id: "it1c-gram-a8", type: "multiple_choice",
          prompt: "Como preguntas el nombre (informal)?",
          payload: { choices: ["Come ti chiami?", "Come stai?", "Di dove sei?"], answer: 0 },
          explain: "'Come ti chiami?' = como te llamas?",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "it1c-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: presentati completamente",
      intro: "Competencia de ESCRITURA. Construye una presentacion completa, frase por frase.",
      activities: [
        {
          id: "it1c-write-a1", type: "word_bank",
          prompt: "1. Saluda y di tu nombre:",
          payload: { words: ["chiamo", "Ciao,", "mi", "Leo"], answer: ["Ciao,", "mi", "chiamo", "Leo"] },
        },
        {
          id: "it1c-write-a2", type: "word_bank",
          prompt: "2. Di de donde eres:",
          payload: { words: ["del", "Io", "Brasile", "sono"], answer: ["Io", "sono", "del", "Brasile"] },
        },
        {
          id: "it1c-write-a3", type: "word_bank",
          prompt: "3. Di tu ocupacion:",
          payload: { words: ["studente", "Io", "sono"], answer: ["Io", "sono", "studente"] },
        },
        {
          id: "it1c-write-a4", type: "word_bank",
          prompt: "4. Presenta a un amigo:",
          payload: { words: ["e", "Questo", "amico", "mio", "Tom", "il"], answer: ["Questo", "e", "il", "mio", "amico", "Tom"] },
        },
        {
          id: "it1c-write-a5", type: "word_bank",
          prompt: "5. Pregunta el nombre de la otra persona:",
          payload: { words: ["ti", "Come", "chiami?"], answer: ["Come", "ti", "chiami?"] },
        },
        {
          id: "it1c-write-a6", type: "multiple_choice",
          prompt: "6. Mejor forma de despedirte:",
          payload: { choices: ["Ciao!", "Arrivederci, a presto!", "Mi chiamo."], answer: 1 },
        },
        {
          id: "it1c-write-a7", type: "multiple_choice",
          prompt: "7. Alguien dice 'Piacere.' Respondes:",
          payload: { choices: ["Piacere mio.", "Arrivederci.", "No, grazie."], answer: 0 },
        },
        {
          id: "it1c-write-a8", type: "multiple_choice",
          prompt: "8. Cual es un saludo educado?",
          payload: { choices: ["Ciao, come stai?", "Dammi quello.", "Vattene."], answer: 0 },
        },
      ],
    },
  ],
};
