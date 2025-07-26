"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ElegantDuck from "./ElegantDuck";

export default function ElegantHero() {
  const t = useTranslations();
  
  return (
    <section className="elegant-section text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        {/* He or She Title */}
        <div className="he-or-she-elegant mb-8">
          <span className="he-elegant">He</span>
          <span className="or-elegant">or</span>
          <span className="she-elegant">She</span>
        </div>
        
        {/* Main Title */}
        <h1 className="main-title mb-12">
          Waddle Baby Harris Be?
        </h1>
        
        {/* Ducks */}
        <div className="flex justify-center items-center gap-8 mb-16">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <ElegantDuck variant="boy" size={180} />
          </motion.div>
          
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <ElegantDuck variant="girl" size={180} />
          </motion.div>
        </div>
        
        {/* Event Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="elegant-card max-w-2xl mx-auto"
        >
          <p className="event-detail-heading mb-4">Please Join Us For A Gender Reveal</p>
          <p className="event-detail-heading mb-6">Honoring</p>
          <h2 className="names-elegant mb-8">{t("hero.names")}</h2>
          
          <div className="space-y-2 mb-8">
            <p className="event-detail-text">
              <strong>Saturday, August 7th at 3:00 PM</strong>
            </p>
            <p className="event-detail-text">The Garden Venue</p>
            <p className="event-detail-text">123 Beautiful Street, Your City</p>
          </div>
          
        </motion.div>
      </motion.div>
    </section>
  );
}