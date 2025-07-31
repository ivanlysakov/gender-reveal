"use client";

import { motion } from "framer-motion";

export default function PartyBalloons() {
  const balloons = [
    { color: "var(--party-pink)", x: "10%", delay: 0 },
    { color: "var(--party-blue)", x: "25%", delay: 0.5 },
    { color: "var(--party-pink)", x: "40%", delay: 1 },
    { color: "var(--party-blue)", x: "60%", delay: 1.5 },
    { color: "var(--party-pink)", x: "75%", delay: 2 },
    { color: "var(--party-blue)", x: "90%", delay: 2.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {balloons.map((balloon, index) => (
        <motion.div
          key={index}
          className="absolute bottom-0"
          style={{ left: balloon.x }}
          initial={{ y: "100vh" }}
          animate={{ y: "-20vh" }}
          transition={{
            duration: 15,
            delay: balloon.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="relative">
            {/* Balloon */}
            <div
              className="w-12 h-14 rounded-full relative"
              style={{
                background: balloon.color,
                boxShadow: `inset -5px -5px 0 rgba(0, 0, 0, 0.1)`,
              }}
            >
              {/* Balloon shine */}
              <div className="absolute top-2 left-2 w-3 h-3 bg-white opacity-50 rounded-full" />
            </div>
            {/* String */}
            <div
              className="absolute top-14 left-1/2 transform -translate-x-1/2 w-px h-20"
              style={{ background: "#333" }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}