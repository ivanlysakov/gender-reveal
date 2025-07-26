"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface DuckDisplayProps {
  showBothDucks?: boolean;
  size?: number;
}

export default function DuckDisplay({ 
  showBothDucks = true,
  size = 150 
}: DuckDisplayProps) {
  const BlueDuck = () => (
    <motion.div 
      className="rubber-duck duck-blue relative"
      whileHover={{ scale: 1.1, rotate: 10 }}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
        {/* Duck body */}
        <ellipse cx="100" cy="120" rx="70" ry="60" fill="#6BCFFF" />
        {/* Duck head */}
        <circle cx="100" cy="70" r="45" fill="#6BCFFF" />
        {/* Duck bill */}
        <path d="M55 75 Q45 80 55 85 L75 85 Q70 80 75 75 Z" fill="#4AA3CC" />
        {/* Duck eye */}
        <circle cx="85" cy="65" r="8" fill="white" />
        <circle cx="87" cy="67" r="5" fill="black" />
        {/* Wing detail */}
        <path d="M120 110 Q140 100 135 130 Q130 140 115 135" fill="#4AA3CC" opacity="0.7" />
        {/* Water reflection */}
        <ellipse cx="100" cy="175" rx="80" ry="15" fill="#6BCFFF" opacity="0.3" />
      </svg>
      <div className="water-ripple" />
    </motion.div>
  );

  const YellowDuck = () => (
    <motion.div 
      className="rubber-duck duck-yellow relative"
      whileHover={{ scale: 1.1, rotate: -10 }}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
    >
      <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
        {/* Duck body */}
        <ellipse cx="100" cy="120" rx="70" ry="60" fill="#FFD93D" />
        {/* Duck head */}
        <circle cx="100" cy="70" r="45" fill="#FFD93D" />
        {/* Duck bill */}
        <path d="M55 75 Q45 80 55 85 L75 85 Q70 80 75 75 Z" fill="#FFA94D" />
        {/* Duck eye */}
        <circle cx="85" cy="65" r="8" fill="white" />
        <circle cx="87" cy="67" r="5" fill="black" />
        {/* Wing detail */}
        <path d="M120 110 Q140 100 135 130 Q130 140 115 135" fill="#FFA94D" opacity="0.7" />
        {/* Cute cheek */}
        <circle cx="65" cy="80" r="8" fill="#FFB6D9" opacity="0.5" />
        {/* Water reflection */}
        <ellipse cx="100" cy="175" rx="80" ry="15" fill="#FFD93D" opacity="0.3" />
      </svg>
      <div className="water-ripple" />
    </motion.div>
  );

  return (
    <div className="flex justify-center items-center gap-8">
      <BlueDuck />
      {showBothDucks && (
        <>
          <motion.div 
            className="he-or-she"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <span className="he-text chalk-text" data-text="HE">HE</span>
            <span className="or-text chalk-text" data-text="or">or</span>
            <span className="she-text chalk-text" data-text="She">She</span>
          </motion.div>
          <YellowDuck />
        </>
      )}
    </div>
  );
}