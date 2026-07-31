/**
 * data/units/it8-ieri.js — Unita A1 italiano "Ieri" (passato prossimo con avere, -are).
 *
 * Dati PURI. term = italiano (meta), translation = spagnolo (L1 dello studente).
 */

export const IT8_IERI = {
  id: "it8-ieri",
  language: "it",
  level: "A1",
  title: "Ieri",
  subtitle: "Hablar del pasado con el 'passato prossimo' (avere + participio -ato)",

  cando: [
    "Puedo hablar de lo que hice ayer.",
    "Puedo formar el passato prossimo con 'avere' + participio.",
    "Puedo usar el participio de verbos en -are (-ato).",
    "Puedo usar marcadores de tiempo (ieri, la settimana scorsa).",
  ],

  vocab: [
    { id: "it8i-1", term: "ieri", translation: "ayer", example: "Ieri ho lavorato." },
    { id: "it8i-2", term: "ieri sera", translation: "anoche", example: "Ieri sera ho guardato un film." },
    { id: "it8i-3", term: "la settimana scorsa", translation: "la semana pasada", example: "La settimana scorsa ho viaggiato." },
    { id: "it8i-4", term: "ho mangiato", translation: "he comido/comi", example: "Ho mangiato la pizza." },
    { id: "it8i-5", term: "ho comprato", translation: "he comprado/compre", example: "Ho comprato il pane." },
    { id: "it8i-6", term: "ho guardato", translation: "he visto/vi", example: "Ho guardato la TV." },
    { id: "it8i-7", term: "ho parlato", translation: "he hablado/hable", example: "Ho parlato con Anna." },
    { id: "it8i-8", term: "ho giocato", translation: "he jugado/jugue", example: "Ho giocato a calcio." },
    { id: "it8i-9", term: "ho lavorato", translation: "he trabajado/trabaje", example: "Ieri ho lavorato molto." },
    { id: "it8i-10", term: "ho ascoltato", translation: "he escuchado/escuche", example: "Ho ascoltato musica." },
    { id: "it8i-11", term: "ho cucinato", translation: "he cocinado/cocine", example: "Ho cucinato la pasta." },
    { id: "it8i-12", term: "che bello!", translation: "que bien/bonito!", example: "Che bello, un weekend cosi!" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "it8i-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: che hai fatto ieri?",
      intro: "Competencia de LECTURA. Lee DOS textos en italiano y responde las preguntas.",
      content: {
        reading:
          "TESTO 1 - Il weekend di Paolo\n" +
          "Sabato Paolo ha lavorato la mattina. Il pomeriggio ha giocato a calcio con gli amici. " +
          "La sera ha cucinato la pasta e ha guardato un film. Domenica ha ascoltato musica e ha parlato con la famiglia. " +
          "Ha comprato anche un regalo per la sorella. Che bel fine settimana!\n\n" +
          "TESTO 2 - Due amiche\n" +
          "A: Ciao! Cosa hai fatto ieri? B: Ieri ho studiato tutto il giorno. E tu? A: Io ho mangiato al ristorante e ho comprato dei vestiti. " +
          "B: Che bello! A: Si, ma ho speso troppo! B: Ah ah! La settimana scorsa anch'io ho comprato molto.",
        glossary: [
          { term: "passato prossimo", translation: "pasado (he hecho / hice)" },
          { term: "ho + participio", translation: "auxiliar 'avere' + participio" },
          { term: "ieri / ieri sera", translation: "ayer / anoche" },
          { term: "la settimana scorsa", translation: "la semana pasada" },
          { term: "cosa hai fatto?", translation: "que hiciste?" },
          { term: "ho studiato / ho speso", translation: "estudie / gaste" },
          { term: "dei vestiti", translation: "unos vestidos/ropa" },
          { term: "che bello!", translation: "que bien!" },
        ],
        keyPhrases: [
          "Ojo: passato prossimo = 'ho' (avere) + participio en -ATO (verbos -are).",
          "'Ieri ho mangiato' = ayer comi (accion terminada).",
        ],
        check: [
          { prompt: "T1: Cosa ha fatto Paolo sabato mattina?", choices: ["Ha giocato", "Ha lavorato", "Ha cucinato"], answer: 1 },
          { prompt: "T1: Cosa ha cucinato la sera?", choices: ["La pizza", "La pasta", "Il pesce"], answer: 1 },
          { prompt: "T1: Per chi ha comprato un regalo?", choices: ["Per la mamma", "Per la sorella", "Per un amico"], answer: 1 },
          { prompt: "T2: Cosa ha fatto B ieri?", choices: ["Ha studiato", "Ha mangiato fuori", "Ha comprato vestiti"], answer: 0 },
          { prompt: "T2: Cosa ha comprato A?", choices: ["Un regalo", "Dei vestiti", "Del cibo"], answer: 1 },
          { prompt: "T2: Cosa dice A dei soldi?", choices: ["Ha risparmiato", "Ha speso troppo", "Non ha speso"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "it8i-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: il passato",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "ieri / ieri sera", translation: "ayer / anoche" },
        { term: "la settimana scorsa", translation: "la semana pasada" },
        { term: "ho mangiato / ho cucinato", translation: "comi / cocine" },
        { term: "ho comprato / ho speso", translation: "compre / gaste" },
        { term: "ho guardato / ho ascoltato", translation: "vi / escuche" },
        { term: "ho parlato / ho studiato", translation: "hable / estudie" },
        { term: "ho giocato / ho lavorato", translation: "jugue / trabaje" },
        { term: "cosa hai fatto?", translation: "que hiciste?" },
      ],
      activities: [
        {
          id: "it8i-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "ieri", right: "ayer" },
            { left: "ho mangiato", right: "comi" },
            { left: "ho comprato", right: "compre" },
            { left: "ho lavorato", right: "trabaje" },
          ] },
        },
        {
          id: "it8i-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "ho guardato", right: "vi" },
            { left: "ho parlato", right: "hable" },
            { left: "ho giocato", right: "jugue" },
            { left: "ho cucinato", right: "cocine" },
          ] },
        },
        {
          id: "it8i-vocab-a3", type: "cloze",
          prompt: "Completa: 'Ieri ___ mangiato la pizza.' (auxiliar io)",
          payload: { answer: "ho" },
          explain: "io -> 'ho' (avere).",
        },
        {
          id: "it8i-vocab-a4", type: "cloze",
          prompt: "Completa: 'Ho ___ il pane.' (comprar, participio)",
          payload: { answer: "comprato" },
          explain: "comprare -> 'comprato'.",
        },
        {
          id: "it8i-vocab-a5", type: "cloze",
          prompt: "Completa: 'Ho ___ la TV.' (mirar, participio)",
          payload: { answer: "guardato" },
          explain: "guardare -> 'guardato'.",
        },
        {
          id: "it8i-vocab-a6", type: "multiple_choice",
          prompt: "Cual significa 'la semana pasada'?",
          payload: { choices: ["ieri sera", "la settimana scorsa", "domani"], answer: 1 },
          explain: "'La settimana scorsa' = la semana pasada.",
        },
        {
          id: "it8i-vocab-a7", type: "multiple_choice",
          prompt: "Como preguntas 'que hiciste?'",
          payload: { choices: ["Cosa fai?", "Cosa hai fatto?", "Cosa farai?"], answer: 1 },
          explain: "'Cosa hai fatto?' = que hiciste?",
        },
        {
          id: "it8i-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["mangiato", "Ieri", "ho", "la", "pizza"], answer: ["Ieri", "ho", "mangiato", "la", "pizza"] },
          explain: "'Ieri ho mangiato la pizza'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "it8i-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: passato prossimo (-are)",
      intro: "Competencia de GRAMATICA. Aprende el passato prossimo: 'avere' + participio -ato.",
      grammar: {
        title: "Il passato prossimo (verbi in -are)",
        chart: {
          title: "AVERE",
          maps: "+ participio (-ato)",
          groups: [
            {
              label: "AVERE (aux.)", color: "rose",
              forms: [
                { form: "HO / HAI", subjects: "io / tu" },
                { form: "HA", subjects: "lui / lei" },
                { form: "ABBIAMO", subjects: "noi" },
                { form: "AVETE / HANNO", subjects: "voi / loro" },
              ],
            },
            {
              label: "PARTICIPIO -ARE", color: "green",
              forms: [
                { form: "-ARE -> -ATO", subjects: "mangiare -> mangiato" },
                { form: "COMPRATO / PARLATO", subjects: "comprado / hablado" },
                { form: "GUARDATO / GIOCATO", subjects: "visto / jugado" },
              ],
            },
          ],
        },
        form: "*avere* (ho, hai, ha...) + *participio* (-ato)",
        desc: "El passato prossimo cuenta lo que YA paso (ayer, la semana pasada). Se forma con el presente de 'avere' + el participio pasado. Los verbos en -are hacen el participio en -ATO.",
        rule: "Avere: io ho, tu hai, lui/lei ha, noi abbiamo, voi avete, loro hanno. Participio de -are: quita -are y pon -ATO (mangiare->mangiato, comprare->comprato, parlare->parlato, giocare->giocato, guardare->guardato, lavorare->lavorato). Ejemplo: 'Ieri HO MANGIATO'. El participio con 'avere' NO cambia por genero: 'Maria ha mangiato'.",
        examples: ["Ieri ho mangiato la pizza.", "Hai comprato il pane?", "Lei ha parlato con Anna.", "Abbiamo giocato a calcio."],
        explain: { tr: ["Ayer comi la pizza.", "Compraste el pan?", "Ella hablo con Anna.", "Jugamos al futbol."] },
        mistakes: [
          { wrong: "Ieri io mangiato la pizza.", right: "Ieri ho mangiato la pizza." },
          { wrong: "Ho mangiare la pizza.", right: "Ho mangiato la pizza." },
          { wrong: "Noi ho giocato.", right: "Noi abbiamo giocato." },
        ],
      },
      activities: [
        {
          id: "it8i-gram-a1", type: "cloze",
          prompt: "Completa: 'Io ___ parlato.' (auxiliar)",
          payload: { answer: "ho" },
          explain: "io -> 'ho'.",
        },
        {
          id: "it8i-gram-a2", type: "cloze",
          prompt: "Completa: 'Noi ___ giocato.' (auxiliar)",
          payload: { answer: "abbiamo" },
          explain: "noi -> 'abbiamo'.",
        },
        {
          id: "it8i-gram-a3", type: "cloze",
          prompt: "Participio de 'mangiare':",
          payload: { answer: "mangiato" },
          explain: "-are -> -ato: 'mangiato'.",
        },
        {
          id: "it8i-gram-a4", type: "cloze",
          prompt: "Participio de 'parlare':",
          payload: { answer: "parlato" },
          explain: "-are -> -ato: 'parlato'.",
        },
        {
          id: "it8i-gram-a5", type: "multiple_choice",
          prompt: "Scegli la frase corretta:",
          payload: { choices: ["Ieri io mangiato.", "Ieri ho mangiato.", "Ieri ho mangiare."], answer: 1 },
          explain: "Falta el auxiliar + participio: 'ho mangiato'.",
        },
        {
          id: "it8i-gram-a6", type: "multiple_choice",
          prompt: "Como dices 'ellos jugaron'?",
          payload: { choices: ["Loro hanno giocato.", "Loro ha giocato.", "Loro abbiamo giocato."], answer: 0 },
          explain: "loro -> 'hanno giocato'.",
        },
        {
          id: "it8i-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["comprato", "Hai", "pane", "il"], answer: ["Hai", "comprato", "il", "pane"] },
          explain: "'Hai comprato il pane?'.",
        },
        {
          id: "it8i-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["giocato", "Abbiamo", "calcio", "a"], answer: ["Abbiamo", "giocato", "a", "calcio"] },
          explain: "'Abbiamo giocato a calcio'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "it8i-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: il tuo ieri",
      intro: "Competencia de ESCRITURA. Cuenta que hiciste ayer, frase por frase.",
      activities: [
        {
          id: "it8i-write-a1", type: "word_bank",
          prompt: "1. Di que ayer comiste pizza:",
          payload: { words: ["mangiato", "Ieri", "ho", "la", "pizza"], answer: ["Ieri", "ho", "mangiato", "la", "pizza"] },
        },
        {
          id: "it8i-write-a2", type: "word_bank",
          prompt: "2. Di que compraste el pan:",
          payload: { words: ["comprato", "Ho", "pane", "il"], answer: ["Ho", "comprato", "il", "pane"] },
        },
        {
          id: "it8i-write-a3", type: "word_bank",
          prompt: "3. Di que jugaste al futbol:",
          payload: { words: ["giocato", "Ho", "calcio", "a"], answer: ["Ho", "giocato", "a", "calcio"] },
        },
        {
          id: "it8i-write-a4", type: "word_bank",
          prompt: "4. Di que hablaste con Anna:",
          payload: { words: ["parlato", "Ho", "Anna", "con"], answer: ["Ho", "parlato", "con", "Anna"] },
        },
        {
          id: "it8i-write-a5", type: "word_bank",
          prompt: "5. Pregunta que hizo tu amigo:",
          payload: { words: ["hai", "Cosa", "fatto"], answer: ["Cosa", "hai", "fatto"] },
        },
        {
          id: "it8i-write-a6", type: "multiple_choice",
          prompt: "6. Cual frase es correcta?",
          payload: { choices: ["Ieri ho lavorato.", "Ieri io lavorato.", "Ieri ho lavorare."], answer: 0 },
        },
        {
          id: "it8i-write-a7", type: "multiple_choice",
          prompt: "7. 'nosotros cocinamos (ayer)' se dice...",
          payload: { choices: ["Noi ho cucinato.", "Noi abbiamo cucinato.", "Noi abbiamo cucinare."], answer: 1 },
        },
        {
          id: "it8i-write-a8", type: "multiple_choice",
          prompt: "8. El participio de 'guardare' es...",
          payload: { choices: ["guardare", "guardato", "guardando"], answer: 1 },
        },
      ],
    },
  ],
};
