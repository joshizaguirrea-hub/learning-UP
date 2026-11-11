/**
 * data/units/pt9-fimdesemana.js — Unidade A2 pt-BR "O fim de semana passado"
 * (preterito perfeito de verbos -ER/-IR + irregulares ir/fazer/estar).
 *
 * Dados PUROS. term = portugues (meta), translation = espanhol (L1 do aluno).
 *
 * POR QUE este tema primeiro em A2: em A1 (pt8-ontem) o aluno so viu o
 * preterito perfeito de verbos -AR. O salto estrutural mais importante de A2
 * e extender a verbos -ER/-IR e aos irregulares mais frequentes (ir, fazer,
 * estar) -- ao contrario do italiano, o portugues NAO tem um sistema de dois
 * auxiliares (essere/avere): e sempre uma forma conjugada SIMPLES.
 */

export const PT9_FIMDESEMANA = {
  id: "pt9-fimdesemana",
  language: "pt",
  level: "A2",
  title: "O fim de semana passado",
  subtitle: "Preterito perfeito de verbos -ER/-IR + irregulares (ir, fazer, estar)",

  cando: [
    "Puedo conjugar verbos regulares -er e -ir en preterito perfeito.",
    "Puedo usar los verbos irregulares mas comunes en preterito: ir (fui), fazer (fiz), estar (estive).",
    "Puedo contar que comi, bebi, vi o hice el fin de semana pasado.",
    "Puedo narrar una secuencia de eventos pasados combinando -ar/-er/-ir.",
  ],

  vocab: [
    { id: "pt9f-1", term: "comer (comi)", translation: "comer (comi)", example: "Comi pizza no sábado." },
    { id: "pt9f-2", term: "beber (bebi)", translation: "beber (bebi)", example: "Bebi suco de laranja." },
    { id: "pt9f-3", term: "ver (vi)", translation: "ver (vi)", example: "Vi um filme ótimo." },
    { id: "pt9f-4", term: "ler (li)", translation: "leer (lei)", example: "Li um livro interessante." },
    { id: "pt9f-5", term: "sair (saí)", translation: "salir (salí)", example: "Saí com os amigos." },
    { id: "pt9f-6", term: "assistir (assisti)", translation: "ver/asistir (asistí)", example: "Assisti a um jogo de futebol." },
    { id: "pt9f-7", term: "ir (fui)", translation: "ir (fui)", example: "Fui à praia." },
    { id: "pt9f-8", term: "fazer (fiz)", translation: "hacer (hice)", example: "Fiz um bolo." },
    { id: "pt9f-9", term: "estar (estive)", translation: "estar (estuve)", example: "Estive em casa o dia todo." },
    { id: "pt9f-10", term: "o fim de semana passado", translation: "el fin de semana pasado", example: "O fim de semana passado foi ótimo." },
    { id: "pt9f-11", term: "com os amigos", translation: "con los amigos", example: "Saí com os amigos." },
    { id: "pt9f-12", term: "que dia bom!", translation: "que buen dia!", example: "Que dia bom!" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "pt9f-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: o que você fez no fim de semana?",
      intro: "Competencia de LECTURA. Lee DOS textos en portugues y responde las preguntas.",
      content: {
        reading:
          "TEXTO 1 - O fim de semana da Carla\n" +
          "No sábado, fui à praia com a minha família. Comemos num restaurante perto do mar e bebemos suco " +
          "de frutas. À tarde, vi um filme na praia com meus amigos. No domingo, fiz compras de manhã e à " +
          "noite assisti a um jogo de futebol na TV. Foi um fim de semana ótimo!\n\n" +
          "TEXTO 2 - Uma conversa\n" +
          "A: O que você fez no fim de semana? B: Saí com os amigos no sábado e fomos ao cinema. A: Que " +
          "filme vocês viram? B: Vimos um filme de ação, foi muito bom! E você, o que fez? A: Eu estive em " +
          "casa, li um livro e fiz um bolo de chocolate. B: Que delícia!",
        glossary: [
          { term: "fui / comemos / bebemos", translation: "fui / comimos / bebimos" },
          { term: "vi / vimos", translation: "vi / vimos" },
          { term: "fiz / li", translation: "hice / lei" },
          { term: "estive / saí", translation: "estuve / salí" },
          { term: "assisti a", translation: "vi/asisti a (un evento)" },
          { term: "o que você fez?", translation: "que hiciste?" },
          { term: "foi ótimo!", translation: "fue genial!" },
          { term: "que delícia!", translation: "que rico!" },
        ],
        keyPhrases: [
          "Verbos -ER (comer, beber, ver, ler) en preterito: -i, -eu, -emos, -eram (eu comi, ele comeu).",
          "Verbos irregulares clave: ir->fui, fazer->fiz, estar->estive, ter->tive.",
        ],
        check: [
          { prompt: "T1: Onde foi Carla no sábado?", choices: ["A praia", "A cidade", "A casa da avó"], answer: 0 },
          { prompt: "T1: O que a família bebeu?", choices: ["Suco de frutas", "Água", "Refrigerante"], answer: 0 },
          { prompt: "T1: O que Carla fez no domingo de manhã?", choices: ["Fez compras", "Assistiu TV", "Foi à praia"], answer: 0 },
          { prompt: "T2: Onde foram B e os amigos?", choices: ["Ao cinema", "A praia", "Ao restaurante"], answer: 0 },
          { prompt: "T2: Que tipo de filme viram?", choices: ["De ação", "De terror", "De comédia"], answer: 0 },
          { prompt: "T2: O que A fez no fim de semana?", choices: ["Ficou em casa, leu e fez um bolo", "Saiu com amigos", "Foi ao cinema"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "pt9f-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: o passado (-er/-ir)",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "comer / comi", translation: "comer / comi" },
        { term: "beber / bebi", translation: "beber / bebi" },
        { term: "ver / vi", translation: "ver / vi" },
        { term: "ler / li", translation: "leer / leí" },
        { term: "sair / saí", translation: "salir / salí" },
        { term: "ir / fui", translation: "ir / fui" },
        { term: "fazer / fiz", translation: "hacer / hice" },
        { term: "estar / estive", translation: "estar / estuve" },
      ],
      activities: [
        {
          id: "pt9f-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "comer", right: "comer" },
            { left: "beber", right: "beber" },
            { left: "ver", right: "ver" },
            { left: "ler", right: "leer" },
          ] },
        },
        {
          id: "pt9f-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "sair", right: "salir" },
            { left: "ir", right: "ir" },
            { left: "fazer", right: "hacer" },
            { left: "estar", right: "estar" },
          ] },
        },
        {
          id: "pt9f-vocab-a3", type: "cloze",
          prompt: "Completa (eu): 'Eu ___ pizza ontem.' (comer, pasado)",
          payload: { answer: "comi" },
          explain: "comer -> eu comi.",
        },
        {
          id: "pt9f-vocab-a4", type: "cloze",
          prompt: "Completa (eu): 'Eu ___ à praia.' (ir, pasado)",
          payload: { answer: "fui" },
          explain: "ir -> eu fui (irregular).",
        },
        {
          id: "pt9f-vocab-a5", type: "cloze",
          prompt: "Completa (eu): 'Eu ___ um bolo.' (fazer, pasado)",
          payload: { answer: "fiz" },
          explain: "fazer -> eu fiz (irregular).",
        },
        {
          id: "pt9f-vocab-a6", type: "multiple_choice",
          prompt: "Como se diz 'yo estuve en casa'?",
          payload: { choices: ["Eu estou em casa.", "Eu estive em casa.", "Eu esteve em casa."], answer: 1 },
          explain: "estar -> eu estive (irregular).",
        },
        {
          id: "pt9f-vocab-a7", type: "multiple_choice",
          prompt: "Qual é o pretérito de 'ver' para 'eu'?",
          payload: { choices: ["vi", "vejo", "via"], answer: 0 },
          explain: "ver -> eu vi (irregular curto).",
        },
        {
          id: "pt9f-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["à", "Eu", "praia", "fui"], answer: ["Eu", "fui", "à", "praia"] },
          explain: "'Eu fui à praia'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "pt9f-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: pretérito -er/-ir e irregulares",
      intro: "Competencia de GRAMATICA. Conjuga -er/-ir en preterito y memoriza los irregulares clave.",
      grammar: {
        title: "Pretérito perfeito: verbos -ER / -IR e irregulares",
        chart: {
          title: "PRETÉRITO -ER / -IR",
          maps: "pasado (comi, parti...)",
          groups: [
            {
              label: "VERBOS -ER", color: "rose",
              forms: [
                { form: "COMER -> COMI/COMEU/COMEMOS/COMERAM", subjects: "eu/você/nós/eles" },
              ],
            },
            {
              label: "VERBOS -IR", color: "amber",
              forms: [
                { form: "PARTIR -> PARTI/PARTIU/PARTIMOS/PARTIRAM", subjects: "eu/você/nós/eles" },
              ],
            },
            {
              label: "IRREGULARES", color: "green",
              forms: [
                { form: "IR / SER -> FUI", subjects: "(mismas formas!)" },
                { form: "FAZER -> FIZ", subjects: "estar -> ESTIVE" },
              ],
            },
          ],
        },
        form: "eu -i, você/ele -eu/-iu, nós -emos/-imos, eles -eram/-iram",
        desc: "Los verbos -ER y -IR siguen un patron parecido al de -AR pero con sus propias terminaciones. Ademas, varios verbos muy frecuentes son irregulares en el preterito: 'ir' y 'ser' comparten las MISMAS formas (fui, foi, fomos, foram) -- se distinguen por el contexto. 'Fazer' -> fiz, 'estar' -> estive, 'ter' -> tive.",
        rule: "Pretérito -ER (comer): eu comi, você/ele comeu, nós comemos, eles comeram. Pretérito -IR (partir): eu parti, você/ele partiu, nós partimos, eles partiram. Irregulares: ir/ser -> fui/foi/fomos/foram; fazer -> fiz/fez/fizemos/fizeram; estar -> estive/esteve/estivemos/estiveram.",
        examples: ["Eu comi pizza.", "Ela foi ao cinema.", "Nós fizemos um bolo.", "Eles estiveram em casa."],
        explain: { tr: ["Yo comí pizza.", "Ella fue al cine.", "Nosotros hicimos un pastel.", "Ellos estuvieron en casa."] },
        mistakes: [
          { wrong: "Eu foi ao cinema.", right: "Eu fui ao cinema." },
          { wrong: "Ela fazeu um bolo.", right: "Ela fez um bolo." },
          { wrong: "Eles estar em casa ontem.", right: "Eles estiveram em casa ontem." },
        ],
      },
      activities: [
        {
          id: "pt9f-gram-a1", type: "cloze",
          prompt: "Completa: 'Ela ___ ao cinema.' (ir, pasado)",
          payload: { answer: "foi" },
          explain: "ir -> ela foi.",
        },
        {
          id: "pt9f-gram-a2", type: "cloze",
          prompt: "Completa: 'Nós ___ um bolo.' (fazer, pasado)",
          payload: { answer: "fizemos" },
          explain: "fazer -> nós fizemos.",
        },
        {
          id: "pt9f-gram-a3", type: "cloze",
          prompt: "Completa: 'Eles ___ em casa.' (estar, pasado)",
          payload: { answer: "estiveram" },
          explain: "estar -> eles estiveram.",
        },
        {
          id: "pt9f-gram-a4", type: "multiple_choice",
          prompt: "Qual é o pretérito de 'comer' para 'ele'?",
          payload: { choices: ["comeu", "comi", "comem"], answer: 0 },
          explain: "comer -> ele comeu.",
        },
        {
          id: "pt9f-gram-a5", type: "multiple_choice",
          prompt: "Qual é o pretérito de 'partir' para 'eu'?",
          payload: { choices: ["parti", "partiu", "partimos"], answer: 0 },
          explain: "partir -> eu parti.",
        },
        {
          id: "pt9f-gram-a6", type: "multiple_choice",
          prompt: "Escolha a frase correta:",
          payload: { choices: ["Eu foi à praia.", "Eu fui à praia.", "Eu fomos à praia."], answer: 1 },
          explain: "'eu' + ir (pasado) -> fui.",
        },
        {
          id: "pt9f-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["um", "Nós", "bolo", "fizemos"], answer: ["Nós", "fizemos", "um", "bolo"] },
          explain: "'Nós fizemos um bolo'.",
        },
        {
          id: "pt9f-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["em", "Eles", "casa", "estiveram"], answer: ["Eles", "estiveram", "em", "casa"] },
          explain: "'Eles estiveram em casa'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "pt9f-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: o seu fim de semana",
      intro: "Competencia de ESCRITURA. Cuenta tu fin de semana, frase por frase.",
      activities: [
        {
          id: "pt9f-write-a1", type: "word_bank",
          prompt: "1. Di que comiste pizza:",
          payload: { words: ["pizza", "Eu", "comi"], answer: ["Eu", "comi", "pizza"] },
        },
        {
          id: "pt9f-write-a2", type: "word_bank",
          prompt: "2. Di que fuiste a la playa:",
          payload: { words: ["à", "Eu", "praia", "fui"], answer: ["Eu", "fui", "à", "praia"] },
        },
        {
          id: "pt9f-write-a3", type: "word_bank",
          prompt: "3. Di que ella hizo un pastel:",
          payload: { words: ["um", "Ela", "bolo", "fez"], answer: ["Ela", "fez", "um", "bolo"] },
        },
        {
          id: "pt9f-write-a4", type: "word_bank",
          prompt: "4. Di que ellos estuvieron en casa:",
          payload: { words: ["em", "Eles", "casa", "estiveram"], answer: ["Eles", "estiveram", "em", "casa"] },
        },
        {
          id: "pt9f-write-a5", type: "word_bank",
          prompt: "5. Pregunta que hizo (voce, informal):",
          payload: { words: ["fez", "O", "voce", "que"], answer: ["O", "que", "voce", "fez"] },
        },
        {
          id: "pt9f-write-a6", type: "multiple_choice",
          prompt: "6. O pretérito de 'ver' para 'eu' é:",
          payload: { choices: ["vi", "vejo", "via"], answer: 0 },
        },
        {
          id: "pt9f-write-a7", type: "multiple_choice",
          prompt: "7. Qual é correto?",
          payload: { choices: ["Eu fazi um bolo.", "Eu fiz um bolo.", "Eu fazeu um bolo."], answer: 1 },
        },
        {
          id: "pt9f-write-a8", type: "multiple_choice",
          prompt: "8. 'Estivemos em casa' significa:",
          payload: { choices: ["Estaremos en casa", "Estuvimos en casa", "Estamos en casa"], answer: 1 },
        },
      ],
    },
  ],
};
