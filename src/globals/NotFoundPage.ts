import type { GlobalConfig } from "payload";

export const NotFoundPage: GlobalConfig = {
  slug: "not-found-page",
  label: { ru: "Страница 404", en: "404 Not Found Page" },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  admin: {
    group: { ru: "Страницы", en: "Pages" },
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: { ru: "Заголовок", en: "Title" },
      localized: true,
      defaultValue: "Страница не найдена!",
    },
    {
      name: "subtitle",
      type: "textarea",
      label: { ru: "Подзаголовок", en: "Subtitle" },
      localized: true,
      defaultValue:
        "Запрашиваемая страница не существует или была перемещена. Проверьте правильность введённого адреса или вернитесь на главную страницу.",
    },
    {
      name: "buttonText",
      type: "text",
      label: { ru: "Текст кнопки", en: "Button Text" },
      localized: true,
      defaultValue: "Вернуться на главную",
    },
  ],
};
