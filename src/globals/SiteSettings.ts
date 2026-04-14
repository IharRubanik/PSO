import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: { ru: "Настройки сайта", en: "Site Settings" },
  admin: {
    group: { ru: "Настройки", en: "Settings" },
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: "companyName",
      type: "text",
      label: { ru: "Название компании", en: "Company Name" },
      localized: true,
      defaultValue: "Фантом Групп",
    },
    {
      name: "phone",
      type: "text",
      label: { ru: "Телефон (отображаемый)", en: "Phone (display)" },
      defaultValue: "8 999 999-99-99",
    },
    {
      name: "phoneLink",
      type: "text",
      label: { ru: "Телефон (ссылка tel:)", en: "Phone (tel: link)" },
      admin: {
        description: { ru: "Формат: tel:+79999999999", en: "Format: tel:+79999999999" },
      },
    },
    {
      name: "email",
      type: "email",
      label: { ru: "Email", en: "Email" },
      defaultValue: "info@security-company.ru",
    },
    {
      name: "address",
      type: "text",
      label: { ru: "Адрес", en: "Address" },
      localized: true,
      defaultValue: "Москва, 1-й Красногвардейский проезд дом 22 с 1",
    },
    {
      name: "telegram",
      type: "text",
      label: { ru: "Telegram ссылка", en: "Telegram Link" },
      defaultValue: "https://t.me/",
    },
    {
      name: "telegramLabel",
      type: "text",
      label: { ru: "Telegram — подпись", en: "Telegram Label" },
      localized: true,
      defaultValue: "Telegram",
    },
    {
      name: "yandexMapsApiKey",
      type: "text",
      label: { ru: "API ключ Яндекс Карт", en: "Yandex Maps API Key" },
      admin: {
        description: { ru: "Ключ для JavaScript API Яндекс Карт", en: "Key for Yandex Maps JavaScript API" },
      },
    },
    {
      name: "mapCenter",
      type: "group",
      label: { ru: "Центр карты", en: "Map Center" },
      fields: [
        {
          name: "lng",
          type: "number",
          label: { ru: "Долгота (lng)", en: "Longitude (lng)" },
        },
        {
          name: "lat",
          type: "number",
          label: { ru: "Широта (lat)", en: "Latitude (lat)" },
        },
      ],
    },
    {
      name: "copyright",
      type: "text",
      label: { ru: "Копирайт", en: "Copyright" },
      localized: true,
      defaultValue: "2026©Фантом групп. Все права защищены",
    },
    {
      name: "logo",
      type: "upload",
      label: { ru: "Логотип (шапка)", en: "Logo (header)" },
      relationTo: "media",
    },
    {
      name: "logoFooter",
      type: "upload",
      label: { ru: "Логотип (подвал)", en: "Logo (footer)" },
      relationTo: "media",
    },
    {
      name: "seo",
      type: "group",
      label: { ru: "SEO по умолчанию", en: "Default SEO" },
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
