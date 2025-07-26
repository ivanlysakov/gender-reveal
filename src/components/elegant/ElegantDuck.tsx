"use client";

import { motion } from "framer-motion";

interface ElegantDuckProps {
  variant: "boy" | "girl";
  size?: number;
}

export default function ElegantDuck({ variant, size = 200 }: ElegantDuckProps) {
  return (
    <div className="elegant-duck-container">
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 300 300"
        fill="none"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Duck Shadow */}
        <ellipse cx="150" cy="270" rx="70" ry="15" fill="rgba(0,0,0,0.1)" />
        
        {/* Duck Body */}
        <path
          d="M150 220 C110 220 80 190 80 160 C80 130 90 110 110 100 C120 95 130 93 140 93 C145 93 150 93 155 93 C165 93 175 95 185 100 C205 110 215 130 215 160 C215 190 185 220 150 220Z"
          fill="#FFD966"
          stroke="#E6B84D"
          strokeWidth="2"
        />
        
        {/* Duck Belly highlight */}
        <ellipse cx="150" cy="180" rx="45" ry="35" fill="#FFEB99" opacity="0.7" />
        
        {/* Duck Head */}
        <circle cx="150" cy="120" r="50" fill="#FFD966" stroke="#E6B84D" strokeWidth="2" />
        
        {/* Duck Bill */}
        <path
          d="M110 125 Q100 130 110 135 L125 135 Q120 130 125 125 Z"
          fill="#FFA500"
          stroke="#E69500"
          strokeWidth="1.5"
        />
        
        {/* Duck Eyes */}
        <circle cx="135" cy="115" r="12" fill="white" />
        <circle cx="165" cy="115" r="12" fill="white" />
        <circle cx="137" cy="117" r="8" fill="black" />
        <circle cx="163" cy="117" r="8" fill="black" />
        <circle cx="139" cy="115" r="3" fill="white" />
        <circle cx="165" cy="115" r="3" fill="white" />
        
        {/* Duck Cheeks */}
        <circle cx="105" cy="130" r="10" fill="#FFB3BA" opacity="0.5" />
        <circle cx="195" cy="130" r="10" fill="#FFB3BA" opacity="0.5" />
        
        {/* Wing detail */}
        <path
          d="M185 170 Q200 160 195 190 Q190 200 175 195 Q170 185 175 175"
          fill="#E6B84D"
          opacity="0.5"
        />
        
        {/* Bow or Bow Tie */}
        {variant === "girl" ? (
          // Pink bow for girl
          <g transform="translate(150, 80)">
            {/* Bow center */}
            <rect x="-8" y="-8" width="16" height="16" rx="3" fill="#F4B3C2" />
            {/* Left bow loop */}
            <path
              d="M-8 0 Q-25 -15 -30 0 Q-25 15 -8 0"
              fill="#F4B3C2"
              stroke="#E89CAC"
              strokeWidth="1"
            />
            {/* Right bow loop */}
            <path
              d="M8 0 Q25 -15 30 0 Q25 15 8 0"
              fill="#F4B3C2"
              stroke="#E89CAC"
              strokeWidth="1"
            />
            {/* Bow highlight */}
            <circle cx="0" cy="-2" r="4" fill="white" opacity="0.3" />
          </g>
        ) : (
          // Blue bow tie for boy
          <g transform="translate(150, 160)">
            {/* Bow tie center */}
            <rect x="-10" y="-6" width="20" height="12" rx="2" fill="#5B9BD5" />
            {/* Left bow tie */}
            <path
              d="M-10 0 L-25 -10 L-25 10 Z"
              fill="#A5C4E7"
              stroke="#5B9BD5"
              strokeWidth="1"
            />
            {/* Right bow tie */}
            <path
              d="M10 0 L25 -10 L25 10 Z"
              fill="#A5C4E7"
              stroke="#5B9BD5"
              strokeWidth="1"
            />
            {/* Center detail */}
            <rect x="-3" y="-3" width="6" height="6" rx="1" fill="white" opacity="0.3" />
          </g>
        )}
        
        {/* Water ripples */}
        <ellipse cx="150" cy="260" rx="90" ry="8" fill="#A5C4E7" opacity="0.3" />
        <ellipse cx="150" cy="265" rx="70" ry="5" fill="#A5C4E7" opacity="0.2" />
      </motion.svg>
      <div className="duck-shadow" />
    </div>
  );
}