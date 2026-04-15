import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  labels: {
    singular: { ru: "Услуга", en: "Service" },
    plural: { ru: "Услуги", en: "Services" },
  },
  admin: {
    hideAPIURL: true,
    useAsTitle: "title",
    group: { ru: "Страницы", en: "Pages" },
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
      label: { ru: "Название услуги", en: "Service Title" },
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      label: { ru: "URL-адрес", en: "Slug" },
      required: true,
      unique: true,
    },
    {
      name: "sortOrder",
      type: "number",
      label: { ru: "Порядок отображения", en: "Display Order" },
    },
    {
      name: "cardImage",
      type: "upload",
      label: { ru: "Изображение карточки", en: "Card Image" },
      relationTo: "media",
    },
    {
      name: "shortDescription",
      type: "textarea",
      label: { ru: "Краткое описание (для карточки)", en: "Short Description (for card)" },
      localized: true,
    },
    {
      name: "bannerImage",
      type: "upload",
      label: { ru: "Изображение баннера", en: "Banner Image" },
      relationTo: "media",
    },
    {
      name: "bannerTitle",
      type: "text",
      label: { ru: "Заголовок баннера", en: "Banner Title" },
      localized: true,
    },
    {
      name: "breadcrumbLabel",
      type: "text",
      label: { ru: "Метка хлебных крошек", en: "Breadcrumb Label" },
      localized: true,
    },
    {
      name: "featureImage",
      type: "upload",
      label: { ru: "Изображение особенностей", en: "Feature Image" },
      relationTo: "media",
    },
    {
      name: "featureParagraph1",
      type: "textarea",
      label: { ru: "Абзац особенностей 1", en: "Feature Paragraph 1" },
      localized: true,
    },
    {
      name: "featureParagraph2",
      type: "textarea",
      label: { ru: "Абзац особенностей 2", en: "Feature Paragraph 2" },
      localized: true,
    },
    {
      name: "featureParagraph3",
      type: "textarea",
      label: { ru: "Абзац особенностей 3", en: "Feature Paragraph 3" },
      localized: true,
    },
    {
      name: "featureParagraph4",
      type: "textarea",
      label: { ru: "Абзац особенностей 4", en: "Feature Paragraph 4" },
      localized: true,
    },
    {
      name: "steps",
      type: "array",
      label: { ru: "Этапы сотрудничества", en: "Cooperation Steps" },
      maxRows: 3,
      fields: [
        {
          name: "number",
          type: "text",
          label: { ru: "Номер шага", en: "Step Number" },
        },
        {
          name: "title",
          type: "text",
          label: { ru: "Заголовок шага", en: "Step Title" },
          required: true,
          localized: true,
        },
        {
          name: "text",
          type: "textarea",
          label: { ru: "Текст шага", en: "Step Text" },
          localized: true,
        },
      ],
    },
    {
      name: "clientsSectionTitle",
      type: "text",
      label: { ru: "Заголовок секции «Кому подойдёт»", en: "Clients Section Title" },
      localized: true,
      defaultValue: "Кому подойдёт наша услуга",
    },
    {
      name: "targetClients",
      type: "array",
      label: { ru: "Целевые клиенты", en: "Target Clients" },
      fields: [
        {
          name: "name",
          type: "text",
          label: { ru: "Название", en: "Name" },
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: "clientsBackgroundImage",
      type: "upload",
      label: { ru: "Фоновое изображение для клиентов", en: "Clients Background Image" },
      relationTo: "media",
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
