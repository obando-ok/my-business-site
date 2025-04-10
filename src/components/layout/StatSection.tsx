"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useState } from "react";
import { BarChart2, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { 
    label: "Active Users", 
    value: 3200, 
    suffix: "+",
    icon: <Users className="w-7 h-7" />,
    description: "People building better habits globally",
    color: "from-blue-500/20 to-blue-500/5"
  },
  { 
    label: "Uptime Guarantee", 
    value: 99.997, 
    suffix: "%",
    icon: <Clock className="w-7 h-7" />,
    description: "Reliable service you can count on",
    color: "from-green-500/20 to-green-500/5"
  },
  { 
    label: "Workouts Completed", 
    value: 85000, 
    suffix: "+",
    icon: <BarChart2 className="w-7 h-7" />,
    description: "Sessions that helped build consistency",
    color: "from-purple-500/20 to-purple-500/5"
  },
];

export default function StatSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return (
    <SectionWrapper id="stats" className="bg-background">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Proven at Scale
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Our platform has helped thousands achieve their personal development goals through consistency and accountability.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={cn(
                "flex flex-col items-center justify-center p-6 rounded-xl border border-border",
                "relative overflow-hidden",
                "hover:border-primary/20 transition-all duration-300",
                hoveredIndex === index ? "shadow-md" : "shadow-sm"
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-30", 
                  stat.color
                )} 
              />
              
              <motion.div
                initial={{ scale: 1 }}
                animate={{ 
                  scale: hoveredIndex === index ? 1.05 : 1,
                  y: hoveredIndex === index ? -5 : 0
                }}
                transition={{ duration: 0.2 }}
                className="relative z-10 mb-3 text-muted-foreground"
              >
                {stat.icon}
              </motion.div>
              
              <div className="text-4xl sm:text-5xl font-bold text-primary relative z-10">
                <CountUp 
                  end={stat.value} 
                  duration={2.5} 
                  suffix={stat.suffix}
                  decimals={stat.label.includes("Uptime") ? 3 : 0}
                  decimal="."
                />
              </div>
              
              <div className="text-foreground mt-2 font-medium relative z-10">
                {stat.label}
              </div>
              
              <div className="text-muted-foreground text-sm mt-2 relative z-10">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
