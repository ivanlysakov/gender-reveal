"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function EventDetails() {
  const t = useTranslations();

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="waddle-card max-w-3xl mx-auto"
    >
      <div className="event-details">
        <h3 className="script-font text-3xl mb-6" style={{ color: "var(--waddle-blue)" }}>
          Join Us For A Gender Reveal Party
        </h3>
        
        <p className="text-lg mb-4">
          <strong>Honoring</strong>
        </p>
        
        <div className="names-highlight mb-6">
          {t("hero.names")}
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center p-4 rounded-2xl bg-blue-50"
          >
            <div className="text-3xl mb-2">📅</div>
            <strong className="block mb-1">Date</strong>
            <p>August 7th, 2025</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center p-4 rounded-2xl bg-pink-50"
          >
            <div className="text-3xl mb-2">⏰</div>
            <strong className="block mb-1">Time</strong>
            <p>3:00 PM</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center p-4 rounded-2xl bg-yellow-50"
          >
            <div className="text-3xl mb-2">📍</div>
            <strong className="block mb-1">Location</strong>
            <p>Our Garden</p>
            <p className="text-sm">Details in RSVP</p>
          </motion.div>
        </div>
        
        <div className="text-center">
          <button 
            className="waddle-button waddle-button-primary mr-4"
            onClick={() => {
              // Add to calendar functionality
              alert("Add to calendar feature coming soon!");
            }}
          >
            Add to Calendar
          </button>
        </div>
      </div>
    </motion.div>
  );
}