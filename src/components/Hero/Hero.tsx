"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Corners } from "../Corners/Corners";
import styles from "./Hero.module.css";

interface HeroProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  locale: string;
}

export function Hero({ data }: HeroProps) {
  const scrollToForm = () => {
    const form = document.getElementById("contact-form");
    if (form) form.scrollIntoView({ behavior: "smooth" });
  };

  const title = data?.title ?? "";
  const subtitle = data?.subtitle ?? "";
  const cta = data?.ctaText ?? "";

  return (
    <section className={styles.hero}>
      {/* Background */}
      <div className={styles.bg}>
        <Image
          src="/assets/images/service1.jpg"
          alt=""
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.gradient} />

      {/* Frame with corners */}
      <motion.div
        className={styles.frame}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      >
        <Corners size={40} color="rgba(255,255,255,0.3)" strokeWidth={2} />
      </motion.div>

      {/* Content */}
      <div className={styles.content}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {subtitle}
        </motion.p>

        {/* CTA Button — inside content for tablet/mobile flow */}
        <motion.button
          className={styles.ctaMobile}
          onClick={scrollToForm}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          whileHover={{ boxShadow: "0 0 30px rgba(194, 161, 109, 0.15)" }}
        >
          {cta}
        </motion.button>
      </div>

      {/* CTA Button — desktop absolute positioning */}
      <motion.button
        className={styles.cta}
        onClick={scrollToForm}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.1 }}
        whileHover={{ boxShadow: "0 0 30px rgba(194, 161, 109, 0.15)" }}
      >
        {cta}
      </motion.button>
    </section>
  );
}
