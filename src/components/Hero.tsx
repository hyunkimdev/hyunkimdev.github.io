"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      // Parallax Effect - immediateRender: false prevents overriding entrance animation
      gsap.fromTo(
        contentRef.current,
        { y: 0 },
        {
          y: "50%",
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.hero}>
      <div className={styles.videoBackground}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.video}
          poster="/video-poster.jpg" // Optional poster
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.overlay}></div>
      </div>
      <div ref={contentRef} className={styles.content}>
        <h1 className={styles.title}>
          디지털 경험을<br /> 디자인합니다
        </h1>
        <p className={styles.subtitle}>
          사용자 중심의 사고와 견고한 기술력으로<br />
          최상의 웹 경험을 만드는 풀스택 개발자입니다.
        </p>
        <div className={styles.actions}>
          <Link href="#projects" className={`${styles.button} ${styles.primary}`}>
            프로젝트 보기
          </Link>
          <Link href="#contact" className={`${styles.button} ${styles.secondary}`}>
            문의하기
          </Link>
        </div>
      </div>
    </section>
  );
}
