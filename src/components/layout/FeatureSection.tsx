// src/components/layout/FeatureSection.tsx
"use client";

import { motion } from "framer-motion";
import { CheckCircleIcon, BoltIcon, ChartBarIcon } from "@heroicons/react/24/outline";

const features = [
  {
    title: "Blazing Fast Setup",
    description: "Deploy your entire platform in minutes with our streamlined onboarding.",
    icon: <BoltIcon className="h-6 w-6 text-primary" />,
  },
  {
    title: "Built for Scale",
    description: "Engineered to grow with your business — from MVP to global deployment.",
    icon: <ChartBarIcon className="h-6 w-6 text-primary" />,
  },
  {
    title: "Secure by Design",
    description: "Bank-grade encryption, access control, and built-in compliance.",
    icon: <CheckCircleIcon className="h-6 w-6 text-primary" />,
  },
];

export default function FeatureSection() {
  return (
    <section id="features" className="bg-background py-24 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Everything You Need. Nothing You Don’t.
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Focus on your business, not your infrastructure. We’ve got it covered.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-6 rounded-xl border border-border bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
