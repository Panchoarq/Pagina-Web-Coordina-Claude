import Link from "next/link";
import { getDict, typologyLabel } from "@/lib/i18n";
import { TYPOLOGIES } from "@/lib/projects";
import HeroMedia from "./HeroMedia";
import styles from "./Hero.module.css";

export default function Hero({ locale, project, image }) {
  const dict = getDict(locale);
  const t = dict.hero;

  const cartouche = project
    ? [
        project.code,
        project.name,
        typologyLabel(TYPOLOGIES, project.typology, locale),
        project.area,
        project.year,
      ].filter(Boolean)
    : [];

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <HeroMedia image={image} projectName={project?.name} />

      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.grid}>
        <p className={styles.tag}>{t.index}</p>

        <h1 id="hero-title" className={styles.title}>
          {t.title}
        </h1>

        <p className={styles.lead}>{t.lead}</p>

        <div className={styles.actions}>
          <a href={`/${locale}#proyectos`} className="btn btn--primary">
            {t.cta}
          </a>
          <a href={`/${locale}#servicios`} className="btn btn--ghost">
            {t.ctaServices}
          </a>
        </div>

        {project && (
          <Link href={`/${locale}/proyectos/${project.code}`} className={styles.cartouche}>
            <span className={styles.cartoucheLabel}>{t.featuring}</span>
            <span className={styles.cartoucheData}>
              {cartouche.map((v, i) => (
                <span key={i}>
                  {v}
                  {i < cartouche.length - 1 && <i className={styles.sep}>/</i>}
                </span>
              ))}
            </span>
            <span className={styles.cartoucheHint}>{t.reloadHint}</span>
          </Link>
        )}
      </div>
    </section>
  );
}
