// src/components/layout/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Particles from "react-tsparticles";
import { loadBasic } from "tsparticles-basic";
import { useCallback } from "react";

export default function HeroSection() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadBasic(engine);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f8f9fc] to-[#eef1fd] dark:from-[#0d0d0d] dark:to-[#1c1c1e]">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            number: { value: 40 },
            size: { value: 2 },
            move: { enable: true, speed: 1 },
            links: { enable: true, distance: 130, color: "#635bff", opacity: 0.3 },
            opacity: { value: 0.5 },
          },
        }}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-6xl font-bold tracking-tight"
        >
          Build smarter. Launch faster.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-4 text-lg text-muted-foreground"
        >
          The ultimate platform to scale your business and impress your users.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-6 flex justify-center gap-4"
        >
          <Link
            href="#get-started"
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium shadow-md hover:shadow-lg transition"
          >
            Get Started
          </Link>
          <Link
            href="#features"
            className="px-6 py-3 bg-muted text-foreground rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
