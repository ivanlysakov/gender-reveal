"use client";

import { useEffect, useState } from "react";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function SoapBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // Generate initial bubbles spread across the screen
    const initialBubbles: Bubble[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5, // 5-95% to avoid edge overflow
      y: Math.random() * 100, // Random starting position
      size: Math.random() * 40 + 40, // 40-80px
      duration: Math.random() * 20 + 20, // 20-40s
      delay: Math.random() * 5, // 0-5s delay
    }));
    setBubbles(initialBubbles);

    // Add new bubbles periodically
    const interval = setInterval(() => {
      setBubbles((prev) => {
        const newBubble = {
          id: Date.now(),
          x: Math.random() * 90 + 5,
          y: -10, // Start just below viewport
          size: Math.random() * 40 + 40,
          duration: Math.random() * 20 + 20,
          delay: 0,
        };
        // Keep only last 11 bubbles and add new one
        return [...prev.slice(-11), newBubble];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute soap-bubble"
          style={{
            left: `${bubble.x}%`,
            bottom: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
          }}
        >
          {/* Main bubble body */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 15%, rgba(135, 206, 235, 0.3) 30%, rgba(255, 182, 193, 0.25) 50%, rgba(255, 217, 61, 0.2) 70%, rgba(135, 206, 235, 0.15) 85%, transparent 100%)',
              boxShadow: `inset -${bubble.size * 0.15}px -${bubble.size * 0.15}px ${bubble.size * 0.3}px rgba(255, 255, 255, 0.25), inset ${bubble.size * 0.1}px ${bubble.size * 0.1}px ${bubble.size * 0.2}px rgba(135, 206, 235, 0.35), 0 0 ${bubble.size * 0.5}px rgba(255, 255, 255, 0.3)`,
              opacity: 0.8,
            }}
          />
          
          {/* Primary highlight */}
          <div
            className="absolute rounded-full"
            style={{
              top: '15%',
              left: '20%',
              width: '35%',
              height: '35%',
              background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.6) 40%, transparent 70%)',
              filter: 'blur(1px)',
            }}
          />
          
          {/* Secondary highlight */}
          <div
            className="absolute rounded-full"
            style={{
              bottom: '20%',
              right: '25%',
              width: '20%',
              height: '20%',
              background: 'radial-gradient(circle at center, rgba(255, 182, 193, 0.7) 0%, transparent 70%)',
              filter: 'blur(2px)',
            }}
          />
          
          {/* Tertiary shimmer */}
          <div
            className="absolute rounded-full bubble-shimmer"
            style={{
              top: '40%',
              left: '50%',
              width: '15%',
              height: '15%',
              background: 'radial-gradient(circle at center, rgba(255, 217, 61, 0.6) 0%, transparent 60%)',
              filter: 'blur(1.5px)',
            }}
          />
        </div>
      ))}
    </div>
  );
}