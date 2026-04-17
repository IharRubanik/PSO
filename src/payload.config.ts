import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

import { ru } from "@payloadcms/translations/languages/ru";
import { en } from "@payloadcms/translations/languages/en";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Services } from "./collections/Services";
import { Applications } from "./collections/Applications";
import { SiteSettings } from "./globals/SiteSettings";
import { Navigation } from "./globals/Navigation";
import { Homepage } from "./globals/Homepage";
import { RequestModalGlobal } from "./globals/RequestModalGlobal";
import { FooterGlobal } from "./globals/FooterGlobal";
import { AboutPage } from "./globals/AboutPage";
import { ContactsPage } from "./globals/ContactsPage";
import { PrivacyPage } from "./globals/PrivacyPage";
import { TermsPage } from "./globals/TermsPage";
import { NotFoundPage } from "./globals/NotFoundPage";
import { CommonTexts } from "./globals/CommonTexts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Applications, Services, Media, Users],
  globals: [
    // Главная страница
    Homepage,
    // Страницы
    AboutPage,
    ContactsPage,
    PrivacyPage,
    TermsPage,
    NotFoundPage,
    // Компоненты
    Navigation,
    RequestModalGlobal,
    FooterGlobal,
    CommonTexts,
    // Настройки
    SiteSettings,
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  db: process.env.DATABASE_URL
    ? postgresAdapter({
        pool: { connectionString: process.env.DATABASE_URL },
      })
    : sqliteAdapter({
        client: { url: "file:./data/payload-dev.db" },
      }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  i18n: {
    supportedLanguages: { ru, en },
    fallbackLanguage: "ru",
  },
  admin: {
    user: Users.slug,
    theme: "dark",
    components: {
      graphics: {
        Icon: "@/admin/graphics/Icon#Icon",
        Logo: "@/admin/graphics/Logo#Logo",
      },
    },
    meta: {
      titleSuffix: " — PSO",
    },
  },
  localization: {
    locales: [
      { label: "Русский", code: "ru" },
      { label: "English", code: "en" },
    ],
    defaultLocale: "ru",
    fallback: true,
  },
});
