"use client";

import { motion } from "framer-motion";

const reflections = [
  {
    name: "Ava Morel",
    title: "Meditation Teacher",
    quote: "This experience helped me shift from chaos to clarity. I finally feel grounded in my habits.",
  },
  {
    name: "Marcus Ellison",
    title: "Founder, Self Reboot",
    quote: "The questions led me to insights I didn’t know I needed. It felt like journaling with purpose.",
  },
  {
    name: "Jae Rivera",
    title: "Psychology Student",
    quote: "I've tried so many self-help apps. This one actually held a mirror up to my mindset—and helped me grow.",
  },
];

export default function TestimonialSection() {
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
          Reflections from the Journey
        </h2>
        <p className="text-muted-foreground mt-2 text-base sm:text-lg">
          Real insights from people building intentional, growth-centered lives.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {reflections.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            viewport={{ once: true }}
            className="bg-muted/10 p-6 rounded-xl border border-border shadow-sm"
          >
            <blockquote className="italic text-foreground mb-4">
              “{r.quote}”
            </blockquote>
            <div className="text-sm font-medium text-primary">{r.name}</div>
            <div className="text-xs text-muted-foreground">{r.title}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
