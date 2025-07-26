"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CelebrationCardProps {
  children: ReactNode;
  className?: string;
  showConfetti?: boolean;
  variant?: "default" | "pink" | "blue" | "gradient";
}

export default function CelebrationCard({
  children,
  className = "",
  showConfetti = false,
  variant = "default"
}: CelebrationCardProps) {
  const variantClasses = {
    default: "celebration-card",
    pink: "celebration-card bg-gradient-to-br from-[#FFEAF4] to-[#FFD6EC]",
    blue: "celebration-card bg-gradient-to-br from-[#E6F4FF] to-[#CCE9FF]",
    gradient: "celebration-card bg-gradient-to-br from-[#FFEAF4] via-white to-[#E6F4FF]"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.4, 0, 0.2, 1],
        scale: { type: "spring", stiffness: 100 }
      }}
      whileHover={{ y: -5 }}
      className={`${variantClasses[variant]} ${className} relative`}
    >
      {showConfetti && (
        <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
          🎊
        </div>
      )}
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#FFB6D9] rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#B6E5FF] rounded-full opacity-5 blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}