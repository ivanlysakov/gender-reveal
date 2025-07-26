"use client";

import { motion } from "framer-motion";

interface DuckMascotProps {
  variant?: "floating" | "swimming" | "sitting" | "dancing";
  size?: number;
  onClick?: () => void;
}

export default function DuckMascot({ 
  variant = "floating", 
  size = 200,
  onClick 
}: DuckMascotProps) {
  const floatingAnimation = {
    y: [0, -10, 0],
    rotate: [-2, 2, -2],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const swimmingAnimation = {
    x: [-10, 10, -10],
    rotate: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const dancingAnimation = {
    rotate: [-15, 15, -15],
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const animations = {
    floating: floatingAnimation,
    swimming: swimmingAnimation,
    sitting: {},
    dancing: dancingAnimation
  };

  return (
    <motion.div
      animate={animations[variant]}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Duck body - simplified rounded shape */}
        <path
          d="M 100 50 
             C 130 50, 160 80, 160 120
             C 160 160, 130 180, 100 180
             C 70 180, 40 160, 40 120
             C 40 80, 70 50, 100 50"
          fill="#71C5B8"
        />
        
        {/* Wing detail */}
        <path
          d="M 130 100
             C 145 95, 150 110, 145 125
             C 140 140, 125 135, 120 120"
          fill="#5BA69B"
          opacity="0.6"
        />
        
        {/* Beak */}
        <path
          d="M 70 85 L 55 85 L 65 95 Z"
          fill="#F5C85F"
        />
        
        {/* Eye */}
        <circle cx="85" cy="80" r="3" fill="#2B3E3A" />
        
        {/* Simple cute detail on body */}
        <circle
          cx="100"
          cy="120"
          r="25"
          fill="#4A6B5D"
        />
        
        {/* Water ripples for swimming variant */}
        {variant === "swimming" && (
          <>
            <ellipse
              cx="100"
              cy="175"
              rx="70"
              ry="12"
              fill="none"
              stroke="#A8DADC"
              strokeWidth="3"
              opacity="0.4"
            />
            <ellipse
              cx="100"
              cy="180"
              rx="50"
              ry="8"
              fill="none"
              stroke="#A8DADC"
              strokeWidth="2"
              opacity="0.3"
            />
          </>
        )}
        
        {/* Sitting on lily pad */}
        {variant === "sitting" && (
          <ellipse
            cx="100"
            cy="175"
            rx="65"
            ry="18"
            fill="#B5D6B2"
            opacity="0.7"
          />
        )}
      </svg>
    </motion.div>
  );
}