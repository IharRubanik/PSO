import Link from "next/link";
import { getPayload } from "@/lib/payload";
import styles from "./not-found.module.css";

export const dynamic = "force-dynamic";

export default async function NotFound() {
  const payload = await getPayload();

  let notFoundPage: {
    title?: string | null;
    subtitle?: string | null;
    buttonText?: string | null;
  } = {};

  try {
    notFoundPage = await payload.findGlobal({ slug: "not-found-page" });
  } catch {
    // fallback to defaults if fetch fails
  }

  return (
    <div className={styles.wrapper}>
      <div className="noise-overlay" />

      <div className={styles.content}>
        <div className={styles.errorCode}>
          <span className={styles.digit}>4</span>
          <div className={styles.crosshairWrapper}>
            <svg
              className={styles.crosshair}
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Concentric circles */}
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="var(--color-gold)"
                strokeWidth="1"
                opacity="0.3"
              />
              <circle
                cx="100"
                cy="100"
                r="60"
                stroke="var(--color-gold)"
                strokeWidth="1"
                opacity="0.5"
              />
              <circle
                cx="100"
                cy="100"
                r="30"
                stroke="var(--color-gold)"
                strokeWidth="1"
                opacity="0.7"
              />
              {/* Crosshair lines */}
              <line
                x1="100"
                y1="0"
                x2="100"
                y2="200"
                stroke="var(--color-gold)"
                strokeWidth="1"
                opacity="0.4"
              />
              <line
                x1="0"
                y1="100"
                x2="200"
                y2="100"
                stroke="var(--color-gold)"
                strokeWidth="1"
                opacity="0.4"
              />
            </svg>
            {/* Center dot */}
            <div className={styles.centerDot} />
          </div>
          <span className={styles.digit}>4</span>
        </div>

        <h1 className={styles.title}>
          {notFoundPage.title ?? "Страница не найдена!"}
        </h1>
        <p className={styles.subtitle}>
          {notFoundPage.subtitle ??
            "Запрашиваемая страница не существует или была перемещена. Проверьте правильность введённого адреса или вернитесь на главную страницу."}
        </p>

        <Link href="/" className={styles.button}>
          {notFoundPage.buttonText ?? "Вернуться на главную"}
        </Link>
      </div>
    </div>
  );
}
