#!/usr/bin/env python3
"""tools/gen_worker_page.py - Genera una pagina para copiar el Worker a Cloudflare.

El Worker NO viaja con GitHub Pages: vive en Cloudflare y se despliega aparte.
Hasta que se pega alla, los cambios de prompts/voces no le llegan al alumno.

Esta pagina se GENERA (no se escribe a mano) para que el codigo mostrado sea
SIEMPRE el del archivo real. Una copia manual se desincroniza el primer dia.

Uso:  python tools/gen_worker_page.py   ->  desplegar-worker.html
"""
import datetime as dt
import html
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WORKER = ROOT / "worker" / "bymax-worker.js"
OUT = ROOT / "desplegar-worker.html"

# Si alguno de estos patrones aparece, NO se genera la pagina: seria publicar
# un secreto en un archivo que acaba en el repo.
SECRET_PATTERNS = [
    (r"sk-[A-Za-z0-9]{10,}", "clave de OpenAI en duro"),
    (r"(?i)(api_?key|secret|token)\s*[:=]\s*[\"'][A-Za-z0-9_\-]{16,}", "credencial en duro"),
    (r"Bearer\s+[A-Za-z0-9_\-]{20,}", "token Bearer en duro"),
]


def git_commit() -> str:
    try:
        out = subprocess.run(
            ["git", "log", "-1", "--format=%h %ad", "--date=short", "--", str(WORKER)],
            cwd=ROOT, capture_output=True, text=True, timeout=10,
        )
        return out.stdout.strip() or "sin datos de git"
    except Exception:
        return "sin datos de git"


def main() -> int:
    if not WORKER.exists():
        print(f"[X] No encuentro {WORKER}")
        return 1

    code = WORKER.read_text(encoding="utf-8")

    for pattern, label in SECRET_PATTERNS:
        if re.search(pattern, code):
            print(f"[X] ABORTADO: parece haber {label} en el Worker.")
            print("    Sacalo a una variable de entorno antes de generar la pagina.")
            return 1

    env_vars = sorted(set(re.findall(r"env\.([A-Z_][A-Z0-9_]*)", code)))

    # El codigo va dentro de <pre>: escapar < > & es obligatorio. Ademas se
    # parte "</script" por si algun dia el Worker genera HTML: sin esto, el
    # navegador cerraria el bloque antes de tiempo.
    safe = html.escape(code).replace("</script", "<\\/script")

    page = TEMPLATE.format(
        code=safe,
        lines=len(code.splitlines()),
        kb=round(len(code.encode("utf-8")) / 1024, 1),
        commit=html.escape(git_commit()),
        generated=dt.datetime.now().strftime("%d/%m/%Y %H:%M"),
        env_rows="\n".join(
            f'      <li><code>{html.escape(v)}</code></li>' for v in env_vars
        ),
        env_count=len(env_vars),
    )
    OUT.write_text(page, encoding="utf-8")
    print(f"OK: {OUT.name} generado ({len(code.splitlines())} lineas, {len(env_vars)} variables)")
    return 0


