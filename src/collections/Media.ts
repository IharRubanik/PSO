import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: { ru: "Медиафайл", en: "Media" },
    plural: { ru: "Медиа", en: "Media" },
  },
  admin: {
  },
  upload: {
    staticDir: "public/media",
    mimeTypes: ["image/jpeg", "image/png", "image/svg+xml", "image/webp"],
    imageSizes: [
      {
        name: "card",
        width: 600,
        height: 800,
        position: "centre",
      },
      {
        name: "banner",
        width: 1920,
        height: 800,
        position: "centre",
      },
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
    ],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: { ru: "Alt текст", en: "Alt Text" },
      localized: true,
    },
  ],
};
