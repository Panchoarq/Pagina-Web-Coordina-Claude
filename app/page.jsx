import Link from "next/link";
import { sampleProject } from "@/lib/sample-project";

export default function HomePage() {
  return (
    <>
      <section className="hero" style={{ padding: 0 }}>
        <div className="hero-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sampleProject.heroImage} alt="" />
        </div>
        <div className="hero-content">
          <p className="hero-eyebrow mono">Estudio de coordinacion BIM</p>
          <h1 className="hero-title">
            Modelos que resuelven obras reales.
          </h1>
          <p className="hero-sub">
            Asesoria BIM para proyectos de arquitectura, MEP y estructura —
            desde estandares y modelado hasta coordinacion y as-built.
          </p>
        </div>
      </section>

      <section className="container" id="studio">
        <div className="section-head">
          <p className="mono">Fundada en 2011</p>
          <h2>15 años coordinando proyectos de alta complejidad.</h2>
        </div>
        <div className="stat-band">
          <div className="stat-cell">
            <h3>15+</h3>
            <p>Años de experiencia</p>
          </div>
          <div className="stat-cell">
            <h3>75+</h3>
            <p>Proyectos coordinados</p>
          </div>
          <div className="stat-cell">
            <h3>1.9M</h3>
            <p>m² coordinados</p>
          </div>
          <div className="stat-cell">
            <h3>8</h3>
            <p>Lineas de servicio</p>
          </div>
        </div>
      </section>

      <section className="container" id="work">
        <div className="section-head">
          <p className="mono">Selected work</p>
          <h2>Proyectos seleccionados.</h2>
        </div>
        <div className="work-grid">
          <Link href={`/work/${sampleProject.slug}`} className="work-card">
            <div className="work-card-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sampleProject.heroImage} alt={sampleProject.name} />
            </div>
            <div className="work-card-overlay">
              <h3>{sampleProject.name}</h3>
              <p>{sampleProject.code} — {sampleProject.area} {sampleProject.areaUnit}</p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
