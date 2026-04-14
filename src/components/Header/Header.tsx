"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import type { NavigationData, SiteSettingsData, RequestModalData, CommonTextsData, NavLink } from "@/types/cms";
import { resolveMediaUrl } from "@/lib/cms-helpers";
import { RequestModal } from "@/components/RequestModal/RequestModal";
import styles from "./Header.module.css";

interface HeaderProps {
  navigation: NavigationData | null;
  siteSettings: SiteSettingsData | null;
  requestModal: RequestModalData | null;
  commonTexts: CommonTextsData | null;
  locale: string;
}

export function Header({
  navigation,
  siteSettings,
  requestModal,
  commonTexts,
  locale,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Build nav items from Payload navigation.headerNav array
  const rawNav: { label: string; href: string }[] =
    Array.isArray(navigation?.headerNav)
      ? navigation.headerNav.map((item: NavLink) => ({
          label: item.label ?? "",
          href: item.href ?? "/",
        }))
      : [];

  const NAV_ITEMS = rawNav.map((item) => ({
    label: item.label,
    href: item.href.startsWith("/") ? `/${locale}${item.href === "/" ? "" : item.href}` : item.href,
  }));

  const phone: string = siteSettings?.phone ?? commonTexts?.phone ?? "";
  const ctaText: string = navigation?.headerCtaText ?? "";
  const burgerAriaLabel: string = navigation?.burgerAriaLabel ?? "Меню";
  const langRuLabel: string = navigation?.langRuLabel ?? "RU";
  const langEnLabel: string = navigation?.langEnLabel ?? "EN";
  const logoAlt: string = siteSettings?.companyName ?? "Логотип";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to #services after navigation to home
  useEffect(() => {
    if (pathname === `/${locale}` && window.location.hash === "#services") {
      const el = document.getElementById("services");
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 300);
      }
    }
  }, [pathname, locale]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      if (href.includes("#")) {
        e.preventDefault();
        const hash = href.split("#")[1];
        if (pathname === `/${locale}` || pathname === `/${locale}/`) {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push(href);
        }
        setMenuOpen(false);
      }
    },
    [pathname, locale, router]
  );

  const openRequestModal = () => {
    setModalOpen(true);
    setMenuOpen(false);
  };

  // Language switcher: strip locale prefix from current pathname
  const pathWithoutLocale = pathname.replace(/^\/(ru|en)/, "") || "/";
  const ruHref = `/ru${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
  const enHref = `/en${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${menuOpen ? styles.menuOpen : ""}`}
      >
        <div className={styles.bar}>
          {/* Left: Navigation */}
          <nav className={styles.nav}>
            {NAV_ITEMS.map((item) => {
              const cleanHref = item.href.split("#")[0] || "/";
              const isActive =
                cleanHref === `/${locale}` || cleanHref === `/${locale}/`
                  ? (pathname === `/${locale}` || pathname === `/${locale}/`) &&
                    !item.href.includes("#")
                  : pathname.startsWith(cleanHref.split("/").slice(0, 3).join("/"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  <span className={styles.navText}>{item.label}</span>
                  <span className={styles.navHover}>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Center: Logo */}
          <Link href={`/${locale}`} className={styles.logo}>
            <Image
              src="/assets/images/logo-full.svg"
              alt={logoAlt}
              width={152}
              height={215}
              priority
            />
          </Link>

          {/* Right: Phone + CTA + Lang */}
          <div className={styles.right}>
            {phone && (
              <a href={`tel:${phone.replace(/\s|-/g, "")}`} className={styles.phone}>
                {phone}
              </a>
            )}
            <button className={styles.cta} onClick={openRequestModal}>
              {ctaText}
            </button>
            <div className={styles.lang}>
              <a
                href={ruHref}
                className={locale === "ru" ? styles.langActive : styles.langInactive}
              >
                {langRuLabel}
              </a>
              <a
                href={enHref}
                className={locale === "en" ? styles.langActive : styles.langInactive}
              >
                {langEnLabel}
              </a>
            </div>
            <button
              className={`${styles.burger} ${menuOpen ? styles.burgerActive : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={burgerAriaLabel}
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
          const cleanHref = item.href.split("#")[0] || "/";
          const isActive =
            cleanHref === `/${locale}` || cleanHref === `/${locale}/`
              ? (pathname === `/${locale}` || pathname === `/${locale}/`) &&
                !item.href.includes("#")
              : pathname.startsWith(cleanHref.split("/").slice(0, 3).join("/"));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ""}`}
              onClick={(e) => {
                handleNavClick(e, item.href);
                setMenuOpen(false);
              }}
            >
              {item.label}
            </Link>
          );
        })}
        {phone && (
          <a href={`tel:${phone.replace(/\s|-/g, "")}`} className={styles.mobileNavPhone}>
            {phone}
          </a>
        )}
        <button className={styles.mobileNavCta} onClick={openRequestModal}>
          {ctaText}
        </button>
      </div>

      <RequestModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        data={requestModal}
        locale={locale}
      />
    </>
  );
}
