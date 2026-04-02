"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./Stats.module.css";

interface StatItem {
  num?: number;
  display?: string;
  prefix?: string;
  suffix?: string;
  label: string;
}

const statsData: StatItem[] = [
  { num: 12, label: "лет успешной работы на рынке безопасности" },
  { num: 350, prefix: ">", label: "объектов находятся под нашей охраной" },
  { num: 200, prefix: ">", label: "специалистов в штате компании" },
  { display: "24/7", label: "круглосуточный контроль безопасности" },
];

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function CounterItem({ item, index }: { item: StatItem; index: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const animate = useCallback(() => {
    if (!item.num) return;
    const target = item.num;
    const duration = 2000;
    let start: number | null = null;

    function step(timestamp: number) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);
      setCount(Math.round(easedProgress * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [item.num]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animate();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, animate]);

  return (
    <div
      className={`${styles.item} ${hasAnimated ? styles.itemVisible : ""}`}
      ref={ref}
      style={{ transitionDelay: `${index * 0.2}s` }}
    >
      {/* Figma: SVG corner frame, white stroke-opacity 0.3, stroke-width 2 */}
      <img
        src="/assets/images/stats-frame.svg"
        alt=""
        className={styles.frame}
        aria-hidden="true"
      />
      <div className={styles.number}>
        {item.display ? (
          <span>{item.display}</span>
        ) : (
          <>
            {item.prefix && (
              <span className={styles.prefix}>{item.prefix}</span>
            )}
            <span>{count}</span>
            {item.suffix && (
              <span className={styles.suffix}>{item.suffix}</span>
            )}
          </>
        )}
      </div>
      <p className={styles.label}>{item.label}</p>
    </div>
  );
}

export function Stats() {
  return (
    <section className={styles.stats}>
      <div className="noise-overlay" />
      <div className={styles.container}>
        <div className={styles.grid}>
          {statsData.map((item, i) => (
            <CounterItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
