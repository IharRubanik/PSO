import { getPayload } from "@/lib/payload";
import { extractContactFormData } from "@/lib/cms-helpers";
import { ContactsPageClient } from "./ContactsPageClient";

export const revalidate = 60;

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const payload = await getPayload();
  const fg = (slug: string) =>
    payload.findGlobal({ slug: slug as "site-settings", locale: locale as "ru" | "en" }).catch(() => null);

  const [contactsPage, siteSettings, homepage] = await Promise.all([
    fg("contacts-page"),
    fg("site-settings"),
    fg("homepage"),
  ]);

  const contactFormData = extractContactFormData(homepage as Record<string, unknown>);

  return (
    <ContactsPageClient
      data={contactsPage}
      siteSettings={siteSettings}
      contactFormData={contactFormData}
      locale={locale}
    />
  );
}
