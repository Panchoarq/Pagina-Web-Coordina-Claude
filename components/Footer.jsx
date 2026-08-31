import { getDict } from "@/lib/i18n";
import styles from "./Footer.module.css";

export default function Footer({ locale }) {
  const dict = getDict(locale);
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          coordina<span>BIM</span> Consulting
        </div>
        <div className={styles.meta}>
          <span>{dict.footer.rights}</span>
          <span>{dict.footer.source}</span>
          <span>© {year}</span>
        </div>
        <a className={styles.mail} href={`mailto:${dict.contact.email}`}>
          {dict.contact.email}
        </a>
      </div>
    </footer>
  );
}
