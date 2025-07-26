"use client";

import { useEffect, useState } from "react";

interface Bubble {
  id: number;
  size: number;
  x: number;
  y: number;
  opacity: number;
  animationDuration: number;
}

export default function WatercolorBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // Create static and animated bubbles
    const staticBubbles: Bubble[] = [
      { id: 1, size: 120, x: 5, y: 10, opacity: 0.3, animationDuration: 0 },
      { id: 2, size: 80, x: 15, y: 5, opacity: 0.2, animationDuration: 0 },
      { id: 3, size: 150, x: 85, y: 15, opacity: 0.25, animationDuration: 0 },
      { id: 4, size: 60, x: 90, y: 8, opacity: 0.15, animationDuration: 0 },
      { id: 5, size: 200, x: -5, y: 80, opacity: 0.3, animationDuration: 0 },
      { id: 6, size: 100, x: 95, y: 85, opacity: 0.2, animationDuration: 0 },
      { id: 7, size: 140, x: 10, y: 90, opacity: 0.25, animationDuration: 0 },
      { id: 8, size: 90, x: 50, y: 95, opacity: 0.2, animationDuration: 0 },
      // Floating bubbles
      { id: 9, size: 70, x: 20, y: 50, opacity: 0.2, animationDuration: 15 },
      { id: 10, size: 50, x: 70, y: 40, opacity: 0.15, animationDuration: 20 },
      { id: 11, size: 85, x: 40, y: 60, opacity: 0.25, animationDuration: 18 },
      { id: 12, size: 65, x: 80, y: 55, opacity: 0.2, animationDuration: 22 },
    ];
    
    setBubbles(staticBubbles);
  }, []);

  return (
    <div className="watercolor-bubbles">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="watercolor-bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            opacity: bubble.opacity,
            animationDuration: bubble.animationDuration ? `${bubble.animationDuration}s` : 'none',
            animationDelay: `${bubble.id * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}