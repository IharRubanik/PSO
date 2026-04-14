"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { PhoneInput } from "@/components/UI/PhoneInput";
import styles from "./RequestModal.module.css";

interface RequestModalProps {
  open: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  locale: string;
}

export function RequestModal({ open, onClose, data, locale }: RequestModalProps) {
  const [agreed, setAgreed] = useState(false);
  const [mounted, setMounted] = useState(false);

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

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <input
            type="text"
            placeholder={placeholderName}
            required
            className={styles.input}
          />
          <PhoneInput className={styles.input} required />
          <input
            type="email"
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

          <button type="submit" className={styles.submit} disabled={!agreed}>
            {submitLabel}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
