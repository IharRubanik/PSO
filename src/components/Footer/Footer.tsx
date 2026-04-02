"use client";

import Image from "next/image";
import Link from "next/link";
import { Corners } from "../Corners/Corners";
import { AnimatedSection } from "../UI/AnimatedSection";
import styles from "./Footer.module.css";

const MENU_LINKS = [
  { label: "Главная", href: "/" },
  { label: "Услуги", href: "/services" },
  { label: "О компании", href: "/about" },
  { label: "Контакты", href: "/contacts" },
];

const LEGAL_LINKS = [
  { label: "Политика конфиденциальности", href: "/privacy" },
  { label: "Условия использования", href: "/terms" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="noise-overlay" />

      <div className={styles.content}>
        {/* Col 1: Logo */}
        <AnimatedSection>
          <div className={styles.logoBlock}>
            <Corners size={30} />
            <Image
              src="/assets/images/logo.svg"
              alt="Фантом Групп"
              width={159}
              height={277}
              className={styles.logo}
            />
          </div>
        </AnimatedSection>

        {/* Separator 1 — at x:732 */}
        <div className={styles.separator} aria-hidden="true">
          <Image
            src="/assets/images/crosshair-divider.svg"
            alt=""
            width={40}
            height={47}
          />
        </div>

        {/* Col 2: Menu */}
        <AnimatedSection delay={0.1}>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Меню</h4>
            <nav className={styles.nav}>
              {MENU_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.navLink}
                >
                  <span className={styles.navText}>{link.label}</span>
                  <span className={styles.navHover}>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </AnimatedSection>

        {/* Separator 2 — at x:1286.25 */}
        <div className={styles.separator} aria-hidden="true">
          <Image
            src="/assets/images/crosshair-divider.svg"
            alt=""
            width={40}
            height={47}
          />
        </div>

        {/* Col 3: Contacts */}
        <AnimatedSection delay={0.2}>
          <div className={`${styles.column} ${styles.columnContacts}`}>
            <h4 className={styles.columnTitle}>Позвонить нам</h4>
            <a href="tel:89999999999" className={styles.contactValue}>
              8 999 999-99-99
            </a>

            <h4 className={`${styles.columnTitle} ${styles.mt}`}>
              Написать нам
            </h4>
            <a
              href="mailto:info@security-company.ru"
              className={styles.contactValue}
            >
              info@security-company.ru
            </a>

            <h4 className={`${styles.columnTitle} ${styles.mt}`}>Соцсети</h4>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactValue}
            >
              Telegram
            </a>
          </div>
        </AnimatedSection>

        {/* Separator 3 */}
        <div className={styles.separator} aria-hidden="true">
          <Image
            src="/assets/images/crosshair-divider.svg"
            alt=""
            width={40}
            height={47}
          />
        </div>

        {/* Col 4: Legal */}
        <AnimatedSection delay={0.3}>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>О защите данных</h4>
            <nav className={styles.nav}>
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.navLink}
                >
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
        <p className={styles.copyright}>
          2026&copy;Фантом групп. Все права защищены
        </p>
      </div>
    </footer>
  );
}
