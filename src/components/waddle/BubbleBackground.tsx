"use client";

import { useEffect, useState } from "react";

export default function BubbleBackground() {
  const [bubbles, setBubbles] = useState<number[]>([]);

  useEffect(() => {
    setBubbles([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  }, []);

  return (
    <div className="bubble-container">
      {bubbles.map((bubble) => (
        <div
          key={bubble}
          className="bubble"
          style={{
            animationDelay: `${bubble * 2}s`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
}