import type { Metadata } from "next";
import localFont from "next/font/local";
import { Onest } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/UI/ClientLayout";

const furore = localFont({
  src: "../../public/assets/fonts/furore/Furore.otf",
  variable: "--font-furore",
  display: "swap",
});

const proximaNovaRegular = localFont({
  src: "../../public/assets/fonts/proxima-nova/proximanova_regular.ttf",
  variable: "--font-proxima",
  weight: "400",
  display: "swap",
});

const proximaNovaBold = localFont({
  src: "../../public/assets/fonts/proxima-nova/proximanova_bold.otf",
  variable: "--font-proxima-bold",
  weight: "700",
  display: "swap",
});

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Фантом Групп — Охранное предприятие",
  description:
    "Комплексные решения безопасности для бизнеса, частной собственности и мероприятий. Работаем круглосуточно и гарантируем оперативное реагирование.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${furore.variable} ${proximaNovaRegular.variable} ${proximaNovaBold.variable} ${onest.variable}`}
    >
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
