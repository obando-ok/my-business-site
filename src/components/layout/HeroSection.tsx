"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import type { Engine } from "tsparticles-engine";
import { loadBasic } from "tsparticles-basic";
import useMouse from "@react-hook/mouse-position";

const Particles = dynamic(() => import("react-tsparticles"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]" />,
});

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const { x, y } = useMouse(containerRef);

  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseX = useSpring(rawMouseX, { stiffness: 500, damping: 30 });
  const mouseY = useSpring(rawMouseY, { stiffness: 500, damping: 30 });

  const y2 = useTransform(scrollY, [0, 300], [0, 200]);
  const rotate = useTransform(scrollY, [0, 300], [0, 5]);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadBasic(engine);
  }, []);

  useEffect(() => {
    if (x !== null && y !== null) {
      rawMouseX.set(x - window.innerWidth / 2);
      rawMouseY.set(y - window.innerHeight / 2);
    }
  }, [x, y, rawMouseX, rawMouseY]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]"
    >
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
      >
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,#c97d2c_0%,transparent_70%)] mix-blend-soft-light" />
      </motion.div>

      <motion.div
        style={{ y: y2, rotate }}
        className="absolute inset-0 z-0 opacity-10 bg-[url('/grid.svg')] bg-repeat bg-[size:70px]"
        aria-hidden="true"
      />

      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: { color: "transparent" },
          fpsLimit: 90,
          particles: {
            number: { value: 120 },
            size: { value: 1.2 },
            move: {
              enable: true,
              speed: 0.4,
              direction: "none",
              outModes: "out",
              trail: {
                enable: false,
                length: 2,
                fillColor: "#c97d2c",
              },
            },
            links: {
              enable: true,
              distance: 140,
              color: "#c97d2c",
              opacity: 0.15,
              width: 1,
            },
            opacity: { value: 0.8 },
            color: { value: "#c97d2c" },
            shape: { type: "circle" },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
            },
          },
        }}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      />

      <div className="relative z-20 text-center px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300 bg-clip-text text-transparent">
            <Typewriter
              words={["Forge Your Legacy", "Build Unshakeable Discipline", "Master Self-Governance"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2500}
            />
          </h1>

          <p className="text-xl sm:text-2xl text-neutral-300 max-w-2xl mx-auto font-medium">
            AI-powered personal evolution system for ambitious men committed to
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              {" "}permanent transformation
            </span>
          </p>

          <ul className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-neutral-400 font-medium">
            <li className="flex items-center gap-2">
              <span className="text-pink-400">🎯</span> Structured AI-powered development plans
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-300">🔥</span> Daily routines built around your goals
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-400">🧠</span> Community & accountability systems
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
            <Link
              href="/evaluation"
              className="relative px-8 py-5 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl font-bold shadow-2xl hover:shadow-orange-500/20 hover:scale-[1.02] transition-all duration-300 group overflow-hidden"
            >
              <span className="relative z-10">Begin Assessment</span>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:400%_400%] animate-shimmer" />
            </Link>

            <Link
              href="/self-mastery"
              className="px-8 py-5 bg-neutral-900/50 backdrop-blur-lg border border-neutral-800 rounded-xl font-medium text-neutral-300 hover:text-white hover:border-amber-500/30 hover:bg-neutral-900/80 transition-all duration-300 shadow-lg hover:shadow-neutral-900/20"
            >
              Explore Methodology
            </Link>
          </div>

          <div className="mt-8 text-sm text-neutral-400">
            Trusted by 300+ young men
          </div>

          <blockquote className="italic text-sm text-muted-foreground mt-4">
            "Discipline is the bridge between potential and greatness."
          </blockquote>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-8 h-14 rounded-full border-2 border-amber-500/30 flex items-center justify-center"
        >
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
        </motion.div>
        <span className="text-sm text-amber-500/80 font-medium tracking-widest">
          EXPLORE SYSTEM
        </span>
      </motion.div>
    </section>
  );
}