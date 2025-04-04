import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import { useSession } from "@/components/providers/SupabaseProvider";
import { motion } from "framer-motion";
import JournalStats from "@/components/layout/JournalStats";

interface Milestone {
  id: string;
  day_count: number;
  label: string;
  unlocked_at: string;
}

export default function ProfilePage() {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  useEffect(() => {
    if (session === undefined) return;

    if (!session) {
      router.push("/auth");
    } else {
      fetchMilestones();
    }

    setLoading(false);
  }, [session]);

  const fetchMilestones = async () => {
    const { data } = await supabase
      .from("milestones")
      .select("id, day_count, label, unlocked_at")
      .eq("user_id", session?.user?.id)
      .order("day_count", { ascending: true });

    if (data) setMilestones(data);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">
        Loading profile...
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-10"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Your Profile
          </h1>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/auth");
            }}
            className="px-4 py-2 border rounded-md text-sm text-foreground border-border hover:bg-muted transition"
          >
            Logout
          </button>
        </div>

        {/* ✅ Journal Stats Overview */}
        <JournalStats />

        <div>
          <h2 className="text-lg font-semibold text-muted-foreground mb-4">
            Milestones You've Earned
          </h2>
          {milestones.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No milestones unlocked yet. Keep journaling!
            </p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {milestones.map((ms) => (
                <motion.li
                  key={ms.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="p-4 rounded-lg border border-border bg-accent/10 text-accent"
                >
                  <div className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">
                    {ms.day_count} Days
                  </div>
                  <div className="font-medium text-sm">{ms.label}</div>
                  <div className="text-[11px] text-muted-foreground mt-2">
                    {new Date(ms.unlocked_at).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </main>
  );
}
