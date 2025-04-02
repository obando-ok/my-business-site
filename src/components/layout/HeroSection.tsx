// src/components/layout/HeroSection.tsx (or a new section like MissionSection.tsx)
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function MissionSection() {
  return (
    <section className="bg-gradient-animate py-16 px-6 text-center text-white">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl font-bold mb-6"
        >
          Our Mission
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-lg sm:text-xl text-gray-200"
        >
          Modern society has left many young men disconnected — from purpose, from discipline, from who they truly are. Surrounded by distraction and lacking direction, too many fall short of the men they were meant to become.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-6 text-lg sm:text-xl text-gray-200"
        >
          Our mission is to empower the next generation of men through personalized, AI-driven systems that build discipline, sharpen habits, align goals with values, and restore faith at the core of masculinity.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mt-6 text-lg sm:text-xl text-gray-200"
        >
          This platform is more than an app — it’s a brotherhood. A space to grow, learn from professionals, interact with like-minded men, and forge the mental, physical, and spiritual foundation that turns boys into strong, capable men.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="mt-6 text-lg sm:text-xl text-gray-200"
        >
          We’re here to help men rise — and bring back the timeless masculinity that built the world we stand on today.
        </motion.p>

        {/* Optional Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="mt-8 flex justify-center gap-6"
        >
          <Link
            href="#get-started"
            className="px-8 py-4 bg-primary text-white rounded-full font-semibold shadow-lg hover:bg-blue-800 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
