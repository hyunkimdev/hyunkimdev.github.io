"use client";

import { useRef } from "react";
import Image from "next/image";
import styles from "./Skills.module.css";

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

// 데이터를 두 줄로 분리
const halfIndex = Math.ceil(skills.length / 2);
const row1 = skills.slice(0, halfIndex);
const row2 = skills.slice(halfIndex);

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Technologies</h2>
        
        <div className={styles.marqueeWrapper}>
          {/* 첫 번째 줄 - 왼쪽으로 이동 */}
          <div className={styles.marqueeContainer}>
            <div className={`${styles.marquee} ${styles.marqueeLeft}`}>
              {/* 끊김 없는 무한 루프를 위해 리스트를 두 번 렌더링 */}
              {[...row1, ...row1].map((skill, index) => (
                <div key={`row1-${index}`} className={styles.card}>
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

          {/* 두 번째 줄 - 오른쪽으로 이동 */}
          <div className={styles.marqueeContainer}>
            <div className={`${styles.marquee} ${styles.marqueeRight}`}>
              {[...row2, ...row2].map((skill, index) => (
                <div key={`row2-${index}`} className={styles.card}>
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
        </div>
      </div>
    </section>
  );
}
