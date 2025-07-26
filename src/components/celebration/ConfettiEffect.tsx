"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiEffectProps {
  trigger?: boolean;
  duration?: number;
  particleCount?: number;
}

export default function ConfettiEffect({
  trigger = false,
  duration = 3000,
  particleCount = 50
}: ConfettiEffectProps) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    delay: number;
    duration: number;
    type: number;
  }>>([]);

  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        type: i % 5
      }));
      setParticles(newParticles);

      const timeout = setTimeout(() => {
        setParticles([]);
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [trigger, duration, particleCount]);

  return (
    <AnimatePresence>
      {particles.length > 0 && (
        <div className="confetti-container">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className={`confetti confetti-${particle.type}`}
              initial={{ 
                x: `${particle.x}vw`,
                y: "-10vh",
                rotate: 0
              }}
              animate={{ 
                y: "110vh",
                rotate: 720
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: "linear"
              }}
              style={{
                left: `${particle.x}%`
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}