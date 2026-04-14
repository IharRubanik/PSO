import type { GlobalConfig } from "payload";

export const ServicesSection: GlobalConfig = {
  slug: "services-section",
  label: { ru: "Секция услуг", en: "Services Section" },
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
      defaultValue: "Услуги",
    },
    {
      name: "description",
      type: "textarea",
      label: { ru: "Описание", en: "Description" },
      localized: true,
      defaultValue:
        "Комплексные решения безопасности для бизнеса, частной собственности и мероприятий. Работаем круглосуточно и гарантируем оперативное реагирование.",
    },
    {
      name: "learnMoreText",
      type: "text",
      label: { ru: "Текст «подробнее»", en: "Learn More Text" },
      localized: true,
      defaultValue: "подробнее",
    },
    {
      name: "showAllText",
      type: "text",
      label: { ru: "Текст «Показать все»", en: "Show All Text" },
      localized: true,
      defaultValue: "Показать все",
    },
    {
      name: "breadcrumbHome",
      type: "text",
      label: { ru: "Хлебная крошка «Главная»", en: "Breadcrumb Home" },
      localized: true,
      defaultValue: "Главная",
    },
    {
      name: "serviceFeaturesSectionTitle",
      type: "text",
      label: { ru: "Заголовок секции особенностей услуги", en: "Service Features Section Title" },
      localized: true,
      defaultValue: "Особенности услуги",
    },
    {
      name: "serviceStepsSectionTitle",
      type: "text",
      label: { ru: "Заголовок секции этапов", en: "Service Steps Section Title" },
      localized: true,
      defaultValue: "Этапы сотрудничества",
    },
    {
      name: "serviceClientsSectionTitle",
      type: "text",
      label: { ru: "Заголовок секции клиентов услуги", en: "Service Clients Section Title" },
      localized: true,
      defaultValue: "Кому подойдёт наша услуга",
    },
  ],
};
