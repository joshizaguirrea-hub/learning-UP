#!/usr/bin/env python3
"""tools/check_exports.py - Lo que importas tiene que existir ALLA.

POR QUE ESTE GUARDIAN
---------------------
unit-coach.js hacia `import { robotName } from "../ui/robot-prefs.js"`.
La ruta existia. El identificador se usaba. Los dos validadores que teniamos
dieron verde:
  - check_paths.py   -> "el archivo existe"            OK
  - check_imports.py -> "robotName esta importado"     OK
...pero robot-prefs.js NUNCA exporto robotName (vive en robot.js). El navegador
lanza SyntaxError al cargar el modulo, la pantalla entera no monta, y el
usuario solo ve que "no abre".

Un import roto es de los pocos errores que tumban una pantalla COMPLETA, asi
que merece su propio guardian: comprobar que el modulo de destino exporta de
verdad cada nombre que se le pide.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"

# import { a, b as c } from "ruta";
RE_NAMED = re.compile(r'import\s*\{([^}]*)\}\s*from\s*["\']([^"\']+)["\']')
# export { a, b as c }  /  export { x } from "..."
RE_EXPORT_BLOCK = re.compile(r"export\s*\{([^}]*)\}")
RE_EXPORT_DECL = re.compile(
    r"export\s+(?:async\s+)?(?:function\*?|class|const|let|var)\s+([A-Za-z_$][\w$]*)")
RE_REEXPORT_ALL = re.compile(r'export\s+\*\s+from\s*["\']([^"\']+)["\']')


def exports_de(path: Path, _visto: set[Path] | None = None) -> set[str]:
    """Nombres que un modulo exporta (siguiendo `export * from`)."""
    _visto = _visto or set()
    if path in _visto or not path.exists():
        return set()
    _visto.add(path)

    txt = path.read_text(encoding="utf-8", errors="ignore")
    nombres: set[str] = set(RE_EXPORT_DECL.findall(txt))

    for bloque in RE_EXPORT_BLOCK.findall(txt):
        for trozo in bloque.split(","):
            trozo = trozo.strip()
            if not trozo:
                continue
            # "x as y" -> se exporta como y
            nombres.add(trozo.split(" as ")[-1].strip())

    # export * from "./otro.js" -> hereda sus exports
    for rel in RE_REEXPORT_ALL.findall(txt):
        nombres |= exports_de((path.parent / rel).resolve(), _visto)

    return nombres


def main() -> int:
    fallos: list[str] = []
    revisados = 0

    for f in sorted(SRC.rglob("*.js")):
        txt = f.read_text(encoding="utf-8", errors="ignore")
        for bloque, rel in RE_NAMED.findall(txt):
            if not rel.startswith("."):
                continue  # dependencia externa: no la podemos leer
            destino = (f.parent / rel).resolve()
            if not destino.exists():
                continue  # eso ya lo cubre check_paths.py
            disponibles = exports_de(destino)
            for trozo in bloque.split(","):
                nombre = trozo.strip().split(" as ")[0].strip()
                if not nombre:
                    continue
                revisados += 1
                if nombre not in disponibles:
                    linea = txt[:txt.find(nombre)].count("\n") + 1
                    donde = _donde_vive(nombre)
                    pista = f"  (vive en {donde})" if donde else ""
                    fallos.append(
                        f"{f.relative_to(ROOT)}:{linea} importa '{nombre}' de "
                        f"{rel}, que NO lo exporta.{pista}")

    print(f"Imports con nombre revisados: {revisados}")

    if fallos:
        print("\nFALLOS (el modulo no carga -> pantalla en blanco):")
        for x in fallos:
            print("  - " + x)
        return 1

    print("\nOK: todo lo que se importa existe en su origen")
    return 0


def _donde_vive(nombre: str) -> str:
    """Busca en que modulo SI se exporta ese nombre (para dar la pista)."""
    for f in SRC.rglob("*.js"):
        if nombre in exports_de(f):
            return str(f.relative_to(SRC)).replace("\\", "/")
    return ""


if __name__ == "__main__":
    sys.exit(main())
