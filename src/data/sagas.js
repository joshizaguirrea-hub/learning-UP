/**
 * data/sagas.js — Telenovelas por nivel: una historia CONTINUA con personajes
 * recurrentes y cliffhangers. Cada unidad del nivel es un "capitulo".
 *
 * Esto convierte los cuentos sueltos en una SAGA que engancha ("vuelvo para
 * saber que pasa"). Datos puros: premisa + elenco por nivel MCER. El motor de
 * cuentos (features/story.js) usa esto para dar continuidad (offline e IA).
 */
export const SAGAS = {
  A1: {
    title: "Nuevos comienzos",
    premise: "Sam llega a una ciudad nueva y hace su primer amigo, Mia. Aprenden lo basico del dia a dia.",
    cast: ["Sam", "Mia"],
  },
  A2: {
    title: "El plan del fin de semana",
    premise: "Sam y Mia organizan una fiesta sorpresa. Todo se complica pero la amistad los salva.",
    cast: ["Sam", "Mia", "Leo"],
  },
  B1: {
    title: "El gran viaje",
    premise: "Sam, Mia y Leo emprenden un viaje inesperado; vuelos, planes y un misterio en el camino.",
    cast: ["Sam", "Mia", "Leo"],
  },
  B2: {
    title: "La oportunidad",
    premise: "Cada uno persigue una meta profesional; decisiones dificiles ponen a prueba su equipo.",
    cast: ["Sam", "Mia", "Leo", "Dra. Ruiz"],
  },
  C1: {
    title: "Encrucijadas",
    premise: "Dilemas eticos y giros dramaticos: los personajes descubren secretos que lo cambian todo.",
    cast: ["Sam", "Mia", "Leo", "Dra. Ruiz"],
  },
  C2: {
    title: "El legado",
    premise: "El cierre de la saga: reencuentros, matices y un final que deja huella.",
    cast: ["Sam", "Mia", "Leo", "Dra. Ruiz"],
  },
};

/** Devuelve la saga del nivel (por letra A1..C2), o null. */
export function sagaForLevel(level) {
  return SAGAS[level] || null;
}
