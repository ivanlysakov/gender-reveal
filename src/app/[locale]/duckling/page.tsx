"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import "@/styles/duckling-theme.css";

// Import all duckling components
import DucklingHero from "@/components/duckling/DucklingHero";
import VotingSystem from "@/components/duckling/VotingSystem";
import AstrologyPrediction from "@/components/duckling/AstrologyPrediction";
import NameSuggestions from "@/components/duckling/NameSuggestions";
import GuestBook from "@/components/duckling/GuestBook";
import PhotoGallery from "@/components/duckling/PhotoGallery";
import DucklingGame from "@/components/duckling/DucklingGame";
import BabyDuckling from "@/components/duckling/BabyDuckling";

export default function DucklingReveal() {
  const t = useTranslations();

  return (
    <main className="min-h-screen duckling-bg">
      {/* Hero Section */}
      <DucklingHero />

      {/* Event Details */}
      <section className="py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="duckling-card text-center mb-12">
            <h2 className="duckling-title text-3xl mb-6">About Our Event</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-5xl mb-3">📅</div>
                <h3 className="duckling-font font-semibold text-xl mb-2">When</h3>
                <p className="duckling-text">August 9th, 2025</p>
                <p className="duckling-text">Saturday Afternoon</p>
              </div>
              <div>
                <div className="text-5xl mb-3">💻</div>
                <h3 className="duckling-font font-semibold text-xl mb-2">Where</h3>
                <p className="duckling-text">Online Event</p>
                <p className="duckling-text">Close Relatives Only</p>
              </div>
              <div>
                <div className="text-5xl mb-3">🎉</div>
                <h3 className="duckling-font font-semibold text-xl mb-2">What</h3>
                <p className="duckling-text">Gender Reveal Party</p>
                <p className="duckling-text">No RSVP Needed!</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Voting Section */}
      <section className="py-16 px-4 bg-white/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <VotingSystem />
        </motion.div>
      </section>

      {/* Astrology Prediction */}
      <section className="py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <AstrologyPrediction />
        </motion.div>
      </section>

      {/* Name Suggestions */}
      <section className="py-16 px-4 bg-white/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <NameSuggestions />
        </motion.div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <PhotoGallery />
        </motion.div>
      </section>

      {/* Guest Book */}
      <section className="py-16 px-4 bg-white/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <GuestBook />
        </motion.div>
      </section>

      {/* Mini Game */}
      <section className="py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <DucklingGame />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center border-t-2 border-green-200">
        <div className="max-w-4xl mx-auto">
          <BabyDuckling size={80} emotion="happy" animate={false} />
          <p className="duckling-text mt-4 mb-2">Made with love for our little duckling</p>
          <p className="duckling-font font-semibold text-lg" style={{ color: "#66BB6A" }}>
            Can't wait to meet you! 💚
          </p>
        </div>
      </footer>
    </main>
  );
}