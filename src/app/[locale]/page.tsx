"use client";

import CountdownTimer from "@/components/CountdownTimer";
import GuessingGame from "@/components/GuessingGame";
import PhotoGallery from "@/components/PhotoGallery";
import RevealSection from "@/components/RevealSection";
import RSVPSection from "@/components/RSVPSection";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-pink-300/20 to-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-80 h-80 bg-gradient-to-r from-purple-300/20 to-rose-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-300/20 to-indigo-300/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Floating Elements */}
        <div className="absolute top-32 right-1/4 text-pink-300/30 text-6xl animate-bounce delay-300">
          🎈
        </div>
        <div className="absolute top-80 left-1/4 text-blue-300/30 text-5xl animate-bounce delay-700">
          ✨
        </div>
        <div className="absolute bottom-40 right-1/3 text-purple-300/30 text-4xl animate-bounce delay-1100">
          🎀
        </div>
        <div className="absolute top-1/2 left-20 text-rose-300/30 text-7xl animate-bounce delay-1500">
          💕
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-4 text-center">
        <div className="max-w-5xl mx-auto relative">
          {/* Main Title with Enhanced Styling */}
          <div className="mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl blur-3xl opacity-20 scale-110"></div>
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black bg-gradient-to-br from-pink-500 via-purple-600 via-rose-500 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight">
                {t("hero.title")}
              </h1>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-pink-400 rounded-full"></div>
                <p className="text-2xl md:text-3xl font-light text-gray-700 tracking-wide">
                  {t("hero.subtitle")}
                </p>
                <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-blue-400 rounded-full"></div>
              </div>
              <div className="flex justify-center gap-2 mb-8">
                <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-400"></div>
              </div>
            </div>
          </div>

          {/* Enhanced Personal Message */}
          <div className="mb-16 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400/20 via-pink-400/20 to-purple-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-10 md:p-12 shadow-2xl border border-white/30 max-w-4xl mx-auto transform hover:scale-[1.02] transition-all duration-500">
              <div className="absolute top-6 left-6 text-4xl">💌</div>
              <div className="absolute top-6 right-6 text-4xl">✨</div>

              <div className="text-gray-800 text-lg md:text-xl leading-relaxed space-y-6 pt-4">
                <p className="text-2xl font-semibold text-gray-800 mb-6">
                  {t("hero.greeting")}
                </p>
                <p className="text-xl leading-relaxed">{t("hero.message1")}</p>
                <p className="text-xl leading-relaxed">{t("hero.message2")}</p>
                <p className="text-xl leading-relaxed">{t("hero.message3")}</p>
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    {t("hero.signature")}
                    <br />
                    {t("hero.names")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Countdown Timer */}
          <div className="relative">
            <CountdownTimer />
          </div>
        </div>
      </section>

      {/* Guessing Game Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-50/50 to-blue-50/50 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              {t("guessing.sectionTitle")}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-pink-400 to-blue-400 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              {t("guessing.sectionSubtitle")}
            </p>
          </div>
          <GuessingGame />
        </div>
      </section>

      {/* RSVP Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              {t("rsvp.sectionTitle")}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              {t("rsvp.sectionSubtitle")}
            </p>
          </div>
          <RSVPSection />
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-pink-50/50 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
              {t("gallery.sectionTitle")}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-rose-400 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              {t("gallery.sectionSubtitle")}
            </p>
          </div>
          <PhotoGallery />
        </div>
      </section>

      {/* Reveal Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/50 to-orange-50/50 backdrop-blur-sm"></div>
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              {t("reveal.sectionTitle")}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-red-400 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              {t("reveal.sectionSubtitle")}
            </p>
          </div>
          <RevealSection />
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative py-12 px-4 mt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-purple-900/80 to-blue-900/80 backdrop-blur-xl"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="mb-6">
            <div className="flex justify-center gap-4 text-4xl mb-4">
              <span className="animate-pulse">💕</span>
              <span className="animate-pulse delay-300">👶</span>
              <span className="animate-pulse delay-600">✨</span>
            </div>
            <p className="text-white/90 text-lg">{t("footer.madeWith")}</p>
          </div>
          <div className="border-t border-white/20 pt-6">
            <p className="text-white/70 text-sm">{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
