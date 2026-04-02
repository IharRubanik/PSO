"use client";

import Image from "next/image";
import { PageBanner } from "@/components/PageBanner/PageBanner";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { AnimatedSection } from "@/components/UI/AnimatedSection";
import { Corners } from "@/components/Corners/Corners";
import styles from "./page.module.css";

const LICENSES = [
  {
    title: "Лицензия на частную охранную деятельность",
    issuer: "Росгвардия, Управление лицензионно-разрешительной работы",
  },
  {
    title: "Лицензия на монтаж технических средств охраны",
    issuer: "Росгвардия, Управление лицензионно-разрешительной работы",
  },
  {
    title: "Лицензия на проектирование средств безопасности",
    issuer: "Министерство строительства и ЖКХ Российской Федерации",
  },
  {
    title: "Допуск к сведениям, составляющим государственную тайну",
    issuer: "Федеральная служба безопасности Российской Федерации",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="Кто мы и как обеспечиваем безопасность"
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "О компании" },
        ]}
        bgImage="/assets/images/service1.jpg"
      />

      {/* О нас */}
      <section className={styles.aboutSection}>
        <div className="noise-overlay" />
        <div className={styles.container}>
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>О нас</h2>
          </AnimatedSection>

          <div className={styles.aboutGrid}>
            <AnimatedSection direction="left">
              <div className={styles.aboutImage}>
                <Image
                  src="/assets/images/about-section-bg.jpg"
                  alt="О компании"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className={styles.aboutText}>
                <p>
                  Наша компания специализируется на предоставлении полного
                  спектра охранных услуг для бизнеса и частных лиц. Мы работаем
                  на рынке безопасности более 15 лет, обеспечивая надежную защиту
                  объектов, людей и информации.
                </p>
                <p>
                  Штат компании укомплектован профессионалами с опытом работы в
                  силовых структурах и специальных подразделениях. Каждый
                  сотрудник проходит строгий отбор и регулярную переподготовку для
                  поддержания высочайшего уровня квалификации.
                </p>
                <p>
                  Мы используем современные технические средства охраны и
                  собственные методики оценки рисков, что позволяет нам
                  разрабатывать индивидуальные решения для каждого клиента,
                  гарантируя максимальную эффективность защиты.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Лицензии */}
      <section className={styles.licensesSection}>
        <div className="noise-overlay" />
        <div className={styles.container}>
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>
              Официальные лицензии компании
            </h2>
          </AnimatedSection>

          <div className={styles.licensesGrid}>
            {LICENSES.map((license, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className={styles.licenseCard}>
                  <Corners size={30} />
                  <h3 className={styles.licenseTitle}>{license.title}</h3>
                  <p className={styles.licenseIssuer}>{license.issuer}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Вооружение */}
      <section className={styles.armamentSection}>
        <div className={styles.armamentBg}>
          <Image
            src="/assets/images/service3.jpg"
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.armamentOverlay} />
        <div className="noise-overlay" />
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <AnimatedSection direction="left">
              <div className={styles.aboutImage}>
                <Image
                  src="/assets/images/service4.jpg"
                  alt="Вооружение"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className={styles.aboutText}>
                <h2 className={styles.sectionTitle}>Вооружение</h2>
                <p>
                  Наши сотрудники оснащены современным служебным оружием и
                  специальными средствами в соответствии с законодательством
                  Российской Федерации. Весь арсенал проходит регулярную проверку
                  и техническое обслуживание.
                </p>
                <p>
                  Компания располагает полным комплектом разрешительной
                  документации на хранение и использование служебного оружия.
                  Каждый охранник имеет действующее удостоверение и лицензию на
                  право ношения оружия.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Подготовка сотрудников */}
      <section className={styles.aboutSection}>
        <div className="noise-overlay" />
        <div className={styles.container}>
          <div className={styles.aboutGridReversed}>
            <AnimatedSection direction="right" delay={0.2}>
              <div className={styles.aboutText}>
                <h2 className={styles.sectionTitle}>Подготовка сотрудников</h2>
                <p>
                  Все сотрудники компании проходят многоступенчатую систему
                  подготовки, включающую физическую, тактическую и
                  психологическую подготовку. Регулярные тренировки и аттестации
                  обеспечивают постоянную боеготовность персонала.
                </p>
                <p>
                  Программы обучения разработаны совместно с ведущими
                  специалистами в области безопасности и включают работу с
                  современным оборудованием, тактику действий в экстремальных
                  ситуациях и методы оказания первой помощи.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left">
              <div className={styles.aboutImage}>
                <Image
                  src="/assets/images/service2.jpg"
                  alt="Подготовка сотрудников"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
