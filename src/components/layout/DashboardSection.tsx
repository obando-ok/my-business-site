"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/SupabaseProvider";
import { useRouter } from "next/navigation";

export default function DashboardSection() {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!session) router.push("/auth");
  }, [session, router]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const [habits, setHabits] = useState([
    { id: 1, title: "Wake up at 6:00 AM", completed: false },
    { id: 2, title: "Read 10 pages", completed: false },
    { id: 3, title: "45-minute workout", completed: false },
  ]);

  const toggleHabit = (id: number) => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  return (
    <SectionWrapper id="dashboard" className="bg-background">
      <div className="max-w-6xl mx-auto space-y-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold"
        >
          Daily Dashboard — {today}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Habits Tracker Card */}
          <div className="bg-accent/20 border border-border p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4">Today's Habits</h3>
            <ul className="space-y-2">
              {habits.map(habit => (
                <li key={habit.id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={habit.completed}
                    onChange={() => toggleHabit(habit.id)}
                    className="accent-primary h-5 w-5"
                  />
                  <span
                    className={`text-sm ${
                      habit.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {habit.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Goals Card */}
          <div className="bg-accent/20 border border-border p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Weekly Goals</h3>
            <ul className="list-disc ml-4 text-sm space-y-1 text-muted-foreground">
              <li>Finish 3 workouts</li>
              <li>Reach 5 days of prayer</li>
              <li>Submit 2 job applications</li>
            </ul>
          </div>

          {/* AI Plan Card */}
          <div className="bg-accent/20 border border-border p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">AI-Powered Focus</h3>
            <p className="text-sm text-muted-foreground">
              Based on your profile, today's primary focus is:
            </p>
            <p className="text-primary font-bold mt-2">Leadership through consistency.</p>
            <Button className="mt-4">Get My Plan</Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
