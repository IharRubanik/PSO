"use client";

import Link from "next/link";
import { AnimatedSection } from "@/components/UI/AnimatedSection";
import styles from "./page.module.css";

export default function TermsPage() {
  return (
    <section className={styles.section}>
      <div className="noise-overlay" />
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <Link href="/" className={styles.breadcrumbLink}>
            Главная
          </Link>
          <span className={styles.separator}>/</span>
          <span className={styles.breadcrumbActive}>
            Условия использования
          </span>
        </div>

        <AnimatedSection>
          <h1 className={styles.pageTitle}>Условия использования</h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className={styles.content}>
            <div className={styles.block}>
              <h2 className={styles.blockTitle}>1. Общие условия</h2>
              <p>
                Настоящие Условия использования регулируют порядок доступа и
                использования данного веб-сайта. Используя сайт, вы
                подтверждаете своё согласие с настоящими Условиями. Если вы не
                согласны с какими-либо положениями, пожалуйста, прекратите
                использование сайта.
              </p>
              <p>
                Компания оставляет за собой право изменять настоящие Условия в
                любое время без предварительного уведомления. Изменения вступают
                в силу с момента их публикации на сайте.
              </p>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>
                2. Интеллектуальная собственность
              </h2>
              <p>
                Все материалы, размещённые на сайте, включая тексты,
                изображения, логотипы, графические элементы и программный код,
                являются объектами интеллектуальной собственности компании и
                защищены законодательством Российской Федерации.
              </p>
              <p>
                Копирование, распространение, воспроизведение или иное
                использование материалов сайта без письменного согласия компании
                запрещено.
              </p>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>
                3. Ограничение ответственности
              </h2>
              <p>
                Компания не несёт ответственности за возможные убытки,
                возникшие в результате использования или невозможности
                использования сайта. Информация на сайте предоставляется &laquo;как
                есть&raquo; без каких-либо гарантий.
              </p>
              <p>
                Компания не гарантирует бесперебойную и безошибочную работу
                сайта и не несёт ответственности за временную недоступность
                сайта по техническим причинам.
              </p>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>
                4. Применимое право
              </h2>
              <p>
                Настоящие Условия использования регулируются и толкуются в
                соответствии с законодательством Российской Федерации. Все
                споры, возникающие в связи с использованием сайта, подлежат
                рассмотрению в судах по месту нахождения компании.
              </p>
              <p>
                По всем вопросам, связанным с условиями использования сайта,
                вы можете обратиться по адресу электронной почты:
                info@security-company.ru.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
