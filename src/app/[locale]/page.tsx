"use client";

import CountdownTimer from "@/components/CountdownTimer";
import DuckMascot from "@/components/DuckMascot";
import PhotoGallery from "@/components/PhotoGallery";
import RevealSection from "@/components/RevealSection";
import UnifiedPrediction from "@/components/UnifiedPrediction";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import "@/styles/backgrounds.css";
import "@/styles/liquid-design.css";

export default function Home() {
  const t = useTranslations();
  const [duckClicks, setDuckClicks] = useState(0);
  const [showDuckDance, setShowDuckDance] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

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

  const handleRevealComplete = () => {
    setIsRevealed(true);
    // Scroll to reveal section when reveal happens
    const revealSection = document.getElementById('reveal-section');
    if (revealSection) {
      revealSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] relative overflow-hidden">
      {/* Subtle Background Elements - Always visible */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 -left-20 w-96 h-96 bg-[var(--primary-mint)] opacity-5 blob-shape blur-3xl"></div>
        <div className="absolute top-40 -right-32 w-80 h-80 bg-[var(--soft-blue)] opacity-5 organic-shape blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-[var(--leaf-green)] opacity-5 blob-shape blur-3xl"></div>
      </div>

      {!isRevealed && (
        <>
          {/* Hero Section */}
          <section className="relative py-20 px-4 text-center">
            <div className="max-w-5xl mx-auto relative">
              {/* Main Title with Duck Theme */}
              <div className="mb-12 relative">
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
              <h1 className="section-title mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-xl md:text-2xl font-medium text-[var(--foreground)] opacity-80 mb-8">
                {t("hero.subtitle")}
              </p>
          </div>

          {/* Personal Message */}
          <div className="mb-16 relative max-w-4xl mx-auto">
              <div className="text-[var(--foreground)] text-lg md:text-xl leading-relaxed space-y-6">
                <p className="text-2xl font-bold text-[var(--primary-mint)] mb-6">
                  {t("hero.greeting")}
                </p>
                <p className="text-xl leading-relaxed">{t("hero.message1")}</p>
                <p className="text-xl leading-relaxed">{t("hero.message2")}</p>
                <p className="text-xl leading-relaxed">{t("hero.message3")}</p>
                <div className="pt-6 border-t border-[var(--primary-mint)]/20">
                  <p className="text-xl font-bold text-[var(--primary-mint)]">
                    {t("hero.signature")}
                    <br />
                    {t("hero.names")}
                  </p>
                </div>
              </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-16">
            <button
              onClick={() => document.getElementById('reveal-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="duck-button"
            >
              {t("hero.ctaButton")}
            </button>
          </div>

          {/* Countdown Timer */}
          <div className="mt-16">
            <CountdownTimer />
            </div>
          </div>
        </section>

          {/* Unified Prediction Section */}
          <section className="relative py-20 px-4 border-t border-[var(--primary-mint)]/10">
            <div className="max-w-7xl mx-auto relative">
              <UnifiedPrediction />
            </div>
          </section>

          {/* Photo Gallery */}
          <section className="relative py-20 px-4">
            <div className="max-w-7xl mx-auto relative">
              <div className="text-center mb-16">
                <h2 className="section-title">
                  {t("gallery.sectionTitle")}
                </h2>
                <p className="text-xl text-[var(--foreground)] opacity-80 max-w-2xl mx-auto">
                  {t("gallery.sectionSubtitle")}
                </p>
              </div>
              <PhotoGallery />
            </div>
          </section>
        </>
      )}

      {/* Reveal Section */}
      <section id="reveal-section" className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="section-title">
              {t("reveal.sectionTitle")}
            </h2>
            <p className="text-xl text-[var(--foreground)] opacity-80 max-w-2xl mx-auto">
              {t("reveal.sectionSubtitle")}
            </p>
          </div>
          <RevealSection onRevealComplete={handleRevealComplete} />
        </div>
      </section>

      {!isRevealed && (
        <>
          {/* Footer */}
          <footer className="relative py-12 px-4 mt-20 border-t border-[var(--primary-mint)]/20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <p className="text-[var(--foreground)] text-lg font-medium">{t("footer.madeWith")}</p>
              </div>
              <div className="border-t border-[var(--primary-mint)]/20 pt-6">
                <p className="text-[var(--foreground)] opacity-60 text-sm">{t("footer.copyright")}</p>
              </div>
            </div>
          </footer>
        </>
      )}
    </main>
  );
}
