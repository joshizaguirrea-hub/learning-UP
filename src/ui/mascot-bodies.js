/**
 * ui/mascot-bodies.js — Cuerpos COMPLETOS de robo-animales (como el perrito).
 *
 * DRY: todos comparten el mismo CUERPO robot (cuerpo sentado + patas + panel del
 * pecho) y la misma CARA (pantalla + ojos cian + boca "bymax-mouth" que se anima
 * al hablar). Lo unico que cambia por animal es la CABEZA (color), las OREJAS/
 * CUERNOS y la COLA ("bymax-tail" que menea). viewBox 6 0 140 150, igual que el
 * perrito de bymax-mascot.js, para que escale/anime identico.
 */

const DEFS = `<defs>
  <radialGradient id="amEye" cx="0.35" cy="0.35" r="0.75">
    <stop offset="0" stop-color="#ecfeff"/><stop offset="0.5" stop-color="#67e8f9"/><stop offset="1" stop-color="#06b6d4"/>
  </radialGradient>
  <linearGradient id="amSheen" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#ffffff" stop-opacity="0.28"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
  </linearGradient>
</defs>`;

// Cuerpo sentado compartido (sombra + ancas + cuerpo + patas + panel del pecho
// con MEDIDOR de LEDs tipo bateria + brillo metalico).
const body = (c1, c2) => `
  <ellipse cx="70" cy="143" rx="42" ry="6" fill="#0f172a" opacity="0.18"/>
  <ellipse cx="41" cy="120" rx="16" ry="18" fill="${c2}"/>
  <ellipse cx="99" cy="120" rx="16" ry="18" fill="${c2}"/>
  <ellipse cx="70" cy="106" rx="33" ry="35" fill="${c1}"/>
  <ellipse cx="60" cy="88" rx="18" ry="11" fill="url(#amSheen)"/>
  <rect x="53" y="116" width="14" height="27" rx="7" fill="${c1}"/>
  <rect x="73" y="116" width="14" height="27" rx="7" fill="${c1}"/>
  <ellipse cx="60" cy="142" rx="9" ry="4.5" fill="${c2}"/>
  <ellipse cx="80" cy="142" rx="9" ry="4.5" fill="${c2}"/>
  <circle cx="70" cy="100" r="10" fill="#0f172a"/>
  <circle cx="70" cy="100" r="5.5" fill="#34d399"><animate attributeName="opacity" values="1;0.5;1" dur="2.4s" repeatCount="indefinite"/></circle>
  <rect x="60" y="114" width="20" height="5" rx="2.5" fill="#0f172a"/>
  <circle cx="65" cy="116.5" r="1.5" fill="#22d3ee"/><circle cx="70" cy="116.5" r="1.5" fill="#34d399"/><circle cx="75" cy="116.5" r="1.5" fill="#fbbf24"/>`;

// Cabeza base (rectangulo redondeado) del color del animal.
const head = (c) => `<rect x="40" y="20" width="60" height="52" rx="22" fill="${c}"/>` +
  `<rect x="40" y="20" width="60" height="52" rx="22" fill="none" stroke="#0f172a" stroke-width="1.2" opacity="0.35"/>`;

// Cara compartida (pantalla + visor con resplandor + escaner + ojos cian +
// cachetes + naricita + boca animada).
const face = () => `
  <rect x="47" y="30" width="46" height="34" rx="14" fill="#0f172a"/>
  <rect x="49" y="32" width="42" height="30" rx="12" fill="none" stroke="#1e293b" stroke-width="1"/>
  <circle cx="60" cy="45" r="9" fill="#22d3ee" opacity="0.14"/><circle cx="80" cy="45" r="9" fill="#22d3ee" opacity="0.14"/>
  <circle cx="60" cy="45" r="6" fill="url(#amEye)"/><circle cx="80" cy="45" r="6" fill="url(#amEye)"/>
  <circle cx="58" cy="43" r="1.8" fill="#fff"/><circle cx="78" cy="43" r="1.8" fill="#fff"/>
  <rect x="49" y="38" width="42" height="1" fill="#67e8f9" opacity="0.16"><animate attributeName="y" values="36;58;36" dur="3.2s" repeatCount="indefinite"/></rect>
  <ellipse cx="51" cy="55" rx="4" ry="2.5" fill="#f472b6" opacity="0.55"/>
  <ellipse cx="89" cy="55" rx="4" ry="2.5" fill="#f472b6" opacity="0.55"/>
  <ellipse cx="70" cy="52" rx="3" ry="2.2" fill="#f472b6"/>
  <rect class="bymax-mouth" x="63" y="57" width="14" height="4" rx="2" fill="#67e8f9"/>`;

