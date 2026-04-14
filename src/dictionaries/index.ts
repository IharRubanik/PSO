export type Locale = "ru" | "en";
export const locales: Locale[] = ["ru", "en"];
export const defaultLocale: Locale = "ru";

const staticDictionaries = {
  ru: () => import("./ru.json").then((m) => m.default),
  en: () => import("./en.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return staticDictionaries[locale]();
}
