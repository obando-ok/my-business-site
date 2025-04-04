"use client";

import { motion } from "framer-motion";
import { LucideLeaf, LucideTarget, LucideLineChart } from "lucide-react";

const features = [
  {
    icon: <LucideLeaf className="w-6 h-6 text-green-400" />,
    title: "Mindful Check-ins",
    description: "Start and end your day with clarity using our simple daily reflections.",
  },
  {
    icon: <LucideLineChart className="w-6 h-6 text-sky-400" />,
    title: "Track Growth, Not Just Goals",
    description: "Watch your mindset evolve over time through guided evaluations and streak insights.",
  },
  {
    icon: <LucideTarget className="w-6 h-6 text-purple-400" />,
    title: "Personalized Mission Control",
    description: "Stay aligned with your values and vision by reconnecting with your mission each week.",
  },
];

export default function FeatureSection() {
  return (
    <section className="py-24 sm:py-32 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Core Benefits for Your Self-Mastery Journey
        </h2>
        <p className="text-muted-foreground mt-2 text-base sm:text-lg">
          Designed to help you build awareness, clarity, and long-term momentum.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            viewport={{ once: true }}
            className="bg-muted/10 p-6 rounded-xl border border-border shadow-sm"
          >
            <div className="mb-4 flex justify-center">{f.icon}</div>
            <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
