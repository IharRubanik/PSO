import type { GlobalConfig } from "payload";

export const FooterGlobal: GlobalConfig = {
  slug: "footer",
  label: { ru: "Подвал сайта", en: "Footer" },
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
      type: "tabs",
      tabs: [
        {
          label: { ru: "Заголовки колонок", en: "Column Titles" },
          fields: [
            {
              name: "colMenuTitle",
              type: "text",
              label: { ru: "Заголовок колонки «Меню»", en: "Menu Column Title" },
              localized: true,
              defaultValue: "Меню",
            },
            {
              name: "colPhoneTitle",
              type: "text",
              label: { ru: "Заголовок колонки «Телефон»", en: "Phone Column Title" },
              localized: true,
              defaultValue: "Позвонить нам",
            },
            {
              name: "colEmailTitle",
              type: "text",
              label: { ru: "Заголовок колонки «Email»", en: "Email Column Title" },
              localized: true,
              defaultValue: "Написать нам",
            },
            {
              name: "colSocialsTitle",
              type: "text",
              label: { ru: "Заголовок колонки «Соцсети»", en: "Socials Column Title" },
              localized: true,
              defaultValue: "Соцсети",
            },
            {
              name: "colLegalTitle",
              type: "text",
              label: { ru: "Заголовок колонки «Юридическое»", en: "Legal Column Title" },
              localized: true,
              defaultValue: "О защите данных",
            },
          ],
        },
        {
          label: { ru: "Ссылки меню", en: "Menu Links" },
          fields: [
            {
              name: "menuLinks",
              type: "array",
              label: { ru: "Ссылки меню", en: "Menu Links" },
              maxRows: 4,
              fields: [
                {
                  name: "label",
                  type: "text",
                  label: { ru: "Название", en: "Label" },
                  localized: true,
                  required: true,
                },
                {
                  name: "href",
                  type: "text",
                  label: { ru: "Ссылка", en: "Href" },
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: { ru: "Юридические ссылки", en: "Legal Links" },
          fields: [
            {
              name: "legalLinks",
              type: "array",
              label: { ru: "Юридические ссылки", en: "Legal Links" },
              maxRows: 2,
              fields: [
                {
                  name: "label",
                  type: "text",
                  label: { ru: "Название", en: "Label" },
                  localized: true,
                  required: true,
                },
                {
                  name: "href",
                  type: "text",
                  label: { ru: "Ссылка", en: "Href" },
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: { ru: "Логотип", en: "Logo" },
          fields: [
            {
              name: "logoAlt",
              type: "text",
              label: { ru: "Alt логотипа в подвале", en: "Footer Logo Alt" },
              localized: true,
              defaultValue: "Фантом Групп",
            },
          ],
        },
      ],
    },
  ],
};
