import type { GlobalConfig } from "payload";

export const PrivacyPage: GlobalConfig = {
  slug: "privacy-page",
  label: { ru: "Страница «Политика конфиденциальности»", en: "Privacy Policy Page" },
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
      name: "pageTitle",
      type: "text",
      label: { ru: "Заголовок страницы", en: "Page Title" },
      localized: true,
      defaultValue: "Политика конфиденциальности",
    },
    {
      name: "breadcrumbHome",
      type: "text",
      label: { ru: "Хлебная крошка «Главная»", en: "Breadcrumb Home" },
      localized: true,
      defaultValue: "Главная",
    },
    {
      name: "breadcrumbLabel",
      type: "text",
      label: { ru: "Хлебная крошка текущей страницы", en: "Breadcrumb Current Page" },
      localized: true,
      defaultValue: "Политика конфиденциальности",
    },
    {
      name: "backText",
      type: "text",
      label: { ru: "Текст «Назад»", en: "Back Text" },
      localized: true,
      defaultValue: "Назад",
    },
    {
      name: "content",
      type: "richText",
      label: { ru: "Содержимое страницы", en: "Page Content" },
      localized: true,
    },
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
};
