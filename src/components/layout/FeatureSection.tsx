"use client";

import { motion } from "framer-motion";
import { 
  Shield, 
  Target, 
  TrendingUp, 
  Dumbbell, 
  Brain, 
  Flame 
} from "lucide-react";

const features = [
  {
    icon: <Dumbbell className="w-7 h-7 text-amber-500" />,
    title: "Habit Forging System",
    description: "Build unshakeable discipline through our progressive habit stacking methodology designed for lasting behavioral change.",
    badge: "Core Discipline"
  },
  {
    icon: <Brain className="w-7 h-7 text-amber-500" />,
    title: "Mental Performance Training",
    description: "Develop elite focus, emotional regulation, and decision-making capabilities through evidence-based mental frameworks.",
    badge: "Cognitive Mastery"
  },
  {
    icon: <Target className="w-7 h-7 text-amber-500" />,
    title: "Strategic Goal Architecture",
    description: "Transform vague ambitions into precise, actionable systems with our proprietary objective breakdown methodology.",
    badge: "Achievement Protocol"
  },
  {
    icon: <Shield className="w-7 h-7 text-amber-500" />,
    title: "Adversity Resistance Protocol",
    description: "Build psychological fortitude to maintain performance excellence under pressure, criticism, and temporary failure.",
    badge: "Mental Resilience"
  },
  {
    icon: <TrendingUp className="w-7 h-7 text-amber-500" />,
    title: "Performance Analytics Dashboard",
    description: "Gain actionable insights through comprehensive tracking of your habits, focus metrics, and productivity patterns.",
    badge: "Data-Driven Growth"
  },
  {
    icon: <Flame className="w-7 h-7 text-amber-500" />,
    title: "Brotherhood Accountability System",
    description: "Connect with like-minded men committed to excellence, creating mutual accountability and shared wisdom.",
    badge: "Community Force"
  }
];

export default function FeatureSection() {
  return (
    <section className="py-24 sm:py-32 px-6 bg-gradient-to-b from-background to-neutral-900/90 border-y border-neutral-800/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto mb-16 text-center"
      >
        <div className="mb-4">
          <span className="px-3 py-1 text-xs font-semibold bg-amber-500/10 text-amber-500 rounded-full uppercase tracking-wider">
            Comprehensive System
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-amber-300 to-orange-500 bg-clip-text text-transparent mb-4">
          The Arsenal of Self-Mastery
        </h2>
        <p className="text-neutral-300 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
          Forge extraordinary capability through our integrated approach to mental, physical, and strategic development.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            viewport={{ once: true }}
            className="bg-neutral-900/50 backdrop-blur-sm p-6 rounded-xl border border-neutral-800 hover:border-amber-500/30 transition-all duration-300 group shadow-lg hover:shadow-amber-500/5"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gradient-to-br from-amber-500/10 to-orange-600/5 rounded-lg">
                {feature.icon}
              </div>
              <span className="text-xs font-medium text-amber-500/80 bg-amber-500/10 px-2 py-1 rounded-full">
                {feature.badge}
              </span>
            </div>
            <h3 className="text-xl font-bold text-neutral-100 group-hover:text-amber-400 transition-colors">
              {feature.title}
            </h3>
            <p className="text-neutral-400 mt-2 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <a 
            href="/self-mastery" 
            className="inline-flex items-center gap-2 text-amber-500 font-medium hover:text-amber-400 transition-colors"
          >
            <span>Explore the complete methodology</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
