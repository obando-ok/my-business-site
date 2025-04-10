"use client";

import { Flame, CheckCircle, Target, Sparkles, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

interface StatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  progress?: number;
  tooltip?: string;
}

const Stat = ({ icon, label, value, progress, tooltip }: StatProps) => (
  <div className="flex items-center gap-2 text-sm font-medium">
    {icon}
    <span>
      {label}: <span className="text-primary">{value}</span>
    </span>
    {progress !== undefined && (
      <div className="w-16">
        <Progress value={progress} className="h-1" />
      </div>
    )}
    {tooltip && (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Info className="w-3 h-3 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )}
  </div>
);

export default function TodayOverviewBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-r from-muted/40 to-muted/20 border border-border rounded-xl shadow-sm mb-8 p-4 sm:p-5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4"
    >
      <Stat
        icon={<Flame className="w-4 h-4 text-orange-500" />}
        label="Streak"
        value="5 days"
        tooltip="Your current streak of consecutive days"
      />

      <Stat
        icon={<CheckCircle className="w-4 h-4 text-green-500" />}
        label="Habits"
        value="2/3"
        progress={66}
        tooltip="Daily habits completed today"
      />

      <Stat
        icon={<Target className="w-4 h-4 text-blue-500" />}
        label="Goals"
        value="1/3"
        progress={33}
        tooltip="Weekly goals in progress"
      />

      <Stat
        icon={<Sparkles className="w-4 h-4 text-yellow-500" />}
        label="Focus"
        value="Consistent Execution"
        tooltip="Your current focus area for personal growth"
      />
    </motion.div>
  );
}