#!/usr/bin/env python3
"""tools/check_cv_layout.py - Que el PDF del CV no deje medio folio en blanco.

POR QUE ESTE GUARDIAN
---------------------
El CSS tenia `section { break-inside: avoid }`. Suena sensato -- "que no se
parta una seccion" -- pero obliga a que la seccion ENTERA quepa en lo que
queda de pagina. "Professional Experience" con varios empleos casi nunca cabe,
asi que saltaba completa a la hoja siguiente y dejaba medio folio vacio en
mitad del CV. Joshua lo vio en su primer PDF.

Lo correcto es al reves: dejar fluir el contenido y proteger solo lo pequeno
(que un titulo no quede huerfano al pie, que una vineta no se parta).

Este guardian vigila que nadie reintroduzca la regla destructiva y que sigan
las protecciones finas.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOC = ROOT / "src" / "features" / "cv-document.js"

PROHIBIDO = [
    (r"section\s*\{[^}]*break-inside:\s*avoid",
     "`section { break-inside: avoid }` obliga a que la seccion entera quepa "
     "en la pagina. Con una experiencia larga, salta completa y deja medio "
     "folio en blanco. Protege h2/li, no la seccion."),
    (r"div\.hoja\s*\{[^}]*break-inside:\s*avoid",
     "break-inside en el contenedor entero impide cualquier salto de pagina."),
]

OBLIGATORIO = [
    (r"h2\s*\{[^}]*break-after:\s*avoid",
     "h2 { break-after: avoid } evita que un titulo quede solo al pie."),
    (r"li\s*\{\s*break-inside:\s*avoid",
     "li { break-inside: avoid } evita que una vineta se parta a la mitad."),
    (r"orphans:\s*\d",
     "orphans/widows evitan lineas sueltas de un parrafo."),
]


def sin_comentarios(txt: str) -> str:
    """Quita /* */ y // para no auditar las explicaciones.

    Hace falta de verdad: el comentario que documenta este mismo bug cita
    `section { break-inside: avoid }` como ejemplo de lo que NO hay que hacer.
    Sin esto el guardian se marca a si mismo -- ya me paso con check_css_classes.
    """
    txt = re.sub(r"/\*.*?\*/", "", txt, flags=re.S)
    return re.sub(r"//[^\n]*", "", txt)


def main() -> int:
    css = sin_comentarios(DOC.read_text(encoding="utf-8"))
    fallos: list[str] = []

    for patron, porque in PROHIBIDO:
        if re.search(patron, css, re.S):
            fallos.append("REGLA DESTRUCTIVA: " + porque)

    for patron, porque in OBLIGATORIO:
        if not re.search(patron, css, re.S):
            fallos.append("FALTA: " + porque)

    # El cuerpo no deberia ser diminuto ni gigante: un CV legible va entre
    # 9.5pt y 11.5pt. Fuera de ahi, o no se lee o no cabe nada.
    m = re.search(r"font-size: ([\d.]+)pt;\s*\n\s*line-height", css)
    if m:
        fs = float(m.group(1))
        print(f"Tamano de letra del cuerpo: {fs}pt")
        if not (9.5 <= fs <= 11.5):
            fallos.append(f"font-size {fs}pt fuera del rango legible (9.5-11.5pt).")

    m = re.search(r"line-height: ([\d.]+)", css)
    if m:
        lh = float(m.group(1))
        print(f"Interlineado: {lh}")
        if not (1.2 <= lh <= 1.6):
            fallos.append(f"line-height {lh} fuera de rango (1.2-1.6).")

    print(f"Skills a dos columnas: {'si' if 'ul.cols' in css else 'no'}")

    if fallos:
        print("\nFALLOS (el PDF saldria mal maquetado):")
        for f in fallos:
            print("  - " + f)
        return 1

    print("\nOK: el CV fluye sin huecos y protege titulos y vinetas")
    return 0


if __name__ == "__main__":
    sys.exit(main())
