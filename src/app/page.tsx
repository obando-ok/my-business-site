"use client";

import MotionWrapper from "@/components/motion/MotionWrapper";
import HeroSection from "@/components/layout/HeroSection";
import FeatureSection from "@/components/layout/FeatureSection";
import TestimonialSection from "@/components/layout/TestimonialSection";
import StatSection from "@/components/layout/StatSection";
import ContactSection from "@/components/layout/ContactSection";
import { MissionSection } from "@/components/layout/CustomSections";
import DashboardSection from "@/components/layout/DashboardSection";
import CallToActionButton from "@/components/ui/CallToActionButton";
import DailyQuote from "@/components/layout/DailyQuote";
import SparkAnimation from "@/components/ui/SparkAnimation";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <>
      <MotionWrapper>
        <HeroSection />
      </MotionWrapper>

      {/* Animated CTA Section */}
      <MotionWrapper delay={0.15}>
        <section className="relative isolate overflow-hidden py-24 sm:py-32">
          {/* Floating glow animation */}
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
            <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
          </motion.div>

          <div className="mx-auto max-w-3xl px-6 text-center space-y-6">
            <SparkAnimation />
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Ready to Elevate Your Self-Mastery?
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
              Take 3 minutes to complete a focused evaluation and unlock personalized guidance to grow in clarity, discipline, and purpose.
            </p>
            <CallToActionButton />
          </div>
        </section>
      </MotionWrapper>

      {/* Daily Quote */}
      <MotionWrapper delay={0.2}>
        <DailyQuote />
      </MotionWrapper>

      {/* Sections */}
      <MotionWrapper delay={0.3}><MissionSection /></MotionWrapper>
      <MotionWrapper delay={0.4}><DashboardSection /></MotionWrapper>
      {/* ✅ Removed <StreakTracker /> here */}
      <MotionWrapper delay={0.5}><FeatureSection /></MotionWrapper>
      <MotionWrapper delay={0.6}><StatSection /></MotionWrapper>
      <MotionWrapper delay={0.7}><TestimonialSection /></MotionWrapper>
      <MotionWrapper delay={0.8}><ContactSection /></MotionWrapper>
    </>
  );
}
