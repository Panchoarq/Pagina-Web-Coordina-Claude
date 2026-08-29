import { sampleProject } from "@/lib/sample-project";
import DesignPlansViewer from "@/components/DesignPlansViewer";
import ProjectGallery from "@/components/ProjectGallery";

export default function ProjectPage({ params }) {
  // Muestra unica por ahora; cuando se conecte Airtable esto busca por slug.
  const project = sampleProject;

  return (
    <>
      <section className="proj-hero" style={{ padding: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.heroImage} alt={project.name} />
        <div className="proj-hero-content">
          <div>
            <p className="mono" style={{ color: "rgba(255,255,255,0.6)", marginBottom: 12 }}>
              {project.code}
            </p>
            <h1 className="proj-hero-title">{project.name}</h1>
          </div>
          <p className="proj-hero-area">
            {project.area}
            <span>{project.areaUnit}</span>
          </p>
        </div>
      </section>

      <div className="container">
        <dl className="proj-meta">
          <div>
            <dt>Ubicacion</dt>
            <dd>{project.location}</dd>
          </div>
          <div>
            <dt>Cliente</dt>
            <dd>{project.client}</dd>
          </div>
          <div>
            <dt>Año</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Servicios</dt>
            <dd>{project.services.join(", ")}</dd>
          </div>
        </dl>

        <section style={{ maxWidth: "70ch", padding: "56px 0 0" }}>
          <p style={{ fontSize: 20, lineHeight: 1.6 }}>{project.description}</p>
        </section>

        <section>
          <div className="section-head" style={{ marginBottom: 24 }}>
            <p className="mono">Design plans</p>
          </div>
          <DesignPlansViewer plans={project.plans} />
        </section>

        <section>
          <div className="section-head" style={{ marginBottom: 24 }}>
            <p className="mono">Gallery</p>
          </div>
          <ProjectGallery images={project.gallery} />
        </section>
      </div>
    </>
  );
}
