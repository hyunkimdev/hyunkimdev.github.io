"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./ProjectSlider.module.css";
import Link from "next/link";

const projects = [
  {
    title: "이커머스 플랫폼",
    description: "실시간 재고 관리, 안전한 결제 시스템.",
    image: "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
  },
  {
    title: "협업 관리 도구",
    description: "드래그 앤 드롭 칸반 보드와 팀 채팅.",
    image: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
  },
  {
    title: "AI 콘텐츠 생성기",
    description: "AI를 활용하여 마케팅 문구 자동 생성.",
    image: "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
  },
  {
    title: "금융 대시보드",
    description: "실시간 데이터 시각화 및 분석 도구.",
    image: "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)",
  },
];

export default function ProjectSlider() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>주요 프로젝트 갤러리</h2>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className={styles.swiper}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              <div 
                className={styles.card}
                style={{ background: project.image }}
              >
                <div className={styles.content}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.description}>{project.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
