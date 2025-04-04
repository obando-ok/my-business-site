// components/evaluation/FaithSelector.tsx
"use client";

import { motion } from "framer-motion";

const FAITHS = [
  "Islam",
  "Christianity",
  "Judaism",
  "Spiritual",
  "Prefer not to say",
];

interface FaithSelectorProps {
  value: string;
  onSelect: (val: string) => void;
}

export default function FaithSelector({ value, onSelect }: FaithSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Do you follow a particular faith or belief system?
      </h2>

      <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Faith options">
        {FAITHS.map((option) => {
          const isSelected = value === option;

          return (
            <motion.label
              key={option}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.25 }}
              className={`block p-4 rounded-md border cursor-pointer text-sm font-medium transition-all focus-within:ring-2 focus-within:ring-primary outline-none ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-background text-foreground border-border hover:bg-accent"
              }`}
            >
              <input
                type="radio"
                name="faith"
                value={option}
                checked={isSelected}
                onChange={() => onSelect(option)}
                className="sr-only"
                aria-checked={isSelected}
                aria-label={option}
              />
              {option}
            </motion.label>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-2">
        This helps personalize your content — your choice is confidential.
      </p>
    </div>
  );
}
