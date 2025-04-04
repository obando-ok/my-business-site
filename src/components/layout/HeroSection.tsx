"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import type { Engine } from "tsparticles-engine";
import { loadBasic } from "tsparticles-basic";
import ScrollCue from "@/components/layout/ScrollCue";

const Particles = dynamic(() => import("react-tsparticles"), { ssr: false });

export default function HeroSection() {
  const [showParticles, setShowParticles] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadBasic(engine);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setShowParticles(true);
    }
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-animate">
      {showParticles && (
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
              move: { enable: true, speed: 1.5 },
              links: {
                enable: true,
                distance: 150,
                color: "#c97d2c",
                opacity: 0.3,
              },
              opacity: { value: 0.5 },
              color: { value: "#c97d2c" },
            },
            interactivity: {
              events: {
                onhover: { enable: true, mode: "repulse" },
              },
            },
          }}
          className="absolute inset-0 z-0"
        />
      )}

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl font-bold tracking-tight text-white"
        >
          <Typewriter
            words={[
              "Forge Your Legacy with MAiN",
              "Build Discipline. Gain Control.",
              "Lead. Lift. Level Up.",
            ]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={3000}
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-6 text-lg sm:text-xl text-gray-200 max-w-xl mx-auto"
        >
          Reclaim purpose. Reinforce values. Reshape your life — guided by AI and built by discipline.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          <Link
            href="#evaluation"
            className="px-10 py-5 bg-primary text-white rounded-lg font-bold shadow-lg hover:bg-button-hover-bg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out border-2 border-secondary"
          >
            Begin Evaluation
          </Link>

          <Link
            href="#mission"
            className="px-10 py-5 bg-transparent text-primary rounded-lg font-bold border-2 border-primary hover:bg-primary/10 hover:border-secondary transition-all duration-300 ease-in-out"
          >
            Our Mission
          </Link>
        </motion.div>
      </div>

      <ScrollCue />
    </section>
  );
}
