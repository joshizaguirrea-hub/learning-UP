/**
 * data/units/pt1-ola.js — Unidade A1 pt-BR "Olá!" (saudações + verbo SER).
 *
 * Dados PUROS. Mesmo esquema das unidades de inglês (1 lição = 1 competência).
 * term = português (meta), translation = espanhol (L1 do aluno).
 */

export const PT1_OLA = {
  id: "pt1-ola",
  language: "pt",
  level: "A1",
  title: "Olá!",
  subtitle: "Saludar, presentarte y usar el verbo 'ser'",

  cando: [
    "Puedo saludar y despedirme en portugues.",
    "Puedo presentarme y decir mi nombre y de donde soy.",
    "Puedo usar el verbo 'ser' en frases simples.",
    "Puedo preguntar y responder datos personales basicos.",
  ],

  vocab: [
    { id: "pt1o-1", term: "olá", translation: "hola", example: "Olá! Tudo bem?" },
    { id: "pt1o-2", term: "tchau", translation: "adios/chau", example: "Tchau! Até amanhã." },
    { id: "pt1o-3", term: "bom dia", translation: "buenos dias", example: "Bom dia, professora!" },
    { id: "pt1o-4", term: "boa tarde", translation: "buenas tardes", example: "Boa tarde, senhor." },
    { id: "pt1o-5", term: "boa noite", translation: "buenas noches", example: "Boa noite, até amanhã." },
    { id: "pt1o-6", term: "prazer", translation: "mucho gusto", example: "Muito prazer, sou a Ana." },
    { id: "pt1o-7", term: "por favor", translation: "por favor", example: "Um café, por favor." },
    { id: "pt1o-8", term: "obrigado/obrigada", translation: "gracias", example: "Muito obrigada!" },
    { id: "pt1o-9", term: "nome", translation: "nombre", example: "Qual é o seu nome?" },
    { id: "pt1o-10", term: "amigo/amiga", translation: "amigo/a", example: "Este é o meu amigo, Tom." },
    { id: "pt1o-11", term: "professor/professora", translation: "profesor/a", example: "Ela é a minha professora." },
    { id: "pt1o-12", term: "tudo bem?", translation: "todo bien? / como estas?", example: "Oi! Tudo bem?" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "pt1o-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: saudações e apresentações",
      intro: "Competencia de LECTURA. Lee DOS textos en portugues y responde las preguntas.",
      content: {
        reading:
          "TEXTO 1 - A Ana\n" +
          "Olá! O meu nome é Ana. Eu sou do Brasil. Eu sou estudante. Este é o meu amigo, Tom. " +
          "Ele é do Canadá. Ele é professor. Muito prazer! Nós estamos felizes por aprender português. " +
          "Olá e bem-vindos!\n\n" +
          "TEXTO 2 - Uma conversa curta\n" +
          "A: Olá! Tudo bem? B: Tudo bem, obrigada. E você? A: Muito bem! Qual é o seu nome? " +
          "B: O meu nome é Sara. Eu sou de Portugal. A: Muito prazer, Sara! B: Igualmente. Tchau! " +
          "A: Tchau, até amanhã!",
        glossary: [
          { term: "o meu nome é", translation: "me llamo" },
          { term: "eu sou de / do", translation: "soy de" },
          { term: "este é", translation: "este es" },
          { term: "ele é / ela é", translation: "el es / ella es" },
          { term: "tudo bem?", translation: "todo bien?" },
          { term: "obrigado / obrigada", translation: "gracias (hombre/mujer)" },
          { term: "igualmente", translation: "igualmente" },
          { term: "até amanhã", translation: "hasta manana" },
        ],
        keyPhrases: [
          "Busca datos: de donde es cada persona y que hace.",
          "Fijate en el saludo y la despedida del Texto 2.",
        ],
        check: [
          { prompt: "T1: De onde é a Ana?", choices: ["Canadá", "Brasil", "Portugal"], answer: 1 },
          { prompt: "T1: Qual é a profissão do Tom?", choices: ["Estudante", "Professor", "Médico"], answer: 1 },
          { prompt: "T1: Qual é a profissão da Ana?", choices: ["Professora", "Estudante", "Médica"], answer: 1 },
          { prompt: "T2: Qual é o nome da pessoa B?", choices: ["Ana", "Sara", "Tom"], answer: 1 },
          { prompt: "T2: De onde é a Sara?", choices: ["Brasil", "Portugal", "Canadá"], answer: 1 },
          { prompt: "T2: Como termina a conversa?", choices: ["Tchau", "Obrigada", "Por favor"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "pt1o-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: saudações e pessoas",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "olá / tchau", translation: "hola / adios" },
        { term: "bom dia / boa tarde / boa noite", translation: "buenos dias / tardes / noches" },
        { term: "muito prazer", translation: "mucho gusto" },
        { term: "por favor / obrigado", translation: "por favor / gracias" },
        { term: "amigo / amiga", translation: "amigo/a" },
        { term: "professor / estudante", translation: "profesor / estudiante" },
        { term: "nome", translation: "nombre" },
        { term: "tudo bem?", translation: "todo bien?" },
      ],
      activities: [
        {
          id: "pt1o-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "Olá", right: "Hola" },
            { left: "Tchau", right: "Adios" },
            { left: "Obrigado", right: "Gracias" },
            { left: "Por favor", right: "Por favor" },
          ] },
        },
        {
          id: "pt1o-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "amigo", right: "amigo" },
            { left: "professor", right: "profesor" },
            { left: "estudante", right: "estudiante" },
            { left: "nome", right: "nombre" },
          ] },
        },
        {
          id: "pt1o-vocab-a3", type: "cloze",
          prompt: "Completa el saludo de la tarde: 'Boa ___!' (tarde)",
          payload: { answer: "tarde" },
          explain: "'Boa tarde' = buenas tardes.",
        },
        {
          id: "pt1o-vocab-a4", type: "cloze",
          prompt: "Completa: 'Um café, por ___.' (favor)",
          payload: { answer: "favor" },
          explain: "'Por favor' = por favor.",
        },
        {
          id: "pt1o-vocab-a5", type: "cloze",
          prompt: "Completa el 'mucho gusto': 'Muito ___.' (gusto)",
          payload: { answer: "prazer" },
          explain: "'Muito prazer' = mucho gusto.",
        },
        {
          id: "pt1o-vocab-a6", type: "multiple_choice",
          prompt: "Cual palabra significa 'profesor/a'?",
          payload: { choices: ["estudante", "professor", "amigo"], answer: 1 },
          explain: "'Professor(a)' = profesor(a).",
        },
        {
          id: "pt1o-vocab-a7", type: "multiple_choice",
          prompt: "Como preguntas 'todo bien?'",
          payload: { choices: ["Qual é o seu nome?", "Tudo bem?", "De onde é?"], answer: 1 },
          explain: "'Tudo bem?' = todo bien? / como estas?",
        },
        {
          id: "pt1o-vocab-a8", type: "word_bank",
          prompt: "Ordena la despedida:",
          payload: { words: ["amanhã", "Até", "logo"], answer: ["Até", "logo", "amanhã"] },
          explain: "'Até logo' / 'Até amanhã' = hasta luego / manana.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "pt1o-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: o verbo 'ser' (presente)",
      intro: "Competencia de GRAMATICA. Aprende el verbo 'ser' en presente y practicalo.",
      grammar: {
        title: "O verbo 'ser' (presente)",
        chart: {
          title: "SER",
          maps: "SER (identidad, origen, profesion)",
          groups: [
            {
              label: "PRESENTE", color: "amber",
              forms: [
                { form: "SOU", subjects: "eu" },
                { form: "É", subjects: "você, ele, ela" },
                { form: "SOMOS", subjects: "nós" },
                { form: "SÃO", subjects: "vocês, eles, elas" },
              ],
            },
          ],
        },
        form: "eu *sou* / você *é* / nós *somos* / eles *são*",
        desc: "Sirve para presentarte, decir quien eres, tu profesion y de donde eres.",
        rule: "El verbo 'ser' cambia segun la persona: 'eu sou', 'você/ele/ela é', 'nós somos', 'vocês/eles/elas são'. En portugues 'você' (tu) usa la forma de 'ele/ela'.",
        examples: ["Eu sou estudante.", "Ela é do Canadá.", "Nós somos amigos.", "Eles são professores."],
        explain: { tr: ["Yo soy estudiante.", "Ella es de Canada.", "Nosotros somos amigos.", "Ellos son profesores."] },
        mistakes: [
          { wrong: "Eu é do Brasil.", right: "Eu sou do Brasil." },
          { wrong: "Ele são professor.", right: "Ele é professor." },
          { wrong: "Nós é amigos.", right: "Nós somos amigos." },
        ],
      },
      activities: [
        {
          id: "pt1o-gram-a1", type: "cloze",
          prompt: "Completa: 'Eu ___ estudante.' (soy)",
          payload: { answer: "sou" },
          explain: "Con 'eu' siempre 'sou'.",
        },
        {
          id: "pt1o-gram-a2", type: "cloze",
          prompt: "Completa: 'Ela ___ do Canadá.' (es)",
          payload: { answer: "é" },
          explain: "Con você/ele/ela usamos 'é'.",
        },
        {
          id: "pt1o-gram-a3", type: "cloze",
          prompt: "Completa: 'Eles ___ os meus amigos.' (son)",
          payload: { answer: "são" },
          explain: "Con vocês/eles/elas usamos 'são'.",
        },
        {
          id: "pt1o-gram-a4", type: "multiple_choice",
          prompt: "Escolha a frase correta:",
          payload: { choices: ["Nós é amigos.", "Nós somos amigos.", "Nós sou amigos."], answer: 1 },
          explain: "Con 'nós' usamos 'somos'.",
        },
        {
          id: "pt1o-gram-a5", type: "multiple_choice",
          prompt: "Escolha a frase correta:",
          payload: { choices: ["Ele é professor.", "Ele são professor.", "Ele sou professor."], answer: 0 },
          explain: "Con 'ele' usamos 'é'.",
        },
        {
          id: "pt1o-gram-a6", type: "word_bank",
          prompt: "Ordena para presentarte:",
          payload: { words: ["nome", "meu", "O", "é", "Ana"], answer: ["O", "meu", "nome", "é", "Ana"] },
          explain: "Orden: O + meu + nome + é + (nombre).",
        },
        {
          id: "pt1o-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["do", "Eu", "Brasil", "sou"], answer: ["Eu", "sou", "do", "Brasil"] },
          explain: "Orden: Eu + sou + do + (pais).",
        },
        {
          id: "pt1o-gram-a8", type: "cloze",
          prompt: "Completa la pregunta: 'Qual ___ o seu nome?' (es)",
          payload: { answer: "é" },
          explain: "'Qual é o seu nome?' = cual es tu nombre?",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "pt1o-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: apresente-se por completo",
      intro: "Competencia de ESCRITURA. Construye una presentacion completa, frase por frase.",
      activities: [
        {
          id: "pt1o-write-a1", type: "word_bank",
          prompt: "1. Saluda y di tu nombre:",
          payload: { words: ["sou", "Olá,", "eu", "Leo"], answer: ["Olá,", "eu", "sou", "Leo"] },
        },
        {
          id: "pt1o-write-a2", type: "word_bank",
          prompt: "2. Di de donde eres:",
          payload: { words: ["do", "Eu", "Brasil", "sou"], answer: ["Eu", "sou", "do", "Brasil"] },
        },
        {
          id: "pt1o-write-a3", type: "word_bank",
          prompt: "3. Di tu ocupacion:",
          payload: { words: ["estudante", "Eu", "sou"], answer: ["Eu", "sou", "estudante"] },
        },
        {
          id: "pt1o-write-a4", type: "word_bank",
          prompt: "4. Presenta a un amigo:",
          payload: { words: ["é", "Este", "amigo", "meu", "Tom", "o"], answer: ["Este", "é", "o", "meu", "amigo", "Tom"] },
        },
        {
          id: "pt1o-write-a5", type: "word_bank",
          prompt: "5. Pregunta el nombre de la otra persona:",
          payload: { words: ["seu", "Qual", "nome?", "é", "o"], answer: ["Qual", "é", "o", "seu", "nome?"] },
        },
        {
          id: "pt1o-write-a6", type: "multiple_choice",
          prompt: "6. Mejor forma de despedirte:",
          payload: { choices: ["Olá!", "Tchau, até logo!", "O meu nome é."], answer: 1 },
        },
        {
          id: "pt1o-write-a7", type: "multiple_choice",
          prompt: "7. Alguien dice 'Muito prazer.' Respondes:",
          payload: { choices: ["Igualmente.", "Tchau.", "Não, obrigado."], answer: 0 },
        },
        {
          id: "pt1o-write-a8", type: "multiple_choice",
          prompt: "8. Cual es un saludo educado?",
          payload: { choices: ["Olá, tudo bem?", "Me da isso.", "Vai embora."], answer: 0 },
        },
      ],
    },
  ],
};
