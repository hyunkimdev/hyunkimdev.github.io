"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Experience.module.css";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    period: "2022 - 현재",
    title: "시니어 풀스택 개발자",
    company: "테크 스타트업",
    description:
      "React, Next.js 기반의 프론트엔드 개발 및 Node.js 백엔드 API 설계. 팀 리드로서 코드 리뷰 및 주니어 개발자 멘토링 담당.",
    skills: ["React", "Next.js", "Node.js", "PostgreSQL"],
  },
  {
    period: "2020 - 2022",
    title: "프론트엔드 개발자",
    company: "디지털 에이전시",
    description:
      "다양한 클라이언트를 위한 반응형 웹사이트 및 웹 어플리케이션 개발. UI/UX 디자이너와 협업하여 최적의 사용자 경험 구현.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Figma"],
  },
  {
    period: "2019 - 2020",
    title: "주니어 웹 개발자",
    company: "IT 솔루션 기업",
    description:
      "워드프레스 기반 웹사이트 제작 및 유지보수. HTML, CSS, JavaScript를 활용한 커스텀 테마 개발.",
    skills: ["HTML/CSS", "JavaScript", "WordPress", "PHP"],
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className={styles.section} ref={sectionRef}>
      <div className="container">
        <h2 className={styles.title}>이력</h2>
        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={styles.item}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
            >
              <div className={styles.marker} />
              <div className={styles.content}>
                <span className={styles.period}>{exp.period}</span>
                <h3 className={styles.role}>{exp.title}</h3>
                <p className={styles.company}>{exp.company}</p>
                <p className={styles.description}>{exp.description}</p>
                <div className={styles.skills}>
                  {exp.skills.map((skill) => (
                    <span key={skill} className={styles.skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

