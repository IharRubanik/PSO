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
    text: "Проводим комплексную оценку угроз и уязвимостей, определяем уровень необходимой защиты и разрабатываем профиль безопасности.",
  },
  {
    number: "02",
    title: "Разработка плана безопасности",
    text: "Создаём индивидуальный план мероприятий с учётом специфики клиента, маршрутов, графика и особых требований.",
  },
  {
    number: "03",
    title: "Подбор сотрудников",
    text: "Назначаем команду охранников с релевантным опытом, проводим инструктаж и обеспечиваем постоянную координацию.",
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
        bgImage="/assets/images/service2.jpg"
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
                  src="/assets/images/service1.jpg"
                  alt="Особенности услуги"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className={styles.textBlock}>
                <p>
                  Личная охрана — это комплекс мер по обеспечению физической
                  безопасности клиента в любых условиях. Наши телохранители
                  обладают многолетним опытом работы в силовых структурах и
                  специальных подразделениях.
                </p>
                <p>
                  Мы обеспечиваем круглосуточное сопровождение, организацию
                  безопасных маршрутов передвижения, контроль окружающей
                  обстановки и оперативное реагирование на любые угрозы.
                </p>
                <p>
                  Каждый проект личной охраны начинается с детального анализа
                  рисков и разработки индивидуального плана безопасности,
                  учитывающего все аспекты жизни и деятельности клиента.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Этапы сотрудничества */}
      <section className={styles.section}>
        <div className="noise-overlay" />
        <div className={styles.container}>
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>Этапы сотрудничества</h2>
          </AnimatedSection>

          <div className={styles.stepsGrid}>
            {STEPS.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className={styles.stepCard}>
                  <Corners size={30} />
                  <span className={styles.stepNumber}>{step.number}</span>
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
            src="/assets/images/partners-bg.jpg"
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.clientsOverlay} />
        <div className="noise-overlay" />

        <div className={styles.container}>
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>Кому подойдёт наша услуга</h2>
          </AnimatedSection>

          <div className={styles.clientsGrid}>
            {TARGET_CLIENTS.map((client, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className={styles.clientCard}>
                  <Corners size={30} />
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
