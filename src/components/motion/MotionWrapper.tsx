"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface MotionWrapperProps {
  children: React.ReactNode;
  delay?: number;
}

export default function MotionWrapper({ children, delay = 0.1 }: MotionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -100px 0px", // triggers slightly before element is fully visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