// Colas (bymax-tail = menea). Normal y con puas (dino/croc).
const tail = (c) => `<path class="bymax-tail" d="M102 106 Q128 100 124 76 Q113 90 98 94 Z" fill="${c}"/>`;
const spikeTail = (c) => `<path class="bymax-tail" d="M100 108 Q126 104 128 82 L121 87 L123 77 L115 84 L117 73 L108 82 L100 96 Z" fill="${c}"/>`;

// --- Detalles ROBOT compartidos (antena, tornillos, juntas, costuras) -------
// Antena con lucecita rosa que parpadea (va detras: la cabeza/orejas la tapan
// por la base y la bolita asoma arriba).
const antenna = (c) => `<rect x="68.5" y="5" width="3" height="17" rx="1.5" fill="${c}"/>` +
  `<circle cx="70" cy="4" r="3.6" fill="#f472b6"><animate attributeName="opacity" values="1;0.35;1" dur="1.6s" repeatCount="indefinite"/></circle>`;

// Herrajes del CUERPO: cuello atornillado, juntas de hombros, linea central,
// tornillos en las ancas.
const robotBody = (c) => `
  <rect x="60" y="70" width="20" height="7" rx="3.5" fill="${c}"/>
  <circle cx="64" cy="73.5" r="1.3" fill="#0f172a" opacity="0.5"/><circle cx="76" cy="73.5" r="1.3" fill="#0f172a" opacity="0.5"/>
  <circle cx="47" cy="99" r="4.5" fill="${c}"/><circle cx="47" cy="99" r="1.8" fill="#0f172a" opacity="0.5"/>
  <circle cx="93" cy="99" r="4.5" fill="${c}"/><circle cx="93" cy="99" r="1.8" fill="#0f172a" opacity="0.5"/>
  <path d="M70 92 v15" stroke="${c}" stroke-width="1.6" opacity="0.6"/>
  <circle cx="55" cy="128" r="1.6" fill="#0f172a" opacity="0.35"/><circle cx="85" cy="128" r="1.6" fill="#0f172a" opacity="0.35"/>`;

// Herrajes de la CABEZA: costura del panel + remaches en las esquinas.
const robotHead = () => `
  <path d="M44 34 h52" stroke="#0f172a" stroke-width="1" opacity="0.22"/>
  <circle cx="45" cy="30" r="1.6" fill="#0f172a" opacity="0.4"/><circle cx="95" cy="30" r="1.6" fill="#0f172a" opacity="0.4"/>
  <circle cx="45" cy="62" r="1.6" fill="#0f172a" opacity="0.4"/><circle cx="95" cy="62" r="1.6" fill="#0f172a" opacity="0.4"/>`;

