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

  const [servicesResult, homepage, commonTexts] = await Promise.all([
    payload.find({
      collection: "services",
      where: { slug: { equals: slug } },
      locale: locale as "ru" | "en",
      limit: 1,
    }),
    payload.findGlobal({ slug: "homepage", locale: locale as "ru" | "en" }),
    payload.findGlobal({ slug: "common-texts", locale: locale as "ru" | "en" }),
  ]);

  const service = servicesResult.docs[0];

  if (!service) {
    notFound();
  }

  // Map homepage fields to the shape ServiceDetailClient expects
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hp = homepage as any;
  const servicesSection = {
    breadcrumbHome: hp?.servicesBreadcrumbHome,
    serviceFeaturesSectionTitle: hp?.servicesFeaturesSectionTitle,
    serviceStepsSectionTitle: hp?.servicesStepsSectionTitle,
    serviceClientsSectionTitle: hp?.servicesClientsSectionTitle,
  };

  const contactFormData = {
    title: hp?.contactFormTitle,
    description: hp?.contactFormDescription,
    featureText: hp?.contactFormFeatureText,
    featureIcon: hp?.contactFormFeatureIcon,
    placeholderName: hp?.contactFormPlaceholderName,
    placeholderEmail: hp?.contactFormPlaceholderEmail,
    placeholderMessage: hp?.contactFormPlaceholderMessage,
    consentText: hp?.contactFormConsentText,
    consentLinkText: hp?.contactFormConsentLinkText,
    submitText: hp?.contactFormSubmitText,
    sendingText: hp?.contactFormSendingText,
    sentText: hp?.contactFormSentText,
    errorText: hp?.contactFormErrorText,
  };

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
