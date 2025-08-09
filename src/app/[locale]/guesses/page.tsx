"use client";

import Footer from "@/components/Footer";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

interface TranslatedTexts {
  [guessId: string]: {
    message?: string;
    wishes?: string;
    suggestedName?: string;
    isLoading?: boolean;
  };
}

export default function GuessesPage() {
  const t = useTranslations("guessesPage");
  const locale = useLocale();
  const guesses = useQuery(api.guesses.getGuesses);
  const [filter, setFilter] = useState<"all" | "boy" | "girl">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [translatedTexts, setTranslatedTexts] = useState<TranslatedTexts>({});

  // Filter and search guesses
  const filteredGuesses = guesses?.filter((guess) => {
    const matchesFilter = filter === "all" || guess.guess === filter;
    const matchesSearch = 
      searchTerm === "" ||
      guess.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guess.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guess.suggestedName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort by creation date (newest first)
  const sortedGuesses = filteredGuesses?.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Translation function using Google Translate
  const translateText = async (text: string, targetLang: string) => {
    if (!text || text.trim() === '') return text;
    
    try {
      // Clean the text before translation
      const cleanText = text.trim();
      
      // Using Google Translate API with better parameters
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&dt=bd&dt=qc&dt=rm&dt=ex&dt=at&dt=ss&dt=rw&dt=ld&dt=md&q=${encodeURIComponent(
          cleanText
        )}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Extract translated text from the response
      if (data && data[0] && Array.isArray(data[0])) {
        let translatedText = '';
        for (const sentence of data[0]) {
          if (sentence && sentence[0]) {
            translatedText += sentence[0];
          }
        }
        return translatedText || text;
      }
      
      return text;
    } catch (error) {
      console.error("Translation error for text:", text, error);
      return text; // Return original text if translation fails
    }
  };

  // Handle translation for a specific guess
  const handleTranslate = async (guessId: string, guess: any) => {
    // Check if already translated
    if (translatedTexts[guessId] && !translatedTexts[guessId].isLoading) {
      // Clear translation to show original
      setTranslatedTexts((prev) => {
        const newState = { ...prev };
        delete newState[guessId];
        return newState;
      });
      return;
    }

    setTranslatedTexts((prev) => ({
      ...prev,
      [guessId]: { isLoading: true },
    }));

    const targetLang = locale === "uk" ? "uk" : "en";
    const translations: any = {};

    try {
      // Add small delays between requests to avoid rate limiting
      if (guess.message) {
        translations.message = await translateText(guess.message, targetLang);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      if (guess.wishes) {
        translations.wishes = await translateText(guess.wishes, targetLang);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      if (guess.suggestedName) {
        translations.suggestedName = await translateText(guess.suggestedName, targetLang);
      }

      // Only update if we got at least one translation
      if (Object.keys(translations).length > 0) {
        setTranslatedTexts((prev) => ({
          ...prev,
          [guessId]: { ...translations, isLoading: false },
        }));
      } else {
        throw new Error("No translations received");
      }
    } catch (error) {
      console.error("Translation failed for guess:", guessId, error);
      setTranslatedTexts((prev) => ({
        ...prev,
        [guessId]: { isLoading: false, error: true },
      }));
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background similar to main page */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E0F5F5] via-[#B8E6E6] to-[#7BC4C4] opacity-95" />
      </div>

      <div className="relative">
        {/* Header */}
        <header className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#2D7D7D] hover:text-[#4A9B9B] transition-colors mb-6"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>{t("backToHome")}</span>
            </Link>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D7D7D] mb-3">
              {t("title")}
            </h1>
            <p className="text-lg sm:text-xl text-[#4A9B9B]">
              {t("subtitle", { count: guesses?.length || 0 })}
            </p>
          </div>
        </header>

        {/* Main Content */}
        <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Filters and Search */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/40 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                {/* Filter Buttons */}
                <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
                  <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      filter === "all"
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {t("filterAll")} ({guesses?.length || 0})
                  </button>
                  <button
                    onClick={() => setFilter("boy")}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      filter === "boy"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {t("filterBoy")} ({guesses?.filter(g => g.guess === "boy").length || 0})
                  </button>
                  <button
                    onClick={() => setFilter("girl")}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      filter === "girl"
                        ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {t("filterGirl")} ({guesses?.filter(g => g.guess === "girl").length || 0})
                  </button>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder={t("searchPlaceholder")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Guesses Grid */}
            {sortedGuesses && sortedGuesses.length > 0 ? (
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedGuesses.map((guess) => (
                  <div
                    key={guess._id}
                    className={`bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border-2 transition-all hover:scale-[1.02] hover:shadow-xl ${
                      guess.guess === "boy"
                        ? "border-blue-200 hover:border-blue-300"
                        : "border-pink-200 hover:border-pink-300"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800">{guess.name}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(guess.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {(guess.message || guess.wishes || guess.suggestedName) && (
                          <button
                            onClick={() => handleTranslate(guess._id, guess)}
                            disabled={translatedTexts[guess._id]?.isLoading}
                            className="text-sm px-3 py-1 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {translatedTexts[guess._id]?.isLoading ? (
                              <span className="flex items-center gap-1">
                                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                {t("translating")}
                              </span>
                            ) : translatedTexts[guess._id]?.error ? (
                              <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {t("retry")}
                              </span>
                            ) : translatedTexts[guess._id] && Object.keys(translatedTexts[guess._id]).length > 1 ? (
                              t("showOriginal")
                            ) : (
                              t("translate")
                            )}
                          </button>
                        )}
                        <div
                          className={`text-3xl ${
                            guess.guess === "boy" ? "text-blue-500" : "text-pink-500"
                          }`}
                        >
                          {guess.guess === "boy" ? "👶" : "👧"}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {/* Guess */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600">{t("guess")}:</span>
                        <span
                          className={`font-bold ${
                            guess.guess === "boy" ? "text-blue-600" : "text-pink-600"
                          }`}
                        >
                          {guess.guess === "boy" ? t("boy") : t("girl")}
                        </span>
                      </div>

                      {/* Zodiac Sign */}
                      {guess.zodiacSign && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-600">{t("zodiac")}:</span>
                          <span className="text-gray-800">
                            {guess.zodiacSign === "sagittarius" ? "♐ Sagittarius" : "♑ Capricorn"}
                          </span>
                        </div>
                      )}

                      {/* Suggested Name */}
                      {guess.suggestedName && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">{t("suggestedName")}:</span>
                          <p className="text-gray-800 mt-1">
                            {translatedTexts[guess._id]?.suggestedName || guess.suggestedName}
                          </p>
                          {translatedTexts[guess._id]?.suggestedName && (
                            <p className="text-xs text-gray-500 mt-1">
                              {t("original")}: {guess.suggestedName}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Message */}
                      {guess.message && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">{t("message")}:</span>
                          <p className="text-gray-700 mt-1 italic">
                            {translatedTexts[guess._id]?.message || guess.message}
                          </p>
                          {translatedTexts[guess._id]?.message && (
                            <p className="text-xs text-gray-500 mt-1 italic">
                              {t("original")}: {guess.message}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Wishes */}
                      {guess.wishes && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">{t("wishes")}:</span>
                          <p className="text-gray-700 mt-1">
                            {translatedTexts[guess._id]?.wishes || guess.wishes}
                          </p>
                          {translatedTexts[guess._id]?.wishes && (
                            <p className="text-xs text-gray-500 mt-1">
                              {t("original")}: {guess.wishes}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl text-gray-600">{t("noResults")}</p>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}