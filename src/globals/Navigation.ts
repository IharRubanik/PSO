import type { GlobalConfig } from "payload";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: { ru: "Навигация", en: "Navigation" },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  admin: {
    group: { ru: "Компоненты", en: "Components" },
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: { ru: "Меню", en: "Menu" },
          fields: [
            {
              name: "headerNav",
              type: "array",
              label: { ru: "Пункты меню в шапке", en: "Header Navigation Items" },
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
                {
                  name: "isAnchor",
                  type: "checkbox",
                  label: { ru: "Якорная ссылка", en: "Is Anchor Link" },
                  defaultValue: false,
                },
              ],
            },
          ],
        },
        {
          label: { ru: "Кнопки и метки", en: "Buttons & Labels" },
          fields: [
            {
              name: "headerCtaText",
              type: "text",
              label: { ru: "Текст кнопки CTA в шапке", en: "Header CTA Button Text" },
              localized: true,
              defaultValue: "Оставить заявку",
            },
            {
              name: "burgerAriaLabel",
              type: "text",
              label: { ru: "Aria-label бургер-меню", en: "Burger Menu Aria Label" },
              localized: true,
              defaultValue: "Меню",
            },
          ],
        },
        {
          label: { ru: "Языки", en: "Languages" },
          fields: [
            {
              name: "langRuLabel",
              type: "text",
              label: { ru: "Метка языка RU", en: "RU Language Label" },
              defaultValue: "Ru",
            },
            {
              name: "langEnLabel",
              type: "text",
              label: { ru: "Метка языка EN", en: "EN Language Label" },
              defaultValue: "EN",
            },
          ],
        },
      ],
    },
  ],
};
