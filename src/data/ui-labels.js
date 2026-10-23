/**
 * data/ui-labels.js — Etiquetas de NAVEGACION en el idioma meta (inmersion).
 *
 * Datos PUROS. Solo se usan con el modo inmersion ENCENDIDO (ui/prefs.js:
 * getImmersion). Apagado -> la app habla espanol, que es la L1 del alumno.
 *
 * POR QUE EXISTE ESTE ARCHIVO Y NO ES UN i18n COMPLETO:
 * aqui solo viven los botones del hub de la unidad: textos CORTOS que el alumno
 * ya reconoce por su icono y su posicion, asi que traducirlos no lo pierde.
 * Los textos largos (explicaciones, avisos, errores) NO se traducen: el que
 * estudia A1 necesita entender la instruccion, no descifrarla.
 *
 * Separado de skill-meta.js a proposito: alli viven las 6 COMPETENCIAS
 * (que el alumno aprende); aqui, la NAVEGACION (que el alumno usa).
 */

const UI_LABELS = {
  en: {
    exam: "Exam", examBadge: "TO PASS", examPassed: "PASSED",
    story: "Story", storyDesc: "Read and listen",
    call: "Video call", callDesc: "Live AI call",
    grammarInput: "Gram. input", grammarInputDesc: "Notice the form",
    pronunciation: "Pronounce", pronunciationDesc: "Tune your ear",
    review: "Review", reviewDesc: "Mix of units",
    report: "Unit report (summary)", reportDone: "See unit report",
    notebook: "Unit notebook",
  },
  es: {
    exam: "Examen", examBadge: "PARA PASAR", examPassed: "APROBADO",
    story: "Cuento", storyDesc: "Lee y escucha",
    call: "Videollamada", callDesc: "Llamada en vivo IA",
    grammarInput: "Input gram.", grammarInputDesc: "Procesa la forma",
    pronunciation: "Pronuncia", pronunciationDesc: "Afina el oido",
    review: "Repaso", reviewDesc: "Mezcla unidades",
    report: "Boletin de la unidad (resumen)", reportDone: "Ver boletin de la unidad",
    notebook: "Cuaderno de la unidad",
  },
  pt: {
    exam: "Exame", examBadge: "PARA PASSAR", examPassed: "APROVADO",
    story: "Conto", storyDesc: "Leia e escute",
    call: "Videochamada", callDesc: "Chamada ao vivo IA",
    grammarInput: "Input gram.", grammarInputDesc: "Note a forma",
    pronunciation: "Pronuncia", pronunciationDesc: "Afine o ouvido",
    review: "Revisao", reviewDesc: "Mistura unidades",
    report: "Boletim da unidade (resumo)", reportDone: "Ver boletim da unidade",
    notebook: "Caderno da unidade",
  },
  it: {
    exam: "Esame", examBadge: "PER PASSARE", examPassed: "SUPERATO",
    story: "Racconto", storyDesc: "Leggi e ascolta",
    call: "Videochiamata", callDesc: "Chiamata dal vivo IA",
    grammarInput: "Input gram.", grammarInputDesc: "Nota la forma",
    pronunciation: "Pronuncia", pronunciationDesc: "Affina l'orecchio",
    review: "Ripasso", reviewDesc: "Mescola unita",
    report: "Pagella dell'unita (riassunto)", reportDone: "Vedi la pagella dell'unita",
    notebook: "Quaderno dell'unita",
  },
  fr: {
    exam: "Examen", examBadge: "POUR PASSER", examPassed: "REUSSI",
    story: "Conte", storyDesc: "Lis et ecoute",
    call: "Appel video", callDesc: "Appel en direct IA",
    grammarInput: "Input gram.", grammarInputDesc: "Observe la forme",
    pronunciation: "Prononce", pronunciationDesc: "Affine ton oreille",
    review: "Revision", reviewDesc: "Melange d'unites",
    report: "Bulletin de l'unite (resume)", reportDone: "Voir le bulletin de l'unite",
    notebook: "Cahier de l'unite",
  },
  ja: {
    exam: "\u8a66\u9a13", examBadge: "\u5408\u683c\u3078", examPassed: "\u5408\u683c",
    story: "\u7269\u8a9e", storyDesc: "\u8aad\u3093\u3067\u8074\u304f",
    call: "\u30d3\u30c7\u30aa\u901a\u8a71", callDesc: "AI\u3068\u751f\u901a\u8a71",
    grammarInput: "\u6587\u6cd5\u5165\u529b", grammarInputDesc: "\u5f62\u306b\u6ce8\u76ee",
    pronunciation: "\u767a\u97f3", pronunciationDesc: "\u8033\u3092\u990a\u3046",
    review: "\u5fa9\u7fd2", reviewDesc: "\u5358\u5143\u3092\u6df7\u305c\u308b",
    report: "\u5358\u5143\u30ec\u30dd\u30fc\u30c8\uff08\u8981\u7d04\uff09", reportDone: "\u5358\u5143\u30ec\u30dd\u30fc\u30c8\u3092\u898b\u308b",
    notebook: "\u5358\u5143\u30ce\u30fc\u30c8",
  },
};

/**
 * Etiqueta de navegacion. Cae a espanol si falta el idioma o la clave, porque
 * un boton sin texto es peor que un boton en otro idioma.
 * @param {string} key - clave de UI_LABELS (exam, story, call...)
 * @param {string} lang - codigo ISO del idioma meta
 * @returns {string}
 */
export function uiLabel(key, lang = "es") {
  return UI_LABELS[lang]?.[key] || UI_LABELS.es[key] || key;
}
