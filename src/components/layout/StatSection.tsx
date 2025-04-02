// src/components/layout/StatSection.tsx
"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  { label: "Active Users", value: 3200, suffix: "+" },
  { label: "Uptime Guarantee", value: 99.997, suffix: "%" },
  { label: "Transactions Processed", value: 500, suffix: "M+" },
];

export default function StatSection() {
  return (
    <section className="bg-background py-20 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-12">
          Proven at Scale
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="text-4xl font-bold text-primary">
                <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
              </div>
              <div className="text-muted-foreground mt-2 text-sm uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
