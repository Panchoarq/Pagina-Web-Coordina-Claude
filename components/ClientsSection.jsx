const CLIENTS = [
  "BAU Ingenieros Consultores",
  "Real Assets",
  "Tirado Arquitectos",
  "Rentas Falabella",
  "Icafal",
  "JG Ingenieros",
  "Banco Central de Chile",
  "Integra Proyectos",
  "Concesionaria Sacyr",
  "Bbats Consulting & Projects",
  "Alberto Moletto Arquitectos",
  "Cecilia Puga - Paula Velasco",
];

export default function ClientsSection() {
  return (
    <section className="container" id="clientes">
      <div className="section-head">
        <p className="mono">Mandantes</p>
        <h2>Oficinas y empresas con las que hemos coordinado.</h2>
      </div>
      <ul className="clients-grid mono">
        {CLIENTS.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </section>
  );
}
