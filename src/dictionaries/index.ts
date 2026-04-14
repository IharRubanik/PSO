import { getPayload } from "payload";
import config from "@/payload.config";

export type Locale = "ru" | "en";
export const locales: Locale[] = ["ru", "en"];
export const defaultLocale: Locale = "ru";

// Static fallback dictionaries
const staticDictionaries = {
  ru: () => import("./ru.json").then((m) => m.default),
  en: () => import("./en.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  try {
    const payload = await getPayload({ config });
    const content = await payload.findGlobal({
      slug: "content",
      locale,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (content && (content as any).data) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (content as any).data;
    }
  } catch {
    // Payload unavailable — fall through to static
  }

  // Fallback to static JSON files
  return staticDictionaries[locale]();
}
