# Respaldo de diseño — "Grilla técnica" (dirección visual pre-rediseño monocromo)

Este documento deja registrada la dirección de diseño que estaba en producción
en `coordinabimconsulting.com` justo antes de arrancar el rediseño editorial
monocromo (branch `diseno-monocromo`, referencia visual: kononenkogroup.com).
Sirve para no perder el trabajo/criterio actual y poder volver a él o
recuperar piezas sueltas más adelante — sin tener que andar arqueológicamente
por el historial de git.

**Commit de referencia:** el HEAD de `main` en el momento de crear este
documento (revisar `git log -1` en esta misma carpeta si hace falta el hash
exacto). Todo lo descrito abajo sigue existiendo tal cual en `main`; el
rediseño ocurre en un branch aparte y no lo pisa.

## Concepto central

El sitio se presenta como una herramienta/dashboard técnico de coordinación
BIM, no como un portafolio editorial clásico. El lenguaje visual toma
prestado de planos y software de detección de conflictos (clash detection):
grillas de coordenadas, marcadores tipo "nube de revisión", contador en vivo,
fondo tipo blueprint animado.

## Tokens de diseño (`style.css`)

- **Fondo (paper):** `--bg: #f4f1ea` (crema/papel), `--bg-alt: #ebe7dd`
- **Tinta:** `--ink: #0e0e0e`, `--ink-soft: #4a4a48`, `--ink-mute: #8a8680`
- **Acento base:** `--accent: #0A4D8C` (azul), pero el tema activo en
  producción lo pisa con `--accent: #FF5B1F` (naranja) vía `TWEAK_DEFAULTS`
  en `app/app-mount.jsx`
- **Header oscuro (home):** `#101010` (hardcodeado, no usa variable —
  cambiado desde `var(--ink)` en el commit `fb52713`)
- **Tipografías:**
  - Sans: `Space Grotesk` (`--font-sans`)
  - Mono: `JetBrains Mono` (`--font-mono`) — usado en labels, nav, tags
  - Serif ocasional: `Fraunces` (cargada en `template.html`, uso puntual)
  - `Archivo Narrow` también cargada (uso puntual/condensado)

## Motivos visuales clave

1. **Header sticky** con logo centrado, nav mono uppercase a los lados,
   fondo oscuro (`#101010`) en Home, claro (`--bg`) en Portafolio.
2. **Hero oscuro con "blueprint" animado** (`HeroB` en `app/app-3.jsx`):
   fondo de plano técnico (isométrico, líneas de coordinación), marcador de
   "Clash Detection — Coordinación en vivo" con círculo pulsante, marquee
   horizontal con contador de proyectos en vivo.
3. **Portafolio como mosaico técnico**: tarjetas con código de proyecto tipo
   sello (`EDU-01`, `CUL-01`, `RET-01`) en la esquina superior, filtros por
   tipología (pastillas) y por servicio (pastillas separadas, sección
   "Servicio"), contador de proyectos + m² totales arriba del grid.
4. **Ficha técnica (modal)**: galería con tags `NP`/`ES` (nube de puntos /
   escaneo) y `AB` (as-built) según convención de nombre de archivo, fondo
   oscuro con blur.
5. **Panel de tweaks** (`TweaksPanel`, activable vía `postMessage` desde un
   iframe editor) con dials: `portfolio` (layout), `sort`, `intensity`,
   `type`, `accent` — pensado para ajustar la intensidad del lenguaje visual
   sin tocar código.

## Estructura de la Home (orden de secciones)

`Header (dark) → HeroB → Experience → PortfolioSummary → Services →
PortfolioSection (preview) → Contact → Footer`

(Nota: en el estado más reciente de `main`, `PortfolioSummary` se sacó del
home y el portafolio se unificó en una sola experiencia — ver commit
`ad5203e` "Unifica el portafolio en una sola experiencia". Confirmar el
detalle exacto leyendo `app/app-mount.jsx` en el commit de referencia si se
necesita reconstruir esto en detalle.)

## Por qué se documenta esto ahora

El usuario pidió explícitamente dejar grabada esta propuesta ("grilla
técnica") antes de avanzar con el rediseño monocromo/editorial inspirado en
kononenkogroup.com, para no perder el criterio de diseño actual ni el
trabajo ya afinado (colores, motivos, copy) en caso de que se quiera retomar
o mezclar elementos más adelante.
