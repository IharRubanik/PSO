"use client";

import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { AnimatedSection } from "@/components/UI/AnimatedSection";
import { YandexMap } from "@/components/YandexMap/YandexMap";
import styles from "./page.module.css";

export default function ContactsPage() {
  return (
    <>
      {/* Header section */}
      <section className={styles.headerSection}>
        <div className="noise-overlay" />
        <div className={styles.container}>
          <div className={styles.breadcrumbs}>
            <Link href="/" className={styles.breadcrumbLink}>
              Главная
            </Link>
            <span className={styles.separator} />
            <span className={styles.breadcrumbActive}>Контакты</span>
          </div>

          <AnimatedSection>
            <h1 className={styles.pageTitle}>Контакты</h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact info */}
      <section className={styles.infoSection}>
        <div className="noise-overlay" />
        <div className={styles.container}>
          <AnimatedSection delay={0.2}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <h4 className={styles.infoLabel}>Адрес</h4>
                <p className={styles.infoValue}>
                  Москва, 1-й Красногвардейский проезд дом 22 с 1
                </p>
              </div>
              <div className={styles.infoDivider}>
                <Image
                  src="/assets/images/crosshair-separator.svg"
                  alt=""
                  width={40}
                  height={47}
                />
              </div>
              <div className={styles.infoItem}>
                <h4 className={styles.infoLabel}>Позвонить нам</h4>
                <a href="tel:89999999999" className={styles.infoValue}>
                  8 999 999-99-99
                </a>
              </div>
              <div className={styles.infoDivider}>
                <Image
                  src="/assets/images/crosshair-separator.svg"
                  alt=""
                  width={40}
                  height={47}
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
              <div className={styles.infoDivider}>
                <Image
                  src="/assets/images/crosshair-separator.svg"
                  alt=""
                  width={40}
                  height={47}
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

          <AnimatedSection delay={0.4}>
            <div className={styles.mapWrapper}>
              <YandexMap />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
