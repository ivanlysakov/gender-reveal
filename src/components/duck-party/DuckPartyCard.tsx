"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface DuckPartyCardProps {
  children: ReactNode;
  className?: string;
  showDots?: boolean;
}

export default function DuckPartyCard({
  children,
  className = "",
  showDots = true
}: DuckPartyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ scale: 1.02 }}
      className={`duck-party-card chalk-texture ${className} relative p-8 md:p-12`}
    >
      {showDots && (
        <div className="party-dots">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="party-dot"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}