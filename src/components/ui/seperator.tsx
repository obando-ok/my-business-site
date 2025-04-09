import React from "react";
className={`my-4 h-px w-full bg-border ${className || ""}`}

interface SeparatorProps {
  className?: string;
}

export function Separator({ className }: SeparatorProps) {
  return (
    <div
      role="separator"
      className={cn("my-4 h-px w-full bg-border", className)}
    />
  );
}
