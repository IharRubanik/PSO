import Link from "next/link";
import { getPayload } from "@/lib/payload";
import { AnimatedSection } from "@/components/UI/AnimatedSection";
import { RichText } from "@/components/RichText/RichText";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const payload = await getPayload();

  const termsPage = await payload.findGlobal({
    slug: "terms-page",
    locale: locale as "ru" | "en",
  });

  const homeHref = `/${locale}/`;

  return (
    <section className={styles.section}>
      <div className="noise-overlay" />
      <div className={styles.breadcrumbs}>
        <Link href={homeHref} className={styles.breadcrumbLink}>
          {termsPage.breadcrumbHome ?? "Главная"}
        </Link>
        <span className={styles.separator} />
        <span className={styles.breadcrumbActive}>
          {termsPage.breadcrumbLabel ?? "Условия использования"}
        </span>
      </div>
      <Link href={homeHref} className={styles.backLink}>
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {termsPage.backText ?? "Назад"}
      </Link>
      <div className={styles.container}>
        <AnimatedSection>
          <h1 className={styles.pageTitle}>
            {termsPage.pageTitle ?? "Условия использования"}
          </h1>
        </AnimatedSection>

        {termsPage.content && (
          <AnimatedSection delay={0.2}>
            <div className={styles.content}>
              <RichText content={termsPage.content} />
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
