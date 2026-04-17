import { notFound } from "next/navigation";
import { getPayload } from "@/lib/payload";
import { extractContactFormData } from "@/lib/cms-helpers";
import { ServiceDetailClient } from "./ServiceDetailClient";

export const dynamic = "force-dynamic";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const payload = await getPayload();

  const fg = (slug: string) =>
    payload.findGlobal({ slug: slug as "site-settings", locale: locale as "ru" | "en" }).catch(() => null);

  const [servicesResult, homepage, commonTexts] = await Promise.all([
    payload.find({
      collection: "services",
      where: { slug: { equals: slug } },
      locale: locale as "ru" | "en",
      limit: 1,
    }),
    fg("homepage"),
    fg("common-texts"),
  ]);

  const service = servicesResult.docs[0];

  if (!service) {
    notFound();
  }

  // Map homepage fields to the shape ServiceDetailClient expects
  const hp = homepage as Record<string, unknown>;
  const servicesSection = {
    breadcrumbHome: hp?.servicesBreadcrumbHome as string | undefined,
    serviceFeaturesSectionTitle: hp?.servicesFeaturesSectionTitle as string | undefined,
    serviceStepsSectionTitle: hp?.servicesStepsSectionTitle as string | undefined,
    serviceClientsSectionTitle:
      ((service as Record<string, unknown>)?.clientsSectionTitle as string | undefined) ||
      (hp?.servicesClientsSectionTitle as string | undefined),
  };

  const contactFormData = extractContactFormData(hp);

  return (
    <ServiceDetailClient
      service={service as import("./ServiceDetailClient").ServiceData}
      servicesSection={servicesSection}
      contactFormData={contactFormData}
      locale={locale}
      backText={commonTexts?.backText ?? "Назад"}
    />
  );
}
