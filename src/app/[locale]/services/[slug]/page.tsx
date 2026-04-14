import { notFound } from "next/navigation";
import { getPayload } from "@/lib/payload";
import { ServiceDetailClient } from "./ServiceDetailClient";

export const revalidate = 60;

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const payload = await getPayload();

  const [servicesResult, servicesSection, contactFormData, commonTexts] = await Promise.all([
    payload.find({
      collection: "services",
      where: { slug: { equals: slug } },
      locale: locale as "ru" | "en",
      limit: 1,
    }),
    payload.findGlobal({ slug: "services-section", locale: locale as "ru" | "en" }),
    payload.findGlobal({ slug: "contact-form-section", locale: locale as "ru" | "en" }),
    payload.findGlobal({ slug: "common-texts", locale: locale as "ru" | "en" }),
  ]);

  const service = servicesResult.docs[0];

  if (!service) {
    notFound();
  }

  return (
    <ServiceDetailClient
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      service={service as any}
      servicesSection={servicesSection}
      contactFormData={contactFormData}
      locale={locale}
      backText={commonTexts?.backText ?? "Назад"}
    />
  );
}
