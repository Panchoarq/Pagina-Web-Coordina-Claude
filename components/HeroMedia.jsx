import Image from "next/image";
import styles from "./Hero.module.css";

export default function HeroMedia({ image, projectName }) {
  if (!image?.url) {
    return <div className={`${styles.media} ${styles.mediaEmpty}`} aria-hidden="true" />;
  }

  return (
    <div className={styles.media}>
      <Image
        src={image.url}
        alt={
          projectName
            ? `Proyecto: ${projectName}`
            : "Proyecto coordinado por coordina BIM Consulting"
        }
        fill
        priority
        sizes="100vw"
        className={styles.img}
        unoptimized
      />
    </div>
  );
}
