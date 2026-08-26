# Handoff a Code — Integración Airtable para Portafolio "coordina BIM Consulting"

> ## ✅ ESTADO ACTUAL (actualizado 2026-08-25): YA IMPLEMENTADO Y EN PRODUCCIÓN
> Este pedido **ya se completó** — no es un documento de trabajo pendiente.
> El portafolio en `coordinabimconsulting.com` consulta Airtable en vivo,
> server-side, en cada carga de página (`api/projects.js` + `api/_airtable.js`),
> con fetch server-side, paginación, y sin cachear URLs de attachments más de
> 60 segundos, tal como pedía este documento.
>
> `portafolio-test.html` y `coordina-proyectos.json` (mencionados abajo como
> entregables) siguen en el repo solo como referencia histórica — no se usan
> en producción.
>
> Ver **`HANDOFF_CASA.md`** para el estado completo y vigente del proyecto.

## Objetivo
Conectar la sección de portafolio del sitio a Airtable como fuente de datos, reemplazando (o sincronizando con) `data.jsx`.

## Credenciales / configuración
- **Base ID:** `appcfnhyOaMOMJjsc`
- **Tabla:** `Proyectos`
- **Token:** debe vivir en variable de entorno `AIRTABLE_TOKEN` (NUNCA hardcodeado en frontend ni commiteado)
- **Filtro:** solo traer registros publicados → `https://api.airtable.com/v0/appcfnhyOaMOMJjsc/Proyectos?filterByFormula={Publicado}=1`

## Campos de la tabla a mapear
| Campo Airtable | Tipo | Uso en el sitio |
|---|---|---|
| ID | texto | identificador interno |
| Código | texto | código de proyecto (ej. EDU-01), se muestra en ficha y portada |
| Proyecto | texto | nombre del proyecto |
| Tipología | selección simple | filtro de tipología en portafolio |
| Servicios | selección múltiple | tags de servicio en tarjeta + filtro de servicio |
| Descripción | texto largo | cuerpo de la ficha técnica |
| Cliente | texto | mandante, se muestra en ficha |
| Año | texto/número | se muestra en tarjeta y ficha |
| Superficie (m2) | número | se muestra en ficha, se usa en agregados de "Resumen de portafolio" |
| Destacado | checkbox | badge "Destacado" en tarjeta |
| Archivos adjuntos | attachment | imágenes de portada + galería |

## Requisitos técnicos clave
1. **Fetch server-side**, no desde el navegador — el token nunca debe ser visible en el HTML/JS entregado al cliente.
2. **Las URLs de attachments de Airtable expiran y se regeneran** — no cachear ni guardar la URL en build/estático. Consultar la API en cada carga de página (o con revalidación corta si se usa ISR/caché).
3. Manejar **paginación** de Airtable (respuesta trae `offset` si hay más de 100 registros).
4. Mantener soporte de imagen de portada = primer archivo adjunto del campo "Archivos adjuntos" (mismo criterio que hoy en `data.jsx`, donde el primer elemento del array `images` es la portada).

## Estado actual del sitio (histórico — ver banner arriba para el estado vigente)
- ~~El sitio real (`src-B-v2.html` + `data.jsx`) hoy usa datos **locales/estáticos**~~ — esto era cierto al momento de escribir este documento. Ahora el sitio (`template.html` + `app/*.jsx`) consulta Airtable en vivo; los datos locales (`PROJECTS_FALLBACK` en `app/app-1.jsx`) quedaron solo como respaldo de emergencia.
- `portafolio-test.html` — maqueta de referencia visual, nunca fue la implementación de producción, se conserva en el repo sin usarse.
- `coordina-proyectos.json` — export histórico de los 75 proyectos, ya no se usa como fuente de datos (Airtable es la única fuente de verdad).

## Entregables de este handoff
- Este documento
- `portafolio-test.html` (referencia visual de layout, no producción)
- `coordina-proyectos.json` (datos actuales para contraste/migración)
