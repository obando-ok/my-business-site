"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0A0F17] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/svg/topography.svg')] opacity-5 z-0" />

      <div className="relative z-10 max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* Strategic Header */}
          <div className="border-b border-[#2D3542] pb-12 mb-16">
            <h1 className="text-6xl font-bold tracking-tight text-[#C0C6D4] mb-8">
              <span className="block text-5xl font-medium text-[#C55A1C] mb-4">
                EST. 2024
              </span>
              RECLAIMING
              <span className="block text-7xl mt-4 text-[#D4AF37] font-black">
                MODERN MASCULINITY
              </span>
            </h1>
          </div>

          {/* Military-Grade Statement */}
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="relative pl-8 border-l-4 border-[#C55A1C]">
              <p className="text-2xl text-[#C0C6D4] font-medium leading-relaxed">
                "Modern society has left young men adrift - without purpose, 
                discipline, or connection to their core identity. We rebuild 
                foundations."
              </p>
              <div className="absolute left-0 top-0 w-1 h-16 bg-[#C55A1C]" />
            </div>

            {/* Mission Briefing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 bg-[#1A202C] border border-[#2D3542]">
                <h3 className="text-[#D4AF37] text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="text-[#C55A1C]">■</span> Strategic Objective
                </h3>
                <p className="text-[#C0C6D4] leading-relaxed">
                  AI-driven systems forging discipline through personalized 
                  habit optimization and value alignment.
                </p>
              </div>

              <div className="p-6 bg-[#1A202C] border border-[#2D3542]">
                <h3 className="text-[#D4AF37] text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="text-[#C55A1C]">■</span> Brotherhood Protocol
                </h3>
                <p className="text-[#C0C6D4] leading-relaxed">
                  Curated network of professionals and peers for collective 
                  growth and accountability.
                </p>
              </div>

              <div className="p-6 bg-[#1A202C] border border-[#2D3542]">
                <h3 className="text-[#D4AF37] text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="text-[#C55A1C]">■</span> Foundational Doctrine
                </h3>
                <p className="text-[#C0C6D4] leading-relaxed">
                  Mental resilience, physical mastery, and spiritual alignment 
                  through evidence-based practices.
                </p>
              </div>
            </div>

            {/* Deployment CTA */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
            >
              <Link
                href="/deployment"
                className="inline-block px-20 py-5 bg-[#C55A1C] text-[#0A0F17] text-xl font-bold tracking-wide 
                         hover:bg-[#D4AF37] transition-colors duration-300 border-2 border-[#2D3542]
                         shadow-[0_4px_24px_rgba(197,90,28,0.25)]"
              >
                INITIATE DEPLOYMENT
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Military Grade Badge */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <div className="h-px w-24 bg-[#2D3542]" />
        <span className="text-[#C0C6D4] text-sm tracking-[0.3em]">CLASSIFIED</span>
        <div className="h-px w-24 bg-[#2D3542]" />
      </div>
    </section>
  );
}