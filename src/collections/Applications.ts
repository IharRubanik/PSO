import type { CollectionConfig } from "payload";

export const Applications: CollectionConfig = {
  slug: "applications",
  labels: {
    singular: { ru: "Заявка", en: "Application" },
    plural: { ru: "Заявки", en: "Applications" },
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "phone", "email", "status", "createdAt"],
    description: { ru: "Заявки с форм обратной связи на сайте", en: "Applications from website contact forms" },
    hideAPIURL: true,
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: { ru: "Имя", en: "Name" },
      required: true,
    },
    {
      name: "phone",
      type: "text",
      label: { ru: "Телефон", en: "Phone" },
      required: true,
    },
    {
      name: "email",
      type: "email",
      label: { ru: "Email", en: "Email" },
    },
    {
      name: "message",
      type: "textarea",
      label: { ru: "Сообщение", en: "Message" },
    },
    {
      name: "page",
      type: "text",
      label: { ru: "Страница отправки", en: "Source Page" },
      admin: {
        readOnly: true,
      },
    },
    {
      name: "status",
      type: "select",
      label: { ru: "Статус", en: "Status" },
      options: [
        { label: { ru: "Новая", en: "New" }, value: "new" },
        { label: { ru: "В работе", en: "In Progress" }, value: "in-progress" },
        { label: { ru: "Закрыта", en: "Closed" }, value: "closed" },
      ],
      defaultValue: "new",
    },
  ],
};
