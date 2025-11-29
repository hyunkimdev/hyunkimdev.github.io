"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Header.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // 초기 상태: 투명하게
    gsap.set(header, { opacity: 0, y: -20 });

    // 스크롤하면 나타나기
    ScrollTrigger.create({
      trigger: document.body,
      start: "100vh top",
      onEnter: () => {
        gsap.to(header, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(header, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={`container ${styles.nav}`}>
        <Link href="/" className={styles.logo}>
          hyunkimdev
        </Link>
        <nav className={styles.links}>
          <Link href="#about" className={styles.link}>
            소개
          </Link>
          <Link href="#skills" className={styles.link}>
            기술 스택
          </Link>
          <Link href="#experience" className={styles.link}>
            이력
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
