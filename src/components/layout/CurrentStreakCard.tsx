"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/components/providers/SupabaseProvider";
import { Flame } from "lucide-react";
import { motion } from "framer-motion";

export default function CurrentStreakCard() {
  const { session } = useAuth();
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (session?.user?.id) fetchStreak();
  }, [session]);

  const fetchStreak = async () => {
    const { data, error } = await supabase
      .from("journal_entries")
      .select("created_at")
      .eq("user_id", session?.user.id);

    if (error || !data) return;

    // Sort by most recent first
    const sorted = data.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    let currentStreak = 0;
    let today = new Date();

    for (let i = 0; i < sorted.length; i++) {
      const entryDate = new Date(sorted[i].created_at);
      const diff = Math.floor(
        (today.setHours(0, 0, 0, 0) - entryDate.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24)
      );

      if (diff === 0 || diff === currentStreak) {
        currentStreak++;
        today.setDate(today.getDate() - 1);
      } else {
        break;
      }
    }

    setStreak(currentStreak);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted"
    >
      <div className="p-2 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
        <Flame size={24} />
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">Current Streak</span>
        <span className="text-xl font-bold text-foreground">
          {streak} day{streak === 1 ? "" : "s"}
        </span>
      </div>
    </motion.div>
  );
}
