const ITEMS = [
  { title: "Aeropuerto Internacional de Santiago", meta: "Modelos iniciales AS-BUILT — nube de puntos" },
  { title: "Centro Cultural GAM", meta: "As-Built etapa 2 — escaneo laser" },
  { title: "Banco Central de Chile", meta: "Asesoria y politica BIM — Central de Efectivo" },
  { title: "Hospitales de alta complejidad", meta: "Coordinacion BIM a lo largo de Chile" },
];

export default function AwardsSection() {
  return (
    <section className="container" id="trayectoria">
      <div className="section-head">
        <p className="mono">Trayectoria</p>
        <h2>33 años de oficina, 15 dedicados a asesorias BIM.</h2>
      </div>
      <ul className="awards-list">
        {ITEMS.map((it) => (
          <li key={it.title}>
            <span className="mono">Proyecto emblematico</span>
            <h3>{it.title}</h3>
            <p>{it.meta}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
