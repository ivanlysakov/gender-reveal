"use client";

import { useTranslations } from "next-intl";

export default function GiftSection() {
  const t = useTranslations("reveal");

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 via-purple-400/10 to-blue-400/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl border border-white/40">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  {t("giftSectionTitle")}
                </h2>
                <div className="flex justify-center gap-2 text-3xl mb-6">
                  <span className="animate-bounce">🎁</span>
                  <span className="animate-bounce delay-200">💝</span>
                  <span className="animate-bounce delay-400">🍼</span>
                </div>
              </div>
              
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                {t("giftMessage")}
              </p>
              
              <div className="flex justify-center">
                <a
                  href="https://rewish.io/YhwCAA/wishes?access_code=y84icHOlj_3ajP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-base sm:text-lg lg:text-xl"
                >
                  <span className="text-xl sm:text-2xl lg:text-3xl">🎁</span>
                  <span>{t("giftButton")}</span>
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm sm:text-base text-gray-600">
                  {t("giftThankYou")}
                </p>
                <div className="flex justify-center gap-2 mt-4 text-2xl">
                  <span className="animate-pulse">💕</span>
                  <span className="animate-pulse delay-300">🌟</span>
                  <span className="animate-pulse delay-600">✨</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}