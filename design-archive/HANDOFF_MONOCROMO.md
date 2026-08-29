# Handoff — Rediseño monocromo (branch `diseno-monocromo`)

Estado al 2026-08-29. Todo commiteado y pusheado a `origin/diseno-monocromo`.
Documento vigente para retomar este trabajo desde cualquier máquina.

---

## 0. Qué es esto

Rediseño completo del sitio (referencia visual: [kononenkogroup.com](https://kononenkogroup.com)),
dirección editorial monocroma, en un branch aparte. **`main` no se toca** —
sigue siendo el sitio "grilla técnica" en producción real
(`coordinabimconsulting.com`), documentado en
[`grilla-tecnica-2026.md`](./grilla-tecnica-2026.md).

El plan completo de decisiones de diseño está en
[`plan-rediseno-monocromo.md`](./plan-rediseno-monocromo.md).

---

## 1. Cómo retomarlo

```bash
git fetch origin
git checkout diseno-monocromo
git pull origin diseno-monocromo
npm install
npm run dev
```

Abrir `http://localhost:3000`. Home en `/`, ficha de proyecto en
`/work/<slug>` (slug = código Airtable en minúscula, ej. `/work/sal-01`
para proyectos reales, o los slugs de muestra tipo
`/work/hospital-cordillera`).

**Ojo:** al correr local, Airtable normalmente **no** carga datos reales —
ver sección 4 (por qué, y que no es un bug).

---

## 2. Qué está construido

- **Stack:** Next.js 15 (App Router), Server Components async, sin Babel
  standalone ni build-en-el-navegador (eso resuelve de raíz el problema de
  SEO/parpadeo del sitio viejo — ver `edc378e` en `main`).
- **Tipografía:** Geist Sans + Geist Mono (`geist` npm package, via
  `next/font`) — reemplaza Space Grotesk/JetBrains Mono del sitio viejo.
- **Animación:** Lenis (scroll suave) + GSAP/ScrollTrigger registrados en
  `components/SmoothScroll.jsx`. Equivalentes gratuitos a lo que usa
  Kononenko (ScrollSmoother es plugin pago, se evita).
- **Home** (`app/page.jsx`): hero full-bleed B/N, banda de cifras, grid de
  proyectos (`work-grid`), sección de trayectoria (proyectos emblemáticos
  reales: Aeropuerto Santiago, GAM, Banco Central), grid de equipo +
  cifras, muro de mandantes reales (wordmarks de texto, no logos
  inventados).
- **Ficha de proyecto** (`app/work/[slug]/page.jsx`):
  - Hero con número de m² gigante en la esquina (estilo Kononenko).
  - **Visor "Design Plans"** (`components/DesignPlansViewer.jsx`): crossfade
    real vía WebGL (Three.js, shader propio de dos texturas) entre las
    imágenes del proyecto + tira de miniaturas — replica el visor de planos
    de la ficha de proyecto de Kononenko (visto en grabación de pantalla
    del usuario, `/work/pokrovskoe-private-house`).
  - **Galería con 3 vistas** (`components/ProjectGallery.jsx`): toggle
    Detail / Masonry / Slider, igual que la galería de Kononenko.
- **Datos:** `lib/projects.js` expone `getProjects()` / `getProjectBySlug()`
  — intentan Airtable primero (`lib/airtable.js`), si falla caen a
  `PROJECTS_FALLBACK` (8 proyectos de muestra, uno por tipología, datos
  reales de `coordina-proyectos.json`). Misma filosofía de resiliencia que
  `PROJECTS_FALLBACK` en el sitio viejo — nunca se deja la página sin
  contenido.

---

## 3. Airtable — conexión real

- `lib/airtable.js`: fetch server-side a la base `appcfnhyOaMOMJjsc`, tabla
  `Proyectos`, filtro `{Publicado}=1` — misma base/tabla/filtro que el
  sitio viejo (`api/_airtable.js` en `main`), portado a ESM.
- **ISR real de Next.js**: `fetch(url, { next: { revalidate: 60 } })` — no
  hay caché casero, es el mecanismo nativo de Next.js. Agregar/sacar
  proyectos o fotos en Airtable se refleja solo, sin redeploy.
- Slug de cada proyecto = código Airtable normalizado (`sal-01`, `edu-03`,
  etc.) vía `slugify()` en `lib/airtable.js`.
- **Verificado en Vercel** (deploy preview `1237c79`): cargan los 37
  proyectos publicados reales, con fotos de Airtable. Confirmado con
  `vercel curl` — ver sección 5.

---

## 4. Por qué Airtable no carga en local (y no es un bug)

`AIRTABLE_TOKEN` vive en Vercel (Preview + Production). Al traerlo a
`.env.local` con `vercel env pull --environment=preview`, el entorno de la
sesión de Claude que armó este handoff **redactó el valor real** (quedó
literalmente como `"[SENSITIVE]"` en el archivo) — es una protección de
credenciales del propio entorno de Claude, no un error de configuración.
Por eso local siempre cae al fallback (`PROJECTS_FALLBACK`) con un warning
en consola (`Airtable 401: AUTHENTICATION_REQUIRED`) — es el comportamiento
esperado del try/catch, no una falla real.

**En una máquina real (no una sesión de Claude), `vercel env pull` debería
traer el token real sin problema** — probarlo ahí para confirmar Airtable
en local. En Vercel mismo (build/runtime real) el token siempre estuvo
disponible sin redacción — por eso el deploy sí mostró los 37 proyectos
reales.

---

## 5. Deploy — cómo probarlo sin correr nada local

```bash
vercel link --yes --project pagina-web-coordina   # solo la primera vez
vercel deploy                                      # preview, no toca produccion
```

Genera una URL tipo
`https://pagina-web-coordina-<hash>-panchoarqs-projects.vercel.app`.

**Deployment Protection está activo** — hay que estar logueado con la
cuenta de Vercel (`panchoarq`) para verla en el navegador. Para chequear
contenido sin loguearse (ej. desde una sesión de Claude), usar:
```bash
vercel curl <url-del-deploy>
```

### Bug ya resuelto: 404 en el primer deploy

El proyecto en el dashboard de Vercel seguía configurado como **Framework
Preset: "Other"** (del sitio estático viejo), con "Output Directory:
`public` si existe". Como Next.js sí genera una carpeta `public/`, Vercel
servía *solo esa carpeta* (una imagen suelta) como si fuera todo el sitio
→ 404 en cualquier ruta real. **Fix:** `vercel.json` con
`{"framework": "nextjs"}` en la raíz — fuerza el framework correcto sin
tener que tocar el dashboard. Ya está commiteado, no hace falta repetir
este fix.

También se sacó el `vercel.json` viejo (rewrite `/` → `/api/render`, que ya
no existe en este branch).

---

## 6. Pendiente / no resuelto

- **Producción real:** este branch nunca se promovió a producción
  (`vercel deploy --prod`) ni se mergeó a `main` — sigue siendo solo
  preview, a propósito, mientras se aprueba la dirección visual completa.
- **Contacto / formulario:** el footer tiene datos de contacto de ejemplo
  (`hola@coordinabimconsulting.com`, `+56 9 0000 0000`) — hay que
  reemplazar por los datos reales (ver commit `350e509` en `main` para los
  datos de contacto reales ya actualizados ahí).
- **Efecto WebGL exacto de Kononenko:** el crossfade implementado es una
  interpretación razonable (wipe diagonal simple), no un calco pixel a
  pixel del shader original de Kononenko (no se pudo inspeccionar el GLSL
  real, solo se identificó *dónde* y *qué tipo* de efecto es, vía grabación
  de pantalla del usuario).
- **Migración completa de las 75 fichas** vs. los 8 de muestra: ya no
  aplica — Airtable trae los 37 proyectos publicados reales automáticamente
  vía `getProjects()`, no hace falta cargarlos a mano.
- **Revisar en el dashboard de Vercel** si el Framework Preset quedó
  realmente en "Next.js" tras el fix de `vercel.json`, o si conviene
  además actualizarlo a mano en Project Settings → General para que quede
  prolijo (el `vercel.json` ya lo fuerza igual, es solo estético).

---

## 7. Estructura de archivos nueva (vs. el sitio viejo en `main`)

```
app/
  layout.jsx          -> fuentes, SmoothScroll, Header/Footer globales
  page.jsx            -> home
  work/[slug]/page.jsx -> ficha de proyecto dinamica
  globals.css         -> todos los estilos (tokens monocromos)
components/
  SiteHeader.jsx, SiteFooter.jsx, SmoothScroll.jsx
  DesignPlansViewer.jsx  -> visor WebGL
  ProjectGallery.jsx     -> galeria Detail/Masonry/Slider
  TeamSection.jsx, AwardsSection.jsx, ClientsSection.jsx
lib/
  projects.js  -> getProjects()/getProjectBySlug() (Airtable + fallback)
  airtable.js  -> fetch real a Airtable (ISR)
api/
  _airtable.js -> logica vieja, ya no se usa (queda de referencia, se
                  puede borrar cuando se confirme que lib/airtable.js la
                  reemplaza del todo)
public/fotos/  -> assets estaticos (logo, foto hero)
```

Se **eliminaron** de este branch (siguen intactos en `main`):
`template.html`, `style.css`, `app/app-*.jsx`, `app/app-mount.jsx`,
`api/render.js`, `api/projects.js`, `portafolio-test.html`.
