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
    homepage,
    servicesData,
    siteSettings,
  ] = await Promise.all([
    p.findGlobal({ slug: "homepage", locale }).catch(() => null),
    p.find({ collection: "services", locale, sort: "sortOrder", limit: 100 }).catch(() => ({ docs: [] })),
    p.findGlobal({ slug: "site-settings", locale }).catch(() => null),
  ]);

  // Map flat prefixed fields back to the shape each component expects
  const heroData = homepage
    ? {
        title: homepage.heroTitle,
        subtitle: homepage.heroSubtitle,
        ctaText: homepage.heroCtaText,
        backgroundImage: homepage.heroBackgroundImage,
      }
    : null;

  const servicesSectionData = homepage
    ? {
        sectionTitle: homepage.servicesSectionTitle,
        description: homepage.servicesDescription,
        learnMoreText: homepage.servicesLearnMoreText,
        showAllText: homepage.servicesShowAllText,
        breadcrumbHome: homepage.servicesBreadcrumbHome,
        serviceFeaturesSectionTitle: homepage.servicesFeaturesSectionTitle,
        serviceStepsSectionTitle: homepage.servicesStepsSectionTitle,
        serviceClientsSectionTitle: homepage.servicesClientsSectionTitle,
      }
    : null;

  const aboutData = homepage
    ? {
        sectionTitle: homepage.aboutSectionTitle,
        paragraph1: homepage.aboutParagraph1,
        paragraph2: homepage.aboutParagraph2,
        buttonText: homepage.aboutButtonText,
        backgroundImage: homepage.aboutBackgroundImage,
      }
    : null;

  const statsData = homepage
    ? {
        items: homepage.statsItems,
      }
    : null;

  const advantagesData = homepage
    ? {
        sectionTitle: homepage.advantagesSectionTitle,
        items: homepage.advantagesItems,
      }
    : null;

  const clientsData = homepage
    ? {
        sectionTitle: homepage.clientsSectionTitle,
        backgroundImage: homepage.clientsBackgroundImage,
        items: homepage.clientsItems,
      }
    : null;

  const contactInfoData = homepage
    ? {
        sectionTitle: homepage.contactInfoSectionTitle,
        labelAddress: homepage.contactInfoLabelAddress,
        labelPhone: homepage.contactInfoLabelPhone,
        labelEmail: homepage.contactInfoLabelEmail,
        labelSocials: homepage.contactInfoLabelSocials,
      }
    : null;

  const contactFormData = homepage
    ? {
        title: homepage.contactFormTitle,
        description: homepage.contactFormDescription,
        featureText: homepage.contactFormFeatureText,
        featureIcon: homepage.contactFormFeatureIcon,
        placeholderName: homepage.contactFormPlaceholderName,
        placeholderEmail: homepage.contactFormPlaceholderEmail,
        placeholderMessage: homepage.contactFormPlaceholderMessage,
        consentText: homepage.contactFormConsentText,
        consentLinkText: homepage.contactFormConsentLinkText,
        submitText: homepage.contactFormSubmitText,
        sendingText: homepage.contactFormSendingText,
        sentText: homepage.contactFormSentText,
        errorText: homepage.contactFormErrorText,
      }
    : null;

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
