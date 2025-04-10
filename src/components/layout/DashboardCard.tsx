"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface DashboardCardProps {
  children: ReactNode;
  index: number;
  className?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export function DashboardCard({ children, index, className = '' }: DashboardCardProps) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className={`min-h-[280px] flex flex-col justify-between bg-muted/20 border border-border p-6 rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default DashboardCard;
