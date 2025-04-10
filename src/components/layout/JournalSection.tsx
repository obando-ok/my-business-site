"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/SupabaseProvider";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { debounce } from "lodash";
import { REFLECTION_PROMPTS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useHotkeys } from "react-hotkeys-hook";

interface JournalEntry {
  id: number;
  created_at: string;
  content: string;
  mood?: string;
  pinned?: boolean;
  goals?: string[];
  habits?: string[];
  gratitude?: string[];
  summaries?: Record<number, string>;
}

const MOODS = [
  { value: "Focused", label: "🌟 Focused", color: "#FF6B6B" },
  { value: "Grateful", label: "🙏 Grateful", color: "#4ECDC4" },
  { value: "Tired", label: "😴 Tired", color: "#45B7D1" },
  { value: "Stressed", label: "😩 Stressed", color: "#96CEB4" },
  { value: "Peaceful", label: "☮️ Peaceful", color: "#FFEEAD" },
  { value: "Motivated", label: "🚀 Motivated", color: "#FF9F76" },
];

const HABITS = [
  "Meditation",
  "Exercise",
  "Reading",
  "Learning",
  "Gratitude Journaling",
  "Healthy Eating",
  "Early Wake-up",
  "No Screens Before Bed",
];

const MAX_CONTENT_LENGTH = 2000;
const MOOD_COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD", "#FF9F76"];

// Optimized state interface
interface JournalState {
  entry: string;
  mood: string;
  submitted: boolean;
  history: JournalEntry[];
  editingId: number | null;
  editingContent: string;
  search: string;
  filterDate: string;
  streak: number;
  xp: number;
  badges: string[];
  selectedHabits: string[];
  gratitudeList: string[];
  goals: string[];
  currentPrompt: string;
  habitStreaks: Record<string, number>;
}

const initialState: JournalState = {
  entry: "",
  mood: "",
  submitted: false,
  history: [],
  editingId: null,
  editingContent: "",
  search: "",
  filterDate: "",
  streak: 0,
  xp: 0,
  badges: [],
  selectedHabits: [],
  gratitudeList: [],
  goals: [],
  currentPrompt: REFLECTION_PROMPTS[0],
  habitStreaks: {},
};

// Form validation schema
const journalEntrySchema = z.object({
  content: z.string()
    .min(1, "Entry cannot be empty")
    .max(2000, "Entry is too long (max 2000 characters)"),
  mood: z.string().optional(),
  goals: z.array(z.string().min(1, "Goal cannot be empty")).optional(),
  habits: z.array(z.string()).optional(),
  gratitude: z.array(z.string().min(1, "Gratitude item cannot be empty")).optional(),
});

type JournalEntryForm = z.infer<typeof journalEntrySchema>;

