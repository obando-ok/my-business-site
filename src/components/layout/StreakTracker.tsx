"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/providers/SupabaseProvider";
import { supabase } from "@/lib/supabaseClient";
import clsx from "clsx";
import MilestoneTracker from "@/components/layout/MilestoneTracker";
import { checkAndSaveMilestone } from "@/lib/milestones";
import toast from "react-hot-toast";

const DAY_RANGES = [30, 60, 90];
const colorLevels = ["bg-muted", "bg-accent/20", "bg-accent/40", "bg-accent/60", "bg-accent"];

interface StreakTrackerProps {
  instanceId?: string;
}

export default function StreakTracker({ instanceId = 'default' }: StreakTrackerProps) {
  const { session } = useAuth();
  const [entryCounts, setEntryCounts] = useState<Record<string, number>>({});
  const [todayStreak, setTodayStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [range, setRange] = useState(60);

  useEffect(() => {
    if (session?.user?.id) fetchEntries();
  }, [session]);

  const fetchEntries = async () => {
    const { data } = await supabase
      .from("journal_entries")
      .select("created_at")
      .eq("user_id", session?.user.id);

    if (!data) return;

    const counts: Record<string, number> = {};
    data.forEach((e) => {
      const date = new Date(e.created_at).toISOString().split("T")[0];
      counts[date] = (counts[date] || 0) + 1;
    });

    setEntryCounts(counts);
    calculateStreaks(new Set(Object.keys(counts)));
  };

  const calculateStreaks = (dates: Set<string>) => {
    const today = new Date();
    let current = 0;
    let longest = 0;

    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      if (dates.has(key)) {
        current++;
        if (current > longest) longest = current;
      } else {
        current = 0;
      }
    }
    setTodayStreak(current);
    setMaxStreak(longest);
  };

  useEffect(() => {
    if (!session?.user?.id || todayStreak === 0) return;

    const unlockables = [
      { days: 3, label: "Initial Momentum" },
      { days: 7, label: "One Full Week" },
      { days: 14, label: "Solid Foundation" },
      { days: 30, label: "Built Like a Wall" },
      { days: 60, label: "Disciplined Streak" },
      { days: 90, label: "Master Consistency" },
    ];

    unlockables.forEach(async (milestone) => {
      if (todayStreak === milestone.days) {
        const unlocked = await checkAndSaveMilestone(
          session.user.id,
          milestone.days,
          milestone.label
        );
        if (unlocked) {
          toast.success(`🎉 Milestone Unlocked: ${milestone.label}`);
        }
      }
    });
  }, [todayStreak, session]);

  const getColor = (count: number) => {
    if (count >= 5) return colorLevels[4];
    if (count >= 3) return colorLevels[3];
    if (count >= 2) return colorLevels[2];
    if (count >= 1) return colorLevels[1];
    return colorLevels[0];
  };

  const renderGrid = () => {
    const grid = [];
    const today = new Date();
    for (let i = range - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      const count = entryCounts[key] || 0;
      const level = getColor(count);

      grid.push(
        <div
          key={`${instanceId}-${i}-${key}`}
          className={clsx(
            "w-4 h-4 rounded-sm border border-border",
            level,
            "transition-colors duration-300"
          )}
          title={`${key} — ${count} entr${count === 1 ? "y" : "ies"}`}
        ></div>
      );
    }
    return grid;
  };

  return (
    <section className="py-16 bg-background text-center border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Streak Overview
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-sm text-muted-foreground">
            Current Streak: <strong>{todayStreak}</strong> {todayStreak === 1 ? "day" : "days"} • Longest: <strong>{maxStreak}</strong>
          </p>

          {todayStreak >= 10 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="px-3 py-1 text-xs rounded-full font-semibold bg-emerald-500/20 text-emerald-500 border border-emerald-500 shadow-sm"
            >
              🔥 You're on fire!
            </motion.div>
          )}
        </div>

        <div className="flex justify-center gap-3">
          {DAY_RANGES.map((value) => (
            <button
              key={`${instanceId}-range-${value}`}
              onClick={() => setRange(value)}
              className={clsx(
                "px-3 py-1 text-sm rounded-md border",
                range === value
                  ? "bg-accent text-white border-accent"
                  : "bg-muted text-foreground border-border hover:bg-accent/10",
                "transition-colors"
              )}
            >
              Last {value} days
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-12 sm:grid-cols-15 md:grid-cols-20 gap-[5px]">
            {renderGrid()}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Each square represents a day. The darker the shade, the more reflections logged.
        </p>

        <MilestoneTracker streak={todayStreak} />
      </motion.div>
    </section>
  );
}