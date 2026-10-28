#!/usr/bin/env python3
"""tools/check_css_classes.py - Nada de animaciones que no existen.

POR QUE ESTE GUARDIAN
---------------------
La burbuja de Megan no se veia. La causa: escribi `animate-[fadeIn_.2s]`
confiando en que ese keyframe existia. No existe en ningun sitio del proyecto.
Tailwind genera obedientemente `animation: fadeIn .2s`, el navegador no
encuentra la animacion y, segun el motor, el elemento puede quedarse en su
estado inicial: invisible.

Es un fallo especialmente feo porque NO lanza ningun error: la consola esta
limpia, el nodo esta en el DOM, y aun asi el alumno no ve nada. Este guardian
exige que toda animacion referenciada tenga su @keyframes de verdad.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"

# Donde pueden vivir los @keyframes.
FUENTES_CSS = [ROOT / "index.html", *SRC.rglob("*.css")]

# Animaciones que Tailwind trae de serie.
TAILWIND_BUILTIN = {"spin", "ping", "pulse", "bounce", "none"}


def keyframes_definidos() -> set[str]:
    nombres: set[str] = set()
    for f in FUENTES_CSS:
        if not f.exists():
            continue
        txt = f.read_text(encoding="utf-8", errors="ignore")
        nombres.update(re.findall(r"@keyframes\s+([\w-]+)", txt))
        # Tailwind config inline: keyframes: { fadeIn: {...} }
        bloque = re.search(r"keyframes\s*:\s*\{(.*?)\n\s*\}", txt, re.S)
        if bloque:
            nombres.update(re.findall(r"([\w-]+)\s*:\s*\{", bloque.group(1)))
    return nombres


def sin_comentarios(txt: str) -> str:
    """Quita // y /* */ para no auditar lo que solo es una explicacion.

    Hace falta: el comentario que documenta ESTE mismo fallo menciona
    'animate-[fadeIn]', y marcarlo seria absurdo -- obligaria a no poder
    explicar el bug que el guardian existe para evitar.
    """
    txt = re.sub(r"/\*.*?\*/", "", txt, flags=re.S)
    return re.sub(r"//[^\n]*", "", txt)


def main() -> int:
    definidos = keyframes_definidos() | TAILWIND_BUILTIN
    print(f"Animaciones disponibles: {', '.join(sorted(definidos)) or '(ninguna)'}")

    fallos: list[str] = []
    usos = 0
    for f in SRC.rglob("*.js"):
        txt = sin_comentarios(f.read_text(encoding="utf-8", errors="ignore"))
        # animate-[nombre_...]  o  animate-nombre
        for m in re.finditer(r"animate-\[([\w-]+)[_\]]", txt):
            usos += 1
            if m.group(1) not in definidos:
                linea = txt[:m.start()].count("\n") + 1
                fallos.append(f"{f.relative_to(ROOT)}:{linea} usa la animacion "
                              f"'{m.group(1)}', que no tiene @keyframes. El "
                              f"elemento puede quedarse invisible.")
        for m in re.finditer(r'animate-([a-z][\w-]*)["\s]', txt):
            usos += 1
            if m.group(1) not in definidos:
                linea = txt[:m.start()].count("\n") + 1
                fallos.append(f"{f.relative_to(ROOT)}:{linea} usa 'animate-"
                              f"{m.group(1)}' sin @keyframes.")

    print(f"Usos de animate- revisados: {usos}")

    if fallos:
        print("\nFALLOS:")
        for x in fallos:
            print("  - " + x)
        return 1

    print("\nOK: toda animacion usada existe de verdad")
    return 0


if __name__ == "__main__":
    sys.exit(main())
