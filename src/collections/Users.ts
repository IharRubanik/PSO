import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: { ru: "Пользователь", en: "User" },
    plural: { ru: "Пользователи", en: "Users" },
  },
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: { ru: "Имя", en: "Name" },
    },
    {
      name: "role",
      type: "select",
      label: { ru: "Роль", en: "Role" },
      options: [
        { label: { ru: "Администратор", en: "Admin" }, value: "admin" },
        { label: { ru: "Редактор", en: "Editor" }, value: "editor" },
      ],
      defaultValue: "editor",
      required: true,
    },
  ],
};
