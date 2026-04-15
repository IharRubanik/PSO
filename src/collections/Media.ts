import type { CollectionConfig } from "payload";

const sanitizeFilename = (name: string): string => {
  const extMatch = name.match(/\.[^.]+$/);
  const ext = (extMatch ? extMatch[0] : "").toLowerCase();
  const base = name.slice(0, name.length - ext.length);
  const slug = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${slug || `file-${Date.now()}`}${ext}`;
};

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: { ru: "Медиафайл", en: "Media" },
    plural: { ru: "Медиа", en: "Media" },
  },
  admin: {
    hideAPIURL: true,
  },
  upload: {
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
  hooks: {
    beforeOperation: [
      ({ args, operation }) => {
        if (operation !== "create" && operation !== "update") return args;
        const file = args?.req?.file;
        if (file && typeof file.name === "string") {
          file.name = sanitizeFilename(file.name);
        }
        return args;
      },
    ],
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
