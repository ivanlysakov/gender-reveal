"use client";

import { motion } from "framer-motion";

interface BabyDucklingProps {
  size?: number;
  animate?: boolean;
  emotion?: "happy" | "curious" | "sleeping" | "excited";
}

export default function BabyDuckling({ 
  size = 150, 
  animate = true,
  emotion = "happy" 
}: BabyDucklingProps) {
  const animationVariants = {
    happy: {
      y: [0, -10, 0],
      rotate: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    curious: {
      rotate: [-10, 10, -10],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    sleeping: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    excited: {
      y: [0, -20, 0],
      rotate: [-10, 10, -10],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      animate={animate ? animationVariants[emotion] : {}}
      whileHover={{ scale: 1.1 }}
      style={{ width: size, height: size }}
      className="relative"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft shadow */}
        <ellipse cx="100" cy="180" rx="50" ry="10" fill="#C8E6C9" opacity="0.3" />
        
        {/* Baby duckling body */}
        <ellipse cx="100" cy="130" rx="45" ry="40" fill="#FFF59D" />
        <ellipse cx="100" cy="135" rx="35" ry="30" fill="#FFF176" />
        
        {/* Baby duckling head */}
        <circle cx="100" cy="85" r="35" fill="#FFF59D" />
        
        {/* Fluffy texture */}
        <circle cx="85" cy="80" r="8" fill="#FFEB3B" opacity="0.5" />
        <circle cx="115" cy="78" r="6" fill="#FFEB3B" opacity="0.5" />
        <circle cx="90" cy="130" r="7" fill="#FFEB3B" opacity="0.5" />
        <circle cx="110" cy="132" r="8" fill="#FFEB3B" opacity="0.5" />
        
        {/* Baby beak (small and cute) */}
        <path
          d="M90 90 Q85 92 90 94 L95 94 Q92 92 95 90 Z"
          fill="#FFC107"
          stroke="#FFB300"
          strokeWidth="1"
        />
        
        {/* Eyes based on emotion */}
        {emotion === "sleeping" ? (
          <>
            {/* Closed eyes */}
            <path d="M80 82 Q85 85 90 82" stroke="#37474F" strokeWidth="2" fill="none" />
            <path d="M110 82 Q115 85 120 82" stroke="#37474F" strokeWidth="2" fill="none" />
            {/* Zzz */}
            <text x="130" y="70" fill="#81C784" fontSize="12" fontFamily="cursive">z</text>
            <text x="135" y="60" fill="#81C784" fontSize="10" fontFamily="cursive">z</text>
          </>
        ) : (
          <>
            {/* Open eyes */}
            <circle cx="85" cy="82" r="10" fill="white" />
            <circle cx="115" cy="82" r="10" fill="white" />
            <circle cx={emotion === "curious" ? 88 : 86} cy="84" r="6" fill="#37474F" />
            <circle cx={emotion === "curious" ? 112 : 114} cy="84" r="6" fill="#37474F" />
            <circle cx={emotion === "curious" ? 89 : 87} cy="82" r="2" fill="white" />
            <circle cx={emotion === "curious" ? 113 : 115} cy="82" r="2" fill="white" />
          </>
        )}
        
        {/* Rosy cheeks */}
        <circle cx="65" cy="90" r="8" fill="#FFCCBC" opacity="0.5" />
        <circle cx="135" cy="90" r="8" fill="#FFCCBC" opacity="0.5" />
        
        {/* Tiny wings */}
        <ellipse cx="70" cy="125" rx="15" ry="20" fill="#FFF176" transform="rotate(-20 70 125)" />
        <ellipse cx="130" cy="125" rx="15" ry="20" fill="#FFF176" transform="rotate(20 130 125)" />
        
        {/* Wing details */}
        <path d="M65 120 Q60 125 65 130" stroke="#FFEB3B" strokeWidth="2" fill="none" />
        <path d="M135 120 Q140 125 135 130" stroke="#FFEB3B" strokeWidth="2" fill="none" />
        
        {/* Tiny feet */}
        <ellipse cx="90" cy="165" rx="8" ry="5" fill="#FFC107" />
        <ellipse cx="110" cy="165" rx="8" ry="5" fill="#FFC107" />
        
        {/* Emotion-specific details */}
        {emotion === "happy" && (
          <path d="M95 95 Q100 98 105 95" stroke="#37474F" strokeWidth="2" fill="none" />
        )}
        
        {emotion === "excited" && (
          <>
            <circle cx="100" cy="60" r="2" fill="#66BB6A" />
            <circle cx="90" cy="58" r="1.5" fill="#81C784" />
            <circle cx="110" cy="58" r="1.5" fill="#81C784" />
          </>
        )}
        
        {/* Fairy tale sparkles */}
        <circle cx="60" cy="70" r="2" fill="#81D4FA" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="140" cy="65" r="1.5" fill="#CE93D8" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="100" r="1" fill="#66BB6A" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>
    </motion.div>
  );
}