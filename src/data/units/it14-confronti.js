/**
 * data/units/it14-confronti.js — Unita A2 italiano "Paragoni" (comparativo e
 * superlativo).
 *
 * Dati PURI. term = italiano (meta), translation = spagnolo (L1 dello studente).
 */

export const IT14_CONFRONTI = {
  id: "it14-confronti",
  language: "it",
  level: "A2",
  title: "Paragoni",
  subtitle: "Comparativo (più...di, meno...di, come) y superlativo (il/la più...)",

  cando: [
    "Puedo comparar dos cosas o personas con 'più...di' y 'meno...di'.",
    "Puedo usar 'come' o 'tanto...quanto' para decir que algo es igual.",
    "Puedo usar el superlativo relativo (il più... / la più...).",
    "Puedo expresar mi opinion comparando opciones (secondo me).",
  ],

  vocab: [
    { id: "it14c-1", term: "più... di", translation: "mas... que", example: "Roma e più grande di Firenze." },
    { id: "it14c-2", term: "meno... di", translation: "menos... que", example: "Il treno e meno caro dell'aereo." },
    { id: "it14c-3", term: "come", translation: "como", example: "Lei e alta come sua sorella." },
    { id: "it14c-4", term: "tanto quanto", translation: "tanto como", example: "Studio tanto quanto te." },
    { id: "it14c-5", term: "il migliore", translation: "el mejor", example: "Questo e il migliore ristorante della citta." },
    { id: "it14c-6", term: "il peggiore", translation: "el peor", example: "E il peggiore film che ho visto." },
    { id: "it14c-7", term: "più grande", translation: "mas grande", example: "La mia casa e più grande." },
    { id: "it14c-8", term: "più caro", translation: "mas caro", example: "Questo hotel e più caro." },
    { id: "it14c-9", term: "economico", translation: "economico/barato", example: "L'autobus e più economico del taxi." },
    { id: "it14c-10", term: "veloce", translation: "rapido", example: "Il treno e più veloce della macchina." },
    { id: "it14c-11", term: "secondo me", translation: "segun yo/en mi opinion", example: "Secondo me, questo e meglio." },
    { id: "it14c-12", term: "preferire", translation: "preferir", example: "Preferisco il mare alla montagna." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "it14c-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: due citta",
      intro: "Competencia de LECTURA. Lee DOS textos en italiano y responde las preguntas.",
      content: {
        reading:
          "TESTO 1 - Due citta\n" +
          "Secondo me, Roma e più bella di Milano, ma Milano e più moderna di Roma. Roma ha più storia, ma " +
          "Milano e meno caotica. Il cibo a Roma e buono come a Milano, ma i prezzi sono più alti a Milano. " +
          "Per me, la migliore citta per vivere e Milano, ma la migliore per visitare e Roma.\n\n" +
          "TESTO 2 - Scegliere un mezzo di trasporto\n" +
          "A: Prendiamo il treno o l'aereo? B: Il treno e più economico, ma l'aereo e più veloce. A: Hai " +
          "ragione, ma io preferisco il treno perche e meno stressante. B: Anche per me! E poi, il treno e " +
          "comodo tanto quanto l'aereo per viaggi corti.",
        glossary: [
          { term: "più... di / meno... di", translation: "mas... que / menos... que" },
          { term: "la migliore / il peggiore", translation: "la mejor / el peor" },
          { term: "tanto quanto", translation: "tanto como" },
          { term: "secondo me", translation: "segun yo" },
          { term: "preferisco", translation: "prefiero" },
          { term: "comodo", translation: "comodo" },
          { term: "stressante", translation: "estresante" },
          { term: "caotica", translation: "caotica" },
        ],
        keyPhrases: [
          "'Più + aggettivo + di' para comparar superioridad; 'meno + aggettivo + di' para inferioridad.",
          "'Tanto...quanto' o 'cosi...come' para igualdad entre dos cosas.",
        ],
        check: [
          { prompt: "T1: Secondo il testo, quale citta ha più storia?", choices: ["Roma", "Milano", "Nessuna delle due"], answer: 0 },
          { prompt: "T1: Quale citta e meno caotica?", choices: ["Milano", "Roma", "Le due uguali"], answer: 0 },
          { prompt: "T1: Qual e la migliore citta per visitare secondo l'autore?", choices: ["Roma", "Milano", "Napoli"], answer: 0 },
          { prompt: "T2: Quale mezzo e più economico?", choices: ["Il treno", "L'aereo", "L'autobus"], answer: 0 },
          { prompt: "T2: Quale mezzo e più veloce?", choices: ["L'aereo", "Il treno", "La macchina"], answer: 0 },
          { prompt: "T2: Perche B preferisce il treno?", choices: ["E meno stressante", "E più veloce", "E più economico"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "it14c-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: i paragoni",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "più... di / meno... di", translation: "mas... que / menos... que" },
        { term: "come / tanto quanto", translation: "como / tanto como" },
        { term: "il migliore / il peggiore", translation: "el mejor / el peor" },
        { term: "più grande", translation: "mas grande" },
        { term: "caro / economico", translation: "caro / barato" },
        { term: "veloce", translation: "rapido" },
        { term: "secondo me", translation: "segun yo" },
        { term: "preferire", translation: "preferir" },
      ],
      activities: [
        {
          id: "it14c-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "più... di", right: "mas que" },
            { left: "meno... di", right: "menos que" },
            { left: "il migliore", right: "el mejor" },
            { left: "il peggiore", right: "el peor" },
          ] },
        },
        {
          id: "it14c-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "veloce", right: "rapido" },
            { left: "economico", right: "barato" },
            { left: "secondo me", right: "segun yo" },
            { left: "preferire", right: "preferir" },
          ] },
        },
        {
          id: "it14c-vocab-a3", type: "cloze",
          prompt: "Completa: 'Roma e ___ grande di Firenze.' (mas)",
          payload: { answer: "più" },
          explain: "'più...di' = mas que.",
        },
        {
          id: "it14c-vocab-a4", type: "cloze",
          prompt: "Completa: 'Il treno e ___ caro dell'aereo.' (menos)",
          payload: { answer: "meno" },
          explain: "'meno...di' = menos que.",
        },
        {
          id: "it14c-vocab-a5", type: "cloze",
          prompt: "Completa: 'Studio tanto ___ te.' (como)",
          payload: { answer: "quanto" },
          explain: "'tanto...quanto' = tanto como.",
        },
        {
          id: "it14c-vocab-a6", type: "multiple_choice",
          prompt: "Come dici 'el mejor restaurante'?",
          payload: { choices: ["il più buono ristorante", "il migliore ristorante", "il più migliore ristorante"], answer: 1 },
          explain: "'buono' -> superlativo irregolare 'migliore'.",
        },
        {
          id: "it14c-vocab-a7", type: "multiple_choice",
          prompt: "Cosa significa 'secondo me'?",
          payload: { choices: ["segun el", "segun yo", "segun ellos"], answer: 1 },
          explain: "'secondo me' = en mi opinion.",
        },
        {
          id: "it14c-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["più", "Il", "economico", "treno", "è"], answer: ["Il", "treno", "è", "più", "economico"] },
          explain: "'Il treno è più economico'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "it14c-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: il comparativo e il superlativo",
      intro: "Competencia de GRAMATICA. Aprende a comparar y a usar el superlativo.",
      grammar: {
        title: "Il comparativo e il superlativo",
        chart: {
          title: "COMPARATIVO",
          maps: "più/meno + aggettivo + DI",
          groups: [
            {
              label: "COMPARATIVO", color: "rose",
              forms: [
                { form: "PIÙ... DI", subjects: "superioridad (mas que)" },
                { form: "MENO... DI", subjects: "inferioridad (menos que)" },
                { form: "COME / TANTO...QUANTO", subjects: "igualdad (como/tanto como)" },
              ],
            },
            {
              label: "SUPERLATIVO", color: "green",
              forms: [
                { form: "IL/LA PIÙ... (DI)", subjects: "el/la mas (de)" },
                { form: "BUONO -> MIGLIORE", subjects: "irregolare: mejor" },
                { form: "CATTIVO -> PEGGIORE", subjects: "irregolare: peor" },
              ],
            },
          ],
        },
        form: "più/meno + aggettivo + di (comparacion); il/la più + aggettivo (superlativo)",
        desc: "Para comparar dos cosas se usa 'più...di' (mas que) o 'meno...di' (menos que). Para decir que son IGUALES se usa 'tanto...quanto' o '(cosi)...come'. Para el superlativo (el mas/la mas de un grupo) se usa 'il/la più + adjetivo'. Ojo con los irregulares: 'buono' -> 'migliore' (mejor), 'cattivo' -> 'peggiore' (peor), NO se dice 'più buono'.",
        rule: "Comparativo di maggioranza: PIÙ + aggettivo + DI (Roma è più grande di Firenze). Di minoranza: MENO + aggettivo + DI. Di uguaglianza: (COSÌ) + aggettivo + COME, o TANTO + aggettivo + QUANTO. Superlativo relativo: IL/LA PIÙ + aggettivo (+ DI + gruppo). Irregolari: buono->migliore, cattivo->peggiore.",
        examples: ["Milano è più moderna di Roma.", "Il treno è meno caro dell'aereo.", "Lei è alta come sua sorella.", "Questo è il migliore ristorante della città."],
        explain: { tr: ["Milan es mas moderna que Roma.", "El tren es menos caro que el avion.", "Ella es alta como su hermana.", "Este es el mejor restaurante de la ciudad."] },
        mistakes: [
          { wrong: "Roma è più grande che Firenze.", right: "Roma è più grande di Firenze." },
          { wrong: "Questo ristorante è più buono.", right: "Questo ristorante è migliore." },
          { wrong: "Lei è la più migliore studentessa.", right: "Lei è la migliore studentessa." },
        ],
      },
      activities: [
        {
          id: "it14c-gram-a1", type: "cloze",
          prompt: "Completa: 'Roma è ___ grande di Milano.' (mas)",
          payload: { answer: "più" },
          explain: "'più...di' = mas que.",
        },
        {
          id: "it14c-gram-a2", type: "cloze",
          prompt: "Completa: 'Questo hotel è ___ caro di quello.' (menos)",
          payload: { answer: "meno" },
          explain: "'meno...di' = menos que.",
        },
        {
          id: "it14c-gram-a3", type: "cloze",
          prompt: "Completa: 'Lei è alta ___ sua sorella.' (como)",
          payload: { answer: "come" },
          explain: "'come' para igualdad.",
        },
        {
          id: "it14c-gram-a4", type: "multiple_choice",
          prompt: "Come si dice 'mejor' (irregolare)?",
          payload: { choices: ["più buono", "migliore", "più bene"], answer: 1 },
          explain: "'buono' -> irregolare 'migliore'.",
        },
        {
          id: "it14c-gram-a5", type: "multiple_choice",
          prompt: "Come si dice 'peor' (irregolare)?",
          payload: { choices: ["più cattivo", "peggiore", "meno buono"], answer: 1 },
          explain: "'cattivo' -> irregolare 'peggiore'.",
        },
        {
          id: "it14c-gram-a6", type: "multiple_choice",
          prompt: "Scegli la frase corretta:",
          payload: { choices: ["Roma è più grande che Firenze.", "Roma è più grande di Firenze.", "Roma è più grande come Firenze."], answer: 1 },
          explain: "Con sustantivos se usa 'di', no 'che'.",
        },
        {
          id: "it14c-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["come", "Lei", "sorella", "è", "sua", "alta"], answer: ["Lei", "è", "alta", "come", "sua", "sorella"] },
          explain: "'Lei è alta come sua sorella'.",
        },
        {
          id: "it14c-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["il", "Questo", "ristorante", "migliore", "è"], answer: ["Questo", "è", "il", "migliore", "ristorante"] },
          explain: "'Questo è il migliore ristorante'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "it14c-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: fai paragoni",
      intro: "Competencia de ESCRITURA. Compara dos cosas, frase por frase.",
      activities: [
        {
          id: "it14c-write-a1", type: "word_bank",
          prompt: "1. Di que Roma es mas grande que Milan:",
          payload: { words: ["di", "Roma", "è", "Milano", "più", "grande"], answer: ["Roma", "è", "più", "grande", "di", "Milano"] },
        },
        {
          id: "it14c-write-a2", type: "word_bank",
          prompt: "2. Di que el tren es menos caro que el avion:",
          payload: { words: ["dell'aereo", "Il", "caro", "treno", "è", "meno"], answer: ["Il", "treno", "è", "meno", "caro", "dell'aereo"] },
        },
        {
          id: "it14c-write-a3", type: "word_bank",
          prompt: "3. Di que ella es tan alta como tu:",
          payload: { words: ["te", "Lei", "come", "è", "alta"], answer: ["Lei", "è", "alta", "come", "te"] },
        },
        {
          id: "it14c-write-a4", type: "word_bank",
          prompt: "4. Di que este es el mejor restaurante:",
          payload: { words: ["il", "Questo", "ristorante", "migliore", "è"], answer: ["Questo", "è", "il", "migliore", "ristorante"] },
        },
        {
          id: "it14c-write-a5", type: "word_bank",
          prompt: "5. Pregunta que prefiere (tu, informal):",
          payload: { words: ["preferisci", "Cosa"], answer: ["Cosa", "preferisci"] },
        },
        {
          id: "it14c-write-a6", type: "multiple_choice",
          prompt: "6. El comparativo irregular de 'cattivo' es:",
          payload: { choices: ["più cattivo", "peggiore", "meno cattivo"], answer: 1 },
        },
        {
          id: "it14c-write-a7", type: "multiple_choice",
          prompt: "7. Cual es correcto?",
          payload: { choices: ["più alto che me", "più alto di me", "più alto come me"], answer: 1 },
        },
        {
          id: "it14c-write-a8", type: "multiple_choice",
          prompt: "8. 'Secondo me' significa:",
          payload: { choices: ["segun el", "en mi opinion", "segun ellos"], answer: 1 },
        },
      ],
    },
  ],
};
