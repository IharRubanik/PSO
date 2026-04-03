"use client";

import Image from "next/image";
import { AnimatedSection } from "../UI/AnimatedSection";
import { YandexMap } from "../YandexMap/YandexMap";
import styles from "./ContactInfo.module.css";

export function ContactInfo() {
  return (
    <section className={styles.section}>
      <div className="noise-overlay" />

      <div className={styles.container}>
        <AnimatedSection>
          <h2 className={styles.title}>Свяжитесь с нами</h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <h4 className={styles.infoLabel}>Адрес</h4>
              <p className={styles.infoValue}>
                Москва, 1-й Красногвардейский проезд дом 22 с 1
              </p>
            </div>

            <div className={styles.separator}>
              <Image
                src="/assets/images/crosshair-separator.svg"
                alt=""
                width={40}
                height={47}
                aria-hidden="true"
              />
            </div>

            <div className={styles.infoItem}>
              <h4 className={styles.infoLabel}>Позвонить нам</h4>
              <a href="tel:89999999999" className={styles.infoValue}>
                8 999 999-99-99
              </a>
            </div>

            <div className={styles.separator}>
              <Image
                src="/assets/images/crosshair-separator.svg"
                alt=""
                width={40}
                height={47}
                aria-hidden="true"
              />
            </div>

            <div className={styles.infoItem}>
              <h4 className={styles.infoLabel}>Написать нам</h4>
              <a
                href="mailto:info@security-company.ru"
                className={styles.infoValue}
              >
                info@security-company.ru
              </a>
            </div>

            <div className={styles.separator}>
              <Image
                src="/assets/images/crosshair-separator.svg"
                alt=""
                width={40}
                height={47}
                aria-hidden="true"
              />
            </div>

            <div className={styles.infoItem}>
              <h4 className={styles.infoLabel}>Соцсети</h4>
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoValue}
              >
                Telegram
              </a>
            </div>
          </div>
        </AnimatedSection>

        {/* Figma: map at top=429, full-width, h=642 */}
        <div className={styles.mapWrapper}>
          <YandexMap />
        </div>
      </div>
    </section>
  );
}
