"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
// Convex imports will be added once the backend is set up
// import { useAction } from "convex/react";
// import { api } from "../../../convex/_generated/api";

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

  // const submitGuess = useAction(api.guesses.submitGuess);

  const zodiacSigns = [
    { value: "aries", emoji: "♈" },
    { value: "taurus", emoji: "♉" },
    { value: "gemini", emoji: "♊" },
    { value: "cancer", emoji: "♋" },
    { value: "leo", emoji: "♌" },
    { value: "virgo", emoji: "♍" },
    { value: "libra", emoji: "♎" },
    { value: "scorpio", emoji: "♏" },
    { value: "sagittarius", emoji: "♐" },
    { value: "capricorn", emoji: "♑" },
    { value: "aquarius", emoji: "♒" },
    { value: "pisces", emoji: "♓" },
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
    if (!predictionData.name || !predictionData.genderGuess) return;

    setIsSubmitting(true);
    try {
      // Mock submission for now - will integrate with Convex later
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // TODO: Uncomment when Convex is set up
      // await submitGuess({
      //   name: predictionData.name,
      //   guess: predictionData.genderGuess,
      // });

      // Reset after submission
      setTimeout(() => {
        setCurrentStep("welcome");
        setPredictionData({});
      }, 3000);
    } catch (error) {
      console.error("Failed to submit guess:", error);
    }
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setCurrentStep("welcome");
    setPredictionData({});
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="section-title mb-4">{t("prediction.title")}</h2>
        <p className="text-lg text-[var(--foreground)] opacity-70">
          {t("prediction.subtitle")}
        </p>
      </div>

      <div className="min-h-[400px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {/* Welcome Step */}
          {currentStep === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-2xl w-full"
            >
              <div className="mb-8">
                <div className="text-6xl mb-4">🔮</div>
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                  {t("prediction.welcome.title")}
                </h3>
                <p className="text-lg text-[var(--foreground)] opacity-70 mb-8">
                  {t("prediction.welcome.description")}
                </p>
              </div>

              <div className="mb-8">
                <input
                  type="text"
                  placeholder={t("prediction.welcome.namePlaceholder")}
                  className="w-full max-w-md px-6 py-4 text-lg border-2 border-[var(--primary-mint)]/30 rounded-full focus:border-[var(--primary-mint)] focus:outline-none transition-colors"
                  value={predictionData.name || ""}
                  onChange={(e) =>
                    setPredictionData({
                      ...predictionData,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <button
                onClick={() => predictionData.name && setCurrentStep("gender")}
                disabled={!predictionData.name}
                className="duck-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("prediction.welcome.start")}
              </button>
            </motion.div>
          )}
          {/* Gender Step */}
          {currentStep === "gender" && (
            <motion.div
              key="gender"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-2xl w-full"
            >
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                {t("prediction.gender.title")}
              </h3>
              <p className="text-lg text-[var(--foreground)] opacity-70 mb-8">
                {t("prediction.gender.description")}
              </p>

              <div className="flex justify-center gap-8 mb-8">
                <button
                  onClick={() => handleGenderSelect("boy")}
                  className="group"
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors duration-200 flex items-center justify-center">
                    <span className="text-5xl md:text-6xl">👶</span>
                  </div>
                  <p className="mt-4 text-lg font-semibold text-blue-600">
                    {t("guessing.boy")}
                  </p>
                </button>

                <button
                  onClick={() => handleGenderSelect("girl")}
                  className="group"
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-pink-100 hover:bg-pink-200 transition-colors duration-200 flex items-center justify-center">
                    <span className="text-5xl md:text-6xl">👶</span>
                  </div>
                  <p className="mt-4 text-lg font-semibold text-pink-600">
                    {t("guessing.girl")}
                  </p>
                </button>
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
              className="text-center max-w-3xl w-full"
            >
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                {t("prediction.zodiac.title")}
              </h3>
              <p className="text-lg text-[var(--foreground)] opacity-70 mb-8">
                {t("prediction.zodiac.description")}
              </p>

              <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                {zodiacSigns.map((sign) => (
                  <button
                    key={sign.value}
                    onClick={() => handleZodiacSelect(sign.value)}
                    className="p-6 rounded-2xl border-2 border-[var(--primary-mint)]/20 hover:border-[var(--primary-mint)] hover:bg-[var(--primary-mint)]/10 transition-all duration-200 group"
                  >
                    <div className="text-4xl mb-2">{sign.emoji}</div>
                    <div className="text-sm font-medium text-[var(--foreground)] opacity-70 group-hover:opacity-100">
                      {t(`zodiac.${sign.value}`)}
                    </div>
                  </button>
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
              className="text-center max-w-2xl w-full"
            >
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                {t("prediction.nameSuggestion.title")}
              </h3>
              <p className="text-lg text-[var(--foreground)] opacity-70 mb-8">
                {t("prediction.nameSuggestion.description", {
                  gender: t(`guessing.${predictionData.genderGuess}`),
                })}
              </p>

              <div className="mb-8">
                <input
                  type="text"
                  placeholder={t("prediction.nameSuggestion.placeholder")}
                  className="w-full max-w-md px-6 py-4 text-lg border-2 border-[var(--primary-mint)]/30 rounded-full focus:border-[var(--primary-mint)] focus:outline-none transition-colors text-center"
                  value={predictionData.suggestedName || ""}
                  onChange={(e) =>
                    setPredictionData({
                      ...predictionData,
                      suggestedName: e.target.value,
                    })
                  }
                />
              </div>

              <button
                onClick={() =>
                  predictionData.suggestedName && setCurrentStep("zodiac")
                }
                disabled={!predictionData.suggestedName}
                className="duck-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("prediction.nameSuggestion.continue")}
              </button>

              <button
                onClick={() => setCurrentStep("wishes")}
                className="block mx-auto mt-4 text-[var(--foreground)] opacity-60 hover:opacity-100 transition-opacity"
              >
                {t("prediction.nameSuggestion.skip")}
              </button>
            </motion.div>
          )}

          {/* Wishes Step */}
          {currentStep === "wishes" && (
            <motion.div
              key="wishes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-2xl w-full"
            >
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                {t("prediction.wishes.title")}
              </h3>
              <p className="text-lg text-[var(--foreground)] opacity-70 mb-8">
                {t("prediction.wishes.description")}
              </p>

              <div className="mb-8">
                <textarea
                  placeholder={t("prediction.wishes.placeholder")}
                  className="w-full max-w-lg px-6 py-4 text-lg border-2 border-[var(--primary-mint)]/30 rounded-2xl focus:border-[var(--primary-mint)] focus:outline-none transition-colors resize-none"
                  rows={4}
                  value={predictionData.wishes || ""}
                  onChange={(e) =>
                    setPredictionData({
                      ...predictionData,
                      wishes: e.target.value,
                    })
                  }
                />
              </div>

              <button
                onClick={() => setCurrentStep("result")}
                className="duck-button"
              >
                {t("prediction.wishes.finish")}
              </button>
            </motion.div>
          )}

          {/* Result Step */}
          {currentStep === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center max-w-2xl w-full"
            >
              <div className="mb-8">
                <div className="text-6xl mb-4">✨</div>
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                  {t("prediction.result.title", { name: predictionData.name })}
                </h3>

                <div className="bg-[var(--primary-mint)]/10 rounded-2xl p-8 mb-6 space-y-4">
                  <p className="text-lg text-[var(--foreground)]">
                    {t(`prediction.result.zodiac.${predictionData.zodiacSign}`)}
                  </p>
                  <p className="text-lg text-[var(--foreground)] font-medium">
                    {t("prediction.result.guess", {
                      guess: t(`guessing.${predictionData.genderGuess}`),
                    })}
                  </p>
                  {predictionData.suggestedName && (
                    <p className="text-lg text-[var(--foreground)]">
                      {t("prediction.result.suggestedName", {
                        name: predictionData.suggestedName,
                      })}
                    </p>
                  )}
                  {predictionData.wishes && (
                    <p className="text-base text-[var(--foreground)] italic opacity-80">
                      "{predictionData.wishes}"
                    </p>
                  )}
                </div>

                <p className="text-[var(--foreground)] opacity-70 mb-8">
                  {t("prediction.result.thanks")}
                </p>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="duck-button disabled:opacity-50"
                >
                  {isSubmitting
                    ? t("prediction.result.submitting")
                    : t("prediction.result.submit")}
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 text-[var(--foreground)] hover:text-[var(--primary-mint)] transition-colors"
                >
                  {t("prediction.result.tryAgain")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {[
          "welcome",
          "zodiac",
          "gender",
          "nameSuggestion",
          "wishes",
          "result",
        ].map((step, index) => (
          <div
            key={step}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentStep === step
                ? "w-8 bg-[var(--primary-mint)]"
                : index <
                    [
                      "welcome",
                      "zodiac",
                      "gender",
                      "nameSuggestion",
                      "wishes",
                      "result",
                    ].indexOf(currentStep)
                  ? "bg-[var(--primary-mint)]/50"
                  : "bg-[var(--primary-mint)]/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
