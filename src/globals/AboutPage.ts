import type { GlobalConfig } from "payload";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: { ru: "Страница «О компании»", en: "About Page" },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  admin: {
    group: { ru: "Страницы", en: "Pages" },
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        // ── Tab 1: Баннер ────────────────────────────────────────────
        {
          label: { ru: "Баннер", en: "Banner" },
          fields: [
            {
              name: "bannerTitle",
              type: "text",
              label: { ru: "Заголовок баннера", en: "Banner Title" },
              localized: true,
              defaultValue: "Кто мы и как обеспечиваем безопасность",
            },
            {
              name: "bannerImage",
              type: "upload",
              label: { ru: "Изображение баннера", en: "Banner Image" },
              relationTo: "media",
            },
          ],
        },

        // ── Tab 2: Хлебные крошки ────────────────────────────────────
        {
          label: { ru: "Хлебные крошки", en: "Breadcrumbs" },
          fields: [
            {
              name: "breadcrumbHome",
              type: "text",
              label: { ru: "Хлебная крошка «Главная»", en: "Breadcrumb Home" },
              localized: true,
              defaultValue: "Главная",
            },
            {
              name: "breadcrumbAbout",
              type: "text",
              label: { ru: "Хлебная крошка «О компании»", en: "Breadcrumb About" },
              localized: true,
              defaultValue: "О компании",
            },
          ],
        },

        // ── Tab 3: О нас ─────────────────────────────────────────────
        {
          label: { ru: "О нас", en: "About Us" },
          fields: [
            {
              name: "aboutSectionTitle",
              type: "text",
              label: { ru: "Заголовок секции «О нас»", en: "About Section Title" },
              localized: true,
              defaultValue: "О нас",
            },
            {
              name: "aboutImage",
              type: "upload",
              label: { ru: "Изображение секции «О нас»", en: "About Section Image" },
              relationTo: "media",
            },
            {
              name: "aboutParagraph1",
              type: "textarea",
              label: { ru: "О нас — абзац 1", en: "About Paragraph 1" },
              localized: true,
              defaultValue:
                "Наша компания специализируется на предоставлении полного спектра охранных услуг для бизнеса и частных лиц. Мы работаем на рынке безопасности более 15 лет, обеспечивая надежную защиту объектов, людей и информации.",
            },
            {
              name: "aboutParagraph2",
              type: "textarea",
              label: { ru: "О нас — абзац 2", en: "About Paragraph 2" },
              localized: true,
              defaultValue:
                "Штат компании укомплектован профессионалами с опытом работы в силовых структурах и специальных подразделениях. Каждый сотрудник проходит строгий отбор и регулярную переподготовку для поддержания высочайшего уровня квалификации.",
            },
            {
              name: "aboutParagraph3",
              type: "textarea",
              label: { ru: "О нас — абзац 3", en: "About Paragraph 3" },
              localized: true,
              defaultValue:
                "Мы используем современные технические средства охраны и собственные методики оценки рисков, что позволяет нам разрабатывать индивидуальные решения для каждого клиента, гарантируя максимальную эффективность защиты.",
            },
          ],
        },

        // ── Tab 4: Лицензии ──────────────────────────────────────────
        {
          label: { ru: "Лицензии", en: "Licenses" },
          fields: [
            {
              name: "licensesSectionTitle",
              type: "text",
              label: { ru: "Заголовок секции лицензий", en: "Licenses Section Title" },
              localized: true,
              defaultValue: "Официальные лицензии компании",
            },
            {
              name: "licenseIssuedByLabel",
              type: "text",
              label: { ru: "Подпись «Выдана:»", en: "Issued By Label" },
              localized: true,
              defaultValue: "Выдана:",
            },
            {
              name: "licenseViewLabel",
              type: "text",
              label: { ru: "Текст ссылки «смотреть»", en: "View License Label" },
              localized: true,
              defaultValue: "смотреть",
            },
            {
              name: "licenses",
              type: "array",
              label: { ru: "Лицензии", en: "Licenses" },
              fields: [
                {
                  name: "num",
                  type: "text",
                  label: { ru: "Номер", en: "Number" },
                  required: true,
                },
                {
                  name: "title",
                  type: "text",
                  label: { ru: "Название лицензии", en: "License Title" },
                  localized: true,
                  required: true,
                },
                {
                  name: "issuer",
                  type: "text",
                  label: { ru: "Выдана кем", en: "Issuer" },
                  localized: true,
                },
                {
                  name: "image",
                  type: "upload",
                  label: { ru: "Изображение лицензии", en: "License Image" },
                  relationTo: "media",
                },
              ],
            },
          ],
        },

        // ── Tab 5: Вооружение ────────────────────────────────────────
        {
          label: { ru: "Вооружение", en: "Armament" },
          fields: [
            {
              name: "armamentSectionTitle",
              type: "text",
              label: { ru: "Заголовок секции «Вооружение»", en: "Armament Section Title" },
              localized: true,
              defaultValue: "Вооружение",
            },
            {
              name: "armamentImage",
              type: "upload",
              label: { ru: "Изображение секции «Вооружение»", en: "Armament Section Image" },
              relationTo: "media",
            },
            {
              name: "armamentParagraph1",
              type: "textarea",
              label: { ru: "Вооружение — абзац 1", en: "Armament Paragraph 1" },
              localized: true,
              defaultValue:
                "Наша компания — это команда профессионалов с многолетним опытом работы в сфере безопасности. Мы предоставляем полный спектр охранных услуг для бизнеса, государственных организаций и частных клиентов.",
            },
            {
              name: "armamentParagraph2",
              type: "textarea",
              label: { ru: "Вооружение — абзац 2", en: "Armament Paragraph 2" },
              localized: true,
              defaultValue:
                "Главная задача нашей работы — обеспечить надежную защиту имущества, сотрудников и посетителей объектов. Мы используем современные технологии безопасности, тщательно отбираем персонал и постоянно повышаем уровень подготовки сотрудников.",
            },
          ],
        },

        // ── Tab 6: Подготовка ────────────────────────────────────────
        {
          label: { ru: "Подготовка", en: "Training" },
          fields: [
            {
              name: "trainingSectionTitle",
              type: "text",
              label: { ru: "Заголовок секции «Подготовка»", en: "Training Section Title" },
              localized: true,
              defaultValue: "Подготовка\nсотрудников",
            },
            {
              name: "trainingImage",
              type: "upload",
              label: { ru: "Изображение секции «Подготовка»", en: "Training Section Image" },
              relationTo: "media",
            },
            {
              name: "trainingParagraph1",
              type: "textarea",
              label: { ru: "Подготовка — абзац 1", en: "Training Paragraph 1" },
              localized: true,
              defaultValue:
                "Наша компания — это команда профессионалов с многолетним опытом работы в сфере безопасности. Мы предоставляем полный спектр охранных услуг для бизнеса, государственных организаций и частных клиентов.",
            },
            {
              name: "trainingParagraph2",
              type: "textarea",
              label: { ru: "Подготовка — абзац 2", en: "Training Paragraph 2" },
              localized: true,
              defaultValue:
                "Главная задача нашей работы — обеспечить надежную защиту имущества, сотрудников и посетителей объектов. Мы используем современные технологии безопасности, тщательно отбираем персонал и постоянно повышаем уровень подготовки сотрудников.",
            },
          ],
        },

        // ── Tab 7: SEO ───────────────────────────────────────────────
        {
          label: { ru: "SEO", en: "SEO" },
          fields: [
            {
              name: "seo",
              type: "group",
              label: { ru: "SEO", en: "SEO" },
              fields: [
                {
                  name: "metaTitle",
                  type: "text",
                  label: { ru: "Meta Title", en: "Meta Title" },
                  localized: true,
                },
                {
                  name: "metaDescription",
                  type: "textarea",
                  label: { ru: "Meta Description", en: "Meta Description" },
                  localized: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
