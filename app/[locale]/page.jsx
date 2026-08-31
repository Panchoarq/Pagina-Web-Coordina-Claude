import Link from "next/link";
import { getDict } from "@/lib/i18n";
import {
  getPublishedProjects,
  aggregate,
  pickRandomWithImage,
  firstImage,
} from "@/lib/airtable";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ServiceList from "@/components/ServiceList";
import ProjectGrid from "@/components/ProjectGrid";
import pageStyles from "./page.module.css";

// Las URLs de imágenes de Airtable expiran: la home se renderiza en cada
// visita (nunca estática), y así el proyecto del hero también rota.
export const dynamic = "force-dynamic";

export default async function HomePage({ params }) {
  const { locale } = await params;
  const dict = getDict(locale);

  const projects = await getPublishedProjects();
  const agg = aggregate(projects);
  const heroProject = pickRandomWithImage(projects);
  const heroImage = firstImage(heroProject);

  return (
    <>
      <Hero locale={locale} project={heroProject} image={heroImage} />

      {/* 02 — Qué hacemos */}
      <section id="que-hacemos" className="section">
        <div className="shell">
          <div className="index-head" data-reveal>
            <p className="index-tag">{dict.about.index}</p>
            <div className={pageStyles.prose}>
              <h2 className="index-title">{dict.about.title}</h2>
              <p className={pageStyles.body}>{dict.about.body}</p>
              <p className={pageStyles.landmark}>{dict.about.landmark}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Cifras */}
      <Stats locale={locale} liveCount={agg.count} liveArea={agg.totalArea} />

      {/* 04 — Servicios */}
      <ServiceList locale={locale} />

      {/* 05 — Proyectos (extracto) */}
      <ProjectGrid locale={locale} projects={projects} limit={9} showFilters />
      <div className={pageStyles.viewAllWrap}>
        <div className="shell">
          <Link href={`/${locale}/proyectos`} className="btn btn--ghost">
            {dict.projects.viewAll}
          </Link>
        </div>
      </div>

      {/* 06 — Estudio */}
      <section id="estudio" className="section section--dark">
        <div className="shell">
          <div className="index-head" data-reveal>
            <p className="index-tag">{dict.studio.index}</p>
            <div className={pageStyles.prose}>
              <h2 className="index-title">{dict.studio.title}</h2>
              <p className={pageStyles.body}>{dict.studio.body}</p>

              <p className={pageStyles.clientsLabel}>{dict.studio.clientsTitle}</p>
              <ul className={pageStyles.clients}>
                {dict.studio.clients.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>

              <p className={pageStyles.location}>{dict.studio.location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 07 — Contacto */}
      <section id="contacto" className="section">
        <div className="shell">
          <div className="index-head" data-reveal>
            <p className="index-tag">{dict.contact.index}</p>
            <div className={pageStyles.prose}>
              <h2 className={pageStyles.contactTitle}>{dict.contact.title}</h2>
              <p className={pageStyles.body}>{dict.contact.body}</p>
              <a className="btn btn--primary" href={`mailto:${dict.contact.email}`}>
                {dict.contact.cta}
              </a>
              <p className={pageStyles.email}>{dict.contact.email}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
