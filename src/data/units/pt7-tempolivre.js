/**
 * data/units/pt7-tempolivre.js — Unidade A1 pt-BR "O Tempo Livre" (gostar de/poder + infinitivo).
 */

export const PT7_TEMPOLIVRE = {
  id: "pt7-tempolivre",
  language: "pt",
  level: "A1",
  title: "O Tempo Livre",
  subtitle: "Hablar de hobbies con 'gostar de' y 'poder' + infinitivo",

  cando: [
    "Puedo hablar de mis pasatiempos favoritos.",
    "Puedo usar 'gostar de' + infinitivo (me gusta hacer...).",
    "Puedo usar 'poder' y 'querer' + infinitivo.",
    "Puedo invitar a alguien a hacer algo.",
  ],

  vocab: [
    { id: "pt7t-1", term: "tempo livre", translation: "tiempo libre", example: "No tempo livre eu leio." },
    { id: "pt7t-2", term: "ler", translation: "leer", example: "Eu gosto de ler." },
    { id: "pt7t-3", term: "ouvir música", translation: "escuchar musica", example: "Ela gosta de ouvir música." },
    { id: "pt7t-4", term: "ver televisão / filmes", translation: "ver television / peliculas", example: "Nós vemos filmes à noite." },
    { id: "pt7t-5", term: "jogar futebol", translation: "jugar futbol", example: "Eles jogam futebol no domingo." },
    { id: "pt7t-6", term: "nadar", translation: "nadar", example: "Eu gosto de nadar no verão." },
    { id: "pt7t-7", term: "viajar", translation: "viajar", example: "Nós queremos viajar." },
    { id: "pt7t-8", term: "dançar / cantar", translation: "bailar / cantar", example: "Ela adora dançar." },
    { id: "pt7t-9", term: "poder", translation: "poder", example: "Eu posso ir hoje." },
    { id: "pt7t-10", term: "adorar / detestar", translation: "encantar / detestar", example: "Eu adoro música." },
    { id: "pt7t-11", term: "praia / parque", translation: "playa / parque", example: "Vamos à praia?" },
    { id: "pt7t-12", term: "fim de semana", translation: "fin de semana", example: "O que fazes no fim de semana?" },
  ],

  lessons: [
    {
      id: "pt7t-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: o que fazes no tempo livre?",
      intro: "Competencia de LECTURA. Lee DOS textos en portugues y responde las preguntas.",
      content: {
        reading:
          "TEXTO 1 - Os hobbies do Tiago\n" +
          "No tempo livre, eu gosto de fazer muitas coisas. Eu adoro ler livros e ouvir música. Aos sábados, " +
          "eu jogo futebol com os meus amigos. No verão, eu gosto de nadar na praia. Eu não gosto de ver " +
          "televisão. O meu sonho é viajar pelo mundo.\n\n" +
          "TEXTO 2 - Um convite\n" +
          "Ana: Olá, Rui! O que queres fazer no fim de semana? Rui: Não sei. Podemos ir ao parque? Ana: Boa " +
          "ideia! Eu adoro o parque. Podemos também ir à praia. Rui: Perfeito. Eu gosto de nadar. A que horas " +
          "podemos ir? Ana: Às dez da manhã. Rui: Combinado!",
        glossary: [
          { term: "no tempo livre", translation: "en el tiempo libre" },
          { term: "eu gosto de + verbo", translation: "me gusta + verbo" },
          { term: "eu adoro", translation: "me encanta" },
          { term: "podemos ir?", translation: "podemos ir?" },
          { term: "o que queres fazer?", translation: "que quieres hacer?" },
          { term: "boa ideia", translation: "buena idea" },
          { term: "combinado", translation: "de acuerdo/hecho" },
          { term: "o meu sonho", translation: "mi sueno" },
        ],
        keyPhrases: [
          "Busca lo que le gusta y no le gusta al Tiago.",
          "Fijate en como invitan y aceptan ('podemos ir?', 'combinado').",
        ],
        check: [
          { prompt: "T1: O que o Tiago adora fazer?", choices: ["Ver televisão", "Ler e ouvir música", "Cozinhar"], answer: 1 },
          { prompt: "T1: O que o Tiago faz aos sábados?", choices: ["Nada", "Joga futebol", "Viaja"], answer: 1 },
          { prompt: "T1: O que o Tiago NÃO gosta de fazer?", choices: ["Ler", "Nadar", "Ver televisão"], answer: 2 },
          { prompt: "T2: Aonde a Ana e o Rui querem ir?", choices: ["Ao cinema", "Ao parque e à praia", "Ao trabalho"], answer: 1 },
          { prompt: "T2: O que o Rui gosta de fazer?", choices: ["Nadar", "Cantar", "Dançar"], answer: 0 },
          { prompt: "T2: A que horas eles vão?", choices: ["Às dez da manhã", "Às oito", "À tarde"], answer: 0 },
        ],
      },
      activities: [],
    },

    {
      id: "pt7t-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: hobbies e lazer",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "ler / ouvir música", translation: "leer / escuchar musica" },
        { term: "ver televisão / filmes", translation: "ver tele / peliculas" },
        { term: "jogar futebol", translation: "jugar futbol" },
        { term: "nadar / viajar", translation: "nadar / viajar" },
        { term: "dançar / cantar", translation: "bailar / cantar" },
        { term: "poder / querer", translation: "poder / querer" },
        { term: "adorar / detestar", translation: "encantar / detestar" },
        { term: "fim de semana", translation: "fin de semana" },
      ],
      activities: [
        {
          id: "pt7t-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "ler", right: "leer" },
            { left: "nadar", right: "nadar" },
            { left: "viajar", right: "viajar" },
            { left: "dançar", right: "bailar" },
          ] },
        },
        {
          id: "pt7t-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "cantar", right: "cantar" },
            { left: "ouvir música", right: "escuchar musica" },
            { left: "jogar futebol", right: "jugar futbol" },
            { left: "adorar", right: "encantar" },
          ] },
        },
        {
          id: "pt7t-vocab-a3", type: "cloze",
          prompt: "Completa: 'Eu gosto de ___ música.' (escuchar)",
          payload: { answer: "ouvir" },
          explain: "'ouvir música' = escuchar musica.",
        },
        {
          id: "pt7t-vocab-a4", type: "cloze",
          prompt: "Completa: 'No verão eu gosto de ___.' (nadar)",
          payload: { answer: "nadar" },
          explain: "'nadar' = nadar.",
        },
        {
          id: "pt7t-vocab-a5", type: "cloze",
          prompt: "Completa: 'O meu sonho é ___ pelo mundo.' (viajar)",
          payload: { answer: "viajar" },
          explain: "'viajar' = viajar.",
        },
        {
          id: "pt7t-vocab-a6", type: "multiple_choice",
          prompt: "Como dices 'leer'?",
          payload: { choices: ["ver", "ler", "ouvir"], answer: 1 },
          explain: "'ler' = leer.",
        },
        {
          id: "pt7t-vocab-a7", type: "multiple_choice",
          prompt: "Que significa 'adorar'?",
          payload: { choices: ["detestar", "encantar", "poder"], answer: 1 },
          explain: "'adorar' = encantar.",
        },
        {
          id: "pt7t-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["ler", "de", "gosto", "Eu"], answer: ["Eu", "gosto", "de", "ler"] },
          explain: "'Eu gosto de ler' = me gusta leer.",
        },
      ],
    },

    {
      id: "pt7t-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: 'gostar de / poder' + infinitivo",
      intro: "Competencia de GRAMATICA. Aprende a unir dos verbos: gostar de/poder + infinitivo.",
      grammar: {
        title: "Verbo + infinitivo",
        chart: {
          title: "PODER",
          maps: "poder / querer + infinitivo",
          groups: [
            {
              label: "PODER (presente)", color: "amber",
              forms: [
                { form: "POSSO", subjects: "eu" },
                { form: "PODE", subjects: "você, ele, ela" },
                { form: "PODEMOS", subjects: "nós" },
                { form: "PODEM", subjects: "vocês, eles, elas" },
              ],
            },
            {
              label: "ESTRUTURA", color: "sky",
              forms: [
                { form: "gosto de + inf.", subjects: "eu gosto de ler" },
                { form: "posso + inf.", subjects: "eu posso ir" },
              ],
            },
          ],
        },
        form: "eu *gosto de* *ler* / nós *podemos* *ir*",
        desc: "Con 'gostar' usa 'de' + infinitivo. Con 'poder/querer' va directo el infinitivo.",
        rule: "Para unir dos verbos: 'gostar de' + infinitivo (eu gosto de nadar). 'poder/querer' + infinitivo SIN 'de' (eu posso ir, eu quero viajar). El segundo verbo queda en infinitivo.",
        examples: ["Eu gosto de ler.", "Nós podemos ir à praia.", "Ela quer viajar.", "Vocês podem nadar aqui."],
        explain: { tr: ["Me gusta leer.", "Podemos ir a la playa.", "Ella quiere viajar.", "Ustedes pueden nadar aqui."] },
        mistakes: [
          { wrong: "Eu gosto ler.", right: "Eu gosto de ler." },
          { wrong: "Eu posso de ir.", right: "Eu posso ir." },
          { wrong: "Nós podem ir.", right: "Nós podemos ir." },
        ],
      },
      activities: [
        {
          id: "pt7t-gram-a1", type: "cloze",
          prompt: "Completa: 'Eu gosto ___ ler.' (falta la preposicion)",
          payload: { answer: "de" },
          explain: "gostar + de + infinitivo.",
        },
        {
          id: "pt7t-gram-a2", type: "cloze",
          prompt: "Completa: 'Nós ___ ir à praia.' (podemos)",
          payload: { answer: "podemos" },
          explain: "Con 'nós' -> podemos.",
        },
        {
          id: "pt7t-gram-a3", type: "cloze",
          prompt: "Completa: 'Eu ___ ir hoje.' (puedo)",
          payload: { answer: "posso" },
          explain: "Con 'eu' -> posso.",
        },
        {
          id: "pt7t-gram-a4", type: "cloze",
          prompt: "Completa: 'Ela quer ___ pelo mundo.' (viajar)",
          payload: { answer: "viajar" },
          explain: "querer + infinitivo (viajar).",
        },
        {
          id: "pt7t-gram-a5", type: "multiple_choice",
          prompt: "Escolha a frase correta:",
          payload: { choices: ["Eu gosto ler.", "Eu gosto de ler.", "Eu gosto de leio."], answer: 1 },
          explain: "gostar de + infinitivo.",
        },
        {
          id: "pt7t-gram-a6", type: "multiple_choice",
          prompt: "Escolha a frase correta:",
          payload: { choices: ["Eu posso de ir.", "Eu posso ir.", "Eu posso vou."], answer: 1 },
          explain: "poder + infinitivo (sin 'de').",
        },
        {
          id: "pt7t-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["nadar", "de", "gosto", "Eu"], answer: ["Eu", "gosto", "de", "nadar"] },
          explain: "Orden: Eu + gosto + de + nadar.",
        },
        {
          id: "pt7t-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["à", "podemos", "praia", "ir", "Nós"], answer: ["Nós", "podemos", "ir", "à", "praia"] },
          explain: "Orden: Nós + podemos + ir + à + praia.",
        },
      ],
    },

    {
      id: "pt7t-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: os meus hobbies",
      intro: "Competencia de ESCRITURA. Escribe sobre tu tiempo libre, frase por frase.",
      activities: [
        {
          id: "pt7t-write-a1", type: "word_bank",
          prompt: "1. Di lo que te gusta hacer:",
          payload: { words: ["ler", "de", "gosto", "Eu"], answer: ["Eu", "gosto", "de", "ler"] },
        },
        {
          id: "pt7t-write-a2", type: "word_bank",
          prompt: "2. Di lo que te encanta:",
          payload: { words: ["música", "adoro", "Eu", "ouvir"], answer: ["Eu", "adoro", "ouvir", "música"] },
        },
        {
          id: "pt7t-write-a3", type: "word_bank",
          prompt: "3. Invita a alguien al parque:",
          payload: { words: ["ao", "ir", "Podemos", "parque?"], answer: ["Podemos", "ir", "ao", "parque?"] },
        },
        {
          id: "pt7t-write-a4", type: "word_bank",
          prompt: "4. Di lo que quieres hacer:",
          payload: { words: ["viajar", "Eu", "quero"], answer: ["Eu", "quero", "viajar"] },
        },
        {
          id: "pt7t-write-a5", type: "multiple_choice",
          prompt: "5. Como dices 'me gusta nadar'?",
          payload: { choices: ["Eu gosto nadar.", "Eu gosto de nadar.", "Eu gosto de nado."], answer: 1 },
        },
        {
          id: "pt7t-write-a6", type: "multiple_choice",
          prompt: "6. Como dices 'podemos ir'?",
          payload: { choices: ["Podemos de ir.", "Podemos ir.", "Podem ir nós."], answer: 1 },
        },
        {
          id: "pt7t-write-a7", type: "multiple_choice",
          prompt: "7. Como aceptas un plan?",
          payload: { choices: ["Combinado!", "Não sei.", "Tchau."], answer: 0 },
        },
        {
          id: "pt7t-write-a8", type: "multiple_choice",
          prompt: "8. Cual frase es correcta?",
          payload: { choices: ["Ela quer viajar.", "Ela quer viaja.", "Ela quere viajar."], answer: 0 },
        },
      ],
    },
  ],
};
