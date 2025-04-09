// app/about/page.tsx – Final Polished Version with Enhanced Animations, Testimonials, Metrics, and Theme Fixes
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sword, Cross, CalendarCheck, Users, BarChart } from "lucide-react";

const milestones = [
  {
    year: "2023",
    title: "Founded",
    description: "Born from a mission to help boys become men through structured self-mastery.",
    icon: <Sword className="w-5 h-5 text-primary" />
  },
  {
    year: "2024",
    title: "Beta Launch",
    description: "Rolled out first evaluation forms and daily reflection journal.",
    icon: <CalendarCheck className="w-5 h-5 text-primary" />
  },
  {
    year: "2024 Q3",
    title: "First 100 Users",
    description: "Rapid growth among early adopters seeking discipline and purpose.",
    icon: <Users className="w-5 h-5 text-primary" />
  },
  {
    year: "2025",
    title: "Vision",
    description: "Empower thousands worldwide with AI self-mastery systems.",
    icon: <BarChart className="w-5 h-5 text-primary" />
  }
];

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-20 sm:px-10 md:px-16 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-[0.03]" />
        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 text-primary mb-8 border border-primary/20"
          >
            <Cross className="w-5 h-5" />
            <span className="font-medium tracking-wide">EST. 2023</span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl font-bold tracking-tight text-primary-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block font-playfair text-6xl sm:text-7xl mb-4">
              Our Mission
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Building the world's most powerful self-improvement platform for men — cultivating mental acuity,
            physical discipline, spiritual grounding, and financial mastery.
          </motion.p>
        </div>
      </section>

      {/* Core Content */}
      <section className="px-6 sm:px-10 md:px-16 lg:px-24 pb-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Philosophy */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground/90">The Modern Masculinity Crisis</h2>
              <p className="text-muted-foreground">In an age of digital distraction and disappearing role models, young men struggle to build:</p>
            </div>
            <ul className="grid grid-cols-1 gap-4">
              {["Discipline", "Accountability", "Resilience", "Purpose"].map((trait, i) => (
                <li key={i} className="p-4 bg-background rounded-lg border border-accent/10 hover:border-primary/20 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Sword className="w-5 h-5 text-primary transition-transform group-hover:rotate-12" />
                    </div>
                    <span className="font-medium text-foreground/90">{trait}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Framework */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground/90">Our Proven Framework</h2>
              <p className="text-muted-foreground">A structured path to personal growth and achievement</p>
            </div>
            <div className="space-y-4">
              {[
                "AI-personalized development roadmaps",
                "Daily habit tracking with streak motivation",
                "Stoic philosophy integration",
                "Financial discipline systems",
                "Peer accountability groups",
                "Faith-based growth alignment"
              ].map((item, i) => (
                <div key={i} className="p-4 bg-background rounded-lg border border-accent/10 hover:border-primary/20 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary text-sm font-bold">{i + 1}</span>
                    </div>
                    <span className="text-foreground/80">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-20 bg-accent/5">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold text-foreground/90">Our Growth Journey</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Milestones in building the ultimate self-mastery platform</p>
            </div>
            <div className="relative">
              <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-transparent" />
              <div className="space-y-12">
                {milestones.map((m, i) => (
                  <motion.div
                    key={i}
                    className="relative pl-24"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute left-0 top-2 w-16 h-16 rounded-xl bg-background border-2 border-primary/20 flex items-center justify-center shadow-sm">
                      {m.icon}
                    </div>
                    <div className="bg-background p-6 rounded-xl border border-accent/10 shadow-sm">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-primary font-semibold">{m.year}</span>
                        <span className="text-muted-foreground">–</span>
                        <h3 className="text-lg font-semibold text-foreground/90">{m.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{m.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Sword className="w-10 h-10 text-primary mx-auto" />
            <blockquote className="text-xl font-medium text-foreground/90 italic">
              "This platform changed the trajectory of my life. It gave me tools, guidance, and brotherhood."
            </blockquote>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">James D.</p>
              <p>Joined in 2024</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-20 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground/90">Ready to Transform Your Life?</h2>
            <p className="text-muted-foreground text-lg">Join thousands of men mastering their potential</p>
          </div>

          <motion.div whileHover={{ scale: 1.02 }}>
            <Link
              href="/self-mastery"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Sword className="w-5 h-5" />
              Start Your Journey
            </Link>
          </motion.div>

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Users key={i} className="w-5 h-5 text-primary/50" />
              ))}
            </div>
            <span>500+ Active Members</span>
          </div>
        </div>
      </section>
    </main>
  );
}
