"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "../UI/AnimatedSection";
import styles from "./About.module.css";

export function About() {
  return (
    <section className={styles.about} id="about">
      {/* Background */}
      <div className={styles.bg}>
        <Image
          src="/assets/images/about-section-bg-new.png"
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="noise-overlay" />

      <div className={styles.container}>
        {/* Title — absolute left */}
        <AnimatedSection direction="left" className={styles.left}>
          <h2 className={styles.title}>О компании</h2>
        </AnimatedSection>

        {/* Right block: text + button */}
        <AnimatedSection direction="right" delay={0.2} className={styles.right}>
          <div className={styles.textBlock}>
            <p className={styles.text}>
              Наша компания — это команда профессионалов с многолетним опытом
              работы в сфере безопасности. Мы предоставляем полный спектр охранных
              услуг для бизнеса, государственных организаций и частных клиентов.
            </p>
            <p className={styles.text}>
              Главная задача нашей работы — обеспечить надежную защиту имущества,
              сотрудников и посетителей объектов. Мы используем современные
              технологии безопасности, тщательно отбираем персонал и постоянно
              повышаем уровень подготовки сотрудников.
            </p>
          </div>
          <Link href="/about" className={styles.btn}>
            Узнать больше
          </Link>
        </AnimatedSection>

      </div>
    </section>
  );
}
