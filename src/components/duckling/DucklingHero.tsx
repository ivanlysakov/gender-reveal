"use client";

import { motion } from "framer-motion";
import BabyDuckling from "./BabyDuckling";
import { useTranslations } from "next-intl";

export default function DucklingHero() {
  const t = useTranslations();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fairy Tale Pattern Background */}
      <div className="fairy-tale-pattern" />
      
      {/* Floating Ducklings */}
      <div className="floating-element" style={{ top: "10%", left: "10%" }}>
        <BabyDuckling size={60} emotion="happy" animate={false} />
      </div>
      <div className="floating-element" style={{ top: "20%", right: "15%" }}>
        <BabyDuckling size={50} emotion="sleeping" animate={false} />
      </div>
      <div className="floating-element" style={{ bottom: "15%", left: "5%" }}>
        <BabyDuckling size={40} emotion="curious" animate={false} />
      </div>
      <div className="floating-element" style={{ bottom: "10%", right: "10%" }}>
        <BabyDuckling size={55} emotion="excited" animate={false} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="mb-6"
        >
          <BabyDuckling size={200} emotion="happy" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="duckling-hero-title mb-4"
        >
          Baby's Coming! 🦆
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="duckling-font text-2xl mb-2"
          style={{ color: "#66BB6A" }}
        >
          Join Our Gender Reveal Party
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="duckling-text text-lg mb-8"
        >
          August 9th, 2025 • Online Event
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <button className="duckling-button duckling-button-primary">
            Vote Boy or Girl 🗳️
          </button>
          <button className="duckling-button duckling-button-secondary">
            Suggest Names 📝
          </button>
        </motion.div>

        {/* Announcement Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 inline-block"
        >
          <div className="announcement-banner">
            <span className="text-2xl mr-3">🎉</span>
            <span className="duckling-font font-semibold">
              The Big Reveal Happens Live During the Event!
            </span>
            <span className="text-2xl ml-3">🎉</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <svg width="100%" height="100%" className="opacity-5">
          <pattern id="bubbles" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="30" fill="#FFF59D" />
            <circle cx="20" cy="20" r="15" fill="#A5D6A7" />
            <circle cx="80" cy="80" r="20" fill="#81D4FA" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#bubbles)" />
        </svg>
      </div>

      <style jsx>{`
        .announcement-banner {
          background: linear-gradient(135deg, #FFF59D 0%, #FFF176 100%);
          padding: 1rem 2rem;
          border-radius: 30px;
          box-shadow: 0 4px 15px rgba(255, 235, 59, 0.3);
          border: 2px solid #FFEB3B;
          display: flex;
          align-items: center;
        }
      `}</style>
    </section>
  );
}