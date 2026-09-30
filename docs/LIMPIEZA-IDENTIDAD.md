# Limpieza de identidad del repo (2026-09-30)

> Lee esto ANTES de volver a trabajar el proyecto en la compu personal.
> Sin el paso 1, tu clon viejo te puede revertir toda la limpieza.

## Que se hizo y por que

Este es un proyecto **personal y academico, sin fines de lucro**. El historial
de git habia quedado ligado a un correo corporativo (por la config global de
la maquina donde se trabajo), y algunos documentos nombraban herramientas
internas de un empleador. Se limpiaron ambas cosas.

### 1. Contenido (commit `docs: proyecto personal/academico independiente`)

| Archivo | Antes | Ahora |
|---|---|---|
| `DISENO.md` | nombraba una plataforma interna de IA | "proveedor de LLM por API (OpenAI / Cloudflare Workers AI)" |
| `DISENO.md` (riesgos) | "Usar AI Launchpad" | "Modelos economicos (gpt-4o-mini)" |
| `index.html` | "bajado del artifactory de X" | "Import-map LOCAL (vendor/three)" |
| `CONTEXTO-VOZ.md` | 5 menciones a red/recursos de la empresa | redaccion generica ("redes con filtros") |
| `BITACORA.md` | "el Worker (AI Launchpad)" | "el Worker (Cloudflare)" |
| `worker/README.md` | "fuera de X" | "en tu propia cuenta" |
| `vendor/avatars/README.md` | "incluida la red de X" | "incluidas las que tienen filtros" |
| `SETUP-PERSONAL.md` | "proxy de X" | "proxy corporativo" |

### 2. Historial (`git filter-repo --mailmap`)

Se reescribieron **los 375 commits**. Antes habia tres identidades:

| Correo | Commits |
|---|---:|
| corporativo | 284 |
| `johsua@example.com` (placeholder) | 46 |
| `joshizaguirrea-hub@users.noreply.github.com` | 44 |

Ahora **los 375** son `Johsua Izaguirre <joshizaguirrea-hub@users.noreply.github.com>`.

**Todos los hashes cambiaron.** El contenido de cada commit es identico; solo
cambio la identidad del autor. Verificado con `git fsck` (sin errores).

### 3. Prevencion

- `.git/config` local fija la identidad correcta (gana sobre la global).
- **Hook `.git/hooks/pre-commit`**: bloquea cualquier commit cuyo correo no sea
  el permitido. Probado en ambos sentidos (bloquea el malo, deja pasar el bueno).
  OJO: los hooks **no viajan por git**. Si clonas de nuevo, copialo a mano
  (esta guardado en `docs/pre-commit.sample`).

## Respaldo

Antes de reescribir se hizo un espejo completo:

```
C:\Users\j0i02ut\Documents\puppy_workspace\plataforma-idiomas-BACKUP.git
```

375 commits con el historial ORIGINAL. **Borralo cuando confirmes que todo
quedo bien** (contiene el correo viejo).

---

## PASO 1 OBLIGATORIO en la compu personal

Tu clon de alla tiene el historial VIEJO. Si haces `git pull`, git va a
intentar fusionar dos historias sin ancestro comun y **puede reintroducir los
commits con el correo corporativo**. No hagas pull: **vuelve a clonar**.

```powershell
# 1. Renombra el clon viejo (por si acaso; no lo borres todavia)
cd $env:USERPROFILE\Documents
Rename-Item learning-UP learning-UP-VIEJO

# 2. Clona limpio
git clone https://github.com/joshizaguirrea-hub/learning-UP.git
cd learning-UP

# 3. Fija la identidad en el repo nuevo
git config --local user.name  "Johsua Izaguirre"
git config --local user.email "joshizaguirrea-hub@users.noreply.github.com"

# 4. Copia el hook (no viaja por git)
Copy-Item docs\pre-commit.sample .git\hooks\pre-commit

# 5. Confirma que quedo limpio: debe imprimir UN solo correo
git log --all --format="%ae" | Sort-Object -Unique

# 6. Cuando todo funcione, borra el viejo
Remove-Item -Recurse -Force ..\learning-UP-VIEJO
```

## PASO 2 — purgar los commits viejos en GitHub

`push --force` **no** borra los commits viejos de los servidores de GitHub:
quedan como objetos huerfanos, accesibles por URL directa
(`github.com/<user>/<repo>/commit/<hash-viejo>`) hasta que GitHub los recolecte.

Para que desaparezcan de verdad hay que **pedirlo a Soporte**:
https://support.github.com/contact

Texto sugerido:

> Hi, I force-pushed a rewritten history to my repository
> `joshizaguirrea-hub/learning-UP` to remove an email address that should not
> have been in the commit metadata. Could you please run garbage collection on
> the repository so the old, unreferenced commits are no longer accessible via
> direct URLs? Thank you.

Tambien conviene revisar en GitHub:
- **Settings -> Emails**: que el correo corporativo no este en la cuenta.
- Marcar **"Keep my email addresses private"** y **"Block command line pushes
  that expose my email"** (evita que vuelva a pasar desde cualquier maquina).

## Nota honesta

Esto limpia lo que se VE: el correo y las menciones. Las **fechas y horas** de
los commits siguen siendo las reales y no se tocaron (falsificarlas seria peor).
Si hubiera alguna duda sobre politicas de tu empleador respecto a proyectos
personales, eso es una conversacion con RRHH o tu manager, no algo que resuelva
`git filter-repo`.
