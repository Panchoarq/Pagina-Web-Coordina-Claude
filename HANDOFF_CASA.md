# Cómo retomar este proyecto desde otro computador

Todo el código está en GitHub — nada vive solo en este PC. Con esta guía deberías poder seguir trabajando desde cualquier otra máquina.

---

## 0. Estado de despliegue (leer primero)

**Producción está al día — no hay ningún fix pendiente de desplegar.**

Verificado en vivo contra `coordinabimconsulting.com` el 2026-08-28: el
fix de logo (transparente, mismo tamaño en todas las vistas), header
oscuro `#101010`, menú que respondía mal desde Portafolio, y el botón
Atrás del navegador — **todo eso ya está en producción**, desplegado
desde `main` en el commit `8972da7` (y `vercel --prod` ya corrido sobre
ese commit).

Si otra sesión de Claude pregunta "¿despliego el fix pendiente de
logo/menú/back?" — la respuesta es **no, ya está desplegado**, no hace
falta correr `vercel --prod` de nuevo por eso. Antes de asumir que algo
quedó pendiente, comparar el commit de `main` (`git log origin/main
--oneline -1`) contra lo que responde `curl coordinabimconsulting.com`
en vivo, en vez de asumir por el historial de conversación.

El único trabajo realmente pendiente ahora mismo es la exploración de
diseño en el branch `galeria-nueva` (ver sección 9) — esa sí NO está
en producción todavía, a propósito, porque es solo una maqueta en
revisión.

---

## 1. Repositorio (código)

**URL:** https://github.com/Panchoarq/Pagina-Web-Coordina-Claude

Clonarlo en la máquina de casa:
```bash
git clone https://github.com/Panchoarq/Pagina-Web-Coordina-Claude.git
```

