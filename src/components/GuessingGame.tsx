"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function GuessingGame() {
  const t = useTranslations("guessing");

  const [selectedGender, setSelectedGender] = useState<"boy" | "girl" | null>(
    null
  );
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data for demonstration - will be replaced with Convex data
  const [guessStats] = useState({
    boy: { count: 12, percentage: 60 },
    girl: { count: 8, percentage: 40 },
    total: 20,
    recentGuesses: [
      {
        name: "Sarah",
        guess: "girl" as const,
        message: "I have a feeling it&apos;s a girl!",
      },
      { name: "Mike", guess: "boy" as const, message: "Definitely a boy!" },
      { name: "Emma", guess: "girl" as const, message: "Girl power!" },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGender || !name.trim()) return;

    setIsSubmitting(true);

    // TODO: Replace with actual Convex mutation
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="text-center">
        <div className="relative group max-w-2xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-cyan-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/40">
            <div className="text-8xl mb-6 animate-bounce">🎉</div>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
              {t("thankYou")}
            </h3>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8">
              <p className="text-gray-700 text-xl mb-4">{t("youGuessed")}</p>
              <div
                className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-bold text-xl ${
                  selectedGender === "boy"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                    : "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                }`}
              >
                <span className="text-2xl">
                  {selectedGender === "boy" ? "👶" : "👧"}
                </span>
                {selectedGender === "boy" ? t("boy") : t("girl")}
              </div>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                setSelectedGender(null);
                setName("");
                setMessage("");
              }}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {t("makeAnother")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Enhanced Guessing Form */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-blue-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border border-white/40">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {t("formTitle")}
              </h3>
              <div className="flex justify-center gap-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-400"></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Enhanced Gender Selection */}
              <div className="space-y-6">
                <label className="block text-gray-800 font-bold text-xl text-center">
                  {t("thinking")}
                </label>
                <div className="grid grid-cols-2 gap-6">
                  <button
                    type="button"
                    onClick={() => setSelectedGender("boy")}
                    className={`group relative p-8 rounded-3xl border-3 transition-all duration-500 transform hover:scale-105 ${
                      selectedGender === "boy"
                        ? "border-blue-400 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-2xl scale-105 -translate-y-2"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-cyan-50/50 hover:shadow-xl"
                    }`}
                  >
                    <div className="text-6xl mb-4 group-hover:animate-bounce">
                      👶
                    </div>
                    <div className="text-2xl font-black text-blue-600 mb-2">
                      {t("boy")}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t("boySubtitle")}
                    </div>
                    {selectedGender === "boy" && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-ping"></div>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedGender("girl")}
                    className={`group relative p-8 rounded-3xl border-3 transition-all duration-500 transform hover:scale-105 ${
                      selectedGender === "girl"
                        ? "border-pink-400 bg-gradient-to-br from-pink-50 to-rose-50 shadow-2xl scale-105 -translate-y-2"
                        : "border-gray-200 hover:border-pink-300 hover:bg-gradient-to-br hover:from-pink-50/50 hover:to-rose-50/50 hover:shadow-xl"
                    }`}
                  >
                    <div className="text-6xl mb-4 group-hover:animate-bounce">
                      👧
                    </div>
                    <div className="text-2xl font-black text-pink-600 mb-2">
                      {t("girl")}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t("girlSubtitle")}
                    </div>
                    {selectedGender === "girl" && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-ping"></div>
                    )}
                  </button>
                </div>
              </div>

              {/* Enhanced Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-800 font-bold text-lg mb-3"
                >
                  {t("nameLabel")}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm"
                    placeholder={t("namePlaceholder")}
                    required
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">
                    {name ? "😊" : "👋"}
                  </div>
                </div>
              </div>

              {/* Enhanced Message Input */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-800 font-bold text-lg mb-3"
                >
                  {t("messageLabel")}
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm resize-none"
                  placeholder={t("messagePlaceholder")}
                />
              </div>

              <button
                type="submit"
                disabled={!selectedGender || !name.trim() || isSubmitting}
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-5 rounded-2xl font-bold text-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none transform hover:-translate-y-1 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {t("submitting")}
                    </>
                  ) : (
                    <>
                      {t("submitButton")}
                      <span className="text-2xl">🎯</span>
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Enhanced Live Stats */}
        <div className="space-y-8">
          {/* Enhanced Vote Statistics */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  {t("currentPredictions")}
                </h3>
                <div className="text-6xl mb-2">📊</div>
              </div>

              <div className="space-y-6">
                {/* Boy Stats */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">👶</div>
                      <div>
                        <div className="font-black text-2xl text-blue-600">
                          {t("teamBoy")}
                        </div>
                        <div className="text-sm text-blue-500">
                          {t("teamBoySubtitle")}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-3xl text-blue-600">
                        {guessStats.boy.count}
                      </div>
                      <div className="text-blue-500 font-semibold">
                        {guessStats.boy.percentage}%
                      </div>
                    </div>
                  </div>

                  <div className="relative w-full bg-blue-200 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-4 rounded-full transition-all duration-1000 ease-out shadow-lg"
                      style={{ width: `${guessStats.boy.percentage}%` }}
                    >
                      <div className="h-full bg-gradient-to-r from-white/20 to-transparent rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Girl Stats */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">👧</div>
                      <div>
                        <div className="font-black text-2xl text-pink-600">
                          {t("teamGirl")}
                        </div>
                        <div className="text-sm text-pink-500">
                          {t("teamGirlSubtitle")}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-3xl text-pink-600">
                        {guessStats.girl.count}
                      </div>
                      <div className="text-pink-500 font-semibold">
                        {guessStats.girl.percentage}%
                      </div>
                    </div>
                  </div>

                  <div className="relative w-full bg-pink-200 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-rose-500 h-4 rounded-full transition-all duration-1000 ease-out shadow-lg"
                      style={{ width: `${guessStats.girl.percentage}%` }}
                    >
                      <div className="h-full bg-gradient-to-r from-white/20 to-transparent rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <div className="text-center py-6 border-t border-gray-200">
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {guessStats.total}
                  </div>
                  <div className="text-gray-600 font-semibold">
                    {t("totalPredictions")}
                  </div>
                  <div className="text-2xl mt-2">🗳️</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Recent Guesses */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-cyan-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  {t("recentGuesses")}
                </h3>
                <div className="text-4xl">💭</div>
              </div>
              <div className="space-y-4">
                {guessStats.recentGuesses.map((guess, index) => (
                  <div
                    key={index}
                    className={`relative p-4 rounded-2xl border-l-4 ${
                      guess.guess === "boy"
                        ? "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-400"
                        : "bg-gradient-to-r from-pink-50 to-rose-50 border-pink-400"
                    } transform hover:scale-[1.02] transition-all duration-300`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl flex-shrink-0">
                        {guess.guess === "boy" ? "👶" : "👧"}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-800 text-lg">
                          {guess.name}
                        </div>
                        {guess.message && (
                          <div className="text-gray-600 mt-2 italic">
                            &quot;{guess.message}&quot;
                          </div>
                        )}
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                          guess.guess === "boy"
                            ? "bg-blue-200 text-blue-800"
                            : "bg-pink-200 text-pink-800"
                        }`}
                      >
                        {guess.guess === "boy" ? t("boy") : t("girl")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
