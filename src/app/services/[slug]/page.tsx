"use client";

import Image from "next/image";
import { PageBanner } from "@/components/PageBanner/PageBanner";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { AnimatedSection } from "@/components/UI/AnimatedSection";
import { Corners } from "@/components/Corners/Corners";
import styles from "./page.module.css";

const STEPS = [
  {
    number: "01",
    title: "Анализ рисков",
    text: "Мы изучаем особенности деятельности клиента, маршруты передвижения и возможные риски для разработки эффективной стратегии безопасности.",
  },
  {
    number: "02",
    title: "Разработка плана безопасности",
    text: "Формируется индивидуальный план охраны с учетом графика клиента, уровня угроз и необходимых мер защиты.",
  },
  {
    number: "03",
    title: "Подбор сотрудников",
    text: "Назначаются подготовленные специалисты, обладающие опытом работы в сфере личной охраны и сопровождения.",
  },
];

const TARGET_CLIENTS = [
  "Руководителям и собственникам бизнеса",
  "Высокопоставленным и публичным лицам",
  "VIP-гостям, участникам закрытых мероприятий и делегаций",
  "Людям, находящимся в зоне риска",
  "Гостям, путешественникам и бизнесменам",
  "Членам семей руководителей и бизнес-элиты",
];

export default function ServiceDetailPage() {
  return (
    <>
      <PageBanner
        title="Личная охрана"
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Личная охрана" },
        ]}
        bgImage="/assets/images/service-personal-security.jpg"
      />

      {/* Особенности услуги */}
      <section className={styles.section}>
        <div className="noise-overlay" />
        <div className={styles.container}>
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>Особенности услуги</h2>
          </AnimatedSection>

          <div className={styles.twoColGrid}>
            <AnimatedSection direction="left">
              <div className={styles.imageBlock}>
                <Image
                  src="/assets/images/service-about.jpg"
                  alt="Особенности услуги"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className={styles.textBlock}>
                <p>
                  Наша компания — это команда профессионалов с многолетним опытом
                  работы в сфере безопасности. Мы предоставляем полный спектр
                  охранных услуг для бизнеса, государственных организаций и
                  частных клиентов.
                </p>
                <p>
                  Главная задача нашей работы — обеспечить надежную защиту
                  имущества, сотрудников и посетителей объектов. Мы используем
                  современные технологии безопасности, тщательно отбираем
                  персонал и постоянно повышаем уровень подготовки сотрудников.
                </p>
                <p>
                  Главная задача нашей работы — обеспечить надежную защиту
                  имущества, сотрудников и посетителей объектов. Мы используем
                  современные технологии безопасности, тщательно отбираем
                  персонал и постоянно повышаем уровень подготовки сотрудников.
                </p>
                <p>
                  Главная задача нашей работы — обеспечить надежную защиту
                  имущества, сотрудников и посетителей объектов. Мы используем
                  современные технологии безопасности, тщательно отбираем
                  персонал и постоянно повышаем уровень подготовки сотрудников.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Этапы сотрудничества */}
      <section className={styles.section}>
        <div className="noise-overlay" />
        <div className={styles.stepsContainer}>
          <AnimatedSection>
            <h2 className={styles.stepsSectionTitle}>Этапы сотрудничества</h2>
          </AnimatedSection>

          <div className={styles.stepsGrid}>
            {STEPS.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className={styles.stepCard}>
                  <div className={styles.stepCrosshair}>
                    <div className={styles.stepCrosshairLineH} />
                    <div className={styles.stepCrosshairLineV} />
                    <div className={styles.stepCrosshairRing} />
                    <div className={styles.stepCrosshairCenter}>
                      <span className={styles.stepNumber}>{step.number}</span>
                    </div>
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepText}>{step.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Кому подойдёт */}
      <section className={styles.clientsSection}>
        <div className={styles.clientsBg}>
          <Image
            src="/assets/images/service-clients-bg.png"
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.clientsOverlay} />
        <div className="noise-overlay" />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/crosshair-divider-full.svg"
          alt=""
          className={styles.clientsDivider}
          aria-hidden="true"
        />

        <div className={styles.clientsContainer}>
          <AnimatedSection>
            <h2 className={styles.clientsSectionTitle}>Кому подойдёт наша услуга</h2>
          </AnimatedSection>

          <div className={styles.clientsGrid}>
            {TARGET_CLIENTS.map((client, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className={styles.clientCard}>
                  <Corners size={30} color="rgba(255,255,255,0.3)" />
                  <h3 className={styles.clientCardTitle}>{client}</h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
