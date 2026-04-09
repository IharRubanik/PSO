"use client";

import { ReactNode } from "react";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { PageTransition } from "./PageTransition";

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div id="page-root">
      <Header />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
