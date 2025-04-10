"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart, PieChart } from "@/components/analytics/charts";
import { Activity, Calendar, TrendingUp, Target, Award, BarChart2 } from "lucide-react";

interface JournalEntry {
  id: string;
  content: string;
  mood: string;
  goals: string[];
  habits: string[];
  gratitude: string[];
  created_at: string;
  user_id: string;
}

interface AnalyticsState {
  writingStats: {
    totalEntries: number;
    averageLength: number;
    consistencyScore: number;
  };
  moodTrends: { date: string; mood: string }[];
  habitCompletion: Record<string, number>;
  goalProgress: { goal: string; progress: number }[];
}

interface Session {
  user: {
    id: string;
    email?: string | null;
  };
}

export default function AnalyticsPage() {
  const supabase = createClientComponentClient();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsState>({
    writingStats: {
      totalEntries: 0,
      averageLength: 0,
      consistencyScore: 0,
    },
    moodTrends: [],
    habitCompletion: {},
    goalProgress: [],
  });

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session as Session | null);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session as Session | null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!session?.user?.id) return;

      try {
        // Fetch journal entries
        const { data: entries, error: entriesError } = await supabase
          .from("journal_entries")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: true });

        if (entriesError) throw entriesError;

        const journalEntries = entries as JournalEntry[];

        // Calculate writing statistics
        const totalEntries = journalEntries.length;
        const averageLength = totalEntries > 0 
          ? journalEntries.reduce((acc, entry) => acc + (entry.content?.length || 0), 0) / totalEntries 
          : 0;
        
        // Calculate consistency score (entries per week)
        const entriesByWeek = journalEntries.reduce((acc, entry) => {
          const week = new Date(entry.created_at).toISOString().split("T")[0];
          acc[week] = (acc[week] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        const weeksWithEntries = Object.keys(entriesByWeek).length;
        const consistencyScore = weeksWithEntries > 0
          ? (Object.values(entriesByWeek).reduce((acc, count) => acc + (count >= 3 ? 1 : 0), 0) / weeksWithEntries) * 100
          : 0;

        // Calculate mood trends
        const moodTrends = journalEntries
          .filter(entry => entry.mood)
          .map(entry => ({
            date: new Date(entry.created_at).toISOString().split("T")[0],
            mood: entry.mood,
          }));

        // Calculate habit completion
        const habitCompletion = journalEntries.reduce((acc, entry) => {
          entry.habits?.forEach(habit => {
            acc[habit] = (acc[habit] || 0) + 1;
          });
          return acc;
        }, {} as Record<string, number>);

        // Calculate goal progress
        const goalProgress = journalEntries.reduce((acc, entry) => {
          entry.goals?.forEach(goal => {
            const existingGoal = acc.find(g => g.goal === goal);
            if (existingGoal) {
              existingGoal.progress += 1;
            } else {
              acc.push({ goal, progress: 1 });
            }
          });
          return acc;
        }, [] as { goal: string; progress: number }[]);

        setAnalytics({
          writingStats: {
            totalEntries,
            averageLength: Math.round(averageLength),
            consistencyScore: Math.round(consistencyScore),
          },
          moodTrends,
          habitCompletion,
          goalProgress,
        });
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [session, supabase]);

  if (loading) {
    return (
      <div className="container max-w-7xl mx-auto py-12 px-6">
        <div className="animate-pulse space-y-6">
          <div className="h-12 bg-muted rounded w-1/3"></div>
          <div className="h-10 bg-muted rounded w-full mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-36 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <BarChart2 className="h-8 w-8 text-amber-600 dark:text-amber-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Analytics Dashboard</h1>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-lg p-1 shadow-sm mb-6 flex overflow-x-auto md:flex-wrap">
          <TabsTrigger value="overview" className="flex-1 py-3 rounded-md data-[state=active]:bg-amber-50 data-[state=active]:dark:bg-amber-900/20 data-[state=active]:text-amber-700 data-[state=active]:dark:text-amber-400 data-[state=active]:shadow-sm">
            <Activity className="w-4 h-4 mr-2" />
            <span>OVERVIEW</span>
          </TabsTrigger>
          <TabsTrigger value="writing" className="flex-1 py-3 rounded-md data-[state=active]:bg-amber-50 data-[state=active]:dark:bg-amber-900/20 data-[state=active]:text-amber-700 data-[state=active]:dark:text-amber-400 data-[state=active]:shadow-sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            <span>WRITING PATTERNS</span>
          </TabsTrigger>
          <TabsTrigger value="habits" className="flex-1 py-3 rounded-md data-[state=active]:bg-amber-50 data-[state=active]:dark:bg-amber-900/20 data-[state=active]:text-amber-700 data-[state=active]:dark:text-amber-400 data-[state=active]:shadow-sm">
            <Target className="w-4 h-4 mr-2" />
            <span>HABITS & GOALS</span>
          </TabsTrigger>
          <TabsTrigger value="mood" className="flex-1 py-3 rounded-md data-[state=active]:bg-amber-50 data-[state=active]:dark:bg-amber-900/20 data-[state=active]:text-amber-700 data-[state=active]:dark:text-amber-400 data-[state=active]:shadow-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>MOOD TRENDS</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 border-b dark:border-gray-800">
                <CardTitle className="text-base font-medium">Total Entries</CardTitle>
                <Activity className="h-5 w-5 text-amber-600 dark:text-amber-500" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-3xl font-bold">{analytics.writingStats.totalEntries}</div>
                <p className="text-sm text-muted-foreground mt-1">Journal entries created</p>
              </CardContent>
            </Card>
            <Card className="border dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 border-b dark:border-gray-800">
                <CardTitle className="text-base font-medium">Average Length</CardTitle>
                <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-500" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-3xl font-bold">{analytics.writingStats.averageLength}</div>
                <p className="text-sm text-muted-foreground mt-1">Characters per entry</p>
              </CardContent>
            </Card>
            <Card className="border dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 border-b dark:border-gray-800">
                <CardTitle className="text-base font-medium">Consistency Score</CardTitle>
                <Award className="h-5 w-5 text-amber-600 dark:text-amber-500" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-3xl font-bold">{analytics.writingStats.consistencyScore}%</div>
                <p className="text-sm text-muted-foreground mt-1">Of weeks with 3+ entries</p>
              </CardContent>
            </Card>
            <Card className="border dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 border-b dark:border-gray-800">
                <CardTitle className="text-base font-medium">Top Habit</CardTitle>
                <Target className="h-5 w-5 text-amber-600 dark:text-amber-500" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-3xl font-bold truncate">
                  {Object.entries(analytics.habitCompletion).length > 0 
                    ? Object.entries(analytics.habitCompletion).sort((a, b) => b[1] - a[1])[0][0]
                    : "N/A"}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Most tracked habit</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="writing" className="space-y-8 mt-8">
          <Card className="border dark:border-gray-800 shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 border-b dark:border-gray-800">
              <CardTitle>Writing Patterns</CardTitle>
            </CardHeader>
            <CardContent className="h-80 pt-6">
              {analytics.moodTrends.length > 0 ? (
                <LineChart data={analytics.moodTrends.map(trend => ({
                  date: trend.date,
                  value: analytics.writingStats.averageLength,
                }))} />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">No writing data available yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="habits" className="space-y-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border dark:border-gray-800 shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 border-b dark:border-gray-800">
                <CardTitle>Habit Completion</CardTitle>
              </CardHeader>
              <CardContent className="h-80 pt-6">
                {Object.keys(analytics.habitCompletion).length > 0 ? (
                  <BarChart data={Object.entries(analytics.habitCompletion).map(([habit, count]) => ({
                    name: habit,
                    value: count,
                  }))} />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">No habit data available yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="border dark:border-gray-800 shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 border-b dark:border-gray-800">
                <CardTitle>Goal Progress</CardTitle>
              </CardHeader>
              <CardContent className="h-80 pt-6">
                {analytics.goalProgress.length > 0 ? (
                  <PieChart data={analytics.goalProgress.map(goal => ({
                    name: goal.goal,
                    value: goal.progress,
                  }))} />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">No goal data available yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mood" className="space-y-8 mt-8">
          <Card className="border dark:border-gray-800 shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 border-b dark:border-gray-800">
              <CardTitle>Mood Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-80 pt-6">
              {analytics.moodTrends.length > 0 ? (
                <LineChart data={analytics.moodTrends.map(trend => ({
                  date: trend.date,
                  value: trend.mood === "happy" ? 1 : trend.mood === "neutral" ? 0 : -1,
                }))} />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">No mood data available yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 