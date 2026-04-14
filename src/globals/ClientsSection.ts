import type { GlobalConfig } from "payload";

export const ClientsSection: GlobalConfig = {
  slug: "clients-section",
  label: { ru: "Секция клиентов", en: "Clients Section" },
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
      defaultValue: "Клиенты в ведущих секторах экономики",
    },
    {
      name: "backgroundImage",
      type: "upload",
      label: { ru: "Фоновое изображение", en: "Background Image" },
      relationTo: "media",
    },
    {
      name: "items",
      type: "array",
      label: { ru: "Секторы / клиенты", en: "Items" },
      fields: [
        {
          name: "name",
          type: "text",
          label: { ru: "Название", en: "Name" },
          localized: true,
          required: true,
        },
      ],
    },
  ],
};
