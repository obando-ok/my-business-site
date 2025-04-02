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
    <>
      <nav className="absolute top-0 left-0 w-full px-6 py-4 flex justify-between items-center z-50 bg-transparent">
        <div className="flex items-center">
          <h1 className="text-white font-bold text-2xl">YourBusiness</h1>
        </div>
        <div className="flex space-x-8">
          <Link href="/" className="text-white hover:text-primary">Home</Link>
          <Link href="#features" className="text-white hover:text-primary">Features</Link>
          <Link href="#docs" className="text-white hover:text-primary">Docs</Link>
          <Link href="#contact" className="text-white hover:text-primary">Contact</Link>
          <Link href="#privacy" className="text-white hover:text-primary">Privacy</Link>
        </div>
      </nav>

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
            Build smarter. Launch faster.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="mt-6 text-lg text-gray-200 max-w-lg mx-auto"
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
              className="px-8 py-4 bg-blue-700 text-white rounded-full font-semibold shadow-lg hover:bg-blue-800 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Get Started
            </Link>

            <Link
              href="#features"
              className="px-8 py-4 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-all duration-300 ease-in-out"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}