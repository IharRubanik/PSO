"use client";

import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { AnimatedSection } from "@/components/UI/AnimatedSection";
import { YandexMap } from "@/components/YandexMap/YandexMap";
import styles from "./page.module.css";

interface ContactsPageData {
  pageTitle?: string | null;
  breadcrumbHome?: string | null;
  breadcrumbContacts?: string | null;
  backText?: string | null;
  labelAddress?: string | null;
  labelPhone?: string | null;
  labelEmail?: string | null;
  labelSocials?: string | null;
}

interface SiteSettingsData {
  address?: string | null;
  phone?: string | null;
  phoneLink?: string | null;
  email?: string | null;
  telegram?: string | null;
  telegramLabel?: string | null;
}

interface ContactsPageClientProps {
  data: ContactsPageData;
  siteSettings: SiteSettingsData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contactFormData: any;
  locale: string;
}

export function ContactsPageClient({ data, siteSettings, contactFormData, locale }: ContactsPageClientProps) {
  const homeHref = `/${locale}/`;

  return (
    <>
      {/* Header section */}
      <section className={styles.headerSection}>
        <div className="noise-overlay" />
        <div className={styles.breadcrumbs}>
          <Link href={homeHref} className={styles.breadcrumbLink}>
            {data.breadcrumbHome ?? "Главная"}
          </Link>
          <span className={styles.separator} />
          <span className={styles.breadcrumbActive}>
            {data.breadcrumbContacts ?? "Контакты"}
          </span>
        </div>
        <Link href={homeHref} className={styles.backLink}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {data.backText ?? "Назад"}
        </Link>
        <div className={styles.container}>
          <AnimatedSection>
            <h1 className={styles.pageTitle}>{data.pageTitle ?? "Контакты"}</h1>
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
                <h4 className={styles.infoLabel}>{data.labelAddress ?? "Адрес"}</h4>
                <p className={styles.infoValue}>
                  {siteSettings.address}
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
                <h4 className={styles.infoLabel}>{data.labelPhone ?? "Позвонить нам"}</h4>
                <a
                  href={siteSettings.phoneLink ?? `tel:${siteSettings.phone}`}
                  className={styles.infoValue}
                >
                  {siteSettings.phone}
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
                <h4 className={styles.infoLabel}>{data.labelEmail ?? "Написать нам"}</h4>
                <a
                  href={`mailto:${siteSettings.email}`}
                  className={styles.infoValue}
                >
                  {siteSettings.email}
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
                <h4 className={styles.infoLabel}>{data.labelSocials ?? "Соцсети"}</h4>
                <a
                  href={siteSettings.telegram ?? "https://t.me/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.infoValue}
                >
                  {siteSettings.telegramLabel ?? "Telegram"}
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

      <ContactForm data={contactFormData} locale={locale} />
    </>
  );
}
