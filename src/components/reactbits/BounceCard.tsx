"use client";

import React from "react";
import { motion } from "framer-motion";

interface BounceCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function BounceCard({
  children,
  className = "",
  delay = 0,
}: BounceCardProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay,
      }}
      whileHover={{
        y: -8,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10,
        },
      }}
    >
      <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-blue-500/10" />
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
}