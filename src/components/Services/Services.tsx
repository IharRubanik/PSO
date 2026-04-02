"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "../UI/AnimatedSection";
import styles from "./Services.module.css";

const SERVICES = [
  {
    title: "Личная охрана",
    slug: "personal-guard",
    image: "/assets/images/card1.jpg",
    description: "Группа быстрого реагирования оперативно выезжает на объект при поступлении сигнала тревоги. Сотрудники быстро оценивают ситуацию, пресекают противоправные действия и обеспечивают безопасность до полного устранения угрозы.",
  },
  {
    title: "Группа быстрого\nреагирования",
    slug: "rapid-response",
    image: "/assets/images/card2.jpg",
    description: "Группа быстрого реагирования оперативно выезжает на объект при поступлении сигнала тревоги. Сотрудники быстро оценивают ситуацию, пресекают противоправные действия и обеспечивают безопасность до полного устранения угрозы.",
  },
  {
    title: "Объектовая\nбезопасность",
    slug: "physical-security",
    image: "/assets/images/card3.jpg",
    description: "",
  },
  {
    title: "Контрнаблюдение",
    slug: "counter-surveillance",
    image: "/assets/images/card4.jpg",
    description: "Персональная защита руководителей, предпринимателей и частных лиц. Наши специалисты обеспечивают безопасность клиента, контролируют окружающую обстановку и оперативно реагируют на любые потенциальные угрозы.",
  },
  {
    title: "Инкассация и иные задачи\nпо запросу",
    slug: "collection",
    image: "/assets/images/card5.jpg",
    description: "",
  },
  {
    title: "Комплексная защита для\nпервых лиц и бизнеса",
    slug: "complex-protection",
    image: "/assets/images/card6.jpg",
    description: "",
  },
];

export function Services() {
  return (
    <section className={styles.section}>
      <div className="noise-overlay" />
      <div className={styles.container}>
        <div className={styles.header}>
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>Услуги</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className={styles.description}>
              Комплексные решения безопасности для бизнеса, частной собственности
              и мероприятий. Работаем круглосуточно и гарантируем оперативное
              реагирование.
            </p>
          </AnimatedSection>
        </div>
        <div className={styles.grid}>
          {SERVICES.map((service, i) => (
            <AnimatedSection key={service.slug} delay={i * 0.1}>
              <Link href={`/services/${service.slug}`} className={styles.card}>
                <div className={styles.cardBg}>
                  <Image src={service.image} alt={service.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div className={styles.cardOverlay} />

                {/* Crosshair number badge — shrinks on hover */}
                <div className={styles.cardNumber}>
                  <div className={styles.crosshairLineH} />
                  <div className={styles.crosshairLineV} />
                  <div className={styles.crosshairRing} />
                  <div className={styles.crosshairCenter}>
                    <span className={styles.crosshairText}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Figma: single txt/button block that slides up from bottom: -151px to bottom: 0 */}
                <div className={styles.cardSlider}>
                  <div className={styles.cardSliderText}>
                    <h3
                      className={
                        i === 0
                          ? `${styles.cardTitle} ${styles.cardTitleLight}`
                          : styles.cardTitle
                      }
                    >
                      {service.title}
                    </h3>
                    {service.description && (
                      <p className={styles.cardDescription}>{service.description}</p>
                    )}
                  </div>
                  {/* "подробнее" bar */}
                  <div className={styles.cardMore}>
                    <span className={styles.cardMoreText}>подробнее</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowIcon}>
                      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
          {/* Figma: gold "+" crosshair dividers between card rows, centered on column gaps */}
          <div className={`${styles.gridDivider} ${styles.gridDivider1}`} />
          <div className={`${styles.gridDivider} ${styles.gridDivider2}`} />
        </div>
      </div>
    </section>
  );
}
