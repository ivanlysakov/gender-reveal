"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useState, useTransition } from "react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "uk", name: "Українська", flag: "🇺🇦" },
];

export default function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
    setIsOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === locale);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-lg rounded-full border border-white/30 shadow-lg hover:bg-white/90 transition-all duration-300 group"
        aria-label={t("switcher") || "Language Switcher"}
      >
        <span className="text-xl">{currentLanguage?.flag}</span>
        <span className="font-medium text-gray-700 hidden sm:block">
          {currentLanguage?.name}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 py-2 bg-white/95 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl z-50 min-w-[180px]">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all duration-200 ${
                locale === language.code
                  ? "bg-gradient-to-r from-pink-50 to-purple-50 text-purple-700 font-semibold"
                  : "text-gray-700"
              }`}
            >
              <span className="text-xl">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
              {locale === language.code && (
                <span className="ml-auto text-purple-500">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