// Rasgos por animal (orejas/cuernos/melena). "behind" va detras de la cabeza.
const ears = {
  pointy: (c) => `<path d="M46 26 L40 8 L59 22 Z" fill="${c}"/><path d="M94 26 L100 8 L81 22 Z" fill="${c}"/>`,
  tall: (c) => `<rect x="51" y="2" width="7" height="22" rx="3.5" fill="${c}"/><rect x="82" y="2" width="7" height="22" rx="3.5" fill="${c}"/>`,
  round: (c) => `<circle cx="47" cy="22" r="9" fill="${c}"/><circle cx="93" cy="22" r="9" fill="${c}"/>`,
  floppy: (c) => `<path d="M47 24 Q29 26 27 52 Q30 62 41 58 Q46 43 51 31 Z" fill="${c}"/>` +
    `<path d="M93 24 Q111 26 113 52 Q110 62 99 58 Q94 43 89 31 Z" fill="${c}"/>`,
  horns: (c) => `<rect x="54" y="4" width="4" height="13" fill="${c}"/><circle cx="56" cy="4" r="3.6" fill="${c}"/>` +
    `<rect x="82" y="4" width="4" height="13" fill="${c}"/><circle cx="84" cy="4" r="3.6" fill="${c}"/>`,
  ridges: (c) => `<ellipse cx="52" cy="20" rx="6" ry="5" fill="${c}"/><ellipse cx="88" cy="20" rx="6" ry="5" fill="${c}"/>`,
  spikes: (c) => `<path d="M50 21 l4 -9 4 9 M62 19 l4 -10 4 10 M74 19 l4 -10 4 10" fill="${c}"/>`,
};
// Melena de leon (detras de la cabeza).
const mane = (c) => {
  const pts = [[70, 12], [50, 15], [92, 17], [40, 34], [102, 34], [48, 56], [94, 56], [70, 60]];
  return pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="${c}"/>`).join("");
};
// Orejas laterales grandes (elefante, detras de la cabeza).
const sideEars = (c) => `<ellipse cx="34" cy="44" rx="14" ry="18" fill="${c}"/><ellipse cx="106" cy="44" rx="14" ry="18" fill="${c}"/>`;

const svg = (inner) =>
  `<svg viewBox="6 0 140 150" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" role="img" aria-hidden="true">${DEFS}${inner}</svg>`;

// Ensambla: sombra/cola (detras) + antena + cuerpo + herrajes + [detras-cabeza]
// + cabeza + herrajes-cabeza + rasgos + cara + [extra].
function build({ c1, c2, hc, tl, behind = "", top = "", extra = "" }) {
  return svg(tl + antenna(c2) + body(c1, c2) + robotBody(c2) + behind +
    head(hc) + robotHead() + top + face() + extra);
}

// Bigotes de gato (encima de la cara).
const whiskers = `<path d="M46 50 h-13 M46 55 h-13 M94 50 h13 M94 55 h13" stroke="#0f172a" stroke-width="1" opacity="0.5"/>`;
// Manchas de jirafa (sobre el cuerpo).
const spots = `<circle cx="60" cy="100" r="4" fill="#d97706"/><circle cx="82" cy="110" r="4" fill="#d97706"/><circle cx="66" cy="118" r="3.5" fill="#d97706"/>`;

// Catalogo de robo-animales de cuerpo completo.
const BODIES = {
  cat: () => build({ c1: "#f59e0b", c2: "#b45309", hc: "#fbbf24", tl: tail("#b45309"), top: ears.pointy("#d97706") + whiskers }),
  croc: () => build({ c1: "#22c55e", c2: "#15803d", hc: "#16a34a", tl: spikeTail("#15803d"), top: ears.ridges("#166534") }),
  kangaroo: () => build({ c1: "#f59e0b", c2: "#b45309", hc: "#d97706", tl: tail("#92400e"), top: ears.tall("#b45309") }),
  dino: () => build({ c1: "#10b981", c2: "#047857", hc: "#059669", tl: spikeTail("#047857"), top: ears.spikes("#065f46") }),
  lion: () => build({ c1: "#f59e0b", c2: "#b45309", hc: "#fbbf24", tl: tail("#b45309"), behind: mane("#d97706") }),
  elephant: () => build({ c1: "#cbd5e1", c2: "#64748b", hc: "#94a3b8", tl: tail("#64748b"), behind: sideEars("#94a3b8") }),
  giraffe: () => build({ c1: "#fbbf24", c2: "#b45309", hc: "#fcd34d", tl: tail("#b45309"), top: ears.horns("#78350f"), extra: spots }),
  hamster: () => build({ c1: "#fcd34d", c2: "#d97706", hc: "#fde68a", tl: tail("#d97706"), top: ears.round("#d97706") }),
  capybara: () => build({ c1: "#a16207", c2: "#713f12", hc: "#b45309", tl: tail("#713f12"), top: ears.round("#78350f") }),
};

/** True si el id tiene cuerpo completo de robo-animal (fuera del perrito Bymax). */
export function hasAnimalBody(id) {
  return Object.prototype.hasOwnProperty.call(BODIES, id);
}

/** SVG (string) del cuerpo completo del robo-animal, o null si no existe. */
export function animalMascotSvg(id) {
  return BODIES[id] ? BODIES[id]() : null;
}
