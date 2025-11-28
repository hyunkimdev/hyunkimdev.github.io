"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Skills.module.css";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "Python", icon: "python" },
  { name: "JavaScript", icon: "javascript" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Java", icon: "java" },
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextjs", invert: true },
  { name: "Vue.js", icon: "vuejs" },
  { name: "Node.js", icon: "nodejs" },
  { name: "FastAPI", icon: "fastapi" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "MySQL", icon: "mysql" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "Redis", icon: "redis" },
  { name: "AWS", icon: "amazonwebservices", original: true },
  { name: "Docker", icon: "docker" },
  { name: "Nginx", icon: "nginx" },
  { name: "Git", icon: "git" },
  { name: "Figma", icon: "figma" },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            delay: index * 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className={styles.section} ref={sectionRef}>
      <div className="container">
        <h2 className={styles.title}>Technologies</h2>
        <div className={styles.grid}>
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={styles.card}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            >
              <div className={styles.iconWrapper}>
                <Image
                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}/${skill.icon}-${skill.original ? "original-wordmark" : "original"}.svg`}
                  alt={skill.name}
                  width={48}
                  height={48}
                  className={`${styles.icon} ${skill.invert ? styles.invert : ""}`}
                />
              </div>
              <span className={styles.name}>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
