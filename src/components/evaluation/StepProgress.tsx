// components/evaluation/StepProgress.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StepProgressProps {
  percentage: number;
  milestones?: number;
}

export default function StepProgress({ percentage, milestones = 5 }: StepProgressProps) {
  // Create milestone percentages
  const milestonePoints = Array.from({ length: milestones }, (_, i) => 
    Math.round((i + 1) * (100 / milestones))
  );

  return (
    <div className="space-y-2">
      <div className="w-full h-2 bg-border rounded-full overflow-hidden relative" aria-label="Progress bar">
        {/* Track percentage */}
        <motion.div
          className="h-full bg-primary relative"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            mass: 0.8
          }}
        >
          {/* Animated pulse effect at the end of the progress bar */}
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-4 bg-primary/20"
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              width: ["0.5rem", "1rem", "0.5rem"] 
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>
        
        {/* Milestone markers */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-[1px]">
          {milestonePoints.slice(0, -1).map((point, i) => (
            <div 
              key={i}
              className={cn(
                "w-1 h-1 rounded-full",
                percentage >= point 
                  ? "bg-primary-foreground" 
                  : "bg-muted-foreground/40"
              )}
            />
          ))}
        </div>
      </div>
      
      {/* Percentage text */}
      <div className="flex justify-between text-xs font-medium">
        <span className="text-muted-foreground">Start</span>
        <span className={percentage === 100 ? "text-primary font-semibold" : "text-foreground"}>
          {percentage}% Complete
        </span>
      </div>
    </div>
  );
}