Requiere tener **Git** instalado ([git-scm.com](https://git-scm.com)) y estar logueado con tu cuenta de GitHub (`Panchoarq`) — la primera vez que hagas `git push` te va a pedir iniciar sesión (se abre el navegador).

---

## 2. Sitio en producción

- **Dominio propio:** https://coordinabimconsulting.com
- **URL de Vercel (alias):** https://pagina-web-coordina.vercel.app
- **Proyecto en Vercel:** `panchoarqs-projects/pagina-web-coordina`
- **Dominio registrado en:** Cloudflare (ahí se configuró el DNS apuntando a Vercel)

---

## 3. Airtable (fuente de datos — proyectos, servicios, imágenes)

- **Base:** `appcfnhyOaMOMJjsc`
- **Tabla:** `Proyectos`
- Ahí se administra todo el contenido: datos de cada proyecto, fotos (campo "Archivos adjuntos"), y el checkbox **Publicado** que decide si algo se muestra en el sitio.
- **Convención de nombre de archivo para fotos:** sufijo `-NP`/`-ES` (nube de puntos/escaneo) o `-AB` (as-built) antes de la extensión, ej. `CULT-03-11-NP.jpg`. Sin sufijo = foto genérica.
- Campos nuevos agregados: `Comentario` (texto) + `Comentario publicado` (checkbox) — independiente del "Publicado" general del proyecto.

---

## 4. Vercel — CLI y variables de entorno

En la máquina de casa, dentro de la carpeta del proyecto clonado:
```bash
npm i -g vercel
vercel login
vercel link
```
`vercel link` va a preguntar por el proyecto — elige **"Link to existing project"** y selecciona `pagina-web-coordina` (no "Create a new project", ya existe).

**Variable de entorno necesaria:** `AIRTABLE_TOKEN` (Personal Access Token de Airtable, scope `data.records:read`, sobre la base `appcfnhyOaMOMJjsc`). Ya está cargada en Vercel (Production + Preview) — no hay que volver a crearla ahí. Pero para probar **localmente** con la función serverless (`vercel dev`), hay que crear un archivo `.env.local` en la raíz del proyecto:
```
AIRTABLE_TOKEN=pat_tu_token_aqui
```
(Hay una plantilla en `.env.local.example` — cópiala y completa el valor. `.env.local` nunca se sube a git.)

---

## 5. Cómo desplegar cambios

```bash
git add -A
git commit -m "descripción del cambio"
git push origin main
vercel --prod
```

(La conexión automática GitHub→Vercel para deploy en cada push no quedó activada — por eso el `vercel --prod` manual al final.)

---

## 6. Estructura del proyecto

```
index.html            → NO EXISTE, fue renombrado a template.html
template.html         → plantilla HTML base (head, fonts, scripts)
style.css             → todo el CSS del sitio
app/                  → 8 archivos .jsx (React sin build step, se compilan
                         en el navegador con Babel Standalone vía CDN)
api/
  _airtable.js         → lógica compartida de fetch/mapeo de Airtable
  projects.js          → endpoint que el sitio consulta para traer proyectos
  render.js             → genera el HTML de "/" con contenido real (SEO)
vercel.json            → rewrite de "/" hacia api/render.js
robots.txt, sitemap.xml
logo-coordina-clean.png   → logo para header claro (fondo papel)
logo-coordina-dark.png    → logo para header oscuro (home)
fotos/hospital-mep-inv.jpg → foto de fondo del hero
```

**Importante:** no hay build step (no Webpack/Vite). El código `.jsx` se sirve tal cual y se compila en vivo en el navegador. Esto es intencional por simplicidad, pero significa que cualquier error de sintaxis en un `.jsx` rompe el sitio en producción sin aviso previo — conviene probar localmente antes de desplegar.

---

## 7. Probar localmente

```bash
npx serve -l 5178 .
```
Abre `http://localhost:5178/template.html` (no `/`, porque `index.html` ya no existe — el servidor estático local no sabe hacer el rewrite que sí hace Vercel en producción). Esto sirve para probar cambios visuales/de interacción, pero **no** prueba la función `/api/projects` ni `/api/render` (esas requieren `vercel dev` con el token cargado en `.env.local`).

---

## 8. Accesos que vas a necesitar

- **GitHub:** cuenta `Panchoarq` (para `git push`)
- **Vercel:** cuenta con acceso a `panchoarqs-projects`
- **Airtable:** el Personal Access Token (el mismo que ya usaste, o generar uno nuevo desde Airtable → Developer Hub → Personal access tokens)
- **Cloudflare:** solo si necesitas tocar el DNS del dominio (normalmente no hace falta)

---

## 9. Branch en curso: rediseño de la galería

Hay un branch **`galeria-nueva`** (ya en GitHub) con una exploración de diseño
para el portafolio y el hero — dirección "lámina técnica" (grilla de
coordenadas, capas por disciplina en vez de pastillas genéricas, hero con
marco tipo plano). Ver `design-exploration/README.md` dentro de ese branch
para el detalle completo y el estado (maqueta aprobada, falta construir en
código real).

Para retomarlo en la máquina de casa:
```bash
git fetch origin
git checkout galeria-nueva
```

**No afecta el SEO** — `api/render.js` es independiente de los componentes
visuales, así que este rediseño no toca la indexación en Google.

**Skills de diseño usados** (para tenerlos también en casa):
- `frontend-design` — parece venir incluido en Claude Code por defecto (no
  se encontró como plugin instalable aparte). Revisa si aparece solo en la
  lista de skills al escribir `/` en una sesión nueva; si no, prueba
  actualizar el CLI de Claude Code.
- `design:design-critique` (plugin "design", también trae `design-system`,
  `accessibility-review`, `design-handoff`, etc.) — no se pudo confirmar un
  comando de instalación exacto desde esta sesión. En una sesión interactiva
  en la máquina de casa, corre `/plugin`, busca "design" en el marketplace,
  e instálalo si aparece ahí.
