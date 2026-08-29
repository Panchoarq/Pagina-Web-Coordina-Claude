# Plan — Rediseño editorial monocromo (branch `diseno-monocromo`)

Referencia visual: [kononenkogroup.com](https://kononenkogroup.com)

## Decisiones ya tomadas en conversación

1. **Rediseño completo**, no elementos sueltos — se deja atrás la estética
   "grilla técnica / clash detection" (queda documentada y respaldada en
   [`grilla-tecnica-2026.md`](./grilla-tecnica-2026.md) en `main`, por si se
   quiere retomar o mezclar algo después).
2. **Dirección editorial monocroma**: blanco/negro, fotografía protagonista,
   tipografía grande, bloques de cifras/logros, sin el naranja/azul de acento
   actual (a definir si se conserva algún acento mínimo de marca).
3. **Migrar la base técnica** de "React + Babel compilado en el navegador,
   sin build" a un framework con **SSR/ISR real** — elegido: **Next.js**
   (mejor calce que Astro para esta cantidad de interactividad: filtros,
   modales, visor WebGL, animaciones — evita fricción de "islands").
   - Esto resuelve de raíz el problema de SEO (Google no indexaba porque el
     HTML crudo era un `<div id="root"></div>` vacío — diagnóstico completo
     en el commit `edc378e`) sin el parche actual que causa el parpadeo
     (HTML de respaldo + `createRoot` reemplazando todo).
   - Con Next.js: **ISR con revalidación corta** (ej. cada 60s, igual que
     hoy) para mantener la dinámica con Airtable — agregar/sacar proyectos o
     fotos en Airtable se sigue reflejando solo, sin redeploy manual.
4. **Stack de animación**: **Lenis** (scroll suave, gratis) + **GSAP +
   ScrollTrigger** (scroll-reveals, pines, stacks — gratis). Se descarta
   `ScrollSmoother` por ser plugin pago del Club GSAP; Lenis da un resultado
   equivalente.
5. **Visor "Design Plans" con transición WebGL** para la ficha de proyecto
   (reemplaza el modal/lightbox actual): imagen grande + tira de miniaturas
   verticales + Prev/Next, con **crossfade vía Three.js** (shader de dos
   texturas) entre planos/fotos/nubes de puntos de un mismo proyecto —
   inspirado en la ficha de proyecto de Kononenko
   (`/work/pokrovskoe-private-house`, visto en grabación de pantalla del
   usuario).
6. Se descartó `ScrollSmoother`/efectos pagos; todo el stack de animación
   elegido es open-source.

## Pendiente de definir (antes de empezar a construir)

- **Paleta**: ¿monocromo puro (blanco/negro/grises) o se mantiene un acento
  mínimo de marca (el naranja `#FF5B1F` actual, en dosis muy baja)?
- **Tipografías**: hoy son `Space Grotesk` (sans) + `JetBrains Mono`. Para la
  dirección editorial, evaluar un sans display distinto (ver reglas de
  `design-taste-frontend`: evitar Inter, evitar serif por defecto salvo que
  se justifique).
- **Alcance del primer entregable**: ¿reconstruir todo el sitio de una vez,
  o primero un layout/hero + una ficha de proyecto de muestra (con el visor
  WebGL) para aprobar dirección antes de migrar las 75 fichas reales?
- **Estructura de páginas**: hoy todo es una sola SPA con "vistas" (home/
  portfolio). Con Next.js real, cada proyecto podría tener su propia URL
  (`/work/[slug]`, como Kononenko) en vez de un modal — a confirmar si se
  quiere ese cambio de arquitectura de navegación o mantener modal.

## Estado

Plan registrado, pendiente de aprobación del usuario para empezar a
scaffoldear el proyecto Next.js dentro de este branch.
