"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "../UI/AnimatedSection";
import styles from "./Services.module.css";

interface ServicesProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sectionData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  services: any[];
  locale: string;
}

export function Services({ sectionData, services, locale }: ServicesProps) {
  const [showAll, setShowAll] = useState(false);

  const sectionTitle = sectionData?.sectionTitle ?? "";
  const description = sectionData?.description ?? "";
  const learnMore = sectionData?.learnMoreText ?? sectionData?.learnMore ?? "";
  const showAllLabel = sectionData?.showAllText ?? sectionData?.showAllLabel ?? "";

  return (
    <section className={styles.section} id="services">
      <div className="noise-overlay" />
      <div className={styles.container}>
        <div className={styles.header}>
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className={styles.description}>
              {description}
            </p>
          </AnimatedSection>
        </div>
        <div className={styles.grid}>
          {services.map((service, i) => {
            const imageUrl =
              service.cardImage?.url ??
              service.cardImage ??
              `/assets/images/card${i + 1}.jpg`;

            return (
              <AnimatedSection
                key={service.id ?? service.slug ?? i}
                delay={i * 0.1}
                className={!showAll && i >= 4 ? styles.hiddenOnMobile : undefined}
              >
                <Link href={`/${locale}/services/${service.slug}`} className={styles.card}>
                  <div className={styles.cardBg}>
                    <Image src={imageUrl} alt={service.title ?? ""} fill style={{ objectFit: "cover" }} />
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
                        {service.title ?? ""}
                      </h3>
                      {service.shortDescription && (
                        <p className={styles.cardDescription}>{service.shortDescription}</p>
                      )}
                    </div>
                    {/* "подробнее" bar */}
                    <div className={styles.cardMore}>
                      <span className={styles.cardMoreText}>{learnMore}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowIcon}>
                        <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
          {/* Figma: gold "+" crosshair dividers between card rows, centered on column gaps */}
          <div className={`${styles.gridDivider} ${styles.gridDivider1}`} />
          <div className={`${styles.gridDivider} ${styles.gridDivider2}`} />
        </div>
        {!showAll && (
          <button
            className={styles.showAllBtn}
            onClick={() => setShowAll(true)}
          >
            {showAllLabel}
          </button>
        )}
      </div>
    </section>
  );
}
