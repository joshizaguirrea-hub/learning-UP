/**
 * data/units/pt14-comparacoes.js — Unidade A2 pt-BR "Comparações"
 * (comparativo e superlativo).
 *
 * Dados PUROS. term = portugues (meta), translation = espanhol (L1 do aluno).
 */

export const PT14_COMPARACOES = {
  id: "pt14-comparacoes",
  language: "pt",
  level: "A2",
  title: "Comparações",
  subtitle: "Comparativo (mais...do que, menos...do que, tão...quanto) y superlativo (o/a mais...)",

  cando: [
    "Puedo comparar dos cosas o personas con 'mais...do que' y 'menos...do que'.",
    "Puedo usar 'tão...quanto' para decir que algo es igual.",
    "Puedo usar el superlativo relativo (o/a mais...).",
    "Puedo expresar mi opinion comparando opciones (na minha opinião).",
  ],

  vocab: [
    { id: "pt14c-1", term: "mais... do que", translation: "mas... que", example: "São Paulo é maior do que Florianópolis." },
    { id: "pt14c-2", term: "menos... do que", translation: "menos... que", example: "O trem é menos caro do que o avião." },
    { id: "pt14c-3", term: "tão... quanto", translation: "tan... como", example: "Ela é tão alta quanto a irmã." },
    { id: "pt14c-4", term: "melhor", translation: "mejor", example: "Este restaurante é o melhor da cidade." },
    { id: "pt14c-5", term: "pior", translation: "peor", example: "É o pior filme que já vi." },
    { id: "pt14c-6", term: "maior", translation: "mas grande", example: "Minha casa é maior." },
    { id: "pt14c-7", term: "mais caro", translation: "mas caro", example: "Este hotel é mais caro." },
    { id: "pt14c-8", term: "mais barato", translation: "mas barato", example: "O ônibus é mais barato." },
    { id: "pt14c-9", term: "mais rápido", translation: "mas rapido", example: "O trem é mais rápido do que o carro." },
    { id: "pt14c-10", term: "na minha opinião", translation: "en mi opinion", example: "Na minha opinião, isso é melhor." },
    { id: "pt14c-11", term: "preferir", translation: "preferir", example: "Prefiro a praia à montanha." },
    { id: "pt14c-12", term: "mesmo assim", translation: "aun asi", example: "É caro, mas mesmo assim vale a pena." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "pt14c-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: duas cidades",
      intro: "Competencia de LECTURA. Lee DOS textos en portugues y responde las preguntas.",
      content: {
        reading:
          "TEXTO 1 - Duas cidades\n" +
          "Na minha opinião, São Paulo é mais interessante do que Florianópolis, mas Florianópolis é mais " +
          "tranquila do que São Paulo. São Paulo tem mais cultura, mas Florianópolis é menos caótica. A " +
          "comida em São Paulo é tão boa quanto em Florianópolis, mas os preços são mais altos em São " +
          "Paulo. Para mim, a melhor cidade para morar é Florianópolis, mas a melhor para visitar é São " +
          "Paulo.\n\n" +
          "TEXTO 2 - Escolhendo um transporte\n" +
          "A: Vamos de trem ou de avião? B: O trem é mais barato, mas o avião é mais rápido. A: Você tem " +
          "razão, mas eu prefiro o trem porque é menos estressante. B: Eu também! E além disso, o trem é " +
          "tão confortável quanto o avião para viagens curtas.",
        glossary: [
          { term: "mais... do que / menos... do que", translation: "mas... que / menos... que" },
          { term: "o melhor / o pior", translation: "el mejor / el peor" },
          { term: "tão... quanto", translation: "tan... como" },
          { term: "na minha opinião", translation: "en mi opinion" },
          { term: "prefiro", translation: "prefiero" },
          { term: "confortável", translation: "comodo" },
          { term: "estressante", translation: "estresante" },
          { term: "caótica", translation: "caotica" },
        ],
        keyPhrases: [
          "'Mais + adjetivo + do que' para comparar superioridad; 'menos + adjetivo + do que' para inferioridad.",
          "'Tão...quanto' para igualdad entre dos cosas.",
        ],
        check: [
          { prompt: "T1: Segundo o texto, qual cidade tem mais cultura?", choices: ["São Paulo", "Florianópolis", "Nenhuma das duas"], answer: 0 },
          { prompt: "T1: Qual cidade é menos caótica?", choices: ["Florianópolis", "São Paulo", "As duas iguais"], answer: 0 },
          { prompt: "T1: Qual é a melhor cidade para visitar segundo o autor?", choices: ["São Paulo", "Florianópolis", "Rio de Janeiro"], answer: 0 },
          { prompt: "T2: Qual meio de transporte é mais barato?", choices: ["O trem", "O avião", "O ônibus"], answer: 0 },
          { prompt: "T2: Qual meio de transporte é mais rápido?", choices: ["O avião", "O trem", "O carro"], answer: 0 },
          { prompt: "T2: Por que B prefere o trem?", choices: ["É menos estressante", "É mais rápido", "É mais barato"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "pt14c-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: as comparações",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "mais... do que / menos... do que", translation: "mas... que / menos... que" },
        { term: "tão... quanto", translation: "tan... como" },
        { term: "o melhor / o pior", translation: "el mejor / el peor" },
        { term: "maior", translation: "mas grande" },
        { term: "mais caro / mais barato", translation: "mas caro / mas barato" },
        { term: "mais rápido", translation: "mas rapido" },
        { term: "na minha opinião", translation: "en mi opinion" },
        { term: "preferir", translation: "preferir" },
      ],
      activities: [
        {
          id: "pt14c-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "mais... do que", right: "mas que" },
            { left: "menos... do que", right: "menos que" },
            { left: "o melhor", right: "el mejor" },
            { left: "o pior", right: "el peor" },
          ] },
        },
        {
          id: "pt14c-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "mais rápido", right: "mas rapido" },
            { left: "mais barato", right: "mas barato" },
            { left: "na minha opinião", right: "en mi opinion" },
            { left: "preferir", right: "preferir" },
          ] },
        },
        {
          id: "pt14c-vocab-a3", type: "cloze",
          prompt: "Completa: 'São Paulo é ___ do que Florianópolis.' (mas grande)",
          payload: { answer: "maior" },
          explain: "'grande' -> comparativo irregular 'maior'.",
        },
        {
          id: "pt14c-vocab-a4", type: "cloze",
          prompt: "Completa: 'O trem é ___ caro do que o avião.' (menos)",
          payload: { answer: "menos" },
          explain: "'menos...do que' = menos que.",
        },
        {
          id: "pt14c-vocab-a5", type: "cloze",
          prompt: "Completa: 'Ela é tão alta ___ a irmã.' (como)",
          payload: { answer: "quanto" },
          explain: "'tão...quanto' = tan como.",
        },
        {
          id: "pt14c-vocab-a6", type: "multiple_choice",
          prompt: "Como se diz 'el mejor restaurante'?",
          payload: { choices: ["o mais bom restaurante", "o melhor restaurante", "o mais melhor restaurante"], answer: 1 },
          explain: "'bom' -> superlativo irregular 'melhor'.",
        },
        {
          id: "pt14c-vocab-a7", type: "multiple_choice",
          prompt: "O que significa 'na minha opinião'?",
          payload: { choices: ["segun el", "en mi opinion", "segun ellos"], answer: 1 },
          explain: "'na minha opinião' = en mi opinion.",
        },
        {
          id: "pt14c-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["mais", "O", "barato", "trem", "é"], answer: ["O", "trem", "é", "mais", "barato"] },
          explain: "'O trem é mais barato'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "pt14c-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: o comparativo e o superlativo",
      intro: "Competencia de GRAMATICA. Aprende a comparar y a usar el superlativo.",
      grammar: {
        title: "O comparativo e o superlativo",
        chart: {
          title: "COMPARATIVO",
          maps: "mais/menos + adjetivo + DO QUE",
          groups: [
            {
              label: "COMPARATIVO", color: "rose",
              forms: [
                { form: "MAIS... DO QUE", subjects: "superioridad (mas que)" },
                { form: "MENOS... DO QUE", subjects: "inferioridad (menos que)" },
                { form: "TÃO... QUANTO", subjects: "igualdad (tan como)" },
              ],
            },
            {
              label: "SUPERLATIVO", color: "green",
              forms: [
                { form: "O/A MAIS... (DE)", subjects: "el/la mas (de)" },
                { form: "BOM -> MELHOR", subjects: "irregular: mejor" },
                { form: "RUIM -> PIOR", subjects: "irregular: peor" },
              ],
            },
          ],
        },
        form: "mais/menos + adjetivo + do que (comparacion); o/a mais + adjetivo (superlativo)",
        desc: "Para comparar dos cosas se usa 'mais...do que' (mas que) o 'menos...do que' (menos que). Para decir que son IGUALES se usa 'tão...quanto'. Para el superlativo (el mas/la mas de un grupo) se usa 'o/a mais + adjetivo'. Ojo con los irregulares: 'bom' -> 'melhor' (mejor), 'ruim' -> 'pior' (peor), NO se dice 'mais bom'.",
        rule: "Comparativo de superioridad: MAIS + adjetivo + DO QUE (São Paulo é maior do que Florianópolis). De inferioridad: MENOS + adjetivo + DO QUE. De igualdad: TÃO + adjetivo + QUANTO. Superlativo relativo: O/A MAIS + adjetivo (+ DE + grupo). Irregulares: bom->melhor, ruim->pior, grande->maior, pequeno->menor.",
        examples: ["São Paulo é maior do que Florianópolis.", "O trem é menos caro do que o avião.", "Ela é tão alta quanto a irmã.", "Este é o melhor restaurante da cidade."],
        explain: { tr: ["São Paulo es mas grande que Florianopolis.", "El tren es menos caro que el avion.", "Ella es tan alta como su hermana.", "Este es el mejor restaurante de la ciudad."] },
        mistakes: [
          { wrong: "São Paulo é mais grande que Florianópolis.", right: "São Paulo é maior do que Florianópolis." },
          { wrong: "Este restaurante é mais bom.", right: "Este restaurante é melhor." },
          { wrong: "Ela é a mais melhor aluna.", right: "Ela é a melhor aluna." },
        ],
      },
      activities: [
        {
          id: "pt14c-gram-a1", type: "cloze",
          prompt: "Completa: 'São Paulo é ___ do que Florianópolis.' (mas grande)",
          payload: { answer: "maior" },
          explain: "'grande' -> 'maior'.",
        },
        {
          id: "pt14c-gram-a2", type: "cloze",
          prompt: "Completa: 'Este hotel é ___ caro do que aquele.' (menos)",
          payload: { answer: "menos" },
          explain: "'menos...do que' = menos que.",
        },
        {
          id: "pt14c-gram-a3", type: "cloze",
          prompt: "Completa: 'Ela é alta ___ a irmã.' (tão...quanto)",
          payload: { answer: "quanto" },
          explain: "'tão...quanto' para igualdad.",
        },
        {
          id: "pt14c-gram-a4", type: "multiple_choice",
          prompt: "Como se diz 'mejor' (irregular)?",
          payload: { choices: ["mais bom", "melhor", "mais boa"], answer: 1 },
          explain: "'bom' -> irregular 'melhor'.",
        },
        {
          id: "pt14c-gram-a5", type: "multiple_choice",
          prompt: "Como se diz 'peor' (irregular)?",
          payload: { choices: ["mais ruim", "pior", "menos bom"], answer: 1 },
          explain: "'ruim' -> irregular 'pior'.",
        },
        {
          id: "pt14c-gram-a6", type: "multiple_choice",
          prompt: "Escolha a frase correta:",
          payload: { choices: ["São Paulo é maior que Florianópolis.", "São Paulo é maior do que Florianópolis.", "São Paulo é maior como Florianópolis."], answer: 1 },
          explain: "Se usa 'do que', no 'que' solo ni 'como'.",
        },
        {
          id: "pt14c-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["quanto", "Ela", "irmã", "é", "tão", "a", "alta"], answer: ["Ela", "é", "tão", "alta", "quanto", "a", "irmã"] },
          explain: "'Ela é tão alta quanto a irmã'.",
        },
        {
          id: "pt14c-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["o", "Este", "restaurante", "melhor", "é"], answer: ["Este", "é", "o", "melhor", "restaurante"] },
          explain: "'Este é o melhor restaurante'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "pt14c-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: faça comparações",
      intro: "Competencia de ESCRITURA. Compara dos cosas, frase por frase.",
      activities: [
        {
          id: "pt14c-write-a1", type: "word_bank",
          prompt: "1. Di que São Paulo es mas grande que Florianópolis:",
          payload: { words: ["do", "São", "Paulo", "é", "Florianópolis", "que", "maior"], answer: ["São", "Paulo", "é", "maior", "do", "que", "Florianópolis"] },
        },
        {
          id: "pt14c-write-a2", type: "word_bank",
          prompt: "2. Di que el tren es menos caro que el avion:",
          payload: { words: ["que", "O", "caro", "trem", "é", "menos", "do", "avião", "o"], answer: ["O", "trem", "é", "menos", "caro", "do", "que", "o", "avião"] },
        },
        {
          id: "pt14c-write-a3", type: "word_bank",
          prompt: "3. Di que ella es tan alta como tu:",
          payload: { words: ["quanto", "Ela", "você", "é", "tão", "alta"], answer: ["Ela", "é", "tão", "alta", "quanto", "você"] },
        },
        {
          id: "pt14c-write-a4", type: "word_bank",
          prompt: "4. Di que este es el mejor restaurante:",
          payload: { words: ["o", "Este", "restaurante", "melhor", "é"], answer: ["Este", "é", "o", "melhor", "restaurante"] },
        },
        {
          id: "pt14c-write-a5", type: "word_bank",
          prompt: "5. Pregunta que prefiere (voce):",
          payload: { words: ["prefere", "O", "que", "você"], answer: ["O", "que", "você", "prefere"] },
        },
        {
          id: "pt14c-write-a6", type: "multiple_choice",
          prompt: "6. El comparativo irregular de 'ruim' es:",
          payload: { choices: ["mais ruim", "pior", "menos ruim"], answer: 1 },
        },
        {
          id: "pt14c-write-a7", type: "multiple_choice",
          prompt: "7. Qual é correto?",
          payload: { choices: ["mais alto que eu", "mais alto do que eu", "mais alto como eu"], answer: 1 },
        },
        {
          id: "pt14c-write-a8", type: "multiple_choice",
          prompt: "8. 'Na minha opinião' significa:",
          payload: { choices: ["segun el", "en mi opinion", "segun ellos"], answer: 1 },
        },
      ],
    },
  ],
};
