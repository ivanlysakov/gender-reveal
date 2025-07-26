"use client";

import { motion } from "framer-motion";

interface WaddleDuckProps {
  variant: "boy" | "girl";
  size?: number;
  animate?: boolean;
}

export default function WaddleDuck({ 
  variant, 
  size = 150,
  animate = true 
}: WaddleDuckProps) {
  const bowColor = variant === "boy" ? "#87CEEB" : "#FFB6C1";
  
  const duckAnimation = animate ? {
    animate: {
      rotate: [-3, 3, -3],
      x: [0, 5, -5, 0],
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {};

  return (
    <motion.div 
      className="duck-container"
      {...duckAnimation}
      whileHover={{ scale: 1.1 }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 200 200" 
        fill="none"
        style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
      >
        {/* Duck body */}
        <ellipse cx="100" cy="130" rx="60" ry="50" fill="#FFE4B5" />
        
        {/* Duck belly */}
        <ellipse cx="100" cy="140" rx="45" ry="35" fill="#FFF8DC" />
        
        {/* Duck head */}
        <circle cx="100" cy="80" r="40" fill="#FFE4B5" />
        
        {/* Duck bill */}
        <path 
          d="M70 85 Q60 90 70 95 L85 95 Q80 90 85 85 Z" 
          fill="#FFA500" 
        />
        
        {/* Duck eye (left) */}
        <circle cx="88" cy="75" r="8" fill="white" />
        <circle cx="90" cy="77" r="5" fill="black" />
        <circle cx="91" cy="76" r="2" fill="white" />
        
        {/* Duck eye (right) */}
        <circle cx="112" cy="75" r="8" fill="white" />
        <circle cx="110" cy="77" r="5" fill="black" />
        <circle cx="111" cy="76" r="2" fill="white" />
        
        {/* Wing */}
        <path 
          d="M140 120 Q155 110 150 140 Q145 150 130 145 Q125 135 130 125" 
          fill="#FFD700" 
          opacity="0.8"
        />
        
        {/* Cheek blush */}
        <circle cx="65" cy="85" r="8" fill="#FFB6C1" opacity="0.4" />
        <circle cx="135" cy="85" r="8" fill="#FFB6C1" opacity="0.4" />
        
        {/* Bow or Bow Tie */}
        {variant === "girl" ? (
          // Girl's bow
          <g transform="translate(100, 50)">
            <path 
              d="M-15 -5 Q-20 0 -15 5 L-5 5 Q0 0 -5 -5 Z" 
              fill={bowColor}
            />
            <path 
              d="M15 -5 Q20 0 15 5 L5 5 Q0 0 5 -5 Z" 
              fill={bowColor}
            />
            <rect x="-5" y="-5" width="10" height="10" rx="2" fill={bowColor} />
            <circle cx="0" cy="0" r="3" fill="white" opacity="0.5" />
          </g>
        ) : (
          // Boy's bow tie
          <g transform="translate(100, 100)">
            <path 
              d="M-20 -8 L-8 0 L-20 8 Q-25 8 -25 0 Q-25 -8 -20 -8 Z" 
              fill={bowColor}
            />
            <path 
              d="M20 -8 L8 0 L20 8 Q25 8 25 0 Q25 -8 20 -8 Z" 
              fill={bowColor}
            />
            <rect x="-8" y="-4" width="16" height="8" rx="2" fill={bowColor} />
            <rect x="-3" y="-2" width="6" height="4" rx="1" fill="white" opacity="0.3" />
          </g>
        )}
        
        {/* Feet */}
        <ellipse cx="85" cy="170" rx="15" ry="8" fill="#FFA500" />
        <ellipse cx="115" cy="170" rx="15" ry="8" fill="#FFA500" />
      </svg>
    </motion.div>
  );
}