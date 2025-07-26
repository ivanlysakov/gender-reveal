"use client";

import { motion } from "framer-motion";

interface OrganicTextProps {
  text: string;
  className?: string;
  variant?: "heading" | "subheading" | "body";
  gradient?: boolean;
}

export default function OrganicText({
  text,
  className = "",
  variant = "heading",
  gradient = false
}: OrganicTextProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const variantClasses = {
    heading: "text-4xl md:text-6xl lg:text-7xl font-bold organic-heading",
    subheading: "text-2xl md:text-3xl font-semibold organic-heading",
    body: "text-lg md:text-xl organic-text"
  };

  const gradientClass = gradient
    ? "bg-gradient-to-r from-[#87A96B] via-[#8A9A5B] to-[#6B8E23] bg-clip-text text-transparent"
    : "";

  return (
    <motion.div
      className={`${variantClasses[variant]} ${gradientClass} ${className} flex flex-wrap justify-center`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-2"
          style={{ transformOrigin: "bottom" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}