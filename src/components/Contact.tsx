"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Contact.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className={styles.section} ref={sectionRef}>
      <div className={styles.container} ref={containerRef}>
        <h2 className={styles.title}>문의하기</h2>
        <p className={styles.text}>
          프로젝트 제안이나 궁금한 점이 있으신가요? 언제든 편하게 연락주세요.
        </p>
        <form className={styles.form}>
          <div>
            <label htmlFor="name" className={styles.label}>이름</label>
            <input type="text" id="name" name="name" className={styles.input} placeholder="홍길동" required />
          </div>
          <div>
            <label htmlFor="email" className={styles.label}>이메일</label>
            <input type="email" id="email" name="email" className={styles.input} placeholder="hello@example.com" required />
          </div>
          <div>
            <label htmlFor="message" className={styles.label}>메시지</label>
            <textarea id="message" name="message" className={styles.textarea} placeholder="프로젝트에 대해 이야기해 주세요..." required></textarea>
          </div>
          <button type="submit" className={styles.button}>메시지 보내기</button>
        </form>
      </div>
    </section>
  );
}
