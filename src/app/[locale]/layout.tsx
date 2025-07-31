import LanguageSwitcher from "@/components/LanguageSwitcher";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Nunito, Comic_Neue, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
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
    <html lang={locale} className="light">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className={`${nunito.variable} ${comicNeue.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {/* Fixed Language Switcher */}
            <div className="fixed top-6 right-6 z-50">
              <LanguageSwitcher />
            </div>
            {children}
          </NextIntlClientProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
