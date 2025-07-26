"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const zodiacSigns = [
  { id: "capricorn", name: "Capricorn", dates: "Dec 22 - Jan 19", emoji: "♑", color: "#8B4513" },
  { id: "aquarius", name: "Aquarius", dates: "Jan 20 - Feb 18", emoji: "♒", color: "#4682B4" },
  { id: "pisces", name: "Pisces", dates: "Feb 19 - Mar 20", emoji: "♓", color: "#4169E1" },
  { id: "aries", name: "Aries", dates: "Mar 21 - Apr 19", emoji: "♈", color: "#DC143C" },
  { id: "taurus", name: "Taurus", dates: "Apr 20 - May 20", emoji: "♉", color: "#228B22" },
  { id: "gemini", name: "Gemini", dates: "May 21 - Jun 20", emoji: "♊", color: "#FFD700" },
  { id: "cancer", name: "Cancer", dates: "Jun 21 - Jul 22", emoji: "♋", color: "#C0C0C0" },
  { id: "leo", name: "Leo", dates: "Jul 23 - Aug 22", emoji: "♌", color: "#FFA500" },
  { id: "virgo", name: "Virgo", dates: "Aug 23 - Sep 22", emoji: "♍", color: "#808000" },
  { id: "libra", name: "Libra", dates: "Sep 23 - Oct 22", emoji: "♎", color: "#FFB6C1" },
  { id: "scorpio", name: "Scorpio", dates: "Oct 23 - Nov 21", emoji: "♏", color: "#8B0000" },
  { id: "sagittarius", name: "Sagittarius", dates: "Nov 22 - Dec 21", emoji: "♐", color: "#9370DB" }
];

export default function WaddleZodiac() {
  const t = useTranslations("zodiac");
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [showPrediction, setShowPrediction] = useState(false);

  const handleSignClick = (signId: string) => {
    setSelectedSign(signId);
    setShowPrediction(true);
  };

  const getGenderPrediction = (sign: string) => {
    // Fun predictions based on zodiac signs
    const predictions: { [key: string]: { gender: "boy" | "girl", reason: string } } = {
      capricorn: { gender: "boy", reason: "Capricorns are natural leaders - perfect for a little prince!" },
      aquarius: { gender: "girl", reason: "Aquarius brings creativity and uniqueness - a little princess!" },
      pisces: { gender: "girl", reason: "Pisces are dreamy and intuitive - definitely a girl!" },
      aries: { gender: "boy", reason: "Aries are bold and adventurous - a brave little boy!" },
      taurus: { gender: "girl", reason: "Taurus loves beauty and comfort - a sweet little girl!" },
      gemini: { gender: "boy", reason: "Geminis are curious and playful - an energetic boy!" },
      cancer: { gender: "girl", reason: "Cancers are nurturing and emotional - a caring girl!" },
      leo: { gender: "boy", reason: "Leos are confident leaders - a charismatic boy!" },
      virgo: { gender: "girl", reason: "Virgos are thoughtful and precise - a wise little girl!" },
      libra: { gender: "boy", reason: "Libras seek balance and justice - a fair-minded boy!" },
      scorpio: { gender: "girl", reason: "Scorpios are passionate and mysterious - an intriguing girl!" },
      sagittarius: { gender: "boy", reason: "Sagittarians are adventurous explorers - a curious boy!" }
    };
    
    return predictions[sign] || { gender: "girl", reason: "The stars are mysterious!" };
  };

  const selectedSignData = zodiacSigns.find(s => s.id === selectedSign);
  const prediction = selectedSign ? getGenderPrediction(selectedSign) : null;

  return (
    <div className="waddle-card max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="script-font text-3xl mb-4" style={{ color: "var(--waddle-pink)" }}>
          Zodiac Gender Prediction
        </h3>
        <p className="sans-font text-gray-600 text-lg">
          Select a zodiac sign to see what the stars predict!
        </p>
      </div>

      {!showPrediction ? (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {zodiacSigns.map((sign) => (
            <motion.button
              key={sign.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSignClick(sign.id)}
              className="p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 text-center"
              style={{ 
                borderColor: sign.color + "40",
                backgroundColor: sign.color + "10"
              }}
            >
              <div className="text-4xl mb-2">{sign.emoji}</div>
              <h4 className="font-semibold text-gray-800">{sign.name}</h4>
              <p className="text-sm text-gray-600">{sign.dates}</p>
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto"
        >
          {selectedSignData && (
            <div className="mb-8">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 1 }}
                className="text-8xl mb-4 inline-block"
                style={{ color: selectedSignData.color }}
              >
                {selectedSignData.emoji}
              </motion.div>
              <h4 className="script-font text-3xl mb-2" style={{ color: selectedSignData.color }}>
                {selectedSignData.name}
              </h4>
              <p className="text-gray-600">{selectedSignData.dates}</p>
            </div>
          )}

          {prediction && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className={`p-8 rounded-3xl ${
                prediction.gender === "boy" 
                  ? "bg-gradient-to-br from-blue-50 to-blue-100 border-3 border-blue-200" 
                  : "bg-gradient-to-br from-pink-50 to-pink-100 border-3 border-pink-200"
              }`}
            >
              <h5 className="script-font text-2xl mb-4" style={{ 
                color: prediction.gender === "boy" ? "var(--waddle-blue)" : "var(--waddle-pink)" 
              }}>
                The stars predict... It's a {prediction.gender}!
              </h5>
              <p className="sans-font text-gray-700 text-lg mb-6">
                {prediction.reason}
              </p>
              <button
                onClick={() => {
                  setSelectedSign(null);
                  setShowPrediction(false);
                }}
                className="waddle-button waddle-button-primary"
              >
                Try Another Sign
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}