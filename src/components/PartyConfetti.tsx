"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  shape: "square" | "circle";
}

export default function PartyConfetti({ active = false }: { active?: boolean }) {
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (active) {
      const pieces: ConfettiPiece[] = [];
      const colors = ["#FF69B4", "#4169E1", "#FFD700", "#FFEB3B", "#4CAF50", "#9C27B0"];
      
      for (let i = 0; i < 50; i++) {
        pieces.push({
          id: i,
          x: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 2,
          duration: 3 + Math.random() * 2,
          size: 8 + Math.random() * 8,
          shape: Math.random() > 0.5 ? "square" : "circle"
        });
      }
      
      setConfettiPieces(pieces);
    } else {
      setConfettiPieces([]);
    }
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className={`absolute ${piece.shape === "circle" ? "rounded-full" : ""}`}
          style={{
            left: `${piece.x}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
          }}
          initial={{ y: -100, rotate: 0, opacity: 1 }}
          animate={{ y: "100vh", rotate: 720, opacity: 0 }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}