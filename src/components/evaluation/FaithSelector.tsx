
"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const FAITH_OPTIONS = [
  { label: "Islam", description: "Daily structure, prayer, purpose." },
  { label: "Christianity", description: "Grace, discipline, and faith." },
  { label: "Judaism", description: "Tradition, identity, spiritual rhythm." },
  { label: "Spiritual", description: "Open path, introspection, mindfulness." },
  { label: "Prefer not to say", description: "Keep your beliefs personal." },
];

interface FaithSelectorProps {
  value: string;
  onSelect: (val: string) => void;
}

export default function FaithSelector({ value, onSelect }: FaithSelectorProps) {
  return (
    <section className="space-y-8">
      {/* Heading */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Choose Your Faith or Belief System
        </h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          This is optional, but helps us tailor spiritual alignment with your daily journey.
        </p>
      </div>

      {/* Grid of options */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        role="radiogroup"
        aria-label="Faith options"
      >
        {FAITH_OPTIONS.map(({ label, description }) => {
          const selected = value === label;

          return (
            <motion.button
              key={label}
              type="button"
              onClick={() => onSelect(label)}
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className={`
                relative w-full text-left rounded-xl border px-5 py-4 shadow-sm
                transition-all duration-200 select-none group
                ${
                  selected
                    ? "bg-primary text-primary-foreground border-primary shadow-lg"
                    : "bg-muted text-foreground border-border hover:border-primary/60 hover:shadow-md"
                }
              `}
              role="radio"
              aria-checked={selected}
              aria-label={label}
            >
              {/* Icon if selected */}
              {selected && (
                <CheckCircle className="absolute top-3 right-3 h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
              )}

              <div className="flex flex-col gap-1">
                <span className="text-base font-semibold">{label}</span>
                <span className="text-sm text-muted-foreground leading-snug">
                  {description}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Your selection stays private. It only influences your internal plan.
      </p>
    </section>
  );
}
