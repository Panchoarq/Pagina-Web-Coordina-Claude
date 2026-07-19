# Handoff a Code — Conexión Airtable → Portafolio web

Documento de traspaso para implementar la conexión real y segura entre la base de datos de proyectos (Airtable) y la página web del portafolio. Generado: 2026-07-13.

---

## Contexto

Ya se probó la conexión con una versión de prueba en Design (client-side, con el token pegado a mano solo para validar visualmente). Funcionó bien — los datos, tags de servicios e imágenes se ven correctamente. Pero Design no tiene backend, así que no puede manejar el token de forma segura ni hacer fetch server-side. Por eso se necesita esta implementación en Code.

---

## Datos de conexión

- **Base ID:** `appcfnhyOaMOMJjsc`
- **Tabla:** `Proyectos`
- **Token:** el usuario lo tiene guardado (`pat...`, scope `data.records:read`, solo lectura). Se debe entregar como variable de entorno del proyecto — **nunca pegado en el código**.

## Endpoint y filtro

Trae solo los proyectos marcados como publicados:

```
GET https://api.airtable.com/v0/appcfnhyOaMOMJjsc/Proyectos?filterByFormula={Publicado}=1
Authorization: Bearer {AIRTABLE_TOKEN}
```

---

## Requisitos de implementación

1. **Fetch server-side obligatorio** — API route o función serverless. El token no debe llegar nunca al navegador del cliente.
2. **`AIRTABLE_TOKEN` como variable de entorno del servidor.**
3. **Las URLs de las imágenes que devuelve Airtable expiran y se regeneran.** No cachear como URL fija en un build estático. Volver a consultar la API en cada carga de página, o usar revalidación periódica (ISR) si el framework lo soporta.

---

## Campos por proyecto

| Campo Airtable | Descripción |
|---|---|
| `ID` | Código interno permanente (ej. `P001`). |
| `Código` | Código tipológico (ej. `SAL-01`). |
| `Proyecto` | Nombre del proyecto. |
| `Tipología` | Categoría única (Salud, Oficinas, Retail, etc.). |
| `Servicios` | Selección múltiple — mostrar como tags/chips. |
| `Descripción` | Texto descriptivo del servicio prestado. |
| `Cliente` | Nombre del cliente/mandante. |
| `Año` | Año o rango de años. |
| `Superficie (m2)` | Número. |
| `Destacado` | Booleano — para elegir portada u orden de despliegue. |
| `Archivos adjuntos` | Array de imágenes con URL (y metadata como filename). |

---

## Al conectar la página real

- Reemplazar el contenido fijo cargado a mano (~17 proyectos con imágenes propias) por la versión dinámica desde Airtable.
- **No borrar las entradas manuales** hasta confirmar que la versión conectada se ve igual de bien o mejor.
