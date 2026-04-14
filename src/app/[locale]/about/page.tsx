import { getPayload } from "@/lib/payload";
import { extractContactFormData } from "@/lib/cms-helpers";
import { AboutPageClient } from "./AboutPageClient";

export const revalidate = 60;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const payload = await getPayload();
  const fg = (slug: string) =>
    payload.findGlobal({ slug: slug as "site-settings", locale: locale as "ru" | "en" }).catch(() => null);

  const [aboutPage, homepage, commonTexts] = await Promise.all([
    fg("about-page"),
    fg("homepage"),
    fg("common-texts"),
  ]);

  const contactFormData = extractContactFormData(homepage as Record<string, unknown>);

  return (
    <AboutPageClient
      data={aboutPage ?? {}}
      contactFormData={contactFormData}
      locale={locale}
      backText={commonTexts?.backText ?? "Назад"}
    />
  );
}
