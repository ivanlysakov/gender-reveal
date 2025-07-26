"use client";

import { motion } from "framer-motion";

interface BalloonDecorationProps {
  variant?: "pink" | "blue" | "mixed";
  position?: "left" | "right" | "center";
  size?: "small" | "medium" | "large";
}

export default function BalloonDecoration({
  variant = "mixed",
  position = "center",
  size = "medium"
}: BalloonDecorationProps) {
  const sizeClasses = {
    small: "w-16 h-20",
    medium: "w-20 h-24",
    large: "w-24 h-32"
  };

  const positionClasses = {
    left: "justify-start",
    right: "justify-end",
    center: "justify-center"
  };

  const renderBalloon = (color: "pink" | "blue", delay: number = 0) => (
    <motion.div
      className={`balloon ${color === "pink" ? "balloon-pink" : "balloon-blue"} ${sizeClasses[size]} relative`}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        delay,
        duration: 1,
        ease: "easeOut"
      }}
    >
      {/* Balloon string */}
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-400" 
        style={{ height: size === "small" ? "40px" : size === "medium" ? "60px" : "80px" }}
      />
      
      {/* Balloon shine */}
      <div className="absolute top-4 right-4 w-4 h-6 bg-white opacity-30 rounded-full blur-sm transform rotate-45" />
    </motion.div>
  );

  return (
    <div className={`flex gap-4 ${positionClasses[position]}`}>
      {variant === "pink" && renderBalloon("pink")}
      {variant === "blue" && renderBalloon("blue")}
      {variant === "mixed" && (
        <>
          {renderBalloon("pink", 0)}
          {renderBalloon("blue", 0.2)}
          {renderBalloon("pink", 0.4)}
        </>
      )}
    </div>
  );
}