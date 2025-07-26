"use client";

import { motion } from "framer-motion";

export default function Bunting() {
  return (
    <div className="bunting-container">
      <div className="bunting-string" />
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="bunting-flag"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            delay: i * 0.1,
            type: "spring",
            stiffness: 100
          }}
        />
      ))}
    </div>
  );
}