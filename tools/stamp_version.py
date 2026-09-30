#!/usr/bin/env python
"""tools/stamp_version.py - Sincroniza la version de VERSION en index.html y sw.js.

Por que existe: la version vive hardcodeada en 5 sitios (cache del Service
Worker, el ?v= de los assets, el footer). Si se editan a mano, tarde o temprano
uno se queda atras y la PWA sirve codigo viejo desde cache -> el alumno ve
"no cambio nada" aunque el deploy si salio. Un solo comando evita ese bug.

Fuente unica de verdad: el archivo VERSION.

Uso:
    python tools/stamp_version.py           # aplica la version de VERSION
    python tools/stamp_version.py --check   # solo verifica (exit 1 si desfasado)
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# (archivo, patron, plantilla de reemplazo con {v})
TARGETS = [
    ("index.html", r'styles/app\.css\?v=[\d.]+', 'styles/app.css?v={v}'),
    ("index.html", r'src/main\.js\?v=[\d.]+', 'src/main.js?v={v}'),
    ("index.html", r'<span class="text-slate-600">v[\d.]+</span>',
     '<span class="text-slate-600">v{v}</span>'),
    ("sw.js", r'const CACHE = "linguapath-v[\d.]+";',
     'const CACHE = "linguapath-v{v}";'),
    ("sw.js", r'"\./styles/app\.css\?v=[\d.]+"', '"./styles/app.css?v={v}"'),
]


def read_version() -> str:
    v = (ROOT / "VERSION").read_text(encoding="utf-8").strip()
    if not re.fullmatch(r"\d+\.\d+\.\d+", v):
        sys.exit(f"ERROR: VERSION no tiene formato X.Y.Z: {v!r}")
    return v


def main() -> int:
    check = "--check" in sys.argv
    version = read_version()
    changed, stale = [], []

    for name, pattern, template in TARGETS:
        path = ROOT / name
        text = path.read_text(encoding="utf-8")
        new_text, n = re.subn(pattern, template.format(v=version), text)
        if n == 0:
            print(f"AVISO: patron no encontrado en {name}: {pattern}")
            continue
        if new_text != text:
            stale.append(name)
            if not check:
                path.write_text(new_text, encoding="utf-8")
                changed.append(name)

    if check:
        if stale:
            print(f"DESFASADO: {', '.join(sorted(set(stale)))} no estan en v{version}")
            print("Corre: python tools/stamp_version.py")
            return 1
        print(f"OK: todo en v{version}")
        return 0

    if changed:
        print(f"OK: sellado v{version} en {', '.join(sorted(set(changed)))}")
    else:
        print(f"OK: ya estaba todo en v{version}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
