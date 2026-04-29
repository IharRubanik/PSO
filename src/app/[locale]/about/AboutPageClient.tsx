"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import type { ContactFormData } from "@/types/cms";
import { pickResponsiveSources } from "@/lib/cms-helpers";
import { PageBanner } from "@/components/PageBanner/PageBanner";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { AnimatedSection } from "@/components/UI/AnimatedSection";
import styles from "./page.module.css";

interface ResponsiveBgProps {
  desktop: string;
  tablet: string;
  mobile: string;
}

function ResponsiveBg({ desktop, tablet, mobile }: ResponsiveBgProps) {
  return (
    <picture>
      <source media="(max-width: 640px)" srcSet={mobile} />
      <source media="(max-width: 1024px)" srcSet={tablet} />
      <img
        src={desktop}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </picture>
  );
}

interface License {
  num: string;
  title: string;
  issuer?: string | null;
  image?: { url?: string | null } | string | null;
}

type Img = { url?: string | null } | string | null;

interface AboutPageData {
  bannerTitle?: string | null;
  bannerImage?: Img;
  bannerImageTablet?: Img;
  bannerImageMobile?: Img;
  breadcrumbHome?: string | null;
  breadcrumbAbout?: string | null;
  showAbout?: boolean;
  aboutSectionTitle?: string | null;
  aboutImage?: Img;
  aboutImageTablet?: Img;
  aboutImageMobile?: Img;
  aboutParagraph1?: string | null;
  aboutParagraph2?: string | null;
  aboutParagraph3?: string | null;
  showLicenses?: boolean;
  licensesSectionTitle?: string | null;
  licenseIssuedByLabel?: string | null;
  licenseViewLabel?: string | null;
  licenses?: License[] | null;
  showArmament?: boolean;
  armamentSectionTitle?: string | null;
  armamentImage?: Img;
  armamentImageTablet?: Img;
  armamentImageMobile?: Img;
  armamentParagraph1?: string | null;
  armamentParagraph2?: string | null;
  showTraining?: boolean;
  trainingSectionTitle?: string | null;
  trainingImage?: Img;
  trainingImageTablet?: Img;
  trainingImageMobile?: Img;
  trainingParagraph1?: string | null;
  trainingParagraph2?: string | null;
  showContactForm?: boolean;
}

interface AboutPageClientProps {
  data: AboutPageData;
  contactFormData: ContactFormData;
  locale: string;
  backText?: string;
}

function getImageUrl(
  field: { url?: string | null } | string | null | undefined,
  fallback: string
): string {
  if (!field) return fallback;
  if (typeof field === "string") return field;
  return field.url || fallback;
}

const VISIBLE_CARDS = 4;

