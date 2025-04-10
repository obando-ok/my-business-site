"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import type { Engine } from "tsparticles-engine";
import { loadBasic } from "tsparticles-basic";
import useMouse from "@react-hook/mouse-position";
import { Shield, Sword, Flame, Target, Brain, Dumbbell, ArrowRight } from "lucide-react";

const Particles = dynamic(() => import("react-tsparticles"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]" />,
});

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const mouse = useMouse(containerRef as any, {
    enterDelay: 100,
    leaveDelay: 100
  });
  
  const x = mouse.x ?? 0;
  const y = mouse.y ?? 0;

  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseX = useSpring(rawMouseX, { stiffness: 500, damping: 30 });
  const mouseY = useSpring(rawMouseY, { stiffness: 500, damping: 30 });

  const y2 = useTransform(scrollY, [0, 300], [0, 200]);
  const rotate = useTransform(scrollY, [0, 300], [0, 5]);
  const heroOpacity = useTransform(scrollY, [0, 200], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 100], [1, 0.95]);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadBasic(engine);
  }, []);

  useEffect(() => {
    if (typeof x === 'number' && typeof y === 'number') {
      rawMouseX.set(x - (window.innerWidth / 2));
      rawMouseY.set(y - (window.innerHeight / 2));
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
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,#d97706_0%,transparent_70%)] mix-blend-soft-light" />
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
          fpsLimit: 60,
          particles: {
            number: { value: 100 },
            size: { value: 1.2 },
            move: {
              enable: true,
              speed: 0.4,
              direction: "none",
              outModes: "out",
              trail: {
                enable: false,
                length: 2,
                fillColor: "#d97706",
              },
            },
            links: {
              enable: true,
              distance: 150,
              color: "#d97706",
              opacity: 0.15,
              width: 1,
            },
            opacity: { value: 0.8 },
            color: { value: "#d97706" },
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
          style={{ opacity: heroOpacity, scale }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <div className="inline-block mb-2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-700/10 backdrop-blur-sm border border-amber-700/20">
            <span className="text-sm font-medium tracking-wide text-amber-500">THE WARRIOR'S PATH TO MASTERY</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
            <Typewriter
              words={["Forge Your Inner Warrior", "Master Mental Fortitude", "Conquer Your Weaknesses", "Build Your Empire"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2500}
            />
          </h1>

          <p className="text-xl sm:text-2xl text-neutral-300 max-w-3xl mx-auto font-medium leading-relaxed">
            A battle-tested system to forge 
            <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
              {" "}unbreakable discipline
            </span>
            , conquer your limitations, and become the architect of your destiny.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8 text-left">
            <div className="p-5 bg-gradient-to-br from-neutral-900/80 to-neutral-800/30 backdrop-blur-md rounded-xl border border-neutral-800 hover:border-amber-600/20 transition-all duration-300 group">
              <div className="mb-3 p-2 w-12 h-12 rounded-lg bg-gradient-to-br from-amber-600/20 to-amber-600/5 flex items-center justify-center">
                <Brain className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-neutral-200 group-hover:text-amber-500 transition-colors">Mental Warfare</h3>
              <p className="text-sm text-neutral-400 mt-2">Develop unshakable mental fortitude and eliminate weakness from your mindset.</p>
            </div>
            
            <div className="p-5 bg-gradient-to-br from-neutral-900/80 to-neutral-800/30 backdrop-blur-md rounded-xl border border-neutral-800 hover:border-amber-600/20 transition-all duration-300 group">
              <div className="mb-3 p-2 w-12 h-12 rounded-lg bg-gradient-to-br from-amber-600/20 to-amber-600/5 flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-neutral-200 group-hover:text-amber-500 transition-colors">Discipline Forging</h3>
              <p className="text-sm text-neutral-400 mt-2">Build iron-clad systems that transform pain into power and challenge into strength.</p>
            </div>
            
            <div className="p-5 bg-gradient-to-br from-neutral-900/80 to-neutral-800/30 backdrop-blur-md rounded-xl border border-neutral-800 hover:border-amber-600/20 transition-all duration-300 group">
              <div className="mb-3 p-2 w-12 h-12 rounded-lg bg-gradient-to-br from-amber-600/20 to-amber-600/5 flex items-center justify-center">
                <Target className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-neutral-200 group-hover:text-amber-500 transition-colors">Strategic Conquest</h3>
              <p className="text-sm text-neutral-400 mt-2">Deploy tactical approaches to systematically dominate every aspect of your life.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10">
            <Link
              href="/evaluation"
              className="relative group px-8 py-5 bg-gradient-to-br from-amber-500 to-amber-700 text-neutral-900 rounded-xl font-bold shadow-2xl hover:shadow-amber-600/20 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Enter The Forge
                <Flame className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:400%_400%] animate-shimmer" />
            </Link>

            <Link
              href="/self-mastery"
              className="group px-8 py-5 bg-neutral-900/50 backdrop-blur-lg border border-neutral-800 rounded-xl font-medium text-neutral-300 hover:text-amber-500 hover:border-amber-600/30 hover:bg-neutral-900/80 transition-all duration-300 shadow-lg hover:shadow-neutral-900/20 flex items-center justify-center gap-2"
            >
              Warrior's Handbook
              <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          <div className="mt-10 flex flex-col items-center">
            <div className="flex flex-col items-center justify-center py-2 px-4 rounded-xl bg-neutral-900/50 backdrop-blur-sm border border-neutral-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-neutral-300">Forged by</span>
                <span className="text-sm font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">1,200+ warriors</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-neutral-400 ml-1">4.9/5</span>
              </div>
            </div>
          </div>
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
          className="w-8 h-14 rounded-full border-2 border-amber-600/30 flex items-center justify-center"
        >
          <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse" />
        </motion.div>
        <span className="text-sm text-amber-500/80 font-medium tracking-widest">
          BEGIN CONQUEST
        </span>
      </motion.div>
    </section>
  );
}