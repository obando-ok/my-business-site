"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { motion } from "framer-motion";
import { Target, Users, Heart, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const missionPoints = [
  {
    icon: Target,
    title: "Purpose-Driven",
    description: "We help young men discover and align with their true purpose, creating a foundation for meaningful growth and achievement.",
  },
  {
    icon: Users,
    title: "Community Focused",
    description: "Building a brotherhood where men support and challenge each other to become their best selves.",
  },
  {
    icon: Heart,
    title: "Value-Based",
    description: "Guiding men to develop strong values and principles that shape their character and decisions.",
  },
];

export default function MissionSection() {
  return (
    <SectionWrapper id="mission" className="bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            Our Mission
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-3xl mx-auto"
          >
            Modern society has left many young men disconnected — from purpose, from discipline, from who they truly are. 
            Surrounded by distraction and lacking direction, too many fall short of the men they were meant to become.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {missionPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-primary/10 mb-4">
                      <point.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
                    <p className="text-muted-foreground">{point.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            MAiN exists to reignite purpose through personalized AI-driven strategies. 
            We help young men build disciplined routines, develop resilient habits, 
            align values with daily action — and return faith to the foundation of masculinity.
          </p>

          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            This platform is not just software — it's a brotherhood. Together, we rise stronger.
          </p>

          <Button size="lg" className="group">
            Join the Brotherhood
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
