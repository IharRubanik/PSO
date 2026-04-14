import { getPayload } from "@/lib/payload";
import { AboutPageClient } from "./AboutPageClient";

export const revalidate = 60;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const payload = await getPayload();

  const [aboutPage, contactFormData, commonTexts] = await Promise.all([
    payload.findGlobal({ slug: "about-page", locale: locale as "ru" | "en" }),
    payload.findGlobal({ slug: "contact-form-section", locale: locale as "ru" | "en" }),
    payload.findGlobal({ slug: "common-texts", locale: locale as "ru" | "en" }),
  ]);

  return (
    <AboutPageClient
      data={aboutPage}
      contactFormData={contactFormData}
      locale={locale}
      backText={commonTexts?.backText ?? "Назад"}
    />
  );
}
