"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/SupabaseProvider";
import { Loader } from "lucide-react";

import HabitsCard from "@/components/layout/HabitsCard";
import GoalsCard from "@/components/layout/GoalsCard";
import FocusCard from "@/components/layout/FocusCard";
import StreakTracker from "@/components/layout/StreakTracker";
import QuickActionsCard from "@/components/layout/QuickActionsCard";
import DashboardCard from "@/components/layout/DashboardCard";
import TodayOverviewBar from "@/components/layout/TodayOverviewBar";

export default function MissionPage() {
  const { session, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session) {
      router.push("/auth?redirect=/profile/mission");
    }
  }, [isLoading, session, router]);

  if (isLoading || !session) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <section className="min-h-screen pt-20 px-4 sm:px-6 py-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-3xl text-orange-500">🎯</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">
            Mission Control
          </h1>
        </div>
        <p className="text-muted-foreground text-base sm:text-lg">
          Welcome back{session.user?.email ? `, ${session.user.email}` : ""} 👋 — Your hub for daily self-mastery.
        </p>
      </div>

      {/* Overview Bar */}
      <TodayOverviewBar />

      {/* Section: Daily Self-Mastery */}
      <div className="mb-12">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
          Daily Self-Mastery
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard index={0}><HabitsCard /></DashboardCard>
          <DashboardCard index={1}><GoalsCard /></DashboardCard>
          <DashboardCard index={2}><FocusCard /></DashboardCard>
        </div>
      </div>

      {/* Section: Insights & Momentum */}
      <div className="mb-12">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
          Insights & Momentum
        </h3>
        <div className="space-y-8">
          <StreakTracker />
          <DashboardCard index={3}><QuickActionsCard /></DashboardCard>
        </div>
      </div>
    </section>
  );
}