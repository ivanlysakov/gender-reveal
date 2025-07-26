"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import WaddleDuck from "./WaddleDuck";

export default function WaddleRevealSection() {
  const t = useTranslations("reveal");
  const [isRevealed, setIsRevealed] = useState(false);
  const [revealResult, setRevealResult] = useState<"boy" | "girl" | null>(null);

  const handleReveal = () => {
    // Simulate reveal - in real app this would come from backend
    const result = Math.random() > 0.5 ? "boy" : "girl";
    setRevealResult(result);
    setIsRevealed(true);
  };

  return (
    <div className="waddle-card max-w-3xl mx-auto text-center">
      {!isRevealed ? (
        <>
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mb-8"
          >
            <div className="text-9xl">❓</div>
          </motion.div>
          
          <h3 className="script-font text-3xl mb-6" style={{ color: "var(--waddle-blue)" }}>
            The Big Moment
          </h3>
          
          <p className="sans-font text-lg text-gray-600 mb-8">
            {t("stayTuned")}
          </p>
          
          <p className="sans-font text-gray-500 mb-8">
            This page will automatically update on the day of the reveal!
          </p>
          
          <button
            onClick={handleReveal}
            className="waddle-button waddle-button-primary text-xl px-12 py-4"
          >
            Click to Preview Reveal
          </button>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Confetti effect */}
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: -100,
                  x: Math.random() * window.innerWidth,
                  rotate: 0
                }}
                animate={{ 
                  y: window.innerHeight + 100,
                  rotate: Math.random() * 360
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2,
                  ease: "linear",
                  delay: Math.random() * 0.5
                }}
                className={`absolute w-3 h-3 rounded-full ${
                  revealResult === "boy" ? "bg-blue-400" : "bg-pink-400"
                }`}
              />
            ))}
          </div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <WaddleDuck variant={revealResult!} size={200} />
          </motion.div>
          
          <motion.h3 
            className="script-font text-5xl mt-8 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ 
              color: revealResult === "boy" ? "var(--waddle-blue)" : "var(--waddle-pink)" 
            }}
          >
            It's a {revealResult === "boy" ? "Boy" : "Girl"}!
          </motion.h3>
          
          <motion.p
            className="sans-font text-xl text-gray-700 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {t("itsOfficial")} {t("winners")}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className={`p-8 rounded-3xl ${
              revealResult === "boy" 
                ? "bg-gradient-to-br from-blue-50 to-blue-100 border-3 border-blue-200" 
                : "bg-gradient-to-br from-pink-50 to-pink-100 border-3 border-pink-200"
            }`}
          >
            <p className="script-font text-2xl mb-4">
              Thank you for celebrating with us!
            </p>
            <p className="sans-font text-gray-700">
              We can't wait to meet our little {revealResult === "boy" ? "prince" : "princess"}!
            </p>
          </motion.div>
          
          <button
            onClick={() => {
              setIsRevealed(false);
              setRevealResult(null);
            }}
            className="waddle-button waddle-button-primary mt-8"
          >
            Reset Preview
          </button>
        </motion.div>
      )}
    </div>
  );
}