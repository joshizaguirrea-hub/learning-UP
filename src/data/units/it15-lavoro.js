/**
 * data/units/it15-lavoro.js — Unita A2 italiano "Il lavoro" ('da' + presente
 * para hablar de duracion + vocabolario del lavoro).
 *
 * Dati PURI. term = italiano (meta), translation = spagnolo (L1 dello studente).
 */

export const IT15_LAVORO = {
  id: "it15-lavoro",
  language: "it",
  level: "A2",
  title: "Il lavoro",
  subtitle: "'Da' + presente para decir desde cuando haces algo + vocabulario de profesiones",

  cando: [
    "Puedo hablar de mi profesion y mi lugar de trabajo.",
    "Puedo usar 'da' + tiempo con el PRESENTE para decir desde cuando hago algo.",
    "Puedo usar vocabulario de profesiones comunes.",
    "Puedo participar en una entrevista de trabajo basica.",
  ],

  vocab: [
    { id: "it15l-1", term: "il lavoro", translation: "el trabajo", example: "Il mio lavoro e interessante." },
    { id: "it15l-2", term: "l'impiegato/a", translation: "el empleado/a", example: "Sono impiegata in una banca." },
    { id: "it15l-3", term: "l'insegnante", translation: "el profesor/a", example: "Lavoro come insegnante." },
    { id: "it15l-4", term: "il/la cuoco/a", translation: "el/la cocinero/a", example: "Mio fratello e cuoco." },
    { id: "it15l-5", term: "l'infermiere/a", translation: "el/la enfermero/a", example: "Lei e infermiera in ospedale." },
    { id: "it15l-6", term: "l'ufficio", translation: "la oficina", example: "Vado in ufficio ogni giorno." },
    { id: "it15l-7", term: "lo stipendio", translation: "el salario", example: "Lo stipendio non e alto, ma il lavoro mi piace." },
    { id: "it15l-8", term: "lavoro qui da...", translation: "trabajo aqui desde hace...", example: "Lavoro qui da tre anni." },
    { id: "it15l-9", term: "fare domanda", translation: "postularse (a un trabajo)", example: "Ho fatto domanda per il lavoro." },
    { id: "it15l-10", term: "il colloquio", translation: "la entrevista (de trabajo)", example: "Domani ho un colloquio di lavoro." },
    { id: "it15l-11", term: "l'esperienza", translation: "la experiencia", example: "Ho esperienza in questo settore." },
    { id: "it15l-12", term: "assumere", translation: "contratar", example: "L'azienda vuole assumere nuovo personale." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "it15l-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: il mio lavoro",
      intro: "Competencia de LECTURA. Lee DOS textos en italiano y responde las preguntas.",
      content: {
        reading:
          "TESTO 1 - Il lavoro di Sofia\n" +
          "Sono impiegata in un'azienda di moda da due anni. Lavoro in ufficio dal lunedi al venerdi. Il mio " +
          "stipendio non e altissimo, ma mi piace molto il mio lavoro perche ho buoni colleghi. L'anno " +
          "prossimo spero di avere una promozione. Ho molta esperienza in questo settore, da quando ho " +
          "iniziato cinque anni fa.\n\n" +
          "TESTO 2 - Un colloquio di lavoro\n" +
          "A: Da quanto tempo lavora nel settore? B: Lavoro come infermiera da sei anni. A: Che esperienza " +
          "ha? B: Ho lavorato in due ospedali diversi. A: Perche vuole lavorare qui? B: Perche voglio nuove " +
          "sfide e il vostro ospedale ha un'ottima reputazione. A: Grazie, le faremo sapere presto.",
        glossary: [
          { term: "impiegato/a", translation: "empleado/a" },
          { term: "da due anni", translation: "desde hace dos anos" },
          { term: "lo stipendio", translation: "el salario" },
          { term: "il colloquio", translation: "la entrevista" },
          { term: "da quanto tempo...?", translation: "desde hace cuanto tiempo...?" },
          { term: "l'esperienza", translation: "la experiencia" },
          { term: "assumere", translation: "contratar" },
          { term: "le faremo sapere", translation: "le haremos saber" },
        ],
        keyPhrases: [
          "'Da' + periodo + PRESENTE (no pasado) indica desde cuando algo pasa y SIGUE pasando: 'Lavoro qui da tre anni'.",
          "'Da quanto tempo...?' = desde hace cuanto tiempo...? (para preguntar).",
        ],
        check: [
          { prompt: "T1: Da quanto tempo lavora Sofia nell'azienda?", choices: ["Da due anni", "Da cinque anni", "Da un anno"], answer: 0 },
          { prompt: "T1: Come sono i colleghi di Sofia?", choices: ["Buoni", "Difficili", "Pochi"], answer: 0 },
          { prompt: "T1: Da quando ha esperienza nel settore?", choices: ["Da cinque anni", "Da due anni", "Da un mese"], answer: 0 },
          { prompt: "T2: Da quanto tempo lavora B come infermiera?", choices: ["Da sei anni", "Da due anni", "Da un anno"], answer: 0 },
          { prompt: "T2: In quanti ospedali ha lavorato?", choices: ["In due", "In tre", "In uno"], answer: 0 },
          { prompt: "T2: Perche vuole lavorare li?", choices: ["Vuole nuove sfide", "Vuole piu soldi", "Vuole meno ore"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "it15l-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: le professioni",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "il lavoro / l'impiegato", translation: "el trabajo / el empleado" },
        { term: "l'insegnante / il cuoco", translation: "el profesor / el cocinero" },
        { term: "l'infermiere", translation: "el enfermero" },
        { term: "l'ufficio / lo stipendio", translation: "la oficina / el salario" },
        { term: "lavoro qui da...", translation: "trabajo aqui desde hace..." },
        { term: "il colloquio", translation: "la entrevista" },
        { term: "l'esperienza", translation: "la experiencia" },
        { term: "assumere", translation: "contratar" },
      ],
      activities: [
        {
          id: "it15l-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "il lavoro", right: "el trabajo" },
            { left: "l'impiegato", right: "el empleado" },
            { left: "l'insegnante", right: "el profesor" },
            { left: "il cuoco", right: "el cocinero" },
          ] },
        },
        {
          id: "it15l-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "l'infermiere", right: "el enfermero" },
            { left: "l'ufficio", right: "la oficina" },
            { left: "lo stipendio", right: "el salario" },
            { left: "il colloquio", right: "la entrevista" },
          ] },
        },
        {
          id: "it15l-vocab-a3", type: "cloze",
          prompt: "Completa: 'Lavoro qui ___ tre anni.' (desde hace)",
          payload: { answer: "da" },
          explain: "'da' + periodo = desde hace.",
        },
        {
          id: "it15l-vocab-a4", type: "cloze",
          prompt: "Completa: 'Ho fatto ___ per il lavoro.' (postularse)",
          payload: { answer: "domanda" },
          explain: "'fare domanda' = postularse.",
        },
        {
          id: "it15l-vocab-a5", type: "cloze",
          prompt: "Completa: 'Domani ho un ___ di lavoro.' (entrevista)",
          payload: { answer: "colloquio" },
          explain: "'il colloquio' = la entrevista.",
        },
        {
          id: "it15l-vocab-a6", type: "multiple_choice",
          prompt: "Cosa significa 'da quanto tempo'?",
          payload: { choices: ["a que hora", "desde hace cuanto tiempo", "cuanto cuesta"], answer: 1 },
          explain: "'da quanto tempo' = desde hace cuanto tiempo.",
        },
        {
          id: "it15l-vocab-a7", type: "multiple_choice",
          prompt: "Come dici 'tengo experiencia'?",
          payload: { choices: ["Ho esperienza.", "Sono esperienza.", "Faccio esperienza."], answer: 0 },
          explain: "'avere esperienza' = tener experiencia.",
        },
        {
          id: "it15l-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["tre", "Lavoro", "anni", "qui", "da"], answer: ["Lavoro", "qui", "da", "tre", "anni"] },
          explain: "'Lavoro qui da tre anni'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "it15l-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: 'da' + presente",
      intro: "Competencia de GRAMATICA. Aprende a decir desde cuando haces algo (presente, no pasado).",
      grammar: {
        title: "'Da' + presente (duracion que continua)",
        chart: {
          title: "DA + PRESENTE",
          maps: "presente + DA + periodo",
          groups: [
            {
              label: "ESTRUTTURA", color: "rose",
              forms: [
                { form: "LAVORO + DA + TRE ANNI", subjects: "trabajo desde hace 3 anos" },
                { form: "VIVO + DA + 2010", subjects: "vivo desde 2010" },
              ],
            },
            {
              label: "DOMANDA", color: "green",
              forms: [
                { form: "DA QUANTO TEMPO + presente...?", subjects: "desde hace cuanto tiempo...?" },
              ],
            },
          ],
        },
        form: "[presente] + DA + [periodo/fecha] (NO pasado)",
        desc: "Cuando algo empezo en el pasado pero SIGUE pasando ahora, el italiano usa el PRESENTE + 'da' + el periodo de tiempo. Es un error muy comun del hispanohablante usar el pasado aqui (ho lavorato da tre anni); en italiano debe ir en PRESENTE: 'lavoro da tre anni'.",
        rule: "Formula: [presente] + DA + [periodo/fecha]. 'Lavoro qui da tre anni' (trabajo aqui desde hace tres anos, y sigo trabajando). 'Abito a Roma dal 2015' (vivo en Roma desde 2015). Pregunta: 'Da quanto tempo + presente + ...?' (Da quanto tempo lavori qui?).",
        examples: ["Lavoro qui da tre anni.", "Studio italiano da sei mesi.", "Vivo a Roma dal 2015.", "Da quanto tempo conosci Marco?"],
        explain: { tr: ["Trabajo aqui desde hace tres anos.", "Estudio italiano desde hace seis meses.", "Vivo en Roma desde 2015.", "Desde hace cuanto tiempo conoces a Marco?"] },
        mistakes: [
          { wrong: "Ho lavorato qui da tre anni.", right: "Lavoro qui da tre anni." },
          { wrong: "Lavoro qui per tre anni.", right: "Lavoro qui da tre anni." },
          { wrong: "Da quanto tempo hai lavorato qui?", right: "Da quanto tempo lavori qui?" },
        ],
      },
      activities: [
        {
          id: "it15l-gram-a1", type: "cloze",
          prompt: "Completa (io, presente): '___ italiano da sei mesi.' (studiare)",
          payload: { answer: "Studio" },
          explain: "Presente, no pasado: 'studio'.",
        },
        {
          id: "it15l-gram-a2", type: "cloze",
          prompt: "Completa: 'Vivo a Roma ___ 2015.' (dal)",
          payload: { answer: "dal" },
          explain: "'dal' (da + il) + ano.",
        },
        {
          id: "it15l-gram-a3", type: "cloze",
          prompt: "Completa: 'Da quanto tempo ___ Marco?' (conoscere, tu)",
          payload: { answer: "conosci" },
          explain: "Presente: 'conosci'.",
        },
        {
          id: "it15l-gram-a4", type: "multiple_choice",
          prompt: "Qual e corretto per 'trabajo aqui desde hace 3 anos'?",
          payload: { choices: ["Ho lavorato qui da tre anni.", "Lavoro qui da tre anni.", "Lavoravo qui da tre anni."], answer: 1 },
          explain: "Accion que continua -> presente.",
        },
        {
          id: "it15l-gram-a5", type: "multiple_choice",
          prompt: "Che tempo verbale si usa con 'da + periodo' se l'azione continua?",
          payload: { choices: ["passato", "presente", "futuro"], answer: 1 },
          explain: "Siempre presente si la accion continua.",
        },
        {
          id: "it15l-gram-a6", type: "multiple_choice",
          prompt: "Scegli la frase corretta:",
          payload: { choices: ["Studio qui per tre anni.", "Studio qui da tre anni.", "Ho studiato qui da tre anni."], answer: 1 },
          explain: "'da', no 'per', con presente.",
        },
        {
          id: "it15l-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["sei", "Studio", "mesi", "da", "italiano"], answer: ["Studio", "italiano", "da", "sei", "mesi"] },
          explain: "'Studio italiano da sei mesi'.",
        },
        {
          id: "it15l-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["tempo", "Da", "qui", "lavori", "quanto"], answer: ["Da", "quanto", "tempo", "lavori", "qui"] },
          explain: "'Da quanto tempo lavori qui?'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "it15l-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: il colloquio",
      intro: "Competencia de ESCRITURA. Responde en una entrevista de trabajo, frase por frase.",
      activities: [
        {
          id: "it15l-write-a1", type: "word_bank",
          prompt: "1. Di que trabajas aqui desde hace 2 anos:",
          payload: { words: ["due", "Lavoro", "anni", "qui", "da"], answer: ["Lavoro", "qui", "da", "due", "anni"] },
        },
        {
          id: "it15l-write-a2", type: "word_bank",
          prompt: "2. Di que tienes experiencia:",
          payload: { words: ["esperienza", "Ho"], answer: ["Ho", "esperienza"] },
        },
        {
          id: "it15l-write-a3", type: "word_bank",
          prompt: "3. Di que manana tienes una entrevista:",
          payload: { words: ["un", "Domani", "colloquio", "ho"], answer: ["Domani", "ho", "un", "colloquio"] },
        },
        {
          id: "it15l-write-a4", type: "word_bank",
          prompt: "4. Pregunta desde hace cuanto tiempo trabaja (lei, formal):",
          payload: { words: ["tempo", "Da", "lavora", "quanto"], answer: ["Da", "quanto", "tempo", "lavora"] },
        },
        {
          id: "it15l-write-a5", type: "word_bank",
          prompt: "5. Di que vives en Roma desde 2015:",
          payload: { words: ["dal", "Abito", "2015", "a", "Roma"], answer: ["Abito", "a", "Roma", "dal", "2015"] },
        },
        {
          id: "it15l-write-a6", type: "multiple_choice",
          prompt: "6. 'Da due anni' significa:",
          payload: { choices: ["hace dos anos (ya termino)", "desde hace dos anos (continua)", "en dos anos"], answer: 1 },
        },
        {
          id: "it15l-write-a7", type: "multiple_choice",
          prompt: "7. Cual es correcto?",
          payload: { choices: ["Ho lavorato qui da due anni.", "Lavoro qui da due anni.", "Lavoravo qui da due anni."], answer: 1 },
        },
        {
          id: "it15l-write-a8", type: "multiple_choice",
          prompt: "8. 'Il colloquio' significa:",
          payload: { choices: ["el salario", "la entrevista", "la oficina"], answer: 1 },
        },
      ],
    },
  ],
};
