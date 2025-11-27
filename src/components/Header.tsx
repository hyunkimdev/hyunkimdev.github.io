import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.nav}`}>
        <Link href="/" className={styles.logo}>
          DEV.PORTFOLIO
        </Link>
        <nav className={styles.links}>
          <Link href="#about" className={styles.link}>
            소개
          </Link>
          <Link href="#skills" className={styles.link}>
            기술 스택
          </Link>
          <Link href="#projects" className={styles.link}>
            프로젝트
          </Link>
          <Link href="#contact" className={styles.link}>
            문의하기
          </Link>
        </nav>
      </div>
    </header>
  );
}
