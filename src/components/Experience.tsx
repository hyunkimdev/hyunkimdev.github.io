"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Experience.module.css";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    period: "Feb 2025 - Present",
    title: "Enterprise Information Systems Developer",
    company: "Brigham Young University-Hawaii",
    location: "Laie, HI",
    description:
      "프론트엔드와 백엔드 전반에 걸친 엔터프라이즈 소프트웨어 애플리케이션 개발. C#, ASP.NET Framework, MySQL, Docker를 활용한 대학 계정 관리 시스템 API 개발 및 CI/CD 파이프라인 구축. 코드 리뷰, 버그 수정, 성능 최적화를 통해 시스템 안정성 향상.",
    skills: ["C#", "ASP.NET", "MySQL", "Docker", "CI/CD"],
  },
  {
    period: "Sep 2024 - Dec 2024",
    title: "Developer Intern (Remote)",
    company: "Accessifiers",
    location: "Duvall, WA",
    description:
      "5인 팀과 함께 웹 및 모바일 학습 관리 시스템(LMS) 개발 참여. Agile 워크플로우, Git 기반 협업, CI/CD 프로세스, 보안 인증 구현 경험.",
    skills: ["Agile", "Git", "CI/CD", "Authentication"],
  },
  {
    period: "Jul 2024 - Feb 2025",
    title: "Career Services Data Analyst",
    company: "Brigham Young University-Hawaii",
    location: "Laie, HI",
    description:
      "SQL Server와 Power BI를 활용한 학생 취업 관련 데이터 분석. Python과 Domo를 활용하여 멘토 예약 추적 자동화로 처리 시간 90% 단축. 1,000건 이상의 이벤트 참여 기록에서 핵심 인사이트 도출.",
    skills: ["Python", "SQL Server", "Power BI", "Domo"],
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
                <p className={styles.company}>{exp.company} <span className={styles.location}>· {exp.location}</span></p>
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

