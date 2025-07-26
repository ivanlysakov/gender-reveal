"use client";

import { motion } from "framer-motion";

interface DuckPartyTextProps {
  text: string;
  className?: string;
  variant?: "title" | "subtitle" | "question" | "body";
  color?: "yellow" | "pink" | "blue" | "white" | "gradient";
  animate?: boolean;
}

export default function DuckPartyText({
  text,
  className = "",
  variant = "title",
  color = "white",
  animate = true
}: DuckPartyTextProps) {
  const variantClasses = {
    title: "text-4xl md:text-5xl lg:text-6xl font-bold",
    subtitle: "text-2xl md:text-3xl font-semibold",
    question: "text-5xl md:text-6xl lg:text-7xl font-bold",
    body: "text-lg md:text-xl"
  };

  const colorClasses = {
    yellow: "chalk-yellow",
    pink: "chalk-pink",
    blue: "chalk-blue",
    white: "chalk-white",
    gradient: ""
  };

  if (!animate) {
    return (
      <div 
        className={`chalk-text ${variantClasses[variant]} ${colorClasses[color]} ${className}`}
        data-text={text}
      >
        {color === "gradient" ? (
          <span className="bg-gradient-to-r from-[#FF6B9D] via-[#FFD93D] to-[#6BCFFF] bg-clip-text text-transparent">
            {text}
          </span>
        ) : (
          text
        )}
      </div>
    );
  }

  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const word = {
    hidden: {
      opacity: 0,
      y: 50,
      rotate: -10
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      className={`chalk-text ${variantClasses[variant]} ${className} flex flex-wrap justify-center gap-2`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((w, index) => (
        <motion.span
          key={index}
          variants={word}
          className={colorClasses[color]}
          data-text={w}
          style={{
            display: "inline-block",
            transform: variant === "question" ? `rotate(${index % 2 === 0 ? -3 : 3}deg)` : undefined
          }}
        >
          {color === "gradient" ? (
            <span className="bg-gradient-to-r from-[#FF6B9D] via-[#FFD93D] to-[#6BCFFF] bg-clip-text text-transparent">
              {w}
            </span>
          ) : (
            w
          )}
        </motion.span>
      ))}
    </motion.div>
  );
}