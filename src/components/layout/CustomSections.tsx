"use client";
import { motion } from "framer-motion";
import { Sword, Shield, Mountain, Flag } from "lucide-react";

// Mission Section
export function MissionSection() {
  const missionPillars = [
    {
      icon: <Sword className="w-6 h-6 text-amber-500" />,
      title: "Disciplined Action",
      description: "Build systems that make discipline your default state, not a daily struggle."
    },
    {
      icon: <Shield className="w-6 h-6 text-amber-500" />,
      title: "Mental Fortitude",
      description: "Develop unshakeable resilience in the face of adversity and challenge."
    },
    {
      icon: <Mountain className="w-6 h-6 text-amber-500" />,
      title: "Purpose-Driven Growth",
      description: "Align every action with your deepest values and highest aspirations."
    },
    {
      icon: <Flag className="w-6 h-6 text-amber-500" />,
      title: "Brotherhood Legacy",
      description: "Join a community of men committed to excellence and mutual growth."
    }
  ];

  return (
    <section id="mission" className="py-24 px-6 bg-gradient-to-b from-neutral-900/90 to-background border-y border-neutral-800/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-3 py-1 text-xs font-semibold tracking-wider bg-amber-500/10 text-amber-500 rounded-full uppercase mb-4 inline-block">
            Our Purpose
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-amber-300 to-orange-500 bg-clip-text text-transparent mb-6"
          >
            The Forge of Modern Masculinity
          </motion.h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-neutral-300 leading-relaxed">
              In an era where men are increasingly disconnected from purpose and discipline, we're building the definitive system for masculine excellence.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {missionPillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 p-6 bg-neutral-900/40 backdrop-blur-sm rounded-xl border border-neutral-800 hover:border-amber-500/20 transition-all duration-300"
            >
              <div className="p-3 bg-gradient-to-br from-amber-500/10 to-orange-600/5 rounded-lg h-fit">
                {pillar.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-100 mb-2">{pillar.title}</h3>
                <p className="text-neutral-400">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500"></div>
          
          <p className="text-lg text-neutral-300 leading-relaxed mb-6">
            Modern society has left many men disconnected — from purpose, from discipline, from their authentic potential. Surrounded by distraction and lacking direction, too many fall short of the men they were meant to become.
          </p>
          
          <p className="text-lg text-neutral-300 leading-relaxed mb-6">
            MAiN exists to forge exceptional men through personalized, data-driven strategies. We help men build disciplined routines, develop resilient habits, and align values with daily action — placing character at the foundation of modern masculinity.
          </p>
          
          <p className="text-lg text-neutral-200 leading-relaxed font-medium">
            This platform is not just software — it's a brotherhood of men committed to the pursuit of excellence. <span className="text-amber-500">Together, we rise.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Daily Quote Section
export function DailyQuote() {
  const quotes = [
    {
      text: "Man cannot remake himself without suffering, for he is both the marble and the sculptor.",
      author: "Alexis Carrel"
    },
    {
      text: "Discipline is the bridge between goals and accomplishment.",
      author: "Jim Rohn"
    },
    {
      text: "The Iron is the best antidepressant I have ever found. There is no better way to fight weakness than with strength.",
      author: "Henry Rollins"
    },
    {
      text: "It is not the critic who counts... The credit belongs to the man who is actually in the arena.",
      author: "Theodore Roosevelt"
    }
  ];

  // Select a random quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { text, author } = quotes[randomIndex];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-neutral-900/80 to-neutral-900/40 border-y border-neutral-800/30 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/texture.png')] opacity-5 mix-blend-overlay"></div>
      
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute -left-10 top-0 text-8xl text-amber-500/10 font-serif">"</div>
        <div className="absolute -right-10 bottom-0 text-8xl text-amber-500/10 font-serif">"</div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center relative z-10"
        >
          <span className="px-3 py-1 text-xs font-semibold tracking-wider bg-amber-500/10 text-amber-500 rounded-full uppercase mb-8 inline-block">
            Daily Wisdom
          </span>
          
          <blockquote className="text-2xl md:text-3xl font-serif italic text-neutral-100 leading-relaxed">
            "{text}"
          </blockquote>
          
          <div className="mt-6 flex items-center justify-center">
            <div className="h-px w-12 bg-amber-500/30 mr-4"></div>
            <p className="text-amber-500/80 font-medium">{author}</p>
            <div className="h-px w-12 bg-amber-500/30 ml-4"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
