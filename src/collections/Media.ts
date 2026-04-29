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
    mimeTypes: [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/webp",
      "video/mp4",
      "video/webm",
      "video/quicktime",
    ],
    crop: true,
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  hooks: {
    beforeOperation: [
      async ({ args, operation }) => {
        if (operation !== "create" && operation !== "update") return args;
        const file = args?.req?.file;
        if (!file || typeof file.name !== "string") return args;

        file.name = sanitizeFilename(file.name);

        const mime = file.mimetype || "";
        const shouldConvert =
          mime.startsWith("image/") && mime !== "image/svg+xml";
        if (shouldConvert && file.data) {
          const sharpMod = await import("sharp");
          const sharp = sharpMod.default;
          const buf = Buffer.isBuffer(file.data)
            ? file.data
            : Buffer.from(file.data);
          const webp = await sharp(buf).webp({ quality: 85 }).toBuffer();
          file.data = webp;
          file.mimetype = "image/webp";
          file.size = webp.length;
          file.name = file.name.replace(/\.[^.]+$/, ".webp");
        }

        return args;
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: { ru: "Alt текст / описание", en: "Alt / description" },
      localized: true,
    },
  ],
};
