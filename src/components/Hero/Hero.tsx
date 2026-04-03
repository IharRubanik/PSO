"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Corners } from "../Corners/Corners";
import styles from "./Hero.module.css";

export function Hero() {
  const scrollToForm = () => {
    const form = document.getElementById("contact-form");
    if (form) form.scrollIntoView({ behavior: "smooth" });
  };

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
          {"Защищаем "}
          <br />
          самое ценное
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Комплексные решения безопасности для бизнеса, частной собственности и
          мероприятий. Работаем круглосуточно и гарантируем оперативное
          реагирование.
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
          {"Связаться  с нами"}
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
        {"Связаться  с нами"}
      </motion.button>
    </section>
  );
}
