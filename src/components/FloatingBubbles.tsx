"use client";

import { motion } from "framer-motion";

export default function FloatingBubbles() {
  const bubbles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 20,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15,
    x: Math.random() * 100,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(160, 214, 208, 0.4))",
            boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.5)",
          }}
          initial={{ bottom: -100, opacity: 0 }}
          animate={{
            bottom: ["0%", "110%"],
            opacity: [0, 0.8, 0.8, 0],
            x: [
              0,
              Math.sin(bubble.id) * 30,
              Math.sin(bubble.id + 1) * -30,
              Math.sin(bubble.id + 2) * 20,
              0,
            ],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}