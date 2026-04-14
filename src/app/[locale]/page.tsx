import { Hero } from "@/components/Hero/Hero";
import { Services } from "@/components/Services/Services";
import { About } from "@/components/About/About";
import { Stats } from "@/components/Stats/Stats";
import { Advantages } from "@/components/Advantages/Advantages";
import { Clients } from "@/components/Clients/Clients";
import { ContactInfo } from "@/components/ContactInfo/ContactInfo";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { getPayload } from "@/lib/payload";

export const revalidate = 60;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const payload = await getPayload();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = payload as any;

  const [
    heroData,
    servicesSectionData,
    servicesData,
    aboutData,
    statsData,
    advantagesData,
    clientsData,
    contactInfoData,
    contactFormData,
    siteSettings,
  ] = await Promise.all([
    p.findGlobal({ slug: "hero-section", locale }).catch(() => null),
    p.findGlobal({ slug: "services-section", locale }).catch(() => null),
    p.find({ collection: "services", locale, sort: "sortOrder", limit: 100 }).catch(() => ({ docs: [] })),
    p.findGlobal({ slug: "about-section", locale }).catch(() => null),
    p.findGlobal({ slug: "stats-section", locale }).catch(() => null),
    p.findGlobal({ slug: "advantages-section", locale }).catch(() => null),
    p.findGlobal({ slug: "clients-section", locale }).catch(() => null),
    p.findGlobal({ slug: "contact-info-section", locale }).catch(() => null),
    p.findGlobal({ slug: "contact-form-section", locale }).catch(() => null),
    p.findGlobal({ slug: "site-settings", locale }).catch(() => null),
  ]);

  return (
    <>
      <Hero data={heroData} locale={locale} />
      <Services sectionData={servicesSectionData} services={servicesData?.docs ?? []} locale={locale} />
      <About data={aboutData} locale={locale} />
      <Stats data={statsData} />
      <Advantages data={advantagesData} />
      <Clients data={clientsData} />
      <ContactInfo data={contactInfoData} siteSettings={siteSettings} locale={locale} />
      <ContactForm data={contactFormData} locale={locale} />
    </>
  );
}
