// /app/landing/page.tsx

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-background via-muted to-background flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl mx-auto text-center bg-muted/30 backdrop-blur-xl rounded-3xl p-10 border border-border shadow-lg"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Master your mind. One reflection at a time.
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
          A personal growth platform to help you build focus, intention, and momentum — powered by simplicity and guided reflection.
        </p>

        <Link href="/auth">
          <Button className="px-6 py-3 text-base rounded-xl">Get Started</Button>
        </Link>

        <div className="mt-10 grid gap-8 md:grid-cols-3 text-left">
          <div className="bg-background/50 border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-primary mb-1">Set Your Daily Focus</h3>
            <p className="text-sm text-muted-foreground">
              Clarify your intention every day and start with purpose.
            </p>
          </div>

          <div className="bg-background/50 border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-primary mb-1">Reflect Consistently</h3>
            <p className="text-sm text-muted-foreground">
              Use short daily reflections to gain clarity and self-awareness.
            </p>
          </div>

          <div className="bg-background/50 border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-primary mb-1">Build Your Momentum</h3>
            <p className="text-sm text-muted-foreground">
              See your streaks and progress grow over time — track your evolution.
            </p>
          </div>
        </div>

        <p className="mt-10 text-xs text-muted-foreground italic">
          Built for clarity, not complexity.
        </p>
      </motion.div>
    </main>
  );
}
