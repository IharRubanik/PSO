import { getPayload } from "payload";
import config from "@/payload.config";
import ruDict from "@/dictionaries/ru.json";
import enDict from "@/dictionaries/en.json";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Seed a global that has NO array fields.
 * Simple: updateGlobal with RU, then updateGlobal with EN.
 */
async function seedSimpleGlobal(payload: any, slug: string, ruData: any, enData: any) {
  await payload.updateGlobal({ slug, locale: "ru", data: ruData });
  if (enData) {
    await payload.updateGlobal({ slug, locale: "en", data: enData });
  }
}

/**
 * Build a Payload Lexical rich-text document from a privacyPage / termsPage
 * dictionary section object.
 *
 * Recognised patterns (in the order they appear in the dict):
 *   - intro1, intro2            → plain paragraphs (privacyPage only)
 *   - sectionN.title            → <h2> heading
 *   - sectionN.p1 … pN         → plain paragraphs
 *   - sectionN.p1_1, p1_2 …    → plain paragraphs (sub-items)
 *   - sectionN.p4_1, p4_2 …    → plain paragraphs (alt numbering)
 *   - sectionN.p5_1, p5_2 …    → same
 *   - sectionN.p6_1 …          → same
 */
function buildLexicalContent(dict: Record<string, any>): object {
  function textNode(text: string) {
    return { type: "text", text, version: 1 };
  }
  function paragraph(text: string) {
    return {
      type: "paragraph",
      children: [textNode(text)],
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    };
  }
  function heading(text: string) {
    return {
      type: "heading",
      tag: "h2",
      children: [textNode(text)],
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    };
  }

  const children: object[] = [];

  // intro paragraphs (privacyPage only)
  if (dict.intro1) children.push(paragraph(dict.intro1));
  if (dict.intro2) children.push(paragraph(dict.intro2));

  // sections 1-7
  for (let i = 1; i <= 7; i++) {
    const sec = dict[`section${i}`];
    if (!sec) continue;

    if (sec.title) children.push(heading(sec.title));

    // collect all paragraph keys in insertion order
    const paraKeys = Object.keys(sec).filter((k) => k !== "title");
    for (const key of paraKeys) {
      if (sec[key]) children.push(paragraph(sec[key]));
    }
  }

  return {
    root: {
      type: "root",
      children,
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

/**
 * Seed a global that HAS array fields.
 * 1) updateGlobal with locale "ru" — creates array items with auto-generated IDs
 * 2) findGlobal with locale "ru" — reads back to get the IDs
 * 3) updateGlobal with locale "en" — passes same IDs so Payload updates
 *    existing rows instead of replacing them
 *
 * @param arrayFields — map of arrayFieldName → function(existingItem, index) => EN data for that row
 */
async function seedGlobalWithArrays(
  payload: any,
  slug: string,
  ruData: any,
  enScalarData: any,
  arrayFields: Record<string, (existing: any, idx: number) => any>,
) {
  // Step 1: Create/update with RU locale (arrays get auto IDs)
  await payload.updateGlobal({ slug, locale: "ru", data: ruData });

  // Step 2: Read back to get array item IDs
  const saved = await payload.findGlobal({ slug, locale: "ru" });

  // Step 3: Build EN data with existing IDs
  const enData: any = { ...enScalarData };
  for (const [fieldName, mapFn] of Object.entries(arrayFields)) {
    const existingItems = (saved as any)[fieldName] || [];
    enData[fieldName] = existingItems.map((item: any, idx: number) => ({
      id: item.id, // preserve the ID so Payload updates the row instead of replacing
      ...mapFn(item, idx),
    }));
  }

  await payload.updateGlobal({ slug, locale: "en", data: enData });
}

async function uploadMedia(
  payload: any,
  filename: string,
  altRu: string,
  altEn: string,
): Promise<string> {
  // Check if already exists
  const existing = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 1,
  });
  if (existing.docs.length > 0) return existing.docs[0].id;

  const filePath = path.resolve(process.cwd(), "public/assets/images", filename);
  const buffer = fs.readFileSync(filePath);
  const mimeType = filename.endsWith(".svg")
    ? "image/svg+xml"
    : filename.endsWith(".png")
      ? "image/png"
      : "image/jpeg";

  const doc = await payload.create({
    collection: "media",
    locale: "ru",
    data: { alt: altRu },
    file: {
      data: buffer,
      name: filename,
      mimetype: mimeType,
      size: buffer.length,
    },
  });

  // Update EN alt
  await payload.update({
    collection: "media",
    id: doc.id,
    locale: "en",
    data: { alt: altEn },
  });

  return doc.id;
}

export async function POST() {
  try {
    const payload = await getPayload({ config });
    const ru = ruDict as any;
    const en = enDict as any;

    // ─── PHASE 1: Upload all media ───────────────────────────────────────────

    // Globals backgrounds & icons
    const imgHeroBg = await uploadMedia(
      payload,
      "service1.jpg",
      "Фоновое изображение Hero-секции",
      "Hero section background image",
    );
    const imgAboutSectionBg = await uploadMedia(
      payload,
      "about-section-bg-new.png",
      "Фоновое изображение секции «О компании»",
      "About section background image",
    );
    const imgAboutPageAbout = await uploadMedia(
      payload,
      "about-section-bg.jpg",
      "Изображение секции «О нас» на странице о компании",
      "About us section image on the about page",
    );
    const imgClientsBg = await uploadMedia(
      payload,
      "partners-bg-new.png",
      "Фоновое изображение секции клиентов",
      "Clients section background image",
    );
    const imgFeatureIcon = await uploadMedia(
      payload,
      "icon-shield-crosshair.svg",
      "Иконка преимуществ формы обратной связи",
      "Contact form feature icon",
    );
    const imgLogoFull = await uploadMedia(
      payload,
      "logo-full.svg",
      "Логотип компании (шапка)",
      "Company logo (header)",
    );
    const imgLogo = await uploadMedia(
      payload,
      "logo.svg",
      "Логотип компании (подвал)",
      "Company logo (footer)",
    );

    // Service card images (card1–card6)
    const cardImages: string[] = [];
    for (let i = 1; i <= 6; i++) {
      const id = await uploadMedia(
        payload,
        `card${i}.jpg`,
        `Изображение карточки услуги ${i}`,
        `Service card image ${i}`,
      );
      cardImages.push(id);
    }

    // personal-guard service images
    const imgPersonalGuardBanner = await uploadMedia(
      payload,
      "service-personal-security.jpg",
      "Баннер услуги «Персональная охрана»",
      "Personal guard service banner",
    );
    const imgPersonalGuardFeature = await uploadMedia(
      payload,
      "service-about.jpg",
      "Изображение особенностей услуги «Персональная охрана»",
      "Personal guard service feature image",
    );
    const imgPersonalGuardClientsBg = await uploadMedia(
      payload,
      "service-clients-bg.png",
      "Фоновое изображение клиентов услуги «Персональная охрана»",
      "Personal guard clients background image",
    );

    // About page license images (license-1 through license-4; index 4 reuses license-1)
    const licenseImages: string[] = [];
    for (let i = 1; i <= 4; i++) {
      const id = await uploadMedia(
        payload,
        `license-${i}.jpg`,
        `Изображение лицензии ${i}`,
        `License image ${i}`,
      );
      licenseImages.push(id);
    }
    // 5th license entry reuses license-1.jpg (already uploaded — uploadMedia is idempotent)
    const imgLicense5 = licenseImages[0];

    // About page section images
    const imgArmamentBg = await uploadMedia(
      payload,
      "armament-bg.jpg",
      "Изображение секции «Вооружение»",
      "Armament section image",
    );
    const imgTrainingBg = await uploadMedia(
      payload,
      "training-bg.jpg",
      "Изображение секции «Подготовка сотрудников»",
      "Staff training section image",
    );

    // ─── PHASE 2: Seed globals (text) ────────────────────────────────────────

    // 1. Site Settings (NO arrays — simple)
    await seedSimpleGlobal(
      payload,
      "site-settings",
      {
        companyName: ru.meta.siteName,
        phone: ru.common.phone,
        phoneLink: "tel:+79999999999",
        email: ru.common.email,
        address: ru.common.address,
        telegram: "https://t.me/",
        telegramLabel: ru.common.telegram,
        yandexMapsApiKey: "7ba124fd-0581-4e1e-8cbd-2eefa636a90f",
        mapCenter: { lng: 37.534, lat: 55.749 },
        copyright: ru.footer.copyright,
        logo: imgLogoFull,
        logoFooter: imgLogo,
      },
      {
        companyName: en.meta.siteName,
        address: en.common.address,
        telegramLabel: en.common.telegram,
        copyright: en.footer.copyright,
      },
    );

    // 2. Navigation (HAS array: headerNav)
    await seedGlobalWithArrays(
      payload,
      "navigation",
      // RU data (full)
      {
        headerNav: [
          { label: ru.header.nav.home, href: "/", isAnchor: false },
          { label: ru.header.nav.services, href: "/#services", isAnchor: true },
          { label: ru.header.nav.about, href: "/about", isAnchor: false },
          { label: ru.header.nav.contacts, href: "/contacts", isAnchor: false },
        ],
        headerCtaText: ru.header.cta,
        burgerAriaLabel: ru.header.burgerAriaLabel,
        langRuLabel: "Ru",
        langEnLabel: "EN",
      },
      // EN scalar fields
      {
        headerCtaText: en.header.cta,
        burgerAriaLabel: en.header.burgerAriaLabel,
      },
      // EN array mappers
      {
        headerNav: (_existing: any, idx: number) => {
          const enNavItems = [
            { label: en.header.nav.home },
            { label: en.header.nav.services },
            { label: en.header.nav.about },
            { label: en.header.nav.contacts },
          ];
          return enNavItems[idx] || {};
        },
      },
    );

    // 3. Hero Section (NO arrays — simple)
    await seedSimpleGlobal(
      payload,
      "hero-section",
      {
        title: ru.hero.title,
        subtitle: ru.hero.subtitle,
        ctaText: ru.hero.cta,
        backgroundImage: imgHeroBg,
      },
      {
        title: en.hero.title,
        subtitle: en.hero.subtitle,
        ctaText: en.hero.cta,
      },
    );

    // 4. Services Section (NO arrays — simple)
    await seedSimpleGlobal(
      payload,
      "services-section",
      {
        sectionTitle: ru.services.sectionTitle,
        description: ru.services.description,
        learnMoreText: ru.services.learnMore,
        showAllText: ru.common.showAll,
        breadcrumbHome: ru.common.home,
        serviceFeaturesSectionTitle:
          ru.servicesPage?.serviceFeaturesSectionTitle || "Особенности услуги",
        serviceStepsSectionTitle:
          ru.servicesPage?.serviceStepsSectionTitle || "Этапы сотрудничества",
        serviceClientsSectionTitle:
          ru.servicesPage?.serviceClientsSectionTitle || "Кому подойдёт наша услуга",
      },
      {
        sectionTitle: en.services.sectionTitle,
        description: en.services.description,
        learnMoreText: en.services.learnMore,
        showAllText: en.common.showAll,
        breadcrumbHome: en.common.home,
        serviceFeaturesSectionTitle:
          en.servicesPage?.serviceFeaturesSectionTitle || "Service Features",
        serviceStepsSectionTitle:
          en.servicesPage?.serviceStepsSectionTitle || "Cooperation Steps",
        serviceClientsSectionTitle:
          en.servicesPage?.serviceClientsSectionTitle || "Who This Service Is For",
      },
    );

    // 5. About Section — homepage (NO arrays — simple)
    await seedSimpleGlobal(
      payload,
      "about-section",
      {
        sectionTitle: ru.about.sectionTitle,
        paragraph1: ru.about.paragraph1,
        paragraph2: ru.about.paragraph2,
        buttonText: ru.about.button,
        backgroundImage: imgAboutSectionBg,
      },
      {
        sectionTitle: en.about.sectionTitle,
        paragraph1: en.about.paragraph1,
        paragraph2: en.about.paragraph2,
        buttonText: en.about.button,
      },
    );

    // 6. Stats Section (HAS array: items)
    // label is localized, num/prefix/suffix/displayOverride are NOT localized
    const statsRuItems = [
      { num: 12, prefix: "", suffix: "", displayOverride: "", label: ru.stats.items[0]?.label },
      { num: 350, prefix: ">", suffix: "", displayOverride: "", label: ru.stats.items[1]?.label },
      { num: 200, prefix: ">", suffix: "", displayOverride: "", label: ru.stats.items[2]?.label },
      {
        prefix: "",
        suffix: "",
        displayOverride: "24/7",
        label: ru.stats.items[3]?.label,
      },
    ];
    const statsEnLabels = en.stats.items.map((i: any) => i.label);

    await seedGlobalWithArrays(
      payload,
      "stats-section",
      // RU data
      {
        items: statsRuItems,
      },
      // EN scalar data (none for stats)
      {},
      // EN array mappers
      {
        items: (_existing: any, idx: number) => ({
          label: statsEnLabels[idx] || "",
        }),
      },
    );

    // 7. Advantages Section (HAS array: items)
    // number is NOT localized; title, text are localized
    await seedGlobalWithArrays(
      payload,
      "advantages-section",
      // RU data
      {
        sectionTitle: ru.advantages.sectionTitle,
        items: ru.advantages.items.map((item: any) => ({
          number: item.number,
          title: item.title,
          text: item.text,
        })),
      },
      // EN scalar data
      {
        sectionTitle: en.advantages.sectionTitle,
      },
      // EN array mappers
      {
        items: (_existing: any, idx: number) => ({
          title: en.advantages.items[idx]?.title || "",
          text: en.advantages.items[idx]?.text || "",
        }),
      },
    );

    // 8. Clients Section (HAS array: items)
    // name is localized
    await seedGlobalWithArrays(
      payload,
      "clients-section",
      // RU data
      {
        sectionTitle: ru.clients.sectionTitle,
        backgroundImage: imgClientsBg,
        items: ru.clients.items.map((name: string) => ({ name })),
      },
      // EN scalar data
      {
        sectionTitle: en.clients.sectionTitle,
      },
      // EN array mappers
      {
        items: (_existing: any, idx: number) => ({
          name: en.clients.items[idx] || "",
        }),
      },
    );

    // 9. Contact Info Section (NO arrays — simple)
    await seedSimpleGlobal(
      payload,
      "contact-info-section",
      {
        sectionTitle: ru.contactInfo.sectionTitle,
        labelAddress: ru.contactInfo.labelAddress,
        labelPhone: ru.contactInfo.labelPhone,
        labelEmail: ru.contactInfo.labelEmail,
        labelSocials: ru.contactInfo.labelSocials,
      },
      {
        sectionTitle: en.contactInfo.sectionTitle,
        labelAddress: en.contactInfo.labelAddress,
        labelPhone: en.contactInfo.labelPhone,
        labelEmail: en.contactInfo.labelEmail,
        labelSocials: en.contactInfo.labelSocials,
      },
    );

    // 10. Contact Form Section (NO arrays — simple)
    await seedSimpleGlobal(
      payload,
      "contact-form-section",
      {
        title: ru.contactForm.title,
        description: ru.contactForm.description,
        featureText: ru.contactForm.featureText,
        featureIcon: imgFeatureIcon,
        placeholderName: ru.contactForm.placeholderName,
        placeholderEmail: ru.contactForm.placeholderEmail,
        placeholderMessage: ru.contactForm.placeholderMessage,
        consentText: ru.contactForm.consentText,
        consentLinkText: ru.contactForm.consentLink,
        submitText: ru.contactForm.submit,
        sendingText: ru.contactForm.sending,
        sentText: ru.contactForm.sent,
        errorText: ru.contactForm.errorSending,
      },
      {
        title: en.contactForm.title,
        description: en.contactForm.description,
        featureText: en.contactForm.featureText,
        placeholderName: en.contactForm.placeholderName,
        placeholderEmail: en.contactForm.placeholderEmail,
        placeholderMessage: en.contactForm.placeholderMessage,
        consentText: en.contactForm.consentText,
        consentLinkText: en.contactForm.consentLink,
        submitText: en.contactForm.submit,
        sendingText: en.contactForm.sending,
        sentText: en.contactForm.sent,
        errorText: en.contactForm.errorSending,
      },
    );

    // 11. Request Modal (NO arrays — simple)
    await seedSimpleGlobal(
      payload,
      "request-modal",
      {
        title: ru.requestModal.title,
        subtitle: ru.requestModal.subtitle,
        placeholderName: ru.requestModal.placeholderName,
        placeholderEmail: ru.requestModal.placeholderEmail,
        placeholderMessage: ru.requestModal.placeholderMessage,
        consentText: ru.requestModal.consentText,
        consentLinkText: ru.requestModal.consentLink,
        submitText: ru.requestModal.submit,
        closeAriaLabel: ru.requestModal.closeAriaLabel,
      },
      {
        title: en.requestModal.title,
        subtitle: en.requestModal.subtitle,
        placeholderName: en.requestModal.placeholderName,
        placeholderEmail: en.requestModal.placeholderEmail,
        placeholderMessage: en.requestModal.placeholderMessage,
        consentText: en.requestModal.consentText,
        consentLinkText: en.requestModal.consentLink,
        submitText: en.requestModal.submit,
        closeAriaLabel: en.requestModal.closeAriaLabel,
      },
    );

    // 12. Footer (HAS arrays: menuLinks, legalLinks)
    // label is localized, href is NOT localized
    await seedGlobalWithArrays(
      payload,
      "footer",
      // RU data
      {
        colMenuTitle: ru.footer.colMenu,
        colPhoneTitle: ru.footer.colPhone,
        colEmailTitle: ru.footer.colEmail,
        colSocialsTitle: ru.footer.colSocials,
        colLegalTitle: ru.footer.colLegal,
        logoAlt: ru.footer.logoAlt,
        menuLinks: [
          { label: ru.header.nav.home, href: "/" },
          { label: ru.header.nav.services, href: "/#services" },
          { label: ru.header.nav.about, href: "/about" },
          { label: ru.header.nav.contacts, href: "/contacts" },
        ],
        legalLinks: [
          { label: ru.footer.legal.privacy, href: "/privacy" },
          { label: ru.footer.legal.terms, href: "/terms" },
        ],
      },
      // EN scalar data
      {
        colMenuTitle: en.footer.colMenu,
        colPhoneTitle: en.footer.colPhone,
        colEmailTitle: en.footer.colEmail,
        colSocialsTitle: en.footer.colSocials,
        colLegalTitle: en.footer.colLegal,
        logoAlt: en.footer.logoAlt,
      },
      // EN array mappers
      {
        menuLinks: (_existing: any, idx: number) => {
          const labels = [
            en.header.nav.home,
            en.header.nav.services,
            en.header.nav.about,
            en.header.nav.contacts,
          ];
          return { label: labels[idx] || "" };
        },
        legalLinks: (_existing: any, idx: number) => {
          const labels = [en.footer.legal.privacy, en.footer.legal.terms];
          return { label: labels[idx] || "" };
        },
      },
    );

    // 13. About Page (HAS array: licenses)
    // licenses: num is NOT localized, title/issuer are localized, image is NOT localized
    const licenseImageIds = [
      licenseImages[0],
      licenseImages[1],
      licenseImages[2],
      licenseImages[3],
      imgLicense5,
    ];
    const ruLicenses = ru.aboutPage.licenses as any[];
    const enLicenses = en.aboutPage.licenses as any[];

    await seedGlobalWithArrays(
      payload,
      "about-page",
      // RU data
      {
        bannerTitle: ru.aboutPage.bannerTitle,
        bannerImage: imgHeroBg,
        breadcrumbHome: ru.aboutPage.breadcrumbHome,
        breadcrumbAbout: ru.aboutPage.breadcrumbAbout,
        aboutSectionTitle: ru.aboutPage.aboutSectionTitle,
        aboutImage: imgAboutPageAbout,
        aboutParagraph1: ru.aboutPage.aboutParagraph1,
        aboutParagraph2: ru.aboutPage.aboutParagraph2,
        aboutParagraph3: ru.aboutPage.aboutParagraph3,
        licensesSectionTitle: ru.aboutPage.licensesSectionTitle,
        licenseIssuedByLabel: ru.aboutPage.licenseIssuedBy,
        licenseViewLabel: ru.aboutPage.licenseView,
        licenses: ruLicenses.map((l: any, idx: number) => ({
          num: l.num,
          title: l.title,
          issuer: l.issuer,
          image: licenseImageIds[idx] ?? licenseImages[0],
        })),
        armamentSectionTitle: ru.aboutPage.armamentSectionTitle,
        armamentImage: imgArmamentBg,
        armamentParagraph1: ru.aboutPage.armamentParagraph1,
        armamentParagraph2: ru.aboutPage.armamentParagraph2,
        trainingSectionTitle: ru.aboutPage.trainingSectionTitle,
        trainingImage: imgTrainingBg,
        trainingParagraph1: ru.aboutPage.trainingParagraph1,
        trainingParagraph2: ru.aboutPage.trainingParagraph2,
      },
      // EN scalar data
      {
        bannerTitle: en.aboutPage.bannerTitle,
        breadcrumbHome: en.aboutPage.breadcrumbHome,
        breadcrumbAbout: en.aboutPage.breadcrumbAbout,
        aboutSectionTitle: en.aboutPage.aboutSectionTitle,
        aboutParagraph1: en.aboutPage.aboutParagraph1,
        aboutParagraph2: en.aboutPage.aboutParagraph2,
        aboutParagraph3: en.aboutPage.aboutParagraph3,
        licensesSectionTitle: en.aboutPage.licensesSectionTitle,
        licenseIssuedByLabel: en.aboutPage.licenseIssuedBy,
        licenseViewLabel: en.aboutPage.licenseView,
        armamentSectionTitle: en.aboutPage.armamentSectionTitle,
        armamentParagraph1: en.aboutPage.armamentParagraph1,
        armamentParagraph2: en.aboutPage.armamentParagraph2,
        trainingSectionTitle: en.aboutPage.trainingSectionTitle,
        trainingParagraph1: en.aboutPage.trainingParagraph1,
        trainingParagraph2: en.aboutPage.trainingParagraph2,
      },
      // EN array mappers
      {
        licenses: (_existing: any, idx: number) => ({
          title: enLicenses[idx]?.title || "",
          issuer: enLicenses[idx]?.issuer || "",
        }),
      },
    );

    // 14. Contacts Page (NO arrays — simple)
    await seedSimpleGlobal(
      payload,
      "contacts-page",
      {
        pageTitle: ru.contactsPage.title,
        breadcrumbHome: ru.contactsPage.breadcrumbHome,
        breadcrumbContacts: ru.contactsPage.breadcrumbContacts,
        backText: ru.common.back,
        labelAddress: ru.contactsPage.labelAddress,
        labelPhone: ru.contactsPage.labelPhone,
        labelEmail: ru.contactsPage.labelEmail,
        labelSocials: ru.contactsPage.labelSocials,
      },
      {
        pageTitle: en.contactsPage.title,
        breadcrumbHome: en.contactsPage.breadcrumbHome,
        breadcrumbContacts: en.contactsPage.breadcrumbContacts,
        backText: en.common.back,
        labelAddress: en.contactsPage.labelAddress,
        labelPhone: en.contactsPage.labelPhone,
        labelEmail: en.contactsPage.labelEmail,
        labelSocials: en.contactsPage.labelSocials,
      },
    );

    // 15. Privacy Page (NO arrays — simple)
    // Note: dictionary key is "breadcrumbPrivacy", global field is "breadcrumbLabel"
    await seedSimpleGlobal(
      payload,
      "privacy-page",
      {
        pageTitle: ru.privacyPage.pageTitle,
        breadcrumbHome: ru.common.home,
        breadcrumbLabel: ru.privacyPage.breadcrumbPrivacy,
        backText: ru.common.back,
        content: buildLexicalContent(ru.privacyPage),
      },
      {
        pageTitle: en.privacyPage.pageTitle,
        breadcrumbHome: en.common.home,
        breadcrumbLabel: en.privacyPage.breadcrumbPrivacy,
        backText: en.common.back,
        content: buildLexicalContent(en.privacyPage),
      },
    );

    // 16. Terms Page (NO arrays — simple)
    // Note: dictionary key is "breadcrumbTerms", global field is "breadcrumbLabel"
    await seedSimpleGlobal(
      payload,
      "terms-page",
      {
        pageTitle: ru.termsPage.pageTitle,
        breadcrumbHome: ru.common.home,
        breadcrumbLabel: ru.termsPage.breadcrumbTerms,
        backText: ru.common.back,
        content: buildLexicalContent(ru.termsPage),
      },
      {
        pageTitle: en.termsPage.pageTitle,
        breadcrumbHome: en.common.home,
        breadcrumbLabel: en.termsPage.breadcrumbTerms,
        backText: en.common.back,
        content: buildLexicalContent(en.termsPage),
      },
    );

    // 17. Not Found Page (NO arrays — simple)
    await seedSimpleGlobal(
      payload,
      "not-found-page",
      {
        title: ru.notFound.title,
        subtitle: ru.notFound.subtitle,
        buttonText: ru.notFound.button,
      },
      {
        title: en.notFound.title,
        subtitle: en.notFound.subtitle,
        buttonText: en.notFound.button,
      },
    );

    // 18. Common Texts (NO arrays — simple)
    await seedSimpleGlobal(
      payload,
      "common-texts",
      {
        backText: ru.common.back,
        homeLabel: ru.common.home,
        learnMoreText: ru.common.learnMore,
        showAllText: ru.common.showAll,
        closeText: ru.common.close,
        prevText: ru.common.prev,
        nextText: ru.common.next,
      },
      {
        backText: en.common.back,
        homeLabel: en.common.home,
        learnMoreText: en.common.learnMore,
        showAllText: en.common.showAll,
        closeText: en.common.close,
        prevText: en.common.prev,
        nextText: en.common.next,
      },
    );

    // ─── PHASE 3: Seed Services collection ───────────────────────────────────

    const serviceList = [
      { slug: "personal-guard", cardImageId: cardImages[0] },
      { slug: "rapid-response", cardImageId: cardImages[1] },
      { slug: "physical-security", cardImageId: cardImages[2] },
      { slug: "counter-surveillance", cardImageId: cardImages[3] },
      { slug: "collection", cardImageId: cardImages[4] },
      { slug: "complex-protection", cardImageId: cardImages[5] },
    ];

    for (let i = 0; i < serviceList.length; i++) {
      const svc = serviceList[i];
      const ruItem = (ru.services.items as any)[svc.slug];
      const enItem = (en.services.items as any)[svc.slug];
      const slugData = ru.servicesPage?.slugs?.[svc.slug];
      const enSlugData = en.servicesPage?.slugs?.[svc.slug];

      // Extra image fields only for personal-guard
      const isPersonalGuard = svc.slug === "personal-guard";

      const existing = await payload.find({
        collection: "services",
        where: { slug: { equals: svc.slug } },
        limit: 1,
      });

      if (existing.docs.length === 0) {
        // ── Step 1: Create with RU locale (arrays get auto-generated IDs) ──
        const doc = await payload.create({
          collection: "services",
          locale: "ru",
          data: {
            title: ruItem?.title?.replace(/\n/g, " ") || svc.slug,
            slug: svc.slug,
            sortOrder: i + 1,
            cardImage: svc.cardImageId,
            shortDescription: ruItem?.description || "",
            bannerTitle: slugData?.bannerTitle || ruItem?.title?.replace(/\n/g, " ") || "",
            bannerImage: isPersonalGuard ? imgPersonalGuardBanner : undefined,
            breadcrumbLabel: slugData?.breadcrumbLabel || ruItem?.title?.replace(/\n/g, " ") || "",
            featureImage: isPersonalGuard ? imgPersonalGuardFeature : undefined,
            // Use flat field names from dictionary (featureParagraph1, not featureParagraphs[0])
            featureParagraph1: slugData?.featureParagraph1 || "",
            featureParagraph2: slugData?.featureParagraph2 || "",
            featureParagraph3: slugData?.featureParagraph3 || "",
            featureParagraph4: slugData?.featureParagraph4 || "",
            steps:
              slugData?.steps?.map((s: any) => ({
                number: s.number,
                title: s.title,
                text: s.text,
              })) || [],
            targetClients: slugData?.targetClients?.map((c: string) => ({ name: c })) || [],
            clientsBackgroundImage: isPersonalGuard ? imgPersonalGuardClientsBg : undefined,
          },
        });

        // ── Step 2: Read back with RU locale to get array IDs ──
        const saved = await payload.findByID({
          collection: "services",
          id: doc.id,
          locale: "ru",
        });
        const savedSteps = (saved as any).steps || [];
        const savedTargetClients = (saved as any).targetClients || [];

        // ── Step 3: Update EN locale with existing array IDs ──
        await payload.update({
          collection: "services",
          id: doc.id,
          locale: "en",
          data: {
            title: enItem?.title?.replace(/\n/g, " ") || svc.slug,
            shortDescription: enItem?.description || "",
            bannerTitle: enSlugData?.bannerTitle || enItem?.title?.replace(/\n/g, " ") || "",
            breadcrumbLabel:
              enSlugData?.breadcrumbLabel || enItem?.title?.replace(/\n/g, " ") || "",
            featureParagraph1: enSlugData?.featureParagraph1 || "",
            featureParagraph2: enSlugData?.featureParagraph2 || "",
            featureParagraph3: enSlugData?.featureParagraph3 || "",
            featureParagraph4: enSlugData?.featureParagraph4 || "",
            // steps: preserve IDs, only update localized fields (title, text)
            steps: savedSteps.map((existing: any, idx: number) => ({
              id: existing.id,
              title: enSlugData?.steps?.[idx]?.title || "",
              text: enSlugData?.steps?.[idx]?.text || "",
            })),
            // targetClients: preserve IDs, only update localized field (name)
            targetClients: savedTargetClients.map((existing: any, idx: number) => ({
              id: existing.id,
              name: enSlugData?.targetClients?.[idx] || "",
            })),
          },
        });
      } else {
        // Service already exists — update image fields
        const docId = existing.docs[0].id;
        const imageUpdate: any = {
          cardImage: svc.cardImageId,
        };
        if (isPersonalGuard) {
          imageUpdate.bannerImage = imgPersonalGuardBanner;
          imageUpdate.featureImage = imgPersonalGuardFeature;
          imageUpdate.clientsBackgroundImage = imgPersonalGuardClientsBg;
        }
        await payload.update({
          collection: "services",
          id: docId,
          data: imageUpdate,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "All globals + services seeded for RU/EN (with media)",
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
