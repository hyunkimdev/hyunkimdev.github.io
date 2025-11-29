"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

const words = [
  "홈페이지",
  "웹 어플리케이션",
  "모바일 앱",
  "대시보드",
  "랜딩 페이지"
];

export default function Hero() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [currentWord, setCurrentWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // 타이핑 효과
  useEffect(() => {
    const word = words[wordIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 100 : 2000;

    if (!isDeleting && currentWord === word) {
      // 단어 완성 후 대기
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && currentWord === "") {
      // 삭제 완료 후 다음 단어로
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentWord((prev) =>
        isDeleting
          ? prev.slice(0, -1)
          : word.slice(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentWord, isDeleting, wordIndex]);

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
          poster="/video-poster.jpg"
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.overlay}></div>
      </div>
      <div ref={contentRef} className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.typingWrapper}>
            <span className={styles.typingText}>{currentWord}</span>
            <span className={styles.cursor}>|</span>
          </span>
          <br />
          만드는 개발자 김현입니다.
        </h1>
        <p className={styles.subtitle}>
          비즈니스 아이디어를 현실로 만들어드립니다.
        </p>
        <div className={styles.actions}>
          <a href="#projects" className={`${styles.button} ${styles.primary}`}>
            프로젝트 보기
          </a>
          <a href="#contact" className={`${styles.button} ${styles.secondary}`}>
            문의하기
          </a>
        </div>
      </div>
    </section>
  );
}
