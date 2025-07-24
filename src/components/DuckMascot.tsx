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
        {/* Duck body */}
        <ellipse
          cx="100"
          cy="130"
          rx="60"
          ry="50"
          fill="#FFCC00"
          stroke="#FFB700"
          strokeWidth="2"
        />
        
        {/* Duck head */}
        <circle
          cx="100"
          cy="80"
          r="40"
          fill="#FFCC00"
          stroke="#FFB700"
          strokeWidth="2"
        />
        
        {/* Beak */}
        <path
          d="M 70 85 Q 60 85 65 90 Q 70 95 80 90 Z"
          fill="#FFA500"
          stroke="#FF8C00"
          strokeWidth="1.5"
        />
        
        {/* Eyes */}
        <circle cx="85" cy="75" r="8" fill="#FFFFFF" />
        <circle cx="115" cy="75" r="8" fill="#FFFFFF" />
        <circle cx="87" cy="77" r="5" fill="#000000" />
        <circle cx="117" cy="77" r="5" fill="#000000" />
        <circle cx="88" cy="76" r="2" fill="#FFFFFF" />
        <circle cx="118" cy="76" r="2" fill="#FFFFFF" />
        
        {/* Wings */}
        <ellipse
          cx="55"
          cy="130"
          rx="25"
          ry="35"
          fill="#FFD700"
          stroke="#FFB700"
          strokeWidth="2"
          transform="rotate(-15 55 130)"
        />
        <ellipse
          cx="145"
          cy="130"
          rx="25"
          ry="35"
          fill="#FFD700"
          stroke="#FFB700"
          strokeWidth="2"
          transform="rotate(15 145 130)"
        />
        
        {/* Cute cheeks */}
        <circle cx="65" cy="90" r="8" fill="#FFB6C1" opacity="0.5" />
        <circle cx="135" cy="90" r="8" fill="#FFB6C1" opacity="0.5" />
        
        {/* Water ripples for swimming variant */}
        {variant === "swimming" && (
          <>
            <ellipse
              cx="100"
              cy="170"
              rx="80"
              ry="15"
              fill="none"
              stroke="#A0D6D0"
              strokeWidth="2"
              opacity="0.5"
            />
            <ellipse
              cx="100"
              cy="175"
              rx="60"
              ry="10"
              fill="none"
              stroke="#A0D6D0"
              strokeWidth="2"
              opacity="0.3"
            />
          </>
        )}
        
        {/* Lily pad for sitting variant */}
        {variant === "sitting" && (
          <ellipse
            cx="100"
            cy="170"
            rx="70"
            ry="20"
            fill="#B2E7A3"
            stroke="#8BC34A"
            strokeWidth="2"
          />
        )}
      </svg>
    </motion.div>
  );
}