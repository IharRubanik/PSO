"use client";

import Image from "next/image";
import Link from "next/link";
import { Corners } from "../Corners/Corners";
import { AnimatedSection } from "../UI/AnimatedSection";
import styles from "./Footer.module.css";

interface FooterProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  siteSettings: any;
  locale: string;
}

export function Footer({ data, siteSettings, locale }: FooterProps) {
  const menuLinks: { label: string; href: string }[] = Array.isArray(data?.menuLinks)
    ? data.menuLinks.map((item: any) => ({
        label: item.label ?? "",
        href: item.href
          ? `/${locale}${item.href === "/" ? "" : item.href}`
          : `/${locale}`,
      }))
    : [];

  const legalLinks: { label: string; href: string }[] = Array.isArray(data?.legalLinks)
    ? data.legalLinks.map((item: any) => ({
        label: item.label ?? "",
        href: item.href
          ? `/${locale}${item.href === "/" ? "" : item.href}`
          : `/${locale}`,
      }))
    : [];

  const phone: string = siteSettings?.phone ?? "";
  const email: string = siteSettings?.email ?? "";
  const telegram: string = siteSettings?.telegram ?? "";

  const colMenuTitle: string = data?.colMenuTitle ?? "";
  const colPhoneTitle: string = data?.colPhoneTitle ?? "";
  const colEmailTitle: string = data?.colEmailTitle ?? "";
  const colSocialsTitle: string = data?.colSocialsTitle ?? "";
  const colLegalTitle: string = data?.colLegalTitle ?? "";
  const copyright: string = siteSettings?.copyright ?? "";
  const logoAlt: string = data?.logoAlt ?? siteSettings?.companyName ?? "Логотип";

  return (
    <footer className={styles.footer}>
      <div className="noise-overlay" />

      <div className={styles.content}>
        {/* Col 1: Logo */}
        <AnimatedSection>
          <div className={styles.logoBlock}>
            <Corners size={30} color="rgba(255,255,255,0.3)" strokeWidth={2} />
            <Image
              src="/assets/images/logo.svg"
              alt={logoAlt}
              width={159}
              height={277}
              className={styles.logo}
            />
          </div>
        </AnimatedSection>

        {/* Col 2: Menu */}
        <AnimatedSection delay={0.1}>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>{colMenuTitle}</h4>
            <nav className={styles.nav}>
              {menuLinks.map((link) => (
                <Link key={link.href} href={link.href} className={styles.navLink}>
                  <span className={styles.navText}>{link.label}</span>
                  <span className={styles.navHover}>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </AnimatedSection>

        {/* Separator 1 — at x:732 (between menu and contacts) */}
        <div className={styles.separator} aria-hidden="true">
          <Image
            src="/assets/images/crosshair-separator.svg"
            alt=""
            width={40}
            height={47}
          />
        </div>

        {/* Col 3: Contacts */}
        <AnimatedSection delay={0.2}>
          <div className={`${styles.column} ${styles.columnContacts}`}>
            {phone && (
              <>
                <h4 className={styles.columnTitle}>{colPhoneTitle}</h4>
                <a
                  href={`tel:${phone.replace(/\s|-/g, "")}`}
                  className={styles.contactValue}
                >
                  {phone}
                </a>
              </>
            )}

            {email && (
              <>
                <h4 className={`${styles.columnTitle} ${styles.mt}`}>{colEmailTitle}</h4>
                <a href={`mailto:${email}`} className={styles.contactValue}>
                  {email}
                </a>
              </>
            )}

            {telegram && (
              <>
                <h4 className={`${styles.columnTitle} ${styles.mt}`}>{colSocialsTitle}</h4>
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactValue}
                >
                  {telegram}
                </a>
              </>
            )}
          </div>
        </AnimatedSection>

        {/* Separator 2 — at x:1286 (between contacts and legal) */}
        <div className={styles.separator} aria-hidden="true">
          <Image
            src="/assets/images/crosshair-separator.svg"
            alt=""
            width={40}
            height={47}
          />
        </div>

        {/* Col 4: Legal */}
        <AnimatedSection delay={0.3}>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>{colLegalTitle}</h4>
            <nav className={styles.nav}>
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href} className={styles.navLink}>
                  <span className={styles.navText}>{link.label}</span>
                  <span className={styles.navHover}>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </AnimatedSection>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <p className={styles.copyright}>{copyright}</p>
      </div>
    </footer>
  );
}
