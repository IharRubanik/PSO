import { Hero } from "@/components/Hero/Hero";
import { Services } from "@/components/Services/Services";
import { About } from "@/components/About/About";
import { Stats } from "@/components/Stats/Stats";
import { Advantages } from "@/components/Advantages/Advantages";
import { Clients } from "@/components/Clients/Clients";
import { ContactInfo } from "@/components/ContactInfo/ContactInfo";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import type { HeroData, ServicesSectionData, AboutSectionData, StatsData, AdvantagesData, ClientsData, ContactInfoData, StatItem, AdvantageItem, ClientItem, MediaField } from "@/types/cms";
import { getPayload } from "@/lib/payload";
import { extractContactFormData } from "@/lib/cms-helpers";

export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const payload = await getPayload();

  const [
    homepage,
    servicesData,
    siteSettings,
  ] = await Promise.all([
    payload.findGlobal({ slug: "homepage" as "homepage", locale }).catch(() => null) as Promise<Record<string, unknown> | null>,
    payload.find({ collection: "services", locale, sort: "sortOrder", limit: 100 }).catch(() => ({ docs: [] })),
    payload.findGlobal({ slug: "site-settings" as "site-settings", locale }).catch(() => null),
  ]);

  // Map flat prefixed fields back to the shape each component expects
  const hp = homepage as Record<string, unknown> | null;
  const s = (key: string) => hp?.[key] as string | undefined;

  const heroData: HeroData | null = hp
    ? { title: s("heroTitle"), subtitle: s("heroSubtitle"), ctaText: s("heroCtaText"), backgroundImage: hp.heroBackgroundImage as MediaField | string | undefined, backgroundVideo: hp.heroBackgroundVideo as MediaField | string | undefined }
    : null;

  const servicesSectionData: ServicesSectionData | null = hp
    ? {
        sectionTitle: s("servicesSectionTitle"),
        description: s("servicesDescription"),
        learnMoreText: s("servicesLearnMoreText"),
        showAllText: s("servicesShowAllText"),
        breadcrumbHome: s("servicesBreadcrumbHome"),
        serviceFeaturesSectionTitle: s("servicesFeaturesSectionTitle"),
        serviceStepsSectionTitle: s("servicesStepsSectionTitle"),
        serviceClientsSectionTitle: s("servicesClientsSectionTitle"),
      }
    : null;

  const aboutData: AboutSectionData | null = hp
    ? {
        sectionTitle: s("aboutSectionTitle"),
        paragraph1: s("aboutParagraph1"),
        paragraph2: s("aboutParagraph2"),
        buttonText: s("aboutButtonText"),
        backgroundImage: hp.aboutBackgroundImage as MediaField | string | undefined,
      }
    : null;

  const statsData: StatsData | null = hp
    ? { items: hp.statsItems as StatItem[] | undefined }
    : null;

  const advantagesData: AdvantagesData | null = hp
    ? { sectionTitle: s("advantagesSectionTitle"), items: hp.advantagesItems as AdvantageItem[] | undefined }
    : null;

  const clientsData: ClientsData | null = hp
    ? {
        sectionTitle: s("clientsSectionTitle"),
        backgroundImage: hp.clientsBackgroundImage as MediaField | string | undefined,
        items: hp.clientsItems as ClientItem[] | undefined,
      }
    : null;

  const contactInfoData: ContactInfoData | null = hp
    ? {
        sectionTitle: s("contactInfoSectionTitle"),
        labelAddress: s("contactInfoLabelAddress"),
        labelPhone: s("contactInfoLabelPhone"),
        labelEmail: s("contactInfoLabelEmail"),
        labelSocials: s("contactInfoLabelSocials"),
      }
    : null;

  const contactFormData = extractContactFormData(hp);

  return (
    <>
      {hp?.showHero !== false && <Hero data={heroData} locale={locale} />}
      {hp?.showServices !== false && <Services sectionData={servicesSectionData} services={servicesData?.docs ?? []} locale={locale} />}
      {hp?.showAbout !== false && <About data={aboutData} locale={locale} />}
      {hp?.showStats !== false && <Stats data={statsData} />}
      {hp?.showAdvantages !== false && <Advantages data={advantagesData} />}
      {hp?.showClients !== false && <Clients data={clientsData} />}
      {hp?.showContactInfo !== false && <ContactInfo data={contactInfoData} siteSettings={siteSettings} locale={locale} />}
      {hp?.showContactForm !== false && <ContactForm data={contactFormData} locale={locale} />}
    </>
  );
}
