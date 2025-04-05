"use client";

import { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialHabits = [
  { id: 1, name: "Meditate 10 min", completed: false },
  { id: 2, name: "Drink 2L water", completed: false },
  { id: 3, name: "Write 1 reflection", completed: false },
];

export default function HabitsCard() {
  const [habits, setHabits] = useState(initialHabits);

  const toggleHabit = (id: number) => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  return (
    <>
      <h2 className="text-lg font-semibold mb-4 text-primary flex items-center gap-2">
        ✅ Today’s Habits
      </h2>

      <ul className="space-y-3 text-sm text-muted-foreground">
        {habits.map(habit => (
          <li
            key={habit.id}
            onClick={() => toggleHabit(habit.id)}
            className="flex items-center gap-3 cursor-pointer group transition-colors hover:text-foreground"
          >
            <span className="text-lg">
              <AnimatePresence mode="wait">
                {habit.completed ? (
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
            <span className={habit.completed ? "line-through text-muted" : ""}>
              {habit.name}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
