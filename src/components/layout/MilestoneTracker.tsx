"use client";

import { motion } from "framer-motion";

const milestones = [
  { days: 3, label: "Initial Momentum" },
  { days: 7, label: "One Full Week" },
  { days: 14, label: "Solid Foundation" },
  { days: 30, label: "Built Like a Wall" },
  { days: 60, label: "Disciplined Streak" },
  { days: 90, label: "Master Consistency" },
];

export default function MilestoneTracker({ streak }: { streak: number }) {
  return (
    <div className="mt-12 space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Milestones Unlocked</h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {milestones.map((milestone) => {
          const unlocked = streak >= milestone.days;
          return (
            <motion.li
              key={milestone.days}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: unlocked ? 1 : 0.3, y: 0 }}
              transition={{ duration: 0.5, delay: milestone.days * 0.01 }}
              className={`p-4 rounded-lg border text-sm font-medium transition-colors duration-300 ${
                unlocked
                  ? "bg-accent/10 border-accent text-accent"
                  : "bg-muted border-border text-muted-foreground"
              }`}
            >
              <span className="block text-xs font-semibold mb-1 text-muted-foreground uppercase tracking-wide">
                {milestone.days} Days
              </span>
              {milestone.label}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
