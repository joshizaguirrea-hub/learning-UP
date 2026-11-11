/**
 * data/units/pt15-trabalho.js — Unidade A2 pt-BR "O trabalho" ('há' +
 * presente para duração + vocabulario de profissões).
 *
 * Dados PUROS. term = portugues (meta), translation = espanhol (L1 do aluno).
 */

export const PT15_TRABALHO = {
  id: "pt15-trabalho",
  language: "pt",
  level: "A2",
  title: "O trabalho",
  subtitle: "'Há' + presente para decir desde cuando haces algo + vocabulario de profesiones",

  cando: [
    "Puedo hablar de mi profesion y mi lugar de trabajo.",
    "Puedo usar 'há' + tiempo con el PRESENTE para decir desde cuando hago algo.",
    "Puedo usar vocabulario de profesiones comunes.",
    "Puedo participar en una entrevista de trabajo basica.",
  ],

  vocab: [
    { id: "pt15t-1", term: "o trabalho", translation: "el trabajo", example: "Meu trabalho é interessante." },
    { id: "pt15t-2", term: "o funcionário/a", translation: "el empleado/a", example: "Sou funcionária de um banco." },
    { id: "pt15t-3", term: "o professor/a", translation: "el profesor/a", example: "Trabalho como professora." },
    { id: "pt15t-4", term: "o cozinheiro/a", translation: "el/la cocinero/a", example: "Meu irmão é cozinheiro." },
    { id: "pt15t-5", term: "o enfermeiro/a", translation: "el/la enfermero/a", example: "Ela é enfermeira no hospital." },
    { id: "pt15t-6", term: "o escritório", translation: "la oficina", example: "Vou ao escritório todos os dias." },
    { id: "pt15t-7", term: "o salário", translation: "el salario", example: "O salário não é alto, mas gosto do trabalho." },
    { id: "pt15t-8", term: "trabalho aqui há...", translation: "trabajo aqui desde hace...", example: "Trabalho aqui há três anos." },
    { id: "pt15t-9", term: "candidatar-se", translation: "postularse (a una vacante)", example: "Me candidatei para a vaga." },
    { id: "pt15t-10", term: "a entrevista", translation: "la entrevista", example: "Amanhã tenho uma entrevista de emprego." },
    { id: "pt15t-11", term: "a experiência", translation: "la experiencia", example: "Tenho experiência nessa área." },
    { id: "pt15t-12", term: "contratar", translation: "contratar", example: "A empresa quer contratar novos funcionários." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "pt15t-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: o meu trabalho",
      intro: "Competencia de LECTURA. Lee DOS textos en portugues y responde las preguntas.",
      content: {
        reading:
          "TEXTO 1 - O trabalho da Sofia\n" +
          "Sou funcionária de uma empresa de moda há dois anos. Trabalho no escritório de segunda a sexta. " +
          "Meu salário não é altíssimo, mas gosto muito do meu trabalho porque tenho bons colegas. No " +
          "próximo ano espero conseguir uma promoção. Tenho muita experiência nessa área, desde que comecei " +
          "há cinco anos.\n\n" +
          "TEXTO 2 - Uma entrevista de emprego\n" +
          "A: Há quanto tempo você trabalha na área? B: Trabalho como enfermeira há seis anos. A: Que " +
          "experiência você tem? B: Trabalhei em dois hospitais diferentes. A: Por que você quer trabalhar " +
          "aqui? B: Porque quero novos desafios e o hospital de vocês tem uma ótima reputação. A: Obrigado, " +
          "entraremos em contato em breve.",
        glossary: [
          { term: "funcionário/a", translation: "empleado/a" },
          { term: "há dois anos", translation: "desde hace dos anos" },
          { term: "o salário", translation: "el salario" },
          { term: "a entrevista", translation: "la entrevista" },
          { term: "há quanto tempo...?", translation: "desde hace cuanto tiempo...?" },
          { term: "a experiência", translation: "la experiencia" },
          { term: "contratar", translation: "contratar" },
          { term: "entraremos em contato", translation: "nos pondremos en contacto" },
        ],
        keyPhrases: [
          "'Há' + periodo + PRESENTE (no pasado) indica desde cuando algo pasa y SIGUE pasando: 'Trabalho aqui há três anos'.",
          "'Há quanto tempo...?' = desde hace cuanto tiempo...? (para preguntar).",
        ],
        check: [
          { prompt: "T1: Há quanto tempo Sofia trabalha na empresa?", choices: ["Há dois anos", "Há cinco anos", "Há um ano"], answer: 0 },
          { prompt: "T1: Como são os colegas de Sofia?", choices: ["Bons", "Difíceis", "Poucos"], answer: 0 },
          { prompt: "T1: Desde quando ela tem experiência na área?", choices: ["Há cinco anos", "Há dois anos", "Há um mês"], answer: 0 },
          { prompt: "T2: Há quanto tempo B trabalha como enfermeira?", choices: ["Há seis anos", "Há dois anos", "Há um ano"], answer: 0 },
          { prompt: "T2: Em quantos hospitais ela trabalhou?", choices: ["Em dois", "Em três", "Em um"], answer: 0 },
          { prompt: "T2: Por que ela quer trabalhar lá?", choices: ["Quer novos desafios", "Quer mais dinheiro", "Quer menos horas"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "pt15t-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: as profissões",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "o trabalho / o funcionário", translation: "el trabajo / el empleado" },
        { term: "o professor / o cozinheiro", translation: "el profesor / el cocinero" },
        { term: "o enfermeiro", translation: "el enfermero" },
        { term: "o escritório / o salário", translation: "la oficina / el salario" },
        { term: "trabalho aqui há...", translation: "trabajo aqui desde hace..." },
        { term: "a entrevista", translation: "la entrevista" },
        { term: "a experiência", translation: "la experiencia" },
        { term: "contratar", translation: "contratar" },
      ],
      activities: [
        {
          id: "pt15t-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "o trabalho", right: "el trabajo" },
            { left: "o funcionário", right: "el empleado" },
            { left: "o professor", right: "el profesor" },
            { left: "o cozinheiro", right: "el cocinero" },
          ] },
        },
        {
          id: "pt15t-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "o enfermeiro", right: "el enfermero" },
            { left: "o escritório", right: "la oficina" },
            { left: "o salário", right: "el salario" },
            { left: "a entrevista", right: "la entrevista" },
          ] },
        },
        {
          id: "pt15t-vocab-a3", type: "cloze",
          prompt: "Completa: 'Trabalho aqui ___ três anos.' (desde hace)",
          payload: { answer: "há" },
          explain: "'há' + periodo = desde hace.",
        },
        {
          id: "pt15t-vocab-a4", type: "cloze",
          prompt: "Completa: 'Me ___ para a vaga.' (postularse)",
          payload: { answer: "candidatei" },
          explain: "'candidatar-se' = postularse.",
        },
        {
          id: "pt15t-vocab-a5", type: "cloze",
          prompt: "Completa: 'Amanhã tenho uma ___ de emprego.' (entrevista)",
          payload: { answer: "entrevista" },
          explain: "'a entrevista' = la entrevista.",
        },
        {
          id: "pt15t-vocab-a6", type: "multiple_choice",
          prompt: "O que significa 'há quanto tempo'?",
          payload: { choices: ["a que hora", "desde hace cuanto tiempo", "cuanto cuesta"], answer: 1 },
          explain: "'há quanto tempo' = desde hace cuanto tiempo.",
        },
        {
          id: "pt15t-vocab-a7", type: "multiple_choice",
          prompt: "Como se diz 'tengo experiencia'?",
          payload: { choices: ["Tenho experiência.", "Sou experiência.", "Faço experiência."], answer: 0 },
          explain: "'ter experiência' = tener experiencia.",
        },
        {
          id: "pt15t-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["três", "Trabalho", "anos", "aqui", "há"], answer: ["Trabalho", "aqui", "há", "três", "anos"] },
          explain: "'Trabalho aqui há três anos'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "pt15t-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: 'há' + presente",
      intro: "Competencia de GRAMATICA. Aprende a decir desde cuando haces algo (presente, no pasado).",
      grammar: {
        title: "'Há' + presente (duracion que continua)",
        chart: {
          title: "HÁ + PRESENTE",
          maps: "presente + HÁ + periodo",
          groups: [
            {
              label: "ESTRUTURA", color: "rose",
              forms: [
                { form: "TRABALHO + HÁ + TRÊS ANOS", subjects: "trabajo desde hace 3 anos" },
                { form: "ESTUDO + HÁ + SEIS MESES", subjects: "estudio desde hace 6 meses" },
              ],
            },
            {
              label: "PERGUNTA", color: "green",
              forms: [
                { form: "HÁ QUANTO TEMPO + presente...?", subjects: "desde hace cuanto tiempo...?" },
              ],
            },
          ],
        },
        form: "[presente] + HÁ + [periodo de tiempo] (NO pasado)",
        desc: "Cuando algo empezo en el pasado pero SIGUE pasando ahora, el portugues usa el PRESENTE + 'há' + el periodo de tiempo. Es un error comun del hispanohablante usar el pasado aqui; en portugues para una accion que CONTINUA debe ir en PRESENTE: 'trabalho há três anos' (no 'trabalhei há três anos').",
        rule: "Formula: [presente] + HÁ + [periodo]. 'Trabalho aqui há três anos' (trabajo aqui desde hace tres anos, y sigo). Con FECHA EXACTA se usa 'desde', no 'há': 'Moro em São Paulo desde 2015'. Con DURACION se usa 'há': 'moro aqui há 5 anos'. Pregunta: 'Há quanto tempo + presente + ...?'.",
        examples: ["Trabalho aqui há três anos.", "Estudo português há seis meses.", "Moro em São Paulo desde 2015.", "Há quanto tempo você conhece o Marcos?"],
        explain: { tr: ["Trabajo aqui desde hace tres anos.", "Estudio portugues desde hace seis meses.", "Vivo en Sao Paulo desde 2015.", "Desde hace cuanto tiempo conoces a Marcos?"] },
        mistakes: [
          { wrong: "Trabalhei aqui há três anos.", right: "Trabalho aqui há três anos." },
          { wrong: "Trabalho aqui para três anos.", right: "Trabalho aqui há três anos." },
          { wrong: "Há quanto tempo você trabalhou aqui?", right: "Há quanto tempo você trabalha aqui?" },
        ],
      },
      activities: [
        {
          id: "pt15t-gram-a1", type: "cloze",
          prompt: "Completa (eu, presente): '___ português há seis meses.' (estudar)",
          payload: { answer: "Estudo" },
          explain: "Presente, no pasado: 'estudo'.",
        },
        {
          id: "pt15t-gram-a2", type: "cloze",
          prompt: "Completa: 'Moro em São Paulo ___ 2015.' (desde)",
          payload: { answer: "desde" },
          explain: "Con fecha exacta: 'desde'.",
        },
        {
          id: "pt15t-gram-a3", type: "cloze",
          prompt: "Completa: 'Há quanto tempo você ___ o Marcos?' (conhecer, presente)",
          payload: { answer: "conhece" },
          explain: "Presente: 'conhece'.",
        },
        {
          id: "pt15t-gram-a4", type: "multiple_choice",
          prompt: "Qual é correto para 'trabajo aqui desde hace 3 anos'?",
          payload: { choices: ["Trabalhei aqui há três anos.", "Trabalho aqui há três anos.", "Trabalhava aqui há três anos."], answer: 1 },
          explain: "Accion que continua -> presente.",
        },
        {
          id: "pt15t-gram-a5", type: "multiple_choice",
          prompt: "Que tempo verbal se usa com 'há + periodo' se a ação continua?",
          payload: { choices: ["passado", "presente", "futuro"], answer: 1 },
          explain: "Siempre presente si la accion continua.",
        },
        {
          id: "pt15t-gram-a6", type: "multiple_choice",
          prompt: "Escolha a frase correta:",
          payload: { choices: ["Estudo aqui para três anos.", "Estudo aqui há três anos.", "Estudei aqui há três anos."], answer: 1 },
          explain: "'há', no 'para', con presente.",
        },
        {
          id: "pt15t-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["seis", "Estudo", "meses", "há", "português"], answer: ["Estudo", "português", "há", "seis", "meses"] },
          explain: "'Estudo português há seis meses'.",
        },
        {
          id: "pt15t-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["tempo", "Há", "aqui", "trabalha", "quanto", "você"], answer: ["Há", "quanto", "tempo", "você", "trabalha", "aqui"] },
          explain: "'Há quanto tempo você trabalha aqui?'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "pt15t-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: a entrevista",
      intro: "Competencia de ESCRITURA. Responde en una entrevista de trabajo, frase por frase.",
      activities: [
        {
          id: "pt15t-write-a1", type: "word_bank",
          prompt: "1. Di que trabajas aqui desde hace 2 anos:",
          payload: { words: ["dois", "Trabalho", "anos", "aqui", "há"], answer: ["Trabalho", "aqui", "há", "dois", "anos"] },
        },
        {
          id: "pt15t-write-a2", type: "word_bank",
          prompt: "2. Di que tienes experiencia:",
          payload: { words: ["experiência", "Tenho"], answer: ["Tenho", "experiência"] },
        },
        {
          id: "pt15t-write-a3", type: "word_bank",
          prompt: "3. Di que manana tienes una entrevista:",
          payload: { words: ["uma", "Amanhã", "entrevista", "tenho"], answer: ["Amanhã", "tenho", "uma", "entrevista"] },
        },
        {
          id: "pt15t-write-a4", type: "word_bank",
          prompt: "4. Pregunta desde hace cuanto tiempo trabaja (voce):",
          payload: { words: ["tempo", "Há", "trabalha", "quanto", "você"], answer: ["Há", "quanto", "tempo", "você", "trabalha"] },
        },
        {
          id: "pt15t-write-a5", type: "word_bank",
          prompt: "5. Di que vives en São Paulo desde 2015:",
          payload: { words: ["desde", "Moro", "2015", "em", "Paulo", "São"], answer: ["Moro", "em", "São", "Paulo", "desde", "2015"] },
        },
        {
          id: "pt15t-write-a6", type: "multiple_choice",
          prompt: "6. 'Há dois anos' (con accion que continua) significa:",
          payload: { choices: ["hace dos anos (ya termino)", "desde hace dos anos (continua)", "en dos anos"], answer: 1 },
        },
        {
          id: "pt15t-write-a7", type: "multiple_choice",
          prompt: "7. Qual é correto?",
          payload: { choices: ["Trabalhei aqui há dois anos.", "Trabalho aqui há dois anos.", "Trabalhava aqui há dois anos."], answer: 1 },
        },
        {
          id: "pt15t-write-a8", type: "multiple_choice",
          prompt: "8. 'A entrevista' significa:",
          payload: { choices: ["el salario", "la entrevista", "la oficina"], answer: 1 },
        },
      ],
    },
  ],
};
