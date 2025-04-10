// app/page.tsx – Enhanced Landing Page with Refined UX, Animation, and Professional Structure
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@supabase/auth-helpers-react";

import HeroSection from "@/components/layout/HeroSection";
import FeatureSection from "@/components/layout/FeatureSection";
import TestimonialSection from "@/components/layout/TestimonialSection";
import StatSection from "@/components/layout/StatSection";
import ContactSection from "@/components/layout/ContactSection";
import { MissionSection } from "@/components/layout/CustomSections";
import DailyQuote from "@/components/layout/DailyQuote";
import AskMainPrompt from "@/components/ui/AskMainPrompt";
import CallToActionButton from "@/components/ui/CallToActionButton";
import SparkAnimation from "@/components/ui/SparkAnimation";
import MotionWrapper from "@/components/motion/MotionWrapper";
import HabitsCard from "@/components/layout/HabitsCard";
import GoalsCard from "@/components/layout/GoalsCard";
import FocusCard from "@/components/layout/FocusCard";

import { motion } from "framer-motion";
import { ArrowRight, Key, Shield, Target, Users } from "lucide-react";

export default function LandingPage() {
  const [focus, setFocus] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const session = useSession();

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSetFocus = () => {
    const trimmed = focus.trim();
    if (!trimmed) return;
    router.push(`/profile?focus=${encodeURIComponent(trimmed)}`);
  };

  // Core pillars of masculine development
  const corePillars = [
    {
      icon: <Target className="w-6 h-6 text-amber-500" />,
      title: "Strategic Discipline",
      description: "Build unbreakable habits that compound into exceptional results through deliberate system design."
    },
    {
      icon: <Shield className="w-6 h-6 text-amber-500" />,
      title: "Mental Fortitude", 
      description: "Develop the psychological resilience to handle challenges and maintain focus during adversity."
    },
    {
      icon: <Key className="w-6 h-6 text-amber-500" />,
      title: "Purpose Alignment",
      description: "Identify your core values and align daily actions with your long-term vision for consistent growth."
    },
    {
      icon: <Users className="w-6 h-6 text-amber-500" />,
      title: "Brotherhood Accountability",
      description: "Join a community of like-minded men who hold each other to higher standards of excellence."
    }
  ];

  if (!mounted) {
    return null; // Prevent hydration errors
  }

  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <MotionWrapper>
        <HeroSection />
      </MotionWrapper>

      {/* Core Pillars Section */}
      <MotionWrapper delay={0.1}>
        <section className="py-20 px-6 bg-gradient-to-b from-background to-background/95 border-t border-neutral-800/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                The Foundation of Masculine Excellence
              </h2>
              <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
                Built on timeless principles that turn average men into exceptional leaders, providers, and builders.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {corePillars.map((pillar, index) => (
                <div 
                  key={index}
                  className="bg-neutral-900/40 backdrop-blur-sm border border-neutral-800 rounded-xl p-6 hover:border-amber-500/30 transition-all duration-300 shadow-lg hover:shadow-amber-500/5"
                >
                  <div className="p-3 bg-gradient-to-br from-amber-500/10 to-orange-600/5 rounded-lg inline-block mb-4">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-100 mb-2">{pillar.title}</h3>
                  <p className="text-neutral-400">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </MotionWrapper>

      {/* Daily Quote Section - Moved up for more immediate inspiration */}
      <MotionWrapper delay={0.15}>
        <DailyQuote />
      </MotionWrapper>

      {/* Platform Value Sections */}
      <MotionWrapper delay={0.2}>
        <FeatureSection />
      </MotionWrapper>

      {/* Call To Action */}
      <MotionWrapper delay={0.25}>
        <section className="relative isolate overflow-hidden py-24 sm:py-32 bg-gradient-to-b from-neutral-900/90 to-background border-y border-neutral-800/30">
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 flex justify-center blur-3xl"
            initial={{ scale: 1, opacity: 0.2 }}
            animate={{ scale: 1.05, opacity: 0.25 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-amber-500/10 to-orange-600/10" />
          </motion.div>

          <div className="relative mx-auto max-w-3xl px-6 text-center space-y-6">
            <SparkAnimation />
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-amber-300 to-orange-500 bg-clip-text text-transparent">
              The Path to Your Strongest Self
            </h2>
            <p className="text-neutral-300 text-lg sm:text-xl max-w-2xl mx-auto">
              Take the first step toward systematic self-mastery. Complete our focused evaluation to unlock your personalized roadmap to excellence.
            </p>
            <div className="pt-4">
              <CallToActionButton />
            </div>
            <div className="flex items-center justify-center gap-4 text-sm text-neutral-400 pt-2">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                3-minute assessment
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                100% confidential
              </span>
            </div>
          </div>
        </section>
      </MotionWrapper>

      {/* Stats Section for social proof */}
      <MotionWrapper delay={0.3}>
        <StatSection />
      </MotionWrapper>

      {/* Testimonial Section moved up to build credibility earlier */}
      <MotionWrapper delay={0.35}>
        <TestimonialSection />
      </MotionWrapper>

      {/* Ask MAiN Motivation Prompt */}
      <MotionWrapper delay={0.4}>
        <section className="py-20 px-6 text-center bg-neutral-900/30 border-y border-neutral-800/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Steel Your Mind, Forge Your Path
            </h2>
            <p className="text-neutral-300 max-w-2xl mx-auto text-lg mb-8">
              Draw on centuries of masculine wisdom to overcome your current challenges. Ask MAiN for guidance on any obstacle in your journey.
            </p>
            <div className="mt-6 flex justify-center">
              <AskMainPrompt />
            </div>
            <div className="mt-6 text-sm text-neutral-400 flex flex-wrap justify-center gap-x-8 gap-y-3">
              <span className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-amber-500" />
                "How can I stay disciplined when motivation fades?"
              </span>
              <span className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-amber-500" />
                "What's the best morning routine for peak performance?"
              </span>
              <span className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-amber-500" />
                "How do I balance ambition with contentment?"
              </span>
            </div>
          </div>
        </section>
      </MotionWrapper>

      {/* Personalized Dashboard for Logged In Users */}
      {session?.user && (
        <>
          <MotionWrapper delay={0.45}>
            <MissionSection />
          </MotionWrapper>
          <MotionWrapper delay={0.5}>
            <section className="max-w-7xl mx-auto grid gap-6 lg:grid-cols-3 mt-8 px-6 mb-16">
              <HabitsCard />
              <GoalsCard />
              <FocusCard />
            </section>
          </MotionWrapper>
        </>
      )}

      {/* Contact Section */}
      <MotionWrapper delay={0.55}>
        <ContactSection />
      </MotionWrapper>
    </main>
  );
}
