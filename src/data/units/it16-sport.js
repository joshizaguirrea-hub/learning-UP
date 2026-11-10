/**
 * data/units/it16-sport.js — Unita A2 italiano "Tempo libero e sport"
 * (avverbi di frequenza: sempre, spesso, qualche volta, raramente, mai).
 *
 * Dati PURI. term = italiano (meta), translation = spagnolo (L1 dello studente).
 */

export const IT16_SPORT = {
  id: "it16-sport",
  language: "it",
  level: "A2",
  title: "Tempo libero e sport",
  subtitle: "Adverbios de frecuencia (sempre, spesso, qualche volta, raramente, mai) + deportes",

  cando: [
    "Puedo hablar de deportes y actividades de tiempo libre que me gustan.",
    "Puedo usar adverbios de frecuencia (sempre, spesso, qualche volta, mai, raramente).",
    "Puedo usar 'piacere' con infinitivo para decir que me gusta hacer algo.",
    "Puedo preguntar con que frecuencia alguien hace algo.",
  ],

  vocab: [
    { id: "it16s-1", term: "giocare a calcio", translation: "jugar futbol", example: "Gioco a calcio ogni domenica." },
    { id: "it16s-2", term: "fare sport", translation: "hacer deporte", example: "Faccio sport tre volte a settimana." },
    { id: "it16s-3", term: "nuotare", translation: "nadar", example: "Mi piace nuotare in piscina." },
    { id: "it16s-4", term: "correre", translation: "correr", example: "Corro nel parco la mattina." },
    { id: "it16s-5", term: "sempre", translation: "siempre", example: "Vado sempre in palestra." },
    { id: "it16s-6", term: "spesso", translation: "a menudo", example: "Gioco spesso a tennis." },
    { id: "it16s-7", term: "qualche volta", translation: "a veces", example: "Qualche volta guardo le partite in TV." },
    { id: "it16s-8", term: "raramente", translation: "raras veces", example: "Raramente faccio yoga." },
    { id: "it16s-9", term: "mai", translation: "nunca", example: "Non vado mai in piscina d'inverno." },
    { id: "it16s-10", term: "la palestra", translation: "el gimnasio", example: "Vado in palestra due volte a settimana." },
    { id: "it16s-11", term: "la partita", translation: "el partido", example: "Ho visto una partita di calcio." },
    { id: "it16s-12", term: "l'allenamento", translation: "el entrenamiento", example: "L'allenamento e alle sei." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "it16s-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: il tempo libero",
      intro: "Competencia de LECTURA. Lee DOS textos en italiano y responde las preguntas.",
      content: {
        reading:
          "TESTO 1 - Il tempo libero di Luca\n" +
          "Mi piace molto fare sport. Gioco sempre a calcio la domenica con i miei amici e vado spesso in " +
          "palestra, circa tre volte a settimana. Qualche volta corro nel parco la mattina presto. Non mi " +
          "piace nuotare, quindi non vado mai in piscina. Il mio sport preferito e il calcio, ma mi piace " +
          "anche guardare le partite di tennis in TV.\n\n" +
          "TESTO 2 - Un'intervista\n" +
          "A: Quanto spesso fai sport? B: Faccio sport quasi ogni giorno. Vado in palestra tre volte a " +
          "settimana e corro due volte. A: Ti piace nuotare? B: Si, mi piace molto, ma raramente vado in " +
          "piscina perche non ho tempo. A: E il tuo sport preferito? B: Sicuramente il calcio, gioco sempre " +
          "con la mia squadra il sabato.",
        glossary: [
          { term: "sempre / spesso", translation: "siempre / a menudo" },
          { term: "qualche volta / raramente", translation: "a veces / raras veces" },
          { term: "mai", translation: "nunca" },
          { term: "fare sport", translation: "hacer deporte" },
          { term: "la palestra", translation: "el gimnasio" },
          { term: "la partita", translation: "el partido" },
          { term: "quanto spesso...?", translation: "con que frecuencia...?" },
          { term: "la squadra", translation: "el equipo" },
        ],
        keyPhrases: [
          "Los adverbios de frecuencia (sempre, spesso, qualche volta, raramente, mai) suelen ir DESPUES del verbo: 'Vado sempre', 'Non vado mai'.",
          "'Mai' necesita 'non' antes del verbo: 'Non vado mai' (doble negacion, igual que 'non...mai' con el pasado).",
        ],
        check: [
          { prompt: "T1: Quando gioca a calcio Luca?", choices: ["La domenica", "Il sabato", "Ogni giorno"], answer: 0 },
          { prompt: "T1: Quante volte a settimana va in palestra?", choices: ["Circa tre volte", "Una volta", "Cinque volte"], answer: 0 },
          { prompt: "T1: Perche non va mai in piscina?", choices: ["Non gli piace nuotare", "Non ha tempo", "E troppo caro"], answer: 0 },
          { prompt: "T2: Quante volte a settimana corre B?", choices: ["Due volte", "Tre volte", "Una volta"], answer: 0 },
          { prompt: "T2: Perche B va raramente in piscina?", choices: ["Non ha tempo", "Non gli piace", "E lontano"], answer: 0 },
          { prompt: "T2: Qual e lo sport preferito di B?", choices: ["Il calcio", "Il tennis", "Il nuoto"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "it16s-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: lo sport",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "giocare a calcio / fare sport", translation: "jugar futbol / hacer deporte" },
        { term: "nuotare / correre", translation: "nadar / correr" },
        { term: "sempre / spesso", translation: "siempre / a menudo" },
        { term: "qualche volta / raramente", translation: "a veces / raras veces" },
        { term: "mai", translation: "nunca" },
        { term: "la palestra", translation: "el gimnasio" },
        { term: "la partita", translation: "el partido" },
        { term: "l'allenamento", translation: "el entrenamiento" },
      ],
      activities: [
        {
          id: "it16s-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "sempre", right: "siempre" },
            { left: "spesso", right: "a menudo" },
            { left: "qualche volta", right: "a veces" },
            { left: "raramente", right: "raras veces" },
          ] },
        },
        {
          id: "it16s-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "mai", right: "nunca" },
            { left: "la palestra", right: "el gimnasio" },
            { left: "la partita", right: "el partido" },
            { left: "fare sport", right: "hacer deporte" },
          ] },
        },
        {
          id: "it16s-vocab-a3", type: "cloze",
          prompt: "Completa: 'Vado ___ in palestra.' (siempre)",
          payload: { answer: "sempre" },
          explain: "'sempre' = siempre.",
        },
        {
          id: "it16s-vocab-a4", type: "cloze",
          prompt: "Completa: 'Non vado ___ in piscina.' (nunca)",
          payload: { answer: "mai" },
          explain: "'non...mai' = nunca.",
        },
        {
          id: "it16s-vocab-a5", type: "cloze",
          prompt: "Completa: '___ corro nel parco.' (a veces)",
          payload: { answer: "Qualche volta" },
          explain: "'qualche volta' = a veces.",
        },
        {
          id: "it16s-vocab-a6", type: "multiple_choice",
          prompt: "Come dici 'a menudo juego tenis'?",
          payload: { choices: ["Gioco spesso a tennis.", "Gioco mai a tennis.", "Gioco raramente a tennis."], answer: 0 },
          explain: "'spesso' = a menudo.",
        },
        {
          id: "it16s-vocab-a7", type: "multiple_choice",
          prompt: "Cosa significa 'quanto spesso'?",
          payload: { choices: ["cuanto cuesta", "con que frecuencia", "a que hora"], answer: 1 },
          explain: "'quanto spesso' = con que frecuencia.",
        },
        {
          id: "it16s-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["a", "Gioco", "calcio", "sempre"], answer: ["Gioco", "sempre", "a", "calcio"] },
          explain: "'Gioco sempre a calcio'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "it16s-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: gli avverbi di frequenza",
      intro: "Competencia de GRAMATICA. Aprende a decir cada cuanto haces algo.",
      grammar: {
        title: "Gli avverbi di frequenza",
        chart: {
          title: "AVVERBI DI FREQUENZA",
          maps: "100% (sempre) -> 0% (mai)",
          groups: [
            {
              label: "ALTA FREQUENZA", color: "rose",
              forms: [
                { form: "SEMPRE", subjects: "siempre (100%)" },
                { form: "SPESSO", subjects: "a menudo" },
              ],
            },
            {
              label: "BASSA FREQUENZA", color: "green",
              forms: [
                { form: "QUALCHE VOLTA", subjects: "a veces" },
                { form: "RARAMENTE", subjects: "raras veces" },
                { form: "NON... MAI", subjects: "nunca (0%)" },
              ],
            },
          ],
        },
        form: "soggetto + verbo + avverbio; 'mai' necesita 'non' antes del verbo",
        desc: "Los adverbios de frecuencia indican cada cuanto pasa algo, de 'siempre' (100%) a 'nunca' (0%). Generalmente van DESPUES del verbo conjugado: 'Vado sempre', 'Gioco spesso'. 'Mai' es especial: necesita 'non' antes del verbo, formando una doble negacion (igual que 'non...mai' con el pasado, ya visto en A1).",
        rule: "Orden tipico: [sujeto] + verbo + avverbio (Vado sempre, Gioco spesso, Corro raramente). Excepcion con MAI: [sujeto] + NON + verbo + MAI (Non vado mai in piscina). Pregunta de frecuencia: 'Quanto spesso + presente + ...?' (Quanto spesso fai sport?).",
        examples: ["Vado sempre in palestra.", "Gioco spesso a tennis.", "Qualche volta nuoto.", "Non vado mai in piscina d'inverno."],
        explain: { tr: ["Siempre voy al gimnasio.", "A menudo juego tenis.", "A veces nado.", "Nunca voy a la piscina en invierno."] },
        mistakes: [
          { wrong: "Non vado in piscina mai.", right: "Non vado mai in piscina." },
          { wrong: "Vado mai in piscina.", right: "Non vado mai in piscina." },
          { wrong: "Mai non vado in piscina.", right: "Non vado mai in piscina." },
        ],
      },
      activities: [
        {
          id: "it16s-gram-a1", type: "cloze",
          prompt: "Completa: 'Vado ___ in palestra.' (siempre)",
          payload: { answer: "sempre" },
          explain: "'sempre' = siempre.",
        },
        {
          id: "it16s-gram-a2", type: "cloze",
          prompt: "Completa: 'Non gioco ___ a calcio d'inverno.' (nunca)",
          payload: { answer: "mai" },
          explain: "'non...mai' = nunca.",
        },
        {
          id: "it16s-gram-a3", type: "cloze",
          prompt: "Completa: '___ corro la mattina.' (a veces)",
          payload: { answer: "Qualche volta" },
          explain: "'qualche volta' = a veces.",
        },
        {
          id: "it16s-gram-a4", type: "multiple_choice",
          prompt: "Dove va normalmente l'avverbio di frequenza?",
          payload: { choices: ["antes del sujeto", "despues del verbo", "al inicio, siempre"], answer: 1 },
          explain: "Normalmente va despues del verbo conjugado.",
        },
        {
          id: "it16s-gram-a5", type: "multiple_choice",
          prompt: "Cosa serve a 'mai' per funzionare?",
          payload: { choices: ["nada especial", "'non' antes del verbo", "ir al final siempre"], answer: 1 },
          explain: "'mai' necesita 'non' antes del verbo.",
        },
        {
          id: "it16s-gram-a6", type: "multiple_choice",
          prompt: "Scegli la frase corretta:",
          payload: { choices: ["Non vado in piscina mai.", "Non vado mai in piscina.", "Vado mai in piscina."], answer: 1 },
          explain: "'mai' va justo despues del verbo.",
        },
        {
          id: "it16s-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["a", "Gioco", "tennis", "spesso"], answer: ["Gioco", "spesso", "a", "tennis"] },
          explain: "'Gioco spesso a tennis'.",
        },
        {
          id: "it16s-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["in", "Non", "piscina", "vado", "mai"], answer: ["Non", "vado", "mai", "in", "piscina"] },
          explain: "'Non vado mai in piscina'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "it16s-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: il tuo tempo libero",
      intro: "Competencia de ESCRITURA. Cuenta que haces en tu tiempo libre, frase por frase.",
      activities: [
        {
          id: "it16s-write-a1", type: "word_bank",
          prompt: "1. Di que siempre juegas futbol los domingos:",
          payload: { words: ["calcio", "Gioco", "la", "sempre", "domenica", "a"], answer: ["Gioco", "sempre", "a", "calcio", "la", "domenica"] },
        },
        {
          id: "it16s-write-a2", type: "word_bank",
          prompt: "2. Di que nunca nadas:",
          payload: { words: ["Non", "mai", "nuoto"], answer: ["Non", "nuoto", "mai"] },
        },
        {
          id: "it16s-write-a3", type: "word_bank",
          prompt: "3. Di que a menudo vas al gimnasio:",
          payload: { words: ["palestra", "Vado", "in", "spesso"], answer: ["Vado", "spesso", "in", "palestra"] },
        },
        {
          id: "it16s-write-a4", type: "word_bank",
          prompt: "4. Pregunta con que frecuencia hace deporte (tu, informal):",
          payload: { words: ["fai", "Quanto", "sport", "spesso"], answer: ["Quanto", "spesso", "fai", "sport"] },
        },
        {
          id: "it16s-write-a5", type: "word_bank",
          prompt: "5. Di que a veces corres en el parque:",
          payload: { words: ["nel", "Qualche", "corro", "volta", "parco"], answer: ["Qualche", "volta", "corro", "nel", "parco"] },
        },
        {
          id: "it16s-write-a6", type: "multiple_choice",
          prompt: "6. 'Raramente' significa:",
          payload: { choices: ["siempre", "raras veces", "nunca"], answer: 1 },
        },
        {
          id: "it16s-write-a7", type: "multiple_choice",
          prompt: "7. Cual es correcto?",
          payload: { choices: ["Non vado mai in piscina.", "Vado non mai in piscina.", "Mai non vado in piscina."], answer: 0 },
        },
        {
          id: "it16s-write-a8", type: "multiple_choice",
          prompt: "8. 'Qualche volta' significa:",
          payload: { choices: ["siempre", "a veces", "nunca"], answer: 1 },
        },
      ],
    },
  ],
};
