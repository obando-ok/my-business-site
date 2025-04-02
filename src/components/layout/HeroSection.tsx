// src/components/layout/HeroSection.tsx

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Particles from "react-tsparticles";
import { loadBasic } from "tsparticles-basic";
import { useCallback } from "react";
import type { Engine } from "tsparticles-engine";
import EvaluationForm from "./EvaluationForm";  // Import the EvaluationForm component

export default function HeroSection() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadBasic(engine);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-animate">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            number: { value: 50 },
            size: { value: 3 },
            move: { enable: true, speed: 2 },
            links: { enable: true, distance: 130, color: "#FFFFFF", opacity: 0.2 },
            opacity: { value: 0.4 },
          },
          interactivity: {
            events: {
              onhover: { enable: true, mode: "repulse" },
            },
          },
        }}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white"
        >
          Forge Your Legacy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-6 text-lg text-gray-200 max-w-lg mx-auto"
        >
          Elevate your potential through disciplined growth and relentless self-mastery.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-8 flex justify-center gap-6"
        >
          <Link
            href="#get-started"
            className="relative px-8 py-4 bg-blue-700 text-white rounded-full font-semibold shadow-lg hover:bg-blue-800 hover:shadow-2xl hover:scale-105 hover:border-4 hover:border-blue-300 hover:text-shadow-lg transition-all duration-300 ease-in-out overflow-hidden"
          >
            Get Started
          </Link>

          <Link
            href="#features"
            className="px-8 py-4 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 dark:hover:bg-gray-800 transition-all duration-300 ease-in-out"
          >
            Learn More
          </Link>
        </motion.div>
        
        {/* Add the Evaluation Form component */}
        <EvaluationForm />
      </div>
    </section>
  );
}
