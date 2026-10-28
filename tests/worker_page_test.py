#!/usr/bin/env python3
"""tests/worker_page_test.py - La pagina de despliegue debe entregar el codigo EXACTO.

Lo que se pega en Cloudflare tiene que ser byte a byte el Worker. Si el escapado
HTML deja un &amp; suelto o se come un caracter, el Worker no arranca -- y el
error aparece en produccion, no aqui. Por eso se verifica el viaje completo:
archivo -> HTML -> des-escapado -> archivo.

Uso:  python tests/worker_page_test.py
"""
import html as html_mod
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WORKER = ROOT / "worker" / "bymax-worker.js"
PAGE = ROOT / "desplegar-worker.html"
GEN = ROOT / "tools" / "gen_worker_page.py"

failures = []


def check(label, cond, detail=""):
    print(f"  {'OK  ' if cond else 'FALLO'}  {label}")
    if not cond:
        failures.append(f"{label}{(' -> ' + detail) if detail else ''}")


def main() -> int:
    print("\n== Pagina de despliegue del Worker ==\n")

    # Se regenera siempre: si no, se estaria probando una version vieja.
    r = subprocess.run([sys.executable, str(GEN)], cwd=ROOT, capture_output=True, text=True)
    check("el generador corre sin error", r.returncode == 0, r.stderr.strip()[:200])
    if r.returncode != 0:
        return report()

    original = WORKER.read_text(encoding="utf-8")
    page = PAGE.read_text(encoding="utf-8")

    # Extraer lo que el usuario va a copiar (el contenido del <pre><code>).
    m = re.search(r'<pre id="code"[^>]*><code>(.*?)</code></pre>', page, re.S)
    check("la pagina contiene el bloque de codigo", m is not None)
    if not m:
        return report()

    # Deshacer exactamente lo que hizo el generador, en orden inverso.
    recovered = html_mod.unescape(m.group(1).replace("<\\/script", "</script"))

    # LA prueba: round-trip perfecto.
    check("el codigo recuperado es IDENTICO al original", recovered == original)
    if recovered != original:
        for i, (a, b) in enumerate(zip(original.splitlines(), recovered.splitlines()), 1):
            if a != b:
                print(f"\n    primera diferencia, linea {i}:")
                print(f"      original: {a[:90]!r}")
                print(f"      pagina  : {b[:90]!r}\n")
                break
        else:
            print(f"\n    distinto numero de lineas: "
                  f"{len(original.splitlines())} vs {len(recovered.splitlines())}\n")

    check("conserva el numero de lineas",
          len(recovered.splitlines()) == len(original.splitlines()))

    # La pagina se abre sola, sin el resto de la app.
    check("no depende de archivos locales (solo CDN)",
          'src="./' not in page and 'href="./' not in page)

    # El codigo no debe llevar secretos: el generador aborta, pero se comprueba
    # aqui tambien por si alguien edita la pagina a mano.
    for pat, label in [(r"sk-[A-Za-z0-9]{10,}", "clave OpenAI"),
                       (r"Bearer\s+[A-Za-z0-9_\-]{20,}", "token Bearer")]:
        check(f"la pagina no filtra {label}", not re.search(pat, page))

    # Las variables de entorno listadas deben ser las que el Worker usa.
    env_in_worker = set(re.findall(r"env\.([A-Z_][A-Z0-9_]*)", original))
    listed = set(re.findall(r"<li><code>([A-Z_][A-Z0-9_]*)</code></li>", page))
    check("lista TODAS las variables de entorno que usa el Worker",
          env_in_worker == listed,
          f"faltan: {sorted(env_in_worker - listed)}")

    # Instrucciones utiles: sin esto la pagina no sirve de guia.
    for needle, label in [("Deploy", "menciona el boton Deploy"),
                          ("Edit code", "dice donde esta el editor"),
                          ("Mathias", "explica como comprobarlo")]:
        check(label, needle in page)

    return report()


def report() -> int:
    print()
    if failures:
        print(f"FALLARON {len(failures)} comprobacion(es):")
        for f in failures:
            print("  - " + f)
        return 1
    print("TODO OK: lo que se copia es exactamente el Worker.\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
