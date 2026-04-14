"use client";

import Image from "next/image";
import { PageBanner } from "@/components/PageBanner/PageBanner";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { AnimatedSection } from "@/components/UI/AnimatedSection";
import { Corners } from "@/components/Corners/Corners";
import styles from "./page.module.css";

interface Step {
  number?: string | null;
  title?: string | null;
  text?: string | null;
}

interface TargetClient {
  name?: string | null;
}

interface MediaField {
  url?: string | null;
}

export interface ServiceData {
  bannerTitle?: string | null;
  breadcrumbLabel?: string | null;
  bannerImage?: MediaField | string | null;
  featureImage?: MediaField | string | null;
  featureParagraph1?: string | null;
  featureParagraph2?: string | null;
  featureParagraph3?: string | null;
  featureParagraph4?: string | null;
  steps?: Step[] | null;
  targetClients?: TargetClient[] | null;
  clientsBackgroundImage?: MediaField | string | null;
}

interface ServicesSectionData {
  breadcrumbHome?: string | null;
  serviceFeaturesSectionTitle?: string | null;
  serviceStepsSectionTitle?: string | null;
  serviceClientsSectionTitle?: string | null;
}

interface ServiceDetailClientProps {
  service: ServiceData;
  servicesSection: ServicesSectionData;
  contactFormData: import("@/types/cms").ContactFormData;
  locale: string;
  backText?: string;
}

function getImageUrl(
  field: MediaField | string | null | undefined,
  fallback: string
): string {
  if (!field) return fallback;
  if (typeof field === "string") return field;
  return field.url || fallback;
}

export function ServiceDetailClient({
  service,
  servicesSection,
  contactFormData,
  locale,
  backText = "Назад",
}: ServiceDetailClientProps) {
  const bannerImage = getImageUrl(service.bannerImage, "/assets/images/service-personal-security.jpg");
  const featureImage = getImageUrl(service.featureImage, "/assets/images/service-about.jpg");
  const clientsBgImage = getImageUrl(service.clientsBackgroundImage, "/assets/images/service-clients-bg.png");

  const steps = service.steps ?? [];
  const targetClients = service.targetClients ?? [];

  return (
    <>
      <PageBanner
        title={service.bannerTitle ?? ""}
        breadcrumbs={[
          { label: servicesSection.breadcrumbHome ?? "Главная", href: `/${locale}/` },
          { label: service.breadcrumbLabel ?? "" },
        ]}
        bgImage={bannerImage}
        backText={backText}
        locale={locale}
      />

      {/* Особенности услуги */}
      <section className={styles.section}>
        <div className="noise-overlay" />
        <div className={styles.container}>
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>
              {servicesSection.serviceFeaturesSectionTitle ?? "Особенности услуги"}
            </h2>
          </AnimatedSection>

          <div className={styles.twoColGrid}>
            <AnimatedSection direction="left">
              <div className={styles.imageBlock}>
                <Image
                  src={featureImage}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className={styles.textBlock}>
                <p>{service.featureParagraph1}</p>
                <p>{service.featureParagraph2}</p>
                <p>{service.featureParagraph3}</p>
                <p>{service.featureParagraph4}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Этапы сотрудничества */}
      <section className={styles.section}>
        <div className="noise-overlay" />
        <div className={styles.stepsContainer}>
          <AnimatedSection>
            <h2 className={styles.stepsSectionTitle}>
              {servicesSection.serviceStepsSectionTitle ?? "Этапы сотрудничества"}
            </h2>
          </AnimatedSection>

          <div className={styles.stepsGrid}>
            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className={styles.stepCard}>
                  <div className={styles.stepCrosshair}>
                    <div className={styles.stepCrosshairLineH} />
                    <div className={styles.stepCrosshairLineV} />
                    <div className={styles.stepCrosshairRing} />
                    <div className={styles.stepCrosshairCenter}>
                      <span className={styles.stepNumber}>{step.number}</span>
                    </div>
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepText}>{step.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Кому подойдёт */}
      <section className={styles.clientsSection}>
        <div className={styles.clientsBg}>
          <Image
            src={clientsBgImage}
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.clientsOverlay} />
        <div className="noise-overlay" />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/crosshair-divider-full.svg"
          alt=""
          className={styles.clientsDivider}
          aria-hidden="true"
        />

        <div className={styles.clientsContainer}>
          <AnimatedSection>
            <h2 className={styles.clientsSectionTitle}>
              {servicesSection.serviceClientsSectionTitle ?? "Кому подойдёт наша услуга"}
            </h2>
          </AnimatedSection>

          <div className={styles.clientsGrid}>
            {targetClients.map((client, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className={styles.clientCard}>
                  <Corners size={30} color="rgba(255,255,255,0.3)" />
                  <h3 className={styles.clientCardTitle}>{client.name}</h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <ContactForm data={contactFormData} locale={locale} />
    </>
  );
}
