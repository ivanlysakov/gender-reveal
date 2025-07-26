"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface OrganicCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "sage" | "rose" | "sky";
  shape?: "blob" | "leaf" | "flower";
}

export default function OrganicCard({
  children,
  className = "",
  variant = "default",
  shape = "blob"
}: OrganicCardProps) {
  const shapeClasses = {
    blob: "organic-blob",
    leaf: "organic-shape",
    flower: "organic-shape-alt"
  };

  const variantClasses = {
    default: "bg-[#FFF8E7] border-[#F5E6D3]",
    sage: "bg-gradient-to-br from-[#87A96B]/10 to-[#8A9A5B]/10 border-[#87A96B]/30",
    rose: "bg-gradient-to-br from-[#E8B4B8]/10 to-[#FFDAB9]/10 border-[#E8B4B8]/30",
    sky: "bg-gradient-to-br from-[#B6D7E4]/10 to-[#B8A9C9]/10 border-[#B6D7E4]/30"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`
        organic-card
        ${shapeClasses[shape]}
        ${variantClasses[variant]}
        ${className}
        p-8 md:p-10
        border-2
        relative
      `}
    >
      {/* Botanical decorations */}
      <div className="botanical-decoration top-4 right-4 text-6xl text-[#87A96B]">
        🌿
      </div>
      <div className="botanical-decoration bottom-4 left-4 text-4xl text-[#E8B4B8]">
        🌸
      </div>
      
      {children}
    </motion.div>
  );
}