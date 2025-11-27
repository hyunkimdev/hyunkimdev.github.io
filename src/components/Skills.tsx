"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Skills.module.css";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    category: "프론트엔드",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
  },
  {
    category: "백엔드",
    items: ["Node.js", "Express", "PostgreSQL", "Prisma", "GraphQL", "Redis"],
  },
  {
    category: "데브옵스",
    items: ["Docker", "AWS", "CI/CD", "Vercel", "Nginx"],
  },
  {
    category: "도구",
    items: ["Git", "Figma", "Jest", "Cypress", "Postman"],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const categoriesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sticky Title Animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: `.${styles.stickyTitle}`,
        pinSpacing: false,
      });

      // Staggered Reveal
      categoriesRef.current.forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className={styles.section} ref={sectionRef}>
      <div className="container" ref={containerRef}>
        <div className={styles.stickyWrapper}>
          <div className={styles.stickyTitle}>
            <h2 className={styles.title}>기술 스택</h2>
            <p className={styles.description}>
              끊임없이 변화하는 기술 트렌드에 맞춰<br />
              최적의 도구를 선택하고 학습합니다.
            </p>
          </div>
          <div className={styles.grid}>
            {skills.map((skillGroup, index) => (
              <div 
                key={skillGroup.category} 
                className={styles.category}
                ref={(el) => {
                  if (el) categoriesRef.current[index] = el;
                }}
              >
                <h3 className={styles.categoryTitle}>{skillGroup.category}</h3>
                <ul className={styles.list}>
                  {skillGroup.items.map((item) => (
                    <li key={item} className={styles.item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
