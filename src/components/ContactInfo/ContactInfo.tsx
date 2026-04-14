"use client";

import Image from "next/image";
import { AnimatedSection } from "../UI/AnimatedSection";
import { YandexMap } from "../YandexMap/YandexMap";
import styles from "./ContactInfo.module.css";

interface ContactInfoProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  siteSettings: any;
  locale: string;
}

export function ContactInfo({ data, siteSettings }: ContactInfoProps) {
  const sectionTitle = data?.sectionTitle ?? "";
  const labelAddress = data?.labelAddress ?? "";
  const labelPhone = data?.labelPhone ?? "";
  const labelEmail = data?.labelEmail ?? "";
  const labelSocials = data?.labelSocials ?? "";

  const address = siteSettings?.address ?? "";
  const phone = siteSettings?.phone ?? "";
  const email = siteSettings?.email ?? "";
  const telegram = siteSettings?.telegram ?? "";

  return (
    <section className={styles.section}>
      <div className="noise-overlay" />

      <div className={styles.container}>
        <AnimatedSection>
          <h2 className={styles.title}>{sectionTitle}</h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <h4 className={styles.infoLabel}>{labelAddress}</h4>
              <p className={styles.infoValue}>
                {address}
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
              <h4 className={styles.infoLabel}>{labelPhone}</h4>
              <a href={`tel:${phone}`} className={styles.infoValue}>
                {phone}
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
              <h4 className={styles.infoLabel}>{labelEmail}</h4>
              <a
                href={`mailto:${email}`}
                className={styles.infoValue}
              >
                {email}
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
              <h4 className={styles.infoLabel}>{labelSocials}</h4>
              <a
                href={telegram ? `https://t.me/${telegram.replace(/^@/, "")}` : "https://t.me/"}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoValue}
              >
                {telegram}
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
