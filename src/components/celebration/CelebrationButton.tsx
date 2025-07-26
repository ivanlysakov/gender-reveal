"use client";

import { motion } from "framer-motion";
import { ReactNode, MouseEvent } from "react";

interface CelebrationButtonProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  variant?: "gradient" | "pink" | "blue" | "gold";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  showSparkle?: boolean;
}

export default function CelebrationButton({
  children,
  onClick,
  variant = "gradient",
  size = "md",
  type = "button",
  disabled = false,
  className = "",
  showSparkle = true
}: CelebrationButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const variantClasses = {
    gradient: "celebration-button",
    pink: "bg-[#FFB6D9] hover:bg-[#FF9FC7] text-white",
    blue: "bg-[#B6E5FF] hover:bg-[#93D9FF] text-white",
    gold: "bg-[#FFD700] hover:bg-[#FFC700] text-white"
  };

  const baseClasses = variant === "gradient" 
    ? "" 
    : "rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variant === "gradient" ? variantClasses[variant] : `${baseClasses} ${variantClasses[variant]}`}
        ${sizeClasses[size]}
        ${className}
        relative
        overflow-hidden
        disabled:opacity-60
        disabled:cursor-not-allowed
        disabled:hover:translate-y-0
      `}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {showSparkle && (
          <motion.span
            className="star-decoration"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨
          </motion.span>
        )}
      </span>
      
      {/* Animated background effect */}
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        whileHover={{ opacity: 0.2 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}