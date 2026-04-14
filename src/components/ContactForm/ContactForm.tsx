"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PhoneInput } from "@/components/UI/PhoneInput";
import { usePathname } from "next/navigation";
import { AnimatedSection } from "../UI/AnimatedSection";
import styles from "./ContactForm.module.css";

interface ContactFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  locale: string;
}

export function ContactForm({ data, locale }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const title = data?.title ?? "";
  const description = data?.description ?? "";
  const featureText = data?.featureText ?? "";
  const placeholderName = data?.placeholderName ?? "";
  const placeholderEmail = data?.placeholderEmail ?? "";
  const placeholderMessage = data?.placeholderMessage ?? "";
  const consentText = data?.consentText ?? "";
  const consentLink = data?.consentLinkText ?? "";
  const submitLabel = data?.submitText ?? "";
  const sendingLabel = data?.sendingText ?? "";
  const sentLabel = data?.sentText ?? "";
  const errorSending = data?.errorText ?? "";

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
      alert(errorSending);
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
              <h2 className={styles.title}>{title}</h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className={styles.description}>
                {description}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className={styles.features}>
                <div className={styles.featureIcon}>
                  <Image
                    src="/assets/images/icon-shield-crosshair.svg"
                    alt=""
                    width={110}
                    height={110}
                  />
                </div>
                <p className={styles.featureText}>
                  {featureText}
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Right column */}
          <AnimatedSection delay={0.3} direction="right">
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputsGroup}>
                <input
                  type="text"
                  name="name"
                  placeholder={placeholderName}
                  className={styles.input}
                  required
                />
                <PhoneInput
                  name="phone"
                  className={styles.input}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder={placeholderEmail}
                  className={styles.input}
                  pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z0-9@._+\-]/g, "");
                  }}
                />
                <textarea
                  name="message"
                  placeholder={placeholderMessage}
                  className={`${styles.input} ${styles.textarea}`}
                />
              </div>

              <label className={styles.checkbox}>
                <input type="checkbox" required />
                <span className={styles.checkmark} />
                <span className={styles.checkboxText}>
                  {consentText}{" "}
                  <Link href={`/${locale}/privacy`} className={styles.privacyLink}>
                    {consentLink}
                  </Link>
                </span>
              </label>

              <button type="submit" className={styles.submit}>
                {loading ? sendingLabel : submitted ? sentLabel : submitLabel}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
