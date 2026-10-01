#!/usr/bin/env python
"""tools/check_paths.py - Verifica que TODA ruta importada exista en disco.

Por que existe: check_imports.py detecta referencias sin importar, y check_js.py
valida sintaxis. Ninguno de los dos nota si un import apunta a un archivo que NO
EXISTE: la sintaxis es perfecta y la referencia esta "importada". El modulo
revienta solo al abrirlo en el navegador ("Failed to fetch dynamically imported
module"), que es tardisimo. Este script cierra ese hueco.

Uso:
    python tools/check_paths.py
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"

# import ... from "RUTA"  |  import("RUTA")  |  export ... from "RUTA"
PATTERN = re.compile(
    r"""(?:^\s*(?:import|export)\b[^'"]*?from\s*|import\s*\(\s*)['"]([^'"]+)['"]""",
    re.MULTILINE,
)

# Specifiers que NO son rutas de archivo (los resuelve el import-map de index.html).
BARE = ("three", "http:", "https:")


def main() -> int:
    bad = []
    checked = 0

    for js in sorted(SRC.rglob("*.js")):
        text = js.read_text(encoding="utf-8")
        for spec in PATTERN.findall(text):
            if spec.startswith(BARE):
                continue
            if not spec.startswith("."):
                continue  # otro bare specifier
            checked += 1
            target = (js.parent / spec.split("?")[0]).resolve()
            if not target.exists():
                bad.append((js.relative_to(ROOT), spec))

    if bad:
        print(f"ERROR: {len(bad)} import(s) apuntan a archivos que NO existen:\n")
        for src_file, spec in bad:
            print(f"  {src_file}")
            print(f"      -> {spec}")
        return 1

    print(f"OK: {checked} rutas de import existen")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
