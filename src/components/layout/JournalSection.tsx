// JournalSection.tsx (Enhanced)
"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/SupabaseProvider";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface JournalEntry {
  id: number;
  created_at: string;
  content: string;
  mood?: string;
}

const moods = ["Focused", "Grateful", "Tired", "Stressed", "Peaceful", "Motivated"];

export default function JournalSection() {
  const { session } = useAuth();
  const router = useRouter();
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
  const [streakDates, setStreakDates] = useState<string[]>([]);
  const [summaries, setSummaries] = useState<{ [key: number]: string }>({});
  const [loadingSummaryId, setLoadingSummaryId] = useState<number | null>(null);

  useEffect(() => {
    if (!session) router.push("/auth");
  }, [session, router]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchEntries();
    }
  }, [session]);

  useEffect(() => {
    let filteredList = history;
    if (search.trim()) {
      filteredList = filteredList.filter(e => e.content.toLowerCase().includes(search.toLowerCase()));
    }
    if (filterDate) {
      filteredList = filteredList.filter(e => e.created_at.startsWith(filterDate));
    }
    setFiltered(filteredList);
  }, [search, filterDate, history]);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from("journal_entries")
      .select("id, created_at, content, mood")
      .eq("user_id", session?.user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setHistory(data);
      calculateStreak(data);
    }
  };

  const generateSummary = async (entry: JournalEntry) => {
    setLoadingSummaryId(entry.id);
    const response = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: entry.content }),
    });
    const result = await response.json();
    setSummaries(prev => ({ ...prev, [entry.id]: result.summary }));
    setLoadingSummaryId(null);
  };

  const calculateStreak = (entries: JournalEntry[]) => {
    const uniqueDates = Array.from(
      new Set(entries.map(e => new Date(e.created_at).toISOString().split("T")[0]))
    ).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    let currentStreak = 0;
    let today = new Date();

    for (let i = 0; i < uniqueDates.length; i++) {
      const date = new Date(uniqueDates[i]);
      const diff = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      if (diff === currentStreak) {
        currentStreak++;
      } else {
        break;
      }
    }

    setStreak(currentStreak);
    setStreakDates(uniqueDates);
  };

  const handleSubmit = async () => {
    if (entry.trim() === "") return;
    const { error } = await supabase.from("journal_entries").insert({
      content: entry,
      mood,
      user_id: session?.user.id,
    });

    if (!error) {
      setEntry("");
      setMood("");
      setSubmitted(true);
      fetchEntries();
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("journal_entries").delete().eq("id", id);
    if (!error) fetchEntries();
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingId(entry.id);
    setEditingContent(entry.content);
  };

  const handleSaveEdit = async (id: number) => {
    const { error } = await supabase.from("journal_entries").update({ content: editingContent }).eq("id", id);
    if (!error) {
      setEditingId(null);
      setEditingContent("");
      fetchEntries();
    }
  };

  const formatShortDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  return (
    <SectionWrapper id="journal" className="bg-background">
      <div className="max-w-3xl mx-auto space-y-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold"
        >
          Daily Reflection
        </motion.h2>

        <p className="text-muted-foreground text-sm">
          Write a few lines about your day, mindset, progress, or challenges.
        </p>

        <textarea
          rows={6}
          placeholder="What did you learn today? What are you proud of?"
          value={entry}
          onChange={e => setEntry(e.target.value)}
          className="w-full rounded-xl bg-accent/20 p-4 text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />

        <select
          value={mood}
          onChange={e => setMood(e.target.value)}
          className="w-full md:w-1/2 mt-2 p-2 border border-border rounded-md bg-accent/10 text-sm"
        >
          <option value="">Select Mood (optional)</option>
          {moods.map((m, i) => (
            <option key={i} value={m}>{m}</option>
          ))}
        </select>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button onClick={handleSubmit} className="mt-2 w-full md:w-auto">
              Save Entry
            </Button>
          </motion.div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by keyword"
            className="mt-2 w-full md:w-1/2 p-2 rounded-md border border-border text-sm bg-accent/10"
          />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="mt-2 w-full md:w-auto p-2 rounded-md border border-border text-sm bg-accent/10"
          />
        </div>

        {filtered.length > 0 && (
          <div className="mt-10 text-left">
            <h3 className="text-xl font-semibold mb-4">Reflection History</h3>
            <ul className="space-y-4">
              {filtered.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-accent/10 border border-border rounded-lg p-4 text-sm space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <p className="text-muted-foreground font-medium">
                      {formatShortDate(item.created_at)}
                    </p>
                    <div className="space-x-2">
                      {item.mood && (
                        <span className="inline-block bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-md">
                          {item.mood}
                        </span>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          editingId === item.id ? handleSaveEdit(item.id) : handleEdit(item)
                        }
                      >
                        {editingId === item.id ? "Save" : "Edit"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  {editingId === item.id ? (
                    <textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      className="w-full bg-background border border-border p-2 rounded text-foreground resize-none"
                      rows={4}
                    />
                  ) : (
                    <>
                      <p className="text-foreground whitespace-pre-wrap">{item.content}</p>
                      {summaries[item.id] ? (
                        <p className="text-muted-foreground mt-2 text-sm italic">Summary: {summaries[item.id]}</p>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={loadingSummaryId === item.id}
                          onClick={() => generateSummary(item)}
                          className="mt-2"
                        >
                          {loadingSummaryId === item.id ? "Generating..." : "Generate Summary"}
                        </Button>
                      )}
                    </>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}