"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/components/providers/SupabaseProvider";
import { motion } from "framer-motion";
import { CalendarDays, BookOpen } from "lucide-react";

interface Stats {
  total: number;
  lastDate: string | null;
}

export default function JournalStats() {
  const { session } = useAuth();
  const [stats, setStats] = useState<Stats>({ total: 0, lastDate: null });

  useEffect(() => {
    if (session?.user?.id) fetchStats();
  }, [session]);

  const fetchStats = async () => {
    const { data, error } = await supabase
      .from("journal_entries")
      .select("created_at")
      .eq("user_id", session?.user.id);

    if (error) return;
    if (!data || data.length === 0) return;

    const sorted = data.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    setStats({
      total: data.length,
      lastDate: sorted[0]?.created_at || null,
    });
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted"
      >
        <div className="p-2 rounded-full bg-accent/10 text-accent">
          <BookOpen size={24} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Total Reflections</span>
          <span className="text-xl font-semibold text-foreground">{stats.total}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted"
      >
        <div className="p-2 rounded-full bg-accent/10 text-accent">
          <CalendarDays size={24} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Last Reflection</span>
          <span className="text-base text-foreground">
            {stats.lastDate
              ? new Date(stats.lastDate).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "No entries yet."}
          </span>
        </div>
      </motion.div>
    </section>
  );
}