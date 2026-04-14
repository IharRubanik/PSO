"use client";

import type { AdvantagesData, AdvantageItem } from "@/types/cms";
import { AnimatedSection } from "../UI/AnimatedSection";
import styles from "./Advantages.module.css";

interface AdvantagesProps {
  data: AdvantagesData | null;
}

export function Advantages({ data }: AdvantagesProps) {
  const sectionTitle = data?.sectionTitle ?? "";
  const items: AdvantageItem[] = Array.isArray(data?.items) ? data.items : [];

  return (
    <section className={styles.advantages}>
      <div className="noise-overlay" />
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left column — sticky title */}
          <AnimatedSection direction="left" className={styles.left}>
            <h2 className={styles.title}>
              {sectionTitle}
            </h2>
          </AnimatedSection>

          {/* Right column — advantage items */}
          <div className={styles.right}>
            {items.map((adv, i) => (
              <AnimatedSection key={i} direction="right" delay={0.15 * i}>
                <div className={styles.item}>
                  {/* Crosshair icon: crosshair lines + outer ring + inner circle with number */}
                  <div className={styles.icon} aria-hidden="true">
                    <div className={styles.crosshairLineH} />
                    <div className={styles.crosshairLineV} />
                    <div className={styles.crosshairRing} />
                    <div className={styles.crosshairCenter}>
                      <span className={styles.crosshairText}>{adv.number}</span>
                    </div>
                  </div>
                  <div className={styles.content}>
                    <h3 className={styles.itemTitle}>{adv.title}</h3>
                    <p className={styles.itemText}>{adv.text}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
