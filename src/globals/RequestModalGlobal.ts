import type { GlobalConfig } from "payload";

export const RequestModalGlobal: GlobalConfig = {
  slug: "request-modal",
  label: { ru: "Модальное окно заявки", en: "Request Modal" },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  admin: {
    group: { ru: "Компоненты", en: "Components" },
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: { ru: "Заголовок", en: "Title" },
      localized: true,
      defaultValue: "Оставить заявку",
    },
    {
      name: "subtitle",
      type: "textarea",
      label: { ru: "Подзаголовок", en: "Subtitle" },
      localized: true,
      defaultValue: "Оставьте заявку, и наш охранный менеджер свяжется с вами",
    },
    {
      name: "placeholderName",
      type: "text",
      label: { ru: "Плейсхолдер поля «Имя»", en: "Name Placeholder" },
      localized: true,
      defaultValue: "Имя*",
    },
    {
      name: "placeholderEmail",
      type: "text",
      label: { ru: "Плейсхолдер поля «Email»", en: "Email Placeholder" },
      localized: true,
      defaultValue: "Почта",
    },
    {
      name: "placeholderMessage",
      type: "text",
      label: { ru: "Плейсхолдер поля «Сообщение»", en: "Message Placeholder" },
      localized: true,
      defaultValue: "Сообщение...",
    },
    {
      name: "consentText",
      type: "text",
      label: { ru: "Текст согласия (до ссылки)", en: "Consent Text (before link)" },
      localized: true,
      defaultValue: "Я согласен(на) на обработку моих ",
    },
    {
      name: "consentLinkText",
      type: "text",
      label: { ru: "Текст ссылки согласия", en: "Consent Link Text" },
      localized: true,
      defaultValue: "Персональных данных",
    },
    {
      name: "submitText",
      type: "text",
      label: { ru: "Текст кнопки отправки", en: "Submit Button Text" },
      localized: true,
      defaultValue: "Отправить заявку",
    },
    {
      name: "closeAriaLabel",
      type: "text",
      label: { ru: "Aria-label кнопки закрытия", en: "Close Button Aria Label" },
      localized: true,
      defaultValue: "Закрыть",
    },
  ],
};
