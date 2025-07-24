"use client";

import CountdownTimer from "@/components/CountdownTimer";
import DuckMascot from "@/components/DuckMascot";
import FloatingBubbles from "@/components/FloatingBubbles";
import GuessingGame from "@/components/GuessingGame";
import LiquidButton from "@/components/LiquidButton";
import PhotoGallery from "@/components/PhotoGallery";
import RevealSection from "@/components/RevealSection";
import RubberDuckyPattern from "@/components/RubberDuckyPattern";
import RSVPSection from "@/components/RSVPSection";
import ZodiacPrediction from "@/components/ZodiacPrediction";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import "@/styles/backgrounds.css";
import "@/styles/liquid-design.css";

export default function Home() {
  const t = useTranslations();
  const [duckClicks, setDuckClicks] = useState(0);
  const [showDuckDance, setShowDuckDance] = useState(false);

  useEffect(() => {
    if (duckClicks >= 5) {
      setShowDuckDance(true);
      setTimeout(() => {
        setShowDuckDance(false);
        setDuckClicks(0);
      }, 3000);
    }
  }, [duckClicks]);

  const handleDuckClick = () => {
    setDuckClicks(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F5FFF2] via-[#CFF5C4] to-[#B2E7A3] relative overflow-hidden rubber-ducky-bg">
      {/* Animated Background Elements - Water Ripples */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#A0D6D0]/20 to-[#B2E7A3]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-80 h-80 bg-gradient-to-r from-[#CFF5C4]/20 to-[#FEEA70]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-gradient-to-r from-[#B2E7A3]/20 to-[#A0D6D0]/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Floating Duck Elements */}
        <div className="absolute top-32 right-1/4 opacity-30">
          <DuckMascot variant="floating" size={80} />
        </div>
        <div className="absolute top-80 left-1/4 text-[#FEEA70]/40 text-5xl animate-bounce delay-700">
          🌻
        </div>
        <div className="absolute bottom-40 right-1/3 text-[#A0D6D0]/40 text-4xl animate-bounce delay-1100">
          💧
        </div>
        <div className="absolute top-1/2 left-20 opacity-20">
          <DuckMascot variant="swimming" size={100} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-4 text-center">
        <FloatingBubbles />
        <div className="max-w-5xl mx-auto relative">
          {/* Main Title with Duck Theme */}
          <div className="mb-12 relative">
            <div className="glass-hero will-blur">
              <div className="flex justify-center mb-6">
                <div className="relative liquid-float">
                  <DuckMascot 
                    variant={showDuckDance ? "dancing" : "floating"} 
                    size={150} 
                    onClick={handleDuckClick}
                  />
                  {duckClicks > 0 && duckClicks < 5 && (
                    <div className="absolute -top-4 -right-4 bg-[#FEEA70] text-[#2E4A3B] rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      {duckClicks}
                    </div>
                  )}
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-br from-[#2E4A3B] via-[#5A8650] to-[#7FB069] bg-clip-text text-transparent mb-6 leading-tight text-center">
                {t("hero.title")}
              </h1>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#B2E7A3] rounded-full"></div>
                <p className="text-xl md:text-2xl font-light text-[#2E4A3B] tracking-wide text-center">
                  {t("hero.subtitle")}
                </p>
                <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#B2E7A3] rounded-full"></div>
              </div>
              <div className="flex justify-center gap-2 mb-8">
                <div className="w-3 h-3 bg-[#FEEA70] rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-[#B2E7A3] rounded-full animate-pulse delay-200"></div>
                <div className="w-3 h-3 bg-[#A0D6D0] rounded-full animate-pulse delay-400"></div>
              </div>
            </div>
          </div>

          {/* Enhanced Personal Message */}
          <div className="mb-16 relative group">
            <div className="glass-panel glass-card-hover max-w-4xl mx-auto will-blur">
              <div className="absolute top-6 left-6 text-4xl">🦆</div>
              <div className="absolute top-6 right-6 text-4xl">🌿</div>

              <div className="text-[#2E4A3B] text-lg md:text-xl leading-relaxed space-y-6 pt-4">
                <p className="text-2xl font-semibold text-[#2E4A3B] mb-6">
                  {t("hero.greeting")}
                </p>
                <p className="text-xl leading-relaxed">{t("hero.message1")}</p>
                <p className="text-xl leading-relaxed">{t("hero.message2")}</p>
                <p className="text-xl leading-relaxed">{t("hero.message3")}</p>
                <div className="pt-6 border-t border-[#B2E7A3]/30">
                  <p className="text-xl font-bold bg-gradient-to-r from-[#5A8650] to-[#7FB069] bg-clip-text text-transparent">
                    {t("hero.signature")}
                    <br />
                    {t("hero.names")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-16">
            <LiquidButton
              onClick={() => document.getElementById('reveal-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-xl font-bold px-12 py-5"
            >
              <span className="flex items-center gap-3">
                <span className="text-3xl">🎉</span>
                {t("hero.ctaButton")}
                <span className="text-3xl">✨</span>
              </span>
            </LiquidButton>
          </div>

          {/* Enhanced Countdown Timer */}
          <div className="relative glass-card will-blur">
            <CountdownTimer />
          </div>
        </div>
      </section>

      {/* Zodiac Prediction Section */}
      <section className="relative py-20 px-4 bubble-pattern">
        <div className="absolute inset-0 bg-gradient-to-r from-[#B2E7A3]/30 to-[#A0D6D0]/30 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto relative">
          <ZodiacPrediction />
        </div>
      </section>

      {/* Guessing Game Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-[#CFF5C4]/30 to-[#B2E7A3]/30 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#5A8650] via-[#7FB069] to-[#B2E7A3] bg-clip-text text-transparent mb-4">
              {t("guessing.sectionTitle")}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#B2E7A3] to-[#A0D6D0] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-[#2E4A3B] max-w-2xl mx-auto">
              {t("guessing.sectionSubtitle")}
            </p>
          </div>
          <GuessingGame />
        </div>
      </section>

      {/* RSVP Section */}
      <section className="relative py-20 px-4 water-wave-pattern">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
        <div className="water-splash"></div>
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
        <RubberDuckyPattern density="low" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#B2E7A3]/20 to-[#CFF5C4]/20 backdrop-blur-sm"></div>
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
      <section id="reveal-section" className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FEEA70]/30 to-[#FFCC00]/30 backdrop-blur-sm"></div>
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#FFCC00] via-[#FEEA70] to-[#FFB700] bg-clip-text text-transparent mb-4">
              {t("reveal.sectionTitle")}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#FEEA70] to-[#FFCC00] mx-auto rounded-full mb-6"></div>
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
