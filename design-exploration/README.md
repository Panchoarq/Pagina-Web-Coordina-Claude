# Exploración de diseño — Galería como "lámina técnica"

Branch: `galeria-nueva`

## Qué es esto

Antes de reconstruir la galería/portafolio (y el hero) con un diseño distinto,
se armó una maqueta estática para revisar la dirección visual sin tocar
código real. Está en `galeria-mockup.html` — ábrelo directo en el navegador,
tiene 4 pestañas: Hero, Vista general, Filtrado por capa, Ficha técnica.

También se publicó como Artifact (privado, en la cuenta de Claude del
usuario) — pídele a Claude que lo vuelva a abrir con
`action: "list"` si necesitas el link de nuevo.

## La idea central

En vez de un mosaico de tarjetas genérico, la galería se comporta como una
lámina de planos técnicos real:
- Grilla de coordenadas (columnas A-B-C, filas 1-2-3) como en cualquier
  plano de arquitectura
- Cada proyecto = una "lámina" con su título block (código = número de
  lámina, en la esquina)
- Los filtros de servicio = panel de capas de CAD (cuadrito de color +
  nombre + toggle), coloreados por disciplina real (arquitectura, estructura,
  MEP) en vez de un solo azul genérico
- Hover = "nube de revisión" (el óvalo punteado real de planos) en vez de
  shadow/lift genérico
- El hero usa el mismo lenguaje: marco con coordenadas, marcador de
  conflicto con línea líder, franja de título block reemplazando el label
  suelto que tenía antes

## Estado

Maqueta aprobada por el usuario, **falta construir en código real**
(componentes React del sitio, en el branch `galeria-nueva`).

## Importante: el SEO no se toca

`api/render.js` (el HTML crudo que ve Google) es independiente de los
componentes visuales — genera su propio HTML desde Airtable directamente.
Rediseñar la galería no afecta la indexación, ver `HANDOFF_CASA.md`.

## Skills de diseño usados (Claude Code)

Dos skills se usaron para llegar a esta dirección — para tenerlos también
en la máquina de casa:

1. **`frontend-design`** — parece venir incluido por defecto en Claude Code
   (no se encontró como plugin instalable por separado). En la máquina de
   casa, revisa si aparece solo en la lista de skills disponibles al
   escribir `/` en una sesión de Claude Code. Si no aparece, puede que
   dependa de la versión del CLI — probar actualizando Claude Code
   (`npm install -g @anthropic-ai/claude-code` o el instalador que uses).

2. **`design:design-critique`** (y el resto de los skills con prefijo
   `design:` — `design-system`, `accessibility-review`, `design-handoff`,
   `research-synthesis`, `user-research`, `ux-copy`) — vienen de un plugin
   llamado "design". **No se pudo confirmar un comando de instalación
   exacto** — las herramientas de búsqueda de plugins de esta sesión no lo
   detectaron como instalable (puede estar habilitado a nivel de esta
   sesión/máquina específica). En la máquina de casa:
   - Abre una sesión interactiva de Claude Code
   - Corre `/plugin` (abre el marketplace de plugins)
   - Busca "design" ahí y instálalo si aparece
   - Si no aparece, dile a Claude en esa sesión "no tengo el plugin design,
     ¿cómo lo consigo?" — puede tener más contexto de cuenta/organización
     que esta sesión no tuvo acceso a verificar
