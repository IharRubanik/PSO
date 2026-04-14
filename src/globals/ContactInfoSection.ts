import type { GlobalConfig } from "payload";

export const ContactInfoSection: GlobalConfig = {
  slug: "contact-info-section",
  label: { ru: "Секция контактной информации", en: "Contact Info Section" },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  admin: {
    group: { ru: "Главная страница", en: "Home Page" },
  },
  fields: [
    {
      name: "sectionTitle",
      type: "text",
      label: { ru: "Заголовок секции", en: "Section Title" },
      localized: true,
      defaultValue: "Свяжитесь с нами",
    },
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
};