export function AboutPageClient({ data, contactFormData, locale, backText = "Назад" }: AboutPageClientProps) {
  const [licenseModal, setLicenseModal] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [screenMode, setScreenMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const licenses = data.licenses ?? [];
  const visibleCards = screenMode === "mobile" ? 1 : screenMode === "tablet" ? 2 : VISIBLE_CARDS;
  const maxSlide = Math.max(0, licenses.length - visibleCards);

  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setScreenMode(w <= 640 ? "mobile" : w <= 860 ? "tablet" : "desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const slidePrev = useCallback(() => {
    setSlideIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const slideNext = useCallback(() => {
    setSlideIndex((prev) => Math.min(maxSlide, prev + 1));
  }, [maxSlide]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) slideNext();
        else slidePrev();
      }
    },
    [slideNext, slidePrev]
  );

  const bannerImage = getImageUrl(data.bannerImage, "/assets/images/service1.jpg");
  const aboutSources = pickResponsiveSources(
    data.aboutImage,
    data.aboutImageTablet,
    data.aboutImageMobile,
    "/assets/images/about-section-bg.jpg",
  );
  const armamentSources = pickResponsiveSources(
    data.armamentImage,
    data.armamentImageTablet,
    data.armamentImageMobile,
    "/assets/images/armament-bg.jpg",
  );
  const trainingSources = pickResponsiveSources(
    data.trainingImage,
    data.trainingImageTablet,
    data.trainingImageMobile,
    "/assets/images/training-bg.jpg",
  );

  const trainingSectionTitle = data.trainingSectionTitle ?? "Подготовка\nсотрудников";

  return (
    <>
      <PageBanner
        title={data.bannerTitle ?? "Кто мы и как обеспечиваем безопасность"}
        breadcrumbs={[
          { label: data.breadcrumbHome ?? "Главная", href: `/${locale}/` },
          { label: data.breadcrumbAbout ?? "О компании" },
        ]}
        bgImage={bannerImage}
        bgStyle={{
          top: "-41.69%",
          left: "-16.61%",
          width: "116.61%",
          height: "160.5%",
        }}
        backText={backText}
        locale={locale}
      />

      {/* О нас */}
      {data.showAbout !== false && (<section className={styles.aboutSection}>
        <div className="noise-overlay" />
        <div className={styles.container}>
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>
              {data.aboutSectionTitle ?? "О нас"}
            </h2>
          </AnimatedSection>

          <div className={styles.aboutGrid}>
            <AnimatedSection direction="left">
              <div className={styles.aboutImage}>
                <ResponsiveBg {...aboutSources} />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className={styles.aboutText}>
                <p>{data.aboutParagraph1}</p>
                <p>{data.aboutParagraph2}</p>
                <p>{data.aboutParagraph3}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>)}

      {/* Лицензии */}
      {data.showLicenses !== false && (<section className={styles.licensesSection}>
        <div className="noise-overlay" />
        <div className={styles.licensesContainer}>
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>
              {data.licensesSectionTitle ?? "Официальные лицензии компании"}
            </h2>
          </AnimatedSection>

          <div
            className={styles.licensesSlider}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={sliderRef}
              className={styles.licensesCards}
              style={{
                transform:
                  screenMode === "mobile"
                    ? `translateX(calc(-${slideIndex} * (84.27vw + 4vw)))`
                    : screenMode === "tablet"
                    ? `translateX(calc(-${slideIndex} * (calc((100% - 2vw) / 2) + 2vw)))`
                    : `translateX(calc(-${slideIndex} * (calc((100% - 60px) / 4) + 20px)))`,
              }}
            >
              {licenses.map((license, i) => {
                const licenseImgUrl = getImageUrl(license.image, "");
                return (
                  <div key={i} className={styles.licenseCardWrap}>
                    <div
                      className={`${styles.licenseCard} ${i === slideIndex ? styles.licenseCardActive : ""}`}
                      onClick={() => licenseImgUrl ? setLicenseModal(licenseImgUrl) : undefined}
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
                          <circle cx="55" cy="55" r="29.5" fill="#393634" />
                        </svg>
                        <span className={styles.crosshairNum}>{license.num}</span>
                      </div>
                      <div className={styles.licenseContent}>
                        <h3 className={styles.licenseTitle}>{license.title}</h3>
                      </div>
                      <div className={styles.licenseBottom}>
                        <p className={styles.licenseIssuer}>
                          [ {data.licenseIssuedByLabel ?? "Выдана:"} {license.issuer} ]
                        </p>
                        <div className={styles.licenseFooter}>
                          <span className={styles.licenseFooterText}>
                            {data.licenseViewLabel ?? "смотреть"}
                          </span>
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
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.licensesProgressRow}>
            <div className={styles.licensesProgressBar}>
              <div
                className={styles.licensesProgressFill}
                style={{
                  width: licenses.length
                    ? `${((slideIndex + visibleCards) / licenses.length) * 100}%`
                    : "100%",
                }}
              />
            </div>
            <div className={styles.licensesNav}>
              <button
                className={styles.licensesNavBtn}
                onClick={slidePrev}
                disabled={slideIndex === 0}
                aria-label="Предыдущая лицензия"
              >
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 13L5 8L10 3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <button
                className={styles.licensesNavBtn}
                onClick={slideNext}
                disabled={slideIndex >= maxSlide}
                aria-label="Следующая лицензия"
              >
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>)}

      {/* Вооружение */}
      {data.showArmament !== false && (<section className={styles.armamentSection}>
        <div className={styles.armamentBg}>
          <ResponsiveBg {...armamentSources} />
        </div>
        <div className={styles.armamentGradient} />
        <div className="noise-overlay" />
        <div className={styles.armamentContent}>
          <AnimatedSection direction="left">
            <h2 className={styles.sectionTitle}>
              {data.armamentSectionTitle ?? "Вооружение"}
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.2}>
            <div className={styles.armamentText}>
              <p>{data.armamentParagraph1}</p>
              <p>{data.armamentParagraph2}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>)}

      {/* Подготовка сотрудников */}
      {data.showTraining !== false && (<section className={styles.armamentSection}>
        <div className={styles.armamentBg}>
          <ResponsiveBg {...trainingSources} />
        </div>
        <div className={styles.armamentGradient} />
        <div className="noise-overlay" />
        <div className={styles.armamentContent}>
          <AnimatedSection direction="left">
            <h2 className={styles.sectionTitle}>
              {trainingSectionTitle.split("\n").map((line: string, i: number) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.2}>
            <div className={styles.armamentText}>
              <p>{data.trainingParagraph1}</p>
              <p>{data.trainingParagraph2}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>)}

      {data.showContactForm !== false && (<ContactForm data={contactFormData} locale={locale} />)}

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
