"use client";

import DuckMascot from "@/components/DuckMascot";
import Footer from "@/components/Footer";
import GiftSection from "@/components/GiftSection";
import PartyConfetti from "@/components/PartyConfetti";
import RevealSection from "@/components/RevealSection";
import SimpleGallery from "@/components/SimpleGallery";
import UnifiedPrediction from "@/components/UnifiedPrediction";
import "@/styles/backgrounds.css";
import "@/styles/liquid-design.css";
import "@/styles/prediction-premium.css";
import "@/styles/premium.css";
import "@/styles/water-theme.css";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SoapBubbles = dynamic(() => import("@/components/SoapBubbles"), {
  ssr: false,
});

interface Bubble {
  id: string;
  left: number;
  top: number;
  size: number;
  animationDelay: number;
  animationDuration: number;
}

export default function Home() {
  const t = useTranslations();
  const [duckClicks, setDuckClicks] = useState(0);
  const [showDuckDance, setShowDuckDance] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [floatingBubbles, setFloatingBubbles] = useState<Bubble[]>([]);
  const [largeBubbles, setLargeBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    setMounted(true);
    // Prevent scroll restoration on page refresh
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Generate bubbles with random positions
    const floatingBubblesData = Array.from({ length: 15 }, (_, i) => ({
      id: `float-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 40 + 10,
      animationDelay: Math.random() * 6,
      animationDuration: Math.random() * 4 + 6,
    }));
    setFloatingBubbles(floatingBubblesData);

    const largeBubblesData = Array.from({ length: 8 }, (_, i) => ({
      id: `large-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 80 + 60,
      animationDelay: Math.random() * 8,
      animationDuration: Math.random() * 6 + 8,
    }));
    setLargeBubbles(largeBubblesData);
  }, []);

  useEffect(() => {
    if (duckClicks >= 5) {
      setShowDuckDance(true);
      setTimeout(() => {
        setShowDuckDance(false);
        setDuckClicks(0);
      }, 3000);
    }
  }, [duckClicks]);

  useEffect(() => {
    if (mounted) {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [mounted]);

  const handleDuckClick = () => {
    setDuckClicks((prev) => prev + 1);
  };

  const handleRevealComplete = () => {
    setIsRevealed(true);
    const revealSection = document.getElementById("reveal-section");
    if (revealSection) {
      revealSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Enhanced Water-themed Background */}
      <div className="fixed inset-0 -z-10">
        {/* Main gradient matching poster */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E0F5F5] via-[#B8E6E6] to-[#7BC4C4] opacity-95" />

        {/* Water wave effects */}
        <div className="absolute bottom-0 w-full h-32 opacity-60">
          <svg viewBox="0 0 1200 120" className="w-full h-full">
            <path
              d="M0,60 C150,100 350,0 600,60 C850,100 1050,0 1200,60 L1200,120 L0,120 Z"
              fill="rgba(123, 196, 196, 0.5)"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 w-full h-24 opacity-40">
          <svg viewBox="0 0 1200 120" className="w-full h-full">
            <path
              d="M0,80 C200,40 400,120 600,80 C800,40 1000,120 1200,80 L1200,120 L0,120 Z"
              fill="rgba(102, 179, 179, 0.6)"
            />
          </svg>
        </div>

        {/* Floating bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {mounted &&
            floatingBubbles.map((bubble) => (
              <div
                key={bubble.id}
                className="absolute rounded-full bg-white opacity-15 animate-float-bubble"
                style={{
                  left: `${bubble.left}%`,
                  top: `${bubble.top}%`,
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                  animationDelay: `${bubble.animationDelay}s`,
                  animationDuration: `${bubble.animationDuration}s`,
                }}
              />
            ))}
        </div>

        {/* Large decorative bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {mounted &&
            largeBubbles.map((bubble) => (
              <div
                key={bubble.id}
                className="absolute rounded-full bg-gradient-to-br from-teal-100/20 to-teal-50/5 backdrop-blur-sm animate-float-large"
                style={{
                  left: `${bubble.left}%`,
                  top: `${bubble.top}%`,
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                  animationDelay: `${bubble.animationDelay}s`,
                  animationDuration: `${bubble.animationDuration}s`,
                }}
              />
            ))}
        </div>
      </div>

      {/* Beautiful Soap Bubbles */}
      <SoapBubbles />

      {/* Party Confetti */}
      <PartyConfetti active={showDuckDance || isRevealed} />

      {!isRevealed && (
        <>
          {/* Hero Section with Enhanced Water Theme */}
          <section className="hero-premium min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="hero-content max-w-6xl mx-auto w-full">
              <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 lg:space-y-12 text-center min-h-[80vh] lg:min-h-[70vh]">
                {/* Animated Duck Mascot */}
                <div className="flex justify-center relative">
                  <div
                    className="relative"
                    style={{
                      transform: mounted
                        ? `translateY(${scrollY * 0.1}px)`
                        : "none",
                    }}
                  >
                    <DuckMascot
                      variant={showDuckDance ? "dancing" : "floating"}
                      size={180}
                      onClick={handleDuckClick}
                      showPartyHat={false}
                      className="cursor-pointer transform hover:scale-110 transition-transform waddle-animation responsive-duck"
                    />
                    {duckClicks > 0 && duckClicks < 5 && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-[var(--accent-yellow)] to-[var(--accent-yellow-light)] rounded-full flex items-center justify-center font-bold text-[var(--foreground)] shadow-lg animate-bounce text-sm sm:text-base">
                        {duckClicks}
                      </div>
                    )}
                  </div>
                </div>

                {/* Premium Title with enhanced styling */}
                <div className="text-center space-y-4 sm:space-y-6">
                  <h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#4A5568] mb-2 sm:mb-4 leading-tight"
                    style={{
                      textShadow: "0 2px 20px rgba(74, 85, 104, 0.3)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {t("hero.title")}
                  </h1>

                  <p className="text-lg sm:text-xl md:text-2xl text-[#4A9B9B] font-semibold max-w-4xl mx-auto px-4">
                    {t("hero.subtitle")}
                  </p>
                </div>

                {/* Enhanced Personal Message Card */}
                <div className="max-w-4xl mx-auto px-4 w-full">
                  <div
                    className="bg-white/80 backdrop-blur-md border border-white/30 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:transform hover:scale-[1.02]"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(224,245,245,0.9) 100%)",
                      boxShadow:
                        "0 20px 60px rgba(74, 85, 104, 0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
                    }}
                  >
                    <div className="space-y-4 sm:space-y-6">
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--primary-orange)] text-center">
                        {t("hero.greeting")}
                      </p>
                      <div className="space-y-3 sm:space-y-4 text-base sm:text-lg lg:text-xl leading-relaxed text-[var(--neutral-700)]">
                        <p className="text-center">{t("hero.message1")}</p>
                        <p className="text-center">{t("hero.message2")}</p>
                        <p className="text-center">{t("hero.message3")}</p>
                      </div>
                      <div className="divider-soft" />
                      <p className="text-center text-lg sm:text-xl">
                        <span className="font-semibold text-[var(--primary-orange)]">
                          {t("hero.loveSender")}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Scroll Indicator */}
                <div className="flex justify-center">
                  <div className="animate-bounce">
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 text-[#4A5568] drop-shadow-lg"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Prediction Section */}
          <section className="py-12 sm:py-16 lg:py-20 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D7D7D] mb-3 sm:mb-4 leading-tight">
                  {t("prediction.sectionTitle")}
                </h2>
                <p className="text-lg sm:text-xl text-[#4A9B9B] max-w-3xl mx-auto">
                  {t("prediction.sectionSubtitle")}
                </p>
              </div>
              <div
                className="bg-white/75 backdrop-blur-md rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/40"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(224,245,245,0.7) 100%)",
                }}
              >
                <UnifiedPrediction />
              </div>
            </div>
          </section>

          {/* Simplified Photo Carousel - Our Journey */}
          <section className="py-12 sm:py-16 lg:py-20 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D7D7D] mb-3 sm:mb-4 leading-tight">
                  {t("gallery.sectionTitle")}
                </h2>
                <p className="text-lg sm:text-xl text-[#4A9B9B] max-w-3xl mx-auto">
                  {t("gallery.sectionSubtitle")}
                </p>
              </div>
              <SimpleGallery />
            </div>
          </section>
        </>
      )}

      {/* Combined Countdown & Reveal Section - Always visible */}
      <section className="py-12 sm:py-16 lg:py-20 relative" id="reveal-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection onRevealComplete={handleRevealComplete} />
        </div>
      </section>

      {/* Gift Section */}
      <GiftSection />

      {/* Footer */}
      <Footer />

      <style jsx>{`
        @keyframes float-bubble {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-100px) translateX(20px) scale(1.1);
            opacity: 0.3;
          }
        }

        @keyframes float-large {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
            opacity: 0.05;
          }
          50% {
            transform: translateY(-50px) translateX(-30px) scale(1.2)
              rotate(180deg);
            opacity: 0.15;
          }
        }

        .animate-float-bubble {
          animation: float-bubble infinite ease-in-out;
        }

        .animate-float-large {
          animation: float-large infinite ease-in-out;
        }

        /* Enhanced hero section alignment */
        .hero-premium {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Responsive duck scaling with proper centering */
        .responsive-duck {
          transform-origin: center;
          display: block;
          margin: 0 auto;
        }

        @media (max-width: 640px) {
          .responsive-duck {
            transform: scale(0.75);
          }

          .hero-premium {
            min-height: 100svh;
            padding-top: 1rem;
            padding-bottom: 1rem;
          }

          /* Reduce bubble count on mobile for performance */
          .animate-float-bubble:nth-child(n + 8),
          .animate-float-large:nth-child(n + 5) {
            display: none;
          }

          /* Better mobile spacing */
          .space-y-6 > * + * {
            margin-top: 1.5rem !important;
          }

          .space-y-8 > * + * {
            margin-top: 2rem !important;
          }
        }

        @media (max-width: 480px) {
          .responsive-duck {
            transform: scale(0.65);
          }

          h1 {
            font-size: 2.25rem !important;
            line-height: 1.1 !important;
            margin-bottom: 1rem !important;
          }

          /* Enhanced card responsiveness */
          .bg-white\\/80 {
            padding: 1.25rem !important;
            margin: 0 !important;
            border-radius: 1.5rem !important;
          }

          /* Better mobile text alignment */
          .text-center {
            text-align: center !important;
          }

          /* Compact spacing on very small screens */
          .space-y-6 > * + * {
            margin-top: 1.25rem !important;
          }
        }

        /* Improved flex container behavior */
        @media (min-height: 700px) {
          .min-h-\\[80vh\\] {
            min-height: 75vh;
          }
        }

        @media (min-height: 900px) {
          .min-h-\\[80vh\\] {
            min-height: 70vh;
          }
        }

        /* Enhanced water effects on larger screens */
        @media (min-width: 1024px) {
          .animate-float-bubble {
            animation-duration: 8s;
          }

          .animate-float-large {
            animation-duration: 12s;
          }
        }

        /* Improved hover effects */
        @media (hover: hover) {
          .hover\\:shadow-3xl:hover {
            box-shadow:
              0 35px 80px rgba(44, 82, 130, 0.25),
              inset 0 1px 0 rgba(255, 255, 255, 0.9);
          }

          .hover\\:scale-\\[1\\.02\\]:hover {
            transform: scale(1.02) translateY(-4px);
          }
        }

        /* Better focus visibility */
        .cursor-pointer:focus-visible {
          outline: 3px solid rgba(255, 221, 61, 0.7);
          outline-offset: 4px;
        }

        /* Optimized animations for reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-float-bubble,
          .animate-float-large,
          .animate-bounce,
          .waddle-animation {
            animation: none;
          }

          .transition-all,
          .transition-transform {
            transition: none;
          }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Soft divider */
        .divider-soft {
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(123, 196, 196, 0.3),
            transparent
          );
          width: 100%;
          max-width: 300px;
          margin: 0 auto;
        }
      `}</style>
    </main>
  );
}
