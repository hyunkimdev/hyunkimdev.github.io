"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Projects.module.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "이커머스 플랫폼",
    description: "실시간 재고 관리, 안전한 결제 시스템, 관리자 대시보드를 갖춘 종합 온라인 스토어입니다.",
    tags: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    demoLink: "#",
    repoLink: "#",
  },
  {
    title: "협업 관리 도구",
    description: "드래그 앤 드롭 칸반 보드와 팀 채팅 기능을 제공하는 프로젝트 관리 툴입니다.",
    tags: ["React", "Socket.io", "Node.js", "MongoDB"],
    demoLink: "#",
    repoLink: "#",
  },
  {
    title: "AI 콘텐츠 생성기",
    description: "AI를 활용하여 마케팅 문구와 소셜 미디어 포스트를 자동으로 생성하는 SaaS 애플리케이션입니다.",
    tags: ["OpenAI API", "Next.js", "Tailwind CSS", "Vercel Edge Functions"],
    demoLink: "#",
    repoLink: "#",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
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
    <section id="projects" className={styles.section} ref={sectionRef}>
      <div className="container">
        <h2 className={styles.title}>주요 프로젝트</h2>
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={styles.card}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            >
              <div className={styles.imagePlaceholder}>
                [프로젝트 이미지]
              </div>
              <div className={styles.content}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <div className={styles.links}>
                  <Link href={project.demoLink} className={styles.link}>라이브 데모</Link>
                  <Link href={project.repoLink} className={styles.link}>GitHub</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
