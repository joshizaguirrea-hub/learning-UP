/**
 * data/units/it9-weekend.js — Unita A2 italiano "Il weekend scorso" (passato
 * prossimo con ESSERE + concordanza del participio).
 *
 * Dati PURI. term = italiano (meta), translation = spagnolo (L1 dello studente).
 *
 * POR QUE este tema primero en A2: en A1 (it8-ieri) el alumno solo vio el
 * passato prossimo con AVERE (-are). El salto estructural mas importante de
 * A2 es que ALGUNOS verbos (sobre todo de movimiento) usan ESSERE, y ahi el
 * participio CONCUERDA en genero/numero como un adjetivo -- la trampa clasica
 * de todo hispanohablante que aprende italiano.
 */

export const IT9_WEEKEND = {
  id: "it9-weekend",
  language: "it",
  level: "A2",
  title: "Il weekend scorso",
  subtitle: "Passato prossimo con 'essere' (verbos de movimiento) y concordancia del participio",

  cando: [
    "Puedo contar que hice el fin de semana usando 'essere' o 'avere' segun el verbo.",
    "Puedo formar el passato prossimo con 'essere' + participio que concuerda en genero y numero.",
    "Puedo reconocer los verbos de movimiento que usan 'essere' (andare, uscire, tornare, arrivare, partire, rimanere).",
    "Puedo contrastar 'sono andato/a' (essere) con 'ho mangiato' (avere) segun el verbo.",
  ],

  vocab: [
    { id: "it9w-1", term: "andare (sono andato/a)", translation: "ir (fui)", example: "Sono andato al mare." },
    { id: "it9w-2", term: "uscire (sono uscito/a)", translation: "salir (sali)", example: "Sono uscita con le amiche." },
    { id: "it9w-3", term: "tornare (sono tornato/a)", translation: "volver (volvi)", example: "Sono tornato tardi." },
    { id: "it9w-4", term: "arrivare (sono arrivato/a)", translation: "llegar (llegue)", example: "Sono arrivato alle otto." },
    { id: "it9w-5", term: "partire (sono partito/a)", translation: "partir/irse (parti)", example: "Sono partita la mattina." },
    { id: "it9w-6", term: "rimanere (sono rimasto/a)", translation: "quedarse (me quede)", example: "Sono rimasto a casa." },
    { id: "it9w-7", term: "il mare", translation: "el mar", example: "Il mare era bellissimo." },
    { id: "it9w-8", term: "la montagna", translation: "la montana", example: "Siamo andati in montagna." },
    { id: "it9w-9", term: "il weekend scorso", translation: "el fin de semana pasado", example: "Il weekend scorso sono andato al mare." },
    { id: "it9w-10", term: "da solo/a", translation: "solo/a", example: "Sono partito da solo." },
    { id: "it9w-11", term: "con gli amici", translation: "con los amigos", example: "Sono uscita con gli amici." },
    { id: "it9w-12", term: "che giornata!", translation: "que dia!", example: "Che giornata stancante!" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "it9w-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: dove sei stato questo weekend?",
      intro: "Competencia de LECTURA. Lee DOS textos en italiano y responde las preguntas.",
      content: {
        reading:
          "TESTO 1 - Il weekend di Giulia\n" +
          "Il weekend scorso sono andata al mare con la mia famiglia. Siamo partiti sabato mattina presto " +
          "e siamo arrivati alle undici. Il pomeriggio sono uscita con mia sorella e abbiamo fatto una " +
          "passeggiata. La sera siamo tornati all'albergo e abbiamo cenato insieme. Domenica siamo rimasti " +
          "sulla spiaggia tutto il giorno. Che weekend rilassante!\n\n" +
          "TESTO 2 - Due amici al telefono\n" +
          "A: Pronto! Dove sei stato questo weekend? B: Sono andato in montagna con un amico. Siamo arrivati " +
          "venerdi sera e siamo rimasti fino a domenica. A: Che bello! Siete tornati stanchi? B: Si, un po', " +
          "ma e stato fantastico. E tu, cosa hai fatto? A: Io sono rimasta a casa, ho studiato e ho guardato un film.",
        glossary: [
          { term: "sono andato/a", translation: "fui" },
          { term: "siamo partiti", translation: "partimos" },
          { term: "sono arrivato/a", translation: "llegue" },
          { term: "siamo rimasti", translation: "nos quedamos" },
          { term: "sono tornato/a", translation: "volvi" },
          { term: "dove sei stato?", translation: "donde estuviste?" },
          { term: "che bello!", translation: "que bien!" },
          { term: "ho studiato", translation: "estudie (avere, no es movimiento)" },
        ],
        keyPhrases: [
          "Ojo: con ESSERE el participio CONCUERDA -> andato/andata/andati/andate.",
          "Verbos de movimiento (andare, uscire, tornare, arrivare, partire, rimanere, stare) usan ESSERE, no AVERE.",
        ],
        check: [
          { prompt: "T1: Dove sono andati Giulia e la famiglia?", choices: ["Al mare", "In montagna", "In citta"], answer: 0 },
          { prompt: "T1: Quando sono partiti?", choices: ["Sabato mattina", "Domenica", "Venerdi sera"], answer: 0 },
          { prompt: "T1: Cosa hanno fatto domenica?", choices: ["Sono rimasti sulla spiaggia", "Sono tornati a casa", "Hanno fatto una passeggiata"], answer: 0 },
          { prompt: "T2: Dove e andato B?", choices: ["In montagna", "Al mare", "In citta"], answer: 0 },
          { prompt: "T2: Con chi e andato B?", choices: ["Con un amico", "Da solo", "Con la famiglia"], answer: 0 },
          { prompt: "T2: Cosa ha fatto A questo weekend?", choices: ["E rimasta a casa", "E andata al mare", "E uscita con amici"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "it9w-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: i verbi di movimento",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "andare / sono andato", translation: "ir / fui" },
        { term: "uscire / sono uscito", translation: "salir / sali" },
        { term: "tornare / sono tornato", translation: "volver / volvi" },
        { term: "arrivare / sono arrivato", translation: "llegar / llegue" },
        { term: "partire / sono partito", translation: "partir / parti" },
        { term: "rimanere / sono rimasto", translation: "quedarse / me quede" },
        { term: "il weekend scorso", translation: "el fin de semana pasado" },
        { term: "con gli amici / da solo", translation: "con los amigos / solo" },
      ],
      activities: [
        {
          id: "it9w-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "andare", right: "ir" },
            { left: "uscire", right: "salir" },
            { left: "tornare", right: "volver" },
            { left: "arrivare", right: "llegar" },
          ] },
        },
        {
          id: "it9w-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "partire", right: "partir" },
            { left: "rimanere", right: "quedarse" },
            { left: "il mare", right: "el mar" },
            { left: "la montagna", right: "la montana" },
          ] },
        },
        {
          id: "it9w-vocab-a3", type: "cloze",
          prompt: "Completa (io, maschile): 'Ieri sono ___ al mare.' (andare)",
          payload: { answer: "andato" },
          explain: "andare -> 'andato' (maschile singolare, con essere).",
        },
        {
          id: "it9w-vocab-a4", type: "cloze",
          prompt: "Completa (lei): 'E ___ a casa tardi.' (tornare)",
          payload: { answer: "tornata" },
          explain: "Con essere, femminile singolare -> 'tornata'.",
        },
        {
          id: "it9w-vocab-a5", type: "cloze",
          prompt: "Completa (noi, maschile): 'Siamo ___ presto.' (partire)",
          payload: { answer: "partiti" },
          explain: "Plurale maschile -> 'partiti'.",
        },
        {
          id: "it9w-vocab-a6", type: "multiple_choice",
          prompt: "Quale verbo usa 'essere' nel passato?",
          payload: { choices: ["mangiare", "andare", "parlare"], answer: 1 },
          explain: "'Andare' es verbo de movimiento -> essere.",
        },
        {
          id: "it9w-vocab-a7", type: "multiple_choice",
          prompt: "Come si dice 'ella salio'?",
          payload: { choices: ["Lei e uscita", "Lei ha uscito", "Lei e uscito"], answer: 0 },
          explain: "Femminile -> 'uscita' (concordanza con essere).",
        },
        {
          id: "it9w-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["alle", "Siamo", "arrivati", "otto"], answer: ["Siamo", "arrivati", "alle", "otto"] },
          explain: "'Siamo arrivati alle otto'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "it9w-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: passato prossimo con essere",
      intro: "Competencia de GRAMATICA. Aprende cuando usar 'essere' y como concuerda el participio.",
      grammar: {
        title: "Il passato prossimo con ESSERE",
        chart: {
          title: "ESSERE",
          maps: "+ participio (concorda genere/numero)",
          groups: [
            {
              label: "ESSERE (aux.)", color: "rose",
              forms: [
                { form: "SONO / SEI", subjects: "io / tu" },
                { form: "E'", subjects: "lui / lei" },
                { form: "SIAMO", subjects: "noi" },
                { form: "SIETE / SONO", subjects: "voi / loro" },
              ],
            },
            {
              label: "VERBI DI MOVIMENTO", color: "green",
              forms: [
                { form: "ANDARE -> ANDATO", subjects: "ir -> fue" },
                { form: "USCIRE -> USCITO", subjects: "salir -> salio" },
                { form: "TORNARE -> TORNATO", subjects: "volver -> volvio" },
                { form: "ARRIVARE / PARTIRE / RIMANERE", subjects: "llegar / partir / quedarse" },
              ],
            },
          ],
        },
        form: "*essere* (sono, sei, e...) + *participio* (concuerda: -o/-a/-i/-e)",
        desc: "Algunos verbos (sobre todo de movimiento: andare, uscire, tornare, arrivare, partire, rimanere, stare, essere) forman el passato prossimo con ESSERE en vez de AVERE. La gran diferencia: el participio CONCUERDA en genero y numero con el sujeto, igual que un adjetivo.",
        rule: "Essere: io sono, tu sei, lui/lei e, noi siamo, voi siete, loro sono. El participio cambia segun el sujeto: masculino singular -O (andato), femenino singular -A (andata), masculino plural -I (andati), femenino plural -E (andate). Ejemplo: 'Maria e andata' pero 'Marco e andato', 'Loro sono andati/andate'.",
        examples: ["Sono andato al mare. (io, masc.)", "Sono andata al mare. (io, fem.)", "Siamo tornati tardi. (noi, misto)", "Le ragazze sono arrivate presto. (loro, fem.)"],
        explain: { tr: ["Fui al mar.", "Fui al mar. (fem.)", "Volvimos tarde.", "Las chicas llegaron temprano."] },
        mistakes: [
          { wrong: "Ho andato al mare.", right: "Sono andato al mare." },
          { wrong: "Lei e andato a casa.", right: "Lei e andata a casa." },
          { wrong: "Siamo andato al cinema.", right: "Siamo andati al cinema." },
        ],
      },
      activities: [
        {
          id: "it9w-gram-a1", type: "cloze",
          prompt: "Completa (io, maschile): 'Sono ___ al cinema.' (andare)",
          payload: { answer: "andato" },
          explain: "Maschile singolare -> 'andato'.",
        },
        {
          id: "it9w-gram-a2", type: "cloze",
          prompt: "Completa (lei): 'E ___ a casa.' (tornare)",
          payload: { answer: "tornata" },
          explain: "Femminile singolare -> 'tornata'.",
        },
        {
          id: "it9w-gram-a3", type: "cloze",
          prompt: "Completa (noi, femminile): 'Siamo ___ tardi.' (arrivare)",
          payload: { answer: "arrivate" },
          explain: "Plurale femminile -> 'arrivate'.",
        },
        {
          id: "it9w-gram-a4", type: "multiple_choice",
          prompt: "Quale ausiliare usa 'uscire'?",
          payload: { choices: ["avere", "essere", "fare"], answer: 1 },
          explain: "'Uscire' es verbo de movimiento -> essere.",
        },
        {
          id: "it9w-gram-a5", type: "multiple_choice",
          prompt: "Scegli la frase corretta per 'Maria':",
          payload: { choices: ["Maria ha andato al mare.", "Maria e andato al mare.", "Maria e andata al mare."], answer: 2 },
          explain: "Essere + concordanza femminile: 'e andata'.",
        },
        {
          id: "it9w-gram-a6", type: "multiple_choice",
          prompt: "Scegli la frase corretta per 'noi' (gruppo misto):",
          payload: { choices: ["Siamo andati in montagna.", "Abbiamo andato in montagna.", "Siamo andato in montagna."], answer: 0 },
          explain: "Grupo mixto -> masculino plural: 'andati'.",
        },
        {
          id: "it9w-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["ieri", "Sono", "sera", "arrivata"], answer: ["Sono", "arrivata", "ieri", "sera"] },
          explain: "'Sono arrivata ieri sera'.",
        },
        {
          id: "it9w-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["a", "Siamo", "casa", "rimasti"], answer: ["Siamo", "rimasti", "a", "casa"] },
          explain: "'Siamo rimasti a casa'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "it9w-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: il tuo weekend",
      intro: "Competencia de ESCRITURA. Cuenta tu fin de semana, frase por frase.",
      activities: [
        {
          id: "it9w-write-a1", type: "word_bank",
          prompt: "1. Di que fuiste al mar (tu, masculino):",
          payload: { words: ["al", "Sono", "mare", "andato"], answer: ["Sono", "andato", "al", "mare"] },
        },
        {
          id: "it9w-write-a2", type: "word_bank",
          prompt: "2. Di que ella llego tarde:",
          payload: { words: ["tardi", "E", "arrivata"], answer: ["E", "arrivata", "tardi"] },
        },
        {
          id: "it9w-write-a3", type: "word_bank",
          prompt: "3. Di que ustedes (femenino) se quedaron en casa:",
          payload: { words: ["a", "Siete", "casa", "rimaste"], answer: ["Siete", "rimaste", "a", "casa"] },
        },
        {
          id: "it9w-write-a4", type: "word_bank",
          prompt: "4. Di que salimos con los amigos:",
          payload: { words: ["con", "Siamo", "amici", "usciti", "gli"], answer: ["Siamo", "usciti", "con", "gli", "amici"] },
        },
        {
          id: "it9w-write-a5", type: "word_bank",
          prompt: "5. Pregunta donde estuvo (tu, informal):",
          payload: { words: ["stato", "Dove", "sei"], answer: ["Dove", "sei", "stato"] },
        },
        {
          id: "it9w-write-a6", type: "multiple_choice",
          prompt: "6. El participio de 'partire' para 'lei' es:",
          payload: { choices: ["partito", "partita", "partiti"], answer: 1 },
        },
        {
          id: "it9w-write-a7", type: "multiple_choice",
          prompt: "7. Cual es correcto?",
          payload: { choices: ["Ho tornato tardi.", "Sono tornato tardi.", "Sono tornare tardi."], answer: 1 },
        },
        {
          id: "it9w-write-a8", type: "multiple_choice",
          prompt: "8. 'Siamo andati' significa:",
          payload: { choices: ["Fuimos (nosotros)", "Fui (yo)", "Fueron (ellos)"], answer: 0 },
        },
      ],
    },
  ],
};
