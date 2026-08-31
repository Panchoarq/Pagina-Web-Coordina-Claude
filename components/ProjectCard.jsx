import Image from "next/image";
import Link from "next/link";
import { typologyLabel } from "@/lib/i18n";
import { TYPOLOGIES, firstImage } from "@/lib/projects";
import styles from "./ProjectGrid.module.css";

export default function ProjectCard({ project, locale, priority = false }) {
  const img = firstImage(project);
  const meta = [
    typologyLabel(TYPOLOGIES, project.typology, locale),
    project.year,
    project.area,
  ].filter(Boolean);

  return (
    <Link
      href={`/${locale}/proyectos/${project.code}`}
      className={styles.card}
      data-reveal
    >
      <div className={styles.imgWrap}>
        {img ? (
          <Image
            src={img.url}
            alt={project.name}
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
            className={styles.img}
            priority={priority}
            unoptimized
          />
        ) : (
          <div className={styles.imgEmpty} aria-hidden="true">
            <span>{project.code}</span>
          </div>
        )}
      </div>

      <div className={styles.block}>
        <span className={styles.code}>{project.code}</span>
        <span className={styles.name}>{project.name}</span>
        <span className={styles.meta}>{meta.join("  ·  ")}</span>
      </div>
    </Link>
  );
}
