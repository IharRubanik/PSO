import type { Metadata } from "next";
import type { ContactFormData } from "@/types/cms";

/** Extract a string field from a Record<string, unknown> */
const s = (obj: Record<string, unknown>, key: string) =>
  obj?.[key] as string | undefined;

/** Resolve a Payload media field (object with url or plain string) to a URL */
export function resolveMediaUrl(
  field: { url?: string | null } | string | null | undefined,
  fallback: string,
): string {
  if (!field) return fallback;
  if (typeof field === "string") return field;
  return field.url || fallback;
}

/** Extract SEO metadata from a Payload global that has a `seo` group */
export function extractSeoMetadata(
  global: Record<string, unknown> | null,
  fallbackTitle: string,
): Metadata {
  const seo = global?.seo as { metaTitle?: string; metaDescription?: string } | undefined;
  return {
    title: seo?.metaTitle || fallbackTitle,
    description: seo?.metaDescription || "",
  };
}

/** Extract contactFormData from the homepage global (avoids duplication across 4 pages) */
export function extractContactFormData(
  homepage: Record<string, unknown> | null,
): ContactFormData {
  if (!homepage) return {};
  return {
    title: s(homepage, "contactFormTitle"),
    description: s(homepage, "contactFormDescription"),
    featureText: s(homepage, "contactFormFeatureText"),
    featureIcon: homepage.contactFormFeatureIcon as ContactFormData["featureIcon"],
    placeholderName: s(homepage, "contactFormPlaceholderName"),
    placeholderEmail: s(homepage, "contactFormPlaceholderEmail"),
    placeholderMessage: s(homepage, "contactFormPlaceholderMessage"),
    consentText: s(homepage, "contactFormConsentText"),
    consentLinkText: s(homepage, "contactFormConsentLinkText"),
    submitText: s(homepage, "contactFormSubmitText"),
    sendingText: s(homepage, "contactFormSendingText"),
    sentText: s(homepage, "contactFormSentText"),
    errorText: s(homepage, "contactFormErrorText"),
  };
}
