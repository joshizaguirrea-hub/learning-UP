/**
 * data/units/pt5-casa.js — Unidade A1 pt-BR "A Casa" (há/tem + preposições + ESTAR).
 */

export const PT5_CASA = {
  id: "pt5-casa",
  language: "pt",
  level: "A1",
  title: "A Casa",
  subtitle: "Describir tu casa con 'há/tem', preposiciones y el verbo 'estar'",

  cando: [
    "Puedo nombrar los cuartos y muebles de una casa.",
    "Puedo decir que hay ('há' / 'tem') en cada cuarto.",
    "Puedo usar preposiciones de lugar (em, no, na, em cima de).",
    "Puedo usar el verbo 'estar' para ubicar cosas.",
  ],

  vocab: [
    { id: "pt5h-1", term: "casa", translation: "casa", example: "A minha casa é grande." },
    { id: "pt5h-2", term: "quarto", translation: "cuarto/dormitorio", example: "O meu quarto é pequeno." },
    { id: "pt5h-3", term: "cozinha", translation: "cocina", example: "A cozinha é moderna." },
    { id: "pt5h-4", term: "sala", translation: "sala", example: "Na sala há um sofá." },
    { id: "pt5h-5", term: "casa de banho / banheiro", translation: "bano", example: "O banheiro fica ao fundo." },
    { id: "pt5h-6", term: "cama", translation: "cama", example: "A cama está no quarto." },
    { id: "pt5h-7", term: "mesa / cadeira", translation: "mesa / silla", example: "Há uma mesa e quatro cadeiras." },
    { id: "pt5h-8", term: "sofá", translation: "sofa", example: "O sofá está na sala." },
    { id: "pt5h-9", term: "janela / porta", translation: "ventana / puerta", example: "A janela é grande." },
    { id: "pt5h-10", term: "há / tem", translation: "hay", example: "Há dois quartos na casa." },
    { id: "pt5h-11", term: "em cima de / debaixo de", translation: "encima de / debajo de", example: "O livro está em cima da mesa." },
    { id: "pt5h-12", term: "ao lado de", translation: "al lado de", example: "A cozinha fica ao lado da sala." },
  ],

  lessons: [
    {
      id: "pt5h-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: a minha casa",
      intro: "Competencia de LECTURA. Lee DOS textos en portugues y responde las preguntas.",
      content: {
        reading:
          "TEXTO 1 - A casa da Rita\n" +
          "A minha casa não é grande, mas é confortável. Há dois quartos, uma cozinha, uma sala e uma casa " +
          "de banho. Na sala há um sofá e uma televisão. A cozinha fica ao lado da sala. O meu quarto tem " +
          "uma cama, uma mesa e uma janela grande. Eu gosto muito da minha casa.\n\n" +
          "TEXTO 2 - Onde estão as coisas?\n" +
          "Na cozinha há uma mesa e quatro cadeiras. O café está em cima da mesa. O gato está debaixo da " +
          "cadeira. Na sala, a televisão está ao lado do sofá. Os livros estão em cima da estante. Tudo tem o seu lugar!",
        glossary: [
          { term: "há / tem", translation: "hay" },
          { term: "na sala / na cozinha", translation: "en la sala / en la cocina" },
          { term: "em cima de", translation: "encima de" },
          { term: "debaixo de", translation: "debajo de" },
          { term: "ao lado de", translation: "al lado de" },
          { term: "confortável", translation: "comodo" },
          { term: "fica", translation: "queda / esta" },
          { term: "coisas", translation: "cosas" },
        ],
        keyPhrases: [
          "Cuenta los cuartos de la casa de la Rita.",
          "Fijate donde esta cada objeto (em cima, debaixo, ao lado).",
        ],
        check: [
          { prompt: "T1: Quantos quartos há na casa da Rita?", choices: ["Um", "Dois", "Três"], answer: 1 },
          { prompt: "T1: O que há na sala?", choices: ["Uma cama", "Um sofá e uma televisão", "Uma mesa"], answer: 1 },
          { prompt: "T1: A cozinha fica ao lado de quê?", choices: ["Do quarto", "Da sala", "Da casa de banho"], answer: 1 },
          { prompt: "T2: Onde está o café?", choices: ["Debaixo da mesa", "Em cima da mesa", "Na sala"], answer: 1 },
          { prompt: "T2: Onde está o gato?", choices: ["Em cima da cadeira", "Debaixo da cadeira", "No sofá"], answer: 1 },
          { prompt: "T2: Onde estão os livros?", choices: ["Em cima da estante", "Debaixo da mesa", "Ao lado do sofá"], answer: 0 },
        ],
      },
      activities: [],
    },

    {
      id: "pt5h-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: a casa e os móveis",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "quarto / sala", translation: "dormitorio / sala" },
        { term: "cozinha / banheiro", translation: "cocina / bano" },
        { term: "cama / sofá", translation: "cama / sofa" },
        { term: "mesa / cadeira", translation: "mesa / silla" },
        { term: "janela / porta", translation: "ventana / puerta" },
        { term: "há / tem", translation: "hay" },
        { term: "em cima de / debaixo de", translation: "encima de / debajo de" },
        { term: "ao lado de", translation: "al lado de" },
      ],
      activities: [
        {
          id: "pt5h-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "quarto", right: "dormitorio" },
            { left: "cozinha", right: "cocina" },
            { left: "sala", right: "sala" },
            { left: "cama", right: "cama" },
          ] },
        },
        {
          id: "pt5h-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "mesa", right: "mesa" },
            { left: "cadeira", right: "silla" },
            { left: "janela", right: "ventana" },
            { left: "porta", right: "puerta" },
          ] },
        },
        {
          id: "pt5h-vocab-a3", type: "cloze",
          prompt: "Completa: 'Na sala ___ um sofá.' (hay)",
          payload: { answer: "há" },
          explain: "'há' = hay.",
        },
        {
          id: "pt5h-vocab-a4", type: "cloze",
          prompt: "Completa: 'O café está em ___ da mesa.' (encima)",
          payload: { answer: "cima" },
          explain: "'em cima de' = encima de.",
        },
        {
          id: "pt5h-vocab-a5", type: "cloze",
          prompt: "Completa: 'O gato está ___ da cadeira.' (debajo)",
          payload: { answer: "debaixo" },
          explain: "'debaixo de' = debajo de.",
        },
        {
          id: "pt5h-vocab-a6", type: "multiple_choice",
          prompt: "Como dices 'cocina'?",
          payload: { choices: ["quarto", "cozinha", "sala"], answer: 1 },
          explain: "'cozinha' = cocina.",
        },
        {
          id: "pt5h-vocab-a7", type: "multiple_choice",
          prompt: "Que significa 'ao lado de'?",
          payload: { choices: ["encima de", "al lado de", "debajo de"], answer: 1 },
          explain: "'ao lado de' = al lado de.",
        },
        {
          id: "pt5h-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["quartos", "dois", "Há", "casa", "na"], answer: ["Há", "dois", "quartos", "na", "casa"] },
          explain: "'Há dois quartos na casa' = hay dos cuartos en la casa.",
        },
      ],
    },

    {
      id: "pt5h-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: 'há/tem' + preposições + 'estar'",
      intro: "Competencia de GRAMATICA. Aprende a decir que hay y donde estan las cosas.",
      grammar: {
        title: "Existência (há/tem) e lugar (estar)",
        chart: {
          title: "ESTAR + em",
          maps: "ESTAR + preposiciones",
          groups: [
            {
              label: "ESTAR (presente)", color: "amber",
              forms: [
                { form: "ESTOU", subjects: "eu" },
                { form: "ESTÁ", subjects: "você, ele, ela" },
                { form: "ESTAMOS", subjects: "nós" },
                { form: "ESTÃO", subjects: "vocês, eles, elas" },
              ],
            },
            {
              label: "em + artigo", color: "sky",
              forms: [
                { form: "NO", subjects: "em + o (no quarto)" },
                { form: "NA", subjects: "em + a (na sala)" },
              ],
            },
          ],
        },
        form: "*há* um sofá / o livro *está* *na* mesa",
        desc: "'há' y 'tem' = hay (existencia). 'estar' + em ubica cosas. em+o=no, em+a=na.",
        rule: "Para 'hay' usa 'há' o 'tem'. Para ubicar usa 'estar' + preposicion: em + o = no, em + a = na. Ej: 'O sofá está na sala', 'Há dois quartos'.",
        examples: ["Há um sofá na sala.", "A cama está no quarto.", "Os livros estão na mesa.", "Nós estamos em casa."],
        explain: { tr: ["Hay un sofa en la sala.", "La cama esta en el cuarto.", "Los libros estan en la mesa.", "Nosotros estamos en casa."] },
        mistakes: [
          { wrong: "A cama está em o quarto.", right: "A cama está no quarto." },
          { wrong: "O sofá está em a sala.", right: "O sofá está na sala." },
          { wrong: "Os livros está na mesa.", right: "Os livros estão na mesa." },
        ],
      },
      activities: [
        {
          id: "pt5h-gram-a1", type: "cloze",
          prompt: "Completa: 'A cama está ___ quarto.' (em + o)",
          payload: { answer: "no" },
          explain: "em + o = no.",
        },
        {
          id: "pt5h-gram-a2", type: "cloze",
          prompt: "Completa: 'O sofá está ___ sala.' (em + a)",
          payload: { answer: "na" },
          explain: "em + a = na.",
        },
        {
          id: "pt5h-gram-a3", type: "cloze",
          prompt: "Completa: '___ um sofá na sala.' (hay)",
          payload: { answer: "Há" },
          explain: "'há' = hay.",
        },
        {
          id: "pt5h-gram-a4", type: "cloze",
          prompt: "Completa: 'Os livros ___ na mesa.' (estan)",
          payload: { answer: "estão" },
          explain: "Con 'os livros' (ellos) -> estão.",
        },
        {
          id: "pt5h-gram-a5", type: "multiple_choice",
          prompt: "Escolha a frase correta:",
          payload: { choices: ["A cama está em o quarto.", "A cama está no quarto.", "A cama está na quarto."], answer: 1 },
          explain: "em + o (quarto) = no.",
        },
        {
          id: "pt5h-gram-a6", type: "multiple_choice",
          prompt: "Escolha a frase correta:",
          payload: { choices: ["Nós estão em casa.", "Nós estamos em casa.", "Nós está em casa."], answer: 1 },
          explain: "Con 'nós' -> estamos.",
        },
        {
          id: "pt5h-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["quarto", "cama", "A", "no", "está"], answer: ["A", "cama", "está", "no", "quarto"] },
          explain: "Orden: A cama + está + no + quarto.",
        },
        {
          id: "pt5h-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["sala", "sofá", "Há", "na", "um"], answer: ["Há", "um", "sofá", "na", "sala"] },
          explain: "'Há um sofá na sala.'",
        },
      ],
    },

    {
      id: "pt5h-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: descreve a tua casa",
      intro: "Competencia de ESCRITURA. Describe tu casa, frase por frase.",
      activities: [
        {
          id: "pt5h-write-a1", type: "word_bank",
          prompt: "1. Di cuantos cuartos hay:",
          payload: { words: ["quartos", "dois", "Há"], answer: ["Há", "dois", "quartos"] },
        },
        {
          id: "pt5h-write-a2", type: "word_bank",
          prompt: "2. Di que hay en la sala:",
          payload: { words: ["um", "Na", "sala", "sofá", "há"], answer: ["Na", "sala", "há", "um", "sofá"] },
        },
        {
          id: "pt5h-write-a3", type: "word_bank",
          prompt: "3. Ubica la cama:",
          payload: { words: ["no", "está", "cama", "A", "quarto"], answer: ["A", "cama", "está", "no", "quarto"] },
        },
        {
          id: "pt5h-write-a4", type: "word_bank",
          prompt: "4. Ubica un objeto encima de la mesa:",
          payload: { words: ["mesa", "em cima", "café", "O", "da", "está"], answer: ["O", "café", "está", "em cima", "da", "mesa"] },
        },
        {
          id: "pt5h-write-a5", type: "multiple_choice",
          prompt: "5. Como dices 'la cama esta en el cuarto'?",
          payload: { choices: ["A cama está em o quarto.", "A cama está no quarto.", "A cama está na quarto."], answer: 1 },
        },
        {
          id: "pt5h-write-a6", type: "multiple_choice",
          prompt: "6. Cual es correcto para 'en la sala'?",
          payload: { choices: ["em a sala", "na sala", "no sala"], answer: 1 },
        },
        {
          id: "pt5h-write-a7", type: "multiple_choice",
          prompt: "7. Como dices 'hay dos cuartos'?",
          payload: { choices: ["Há dois quartos.", "Está dois quartos.", "São dois quartos."], answer: 0 },
        },
        {
          id: "pt5h-write-a8", type: "multiple_choice",
          prompt: "8. Cual frase es correcta?",
          payload: { choices: ["Os livros estão na mesa.", "Os livros está na mesa.", "Os livros estou na mesa."], answer: 0 },
        },
      ],
    },
  ],
};
