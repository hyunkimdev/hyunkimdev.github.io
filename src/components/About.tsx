"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

function Paragraph({ children }: { children: string }) {
  const element = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!element.current) return;

    const words = element.current.querySelectorAll(`.${styles.word}`);
    
    gsap.fromTo(
      words,
      { opacity: 0.1 },
      {
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: element.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, []);

  const words = children.split(" ");

  return (
    <p className={styles.text} ref={element}>
      {words.map((word, i) => (
        <span key={i} className={styles.wordWrapper}>
          <span className={styles.word}>{word}</span>{" "}
        </span>
      ))}
    </p>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 텍스트 컬럼: 왼쪽에서 오른쪽으로 등장
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 이미지 컬럼: 오른쪽에서 왼쪽으로 등장
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className={styles.section} ref={sectionRef}>
      <div className={`container ${styles.content}`}>
        <div className={styles.textColumn} ref={textRef}>
          <h2 className={styles.title}>소개</h2>
          <Paragraph>
          사용자 중심 설계와 브랜드 경험을 고려한 개발을 핵심 가치로 삼고 있습니다.
          사내 시스템부터 웹·모바일 서비스까지 안정적인 아키텍처로 구축하며 실제 운영 환경에 맞는 결과물을 제공합니다.
          </Paragraph>
          <Paragraph>
          데이터 분석·대시보드 구축을 통해 비즈니스 의사결정을 지원하고, AI·자동화 기반 생산성 개선에도 관심이 많습니다.
          기술과 브랜딩이 모두 살아 있는 웹 경험을 만드는 것이 목표입니다.
          </Paragraph>
        </div>
        <div className={styles.imageColumn} ref={imageRef}>
          <div className={styles.imageWrapper}>
            <Image
              src="/profile.png"
              alt="프로필 이미지"
              width={400}
              height={400}
              className={styles.profileImage}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
