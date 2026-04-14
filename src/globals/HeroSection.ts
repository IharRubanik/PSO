import type { GlobalConfig } from "payload";

export const HeroSection: GlobalConfig = {
  slug: "hero-section",
  label: { ru: "Hero-секция", en: "Hero Section" },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  admin: {
    group: { ru: "Главная страница", en: "Home Page" },
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: { ru: "Заголовок", en: "Title" },
      localized: true,
      defaultValue: "Защищаем самое ценное",
    },
    {
      name: "subtitle",
      type: "textarea",
      label: { ru: "Подзаголовок", en: "Subtitle" },
      localized: true,
      defaultValue:
        "Комплексные решения безопасности для бизнеса, частной собственности и мероприятий. Работаем круглосуточно и гарантируем оперативное реагирование.",
    },
    {
      name: "ctaText",
      type: "text",
      label: { ru: "Текст кнопки CTA", en: "CTA Button Text" },
      localized: true,
      defaultValue: "Связаться с нами",
    },
    {
      name: "backgroundImage",
      type: "upload",
      label: { ru: "Фоновое изображение", en: "Background Image" },
      relationTo: "media",
    },
  ],
};
