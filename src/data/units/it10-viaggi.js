/**
 * data/units/it10-viaggi.js — Unita A2 italiano "In viaggio" (participi
 * irregolari del passato prossimo + vocabolario di viaggio).
 *
 * Dati PURI. term = italiano (meta), translation = spagnolo (L1 dello studente).
 */

export const IT10_VIAGGI = {
  id: "it10-viaggi",
  language: "it",
  level: "A2",
  title: "In viaggio",
  subtitle: "Participios irregulares del passato prossimo (fatto, preso, visto, stato) + vocabulario de viaje",

  cando: [
    "Puedo hablar de un viaje usando participios irregulares (fatto, visto, preso, stato).",
    "Puedo reconocer que 'essere' tambien es irregular: su participio es 'stato'.",
    "Puedo usar vocabulario de viajes (aeroporto, biglietto, valigia, prenotare).",
    "Puedo contar una experiencia de viaje combinando 'avere' con participios irregulares.",
  ],

  vocab: [
    { id: "it10v-1", term: "fare (ho fatto)", translation: "hacer (hice)", example: "Ho fatto un bel viaggio." },
    { id: "it10v-2", term: "prendere (ho preso)", translation: "tomar/coger (tome)", example: "Ho preso l'aereo." },
    { id: "it10v-3", term: "vedere (ho visto)", translation: "ver (vi)", example: "Ho visto un museo bellissimo." },
    { id: "it10v-4", term: "leggere (ho letto)", translation: "leer (lei)", example: "Ho letto una guida turistica." },
    { id: "it10v-5", term: "l'aeroporto", translation: "el aeropuerto", example: "Siamo arrivati in aeroporto." },
    { id: "it10v-6", term: "il biglietto", translation: "el boleto/billete", example: "Ho comprato il biglietto online." },
    { id: "it10v-7", term: "la valigia", translation: "la maleta", example: "Ho fatto la valigia ieri sera." },
    { id: "it10v-8", term: "prenotare", translation: "reservar", example: "Ho prenotato un albergo." },
    { id: "it10v-9", term: "l'aereo", translation: "el avion", example: "L'aereo e partito in orario." },
    { id: "it10v-10", term: "il passaporto", translation: "el pasaporte", example: "Ho dimenticato il passaporto!" },
    { id: "it10v-11", term: "essere stato/a", translation: "haber estado", example: "Sono stato in Francia." },
    { id: "it10v-12", term: "un viaggio indimenticabile", translation: "un viaje inolvidable", example: "E stato un viaggio indimenticabile." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "it10v-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: il mio ultimo viaggio",
      intro: "Competencia de LECTURA. Lee DOS textos en italiano y responde las preguntas.",
      content: {
        reading:
          "TESTO 1 - Il viaggio di Marco\n" +
          "Il mese scorso ho fatto un viaggio in Francia. Ho preso l'aereo da Milano e sono arrivato a Parigi " +
          "in due ore. Ho visto la Torre Eiffel e ho letto molto sulla storia della citta. Ho anche fatto " +
          "tante fotografie! Sono stato in un piccolo albergo vicino al centro. E stato un viaggio indimenticabile.\n\n" +
          "TESTO 2 - All'aeroporto\n" +
          "A: Hai fatto la valigia? B: Si, ma ho dimenticato il passaporto! A: Cosa?! Dove l'hai messo? " +
          "B: Non lo so, forse a casa. A: Abbiamo prenotato il volo per le dieci, dobbiamo tornare subito! " +
          "B: Hai ragione, andiamo!",
        glossary: [
          { term: "ho fatto", translation: "hice" },
          { term: "ho preso", translation: "tome / cogi" },
          { term: "ho visto", translation: "vi" },
          { term: "ho letto", translation: "lei" },
          { term: "sono stato/a", translation: "estuve" },
          { term: "la valigia", translation: "la maleta" },
          { term: "ho dimenticato", translation: "olvide" },
          { term: "abbiamo prenotato", translation: "reservamos" },
        ],
        keyPhrases: [
          "Participios IRREGULARES clave: fare->fatto, prendere->preso, vedere->visto, leggere->letto, essere->stato.",
          "'Essere' usa su PROPIO participio 'stato' con el auxiliar essere: 'sono stato'.",
        ],
        check: [
          { prompt: "T1: Dove e andato Marco?", choices: ["In Francia", "In Spagna", "In Italia"], answer: 0 },
          { prompt: "T1: Cosa ha preso per arrivare?", choices: ["L'aereo", "Il treno", "La macchina"], answer: 0 },
          { prompt: "T1: Cosa ha visto a Parigi?", choices: ["La Torre Eiffel", "Un museo", "Un castello"], answer: 0 },
          { prompt: "T2: Cosa ha dimenticato B?", choices: ["Il passaporto", "Il biglietto", "La valigia"], answer: 0 },
          { prompt: "T2: A che ora e il volo?", choices: ["Alle dieci", "Alle nove", "Alle undici"], answer: 0 },
          { prompt: "T2: Cosa devono fare subito?", choices: ["Tornare a casa", "Comprare un biglietto", "Aspettare"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "it10v-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: il viaggio",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "fare / ho fatto", translation: "hacer / hice" },
        { term: "prendere / ho preso", translation: "tomar / tome" },
        { term: "vedere / ho visto", translation: "ver / vi" },
        { term: "leggere / ho letto", translation: "leer / lei" },
        { term: "l'aeroporto / il biglietto", translation: "el aeropuerto / el boleto" },
        { term: "la valigia / il passaporto", translation: "la maleta / el pasaporte" },
        { term: "prenotare", translation: "reservar" },
        { term: "essere stato/a", translation: "haber estado" },
      ],
      activities: [
        {
          id: "it10v-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "fare", right: "hacer" },
            { left: "prendere", right: "tomar" },
            { left: "vedere", right: "ver" },
            { left: "leggere", right: "leer" },
          ] },
        },
        {
          id: "it10v-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "l'aeroporto", right: "el aeropuerto" },
            { left: "la valigia", right: "la maleta" },
            { left: "il biglietto", right: "el boleto" },
            { left: "il passaporto", right: "el pasaporte" },
          ] },
        },
        {
          id: "it10v-vocab-a3", type: "cloze",
          prompt: "Completa: 'Ho ___ l'aereo.' (prendere, participio)",
          payload: { answer: "preso" },
          explain: "prendere -> 'preso' (irregolare).",
        },
        {
          id: "it10v-vocab-a4", type: "cloze",
          prompt: "Completa: 'Ho ___ un bel film ieri.' (vedere, participio)",
          payload: { answer: "visto" },
          explain: "vedere -> 'visto' (irregolare).",
        },
        {
          id: "it10v-vocab-a5", type: "cloze",
          prompt: "Completa: 'Ho ___ un libro interessante.' (leggere, participio)",
          payload: { answer: "letto" },
          explain: "leggere -> 'letto' (irregolare).",
        },
        {
          id: "it10v-vocab-a6", type: "multiple_choice",
          prompt: "Qual e il participio di 'fare'?",
          payload: { choices: ["fatto", "faccio", "facendo"], answer: 0 },
          explain: "fare -> 'fatto' (irregolare).",
        },
        {
          id: "it10v-vocab-a7", type: "multiple_choice",
          prompt: "Come dici 'estuve en Italia'?",
          payload: { choices: ["Ho stato in Italia.", "Sono stato in Italia.", "Ho essere in Italia."], answer: 1 },
          explain: "'Essere' usa el auxiliar essere + 'stato'.",
        },
        {
          id: "it10v-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["un", "Ho", "viaggio", "fatto", "bel"], answer: ["Ho", "fatto", "un", "bel", "viaggio"] },
          explain: "'Ho fatto un bel viaggio'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "it10v-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: participi irregolari",
      intro: "Competencia de GRAMATICA. Memoriza los participios irregulares mas frecuentes.",
      grammar: {
        title: "Participi irregolari del passato prossimo",
        chart: {
          title: "PARTICIPI IRREGOLARI",
          maps: "verbo -> forma especial (no sigue -ato/-uto/-ito)",
          groups: [
            {
              label: "CON AVERE", color: "rose",
              forms: [
                { form: "FARE -> FATTO", subjects: "hacer -> hecho" },
                { form: "PRENDERE -> PRESO", subjects: "tomar -> tomado" },
                { form: "VEDERE -> VISTO", subjects: "ver -> visto" },
                { form: "LEGGERE -> LETTO", subjects: "leer -> leido" },
              ],
            },
            {
              label: "CON ESSERE", color: "green",
              forms: [
                { form: "ESSERE -> STATO", subjects: "ser/estar -> sido/estado" },
                { form: "STARE -> STATO", subjects: "(mismo participio que essere!)" },
              ],
            },
          ],
        },
        form: "avere/essere + participio IRREGULAR (no sigue -ato/-uto/-ito)",
        desc: "Muchos verbos muy frecuentes tienen un participio irregular que no se deriva de la terminacion del infinitivo y hay que memorizar. Los mas comunes: fare->fatto, prendere->preso, vedere->visto, leggere->letto, essere->stato (igual que 'stare').",
        rule: "Estos participios NO siguen la regla -are->-ato / -ere->-uto / -ire->-ito. Memoriza: fare->FATTO, prendere->PRESO, vedere->VISTO, leggere->LETTO, essere->STATO (con auxiliar essere, concuerda: stato/stata/stati/state).",
        examples: ["Ho fatto colazione.", "Ho preso il treno.", "Ho visto un film.", "Sono stato a Roma."],
        explain: { tr: ["Desayune.", "Tome el tren.", "Vi una pelicula.", "Estuve en Roma."] },
        mistakes: [
          { wrong: "Ho facido colazione.", right: "Ho fatto colazione." },
          { wrong: "Ho prenduto il treno.", right: "Ho preso il treno." },
          { wrong: "Ho essere a Roma.", right: "Sono stato a Roma." },
        ],
      },
      activities: [
        {
          id: "it10v-gram-a1", type: "cloze",
          prompt: "Completa: 'Ho ___ colazione.' (fare)",
          payload: { answer: "fatto" },
          explain: "fare -> 'fatto'.",
        },
        {
          id: "it10v-gram-a2", type: "cloze",
          prompt: "Completa: 'Ho ___ il treno.' (prendere)",
          payload: { answer: "preso" },
          explain: "prendere -> 'preso'.",
        },
        {
          id: "it10v-gram-a3", type: "cloze",
          prompt: "Completa (io, maschile): 'Ieri sono ___ a Roma.' (essere)",
          payload: { answer: "stato" },
          explain: "essere -> 'stato' (maschile singolare).",
        },
        {
          id: "it10v-gram-a4", type: "multiple_choice",
          prompt: "Qual e il participio di 'leggere'?",
          payload: { choices: ["letto", "leggato", "leggiuto"], answer: 0 },
          explain: "leggere -> 'letto' (irregolare).",
        },
        {
          id: "it10v-gram-a5", type: "multiple_choice",
          prompt: "Qual e il participio di 'vedere'?",
          payload: { choices: ["vedito", "vedato", "visto"], answer: 2 },
          explain: "vedere -> 'visto' (irregolare).",
        },
        {
          id: "it10v-gram-a6", type: "multiple_choice",
          prompt: "Come dici 'estuvimos en Francia' (noi)?",
          payload: { choices: ["Siamo stati in Francia.", "Abbiamo stato in Francia.", "Siamo stato in Francia."], answer: 0 },
          explain: "Essere + concordanza plural: 'siamo stati'.",
        },
        {
          id: "it10v-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["un", "Ho", "caffe", "preso"], answer: ["Ho", "preso", "un", "caffe"] },
          explain: "'Ho preso un caffe'.",
        },
        {
          id: "it10v-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["in", "Sono", "Spagna", "stati"], answer: ["Sono", "stati", "in", "Spagna"] },
          explain: "'Sono stati in Spagna'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "it10v-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: racconta un viaggio",
      intro: "Competencia de ESCRITURA. Cuenta un viaje, frase por frase.",
      activities: [
        {
          id: "it10v-write-a1", type: "word_bank",
          prompt: "1. Di que hiciste un viaje:",
          payload: { words: ["un", "Ho", "viaggio", "fatto"], answer: ["Ho", "fatto", "un", "viaggio"] },
        },
        {
          id: "it10v-write-a2", type: "word_bank",
          prompt: "2. Di que tomaste el avion:",
          payload: { words: ["l'aereo", "Ho", "preso"], answer: ["Ho", "preso", "l'aereo"] },
        },
        {
          id: "it10v-write-a3", type: "word_bank",
          prompt: "3. Di que viste la Torre Eiffel:",
          payload: { words: ["la", "Ho", "Eiffel", "visto", "Torre"], answer: ["Ho", "visto", "la", "Torre", "Eiffel"] },
        },
        {
          id: "it10v-write-a4", type: "word_bank",
          prompt: "4. Di que (ustedes, masculino) estuvieron en Roma:",
          payload: { words: ["a", "Siamo", "Roma", "stati"], answer: ["Siamo", "stati", "a", "Roma"] },
        },
        {
          id: "it10v-write-a5", type: "word_bank",
          prompt: "5. Pregunta si hizo la maleta:",
          payload: { words: ["la", "Hai", "valigia", "fatto"], answer: ["Hai", "fatto", "la", "valigia"] },
        },
        {
          id: "it10v-write-a6", type: "multiple_choice",
          prompt: "6. El participio de 'prendere' es:",
          payload: { choices: ["preso", "prenduto", "prendato"], answer: 0 },
        },
        {
          id: "it10v-write-a7", type: "multiple_choice",
          prompt: "7. Cual es correcto?",
          payload: { choices: ["Ho stato in Italia.", "Sono stato in Italia.", "Ho essere in Italia."], answer: 1 },
        },
        {
          id: "it10v-write-a8", type: "multiple_choice",
          prompt: "8. 'Abbiamo visto un film' significa:",
          payload: { choices: ["Vimos una pelicula", "Hicimos una pelicula", "Leimos una pelicula"], answer: 0 },
        },
      ],
    },
  ],
};
