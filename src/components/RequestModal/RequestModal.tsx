"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { RequestModalData } from "@/types/cms";
import { PhoneInput } from "@/components/UI/PhoneInput";
import styles from "./RequestModal.module.css";

interface RequestModalProps {
  open: boolean;
  onClose: () => void;
  data: RequestModalData | null;
  locale: string;
}

export function RequestModal({ open, onClose, data, locale }: RequestModalProps) {
  const [agreed, setAgreed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = document.getElementById("page-root");
    if (!root) return;

    if (open) {
      root.style.filter = "blur(8px)";
      root.style.transition = "filter 0.3s ease";
      document.body.style.overflow = "hidden";
    } else {
      root.style.filter = "";
      document.body.style.overflow = "";
    }

    return () => {
      root.style.filter = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || !mounted) return null;

  const title: string = data?.title ?? "";
  const subtitle: string = data?.subtitle ?? "";
  const placeholderName: string = data?.placeholderName ?? "";
  const placeholderEmail: string = data?.placeholderEmail ?? "";
  const placeholderMessage: string = data?.placeholderMessage ?? "";
  const consentText: string = data?.consentText ?? "";
  const consentLink: string = data?.consentLinkText ?? "";
  const submitLabel: string = data?.submitText ?? "";
  const closeAriaLabel: string = data?.closeAriaLabel ?? "Закрыть";
  const privacyHref = `/${locale}/privacy`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setLoading(true);
    try {
      await fetch("/api/submit-application", {
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
        setAgreed(false);
        form.reset();
        onClose();
      }, 2000);
    } catch {
      alert("Ошибка при отправке");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.close}
          onClick={onClose}
          aria-label={closeAriaLabel}
        >
          &times;
        </button>

        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder={placeholderName}
            required
            className={styles.input}
          />
          <PhoneInput name="phone" className={styles.input} required />
          <input
            type="email"
            name="email"
            placeholder={placeholderEmail}
            className={styles.input}
            pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(
                /[^a-zA-Z0-9@._+\-]/g,
                ""
              );
            }}
          />
          <textarea
            name="message"
            placeholder={placeholderMessage}
            className={styles.textarea}
            rows={4}
          />

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>
              {consentText}{" "}
              <Link href={privacyHref} className={styles.privacyLink}>
                {consentLink}
              </Link>
            </span>
          </label>

          <button type="submit" className={styles.submit} disabled={!agreed || loading}>
            {loading ? "Отправка..." : submitted ? "Отправлено!" : submitLabel}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
