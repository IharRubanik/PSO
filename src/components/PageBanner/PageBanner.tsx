import Image from "next/image";
import Link from "next/link";
import { Corners } from "@/components/Corners/Corners";
import styles from "./PageBanner.module.css";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  breadcrumbs: Breadcrumb[];
  bgImage: string;
}

export function PageBanner({ title, breadcrumbs, bgImage }: PageBannerProps) {
  return (
    <section className={styles.banner}>
      <div className={styles.bg}>
        <Image src={bgImage} alt="" fill style={{ objectFit: "cover" }} />
      </div>
      <div className={styles.overlay} />
      <div className="noise-overlay" />

      <div className={styles.frame}>
        <Corners size={40} />
      </div>

      <div className={styles.content}>
        <div className={styles.breadcrumbs}>
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className={styles.breadcrumbItem}>
              {i > 0 && <span className={styles.separator}>/</span>}
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
        <h1 className={styles.title}>{title}</h1>
      </div>
    </section>
  );
}
