const FACES = Array.from({ length: 12 }, (_, i) => `https://picsum.photos/seed/coordina-team-${i}/300/300`);

export default function TeamSection() {
  return (
    <section className="container" id="team">
      <div className="section-head">
        <p className="mono">People & process</p>
        <h2>Un equipo formado en obra, no solo en pantalla.</h2>
      </div>
      <div className="team-grid">
        {FACES.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={src} alt="" />
        ))}
      </div>
      <div className="stat-band" style={{ marginTop: 56 }}>
        <div className="stat-cell">
          <h3>15+</h3>
          <p>Años de experiencia</p>
        </div>
        <div className="stat-cell">
          <h3>75+</h3>
          <p>Proyectos coordinados</p>
        </div>
        <div className="stat-cell">
          <h3>12+</h3>
          <p>Profesionales en el equipo</p>
        </div>
        <div className="stat-cell">
          <h3>1.9M</h3>
          <p>m² coordinados</p>
        </div>
      </div>
    </section>
  );
}
