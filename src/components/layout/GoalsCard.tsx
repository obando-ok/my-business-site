"use client";

import { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialGoals = [
  { id: 1, name: "Complete 5 reflections", completed: false },
  { id: 2, name: "Maintain 3-day streak", completed: false },
  { id: 3, name: "Focus on discipline", completed: false },
];

export default function GoalsCard() {
  const [goals, setGoals] = useState(initialGoals);

  const toggleGoal = (id: number) => {
    setGoals(prev =>
      prev.map(goal =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const completedCount = goals.filter(g => g.completed).length;
  const progress = (completedCount / goals.length) * 100;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-primary">📈 Weekly Goals</h2>
        <span className="text-sm text-muted-foreground">{completedCount}/{goals.length} completed</span>
      </div>

      <div className="relative w-full h-2 bg-border rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full bg-green-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <ul className="space-y-3 text-sm text-muted-foreground">
        {goals.map(goal => (
          <li
            key={goal.id}
            onClick={() => toggleGoal(goal.id)}
            className="flex items-center gap-3 cursor-pointer group transition-colors hover:text-foreground"
          >
            <span className="text-lg">
              <AnimatePresence mode="wait">
                {goal.completed ? (
                  <motion.div
                    key="checked"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CheckCircle className="text-green-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="unchecked"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Circle className="text-muted-foreground group-hover:text-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </span>
            <span className={goal.completed ? "line-through text-muted" : ""}>
              {goal.name}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
