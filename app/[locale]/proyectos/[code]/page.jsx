import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, typologyLabel } from "@/lib/i18n";
import { getPublishedProjects, getProjectByCode, TYPOLOGIES } from "@/lib/airtable";
import Gallery from "@/components/Gallery";
import styles from "./project.module.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { locale, code } = await params;
  const project = await getProjectByCode(code);
  if (!project) return { title: "404" };
  return {
    title: `${project.code} — ${project.name}`,
    description: project.desc || undefined,
  };
}

export default async function ProjectPage({ params }) {
  const { locale, code } = await params;
  const project = await getProjectByCode(code);
  if (!project) notFound();

  const dict = getDict(locale);
  const s = dict.sheet;
  const allProjects = await getPublishedProjects();
  const others = allProjects.filter((p) => p.code !== project.code).slice(0, 3);

  const rows = [
    [s.code, project.code],
    [s.name, project.name],
    [s.client, project.client],
    [s.location, project.location],
    [s.year, project.year],
    [s.area, project.area],
    [s.typology, typologyLabel(TYPOLOGIES, project.typology, locale)],
    [s.services, (project.services || []).join(" · ")],
    [s.status, project.status],
    [s.software, (project.software || []).join(" · ")],
  ].filter(([, v]) => v);

  return (
    <article className={styles.page}>
      <div className="shell">
        <Link href={`/${locale}/proyectos`} className={styles.back}>
          ← {s.back}
        </Link>

        <header className={styles.head}>
          <p className={styles.code}>{project.code}</p>
          <h1 className={styles.title}>{project.name}</h1>
          {project.desc && <p className={styles.desc}>{project.desc}</p>}
          {locale === "en" && (
            <p className={styles.esTag}>[{s.esOnly}]</p>
          )}
        </header>

        <div className={styles.layout}>
          <dl className={styles.spec}>
            {rows.map(([k, v]) => (
              <div key={k} className={styles.specRow}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.media}>
            {project.images?.length ? (
              <>
                <p className="mono-label">{s.photos}</p>
                <Gallery images={project.images} locale={locale} projectName={project.name} />
              </>
            ) : (
              <p className={styles.noImages}>{s.noImages}</p>
            )}
          </div>
        </div>
      </div>

      {others.length > 0 && (
        <section className={styles.more}>
          <div className="shell">
            <hr className="hairline" />
            <ul className={styles.moreList}>
              {others.map((p) => (
                <li key={p.code}>
                  <Link href={`/${locale}/proyectos/${p.code}`}>
                    <span className={styles.moreCode}>{p.code}</span>
                    <span className={styles.moreName}>{p.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
