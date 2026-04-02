"use client";

import { AnimatedSection } from "../UI/AnimatedSection";
import styles from "./Advantages.module.css";

interface Advantage {
  number: string;
  title: string;
  text: string;
}

const advantages: Advantage[] = [
  {
    number: "01",
    title: "профессиональную команду",
    text: "Опытный штат бывших сотрудников спецслужб и ветеранов боевых действий.",
  },
  {
    number: "02",
    title: "высокую степень безопасности",
    text: "Взаимодействуем с государственными структурами с целью обеспечения упреждающей безопасности клиента.",
  },
  {
    number: "03",
    title: "Комплексный анализ рисков",
    text: "Закрываем вопросы безопасности клиента путем проведения глубокого анализа угроз, моделирования рисков, связанных с бизнесом и безопасностью клиента, выявления потенциальных точек уязвимости там, где обычная охрана их не видит.",
  },
];

export function Advantages() {
  return (
    <section className={styles.advantages}>
      <div className="noise-overlay" />
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left column — sticky title */}
          <AnimatedSection direction="left" className={styles.left}>
            <h2 className={styles.title}>
              Что вы получаете от сотрудничества
            </h2>
          </AnimatedSection>

          {/* Right column — advantage items */}
          <div className={styles.right}>
            {advantages.map((adv, i) => (
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
