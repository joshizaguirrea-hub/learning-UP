#!/usr/bin/env python3
"""tools/check_topic_verbs.py - Los mazos de verbos por TEMA no pueden mentir
ni chocar con el resto del SRS.

POR QUE ESTE GUARDIAN
----------------------
data/topic-verb-decks.js ata un mazo de verbos a una unidad concreta via el
campo `topic` (debe ser el `id` REAL de esa unidad en data/units/*.js). Si
alguien escribe mal ese id (o la unidad se renombra), el mazo queda huerfano:
nunca aparece en ninguna pantalla y nadie se entera, porque
features/unit-content.js simplemente no encuentra coincidencias y no pinta
nada -- ni un error, solo un silencio.

Ademas, TODOS los ids de este archivo viven en la MISMA tabla `srs_cards`
(columna `vocab_id`, global por usuario -- ver services/srs.js) que el
vocabulario de las unidades y los otros mazos bonus. Un id repetido no lanza
ningun error de base de datos: silenciosamente FUSIONA el progreso de dos
palabras distintas, igual que el bug de "CARNES Y EMBUTIDOS" en otro proyecto
de esta cuenta. Este guardian cierra esa puerta antes de que se abra.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "src" / "data"
UNITS = DATA / "units"
TOPIC_VERBS = DATA / "topic-verb-decks.js"

# Archivos cuyos ids de item TAMBIEN viven en srs_cards (mismo espacio global).
OTHER_ID_SOURCES = [
    DATA / "bonus-decks.js",
    DATA / "vocab-decks.js",
    DATA / "pt-bonus-decks.js",
]

ITEM_ID_RE = re.compile(r'\{\s*id:\s*"([\w-]+)"')
UNIT_ID_RE = re.compile(r'^  id: "([\w-]+)",$', re.MULTILINE)
TOPIC_FIELD_RE = re.compile(r'topic:\s*"([\w-]+)"')


def real_unit_ids() -> set[str]:
    ids: set[str] = set()
    for f in UNITS.glob("*.js"):
        if f.name == "index.js":
            continue
        ids.update(UNIT_ID_RE.findall(f.read_text(encoding="utf-8")))
    return ids


def item_ids_in(path: Path) -> set[str]:
    if not path.exists():
        return set()
    return set(ITEM_ID_RE.findall(path.read_text(encoding="utf-8")))


def main() -> int:
    if not TOPIC_VERBS.exists():
        print("No hay topic-verb-decks.js (nada que revisar).")
        return 0

    src = TOPIC_VERBS.read_text(encoding="utf-8")
    fallos: list[str] = []

    # 1) Cada `topic` debe ser una unidad real.
    topics = TOPIC_FIELD_RE.findall(src)
    if not topics:
        print("Aviso: topic-verb-decks.js no define ningun mazo con `topic`.")
    units = real_unit_ids()
    for t in topics:
        if t not in units:
            fallos.append(f"topic=\"{t}\" no coincide con ninguna unidad real "
                          f"en data/units/*.js. El mazo queda huerfano: nunca "
                          f"se mostrara en ninguna pantalla.")

    # 2) Los ids de item deben ser unicos DENTRO del archivo...
    own_ids = ITEM_ID_RE.findall(src)
    dupes = {i for i in own_ids if own_ids.count(i) > 1}
    if dupes:
        fallos.append(f"ids repetidos dentro de topic-verb-decks.js: {sorted(dupes)}")

    # 3) ...y tampoco pueden chocar con otros mazos bonus (misma tabla SRS).
    other_ids: set[str] = set()
    for f in OTHER_ID_SOURCES:
        other_ids |= item_ids_in(f)
    choque_bonus = set(own_ids) & other_ids
    if choque_bonus:
        fallos.append(f"ids que chocan con otros mazos bonus (mismo SRS global): "
                      f"{sorted(choque_bonus)}")

    # 4) ...ni con el vocabulario de NINGUNA unidad (mismo SRS global).
    for f in UNITS.glob("*.js"):
        if f.name == "index.js":
            continue
        unit_vocab_ids = item_ids_in(f)
        choque = set(own_ids) & unit_vocab_ids
        if choque:
            fallos.append(f"ids que chocan con el vocabulario de {f.name}: "
                          f"{sorted(choque)}")

    if fallos:
        print("FALLOS:")
        for f in fallos:
            print("  - " + f)
        return 1

    print(f"OK: {len(topics)} mazo(s) de verbos por tema, todos atados a una "
          f"unidad real y sin choques de id en el SRS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
