"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
    >
      <ChevronDown className="h-6 w-6 animate-bounce" />
    </motion.div>
  );
}
