"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Particles from "react-tsparticles";
import { loadBasic } from "tsparticles-basic";
import { useCallback } from "react";
import type { Engine } from "tsparticles-engine";

export default function HeroSection() {
  const particlesInit = useCallback(async (engine: Engine) => {
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
          className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight text-black dark:text-white"
        >
          Build smarter. Launch faster.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto"
        >
          The ultimate platform to scale your business and impress your users.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-8 flex justify-center gap-6"
        >
          <Link
            href="#get-started"
            className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:shadow-2xl hover:bg-blue-700 transition-all duration-300"
          >
            Get Started
          </Link>
          <Link
            href="#features"
            className="px-8 py-4 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 dark:hover:bg-gray-800 transition-all duration-300"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
