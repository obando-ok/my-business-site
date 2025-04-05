"use client";

import { Flame, CheckCircle, Target, Sparkles } from "lucide-react";

export default function TodayOverviewBar() {
  return (
    <div className="relative bg-muted/40 border border-border rounded-xl shadow-sm mb-8 p-4 sm:p-5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
      {/* Streak */}
      <div className="flex items-center gap-2 text-sm font-medium">
        <Flame className="w-4 h-4 text-orange-500" />
        <span>Streak: <span className="text-primary">5 days</span></span>
      </div>

      {/* Habits */}
      <div className="flex items-center gap-2 text-sm font-medium">
        <CheckCircle className="w-4 h-4 text-green-500" />
        <span>Habits: <span className="text-primary">2/3</span></span>
      </div>

      {/* Goals */}
      <div className="flex items-center gap-2 text-sm font-medium">
        <Target className="w-4 h-4 text-blue-500" />
        <span>Goals: <span className="text-primary">1/3</span></span>
      </div>

      {/* Theme */}
      <div className="flex items-center gap-2 text-sm font-medium">
        <Sparkles className="w-4 h-4 text-yellow-500" />
        <span>Focus: <span className="text-primary">Consistent Execution</span></span>
      </div>
    </div>
  );
}