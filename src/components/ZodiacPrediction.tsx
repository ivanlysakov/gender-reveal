"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DuckMascot from "./DuckMascot";
import Image from "next/image";

interface ZodiacSign {
  name: string;
  emoji: string;
  dateRange: string;
  traits: string[];
  element: string;
  color: string;
  duckImage?: string;
}

const zodiacSigns: ZodiacSign[] = [
  {
    name: "Aries",
    emoji: "♈",
    dateRange: "Mar 21 - Apr 19",
    traits: ["Bold", "Energetic", "Adventurous"],
    element: "Fire",
    color: "#FF6B6B",
    duckImage: "/images/zodiac-ducks/aries-duck.png"
  },
  {
    name: "Taurus",
    emoji: "♉",
    dateRange: "Apr 20 - May 20",
    traits: ["Reliable", "Patient", "Practical"],
    element: "Earth",
    color: "#4ECDC4",
    duckImage: "/images/zodiac-ducks/taurus-duck.png"
  },
  {
    name: "Gemini",
    emoji: "♊",
    dateRange: "May 21 - Jun 20",
    traits: ["Curious", "Adaptable", "Witty"],
    element: "Air",
    color: "#FFE66D",
    duckImage: "/images/zodiac-ducks/gemini-duck.png"
  },
  {
    name: "Cancer",
    emoji: "♋",
    dateRange: "Jun 21 - Jul 22",
    traits: ["Caring", "Intuitive", "Emotional"],
    element: "Water",
    color: "#A8E6CF",
    duckImage: "/images/zodiac-ducks/cancer-duck.png"
  },
  {
    name: "Leo",
    emoji: "♌",
    dateRange: "Jul 23 - Aug 22",
    traits: ["Bold", "Bubbly", "Creative"],
    element: "Fire",
    color: "#FFD93D",
    duckImage: "/images/zodiac-ducks/leo-duck.png"
  },
  {
    name: "Virgo",
    emoji: "♍",
    dateRange: "Aug 23 - Sep 22",
    traits: ["Analytical", "Kind", "Hardworking"],
    element: "Earth",
    color: "#C7CEEA",
    duckImage: "/images/zodiac-ducks/virgo-duck.png"
  },
  {
    name: "Libra",
    emoji: "♎",
    dateRange: "Sep 23 - Oct 22",
    traits: ["Balanced", "Social", "Fair"],
    element: "Air",
    color: "#FFDDE1",
    duckImage: "/images/zodiac-ducks/libra-duck.png"
  },
  {
    name: "Scorpio",
    emoji: "♏",
    dateRange: "Oct 23 - Nov 21",
    traits: ["Passionate", "Brave", "Resourceful"],
    element: "Water",
    color: "#B8A9C9",
    duckImage: "/images/zodiac-ducks/scorpio-duck.png"
  },
  {
    name: "Sagittarius",
    emoji: "♐",
    dateRange: "Nov 22 - Dec 21",
    traits: ["Optimistic", "Free", "Honest"],
    element: "Fire",
    color: "#FFA07A",
    duckImage: "/images/zodiac-ducks/sagittarius-duck.png"
  },
  {
    name: "Capricorn",
    emoji: "♑",
    dateRange: "Dec 22 - Jan 19",
    traits: ["Ambitious", "Disciplined", "Patient"],
    element: "Earth",
    color: "#87CEEB",
    duckImage: "/images/zodiac-ducks/capricorn-duck.png"
  },
  {
    name: "Aquarius",
    emoji: "♒",
    dateRange: "Jan 20 - Feb 18",
    traits: ["Original", "Independent", "Humanitarian"],
    element: "Air",
    color: "#DDA0DD",
    duckImage: "/images/zodiac-ducks/aquarius-duck.png"
  },
  {
    name: "Pisces",
    emoji: "♓",
    dateRange: "Feb 19 - Mar 20",
    traits: ["Artistic", "Intuitive", "Compassionate"],
    element: "Water",
    color: "#98D8C8",
    duckImage: "/images/zodiac-ducks/pisces-duck.png"
  }
];

export default function ZodiacPrediction() {
  const t = useTranslations("zodiac");
  const [dueDate, setDueDate] = useState("");
  const [prediction, setPrediction] = useState<ZodiacSign | null>(null);
  const [showResult, setShowResult] = useState(false);

  const calculateZodiac = (date: string) => {
    const birthDate = new Date(date);
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();

    let zodiac: ZodiacSign | null = null;

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) zodiac = zodiacSigns[0];
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) zodiac = zodiacSigns[1];
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) zodiac = zodiacSigns[2];
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) zodiac = zodiacSigns[3];
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) zodiac = zodiacSigns[4];
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) zodiac = zodiacSigns[5];
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) zodiac = zodiacSigns[6];
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) zodiac = zodiacSigns[7];
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) zodiac = zodiacSigns[8];
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) zodiac = zodiacSigns[9];
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) zodiac = zodiacSigns[10];
    else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) zodiac = zodiacSigns[11];

    setPrediction(zodiac);
    setShowResult(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dueDate) {
      calculateZodiac(dueDate);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
          {t("title")}
        </h2>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {!showResult ? (
        <div className="relative group">
          <div className="zodiac-glass-card will-blur">
            <div className="text-center mb-8">
              <DuckMascot variant="sitting" size={150} />
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="due-date" className="block text-gray-800 font-bold text-lg mb-3">
                  {t("enterDueDate")} 📅
                </label>
                <input
                  type="date"
                  id="due-date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="glass-input w-full text-lg"
                  required
                />
              </div>

              <button
                type="submit"
                className="liquid-button w-full text-xl font-bold"
              >
                {t("predictButton")} 🔮
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="relative group">
          <div className="zodiac-glass-card will-blur">
            <div className="text-center">
              {prediction?.duckImage ? (
                <div className="mb-6 relative w-64 h-64 mx-auto">
                  <Image
                    src={prediction.duckImage}
                    alt={`${prediction.name} zodiac duck`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <DuckMascot variant="dancing" size={150} />
                  </div>
                  
                  <div className="text-8xl mb-4" style={{ color: prediction?.color }}>
                    {prediction?.emoji}
                  </div>
                </>
              )}
              
              <h3 className="text-4xl font-bold mb-4" style={{ color: prediction?.color }}>
                {t("yourBabyWillBe", { sign: prediction?.name })}
              </h3>
              
              <p className="text-xl text-gray-700 mb-6">
                {prediction?.dateRange}
              </p>
              
              <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 mb-8 border border-gray-200">
                <p className="text-lg font-semibold text-gray-800 mb-4">
                  {t("personalityTraits")}:
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                  {prediction?.traits.map((trait, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full text-white font-medium"
                      style={{ backgroundColor: prediction.color }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => {
                  setShowResult(false);
                  setDueDate("");
                  setPrediction(null);
                }}
                className="liquid-button-secondary px-8 py-3 font-bold text-lg"
              >
                {t("tryAgain")} ✨
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}