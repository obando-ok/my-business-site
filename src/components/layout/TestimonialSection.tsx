"use client";

import { motion } from "framer-motion";
import { Star, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const reflections = [
  {
    name: "Ava Morel",
    title: "Meditation Teacher",
    quote: "This experience helped me shift from chaos to clarity. I finally feel grounded in my habits.",
    rating: 5,
    initials: "AM"
  },
  {
    name: "Marcus Ellison",
    title: "Founder, Self Reboot",
    quote: "The questions led me to insights I didn't know I needed. It felt like journaling with purpose.",
    rating: 5,
    initials: "ME"
  },
  {
    name: "Jae Rivera",
    title: "Psychology Student",
    quote: "I've tried so many self-help apps. This one actually held a mirror up to my mindset—and helped me grow.",
    rating: 4,
    initials: "JR"
  },
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 sm:py-32 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto mb-12 relative"
      >
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Reflections from the Journey
        </h2>
        <p className="text-muted-foreground mt-2 text-base sm:text-lg">
          Real insights from people building intentional, growth-centered lives.
        </p>
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid gap-6 md:grid-cols-3">
          {reflections.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              viewport={{ once: true }}
              className={cn(
                "bg-muted/10 p-6 rounded-xl border border-border shadow-sm transition-all duration-300",
                "hover:shadow-md hover:border-primary/20"
              )}
            >
              <div className="flex justify-center mb-4">
                <Avatar className="h-20 w-20 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {r.initials}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={cn(
                      "w-4 h-4",
                      index < r.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>

              <blockquote className="italic text-foreground mb-4">
                "{r.quote}"
              </blockquote>
              
              <div className="text-sm font-medium text-primary">{r.name}</div>
              <div className="text-xs text-muted-foreground">{r.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
