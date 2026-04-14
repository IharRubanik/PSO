import { getPayload } from "@/lib/payload";
import { ContactsPageClient } from "./ContactsPageClient";

export const revalidate = 60;

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const payload = await getPayload();

  const [contactsPage, siteSettings, homepage] = await Promise.all([
    payload.findGlobal({ slug: "contacts-page", locale: locale as "ru" | "en" }),
    payload.findGlobal({ slug: "site-settings", locale: locale as "ru" | "en" }),
    payload.findGlobal({ slug: "homepage", locale: locale as "ru" | "en" }),
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
    <ContactsPageClient
      data={contactsPage}
      siteSettings={siteSettings}
      contactFormData={contactFormData}
      locale={locale}
    />
  );
}
