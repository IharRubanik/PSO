"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import styles from "./RequestModal.module.css";

interface RequestModalProps {
  open: boolean;
  onClose: () => void;
}

export function RequestModal({ open, onClose }: RequestModalProps) {
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

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Закрыть"
        >
          &times;
        </button>

        <h2 className={styles.title}>Оставить заявку</h2>
        <p className={styles.subtitle}>
          Оставьте заявку, и наш охранный менеджер свяжется с вами
        </p>

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <input
            type="text"
            placeholder="Имя*"
            required
            className={styles.input}
          />
          <input
            type="tel"
            placeholder="Телефон*"
            required
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Почта"
            className={styles.input}
          />
          <textarea
            placeholder="Сообщение..."
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
              Я согласен(на) на обработку моих{" "}
              <Link href="/privacy" className={styles.privacyLink}>
                Персональных данных
              </Link>
            </span>
          </label>

          <button
            type="submit"
            className={styles.submit}
            disabled={!agreed}
          >
            Отправить заявку
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
