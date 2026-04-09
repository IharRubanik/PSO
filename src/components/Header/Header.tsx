"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { RequestModal } from "@/components/RequestModal/RequestModal";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { href: "/", label: "Главная" },
  { href: "/services/personal-guard", label: "Услуги" },
  { href: "/about", label: "О компании" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openRequestModal = () => {
    setModalOpen(true);
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${menuOpen ? styles.menuOpen : ""}`}>
        <div className={styles.bar}>
          {/* Left: Navigation */}
          <nav className={styles.nav}>
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href.split("/").slice(0, 2).join("/"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                >
                  <span className={styles.navText}>{item.label}</span>
                  <span className={styles.navHover}>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Center: Logo */}
          <Link href="/" className={styles.logo}>
            <Image
              src="/assets/images/logo-full.svg"
              alt="Фантом Групп"
              width={152}
              height={215}
              priority
            />
          </Link>

          {/* Right: Phone + CTA + Lang */}
          <div className={styles.right}>
            <a href="tel:+79999999999" className={styles.phone}>
              8 999 999-99-99
            </a>
            <button className={styles.cta} onClick={openRequestModal}>
              Оставить заявку
            </button>
            <div className={styles.lang}>
              <a href="#" className={styles.langActive}>
                Ru
              </a>
              <a href="#" className={styles.langInactive}>
                EN
              </a>
            </div>
            <button
              className={`${styles.burger} ${menuOpen ? styles.burgerActive : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Меню"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <div
        className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavActive : ""}`}
        style={{ backdropFilter: "blur(7.5px)", WebkitBackdropFilter: "blur(7.5px)" }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href.split("/").slice(0, 2).join("/"));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          );
        })}
        <a href="tel:+79999999999" className={styles.mobileNavPhone}>
          8 999 999-99-99
        </a>
        <button className={styles.mobileNavCta} onClick={openRequestModal}>
          Оставить заявку
        </button>
      </div>

      <RequestModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
