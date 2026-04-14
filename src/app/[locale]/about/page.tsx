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

  const [aboutPage, homepage, commonTexts] = await Promise.all([
    payload.findGlobal({ slug: "about-page", locale: locale as "ru" | "en" }),
    payload.findGlobal({ slug: "homepage", locale: locale as "ru" | "en" }),
    payload.findGlobal({ slug: "common-texts", locale: locale as "ru" | "en" }),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hp = homepage as any;
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
    <AboutPageClient
      data={aboutPage}
      contactFormData={contactFormData}
      locale={locale}
      backText={commonTexts?.backText ?? "Назад"}
    />
  );
}
