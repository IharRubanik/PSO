import { buildConfig } from "payload";
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
import { HeroSection } from "./globals/HeroSection";
import { ServicesSection } from "./globals/ServicesSection";
import { AboutSection } from "./globals/AboutSection";
import { StatsSection } from "./globals/StatsSection";
import { AdvantagesSection } from "./globals/AdvantagesSection";
import { ClientsSection } from "./globals/ClientsSection";
import { ContactInfoSection } from "./globals/ContactInfoSection";
import { ContactFormSection } from "./globals/ContactFormSection";
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
  collections: [Applications, Services, Users, Media],
  globals: [
    // Б. Главная страница
    HeroSection,
    ServicesSection,
    AboutSection,
    StatsSection,
    AdvantagesSection,
    ClientsSection,
    ContactInfoSection,
    ContactFormSection,
    // В. Страницы
    AboutPage,
    ContactsPage,
    PrivacyPage,
    TermsPage,
    NotFoundPage,
    // Г. Компоненты
    Navigation,
    RequestModalGlobal,
    FooterGlobal,
    CommonTexts,
    // Д. Настройки
    SiteSettings,
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  db: sqliteAdapter({
    client: {
      url: "file:./data/payload.db",
    },
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
