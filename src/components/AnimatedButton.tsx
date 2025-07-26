"use client";

import { motion } from "framer-motion";
import { ReactNode, MouseEvent } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary" | "gradient";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function AnimatedButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false
}: AnimatedButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700",
    secondary: "bg-white text-purple-600 border-2 border-purple-300 hover:border-purple-400 hover:bg-purple-50",
    gradient: "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white hover:from-blue-500 hover:via-purple-600 hover:to-pink-600"
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        font-semibold
        rounded-full
        shadow-lg
        hover:shadow-xl
        transition-all
        duration-300
        overflow-hidden
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}