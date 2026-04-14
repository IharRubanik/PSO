import type { GlobalConfig } from "payload";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: { ru: "Главная страница", en: "Home Page" },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  admin: {
    hideAPIURL: true,
    group: { ru: "Страницы", en: "Pages" },
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        // ── Tab 0: Visibility ────────────────────────────────────────
        {
          label: { ru: "Видимость блоков", en: "Block Visibility" },
          fields: [
            {
              name: "showHero",
              type: "checkbox",
              label: { ru: "Показывать баннер (Hero)", en: "Show Hero Banner" },
              defaultValue: true,
            },
            {
              name: "showServices",
              type: "checkbox",
              label: { ru: "Показывать секцию услуг", en: "Show Services Section" },
              defaultValue: true,
            },
            {
              name: "showAbout",
              type: "checkbox",
              label: { ru: "Показывать секцию «О компании»", en: "Show About Section" },
              defaultValue: true,
            },
            {
              name: "showStats",
              type: "checkbox",
              label: { ru: "Показывать статистику", en: "Show Statistics" },
              defaultValue: true,
            },
            {
              name: "showAdvantages",
              type: "checkbox",
              label: { ru: "Показывать преимущества", en: "Show Advantages" },
              defaultValue: true,
            },
            {
              name: "showClients",
              type: "checkbox",
              label: { ru: "Показывать клиентов", en: "Show Clients" },
              defaultValue: true,
            },
            {
              name: "showContactInfo",
              type: "checkbox",
              label: { ru: "Показывать контактную информацию", en: "Show Contact Info" },
              defaultValue: true,
            },
            {
              name: "showContactForm",
              type: "checkbox",
              label: { ru: "Показывать форму обратной связи", en: "Show Contact Form" },
              defaultValue: true,
            },
          ],
        },

        // ── Tab 1: Hero ──────────────────────────────────────────────
        {
          label: { ru: "Баннер (Hero)", en: "Hero Banner" },
          fields: [
            {
              name: "heroTitle",
              type: "text",
              label: { ru: "Заголовок", en: "Title" },
              localized: true,
              defaultValue: "Защищаем самое ценное",
            },
            {
              name: "heroSubtitle",
              type: "textarea",
              label: { ru: "Подзаголовок", en: "Subtitle" },
              localized: true,
              defaultValue:
                "Комплексные решения безопасности для бизнеса, частной собственности и мероприятий. Работаем круглосуточно и гарантируем оперативное реагирование.",
            },
            {
              name: "heroCtaText",
              type: "text",
              label: { ru: "Текст кнопки CTA", en: "CTA Button Text" },
              localized: true,
              defaultValue: "Связаться с нами",
            },
            {
              name: "heroBackgroundImage",
              type: "upload",
              label: { ru: "Фоновое изображение", en: "Background Image" },
              relationTo: "media",
            },
          ],
        },

        // ── Tab 2: Services ──────────────────────────────────────────
        {
          label: { ru: "Секция услуг", en: "Services Section" },
          fields: [
            {
              name: "servicesSectionTitle",
              type: "text",
              label: { ru: "Заголовок секции", en: "Section Title" },
              localized: true,
              defaultValue: "Услуги",
            },
            {
              name: "servicesDescription",
              type: "textarea",
              label: { ru: "Описание", en: "Description" },
              localized: true,
              defaultValue:
                "Комплексные решения безопасности для бизнеса, частной собственности и мероприятий. Работаем круглосуточно и гарантируем оперативное реагирование.",
            },
            {
              name: "servicesLearnMoreText",
              type: "text",
              label: { ru: "Текст «подробнее»", en: "Learn More Text" },
              localized: true,
              defaultValue: "подробнее",
            },
            {
              name: "servicesShowAllText",
              type: "text",
              label: { ru: "Текст «Показать все»", en: "Show All Text" },
              localized: true,
              defaultValue: "Показать все",
            },
            {
              name: "servicesBreadcrumbHome",
              type: "text",
              label: { ru: "Хлебная крошка «Главная»", en: "Breadcrumb Home" },
              localized: true,
              defaultValue: "Главная",
            },
            {
              name: "servicesFeaturesSectionTitle",
              type: "text",
              label: { ru: "Заголовок секции особенностей услуги", en: "Service Features Section Title" },
              localized: true,
              defaultValue: "Особенности услуги",
            },
            {
              name: "servicesStepsSectionTitle",
              type: "text",
              label: { ru: "Заголовок секции этапов", en: "Service Steps Section Title" },
              localized: true,
              defaultValue: "Этапы сотрудничества",
            },
            {
              name: "servicesClientsSectionTitle",
              type: "text",
              label: { ru: "Заголовок секции клиентов услуги", en: "Service Clients Section Title" },
              localized: true,
              defaultValue: "Кому подойдёт наша услуга",
            },
          ],
        },

        // ── Tab 3: About ─────────────────────────────────────────────
        {
          label: { ru: "О компании", en: "About Company" },
          fields: [
            {
              name: "aboutSectionTitle",
              type: "text",
              label: { ru: "Заголовок секции", en: "Section Title" },
              localized: true,
              defaultValue: "О компании",
            },
            {
              name: "aboutParagraph1",
              type: "textarea",
              label: { ru: "Абзац 1", en: "Paragraph 1" },
              localized: true,
              defaultValue:
                "Наша компания — это команда профессионалов с многолетним опытом работы в сфере безопасности. Мы предоставляем полный спектр охранных услуг для бизнеса, государственных организаций и частных клиентов.",
            },
            {
              name: "aboutParagraph2",
              type: "textarea",
              label: { ru: "Абзац 2", en: "Paragraph 2" },
              localized: true,
              defaultValue:
                "Главная задача нашей работы — обеспечить надежную защиту имущества, сотрудников и посетителей объектов. Мы используем современные технологии безопасности, тщательно отбираем персонал и постоянно повышаем уровень подготовки сотрудников.",
            },
            {
              name: "aboutButtonText",
              type: "text",
              label: { ru: "Текст кнопки", en: "Button Text" },
              localized: true,
              defaultValue: "Узнать больше",
            },
            {
              name: "aboutBackgroundImage",
              type: "upload",
              label: { ru: "Фоновое изображение", en: "Background Image" },
              relationTo: "media",
            },
          ],
        },

        // ── Tab 4: Stats ─────────────────────────────────────────────
        {
          label: { ru: "Статистика", en: "Statistics" },
          fields: [
            {
              name: "statsItems",
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
        },

        // ── Tab 5: Advantages ────────────────────────────────────────
        {
          label: { ru: "Преимущества", en: "Advantages" },
          fields: [
            {
              name: "advantagesSectionTitle",
              type: "text",
              label: { ru: "Заголовок секции", en: "Section Title" },
              localized: true,
              defaultValue: "Что вы получаете от сотрудничества",
            },
            {
              name: "advantagesItems",
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
        },

        // ── Tab 6: Clients ───────────────────────────────────────────
        {
          label: { ru: "Клиенты", en: "Clients" },
          fields: [
            {
              name: "clientsSectionTitle",
              type: "text",
              label: { ru: "Заголовок секции", en: "Section Title" },
              localized: true,
              defaultValue: "Клиенты в ведущих секторах экономики",
            },
            {
              name: "clientsBackgroundImage",
              type: "upload",
              label: { ru: "Фоновое изображение", en: "Background Image" },
              relationTo: "media",
            },
            {
              name: "clientsItems",
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
        },

        // ── Tab 7: Contact Info ──────────────────────────────────────
        {
          label: { ru: "Контактная информация", en: "Contact Info" },
          fields: [
            {
              name: "contactInfoSectionTitle",
              type: "text",
              label: { ru: "Заголовок секции", en: "Section Title" },
              localized: true,
              defaultValue: "Свяжитесь с нами",
            },
            {
              name: "contactInfoLabelAddress",
              type: "text",
              label: { ru: "Подпись «Адрес»", en: "Address Label" },
              localized: true,
              defaultValue: "Адрес",
            },
            {
              name: "contactInfoLabelPhone",
              type: "text",
              label: { ru: "Подпись «Телефон»", en: "Phone Label" },
              localized: true,
              defaultValue: "Позвонить нам",
            },
            {
              name: "contactInfoLabelEmail",
              type: "text",
              label: { ru: "Подпись «Email»", en: "Email Label" },
              localized: true,
              defaultValue: "Написать нам",
            },
            {
              name: "contactInfoLabelSocials",
              type: "text",
              label: { ru: "Подпись «Соцсети»", en: "Socials Label" },
              localized: true,
              defaultValue: "Соцсети",
            },
          ],
        },

        // ── Tab 8: Contact Form ──────────────────────────────────────
        {
          label: { ru: "Форма обратной связи", en: "Contact Form" },
          fields: [
            {
              name: "contactFormTitle",
              type: "text",
              label: { ru: "Заголовок", en: "Title" },
              localized: true,
              defaultValue: "Обсудить защиту",
            },
            {
              name: "contactFormDescription",
              type: "textarea",
              label: { ru: "Описание", en: "Description" },
              localized: true,
              defaultValue:
                "Оставьте заявку, и наш охранный менеджер персонально подберёт формат защиты — от физической охраны и постов до комплексных решений с видеонаблюдением и пультовой охраной",
            },
            {
              name: "contactFormFeatureText",
              type: "textarea",
              label: { ru: "Текст преимуществ (через |)", en: "Feature Text (pipe-separated)" },
              localized: true,
              defaultValue:
                "Консультация без обязательств | Быстрый ответ менеджера | Индивидуальный подбор уровня охраны под ваш объект | Прозрачный расчет стоимости и условия сотрудничества",
            },
            {
              name: "contactFormFeatureIcon",
              type: "upload",
              label: { ru: "Иконка преимуществ", en: "Feature Icon" },
              relationTo: "media",
            },
            {
              name: "contactFormPlaceholderName",
              type: "text",
              label: { ru: "Плейсхолдер поля «Имя»", en: "Name Placeholder" },
              localized: true,
              defaultValue: "Имя*",
            },
            {
              name: "contactFormPlaceholderEmail",
              type: "text",
              label: { ru: "Плейсхолдер поля «Email»", en: "Email Placeholder" },
              localized: true,
              defaultValue: "Почта",
            },
            {
              name: "contactFormPlaceholderMessage",
              type: "text",
              label: { ru: "Плейсхолдер поля «Сообщение»", en: "Message Placeholder" },
              localized: true,
              defaultValue: "Сообщение...",
            },
            {
              name: "contactFormConsentText",
              type: "text",
              label: { ru: "Текст согласия (до ссылки)", en: "Consent Text (before link)" },
              localized: true,
              defaultValue: "Я согласен(на) на обработку моих ",
            },
            {
              name: "contactFormConsentLinkText",
              type: "text",
              label: { ru: "Текст ссылки согласия", en: "Consent Link Text" },
              localized: true,
              defaultValue: "Персональных данных",
            },
            {
              name: "contactFormSubmitText",
              type: "text",
              label: { ru: "Текст кнопки отправки", en: "Submit Button Text" },
              localized: true,
              defaultValue: "Отправить заявку",
            },
            {
              name: "contactFormSendingText",
              type: "text",
              label: { ru: "Текст во время отправки", en: "Sending Text" },
              localized: true,
              defaultValue: "Отправка...",
            },
            {
              name: "contactFormSentText",
              type: "text",
              label: { ru: "Текст после успешной отправки", en: "Sent Text" },
              localized: true,
              defaultValue: "Отправлено!",
            },
            {
              name: "contactFormErrorText",
              type: "text",
              label: { ru: "Текст ошибки отправки", en: "Error Text" },
              localized: true,
              defaultValue: "Ошибка при отправке. Попробуйте позже.",
            },
          ],
        },

        // ── Tab 9: SEO ───────────────────────────────────────────────
        {
          label: "SEO",
          fields: [
            {
              name: "seo",
              type: "group",
              label: "SEO",
              fields: [
                {
                  name: "metaTitle",
                  type: "text",
                  label: { ru: "Meta Title", en: "Meta Title" },
                  localized: true,
                },
                {
                  name: "metaDescription",
                  type: "textarea",
                  label: { ru: "Meta Description", en: "Meta Description" },
                  localized: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
