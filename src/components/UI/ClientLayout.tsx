"use client";

import { ReactNode } from "react";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { PageTransition } from "./PageTransition";

interface ClientLayoutProps {
  children: ReactNode;
  locale: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  siteSettings: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  footer: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestModal: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  commonTexts: any;
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
