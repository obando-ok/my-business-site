"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { motion } from "framer-motion";

export default function MissionSection() {
  return (
    <SectionWrapper id="mission" className="bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold tracking-tight"
        >
          Our Mission
        </motion.h2>

        <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
          Modern society has left many young men disconnected — from purpose, from discipline, from who they truly are. Surrounded by distraction and lacking direction, too many fall short of the men they were meant to become.
        </p>

        <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
          MAiN exists to reignite purpose through personalized AI-driven strategies. We help young men build disciplined routines, develop resilient habits, align values with daily action — and return faith to the foundation of masculinity.
        </p>

        <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
          This platform is not just software — it’s a brotherhood. Together, we rise stronger.
        </p>
      </div>
    </SectionWrapper>
  );
}
