"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ModernCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  blur?: boolean;
}

export default function ModernCard({ 
  children, 
  className = "", 
  hover = true,
  gradient = false,
  blur = true
}: ModernCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={hover ? { 
        y: -2,
        transition: { duration: 0.2 }
      } : {}}
      className={`relative ${className}`}
    >
      {/* Background gradient effect */}
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-mint)]/10 to-[var(--soft-blue)]/10 rounded-[30px] blur-2xl" />
      )}
      
      {/* Main card */}
      <div className={`
        relative
        glass-modern
        ${blur ? 'backdrop-blur-xl' : ''}
        p-8
        transition-all
        duration-300
        soft-shadow
        hover:shadow-xl
      `}>
        {children}
      </div>
    </motion.div>
  );
}