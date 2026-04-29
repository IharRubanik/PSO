"use client";

import { AnimatedSection } from "../UI/AnimatedSection";
import type { ClientsData } from "@/types/cms";
import { pickResponsiveSources } from "@/lib/cms-helpers";
import { Corners } from "../Corners/Corners";
import styles from "./Clients.module.css";

interface ClientsProps {
  data: ClientsData | null;
}

export function Clients({ data }: ClientsProps) {
  const sectionTitle = data?.sectionTitle ?? "";
  const sources = pickResponsiveSources(
    data?.backgroundImage,
    data?.backgroundImageTablet,
    data?.backgroundImageMobile,
    "/assets/images/partners-bg-new.png",
  );

  const rawItems: unknown[] = Array.isArray(data?.items) ? data.items : [];
  // Items may be strings or objects with a `name` field
  const CLIENTS: string[] = rawItems.map((item) =>
    typeof item === "string" ? item : (item as { name?: string })?.name ?? ""
  );

  /* Quadruple the list so the marquee never shows gaps at any viewport width */
  const repeated = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section className={styles.section}>
      {/* Background image */}
      <div className={styles.bg}>
        <picture>
          <source media="(max-width: 640px)" srcSet={sources.mobile} />
          <source media="(max-width: 1024px)" srcSet={sources.tablet} />
          <img
            src={sources.desktop}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </picture>
      </div>

      {/* Figma: gradient from rgba(0,0,0,0.4) to rgba(0,0,0,0.6) at 70.278% */}
      <div className={styles.overlay} />

      {/* Noise texture at 3% opacity */}
      <div className="noise-overlay" />

      {/* Figma: title at left:60px, top:160px, width:890px */}
      <AnimatedSection className={styles.titleWrap}>
        <h2 className={styles.title}>
          {sectionTitle}
        </h2>
      </AnimatedSection>

      {/* Figma: crosshair divider SVG at top:369px, full-width 1920px, height:110px */}
      <div className={styles.dividerWrap} aria-hidden="true">
        <img
          src="/assets/images/crosshair-divider-full.svg"
          alt=""
          className={styles.divider}
        />
      </div>

      {/* Figma: marquee row at top:526px, height:200px */}
      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeTrack}>
          {repeated.map((client, i) => (
            <div key={`${client}-${i}`} className={styles.card}>
              <Corners size={30} color="rgba(255,255,255,0.3)" strokeWidth={2} />
              <h3 className={styles.cardTitle}>{client}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
