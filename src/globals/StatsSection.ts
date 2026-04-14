import type { GlobalConfig } from "payload";

export const StatsSection: GlobalConfig = {
  slug: "stats-section",
  label: { ru: "Секция статистики", en: "Stats Section" },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  admin: {
    group: { ru: "Главная страница", en: "Home Page" },
  },
  fields: [
    {
      name: "items",
      type: "array",
      label: { ru: "Показатели", en: "Items" },
      fields: [
        {
          name: "num",
          type: "number",
          label: { ru: "Число", en: "Number" },
        },
        {
          name: "prefix",
          type: "text",
          label: { ru: "Префикс (до числа)", en: "Prefix (before number)" },
        },
        {
          name: "suffix",
          type: "text",
          label: { ru: "Суффикс (после числа)", en: "Suffix (after number)" },
        },
        {
          name: "displayOverride",
          type: "text",
          label: { ru: "Переопределение отображения", en: "Display Override" },
          admin: {
            description: {
              ru: "Если заполнено — отображается вместо числа (например «24/7»)",
              en: "If set — displayed instead of the number (e.g. «24/7»)",
            },
          },
        },
        {
          name: "label",
          type: "text",
          label: { ru: "Подпись", en: "Label" },
          localized: true,
          required: true,
        },
      ],
    },
  ],
};
