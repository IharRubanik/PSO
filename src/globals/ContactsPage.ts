import type { GlobalConfig } from "payload";

export const ContactsPage: GlobalConfig = {
  slug: "contacts-page",
  label: { ru: "Страница «Контакты»", en: "Contacts Page" },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  admin: {
    hideAPIURL: true,
    group: { ru: "Страницы", en: "Pages" },
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        // ── Видимость блоков ──────────────────────────────────────────
        {
          label: { ru: "Видимость блоков", en: "Block Visibility" },
          fields: [
            {
              name: "showContactInfo",
              type: "checkbox",
              label: { ru: "Показывать контактную информацию и карту", en: "Show Contact Info & Map" },
              defaultValue: true,
            },
            {
              name: "showContactForm",
              type: "checkbox",
              label: { ru: "Показывать форму обратной связи", en: "Show Contact Form" },
              defaultValue: true,
            },
          ],
        },

        // ── Tab 1: Основное ──────────────────────────────────────────
        {
          label: { ru: "Основное", en: "General" },
          fields: [
            {
              name: "pageTitle",
              type: "text",
              label: { ru: "Заголовок страницы", en: "Page Title" },
              localized: true,
              defaultValue: "Контакты",
            },
            {
              name: "breadcrumbHome",
              type: "text",
              label: { ru: "Хлебная крошка «Главная»", en: "Breadcrumb Home" },
              localized: true,
              defaultValue: "Главная",
            },
            {
              name: "breadcrumbContacts",
              type: "text",
              label: { ru: "Хлебная крошка «Контакты»", en: "Breadcrumb Contacts" },
              localized: true,
              defaultValue: "Контакты",
            },
            {
              name: "backText",
              type: "text",
              label: { ru: "Текст «Назад»", en: "Back Text" },
              localized: true,
              defaultValue: "Назад",
            },
          ],
        },

        // ── Tab 2: Подписи ───────────────────────────────────────────
        {
          label: { ru: "Подписи", en: "Labels" },
          fields: [
            {
              name: "labelAddress",
              type: "text",
              label: { ru: "Подпись «Адрес»", en: "Address Label" },
              localized: true,
              defaultValue: "Адрес",
            },
            {
              name: "labelPhone",
              type: "text",
              label: { ru: "Подпись «Телефон»", en: "Phone Label" },
              localized: true,
              defaultValue: "Позвонить нам",
            },
            {
              name: "labelEmail",
              type: "text",
              label: { ru: "Подпись «Email»", en: "Email Label" },
              localized: true,
              defaultValue: "Написать нам",
            },
            {
              name: "labelSocials",
              type: "text",
              label: { ru: "Подпись «Соцсети»", en: "Socials Label" },
              localized: true,
              defaultValue: "Соцсети",
            },
          ],
        },

        // ── Tab 3: SEO ───────────────────────────────────────────────
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
