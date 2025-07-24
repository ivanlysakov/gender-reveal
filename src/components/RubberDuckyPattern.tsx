"use client";

import { motion } from "framer-motion";
import DuckMascot from "./DuckMascot";

interface RubberDuckyPatternProps {
  density?: "low" | "medium" | "high";
  animated?: boolean;
}

export default function RubberDuckyPattern({ 
  density = "medium", 
  animated = true 
}: RubberDuckyPatternProps) {
  const duckCounts = {
    low: 3,
    medium: 5,
    high: 8,
  };

  const ducks = Array.from({ length: duckCounts[density] }, (_, i) => ({
    id: i,
    x: Math.random() * 90 + 5,
    y: Math.random() * 90 + 5,
    size: Math.random() * 40 + 60,
    delay: Math.random() * 5,
    duration: Math.random() * 20 + 20,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {ducks.map((duck) => (
        <motion.div
          key={duck.id}
          className="absolute"
          style={{
            left: `${duck.x}%`,
            top: `${duck.y}%`,
          }}
          animate={animated ? {
            y: [0, -20, 0],
            rotate: [-5, 5, -5],
          } : {}}
          transition={{
            duration: duck.duration,
            delay: duck.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <DuckMascot variant="floating" size={duck.size} />
        </motion.div>
      ))}
    </div>
  );
}