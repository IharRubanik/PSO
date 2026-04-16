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

export const MediaVideo: CollectionConfig = {
  slug: "media-videos",
  labels: {
    singular: { ru: "Видеофайл", en: "Video" },
    plural: { ru: "Видео", en: "Videos" },
  },
  admin: {
    hideAPIURL: true,
    group: { ru: "Медиа", en: "Media" },
  },
  upload: {
    mimeTypes: ["video/mp4", "video/webm", "video/quicktime"],
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
      label: { ru: "Описание", en: "Description" },
      localized: true,
    },
  ],
};
