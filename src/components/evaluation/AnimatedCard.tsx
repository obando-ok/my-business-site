"use client";

import { ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps extends MotionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "highlight" | "muted";
}

export default function AnimatedCard({
  children,
  className,
  variant = "default",
  ...motionProps
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }}
      className={cn(
        "rounded-xl border p-6 shadow-sm backdrop-blur-sm overflow-hidden",
        variant === "default" && "bg-white/5 border-border",
        variant === "highlight" && "bg-primary/5 border-primary/20",
        variant === "muted" && "bg-muted/50 border-muted",
        className
      )}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