export default function JournalSection() {
  const { session } = useAuth();
  const router = useRouter();
  const topRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [activeTab, setActiveTab] = useState<'new' | 'history' | 'insights'>('new');
  const [state, setState] = useState<JournalState>(initialState);
  const [loadingStates, setLoadingStates] = useState({
    submitting: false,
    editing: false,
    deleting: false,
    summarizing: false,
    pinning: false,
  });
  const { toast } = useToast();
  const autoSaveInterval = useRef<NodeJS.Timeout | null>(null);
  const lastSavedContent = useRef<string>("");

  // Form handling with react-hook-form
  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<JournalEntryForm>({
    resolver: zodResolver(journalEntrySchema),
    defaultValues: {
      content: "",
      mood: "",
      goals: [],
      habits: [],
      gratitude: [],
    },
  });

  // Keyboard shortcuts
  useHotkeys("ctrl+s,cmd+s", (e: KeyboardEvent) => {
    e.preventDefault();
    const formData = watch();
    handleSubmit(formData);
  });

  useHotkeys("ctrl+b,cmd+b", () => {
    setState(prev => ({
      ...prev,
      entry: prev.entry + "**bold text**",
    }));
  });

  useHotkeys("ctrl+i,cmd+i", () => {
    setState(prev => ({
      ...prev,
      entry: prev.entry + "_italic text_",
    }));
  });

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    if (!session?.user?.id || state.entry === lastSavedContent.current) return;

    try {
      const { error } = await supabase
        .from("journal_drafts")
        .upsert({
          user_id: session.user.id,
          content: state.entry,
          mood: state.mood,
          goals: state.goals,
          habits: state.selectedHabits,
          gratitude: state.gratitudeList,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        throw new Error(`Failed to auto-save: ${error.message}`);
      }

      lastSavedContent.current = state.entry;
      toast({
        title: "Auto-saved",
        description: "Your entry has been auto-saved",
      });
    } catch (error) {
      console.error("Auto-save error:", error);
    }
  }, [session, state, toast]);

  // Load draft on mount
  useEffect(() => {
    const loadDraft = async () => {
      if (!session?.user?.id) return;

      try {
        const { data, error } = await supabase
          .from("journal_drafts")
          .select("*")
          .eq("user_id", session.user.id)
          .order("updated_at", { ascending: false })
          .limit(1);

        if (error) {
          throw new Error(`Failed to load draft: ${error.message}`);
        }

        if (data && data.length > 0) {
          const latestDraft = data[0];
          setState(prev => ({
            ...prev,
            entry: latestDraft.content || "",
            mood: latestDraft.mood || "",
            goals: latestDraft.goals || [],
            selectedHabits: latestDraft.habits || [],
            gratitudeList: latestDraft.gratitude || [],
          }));
          lastSavedContent.current = latestDraft.content || "";
        }
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    };

    loadDraft();
  }, [session]);

  // Setup auto-save interval
  useEffect(() => {
    autoSaveInterval.current = setInterval(autoSave, 30000); // Auto-save every 30 seconds

    return () => {
      if (autoSaveInterval.current) {
        clearInterval(autoSaveInterval.current);
      }
    };
  }, [autoSave]);

  // Auto-save on content change
  useEffect(() => {
    const debouncedAutoSave = setTimeout(() => {
      if (state.entry !== lastSavedContent.current) {
        autoSave();
      }
    }, 2000); // Debounce for 2 seconds

    return () => clearTimeout(debouncedAutoSave);
  }, [state.entry, autoSave]);

  // Memoized filtered entries
  const filteredEntries = useMemo(() => {
    let filtered = state.history;
    if (state.search.trim()) {
      filtered = filtered.filter(e => 
        e.content.toLowerCase().includes(state.search.toLowerCase())
      );
    }
    if (state.filterDate) {
      filtered = filtered.filter(e => 
        new Date(e.created_at).toISOString().split("T")[0] === state.filterDate
      );
    }
    return filtered;
  }, [state.history, state.search, state.filterDate]);

  // Debounced draft saving
  const saveDraft = useCallback(
    debounce((entry: string, mood: string) => {
      localStorage.setItem("journalDraft", JSON.stringify({ content: entry, mood }));
    }, 1000),
    []
  );

  // Authentication check
  useEffect(() => {
    if (!session) router.push("/auth");
  }, [session, router]);

  // Draft saving effect
  useEffect(() => {
    saveDraft(state.entry, state.mood);
    return () => saveDraft.cancel();
  }, [state.entry, state.mood, saveDraft]);

  // Enhanced error handling for fetchEntries
  const fetchEntries = useCallback(async () => {
    if (!session?.user?.id) return;

    try {
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch entries: ${error.message}`);
      }

      setState(prev => ({
        ...prev,
        history: data || [],
      }));

      const dates = new Set(data?.map(e => new Date(e.created_at).toISOString().split("T")[0]) || []);
      calculateStreaks(dates);
    } catch (error) {
      console.error("Error fetching entries:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch journal entries",
        variant: "destructive",
      });
    }
  }, [session, toast]);

  // Optimized streak calculation
  const calculateStreaks = useCallback((dates: Set<string>) => {
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

    setState(prev => ({
      ...prev,
      streak: current,
    }));
  }, []);

  // Enhanced form submission with validation
  const handleSubmit = useCallback(async (formData: JournalEntryForm) => {
    if (!session?.user?.id) return;

    setLoadingStates(prev => ({ ...prev, submitting: true }));
    try {
      const { data, error } = await supabase
        .from("journal_entries")
        .insert([
          {
            content: formData.content,
            user_id: session.user.id,
            mood: formData.mood,
            goals: formData.goals?.filter(g => g.trim()),
            habits: formData.habits,
            gratitude: formData.gratitude?.filter(g => g.trim()),
          },
        ])
        .select();

      if (error) {
        throw new Error(`Failed to save entry: ${error.message}`);
      }

      setState(prev => ({
        ...prev,
        entry: "",
        mood: "",
        submitted: true,
        history: [data[0], ...prev.history],
        goals: [],
        selectedHabits: [],
        gratitudeList: [],
      }));

      reset();

      const newDate = new Date().toISOString().split("T")[0];
      const dates = new Set([...state.history.map(e => new Date(e.created_at).toISOString().split("T")[0]), newDate]);
      calculateStreaks(dates);

      toast({
        title: "Success",
        description: "Your journal entry has been saved",
      });
    } catch (error) {
      console.error("Error submitting entry:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save journal entry",
        variant: "destructive",
      });
    } finally {
      setLoadingStates(prev => ({ ...prev, submitting: false }));
    }
  }, [session, state.history, calculateStreaks, reset, toast]);

  // Add a useEffect to verify Supabase client on mount
  useEffect(() => {
    console.log("Component mounted, checking Supabase client status");
    if (supabase) {
      console.log("Supabase client initialized");
    } else {
      console.log("Supabase client not available");
    }
    
    if (session?.user) {
      console.log("User session available:", session.user.id);
    } else {
      console.log("No user session available");
    }
  }, [supabase, session]);

  // Add a useEffect to handle session changes
  useEffect(() => {
    if (session?.user?.id) {
      console.log("Session available, attempting to fetch entries");
      fetchEntries().catch(error => {
        console.error("Failed to fetch entries after session change:", error);
      });
    } else {
      console.log("No session available");
    }
  }, [session, fetchEntries]);

  // Add a useEffect to log session changes
  useEffect(() => {
    console.log("Session state changed:", {
      hasSession: !!session,
      userId: session?.user?.id,
      userEmail: session?.user?.email
    });
  }, [session]);

  // Add a useEffect to log initial mount
  useEffect(() => {
    console.log("JournalSection mounted");
    return () => console.log("JournalSection unmounted");
  }, []);

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

    setState(prev => ({
      ...prev,
      streak: currentStreak,
    }));
  };

  // Add new habit streak calculation
  const calculateHabitStreaks = (entries: JournalEntry[]) => {
    const streaks: Record<string, number> = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    HABITS.forEach(habit => {
      let currentStreak = 0;
      let currentDate = new Date(today);

      for (let i = 0; i < 30; i++) {
        const hasEntry = entries.some(entry => {
          const entryDate = new Date(entry.created_at);
          entryDate.setHours(0, 0, 0, 0);
          return entryDate.getTime() === currentDate.getTime() && 
                 entry.habits?.includes(habit);
        });

        if (hasEntry) {
          currentStreak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }

      streaks[habit] = currentStreak;
    });

    setState(prev => ({
      ...prev,
      habitStreaks: streaks,
    }));
  };

  // Filter entries
  useEffect(() => {
    const timer = setTimeout(() => {
      let filteredList = state.history;
      if (state.search.trim()) {
        filteredList = filteredList.filter(e => 
          e.content.toLowerCase().includes(state.search.toLowerCase())
        );
      }
      if (state.filterDate) {
        filteredList = filteredList.filter(e => 
          new Date(e.created_at).toISOString().split("T")[0] === state.filterDate
        );
      }
      setState(prev => ({
        ...prev,
        history: filteredList,
      }));
    }, 300);
    return () => clearTimeout(timer);
  }, [state.search, state.filterDate, state.history]);

  // Mood selection handler
  const handleMoodSelect = useCallback((selectedMood: string) => {
    setState(prev => ({
      ...prev,
      mood: prev.mood === selectedMood ? "" : selectedMood,
    }));
  }, []);

  // Entry deletion
  const handleDelete = async (id: number) => {
    if (!session?.user?.id) {
      console.error("No user session found");
      return;
    }

    setLoadingStates(prev => ({ ...prev, deleting: true }));
    try {
      const { error } = await supabase
        .from("journal_entries")
        .delete()
        .eq("id", id)
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
      }

      await fetchEntries();
    } catch (error) {
      console.error("Deletion error:", error);
    } finally {
      setLoadingStates(prev => ({ ...prev, deleting: false }));
    }
  };

  // Edit entry handlers
  const handleEdit = (entry: JournalEntry) => {
    setState(prev => ({
      ...prev,
      editingId: entry.id,
      editingContent: entry.content,
    }));
  };

  const handleSaveEdit = async (id: number) => {
    if (!session?.user?.id) {
      console.error("No user session found");
      return;
    }

    setLoadingStates(prev => ({ ...prev, editing: true }));
    try {
      const { error } = await supabase
        .from("journal_entries")
        .update({ content: state.editingContent })
        .eq("id", id)
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
      }

      setState(prev => ({
        ...prev,
        editingId: null,
      }));
      await fetchEntries();
    } catch (error) {
      console.error("Edit error:", error);
    } finally {
      setLoadingStates(prev => ({ ...prev, editing: false }));
    }
  };

  // Pin entry handler
  const handlePin = async (id: number) => {
    if (!session?.user?.id) {
      console.error("No user session found");
      return;
    }

    setLoadingStates(prev => ({ ...prev, pinning: true }));
    try {
      const { data, error: fetchError } = await supabase
        .from("journal_entries")
        .select("pinned")
        .eq("id", id)
        .eq("user_id", session.user.id)
        .single();

      if (fetchError) {
        console.error("Supabase fetch error:", fetchError);
        throw new Error(fetchError.message);
      }

      const { error: updateError } = await supabase
        .from("journal_entries")
        .update({ pinned: !data?.pinned })
        .eq("id", id)
        .eq("user_id", session.user.id);

      if (updateError) {
        console.error("Supabase update error:", updateError);
        throw new Error(updateError.message);
      }

      await fetchEntries();
    } catch (error) {
      console.error("Pin error:", error);
    } finally {
      setLoadingStates(prev => ({ ...prev, pinning: false }));
    }
  };

  // Mood analytics data
  const getMoodData = () => {
    const moodCounts = state.history.reduce((acc, entry) => {
      if (entry.mood) acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(moodCounts).map(([name, value]) => ({ name, value }));
  };

  const getWeeklyData = () => {
    const weeklyCounts = Array(7).fill(0);
    state.history.forEach(entry => {
      const day = new Date(entry.created_at).getDay();
      weeklyCounts[day]++;
    });
    return weeklyCounts.map((count, index) => ({
      name: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][index],
      count,
    }));
  };

  // AI Summary generation
  const generateSummary = async (entry: JournalEntry) => {
    setLoadingStates(prev => ({ ...prev, summarizing: true }));
    try {
      // Simulated AI summary generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      setState(prev => ({
        ...prev,
        history: prev.history.map(e =>
          e.id === entry.id ? { ...e, summaries: { [e.id]: "This is a simulated summary of the journal entry." } } : e
        ),
      }));
    } catch (error) {
      console.error("Summary generation error:", error);
    } finally {
      setLoadingStates(prev => ({ ...prev, summarizing: false }));
    }
  };

  // Add new habit selection handler
  const handleHabitSelect = (habit: string) => {
    setState(prev => ({
      ...prev,
      selectedHabits: prev.selectedHabits.includes(habit)
        ? prev.selectedHabits.filter(h => h !== habit)
        : [...prev.selectedHabits, habit],
    }));
  };

  // Add new gratitude item handler
  const handleAddGratitude = () => {
    if (state.gratitudeList.length < 3) {
      setState(prev => ({
        ...prev,
        gratitudeList: [...prev.gratitudeList, ""],
      }));
    }
  };

  // Add new goal handler
  const handleAddGoal = () => {
    if (state.goals.length < 3) {
      setState(prev => ({
        ...prev,
        goals: [...prev.goals, ""],
      }));
    }
  };

  // Loading state component
  const renderLoadingState = () => (
    <div className="space-y-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );

  return (
    <ErrorBoundary>
      <SectionWrapper id="journal" className="bg-background py-8 md:py-12">
        <div ref={topRef} className="max-w-6xl mx-auto space-y-6 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              Daily Journal
            </h1>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-accent/20 px-3 py-1 rounded-full flex items-center gap-2">
                <span>🔥</span>
                <span>{state.streak}-Day Streak</span>
              </div>
              <div className="bg-accent/20 px-3 py-1 rounded-full flex items-center gap-2">
                <span>⚡ Level {Math.floor(state.xp / 100)}</span>
                <div className="h-2 w-20 bg-background rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all" 
                    style={{ width: `${(state.xp % 100)}%` }}
                  />
                </div>
              </div>
              {state.badges.map(badge => (
                <div key={badge} className="bg-accent/20 px-3 py-1 rounded-full flex items-center gap-2">
                  <span>🏆</span>
                  <span>{badge}</span>
                </div>
              ))}
            </div>

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

          <AnimatePresence mode="wait">
            {activeTab === 'new' && (
              <motion.div
                key="new"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="relative">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Today's Reflection Prompt</h3>
                    <p className="text-muted-foreground italic">{state.currentPrompt}</p>
                  </div>
                  <textarea
                    ref={textAreaRef}
                    rows={5}
                    placeholder="What did you learn today? What are you proud of?"
                    value={state.entry}
                    onChange={(e) => setState(prev => ({
                      ...prev,
                      entry: e.target.value.slice(0, MAX_CONTENT_LENGTH),
                    }))}
                    className="w-full p-4 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                    {state.entry.length}/{MAX_CONTENT_LENGTH}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Daily Habits</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {HABITS.map((habit) => (
                      <button
                        key={habit}
                        type="button"
                        onClick={() => handleHabitSelect(habit)}
                        className={`p-2 text-sm rounded-md transition-all duration-300 flex items-center justify-center gap-2 relative
                          ${
                            state.selectedHabits.includes(habit)
                              ? "bg-primary text-background font-bold scale-[0.98]"
                              : "text-foreground/80 hover:bg-accent/40 hover:text-foreground"
                          }`}
                      >
                        {state.selectedHabits.includes(habit) && (
                          <span className="absolute top-1 right-1 text-xs">✓</span>
                        )}
                        {habit}
                        {state.habitStreaks[habit] > 0 && (
                          <span className="text-xs bg-background/20 px-1 rounded">
                            {state.habitStreaks[habit]}🔥
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Gratitude List</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddGratitude}
                      disabled={state.gratitudeList.length >= 3}
                    >
                      Add Item
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {state.gratitudeList.map((item, index) => (
                      <input
                        key={index}
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const newList = [...state.gratitudeList];
                          newList[index] = e.target.value;
                          setState(prev => ({
                            ...prev,
                            gratitudeList: newList,
                          }));
                        }}
                        placeholder="What are you grateful for?"
                        className="w-full p-2 rounded-md border bg-background"
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Today's Goals</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddGoal}
                      disabled={state.goals.length >= 3}
                    >
                      Add Goal
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {state.goals.map((goal, index) => (
                      <div key={index} className="relative">
                        <input
                          type="text"
                          value={goal}
                          onChange={(e) => {
                            const newGoals = [...state.goals];
                            newGoals[index] = e.target.value;
                            setState(prev => ({
                              ...prev,
                              goals: newGoals,
                            }));
                          }}
                          placeholder="What do you want to achieve?"
                          className="w-full p-2 rounded-md border bg-background pr-8"
                        />
                        {goal && (
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-primary">
                            ✓
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-2"
                  >
                    <h3 className="text-lg font-semibold col-span-full mb-2">Today's Mood</h3>
                    {MOODS.map((moodOption) => (
                      <button
                        key={moodOption.value}
                        type="button"
                        onClick={() => handleMoodSelect(moodOption.value)}
                        className={`mood-button p-2 text-sm rounded-md transition-all duration-300 flex items-center justify-center gap-2 relative
                          ${
                            state.mood === moodOption.value
                              ? "bg-primary text-background font-bold scale-[0.98]"
                              : "text-foreground/80 hover:bg-accent/40 hover:text-foreground"
                          }`}
                        style={{
                          borderWidth: state.mood === moodOption.value ? "2px" : "1px",
                          borderStyle: "solid",
                          borderColor: state.mood === moodOption.value ? moodOption.color : "transparent"
                        }}
                      >
                        {state.mood === moodOption.value && (
                          <span className="absolute top-1 right-1 text-xs">✓</span>
                        )}
                        {moodOption.label}
                      </button>
                    ))}
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-end gap-4">
                  <Button
                    onClick={formSubmit(handleSubmit)}
                    disabled={state.entry.length < 1 || loadingStates.submitting}
                  >
                    {loadingStates.submitting ? "Submitting..." : "Save Entry"}
                  </Button>
                </div>
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">AI Summary Timeline</h3>
                  <div className="flex overflow-x-auto pb-4 gap-6 px-2">
                    {state.history.map(entry => (
                      <div key={entry.id} className="flex-shrink-0 w-64">
                        <div className="bg-muted/20 p-4 rounded-lg h-full">
                          <p className="text-sm text-muted-foreground mb-2">
                            {new Date(entry.created_at).toLocaleDateString()}
                          </p>
                          <p className="text-sm line-clamp-4">
                            {entry.summaries?.[entry.id] || 'Generate summary to view'}
                          </p>
                          {!entry.summaries?.[entry.id] && (
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

                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <h3 className="text-xl font-semibold">All Entries</h3>
                    <div className="flex gap-2 w-full md:w-auto">
                      <input
                        type="text"
                        value={state.search}
                        onChange={(e) => setState(prev => ({
                          ...prev,
                          search: e.target.value,
                        }))}
                        placeholder="Search entries..."
                        className="w-full p-2 rounded-md border bg-background"
                      />
                      <input
                        type="date"
                        value={state.filterDate}
                        onChange={(e) => setState(prev => ({
                          ...prev,
                          filterDate: e.target.value,
                        }))}
                        className="p-2 rounded-md border bg-background"
                      />
                    </div>
                  </div>
                  
                  {filteredEntries.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 rounded-lg border bg-background"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <button
                          onClick={() => handlePin(item.id)}
                          className={`text-xl ${item.pinned ? 'text-yellow-500' : 'text-muted-foreground'}`}
                        >
                          📌
                        </button>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                            disabled={loadingStates.deleting}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      {state.editingId === item.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={state.editingContent}
                            onChange={(e) => setState(prev => ({
                              ...prev,
                              editingContent: e.target.value,
                            }))}
                            className="w-full p-2 rounded border"
                            rows={4}
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setState(prev => ({
                                ...prev,
                                editingId: null,
                              }))}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleSaveEdit(item.id)}
                              disabled={loadingStates.editing}
                            >
                              {loadingStates.editing ? 'Saving...' : 'Save'}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            {new Date(item.created_at).toLocaleString()}
                          </p>
                          <p className="whitespace-pre-wrap">{item.content}</p>
                          {item.mood && (
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-sm text-muted-foreground">Mood:</span>
                              <span className="text-sm">{item.mood}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'insights' && (
              <motion.div
                key="insights"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-background p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Mood Distribution</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={getMoodData()}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label
                          >
                            {getMoodData().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={MOOD_COLORS[index % MOOD_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-background p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Weekly Activity</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getWeeklyData()}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-background p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Habit Streaks</h3>
                    <div className="space-y-4">
                      {HABITS.map((habit) => (
                        <div key={habit} className="flex items-center justify-between">
                          <span>{habit}</span>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all"
                                style={{ width: `${Math.min(100, (state.habitStreaks[habit] || 0) * 10)}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {state.habitStreaks[habit] || 0} days
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-background p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Goal Progress</h3>
                    <div className="space-y-4">
                      {state.history
                        .flatMap(entry => entry.goals || [])
                        .filter((goal, index, self) => self.indexOf(goal) === index)
                        .slice(0, 5)
                        .map((goal) => (
                          <div key={goal} className="flex items-center justify-between">
                            <span>{goal}</span>
                            <span className="text-sm text-muted-foreground">
                              {state.history.filter(entry => entry.goals?.includes(goal)).length} entries
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SectionWrapper>
    </ErrorBoundary>
  );
}