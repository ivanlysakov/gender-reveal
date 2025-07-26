"use client";

import { motion } from "framer-motion";
import WaddleDuck from "./WaddleDuck";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
}

export default function HeroSection({ 
  title = "He or She",
  subtitle = "Waddle Baby Harris Be?"
}: HeroSectionProps) {
  const titleWords = title.split(" ");
  
  return (
    <div className="relative z-10 text-center py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Ducks on sides */}
        <div className="flex justify-center items-center gap-8 md:gap-16 mb-8">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <WaddleDuck variant="boy" size={180} />
          </motion.div>
          
          {/* Main Title */}
          <motion.div 
            className="he-or-she-title"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="he-text">{titleWords[0]}</span>
            <span className="or-text">{titleWords[1]}</span>
            <span className="she-text">{titleWords[2]}</span>
          </motion.div>
          
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
          >
            <WaddleDuck variant="girl" size={180} />
          </motion.div>
        </div>
        
        {/* Subtitle */}
        <motion.h2 
          className="waddle-subtitle"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {subtitle}
        </motion.h2>
      </div>
    </div>
  );
}