import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: { ru: "Заголовок", en: "Title" },
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      label: { ru: "URL-адрес", en: "Slug" },
      required: true,
      unique: true,
      admin: {
        description: { ru: "URL страницы (например: privacy, terms, about)", en: "Page URL (e.g.: privacy, terms, about)" },
      },
    },
    {
      name: "content",
      type: "richText",
      label: { ru: "Содержимое", en: "Content" },
      localized: true,
    },
    {
      name: "seo",
      type: "group",
      label: "SEO",
      fields: [
        {
          name: "metaTitle",
          type: "text",
          label: { ru: "Meta заголовок", en: "Meta Title" },
          localized: true,
        },
        {
          name: "metaDescription",
          type: "textarea",
          label: { ru: "Meta описание", en: "Meta Description" },
          localized: true,
        },
      ],
    },
  ],
};
