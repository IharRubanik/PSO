"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "../UI/AnimatedSection";
import styles from "./About.module.css";

interface AboutProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  locale: string;
}

export function About({ data, locale }: AboutProps) {
  const sectionTitle = data?.sectionTitle ?? "";
  const paragraph1 = data?.paragraph1 ?? "";
  const paragraph2 = data?.paragraph2 ?? "";
  const buttonText = data?.buttonText ?? "";

  return (
    <section className={styles.about} id="about">
      {/* Background */}
      <div className={styles.bg}>
        <Image
          src="/assets/images/about-section-bg-new.png"
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="noise-overlay" />

      <div className={styles.container}>
        {/* Title — absolute left */}
        <AnimatedSection direction="left" className={styles.left}>
          <h2 className={styles.title}>{sectionTitle}</h2>
        </AnimatedSection>

        {/* Right block: text + button */}
        <AnimatedSection direction="right" delay={0.2} className={styles.right}>
          <div className={styles.textBlock}>
            <p className={styles.text}>
              {paragraph1}
            </p>
            <p className={styles.text}>
              {paragraph2}
            </p>
          </div>
          <Link href={`/${locale}/about`} className={styles.btn}>
            {buttonText}
          </Link>
        </AnimatedSection>

      </div>
    </section>
  );
}
