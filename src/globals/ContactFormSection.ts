import type { GlobalConfig } from "payload";

export const ContactFormSection: GlobalConfig = {
  slug: "contact-form-section",
  label: { ru: "Секция формы обратной связи", en: "Contact Form Section" },
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
      defaultValue: "Обсудить защиту",
    },
    {
      name: "description",
      type: "textarea",
      label: { ru: "Описание", en: "Description" },
      localized: true,
      defaultValue:
        "Оставьте заявку, и наш охранный менеджер персонально подберёт формат защиты — от физической охраны и постов до комплексных решений с видеонаблюдением и пультовой охраной",
    },
    {
      name: "featureText",
      type: "textarea",
      label: { ru: "Текст преимуществ (через |)", en: "Feature Text (pipe-separated)" },
      localized: true,
      defaultValue:
        "Консультация без обязательств | Быстрый ответ менеджера | Индивидуальный подбор уровня охраны под ваш объект | Прозрачный расчет стоимости и условия сотрудничества",
    },
    {
      name: "featureIcon",
      type: "upload",
      label: { ru: "Иконка преимуществ", en: "Feature Icon" },
      relationTo: "media",
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
      name: "sendingText",
      type: "text",
      label: { ru: "Текст во время отправки", en: "Sending Text" },
      localized: true,
      defaultValue: "Отправка...",
    },
    {
      name: "sentText",
      type: "text",
      label: { ru: "Текст после успешной отправки", en: "Sent Text" },
      localized: true,
      defaultValue: "Отправлено!",
    },
    {
      name: "errorText",
      type: "text",
      label: { ru: "Текст ошибки отправки", en: "Error Text" },
      localized: true,
      defaultValue: "Ошибка при отправке. Попробуйте позже.",
    },
  ],
};
