"use client";

import { motion } from "framer-motion";
import { Check, Shield, BookOpen, Hammer, Zap, Brain, Rocket } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const TRAITS = [
  {
    id: "discipline",
    name: "Discipline",
    description: "Consistent action despite motivation levels",
    icon: <Hammer className="h-5 w-5" />,
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    id: "leadership",
    name: "Leadership",
    description: "Inspire others through example and vision",
    icon: <Rocket className="h-5 w-5" />,
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    id: "stoicism",
    name: "Stoicism",
    description: "Emotional resilience through adversity",
    icon: <Shield className="h-5 w-5" />,
    color: "from-amber-500/20 to-amber-500/5"
  },
  {
    id: "confidence",
    name: "Confidence",
    description: "Faith in yourself and your abilities",
    icon: <Zap className="h-5 w-5" />,
    color: "from-green-500/20 to-green-500/5"
  },
  {
    id: "resilience",
    name: "Resilience",
    description: "Ability to recover from setbacks",
    icon: <BookOpen className="h-5 w-5" />,
    color: "from-red-500/20 to-red-500/5"
  },
  {
    id: "focus",
    name: "Focus",
    description: "Deep concentration and attention",
    icon: <Brain className="h-5 w-5" />,
    color: "from-orange-500/20 to-orange-500/5"
  },
];

interface TraitSelectorProps {
  selected: string[];
  onToggle: (trait: string) => void;
}

export default function TraitSelector({ selected, onToggle }: TraitSelectorProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const handleKeyToggle = (e: React.KeyboardEvent<HTMLButtonElement>, trait: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle(trait);
    }
  };

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {TRAITS.map((trait) => {
          const isActive = selected.includes(trait.name);
          const isHovered = hovered === trait.id;

          return (
            <motion.button
              key={trait.id}
              type="button"
              onClick={() => onToggle(trait.name)}
              onKeyDown={(e) => handleKeyToggle(e, trait.name)}
              onMouseEnter={() => setHovered(trait.id)}
              onMouseLeave={() => setHovered(null)}
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={cn(
                "group relative flex flex-col items-center p-4 h-auto rounded-lg border transition-all duration-150 text-center select-none overflow-hidden",
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-lg"
                  : "bg-muted/50 text-foreground border-border hover:border-primary/60 hover:shadow-md"
              )}
              aria-pressed={isActive}
              aria-label={`Toggle trait: ${trait.name}`}
              tabIndex={0}
            >
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-30",
                isActive ? "from-primary/30 to-primary/10" : trait.color
              )} />
              
              <motion.div 
                className="mb-3 text-lg relative z-10"
                animate={{ 
                  scale: isActive || isHovered ? 1.1 : 1,
                  y: isActive ? -2 : 0
                }}
                transition={{ duration: 0.2 }}
              >
                {trait.icon}
              </motion.div>
              
              <h3 className="font-medium text-base relative z-10">{trait.name}</h3>
              
              <p className={cn(
                "text-xs mt-1.5 line-clamp-2 relative z-10",
                isActive ? "text-primary-foreground/80" : "text-muted-foreground"
              )}>
                {trait.description}
              </p>

              {isActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-2 right-2 z-10"
                >
                  <Check
                    className="w-4 h-4 text-primary-foreground"
                    strokeWidth={3}
                  />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-xs text-muted-foreground">
          Selected: <span className="font-medium text-foreground">{selected.length}/6</span> traits.
          We'll use these to tailor your journey.
        </p>
      </motion.div>
    </div>
  );
}