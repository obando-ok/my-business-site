// src/components/layout/TestimonialSection.tsx
"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Jensen",
    title: "CTO at NovaTech",
    quote:
      "We've doubled our client onboarding speed thanks to this platform. It’s reliable, fast, and beautifully designed.",
  },
  {
    name: "Daniel Ekstrom",
    title: "Founder at Lumina",
    quote:
      "The level of polish and performance is unmatched. It feels like Stripe, but made for our niche.",
  },
  {
    name: "Maya Khalil",
    title: "Engineering Lead at Orbit",
    quote:
      "Integrating was seamless, the documentation is top-tier, and support actually understands developers.",
  },
];

export default function TestimonialSection() {
  return (
    <section className="bg-background py-24 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          What Industry Leaders Are Saying
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Trusted by fast-growing startups and proven tech companies.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-base italic text-muted-foreground">“{t.quote}”</p>
              <div className="mt-4 text-sm font-semibold text-foreground">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