TEMPLATE = """<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Desplegar el Worker - Learning UP</title>
<script src="https://cdn.tailwindcss.com"></script>
<style>
  /* Fondo propio: esta pagina se abre sola, sin el CSS de la app. */
  body {{ background:#0f172a; }}
  pre {{ tab-size: 2; }}
  /* El numero de paso no se selecciona: asi copiar el texto no arrastra "1." */
  .step::before {{
    content: counter(step); counter-increment: step;
    position:absolute; left:0; top:2px; width:1.75rem; height:1.75rem;
    display:grid; place-items:center; border-radius:9999px;
    background:#4338ca; color:#fff; font-weight:700; font-size:.8rem;
    user-select:none;
  }}
  ol.steps {{ counter-reset: step; }}
</style>
</head>
<body class="text-slate-200 antialiased">
<main class="max-w-4xl mx-auto px-4 py-8 sm:py-12">

  <header class="mb-8">
    <p class="text-xs uppercase tracking-wider text-indigo-400 font-semibold">Learning UP</p>
    <h1 class="text-3xl sm:text-4xl font-bold text-white mt-1">Desplegar el Worker</h1>
    <p class="mt-3 text-slate-400 leading-relaxed">
      El Worker vive en <b class="text-slate-200">Cloudflare</b>, no en GitHub Pages.
      Por eso no se actualiza solo cuando publicas la app: hay que pegarlo a mano.
      Hasta que lo hagas, la IA sigue con los prompts viejos.
    </p>
  </header>

  <!-- Aviso: lo que de verdad cambia para el alumno -->
  <section class="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 sm:p-5 mb-8">
    <h2 class="font-bold text-amber-200">Que arregla este despliegue</h2>
    <p class="mt-1.5 text-sm text-amber-100/90 leading-relaxed">
      Los prompts decian <code class="bg-black/30 px-1 rounded">Eres "Bymax"</code>, asi que la IA
      se presentaba con el nombre interno del motor aunque la pantalla dijera otra cosa.
      Ahora usan <code class="bg-black/30 px-1 rounded">{{TEACHER}}</code> y el nombre llega desde la app:
      <b>Megan</b> (cursos), <b>Mathias</b> (speaking), <b>Lucien</b> (entrevistas).
    </p>
  </section>

  <!-- Pasos -->
  <ol class="steps space-y-5 mb-8">
    <li class="step relative pl-10">
      <h3 class="font-semibold text-white">Abre tu Worker en Cloudflare</h3>
      <p class="text-sm text-slate-400 mt-0.5">
        <a href="https://dash.cloudflare.com/" target="_blank" rel="noopener"
           class="text-indigo-300 underline hover:text-indigo-200">dash.cloudflare.com</a>
        &rarr; Workers &amp; Pages &rarr; tu Worker &rarr; boton <b>Edit code</b>.
      </p>
    </li>
    <li class="step relative pl-10">
      <h3 class="font-semibold text-white">Borra TODO lo que haya en el editor</h3>
      <p class="text-sm text-slate-400 mt-0.5">
        Clic dentro, <kbd class="px-1.5 py-0.5 bg-slate-800 border border-slate-600 rounded text-xs">Ctrl</kbd>
        + <kbd class="px-1.5 py-0.5 bg-slate-800 border border-slate-600 rounded text-xs">A</kbd>, luego Suprimir.
        Esto reemplaza el archivo entero, no es un parche.
      </p>
    </li>
    <li class="step relative pl-10">
      <h3 class="font-semibold text-white">Copia el codigo de abajo y pegalo</h3>
      <p class="text-sm text-slate-400 mt-0.5">Usa el boton <b>Copiar todo</b>. Son {lines} lineas.</p>
    </li>
    <li class="step relative pl-10">
      <h3 class="font-semibold text-white">Dale a <b>Deploy</b></h3>
      <p class="text-sm text-slate-400 mt-0.5">Arriba a la derecha. Tarda unos segundos.</p>
    </li>
    <li class="step relative pl-10">
      <h3 class="font-semibold text-white">Compruebalo</h3>
      <p class="text-sm text-slate-400 mt-0.5">
        Abre la app &rarr; <b>Llamada con Mathias</b> y preguntale
        <i>&ldquo;what's your name?&rdquo;</i>. Debe responder Mathias, no Bymax.
      </p>
    </li>
  </ol>

  <!-- Variables de entorno -->
  <section class="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 sm:p-5 mb-8">
    <h2 class="font-bold text-white">Antes de pegar: revisa tus variables</h2>
    <p class="mt-1.5 text-sm text-slate-400 leading-relaxed">
      El codigo <b>no lleva ninguna clave dentro</b> (se verifica al generar esta pagina).
      Las lee de las variables del Worker. Si alguna falta, esa funcion se cae sola
      pero el resto sigue andando. Estan en <b>Settings &rarr; Variables and Secrets</b>.
      Este codigo usa {env_count}:
    </p>
    <ul class="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-slate-300 list-disc list-inside font-mono">
{env_rows}
    </ul>
    <p class="mt-3 text-xs text-slate-500">
      Pegar el codigo NO borra las variables: se configuran aparte.
    </p>
  </section>

  <!-- Codigo -->
  <section class="rounded-2xl border border-slate-700 bg-slate-950 overflow-hidden">
    <div class="flex items-center gap-3 px-4 py-3 bg-slate-900 border-b border-slate-700 sticky top-0 z-10">
      <div class="flex-1 min-w-0">
        <p class="font-semibold text-white text-sm truncate">worker/bymax-worker.js</p>
        <p class="text-xs text-slate-500">{lines} lineas &middot; {kb} KB &middot; commit {commit}</p>
      </div>
      <button id="copy" type="button"
        class="shrink-0 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold
               text-sm transition focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-400">
        Copiar todo
      </button>
    </div>
    <p id="copyMsg" role="status" class="hidden px-4 py-2 text-xs bg-amber-500/15 text-amber-200
       border-b border-amber-500/30"></p>
    <pre id="code" class="p-4 overflow-x-auto text-xs leading-relaxed text-slate-300"><code>{code}</code></pre>
  </section>

  <footer class="mt-6 text-center text-xs text-slate-600">
    Generado el {generated} por <code>tools/gen_worker_page.py</code> &middot;
    no edites este archivo a mano: vuelve a correr el script.
  </footer>
</main>

<script>
  // Se lee del <pre>, no de una copia en JS: una sola fuente de verdad.
  const codeEl = document.getElementById("code");
  const btn = document.getElementById("copy");
  const msg = document.getElementById("copyMsg");

  btn.addEventListener("click", async () => {{
    const text = codeEl.innerText;
    try {{
      if (!navigator.clipboard) throw new Error("sin portapapeles");
      await navigator.clipboard.writeText(text);
      btn.textContent = "Copiado";
      msg.classList.add("hidden");
      setTimeout(() => {{ btn.textContent = "Copiar todo"; }}, 2000);
    }} catch {{
      // Plan B: seleccionar el bloque para que un Ctrl+C funcione igual.
      const r = document.createRange();
      r.selectNodeContents(codeEl);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
      msg.textContent = "No pude copiarlo solo. Ya te lo deje seleccionado: usa Ctrl+C (o Cmd+C).";
      msg.classList.remove("hidden");
    }}
  }});
</script>
</body>
</html>
"""


if __name__ == "__main__":
    raise SystemExit(main())
