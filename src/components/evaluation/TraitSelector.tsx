"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

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
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-1">
          Select Your Core Traits
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          These will shape your self-improvement track. Choose what resonates most.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {TRAITS.map((trait) => {
          const isActive = selected.includes(trait);

          return (
            <motion.button
              key={trait}
              type="button"
              onClick={() => onToggle(trait)}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className={`group relative flex items-center justify-center h-20 rounded-lg border text-sm font-semibold transition-all px-3 py-2 text-center select-none
                ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-muted text-foreground border-border hover:border-primary/60 hover:shadow-md"
                }`}
              aria-pressed={isActive}
              aria-label={`Toggle trait: ${trait}`}
            >
              {trait}
              {isActive && (
                <Check
                  className="absolute top-2 right-2 w-4 h-4 text-primary-foreground opacity-80"
                  strokeWidth={3}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          You can choose multiple. We’ll use these to tailor your journey.
        </p>
      </div>
    </div>
  );
}
