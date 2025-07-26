"use client";

import { motion } from "framer-motion";
import { ReactNode, MouseEvent } from "react";

interface OrganicButtonProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  variant?: "sage" | "rose" | "earth" | "sky";
  size?: "sm" | "md" | "lg";
  shape?: "leaf" | "pill" | "organic";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export default function OrganicButton({
  children,
  onClick,
  variant = "sage",
  size = "md",
  shape = "organic",
  type = "button",
  disabled = false,
  className = ""
}: OrganicButtonProps) {
  const sizeClasses = {
    sm: "px-6 py-3 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg"
  };

  const shapeClasses = {
    leaf: "organic-shape",
    pill: "rounded-full",
    organic: "rounded-[24px_48px_24px_48px]"
  };

  const variantClasses = {
    sage: "bg-[#87A96B] hover:bg-[#8A9A5B] text-[#FFF8E7]",
    rose: "bg-[#E8B4B8] hover:bg-[#FFDAB9] text-white",
    earth: "bg-[#654321] hover:bg-[#36454F] text-[#FAF0E6]",
    sky: "bg-[#B6D7E4] hover:bg-[#B8A9C9] text-[#36454F]"
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        organic-button
        ${sizeClasses[size]}
        ${shapeClasses[shape]}
        ${variantClasses[variant]}
        ${className}
        font-semibold
        tracking-wide
        transition-all
        duration-300
        transform
        hover:scale-105
        active:scale-100
        disabled:opacity-60
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        relative
        overflow-hidden
      `}
      whileHover={{ rotate: [-1, 1, -1, 0] }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}