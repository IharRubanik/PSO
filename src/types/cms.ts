/** Shared CMS data types for Payload globals and collections */

// ─── Primitives ──────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
  isAnchor?: boolean;
}

export interface MediaField {
  url?: string | null;
}

// ─── Site Settings ───────────────────────────────────────────────────────────

export interface SiteSettingsData {
  companyName?: string | null;
  phone?: string | null;
  phoneLink?: string | null;
  email?: string | null;
  address?: string | null;
  telegram?: string | null;
  telegramLabel?: string | null;
  max?: string | null;
  maxLabel?: string | null;
  yandexMapsApiKey?: string | null;
  mapCenter?: { lng?: number | null; lat?: number | null } | null;
  copyright?: string | null;
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavigationData {
  headerNav?: NavLink[];
  headerCtaText?: string | null;
  burgerAriaLabel?: string | null;
  langRuLabel?: string | null;
  langEnLabel?: string | null;
}

// ─── Homepage Sections ───────────────────────────────────────────────────────

export interface HeroData {
  title?: string | null;
  subtitle?: string | null;
  ctaText?: string | null;
  backgroundImage?: MediaField | string | null;
  backgroundVideo?: MediaField | string | null;
}

export interface AboutSectionData {
  sectionTitle?: string | null;
  paragraph1?: string | null;
  paragraph2?: string | null;
  buttonText?: string | null;
  backgroundImage?: MediaField | string | null;
}

export interface StatItem {
  num?: number;
  display?: string;
  prefix?: string;
  suffix?: string;
  displayOverride?: string;
  label: string;
}

export interface StatsData {
  items?: StatItem[];
}

export interface AdvantageItem {
  number: string;
  title: string;
  text: string;
}

export interface AdvantagesData {
  sectionTitle?: string | null;
  items?: AdvantageItem[];
}

export interface ClientItem {
  name?: string;
}

export interface ClientsData {
  sectionTitle?: string | null;
  backgroundImage?: MediaField | string | null;
  items?: (string | ClientItem)[];
}

export interface ContactInfoData {
  sectionTitle?: string | null;
  labelAddress?: string | null;
  labelPhone?: string | null;
  labelEmail?: string | null;
  labelSocials?: string | null;
}

export interface ContactFormData {
  title?: string | null;
  description?: string | null;
  featureText?: string | null;
  featureIcon?: MediaField | string | null;
  placeholderName?: string | null;
  placeholderEmail?: string | null;
  placeholderMessage?: string | null;
  consentText?: string | null;
  consentLinkText?: string | null;
  submitText?: string | null;
  sendingText?: string | null;
  sentText?: string | null;
  errorText?: string | null;
}

// ─── Footer ──────────────────────────────────────────────────────────────────

export interface FooterData {
  colMenuTitle?: string | null;
  colPhoneTitle?: string | null;
  colEmailTitle?: string | null;
  colSocialsTitle?: string | null;
  colLegalTitle?: string | null;
  logoAlt?: string | null;
  menuLinks?: NavLink[];
  legalLinks?: NavLink[];
}

// ─── Request Modal ───────────────────────────────────────────────────────────

export interface RequestModalData {
  title?: string | null;
  subtitle?: string | null;
  placeholderName?: string | null;
  placeholderEmail?: string | null;
  placeholderMessage?: string | null;
  consentText?: string | null;
  consentLinkText?: string | null;
  submitText?: string | null;
  closeAriaLabel?: string | null;
}

// ─── Common Texts ────────────────────────────────────────────────────────────

export interface CommonTextsData {
  backText?: string | null;
  homeLabel?: string | null;
  learnMoreText?: string | null;
  showAllText?: string | null;
  closeText?: string | null;
  prevText?: string | null;
  nextText?: string | null;
  phone?: string | null;
}

// ─── Services ────────────────────────────────────────────────────────────────

export interface ServicesSectionData {
  sectionTitle?: string | null;
  description?: string | null;
  learnMoreText?: string | null;
  learnMore?: string | null;
  showAllText?: string | null;
  showAllLabel?: string | null;
  breadcrumbHome?: string | null;
  serviceFeaturesSectionTitle?: string | null;
  serviceStepsSectionTitle?: string | null;
  serviceClientsSectionTitle?: string | null;
}

export interface ServiceCardData {
  id?: string;
  slug: string;
  title?: string | null;
  shortDescription?: string | null;
  cardImage?: MediaField | string | null;
  sortOrder?: number;
}
