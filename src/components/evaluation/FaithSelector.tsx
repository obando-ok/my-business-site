"use client";

import { motion } from "framer-motion";
import { CheckCircle, BookOpen, Cross, Heart, Moon, Star, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const FAITH_OPTIONS = [
  { 
    label: "Islam", 
    description: "Daily structure, prayer, purpose.",
    icon: <Moon className="h-5 w-5" />,
    color: "from-emerald-500/20 to-emerald-500/5" 
  },
  { 
    label: "Christianity", 
    description: "Grace, discipline, and faith.",
    icon: <Cross className="h-5 w-5" />,
    color: "from-blue-500/20 to-blue-500/5"
  },
  { 
    label: "Judaism", 
    description: "Tradition, identity, spiritual rhythm.",
    icon: <Star className="h-5 w-5" />,
    color: "from-amber-500/20 to-amber-500/5"
  },
  { 
    label: "Spiritual", 
    description: "Open path, introspection, mindfulness.",
    icon: <Sun className="h-5 w-5" />,
    color: "from-purple-500/20 to-purple-500/5"
  },
  { 
    label: "Prefer not to say", 
    description: "Keep your beliefs personal.",
    icon: <Heart className="h-5 w-5" />,
    color: "from-gray-500/20 to-gray-500/5"
  },
];

interface FaithSelectorProps {
  value: string;
  onSelect: (val: string) => void;
}

export default function FaithSelector({ value, onSelect }: FaithSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleKey = (e: React.KeyboardEvent<HTMLButtonElement>, faith: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(faith);
    }
  };

  return (
    <section className="space-y-8" ref={containerRef}>
      {/* Heading */}
      <div className="text-center space-y-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-3"
        >
          <BookOpen className="h-6 w-6 text-primary" />
        </motion.div>
        
        <h2 className="text-2xl font-bold tracking-tight">
          Choose Your Faith or Belief System
        </h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          This is optional, but helps us tailor spiritual alignment with your daily journey.
        </p>
      </div>

      {/* Grid of options */}
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        role="radiogroup"
        aria-label="Faith options"
      >
        {FAITH_OPTIONS.map(({ label, description, icon, color }) => {
          const selected = value === label;
          const isHovered = hoveredOption === label;

          return (
            <motion.button
              key={label}
              type="button"
              onClick={() => onSelect(label)}
              onKeyDown={(e) => handleKey(e, label)}
              onMouseEnter={() => setHoveredOption(label)}
              onMouseLeave={() => setHoveredOption(null)}
              whileTap={{ scale: 0.98 }}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={cn(
                "relative w-full text-left rounded-xl border p-4 shadow-sm",
                "transition-all duration-200 select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                selected
                  ? "bg-primary text-primary-foreground border-primary shadow-lg"
                  : "bg-muted/50 text-foreground border-border hover:border-primary/60 hover:shadow-md"
              )}
              role="radio"
              aria-checked={selected}
              aria-label={label}
              tabIndex={0}
            >
              {/* Background gradient */}
              <div className={cn(
                "absolute inset-0 rounded-xl bg-gradient-to-br opacity-30",
                selected ? "from-primary/30 to-primary/10" : color
              )} />

              {/* Icon if selected */}
              {selected && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-3 right-3 z-10"
                >
                  <CheckCircle className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
                </motion.div>
              )}

              <div className="flex flex-col gap-3 relative z-10">
                <motion.div 
                  animate={{ 
                    scale: selected || isHovered ? 1.1 : 1,
                    y: selected ? -2 : 0
                  }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "text-lg",
                    selected ? "text-primary-foreground" : "text-primary"
                  )}
                >
                  {icon}
                </motion.div>
                
                <div className="space-y-1">
                  <span className="text-base font-semibold block">{label}</span>
                  <span className={cn(
                    "text-sm leading-snug block",
                    selected ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}>
                    {description}
                  </span>
                </div>
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