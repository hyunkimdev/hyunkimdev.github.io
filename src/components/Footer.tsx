import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.content}`}>
        <p className={styles.copyright}>
          © 2025 Hyun Kim. All rights reserved.
        </p>
        <div className={styles.socials}>
          <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            GitHub
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            LinkedIn
          </a>
          <a href="mailto:hello@example.com" className={styles.socialLink}>
            이메일
          </a>
        </div>
      </div>
    </footer>
  );
}
