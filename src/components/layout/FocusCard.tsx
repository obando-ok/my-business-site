"use client";

import { useMemo, useEffect, useState } from "react";
import { BrainCog, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Simplified focus theme type
type FocusTheme = {
  title: string;
  description: string;
  icon: string;
  category: string;
};

// Just one theme to match the image
const focusTheme: FocusTheme = { 
  title: "Mindful Execution",
  description: "Focus on quality over quantity, precision over speed",
  icon: "🧘",
  category: "Mindset"
};

export default function FocusCard() {
  const [progress, setProgress] = useState(3);

  // Update progress based on time of day
  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      // Just to make it minimal, we'll keep progress at 3% like in the image
      setProgress(3);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-[#111] border-[#222] rounded-xl overflow-hidden">
      <CardContent className="p-5 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCog className="h-4 w-4 text-[#CD853F]" />
            <div className="text-xl font-light text-white">
              AI-
              <br />
              Powered
              <br />
              Focus
            </div>
          </div>
          <Badge variant="outline" className="rounded-full py-1 px-3 text-xs bg-[#222] border-[#333] text-white">
            {focusTheme.category}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-2xl">{focusTheme.icon}</span>
            <div>
              <h3 className="text-lg text-white">{focusTheme.title}</h3>
              <p className="text-sm text-white/60">{focusTheme.description}</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#777]">Daily Progress</span>
              <span className="text-white">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1 bg-[#333]" />
          </div>
          
          <div className="flex items-start gap-2 text-white/60">
            <Sparkles className="h-4 w-4 mt-1 text-[#CD853F]" />
            <p className="italic text-sm">
              "Discipline is choosing what you want most over what you want now."
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
