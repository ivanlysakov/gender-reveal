"use client";

import { motion } from "framer-motion";

export default function AnimatedBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Pink blob */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(251, 207, 232, 0.4) 0%, rgba(244, 114, 182, 0.2) 50%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ top: "10%", left: "-10%" }}
      />

      {/* Blue blob */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(191, 219, 254, 0.4) 0%, rgba(96, 165, 250, 0.2) 50%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{
          x: [0, -150, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ top: "50%", right: "-15%" }}
      />

      {/* Purple blob */}
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(221, 214, 254, 0.4) 0%, rgba(167, 139, 250, 0.2) 50%, transparent 70%)",
          filter: "blur(45px)",
        }}
        animate={{
          x: [0, 120, 0],
          y: [0, 80, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ bottom: "20%", left: "10%" }}
      />

      {/* Teal blob */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(153, 246, 228, 0.3) 0%, rgba(45, 212, 191, 0.15) 50%, transparent 70%)",
          filter: "blur(35px)",
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ top: "30%", left: "40%" }}
      />
    </div>
  );
}