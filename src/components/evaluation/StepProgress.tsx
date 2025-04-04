// components/evaluation/StepProgress.tsx
"use client";

import { motion } from "framer-motion";

interface StepProgressProps {
  percentage: number;
}

export default function StepProgress({ percentage }: StepProgressProps) {
  return (
    <div className="w-full h-2 bg-border rounded-full overflow-hidden" aria-label="Progress bar">
      <motion.div
        className="h-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
