"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  
  return (
    <footer className="relative mt-20">
      <div className="divider-soft" />
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <p className="text-lg text-[var(--accent-sage)]">
            {t("madeWith")}
          </p>
          <p className="text-sm text-[var(--neutral-600)]">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}