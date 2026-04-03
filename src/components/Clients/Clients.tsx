"use client";

import Image from "next/image";
import { AnimatedSection } from "../UI/AnimatedSection";
import { Corners } from "../Corners/Corners";
import styles from "./Clients.module.css";

/* Figma: 4 client sectors, repeated for seamless marquee */
const CLIENTS = [
  "Финансовый сектор",
  "Недвижимость",
  "логистика",
  "Промышленность",
];

export function Clients() {
  /* Quadruple the list so the marquee never shows gaps at any viewport width */
  const repeated = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section className={styles.section}>
      {/* Background image */}
      <div className={styles.bg}>
        <Image
          src="/assets/images/partners-bg-new.png"
          alt=""
          fill
          style={{ objectFit: "cover" }}
          priority={false}
        />
      </div>

      {/* Figma: gradient from rgba(0,0,0,0.4) to rgba(0,0,0,0.6) at 70.278% */}
      <div className={styles.overlay} />

      {/* Noise texture at 3% opacity */}
      <div className="noise-overlay" />

      {/* Figma: title at left:60px, top:160px, width:890px */}
      <AnimatedSection className={styles.titleWrap}>
        <h2 className={styles.title}>
          Клиенты в ведущих секторах экономики
        </h2>
      </AnimatedSection>

      {/* Figma: crosshair divider SVG at top:369px, full-width 1920px, height:110px */}
      <img
        src="/assets/images/crosshair-divider-full.svg"
        alt=""
        className={styles.divider}
        aria-hidden="true"
      />

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
