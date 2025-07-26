import LanguageSwitcher from "@/components/LanguageSwitcher";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Quicksand, Comic_Neue, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const comicNeue = Comic_Neue({
  variable: "--font-comic-neue",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: "Olha & Ivan" }],
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale === "uk" ? "uk_UA" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body
        className={`${quicksand.variable} ${comicNeue.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* Fixed Language Switcher */}
          <div className="fixed top-6 right-6 z-50">
            <LanguageSwitcher />
          </div>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
