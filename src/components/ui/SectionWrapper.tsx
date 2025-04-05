// components/layout/SectionWrapper.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  centered?: boolean;
  background?: "light" | "dark" | "gradient";
}

export default function SectionWrapper({
  id,
  children,
  className = "",
  centered = false,
  background,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={clsx(
        "relative w-full py-20 px-6 md:px-10 border-t border-border",
        background === "dark" && "bg-muted text-white",
        background === "light" && "bg-background text-foreground",
        background === "gradient" &&
          "bg-gradient-to-br from-background via-background/80 to-background/60",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={clsx("mx-auto max-w-7xl", centered && "text-center")}
      >
        {children}
      </motion.div>
    </section>
  );
}
