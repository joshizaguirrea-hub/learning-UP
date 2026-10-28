"""tools/check_level_offer.py - El nivel prometido debe EXISTIR en ese idioma.

POR QUE ESTE GUARDIAN
---------------------
fr/it/pt solo tienen unidades A1, pero al alumno que decia "me defiendo" se le
asignaba A2. unitsForCourse() tiene un fallback que evita la pantalla vacia,
asi que NADIE veia un error: el perfil decia A2, el alumno estudiaba A1 y su
certificado iba a hablar de un nivel que nunca curso.

Un dato falso que nadie puede detectar es peor que un hueco visible. Este
guardian falla si vuelve a aparecer un nivel "prometido" sin contenido detras.
"""
from __future__ import annotations

import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
UNITS = ROOT / "src" / "data" / "units"
PLACEMENT = ROOT / "src" / "features" / "placement.js"
INDEX = UNITS / "index.js"

ORDEN = ["A1", "A2", "B1", "B2", "C1", "C2"]


def inventario() -> dict[str, set[str]]:
    """{idioma: {niveles con al menos una unidad}}"""
    inv: dict[str, set[str]] = defaultdict(set)
    for f in UNITS.glob("*.js"):
        if f.name == "index.js":
            continue
        s = f.read_text(encoding="utf-8")
        lang = re.search(r'language:\s*"(\w+)"', s)
        lvl = re.search(r'level:\s*"(\w+)"', s)
        if lvl:
            inv[lang.group(1) if lang else "en"].add(lvl.group(1))
    return inv


def main() -> int:
    fallos: list[str] = []
    inv = inventario()

    # 1) El ayudante tiene que existir y estar exportado.
    idx = INDEX.read_text(encoding="utf-8")
    if "export function levelAvailableFor" not in idx:
        fallos.append("units/index.js: falta levelAvailableFor(). Sin el, nada "
                      "garantiza que el nivel prometido exista.")

    # 2) placement.js NO puede fijar un nivel a pelo.
    pl = PLACEMENT.read_text(encoding="utf-8")
    for m in re.finditer(r'const cefr = "(\w+)"', pl):
        fallos.append(f"placement.js: nivel fijo \"{m.group(1)}\" sin comprobar "
                      f"si ese idioma lo tiene. Usa levelAvailableFor().")

    if "levelAvailableFor" not in pl:
        fallos.append("placement.js: no usa levelAvailableFor(); puede prometer "
                      "un nivel que el idioma no ofrece.")

    # 3) Informe de lo que cada idioma puede sostener.
    print("NIVELES CON CONTENIDO REAL:")
    for lang in sorted(inv):
        tiene = [lv for lv in ORDEN if lv in inv[lang]]
        print(f"  {lang}: {', '.join(tiene)}")

    # 4) Simula el ajuste para el arranque tipico (A2).
    print("\nARRANQUE SIN EXAMEN (se pide A2):")
    for lang in sorted(inv):
        if "A2" in inv[lang]:
            real = "A2"
        else:
            abajo = [lv for lv in ORDEN[:ORDEN.index("A2")] if lv in inv[lang]]
            real = abajo[-1] if abajo else next(
                (lv for lv in ORDEN if lv in inv[lang]), "?")
        marca = "" if real == "A2" else f"  -> se ajusta a {real}"
        print(f"  {lang}: {real}{marca}")

    if fallos:
        print("\nFALLOS:")
        for f in fallos:
            print("  - " + f)
        return 1

    print("\nOK: el nivel que se promete siempre tiene unidades detras")
    return 0


if __name__ == "__main__":
    sys.exit(main())
