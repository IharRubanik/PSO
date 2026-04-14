import type { GlobalConfig } from "payload";

export const AdvantagesSection: GlobalConfig = {
  slug: "advantages-section",
  label: { ru: "Секция преимуществ", en: "Advantages Section" },
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
      defaultValue: "Что вы получаете от сотрудничества",
    },
    {
      name: "items",
      type: "array",
      label: { ru: "Преимущества", en: "Items" },
      fields: [
        {
          name: "number",
          type: "text",
          label: { ru: "Номер", en: "Number" },
          required: true,
        },
        {
          name: "title",
          type: "text",
          label: { ru: "Заголовок", en: "Title" },
          localized: true,
          required: true,
        },
        {
          name: "text",
          type: "textarea",
          label: { ru: "Текст", en: "Text" },
          localized: true,
        },
      ],
    },
  ],
};
