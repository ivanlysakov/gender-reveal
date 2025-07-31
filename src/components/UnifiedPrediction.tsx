"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

type Step =
  | "welcome"
  | "zodiac"
  | "gender"
  | "nameSuggestion"
  | "wishes"
  | "result";

interface PredictionData {
  zodiacSign?: string;
  genderGuess?: "boy" | "girl";
  name?: string;
  suggestedName?: string;
  wishes?: string;
}

export default function UnifiedPrediction() {
  const t = useTranslations();
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [predictionData, setPredictionData] = useState<PredictionData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasAlreadyPredicted, setHasAlreadyPredicted] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Get party data and submit guess mutation
  const party = useQuery(api.party.getParty);
  const submitGuess = useMutation(api.guesses.submitGuess);

  // Check localStorage on component mount
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const existingPrediction = localStorage.getItem("genderRevealPrediction");
      if (existingPrediction) {
        setHasAlreadyPredicted(true);
        const savedData = JSON.parse(existingPrediction);
        setPredictionData(savedData);
      }
    }
  }, []);

  // const submitGuess = useAction(api.guesses.submitGuess);

  const zodiacSigns = [
    {
      value: "sagittarius",
      emoji: "♐",
      image: "/images/zodiac-ducks/zodiac2.jpg",
    },
    {
      value: "capricorn",
      emoji: "♑",
      image: "/images/zodiac-ducks/zodiac1.jpg",
    },
  ];

  const handleZodiacSelect = (sign: string) => {
    setPredictionData({ ...predictionData, zodiacSign: sign });
    setCurrentStep("wishes");
  };

  const handleGenderSelect = (gender: "boy" | "girl") => {
    setPredictionData({ ...predictionData, genderGuess: gender });
    setCurrentStep("nameSuggestion");
  };

  const handleSubmit = async () => {
    if (
      !predictionData.name ||
      !predictionData.genderGuess ||
      isSubmitted ||
      hasAlreadyPredicted ||
      !party?._id
    )
      return;

    setIsSubmitting(true);
    try {
      // Submit to Convex database
      await submitGuess({
        partyId: party._id,
        name: predictionData.name,
        guess: predictionData.genderGuess,
        zodiacSign: predictionData.zodiacSign as "sagittarius" | "capricorn" | undefined,
        suggestedName: predictionData.suggestedName,
        wishes: predictionData.wishes,
      });

      // Save to localStorage to prevent multiple predictions
      localStorage.setItem(
        "genderRevealPrediction",
        JSON.stringify({
          name: predictionData.name,
          genderGuess: predictionData.genderGuess,
          zodiacSign: predictionData.zodiacSign,
          suggestedName: predictionData.suggestedName,
          wishes: predictionData.wishes,
          submittedAt: new Date().toISOString(),
        })
      );

      setIsSubmitted(true);
      setHasAlreadyPredicted(true);
    } catch (error) {
      console.error("Failed to submit guess:", error);
    }
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setCurrentStep("welcome");
    setPredictionData({});
    setIsSubmitted(false);
  };

  const handleBack = () => {
    switch (currentStep) {
      case "gender":
        setCurrentStep("welcome");
        break;
      case "nameSuggestion":
        setCurrentStep("gender");
        break;
      case "zodiac":
        setCurrentStep("nameSuggestion");
        break;
      case "wishes":
        setCurrentStep("zodiac");
        break;
      case "result":
        setCurrentStep("wishes");
        break;
      default:
        break;
    }
  };

  // Show existing prediction if user has already made one
  if (!mounted) {
    return null;
  }

  if (hasAlreadyPredicted && predictionData.name) {
    return (
      <div className="max-w-3xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-7xl mb-4">🎉</div>
          <h3 className="text-3xl sm:text-4xl font-bold text-[#2C5282] mb-4">
            {t("prediction.alreadyPredicted.title")}
          </h3>
          <p className="text-xl text-[#4A9B9B] mb-6">
            {t("prediction.alreadyPredicted.message", {
              name: predictionData.name,
            })}
          </p>

          <div className="bg-gradient-to-br from-[#E6F3FF] to-[#FFF3CD] rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
            <p className="text-lg text-[#2C5282] font-medium">
              {t("prediction.alreadyPredicted.yourPrediction")}
            </p>
            <div
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-white text-xl font-bold ${
                predictionData.genderGuess === "boy"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600"
                  : "bg-gradient-to-r from-pink-500 to-pink-600"
              }`}
            >
              <span>👶</span>
              <span>{t(`guessing.${predictionData.genderGuess}`)}</span>
            </div>

            {predictionData.zodiacSign && (
              <p className="text-base text-[#2C5282]">
                {t(`zodiac.${predictionData.zodiacSign}`)}{" "}
                {
                  zodiacSigns.find((s) => s.value === predictionData.zodiacSign)
                    ?.emoji
                }
              </p>
            )}

            {predictionData.suggestedName && (
              <p className="text-base text-[#4A9B9B]">
                💝 {predictionData.suggestedName}
              </p>
            )}
          </div>

          <p className="text-base text-gray-500">
            {t("prediction.alreadyPredicted.waitForReveal")}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="min-h-[500px] flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          {/* Welcome Step */}
          {currentStep === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-3xl w-full px-4"
            >
              <div className="mb-8">
                <div className="text-7xl mb-6">🔮</div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C5282] mb-6">
                  {t("prediction.welcome.title")}
                </h3>
              </div>

              <div className="mb-8">
                <input
                  type="text"
                  placeholder={t("prediction.welcome.namePlaceholder")}
                  className="w-full max-w-md px-8 py-5 text-xl border-3 border-[#87CEEB] rounded-full focus:border-[#5DADE2] focus:outline-none transition-all text-center font-medium"
                  value={predictionData.name || ""}
                  onChange={(e) =>
                    setPredictionData({
                      ...predictionData,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => predictionData.name && setCurrentStep("gender")}
                disabled={!predictionData.name}
                className="px-10 py-5 bg-gradient-to-r from-[#FFD93D] to-[#F9C74F] text-[#2C5282] text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("prediction.welcome.start")}
              </motion.button>
            </motion.div>
          )}
          {/* Gender Step */}
          {currentStep === "gender" && (
            <motion.div
              key="gender"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-3xl w-full px-4"
            >
              <button
                onClick={handleBack}
                className="absolute top-4 left-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 group"
              >
                <svg
                  className="w-6 h-6 text-[#2C5282] group-hover:text-[#1e3a5f]"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2C5282] mb-8">
                {t("prediction.gender.title")}
              </h3>

              <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleGenderSelect("boy")}
                  className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-100 to-blue-200 p-6 sm:p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 border-3 border-blue-300"
                >
                  <div className="relative z-10">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4">
                      <div className="absolute inset-0 overflow-hidden">
                        <Image
                          src="/images/ducks.png"
                          alt="Boy Duck"
                          width={512}
                          height={256}
                          className="object-cover"
                          style={{ 
                            width: '200%',
                            height: '100%',
                            objectPosition: 'left center',
                            maxWidth: 'none'
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                      {t("guessing.boy")}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-blue-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleGenderSelect("girl")}
                  className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-100 to-pink-200 p-6 sm:p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 border-3 border-pink-300"
                >
                  <div className="relative z-10">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4">
                      <div className="absolute inset-0 overflow-hidden">
                        <Image
                          src="/images/ducks.png"
                          alt="Girl Duck"
                          width={512}
                          height={256}
                          className="object-cover"
                          style={{ 
                            width: '200%',
                            height: '100%',
                            objectPosition: 'right center',
                            maxWidth: 'none'
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-pink-600">
                      {t("guessing.girl")}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-pink-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </motion.button>
              </div>
            </motion.div>
          )}
          {/* Zodiac Step */}
          {currentStep === "zodiac" && (
            <motion.div
              key="zodiac"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-4xl w-full px-4"
            >
              <button
                onClick={handleBack}
                className="absolute top-4 left-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 group"
              >
                <svg
                  className="w-6 h-6 text-[#2C5282] group-hover:text-[#1e3a5f]"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C5282] mb-8">
                {t("prediction.zodiac.title")}
              </h3>

              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8 max-w-xl mx-auto">
                {zodiacSigns.map((sign) => (
                  <motion.div
                    key={sign.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="transition-all duration-200"
                  >
                    <button
                      onClick={() => handleZodiacSelect(sign.value)}
                      className="relative overflow-hidden rounded-2xl border-3 border-[#87CEEB]/30 hover:border-[#87CEEB] group shadow-md hover:shadow-lg aspect-square w-full"
                    >
                      <Image
                        src={sign.image}
                        alt={t(`zodiac.${sign.value}`)}
                        fill
                        className="object-fill"
                      />
                    </button>
                    <p className="text-center mt-2 text-lg font-semibold text-[#2C5282]">
                      {t(`zodiac.${sign.value}`)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Name Suggestion Step */}
          {currentStep === "nameSuggestion" && (
            <motion.div
              key="nameSuggestion"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-3xl w-full px-4"
            >
              <button
                onClick={handleBack}
                className="absolute top-4 left-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 group"
              >
                <svg
                  className="w-6 h-6 text-[#2C5282] group-hover:text-[#1e3a5f]"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C5282] mb-8">
                {t("prediction.nameSuggestion.title")}
              </h3>

              <div className="mb-8">
                <input
                  type="text"
                  placeholder={t("prediction.nameSuggestion.placeholder")}
                  className="w-full max-w-md px-8 py-5 text-xl border-3 border-[#87CEEB] rounded-full focus:border-[#5DADE2] focus:outline-none transition-all text-center font-medium"
                  value={predictionData.suggestedName || ""}
                  onChange={(e) =>
                    setPredictionData({
                      ...predictionData,
                      suggestedName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    predictionData.suggestedName && setCurrentStep("zodiac")
                  }
                  disabled={!predictionData.suggestedName}
                  className="px-10 py-5 bg-gradient-to-r from-[#FFD93D] to-[#F9C74F] text-[#2C5282] text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
                >
                  {t("prediction.nameSuggestion.continue")}
                </motion.button>

                <button
                  onClick={() => setCurrentStep("zodiac")}
                  className="text-[#4A9B9B] text-lg font-medium hover:text-[#2C5282] transition-colors"
                >
                  {t("prediction.nameSuggestion.skip")}
                </button>
              </div>
            </motion.div>
          )}

          {/* Wishes Step */}
          {currentStep === "wishes" && (
            <motion.div
              key="wishes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-3xl w-full px-4"
            >
              <button
                onClick={handleBack}
                className="absolute top-4 left-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 group"
              >
                <svg
                  className="w-6 h-6 text-[#2C5282] group-hover:text-[#1e3a5f]"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C5282] mb-8">
                {t("prediction.wishes.title")}
              </h3>

              <div className="mb-8">
                <textarea
                  placeholder={t("prediction.wishes.placeholder")}
                  className="w-full max-w-lg px-6 py-5 text-lg border-3 border-[#87CEEB] rounded-3xl focus:border-[#5DADE2] focus:outline-none transition-all resize-none"
                  rows={3}
                  value={predictionData.wishes || ""}
                  onChange={(e) =>
                    setPredictionData({
                      ...predictionData,
                      wishes: e.target.value,
                    })
                  }
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentStep("result")}
                className="px-10 py-5 bg-gradient-to-r from-[#FFD93D] to-[#F9C74F] text-[#2C5282] text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t("prediction.wishes.finish")}
              </motion.button>
            </motion.div>
          )}

          {/* Result Step */}
          {currentStep === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center max-w-3xl w-full px-4"
            >
              <button
                onClick={handleBack}
                className="absolute top-4 left-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 group"
              >
                <svg
                  className="w-6 h-6 text-[#2C5282] group-hover:text-[#1e3a5f]"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              {!isSubmitted ? (
                <>
                  <div className="mb-8">
                    <div className="text-7xl mb-6">✨</div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-[#2C5282] mb-6">
                      {t("prediction.result.title", {
                        name: predictionData.name,
                      })}
                    </h3>

                    <div className="bg-gradient-to-br from-[#E6F3FF] to-[#FFF3CD] rounded-3xl p-6 sm:p-8 mb-6 space-y-4 shadow-lg">
                      <div
                        className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-white text-xl font-bold mb-4 ${
                          predictionData.genderGuess === "boy"
                            ? "bg-gradient-to-r from-blue-500 to-blue-600"
                            : "bg-gradient-to-r from-pink-500 to-pink-600"
                        }`}
                      >
                        <span>👶</span>
                        <span>
                          {t(`guessing.${predictionData.genderGuess}`)}
                        </span>
                      </div>

                      {predictionData.zodiacSign && (
                        <p className="text-lg text-[#2C5282] font-medium">
                          {t(`zodiac.${predictionData.zodiacSign}`)}{" "}
                          {
                            zodiacSigns.find(
                              (s) => s.value === predictionData.zodiacSign
                            )?.emoji
                          }
                        </p>
                      )}

                      {predictionData.suggestedName && (
                        <p className="text-lg text-[#4A9B9B]">
                          💝 {predictionData.suggestedName}
                        </p>
                      )}

                      {predictionData.wishes && (
                        <p className="text-base text-[#2C5282] italic opacity-80 mt-4">
                          "{predictionData.wishes}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="px-10 py-5 bg-gradient-to-r from-[#FFD93D] to-[#F9C74F] text-[#2C5282] text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting
                        ? t("prediction.result.submitting")
                        : t("prediction.result.submit")}
                    </motion.button>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="text-7xl mb-4">🎉</div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-[#2C5282]">
                    {t("prediction.result.thanks")}
                  </h3>
                  <p className="text-xl text-[#4A9B9B]">
                    {t("guessing.thankYou")}
                  </p>
                  <div
                    className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-white text-xl font-bold ${
                      predictionData.genderGuess === "boy"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600"
                        : "bg-gradient-to-r from-pink-500 to-pink-600"
                    }`}
                  >
                    <span>👶</span>
                    <span>{t(`guessing.${predictionData.genderGuess}`)}</span>
                  </div>
                  <p className="text-base text-gray-500 mt-6">
                    {t("prediction.alreadyPredicted.waitForReveal")}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {[
          "welcome",
          "gender",
          "nameSuggestion",
          "zodiac",
          "wishes",
          "result",
        ].map((step, index) => (
          <div
            key={step}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentStep === step
                ? "w-8 bg-[#87CEEB]"
                : index <
                    [
                      "welcome",
                      "gender",
                      "nameSuggestion",
                      "zodiac",
                      "wishes",
                      "result",
                    ].indexOf(currentStep)
                  ? "w-2 bg-[#87CEEB]/50"
                  : "w-2 bg-[#87CEEB]/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
