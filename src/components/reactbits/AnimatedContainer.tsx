"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeIn" | "slideUp" | "slideIn" | "scale" | "rotate";
  delay?: number;
  duration?: number;
}

export default function AnimatedContainer({
  children,
  className = "",
  animation = "fadeIn",
  delay = 0,
  duration = 0.5,
}: AnimatedContainerProps) {
  const animations = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slideUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -50 },
    },
    slideIn: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 50 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
    },
    rotate: {
      initial: { opacity: 0, rotate: -10 },
      animate: { opacity: 1, rotate: 0 },
      exit: { opacity: 0, rotate: 10 },
    },
  };

  const selectedAnimation = animations[animation];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        initial={selectedAnimation.initial}
        animate={selectedAnimation.animate}
        exit={selectedAnimation.exit}
        transition={{
          duration,
          delay,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}