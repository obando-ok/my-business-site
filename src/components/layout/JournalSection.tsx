"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/SupabaseProvider";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface JournalEntry {
  id: number;
  created_at: string;
  content: string;
  mood?: string;
  pinned?: boolean;
}

const MOODS = [
  { value: "Focused", label: "🌟 Focused" },
  { value: "Grateful", label: "🙏 Grateful" },
  { value: "Tired", label: "😴 Tired" },
  { value: "Stressed", label: "😩 Stressed" },
  { value: "Peaceful", label: "☮️ Peaceful" },
  { value: "Motivated", label: "🚀 Motivated" },
];

const MAX_CONTENT_LENGTH = 2000;
const MOOD_COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD", "#FF9F76"];

export default function JournalSection() {
  const { session } = useAuth();
  const router = useRouter();
  const topRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [activeTab, setActiveTab] = useState<'new' | 'history' | 'insights'>('new');
  const [entry, setEntry] = useState("");
  const [mood, setMood] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [history, setHistory] = useState<JournalEntry[]>([]);
  const [filtered, setFiltered] = useState<JournalEntry[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [streak, setStreak] = useState(0);
  const [summaries, setSummaries] = useState<{ [key: number]: string }>({});
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  
  const [loadingStates, setLoadingStates] = useState({
    submitting: false,
    editing: false,
    deleting: false,
    summarizing: false,
    pinning: false,
  });

  // Authentication check
  useEffect(() => {
    if (!session) router.push("/auth");
  }, [session, router]);

  // Draft saving
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("journalDraft", JSON.stringify({ content: entry, mood }));
    }, 500);
    return () => clearTimeout(timer);
  }, [entry, mood]);

  // Fetch entries
  const fetchEntries = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("journal_entries")
        .select("id, created_at, content, mood, pinned")
        .eq("user_id", session?.user.id)
        .order("pinned", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) {
        setHistory(data);
        calculateStreak(data);
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  }, [session]);

  useEffect(() => {
    if (session?.user?.id) fetchEntries();
  }, [session, fetchEntries]);

  // Calculate streak and XP
  const calculateStreak = (entries: JournalEntry[]) => {
    const dates = entries.map(e => new Date(e.created_at).toISOString().split("T")[0]);
    const uniqueDates = Array.from(new Set(dates)).sort((a, b) => +new Date(b) - +new Date(a));
    
    let currentStreak = 0;
    let currentDate = new Date();

    for (const dateStr of uniqueDates) {
      const entryDate = new Date(dateStr);
      if (entryDate.toDateString() === currentDate.toDateString()) {
        currentStreak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    setStreak(currentStreak);
    setXp(prev => prev + (currentStreak * 10));
    
    // Award badges
    if (currentStreak >= 7 && !badges.includes('7-day Streak')) {
      setBadges([...badges, '7-day Streak']);
    }
    if (entries.length >= 10 && !badges.includes('Decade Writer')) {
      setBadges([...badges, 'Decade Writer']);
    }
  };

  // Filter entries
  useEffect(() => {
    const timer = setTimeout(() => {
      let filteredList = history;
      if (search.trim()) {
        filteredList = filteredList.filter(e => 
          e.content.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (filterDate) {
        filteredList = filteredList.filter(e => 
          new Date(e.created_at).toISOString().split("T")[0] === filterDate
        );
      }
      setFiltered(filteredList);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, filterDate, history]);

  // Entry actions
  const handleSubmit = async () => { /* Keep existing submit logic */ };
  const handleDelete = async (id: number) => { /* Keep existing delete logic */ };
  const handleEdit = (entry: JournalEntry) => { /* Keep existing edit logic */ };
  const handleSaveEdit = async (id: number) => { /* Keep existing save edit logic */ };

  // Pin entry handler
  const handlePin = async (id: number) => {
    setLoadingStates(prev => ({ ...prev, pinning: true }));
    try {
      const { data } = await supabase
        .from("journal_entries")
        .select("pinned")
        .eq("id", id)
        .single();

      const { error } = await supabase
        .from("journal_entries")
        .update({ pinned: !data?.pinned })
        .eq("id", id);

      if (!error) fetchEntries();
    } catch (error) {
      console.error("Pin error:", error);
    } finally {
      setLoadingStates(prev => ({ ...prev, pinning: false }));
    }
  };

  // Mood analytics data
  const getMoodData = () => {
    const moodCounts = history.reduce((acc, entry) => {
      if (entry.mood) acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(moodCounts).map(([name, value]) => ({ name, value }));
  };

  const getWeeklyData = () => {
    const weeklyCounts = Array(7).fill(0);
    history.forEach(entry => {
      const day = new Date(entry.created_at).getDay();
      weeklyCounts[day]++;
    });
    return weeklyCounts.map((count, index) => ({
      name: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][index],
      count,
    }));
  };

  // AI Summary generation
  const generateSummary = async (entry: JournalEntry) => { /* Keep existing summary logic */ };

  return (
    <SectionWrapper id="journal" className="bg-background py-8 md:py-12">
      <div ref={topRef} className="max-w-6xl mx-auto space-y-6 px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            Daily Journal
          </h1>
          
          {/* Gamification Progress */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-accent/20 px-3 py-1 rounded-full flex items-center gap-2">
              <span>🔥</span>
              <span>{streak}-Day Streak</span>
            </div>
            <div className="bg-accent/20 px-3 py-1 rounded-full flex items-center gap-2">
              <span>⚡ Level {Math.floor(xp / 100)}</span>
              <div className="h-2 w-20 bg-background rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all" 
                  style={{ width: `${(xp % 100)}%` }}
                />
              </div>
            </div>
            {badges.map(badge => (
              <div key={badge} className="bg-accent/20 px-3 py-1 rounded-full flex items-center gap-2">
                <span>🏆</span>
                <span>{badge}</span>
              </div>
            ))}
          </div>

          {/* Tabs Navigation */}
          <motion.div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button
              variant={activeTab === 'new' ? 'default' : 'outline'}
              onClick={() => setActiveTab('new')}
              className="gap-2"
            >
              ➕ New Entry
            </Button>
            <Button
              variant={activeTab === 'history' ? 'default' : 'outline'}
              onClick={() => setActiveTab('history')}
              className="gap-2"
            >
              📅 Entry History
            </Button>
            <Button
              variant={activeTab === 'insights' ? 'default' : 'outline'}
              onClick={() => setActiveTab('insights')}
              className="gap-2"
            >
              📊 Insights
            </Button>
          </motion.div>
        </motion.div>

        {/* Active Tab Content */}
        {activeTab === 'new' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Journal Input Section (Keep existing form elements) */}
            <div className="relative">
              <textarea
                ref={textAreaRef}
                rows={5}
                placeholder="What did you learn today? What are you proud of?"
                value={entry}
                onChange={(e) => setEntry(e.target.value.slice(0, MAX_CONTENT_LENGTH))}
                className="w-full p-4 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                {entry.length}/{MAX_CONTENT_LENGTH}
              </div>
            </div>

            {/* Mood Selection (Keep existing mood buttons) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {MOODS.map((moodOption) => (
                <button
                  key={moodOption.value}
                  type="button"
                  onClick={() => handleMoodSelect(moodOption.value)}
                  className={`mood-button p-2 text-sm rounded-md transition-all duration-300 flex items-center justify-center gap-2
                    ${
                      mood === moodOption.value
                        ? "text-background font-bold scale-[0.98]"
                        : "text-foreground/80 hover:bg-accent/40 hover:text-foreground"
                    }`}
                >
                  {/* Keep existing mood button content */}
                </button>
              ))}
            </div>

            {/* Submission Controls (Keep existing submit button) */}
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Timeline Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">AI Summary Timeline</h3>
              <div className="flex overflow-x-auto pb-4 gap-6 px-2">
                {history.map(entry => (
                  <div key={entry.id} className="flex-shrink-0 w-64">
                    <div className="bg-muted/20 p-4 rounded-lg h-full">
                      <p className="text-sm text-muted-foreground mb-2">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-sm line-clamp-4">
                        {summaries[entry.id] || 'Generate summary to view'}
                      </p>
                      {!summaries[entry.id] && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => generateSummary(entry)}
                          disabled={loadingStates.summarizing}
                        >
                          {loadingStates.summarizing ? 'Generating...' : 'Summarize'}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Entries List (Keep existing entries list with pin functionality) */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <h3 className="text-xl font-semibold">All Entries</h3>
                <div className="flex gap-2 w-full md:w-auto">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search entries..."
                    className="w-full p-2 rounded-md border bg-background"
                  />
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="p-2 rounded-md border bg-background"
                  />
                </div>
              </div>
              
              {/* Entries List Items with Pinning */}
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  className="p-4 rounded-lg border bg-background"
                >
                  <div className="flex justify-between items-start mb-2">
                    {/* Add pin button */}
                    <button
                      onClick={() => handlePin(item.id)}
                      className={`text-xl ${item.pinned ? 'text-yellow-500' : 'text-muted-foreground'}`}
                    >
                      📌
                    </button>
                  </div>
                  {/* Keep existing entry content */}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'insights' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Mood Analytics */}
            <div className="bg-muted/20 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Mood Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getMoodData()}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                    >
                      {getMoodData().map((_, index) => (
                        <Cell key={index} fill={MOOD_COLORS[index % MOOD_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Weekly Activity */}
            <div className="bg-muted/20 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Weekly Activity</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getWeeklyData()}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#4ECDC4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}