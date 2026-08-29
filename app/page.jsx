import Link from "next/link";
import { getProjects } from "@/lib/projects";
import TeamSection from "@/components/TeamSection";
import AwardsSection from "@/components/AwardsSection";
import ClientsSection from "@/components/ClientsSection";

export const revalidate = 60;

export default async function HomePage() {
  const projects = await getProjects();
  const hero = projects[0];

  return (
    <>
      <section className="hero" style={{ padding: 0 }}>
        <div className="hero-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero.image} alt="" />
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
            <h3>{projects.length}+</h3>
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
          {projects.map((p) => (
            <Link key={p.slug} href={`/work/${p.slug}`} className="work-card">
              <div className="work-card-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} />
              </div>
              <div className="work-card-overlay">
                <h3>{p.name}</h3>
                <p>{p.code} — {p.typology} — {p.area} m²</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <AwardsSection />
      <TeamSection />
      <ClientsSection />
    </>
  );
}
