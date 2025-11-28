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
            5년 전, 웹이 작동하는 방식에 대한 호기심으로 개발을 시작했습니다.
            단순한 HTML 페이지에서 시작해, 이제는 전 세계 클라이언트를 위한 복잡하고 확장 가능한 웹 애플리케이션을 구축하고 있습니다.
          </Paragraph>
          <Paragraph>
            저는 클린 코드, 사용자 중심 디자인, 그리고 브라우저의 한계를 뛰어넘는 것을 지향합니다.
            코딩하지 않을 때는 오픈 소스에 기여하거나 최신 기술 트렌드를 탐구하곤 합니다.
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
