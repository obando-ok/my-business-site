// components/HeroSection.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-battlefield overflow-hidden">
      {/* Strategic Background Elements */}
      <div className="absolute inset-0 bg-grid-white/5 z-0" />
      
      {/* Core Message Container */}
      <div className="relative z-10 max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-command mb-8 leading-tight">
            Rebuilding
            <span className="text-forge-orange ml-4">
              <Typewriter
                words={['Discipline', 'Purpose', 'Strength', 'Legacy']}
                loop={0}
                cursor
                typeSpeed={70}
                deleteSpeed={50}
              />
            </span>
          </h1>

          {/* Crisis Statement */}
          <div className="crisis-message bg-iron-gray/80 backdrop-blur-lg p-8 rounded-xl border border-forge-orange/30 mb-12">
            <p className="text-sweat-silver text-xl mb-6 font-medium">
              "Modern society has left many young men disconnected — from purpose, 
              from discipline, from who they truly are. Surrounded by distraction 
              and lacking direction, too many fall short of the men they were meant 
              to become."
            </p>
            
            {/* Mission Declaration */}
            <div className="mission-statement bg-battlefield p-6 rounded-lg border-l-4 border-forge-orange">
              <h2 className="text-3xl font-command text-victory-gold mb-4">
                Our Ironclad Mission
              </h2>
              <p className="text-sweat-silver text-lg">
                Empower the next generation through AI-driven systems that build 
                discipline, sharpen habits, and restore authentic masculinity. 
                This is more than an app — it's a brotherhood for forging 
                mental, physical, and spiritual foundations.
              </p>
            </div>
          </div>

          {/* Call to Arms */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "mirror" }}
          >
            <Link
              href="/initiation"
              className="cta-battleplan inline-block px-12 py-4 bg-forge-orange text-battlefield font-command text-xl rounded-lg hover:bg-victory-gold transition-colors shadow-battle"
            >
              Begin Your Transformation
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Brotherhood Badge */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sweat-silver">
        <div className="h-px w-16 bg-forge-orange" />
        <span className="text-sm tracking-widest">EST. 2024</span>
        <div className="h-px w-16 bg-forge-orange" />
      </div>
    </section>
  );
}