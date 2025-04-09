"use client";

import { motion } from "framer-motion";

const shapes = [
  { id: 1, color: "from-amber-500/20 to-orange-600/20", size: "w-64 h-64" },
  { id: 2, color: "from-orange-500/15 to-amber-600/15", size: "w-48 h-48" },
  { id: 3, color: "from-amber-600/10 to-orange-700/10", size: "w-32 h-32" }
];

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute bg-gradient-to-br ${shape.color} ${shape.size} rounded-full blur-2xl`}
          initial={{
            x: Math.random() * 100 - 50 + "%",
            y: Math.random() * 100 - 50 + "%",
          }}
          animate={{
            x: [0, Math.random() * 100 - 50 + "%", 0],
            y: [0, Math.random() * 100 - 50 + "%", 0],
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}