/**
 * data/units/pt2-familia.js — Unidade A1 pt-BR "A Família" (possessivos + TER).
 */

export const PT2_FAMILIA = {
  id: "pt2-familia",
  language: "pt",
  level: "A1",
  title: "A Família",
  subtitle: "Hablar de tu familia con posesivos y el verbo 'ter'",

  cando: [
    "Puedo nombrar a los miembros de mi familia.",
    "Puedo usar los posesivos (meu/minha, seu/sua).",
    "Puedo usar el verbo 'ter' (tener).",
    "Puedo describir cuantas personas hay en mi familia.",
  ],

  vocab: [
    { id: "pt2f-1", term: "família", translation: "familia", example: "A minha família é grande." },
    { id: "pt2f-2", term: "pai", translation: "padre", example: "O meu pai trabalha muito." },
    { id: "pt2f-3", term: "mãe", translation: "madre", example: "A minha mãe cozinha bem." },
    { id: "pt2f-4", term: "irmão", translation: "hermano", example: "Eu tenho um irmão." },
    { id: "pt2f-5", term: "irmã", translation: "hermana", example: "A minha irmã é médica." },
    { id: "pt2f-6", term: "filho/filha", translation: "hijo/hija", example: "Eles têm dois filhos." },
    { id: "pt2f-7", term: "avô/avó", translation: "abuelo/abuela", example: "O meu avô tem 80 anos." },
    { id: "pt2f-8", term: "marido", translation: "esposo", example: "O marido dela é engenheiro." },
    { id: "pt2f-9", term: "esposa/mulher", translation: "esposa", example: "A esposa dele é professora." },
    { id: "pt2f-10", term: "casado/solteiro", translation: "casado/soltero", example: "Eu sou solteiro." },
    { id: "pt2f-11", term: "ter", translation: "tener", example: "Eu tenho uma irmã." },
    { id: "pt2f-12", term: "anos", translation: "anos (edad)", example: "Ela tem vinte anos." },
  ],

  lessons: [
    {
      id: "pt2f-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: a minha família",
      intro: "Competencia de LECTURA. Lee DOS textos en portugues y responde las preguntas.",
      content: {
        reading:
          "TEXTO 1 - A família do Pedro\n" +
          "Olá! Eu sou o Pedro. A minha família é pequena. Eu tenho um pai, uma mãe e uma irmã. " +
          "O meu pai é professor e a minha mãe é médica. A minha irmã tem quinze anos e é estudante. " +
          "Nós temos um cachorro também. Eu amo a minha família.\n\n" +
          "TEXTO 2 - A família da Júlia\n" +
          "A minha família é grande. Eu tenho dois irmãos e uma irmã. O meu avô e a minha avó moram " +
          "conosco. O meu marido se chama Rui e nós temos um filho. Ele tem três anos. Somos oito pessoas em casa!",
        glossary: [
          { term: "a minha família", translation: "mi familia" },
          { term: "eu tenho", translation: "yo tengo" },
          { term: "nós temos", translation: "nosotros tenemos" },
          { term: "moram conosco", translation: "viven con nosotros" },
          { term: "se chama", translation: "se llama" },
          { term: "pessoas", translation: "personas" },
          { term: "também", translation: "tambien" },
          { term: "grande / pequena", translation: "grande / pequena" },
        ],
        keyPhrases: [
          "Cuenta cuantas personas hay en cada familia.",
          "Fijate en los posesivos: meu/minha (mi).",
        ],
        check: [
          { prompt: "T1: Quantos irmãos tem o Pedro?", choices: ["Um irmão", "Uma irmã", "Dois irmãos"], answer: 1 },
          { prompt: "T1: Qual é a profissão da mãe do Pedro?", choices: ["Professora", "Médica", "Estudante"], answer: 1 },
          { prompt: "T1: A família do Pedro é...", choices: ["grande", "pequena", "enorme"], answer: 1 },
          { prompt: "T2: Como se chama o marido da Júlia?", choices: ["Pedro", "Rui", "Tom"], answer: 1 },
          { prompt: "T2: Quantos anos tem o filho da Júlia?", choices: ["Três", "Quinze", "Oito"], answer: 0 },
          { prompt: "T2: Quantas pessoas moram na casa da Júlia?", choices: ["Cinco", "Oito", "Três"], answer: 1 },
        ],
      },
      activities: [],
    },

    {
      id: "pt2f-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: membros da família",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "pai / mãe", translation: "padre / madre" },
        { term: "irmão / irmã", translation: "hermano / hermana" },
        { term: "filho / filha", translation: "hijo / hija" },
        { term: "avô / avó", translation: "abuelo / abuela" },
        { term: "marido / esposa", translation: "esposo / esposa" },
        { term: "família", translation: "familia" },
        { term: "casado / solteiro", translation: "casado / soltero" },
        { term: "ter", translation: "tener" },
      ],
      activities: [
        {
          id: "pt2f-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "pai", right: "padre" },
            { left: "mãe", right: "madre" },
            { left: "irmão", right: "hermano" },
            { left: "filha", right: "hija" },
          ] },
        },
        {
          id: "pt2f-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "avô", right: "abuelo" },
            { left: "marido", right: "esposo" },
            { left: "família", right: "familia" },
            { left: "irmã", right: "hermana" },
          ] },
        },
        {
          id: "pt2f-vocab-a3", type: "cloze",
          prompt: "Completa: 'A minha ___ cozinha bem.' (madre)",
          payload: { answer: "mãe" },
          explain: "'Mãe' = madre.",
        },
        {
          id: "pt2f-vocab-a4", type: "cloze",
          prompt: "Completa: 'Eu tenho um ___.' (hermano)",
          payload: { answer: "irmão" },
          explain: "'Irmão' = hermano.",
        },
        {
          id: "pt2f-vocab-a5", type: "cloze",
          prompt: "Completa: 'O meu ___ tem 80 anos.' (abuelo)",
          payload: { answer: "avô" },
          explain: "'Avô' = abuelo.",
        },
        {
          id: "pt2f-vocab-a6", type: "multiple_choice",
          prompt: "Cual palabra significa 'hija'?",
          payload: { choices: ["filho", "filha", "irmã"], answer: 1 },
          explain: "'Filha' = hija.",
        },
        {
          id: "pt2f-vocab-a7", type: "multiple_choice",
          prompt: "Como dices 'soltero'?",
          payload: { choices: ["casado", "solteiro", "marido"], answer: 1 },
          explain: "'Solteiro' = soltero.",
        },
        {
          id: "pt2f-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["irmã", "uma", "tenho", "Eu"], answer: ["Eu", "tenho", "uma", "irmã"] },
          explain: "'Eu tenho uma irmã' = yo tengo una hermana.",
        },
      ],
    },

    {
      id: "pt2f-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: possessivos + verbo 'ter'",
      intro: "Competencia de GRAMATICA. Aprende meu/minha, seu/sua y el verbo 'ter'.",
      grammar: {
        title: "Possessivos e o verbo 'ter'",
        chart: {
          title: "TER",
          maps: "TENER + posesivos",
          groups: [
            {
              label: "TER (presente)", color: "amber",
              forms: [
                { form: "TENHO", subjects: "eu" },
                { form: "TEM", subjects: "você, ele, ela" },
                { form: "TEMOS", subjects: "nós" },
                { form: "TÊM", subjects: "vocês, eles, elas" },
              ],
            },
            {
              label: "POSSESSIVOS", color: "sky",
              forms: [
                { form: "MEU / MINHA", subjects: "mi (masc. / fem.)" },
                { form: "SEU / SUA", subjects: "tu-su (masc. / fem.)" },
              ],
            },
          ],
        },
        form: "eu *tenho* / o *meu* pai / a *minha* mãe",
        desc: "El posesivo concuerda con la COSA poseida, no con el dueno: 'o meu pai', 'a minha mãe'.",
        rule: "El verbo 'ter' = tener: eu tenho, você/ele tem, nós temos, eles têm. Los posesivos concuerdan en genero con lo poseido: meu/minha (mi), seu/sua (tu/su). Suele ir con articulo: 'o meu', 'a minha'.",
        examples: ["Eu tenho uma irmã.", "O meu pai é professor.", "A minha mãe é médica.", "Eles têm dois filhos."],
        explain: { tr: ["Yo tengo una hermana.", "Mi padre es profesor.", "Mi madre es medica.", "Ellos tienen dos hijos."] },
        mistakes: [
          { wrong: "Eu tem uma irmã.", right: "Eu tenho uma irmã." },
          { wrong: "A meu mãe é médica.", right: "A minha mãe é médica." },
          { wrong: "Eles tem dois filhos.", right: "Eles têm dois filhos." },
        ],
      },
      activities: [
        {
          id: "pt2f-gram-a1", type: "cloze",
          prompt: "Completa: 'Eu ___ um irmão.' (tengo)",
          payload: { answer: "tenho" },
          explain: "Con 'eu' -> 'tenho'.",
        },
        {
          id: "pt2f-gram-a2", type: "cloze",
          prompt: "Completa: 'Nós ___ uma casa grande.' (tenemos)",
          payload: { answer: "temos" },
          explain: "Con 'nós' -> 'temos'.",
        },
        {
          id: "pt2f-gram-a3", type: "cloze",
          prompt: "Completa: 'A ___ mãe é médica.' (mi, fem.)",
          payload: { answer: "minha" },
          explain: "Con palabra femenina (mãe) -> 'minha'.",
        },
        {
          id: "pt2f-gram-a4", type: "cloze",
          prompt: "Completa: 'O ___ pai trabalha muito.' (mi, masc.)",
          payload: { answer: "meu" },
          explain: "Con palabra masculina (pai) -> 'meu'.",
        },
        {
          id: "pt2f-gram-a5", type: "multiple_choice",
          prompt: "Escolha a frase correta:",
          payload: { choices: ["Eles tem dois filhos.", "Eles têm dois filhos.", "Eles tenho dois filhos."], answer: 1 },
          explain: "Con 'eles' -> 'têm'.",
        },
        {
          id: "pt2f-gram-a6", type: "multiple_choice",
          prompt: "Escolha a frase correta:",
          payload: { choices: ["A minha irmã é médica.", "O minha irmã é médica.", "A meu irmã é médica."], answer: 0 },
          explain: "'irmã' es femenino -> 'a minha'.",
        },
        {
          id: "pt2f-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["pai", "meu", "O", "professor", "é"], answer: ["O", "meu", "pai", "é", "professor"] },
          explain: "Orden: O + meu + pai + é + professor.",
        },
        {
          id: "pt2f-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["filhos", "têm", "dois", "Eles"], answer: ["Eles", "têm", "dois", "filhos"] },
          explain: "Orden: Eles + têm + dois + filhos.",
        },
      ],
    },

    {
      id: "pt2f-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: descreva a sua família",
      intro: "Competencia de ESCRITURA. Describe tu familia, frase por frase.",
      activities: [
        {
          id: "pt2f-write-a1", type: "word_bank",
          prompt: "1. Di como es tu familia:",
          payload: { words: ["família", "A", "é", "minha", "grande"], answer: ["A", "minha", "família", "é", "grande"] },
        },
        {
          id: "pt2f-write-a2", type: "word_bank",
          prompt: "2. Di cuantos hermanos tienes:",
          payload: { words: ["dois", "Eu", "irmãos", "tenho"], answer: ["Eu", "tenho", "dois", "irmãos"] },
        },
        {
          id: "pt2f-write-a3", type: "word_bank",
          prompt: "3. Habla de tu padre:",
          payload: { words: ["pai", "meu", "O", "trabalha"], answer: ["O", "meu", "pai", "trabalha"] },
        },
        {
          id: "pt2f-write-a4", type: "word_bank",
          prompt: "4. Habla de tu madre:",
          payload: { words: ["mãe", "minha", "A", "médica", "é"], answer: ["A", "minha", "mãe", "é", "médica"] },
        },
        {
          id: "pt2f-write-a5", type: "multiple_choice",
          prompt: "5. Como dices 'yo tengo una hermana'?",
          payload: { choices: ["Eu tem uma irmã.", "Eu tenho uma irmã.", "Eu temos uma irmã."], answer: 1 },
        },
        {
          id: "pt2f-write-a6", type: "multiple_choice",
          prompt: "6. Cual posesivo va con 'mãe'?",
          payload: { choices: ["o meu", "a minha", "os meus"], answer: 1 },
        },
        {
          id: "pt2f-write-a7", type: "multiple_choice",
          prompt: "7. Como dices 'ellos tienen dos hijos'?",
          payload: { choices: ["Eles têm dois filhos.", "Eles tem dois filho.", "Eles tenho dois filhos."], answer: 0 },
        },
        {
          id: "pt2f-write-a8", type: "multiple_choice",
          prompt: "8. Cual frase es correcta?",
          payload: { choices: ["O meu avô tem 80 anos.", "A meu avô tem 80 anos.", "O minha avô tem 80 anos."], answer: 0 },
        },
      ],
    },
  ],
};
