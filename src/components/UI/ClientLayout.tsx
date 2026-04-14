"use client";

import { ReactNode } from "react";
import type { SiteSettingsData, NavigationData, FooterData, RequestModalData, CommonTextsData } from "@/types/cms";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { PageTransition } from "./PageTransition";

interface ClientLayoutProps {
  children: ReactNode;
  locale: string;
  siteSettings: SiteSettingsData | null;
  navigation: NavigationData | null;
  footer: FooterData | null;
  requestModal: RequestModalData | null;
  commonTexts: CommonTextsData | null;
}

export function ClientLayout({
  children,
  locale,
  siteSettings,
  navigation,
  footer,
  requestModal,
  commonTexts,
}: ClientLayoutProps) {
  return (
    <div id="page-root">
      <Header
        navigation={navigation}
        siteSettings={siteSettings}
        requestModal={requestModal}
        commonTexts={commonTexts}
        locale={locale}
      />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer data={footer} siteSettings={siteSettings} locale={locale} />
    </div>
  );
}
