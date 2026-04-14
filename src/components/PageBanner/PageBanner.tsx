import Image from "next/image";
import Link from "next/link";
import { Corners } from "@/components/Corners/Corners";
import { AnimatedSection } from "@/components/UI/AnimatedSection";
import styles from "./PageBanner.module.css";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface BgStyle {
  top: string;
  left: string;
  width: string;
  height: string;
}

interface PageBannerProps {
  title: string;
  breadcrumbs: Breadcrumb[];
  bgImage: string;
  bgPosition?: string;
  bgStyle?: BgStyle;
  backText?: string;
  locale: string;
}

export function PageBanner({
  title,
  breadcrumbs,
  bgImage,
  bgPosition = "center 30%",
  bgStyle,
  backText = "Назад",
  locale,
}: PageBannerProps) {
  const homeHref = `/${locale}/`;

  return (
    <section className={styles.banner}>
      <div className={styles.bg}>
        {bgStyle ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bgImage}
            alt=""
            style={{
              position: "absolute",
              top: bgStyle.top,
              left: bgStyle.left,
              width: bgStyle.width,
              height: bgStyle.height,
              maxWidth: "none",
              objectFit: "cover",
            }}
          />
        ) : (
          <Image src={bgImage} alt="" fill style={{ objectFit: "cover", objectPosition: bgPosition }} />
        )}
      </div>
      <div className={styles.overlay} />
      <div className="noise-overlay" />

      <div className={styles.frame}>
        <Corners size={40} color="rgba(255,255,255,0.3)" strokeWidth={2} />
      </div>

      <div className={styles.breadcrumbs}>
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className={styles.breadcrumbItem}>
            {i > 0 && <span className={styles.separator} />}
            {crumb.href ? (
              <Link href={crumb.href} className={styles.breadcrumbLink}>
                {crumb.label}
              </Link>
            ) : (
              <span className={styles.breadcrumbActive}>{crumb.label}</span>
            )}
          </span>
        ))}
      </div>
      <Link href={homeHref} className={styles.backLink}>
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {backText}
      </Link>
      <AnimatedSection className={styles.titleWrap} direction="up">
        <h1 className={styles.title}>{title}</h1>
      </AnimatedSection>
    </section>
  );
}
