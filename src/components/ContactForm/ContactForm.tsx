"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedSection } from "../UI/AnimatedSection";
import styles from "./ContactForm.module.css";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setLoading(true);
    try {
      await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email") || null,
          message: formData.get("message") || null,
          page: pathname,
        }),
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        form.reset();
      }, 3000);
    } catch {
      alert("Ошибка при отправке. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-form" className={styles.section}>
      <div className="noise-overlay" />

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left column */}
          <div className={styles.left}>
            <AnimatedSection>
              <h2 className={styles.title}>Обсудить защиту</h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className={styles.description}>
                Оставьте заявку, и наш охранный менеджер персонально подберёт формат
                защиты — от физической охраны и постов до комплексных решений
                с видеонаблюдением и пультовой охраной
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className={styles.features}>
                <div className={styles.featureIcon}>
                  <Image
                    src="/assets/images/icon-warning.svg"
                    alt=""
                    width={110}
                    height={110}
                  />
                </div>
                <p className={styles.featureText}>
                  Консультация без обязательств | Быстрый ответ менеджера |
                  Индивидуальный подбор уровня охраны под ваш объект | Прозрачный
                  расчет стоимости и условия сотрудничества
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Right column */}
          <AnimatedSection delay={0.3} direction="right">
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Имя*"
                className={styles.input}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Телефон*"
                className={styles.input}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Почта"
                className={styles.input}
              />
              <textarea
                name="message"
                placeholder="Сообщение..."
                className={`${styles.input} ${styles.textarea}`}
              />

              <label className={styles.checkbox}>
                <input type="checkbox" required />
                <span className={styles.checkmark} />
                <span className={styles.checkboxText}>
                  Я согласен(на) на обработку моих{" "}
                  <Link href="/privacy" className={styles.privacyLink}>
                    Персональных данных
                  </Link>
                </span>
              </label>

              <button type="submit" className={styles.submit}>
                {loading ? "Отправка..." : submitted ? "Отправлено!" : "Отправить заявку"}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
