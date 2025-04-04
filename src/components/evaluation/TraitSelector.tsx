// components/evaluation/TraitSelector.tsx
"use client";

import { motion } from "framer-motion";

const TRAITS = [
  "Discipline",
  "Leadership",
  "Stoicism",
  "Confidence",
  "Resilience",
  "Focus",
];

interface TraitSelectorProps {
  selected: string[];
  onToggle: (trait: string) => void;
}

export default function TraitSelector({ selected, onToggle }: TraitSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Choose the qualities you'd like to develop:
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {TRAITS.map((trait) => {
          const isActive = selected.includes(trait);

          return (
            <motion.button
              key={trait}
              type="button"
              onClick={() => onToggle(trait)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`px-4 py-2 text-sm rounded-full border text-center font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-background text-foreground border-border hover:bg-accent"
              }`}
              aria-pressed={isActive}
              aria-label={`Toggle trait: ${trait}`}
            >
              {trait}
            </motion.button>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-2">
        Select as many as resonate with your growth goals.
      </p>
    </div>
  );
}
