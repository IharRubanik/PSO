"use client";

import Link from "next/link";
import { AnimatedSection } from "@/components/UI/AnimatedSection";
import styles from "./page.module.css";

export default function TermsPage() {
  return (
    <section className={styles.section}>
      <div className="noise-overlay" />
      <div className={styles.breadcrumbs}>
        <Link href="/" className={styles.breadcrumbLink}>
          Главная
        </Link>
        <span className={styles.separator} />
        <span className={styles.breadcrumbActive}>
          Условия использования
        </span>
      </div>
      <div className={styles.container}>
        <AnimatedSection>
          <h1 className={styles.pageTitle}>Условия использования</h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className={styles.content}>
            <div className={styles.block}>
              <h2 className={styles.blockTitle}>1. Область применения</h2>
              <p>
                Настоящие условия использования регулируют доступ к веб-сайту
                phantom-group.ru (далее — «Веб-сайт») и его использование.
                Получая доступ к данному Веб-сайту, вы соглашаетесь с настоящими
                условиями.
              </p>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>
                2. Поставщик / Ответственное лицо
              </h2>
              <p>
                Фантом групп
                <br />
                Москва, 1-й Красногвардейский проезд дом 22 с 1
                <br />
                Москва
                <br />
                Телефон: 8 999 999-99-99
              </p>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>3. Содержание Веб-сайта</h2>
              <p>
                Содержание данного Веб-сайта было создано с максимально возможной
                тщательностью. Однако мы не гарантируем точность, полноту и
                актуальность представленной информации.
              </p>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>4. Ответственность</h2>
              <p>
                Использование Веб-сайта осуществляется на ваш собственный риск.
                Претензии к компании Фантом групп, связанные с материальным или
                нематериальным ущербом, возникшим в результате использования или
                неиспользования представленной информации, исключаются, за
                исключением случаев доказанного умысла или грубой
                неосторожности.
              </p>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>5. Авторское право</h2>
              <p>
                Все материалы и контент, опубликованные на данном Веб-сайте,
                защищены авторским правом. Любое использование за пределами,
                установленных законодательством об авторском праве, требует
                предварительного письменного согласия Фантом групп.
              </p>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>6. Внешние ссылки</h2>
              <p>
                Данный Веб-сайт может содержать ссылки на сторонние веб-сайты.
                Мы не имеем влияния на их содержание и не несем за него
                ответственности.
              </p>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>
                7. Изменение условий использования
              </h2>
              <p>
                Мы оставляем за собой право в любое время вносить изменения в
                настоящие условия использования. Применяется актуальная версия,
                опубликованная на Веб-сайте.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
