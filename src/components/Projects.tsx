"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Projects.module.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "부잣집 (The Rich Table)",
    description: "사용자 친화적인 음식 주문 시스템입니다. 로그인/회원가입 기능과 직관적인 메뉴 탐색 및 주문 흐름을 제공합니다.",
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    demoLink: "https://meal-ordering-system.vercel.app/",
    repoLink: "#",
    image: "/Screenshot 2025-11-28 at 3.37.13 PM.png",
  },
  {
    title: "어서오SEO (Welcome SEO)",
    description: "지역 기반 비즈니스를 위한 키워드 SEO 분석 도구입니다. 네이버 데이터랩과 SerpAPI를 활용하여 트렌드를 분석하고 OpenAI로 콘텐츠 전략을 제안합니다.",
    tags: ["Next.js", "OpenAI API", "SerpAPI", "Naver DataLab"],
    demoLink: "https://welcome-seo-bvsw.vercel.app/",
    repoLink: "#",
    image: "/Screenshot 2025-11-28 at 3.36.31 PM.png",
  },
  {
    title: "협업 관리 도구",
    description: "드래그 앤 드롭 칸반 보드와 팀 채팅 기능을 제공하는 프로젝트 관리 툴입니다.",
    tags: ["React", "Socket.io", "Node.js", "MongoDB"],
    demoLink: "#",
    repoLink: "#",
    image: null,
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
            toggleActions: "play reverse play reverse",
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
            <a 
              key={index} 
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            >
              {project.image ? (
                <div className={styles.imageWrapper}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className={styles.projectImage}
                  />
                </div>
              ) : (
                <div className={styles.imagePlaceholder}>
                  [프로젝트 이미지]
                </div>
              )}
              <div className={styles.content}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
