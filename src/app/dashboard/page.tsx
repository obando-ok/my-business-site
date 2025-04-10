"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/SupabaseProvider";
import { Loader } from "lucide-react";

// Components
import HabitsCard from "@/components/layout/HabitsCard";
import GoalsCard from "@/components/layout/GoalsCard";
import FocusCard from "@/components/layout/FocusCard";
import StreakTracker from "@/components/layout/StreakTracker";
import QuickActionsCard from "@/components/layout/QuickActionsCard";
import DashboardCard from "@/components/layout/DashboardCard";
import TodayOverviewBar from "@/components/layout/TodayOverviewBar";

const getSafeRedirectUrl = (path: string) => 
  `/auth?redirect=${encodeURIComponent(path)}`;

export default function MissionPage() {
  const { session, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session) {
      router.push(getSafeRedirectUrl("/profile/mission"));
    }
  }, [isLoading, session, router]);

  if (isLoading || !session) {
    return (
      <div 
        className="flex h-screen w-full items-center justify-center"
        role="status"
        aria-live="polite"
        aria-busy={isLoading}
      >
        <Loader 
          className="h-8 w-8 animate-spin text-orange-500" 
          aria-label="Loading mission control"
        />
      </div>
    );
  }

  return (
    <section className="min-h-screen pt-20 px-4 sm:px-6 py-12 max-w-7xl mx-auto">
      {/* Enhanced Header Section */}
      <div className="mb-8 bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100">
        <div className="flex items-center gap-4 mb-3">
          <div className="p-3 bg-orange-100 rounded-lg">
            <span className="text-3xl">🎯</span>
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Mission Control
            </h1>
            <p className="text-gray-600 mt-1 text-base sm:text-lg">
              Welcome back{session.user?.email ? `, ${session.user.email}` : ""} 👋
              <span className="block text-sm text-gray-500 mt-1">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </p>
          </div>
        </div>
        <TodayOverviewBar />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Left Column - Daily Priorities */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 border-l-4 border-orange-500 pl-3">
            Daily Priorities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard index={0} className="hover:shadow-lg transition-shadow duration-200">
              <HabitsCard />
            </DashboardCard>
            <DashboardCard index={1} className="hover:shadow-lg transition-shadow duration-200">
              <GoalsCard />
            </DashboardCard>
            <div className="md:col-span-2">
              <DashboardCard index={2} className="hover:shadow-lg transition-shadow duration-200">
                <FocusCard />
              </DashboardCard>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Weekly Streak
            </h2>
            <StreakTracker instanceId="dashboard-page" />
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <QuickActionsCard />
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Weekly Progress Overview
        </h2>
        <div className="h-48 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-gray-400">
          Progress Chart (Coming Soon)
        </div>
      </div>
    </section>
  );
}