"use client";

import { motion } from "framer-motion";

interface CelebrationTextProps {
  text: string;
  className?: string;
  variant?: "heading" | "subheading" | "body" | "question";
  gradient?: boolean;
  animate?: boolean;
}

export default function CelebrationText({
  text,
  className = "",
  variant = "heading",
  gradient = true,
  animate = true
}: CelebrationTextProps) {
  const variantClasses = {
    heading: "text-5xl md:text-6xl lg:text-7xl font-bold celebration-heading",
    subheading: "text-3xl md:text-4xl font-semibold celebration-heading",
    body: "text-lg md:text-xl celebration-text",
    question: "text-6xl md:text-7xl lg:text-8xl font-bold celebration-heading"
  };

  const textElement = gradient && variant !== "body" ? (
    <span className="bg-gradient-to-r from-[#FFB6D9] via-[#E0B6FF] to-[#B6E5FF] bg-clip-text text-transparent">
      {text}
    </span>
  ) : (
    text
  );

  if (!animate) {
    return (
      <div className={`${variantClasses[variant]} ${className}`}>
        {textElement}
      </div>
    );
  }

  // Animated version with letter-by-letter reveal
  const letters = text.split("");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: variant === "question" ? 0.1 : 0.05,
        delayChildren: 0.2
      }
    }
  };

  const letterAnimation = {
    hidden: {
      opacity: 0,
      y: variant === "question" ? 50 : 20,
      scale: variant === "question" ? 0 : 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: variant === "question" ? 10 : 12,
        stiffness: variant === "question" ? 100 : 150
      }
    }
  };

  return (
    <motion.div
      className={`${variantClasses[variant]} ${className} flex flex-wrap justify-center`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {gradient && variant !== "body" ? (
        <span className="bg-gradient-to-r from-[#FFB6D9] via-[#E0B6FF] to-[#B6E5FF] bg-clip-text text-transparent">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              variants={letterAnimation}
              className={`inline-block ${letter === " " ? "w-2" : ""} ${
                variant === "question" ? "question-mark-float" : ""
              }`}
              style={variant === "question" && (letter === "?" || letter === "!") 
                ? { fontSize: "1.2em" } 
                : {}
              }
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ) : (
        letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={letterAnimation}
            className={`inline-block ${letter === " " ? "w-2" : ""}`}
          >
            {letter}
          </motion.span>
        ))
      )}
    </motion.div>
  );
}