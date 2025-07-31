"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface DuckMascotProps {
  variant?: "floating" | "swimming" | "sitting" | "dancing";
  size?: number;
  onClick?: () => void;
  showPartyHat?: boolean;
  className?: string;
}

export default function DuckMascot({
  variant = "floating",
  size = 200,
  onClick,
  showPartyHat = true,
  className,
}: DuckMascotProps) {
  const floatingAnimation = {
    y: [0, -10, 0],
    rotate: [-2, 2, -2],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const swimmingAnimation = {
    x: [-10, 10, -10],
    rotate: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const dancingAnimation = {
    rotate: [-15, 15, -15],
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const animations = {
    floating: floatingAnimation,
    swimming: swimmingAnimation,
    sitting: {},
    dancing: dancingAnimation,
  };

  return (
    <motion.div
      className={className}
      animate={animations[variant]}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        cursor: onClick ? "pointer" : "default",
        position: "relative",
        width: size,
        height: size,
      }}
    >
      <Image
        src="/images/ducks.png"
        alt="Two cute ducks"
        width={size}
        height={size}
        style={{
          borderRadius: "50%",
          objectFit: "cover",
        }}
        priority
      />

      {/* Party Hats Overlay for Two Ducks */}
      {showPartyHat && (
        <svg
          style={{
            position: "absolute",
            top: "-15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: size * 0.9,
            height: size * 0.6,
            pointerEvents: "none",
          }}
          viewBox="0 0 180 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left Duck Hat */}
          <g transform="translate(0, 0)">
            {/* Hat cone */}
            <path
              d="M 50 10 L 20 60 L 80 60 Z"
              fill="#FF69B4"
              stroke="#FF1493"
              strokeWidth="2"
            />
            {/* Hat stripes */}
            <path d="M 50 10 L 30 50 L 40 50 Z" fill="#4169E1" opacity="0.8" />
            <path d="M 50 10 L 60 50 L 70 50 Z" fill="#4169E1" opacity="0.8" />
            {/* Hat pom-pom */}
            <circle
              cx="50"
              cy="10"
              r="8"
              fill="#FFD700"
              stroke="#FFA500"
              strokeWidth="1"
            />
            {/* Hat band */}
            <rect x="20" y="58" width="60" height="5" fill="#FFD700" rx="2" />
            {/* Confetti dots on hat */}
            <circle cx="40" cy="35" r="2" fill="#FFEB3B" />
            <circle cx="60" cy="30" r="2" fill="#4CAF50" />
            <circle cx="35" cy="45" r="2" fill="#9C27B0" />
            <circle cx="65" cy="45" r="2" fill="#FF5722" />
          </g>

          {/* Right Duck Hat */}
          <g transform="translate(60, 0)">
            {/* Hat cone */}
            <path
              d="M 70 10 L 40 60 L 100 60 Z"
              fill="#4169E1"
              stroke="#1E90FF"
              strokeWidth="2"
            />
            {/* Hat stripes */}
            <path d="M 70 10 L 50 50 L 60 50 Z" fill="#FF69B4" opacity="0.8" />
            <path d="M 70 10 L 80 50 L 90 50 Z" fill="#FF69B4" opacity="0.8" />
            {/* Hat pom-pom */}
            <circle
              cx="70"
              cy="10"
              r="8"
              fill="#FFD700"
              stroke="#FFA500"
              strokeWidth="1"
            />
            {/* Hat band */}
            <rect x="40" y="58" width="60" height="5" fill="#FFD700" rx="2" />
            {/* Confetti dots on hat */}
            <circle cx="60" cy="35" r="2" fill="#FFEB3B" />
            <circle cx="80" cy="30" r="2" fill="#4CAF50" />
            <circle cx="55" cy="45" r="2" fill="#9C27B0" />
            <circle cx="85" cy="45" r="2" fill="#FF5722" />
          </g>
        </svg>
      )}

      {/* Water ripples for swimming variant */}
      {variant === "swimming" && (
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: size * 1.4,
            height: size * 0.3,
            background:
              "radial-gradient(ellipse at center, rgba(168, 218, 220, 0.4) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(2px)",
          }}
        />
      )}

      {/* Sitting on lily pad */}
      {variant === "sitting" && (
        <div
          style={{
            position: "absolute",
            bottom: "-5%",
            left: "50%",
            transform: "translateX(-50%)",
            width: size * 1.3,
            height: size * 0.4,
            background:
              "radial-gradient(ellipse at center, rgba(181, 214, 178, 0.7) 0%, rgba(181, 214, 178, 0.3) 100%)",
            borderRadius: "50%",
            filter: "blur(3px)",
          }}
        />
      )}
    </motion.div>
  );
}
