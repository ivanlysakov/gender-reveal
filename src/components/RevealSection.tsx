"use client";

import { useMutation, useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
import CountdownTimer from "./CountdownTimer";

interface RevealSectionProps {
  onRevealComplete?: () => void;
}

export default function RevealSection({
  onRevealComplete,
}: RevealSectionProps) {
  const t = useTranslations("reveal");
  const tGuessing = useTranslations("guessing");
  const [showAnimation, setShowAnimation] = useState(false);
  const [showManualReveal, setShowManualReveal] = useState(false);
  const [countdownFinished, setCountdownFinished] = useState(false);

  // Get real-time data from Convex
  const guessStats = useQuery(api.guesses.getGuessStats);
  const partyData = useQuery(api.party.getParty);
  const revealGender = useMutation(api.party.revealGender);
  
  // Override to always show it's a boy (revealed)
  const overridePartyData = {
    isRevealed: true,
    actualGender: "boy" as "boy" | "girl"
  };

  useEffect(() => {
    if (partyData?.isRevealed && onRevealComplete) {
      onRevealComplete();
    }
  }, [partyData?.isRevealed, onRevealComplete]);

  // Check if countdown has finished
  useEffect(() => {
    const checkCountdown = () => {
      const revealDate = new Date("2025-08-09T15:00:00");
      const now = new Date().getTime();
      const distance = revealDate.getTime() - now;
      
      if (distance <= 0 && !partyData?.isRevealed) {
        setCountdownFinished(true);
        setShowManualReveal(true);
      }
    };

    checkCountdown();
    const timer = setInterval(checkCountdown, 1000);
    return () => clearInterval(timer);
  }, [partyData?.isRevealed]);

  const handleReveal = async (gender: "boy" | "girl") => {
    setShowAnimation(true);
    
    // Update the database with the reveal
    await revealGender({ actualGender: gender });
    
    setTimeout(() => {
      setShowAnimation(false);
      if (onRevealComplete) {
        onRevealComplete();
      }
      // Ensure the reveal content is visible
      setTimeout(() => {
        const revealSection = document.getElementById("reveal-section");
        if (revealSection) {
          revealSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }, 3000);
  };

  if (showAnimation) {
    return (
      <div className="text-center py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-pink-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-60 h-60 bg-gradient-to-r from-purple-300/30 to-rose-300/30 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-gradient-to-r from-blue-300/30 to-indigo-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-blue-400/20 rounded-3xl blur-3xl animate-pulse"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/40">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-8 sm:mb-12">
                {t("bigRevealTitle")}
              </h2>

              {/* Animated reveal effects */}
              <div className="space-y-8">
                <div className="text-6xl sm:text-7xl lg:text-9xl animate-bounce mb-6 sm:mb-8">
                  🎉
                </div>
                <div className="flex justify-center gap-4 sm:gap-6 lg:gap-8 text-5xl sm:text-6xl lg:text-8xl">
                  <span className="animate-bounce">✨</span>
                  <span className="animate-bounce delay-300">🎊</span>
                  <span className="animate-bounce delay-600">💫</span>
                </div>
                <div className="text-5xl sm:text-6xl lg:text-8xl animate-pulse mt-6 sm:mt-8">
                  🥁
                </div>
              </div>

              <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 mt-8 sm:mt-12 font-medium">
                {t("drumRoll")}
              </p>

              {/* Loading animation */}
              <div className="flex justify-center items-center gap-2 mt-8">
                <div className="w-4 h-4 bg-pink-400 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Use override data to show it's a boy
  if (overridePartyData.isRevealed && overridePartyData.actualGender) {
    const actualGender = overridePartyData.actualGender;
    return (
      <div className="text-center py-8 sm:py-16 lg:py-24 relative overflow-hidden">
        {/* Animated background celebration */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className={`absolute top-10 left-10 w-32 sm:w-48 lg:w-72 h-32 sm:h-48 lg:h-72 ${
              actualGender === "boy"
                ? "bg-gradient-to-r from-blue-300/20 to-cyan-300/20"
                : "bg-gradient-to-r from-pink-300/20 to-rose-300/20"
            } rounded-full blur-2xl sm:blur-3xl animate-pulse`}
          ></div>
          <div
            className={`absolute top-40 sm:top-60 right-5 sm:right-10 w-40 sm:w-60 lg:w-80 h-40 sm:h-60 lg:h-80 ${
              actualGender === "boy"
                ? "bg-gradient-to-r from-cyan-300/20 to-blue-300/20"
                : "bg-gradient-to-r from-rose-300/20 to-pink-300/20"
            } rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000`}
          ></div>
          <div
            className={`absolute bottom-10 sm:bottom-20 left-1/3 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 ${
              actualGender === "boy"
                ? "bg-gradient-to-r from-blue-300/20 to-indigo-300/20"
                : "bg-gradient-to-r from-pink-300/20 to-purple-300/20"
            } rounded-full blur-2xl sm:blur-3xl animate-pulse delay-2000`}
          ></div>

          {/* Floating celebration elements */}
          <div className="absolute top-32 right-1/4 text-pink-300/40 text-6xl animate-bounce delay-300">
            🎈
          </div>
          <div className="absolute top-80 left-1/4 text-blue-300/40 text-5xl animate-bounce delay-700">
            🎊
          </div>
          <div className="absolute bottom-40 right-1/3 text-purple-300/40 text-4xl animate-bounce delay-1100">
            ✨
          </div>
          <div className="absolute top-1/2 left-20 text-rose-300/40 text-7xl animate-bounce delay-1500">
            💕
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Celebration Header */}
          <div className="mb-16">
            <div className="relative group max-w-4xl mx-auto">
              <div
                className={`absolute inset-0 ${
                  actualGender === "boy"
                    ? "bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-indigo-400/20"
                    : "bg-gradient-to-r from-pink-400/20 via-rose-400/20 to-purple-400/20"
                } rounded-3xl blur-3xl group-hover:blur-[4rem] transition-all duration-700`}
              ></div>

              <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/40">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4 sm:mb-6 lg:mb-8">
                  {t("itsOfficial")}
                </h2>
                <div className="flex justify-center gap-3 sm:gap-4 text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6 lg:mb-8">
                  <span className="animate-bounce">🎉</span>
                  <span className="animate-bounce delay-200">🥳</span>
                  <span className="animate-bounce delay-400">🎊</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Gender Reveal */}
          <div className="mb-8 sm:mb-12 lg:mb-16 px-4">
            <div className="relative group max-w-5xl mx-auto">
              <div
                className={`absolute inset-0 ${
                  actualGender === "boy"
                    ? "bg-gradient-to-r from-blue-400/30 via-cyan-400/30 to-indigo-400/30"
                    : "bg-gradient-to-r from-pink-400/30 via-rose-400/30 to-purple-400/30"
                } rounded-3xl blur-3xl group-hover:blur-[5rem] transition-all duration-700 scale-110`}
              ></div>

              <div
                className={`relative ${
                  actualGender === "boy"
                    ? "bg-gradient-to-br from-blue-100 via-cyan-50 to-indigo-100"
                    : "bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100"
                } backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl border border-white/50 transform hover:scale-[1.02] transition-all duration-500`}
              >
                <div className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl mb-4 sm:mb-6 lg:mb-8 animate-bounce">
                  {actualGender === "boy" ? "👶" : "👧"}
                </div>

                <h3
                  className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 lg:mb-8 ${
                    actualGender === "boy" ? "text-blue-600" : "text-pink-600"
                  }`}
                >
                  {actualGender === "boy" ? t("itsABoy") : t("itsAGirl")}
                </h3>

                <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 lg:mb-8 animate-pulse">
                  {actualGender === "boy" ? "💙" : "💖"}
                </div>

                <div className="max-w-4xl mx-auto">
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 leading-relaxed mb-4 sm:mb-6 lg:mb-8">
                    {actualGender === "boy"
                      ? t("revealMessageBoy")
                      : t("revealMessageGirl")}
                  </p>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed">
                    {t("thankYouMessage")}
                  </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full animate-ping"></div>
                <div className="absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full animate-ping delay-500"></div>
                <div className="absolute -bottom-4 -left-4 w-7 h-7 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full animate-ping delay-1000"></div>
                <div className="absolute -bottom-4 -right-4 w-5 h-5 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full animate-ping delay-1500"></div>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Reveal */}
          <div className="mb-8 sm:mb-12 lg:mb-16 px-4">
            <div className="relative group max-w-5xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-white/40">
                <div className="text-center mb-10">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                    {t("howDidEveryoneDo")}
                  </h3>
                  <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">
                    🏆
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  <div
                    className={`relative overflow-hidden rounded-2xl p-8 transform hover:scale-105 transition-all duration-500 ${
                      actualGender === "boy"
                        ? "bg-gradient-to-br from-blue-100 to-cyan-100 border-2 sm:border-3 lg:border-4 border-blue-300 shadow-xl lg:shadow-2xl"
                        : "bg-gradient-to-br from-gray-100 to-slate-100 border-2 border-gray-200"
                    }`}
                  >
                    <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">
                      👶
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-blue-600 mb-3 sm:mb-4">
                      {t("teamBoy")}
                    </div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-600 mb-2">
                      {guessStats?.boy.count || 0}
                    </div>
                    <div className="text-base sm:text-lg text-blue-500 mb-1">
                      {t("predictions")}
                    </div>
                    <div className="text-sm text-blue-400">
                      ({guessStats?.boy.percentage.toFixed(0) || 0}%)
                    </div>
                    {actualGender === "boy" && (
                      <div className="text-blue-600 font-bold text-xl animate-bounce">
                        🎉 {t("winners")} 🎉
                      </div>
                    )}
                    {actualGender === "boy" && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-spin"></div>
                    )}
                  </div>

                  <div
                    className={`relative overflow-hidden rounded-2xl p-8 transform hover:scale-105 transition-all duration-500 ${
                      actualGender === "girl"
                        ? "bg-gradient-to-br from-pink-100 to-rose-100 border-4 border-pink-300 shadow-2xl"
                        : "bg-gradient-to-br from-gray-100 to-slate-100 border-2 border-gray-200"
                    }`}
                  >
                    <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">
                      👧
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-pink-600 mb-3 sm:mb-4">
                      {t("teamGirl")}
                    </div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-pink-600 mb-2">
                      {guessStats?.girl.count || 0}
                    </div>
                    <div className="text-base sm:text-lg text-pink-500 mb-1">
                      {t("predictions")}
                    </div>
                    <div className="text-sm text-pink-400">
                      ({guessStats?.girl.percentage.toFixed(0) || 0}%)
                    </div>
                    {actualGender === "girl" && (
                      <div className="text-pink-600 font-bold text-xl animate-bounce">
                        🎉 {t("winners")} 🎉
                      </div>
                    )}
                    {actualGender === "girl" && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-spin"></div>
                    )}
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-gray-200 text-center">
                  <div className="flex justify-center gap-3 text-3xl mb-4">
                    <span className="animate-bounce">🎊</span>
                    <span className="animate-bounce delay-200">🏆</span>
                    <span className="animate-bounce delay-400">🥳</span>
                  </div>
                  <p className="text-xl text-gray-700 font-medium mb-2">
                    {t("congratsToWinners")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {tGuessing("totalVotes")}: {guessStats?.total || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Thank You Message */}
          <div className="relative group max-w-5xl mx-auto px-4">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400/20 via-pink-400/20 to-purple-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/40">
              <div className="text-center mb-8">
                <h3 className="text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
                  {t("thankYou")}
                </h3>
                <div className="flex justify-center gap-3 sm:gap-4 text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6 lg:mb-8">
                  <span className="animate-pulse">💕</span>
                  <span className="animate-pulse delay-300">🤗</span>
                  <span className="animate-pulse delay-600">✨</span>
                </div>
              </div>

              <div className="max-w-4xl mx-auto text-center">
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
                  {t("thankYouAll")}
                </p>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
                  {t("canShareJoyWith", {
                    gender:
                      actualGender === "boy"
                        ? tGuessing("boy").toLowerCase()
                        : tGuessing("girl").toLowerCase(),
                    pronoun:
                      actualGender === "boy" ? t("heArrives") : t("sheArrives"),
                  })}
                </p>

                <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 mb-8 border border-gray-200">
                  <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    {t("withAllOurLove")}
                    <br />
                    {t("olhaAndIvan")}
                  </p>
                </div>

                <div className="flex justify-center gap-6 text-5xl">
                  <span className="animate-bounce">👶</span>
                  <span className="animate-bounce delay-200">💝</span>
                  <span className="animate-bounce delay-400">🌟</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // This section should not be shown since we're always showing the reveal
  return null;
}
