import type { Metadata } from "next";
import localFont from "next/font/local";
import { Onest } from "next/font/google";
import { locales } from "@/dictionaries";
import { getPayload } from "@/lib/payload";
import { ClientLayout } from "@/components/UI/ClientLayout";
import "../globals.css";

export const revalidate = 60;

const furore = localFont({
  src: "../../../public/assets/fonts/furore/Furore.otf",
  variable: "--font-furore",
  display: "swap",
});

const proximaNovaRegular = localFont({
  src: "../../../public/assets/fonts/proxima-nova/proximanova_regular.ttf",
  variable: "--font-proxima",
  weight: "400",
  display: "swap",
});

const proximaNovaBold = localFont({
  src: "../../../public/assets/fonts/proxima-nova/proximanova_bold.otf",
  variable: "--font-proxima-bold",
  weight: "700",
  display: "swap",
});

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

const fontVars = `${furore.variable} ${proximaNovaRegular.variable} ${proximaNovaBold.variable} ${onest.variable}`;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  let title =
    locale === "ru"
      ? "Фантом Групп — Охранное предприятие"
      : "Phantom Group — Security Company";
  let description = "";

  try {
    const payload = await getPayload();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (payload as any).findGlobal({
      slug: "site-settings",
      locale,
    });
    if (result?.metaTitle) title = result.metaTitle;
    if (result?.metaDescription) description = result.metaDescription;
  } catch {
    // fallback to defaults
  }

  return { title, description };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const payload = await getPayload();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = payload as any;

  const [siteSettings, navigation, footer, requestModal, commonTexts] =
    await Promise.all([
      p.findGlobal({ slug: "site-settings", locale }).catch(() => null),
      p.findGlobal({ slug: "navigation", locale }).catch(() => null),
      p.findGlobal({ slug: "footer", locale }).catch(() => null),
      p.findGlobal({ slug: "request-modal", locale }).catch(() => null),
      p.findGlobal({ slug: "common-texts", locale }).catch(() => null),
    ]);

  return (
    <html lang={locale} className={fontVars}>
      <body>
        <ClientLayout
          locale={locale}
          siteSettings={siteSettings}
          navigation={navigation}
          footer={footer}
          requestModal={requestModal}
          commonTexts={commonTexts}
        >
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
