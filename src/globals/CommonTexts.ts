import type { GlobalConfig } from "payload";

export const CommonTexts: GlobalConfig = {
  slug: "common-texts",
  label: { ru: "Общие тексты", en: "Common Texts" },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  admin: {
    hideAPIURL: true,
    group: { ru: "Компоненты", en: "Components" },
  },
  fields: [
    {
      name: "backText",
      type: "text",
      label: { ru: "«Назад»", en: "Back" },
      localized: true,
      defaultValue: "Назад",
    },
    {
      name: "homeLabel",
      type: "text",
      label: { ru: "«Главная»", en: "Home" },
      localized: true,
      defaultValue: "Главная",
    },
    {
      name: "learnMoreText",
      type: "text",
      label: { ru: "«подробнее»", en: "Learn More" },
      localized: true,
      defaultValue: "подробнее",
    },
    {
      name: "showAllText",
      type: "text",
      label: { ru: "«Показать все»", en: "Show All" },
      localized: true,
      defaultValue: "Показать все",
    },
    {
      name: "closeText",
      type: "text",
      label: { ru: "«Закрыть»", en: "Close" },
      localized: true,
      defaultValue: "Закрыть",
    },
    {
      name: "prevText",
      type: "text",
      label: { ru: "«Назад» (карусель)", en: "Previous" },
      localized: true,
      defaultValue: "Назад",
    },
    {
      name: "nextText",
      type: "text",
      label: { ru: "«Вперёд» (карусель)", en: "Next" },
      localized: true,
      defaultValue: "Вперёд",
    },
  ],
};
