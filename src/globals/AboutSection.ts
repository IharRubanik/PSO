import type { GlobalConfig } from "payload";

export const AboutSection: GlobalConfig = {
  slug: "about-section",
  label: { ru: "Секция «О компании»", en: "About Section" },
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
      defaultValue: "О компании",
    },
    {
      name: "paragraph1",
      type: "textarea",
      label: { ru: "Абзац 1", en: "Paragraph 1" },
      localized: true,
      defaultValue:
        "Наша компания — это команда профессионалов с многолетним опытом работы в сфере безопасности. Мы предоставляем полный спектр охранных услуг для бизнеса, государственных организаций и частных клиентов.",
    },
    {
      name: "paragraph2",
      type: "textarea",
      label: { ru: "Абзац 2", en: "Paragraph 2" },
      localized: true,
      defaultValue:
        "Главная задача нашей работы — обеспечить надежную защиту имущества, сотрудников и посетителей объектов. Мы используем современные технологии безопасности, тщательно отбираем персонал и постоянно повышаем уровень подготовки сотрудников.",
    },
    {
      name: "buttonText",
      type: "text",
      label: { ru: "Текст кнопки", en: "Button Text" },
      localized: true,
      defaultValue: "Узнать больше",
    },
    {
      name: "backgroundImage",
      type: "upload",
      label: { ru: "Фоновое изображение", en: "Background Image" },
      relationTo: "media",
    },
  ],
};
