"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { PageBanner } from "@/components/PageBanner/PageBanner";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { AnimatedSection } from "@/components/UI/AnimatedSection";
import styles from "./page.module.css";

const LICENSES = [
  {
    num: "01",
    title: "Лицензия на охрану объектов и имущества",
    issuer: "МВД России",
    image: "/assets/images/license-1.jpg",
  },
  {
    num: "02",
    title: "Лицензия на осуществление частной охранной деятельности",
    issuer: "МВД России",
    image: "/assets/images/license-2.jpg",
  },
  {
    num: "03",
    title: "Лицензия на охрану с применением огнестрельного оружия",
    issuer: "МВД России",
    image: "/assets/images/license-3.jpg",
  },
  {
    num: "04",
    title: "Лицензия на обеспечение внутриобъектового и пропускного режима",
    issuer: "МВД России",
    image: "/assets/images/license-4.jpg",
  },
  {
    num: "05",
    title: "Допуск к сведениям, составляющим государственную тайну",
    issuer: "ФСБ России",
    image: "/assets/images/license-1.jpg",
  },
];

const VISIBLE_CARDS = 4;

export default function AboutPage() {
  const [licenseModal, setLicenseModal] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const maxSlide = LICENSES.length - VISIBLE_CARDS;
  const sliderRef = useRef<HTMLDivElement>(null);

  const slidePrev = useCallback(() => {
    setSlideIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const slideNext = useCallback(() => {
    setSlideIndex((prev) => Math.min(maxSlide, prev + 1));
  }, [maxSlide]);

  return (
    <>
      <PageBanner
        title="Кто мы и как обеспечиваем безопасность"
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "О компании" },
        ]}
        bgImage="/assets/images/service1.jpg"
        bgStyle={{
          top: "-41.69%",
          left: "-16.61%",
          width: "116.61%",
          height: "160.5%",
        }}
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
        <div className={styles.licensesContainer}>
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>
              Официальные лицензии компании
            </h2>
          </AnimatedSection>

          <div className={styles.licensesSlider}>
            <div
              ref={sliderRef}
              className={styles.licensesCards}
              style={{
                transform: `translateX(calc(-${slideIndex} * (calc((100% - 60px) / 4) + 20px)))`,
              }}
            >
            {LICENSES.map((license, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div
                  className={styles.licenseCard}
                  onClick={() => setLicenseModal(license.image)}
                >
                  <div className={styles.licenseCardBg} />
                  <div className={styles.licenseCrosshair}>
                    <svg
                      viewBox="0 0 110 110"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.crosshairSvg}
                    >
                      <path
                        opacity="0.4"
                        d="M56 5.012C83.05 5.598 104.794 27.709 104.794 54.898L104.793 55H110V56H104.781C104.203 82.683 82.681 104.205 56 104.783V110H55V104.795C54.964 104.795 54.93 104.796 54.896 104.796L54.251 104.792C27.358 104.451 5.592 82.835 5.011 56H0V55H5L4.998 54.898C4.998 27.34 27.338 5 54.896 5H55V0H56V5.012ZM6.011 56C6.597 82.497 28.259 103.796 54.896 103.796C54.93 103.796 54.964 103.795 55 103.795V56H6.011ZM56 103.783C82.129 103.205 103.204 82.13 103.781 56H56V103.783ZM56 55H103.793C103.793 54.966 103.794 54.932 103.794 54.898C103.794 28.261 82.495 6.598 56 6.012V55ZM54.896 6C27.891 6 5.998 27.893 5.998 54.898C5.998 54.932 5.999 54.966 5.999 55H55V6C54.964 6 54.93 6 54.896 6Z"
                        fill="white"
                      />
                      <circle
                        cx="55"
                        cy="55"
                        r="29.5"
                        fill="#393634"
                      />
                    </svg>
                    <span className={styles.crosshairNum}>
                      {license.num}
                    </span>
                  </div>
                  <div className={styles.licenseContent}>
                    <h3 className={styles.licenseTitle}>{license.title}</h3>
                  </div>
                  <div className={styles.licenseBottom}>
                    <p className={styles.licenseIssuer}>
                      [ Выдана: {license.issuer} ]
                    </p>
                    <div className={styles.licenseFooter}>
                      <span className={styles.licenseFooterText}>смотреть</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 3L11 8L6 13"
                          stroke="var(--color-gold-accent)"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
            </div>
          </div>

          <div className={styles.licensesProgressRow}>
            <div className={styles.licensesProgressBar}>
              <div
                className={styles.licensesProgressFill}
                style={{
                  width: `${((slideIndex + VISIBLE_CARDS) / LICENSES.length) * 100}%`,
                }}
              />
            </div>
            <div className={styles.licensesNav}>
              <button
                className={styles.licensesNavBtn}
                onClick={slidePrev}
                disabled={slideIndex === 0}
                aria-label="Назад"
              >
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 13L5 8L10 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
              <button
                className={styles.licensesNavBtn}
                onClick={slideNext}
                disabled={slideIndex >= maxSlide}
                aria-label="Вперёд"
              >
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 3L11 8L6 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Вооружение */}
      <section className={styles.armamentSection}>
        <div className={styles.armamentBg}>
          <Image
            src="/assets/images/armament-bg.jpg"
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.armamentGradient} />
        <div className="noise-overlay" />
        <div className={styles.armamentContent}>
          <AnimatedSection direction="left">
            <h2 className={styles.sectionTitle}>Вооружение</h2>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.2}>
            <div className={styles.armamentText}>
              <p>
                Наша компания — это команда профессионалов с многолетним опытом
                работы в сфере безопасности. Мы предоставляем полный спектр
                охранных услуг для бизнеса, государственных организаций и частных
                клиентов.
              </p>
              <p>
                Главная задача нашей работы — обеспечить надежную защиту
                имущества, сотрудников и посетителей объектов. Мы используем
                современные технологии безопасности, тщательно отбираем персонал
                и постоянно повышаем уровень подготовки сотрудников.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Подготовка сотрудников */}
      <section className={styles.armamentSection}>
        <div className={styles.armamentBg}>
          <Image
            src="/assets/images/training-bg.jpg"
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.armamentGradient} />
        <div className="noise-overlay" />
        <div className={styles.armamentContent}>
          <AnimatedSection direction="left">
            <h2 className={styles.sectionTitle}>
              Подготовка
              <br />
              сотрудников
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.2}>
            <div className={styles.armamentText}>
              <p>
                Наша компания — это команда профессионалов с многолетним опытом
                работы в сфере безопасности. Мы предоставляем полный спектр
                охранных услуг для бизнеса, государственных организаций и частных
                клиентов.
              </p>
              <p>
                Главная задача нашей работы — обеспечить надежную защиту
                имущества, сотрудников и посетителей объектов. Мы используем
                современные технологии безопасности, тщательно отбираем персонал
                и постоянно повышаем уровень подготовки сотрудников.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <ContactForm />

      {licenseModal && (
        <div
          className={styles.licenseModal}
          onClick={() => setLicenseModal(null)}
        >
          <button
            className={styles.licenseModalClose}
            onClick={() => setLicenseModal(null)}
            aria-label="Закрыть"
          >
            &times;
          </button>
          <div
            className={styles.licenseModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={licenseModal}
              alt="Лицензия"
              width={600}
              height={850}
              style={{ objectFit: "contain", width: "100%", height: "auto" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
