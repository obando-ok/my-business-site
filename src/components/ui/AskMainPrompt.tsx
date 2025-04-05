"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const MOTIVATION_QUOTES = [
  "You’re building the discipline most men fear. Stay in the fight.",
  "Your future self is watching. Make him proud.",
  "Every day is a chance to conquer weakness.",
  "Comfort is the enemy. Keep climbing.",
  "Progress > perfection. Just show up.",
  "Hard times shape hard men. Lean in.",
  "Your habits shape your destiny. Today matters.",
  "Sacrifice now. Freedom later.",
  "You were made to lead. So start with yourself.",
  "Greatness demands discomfort. Embrace it.",
];

export default function AskMainPrompt() {
  const [open, setOpen] = useState(false);
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);

  const getRandomQuote = () => {
    const index = Math.floor(Math.random() * MOTIVATION_QUOTES.length);
    return MOTIVATION_QUOTES[index];
  };

  const fetchMotivation = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 700)); // simulate delay
    setQuote(getRandomQuote());
    setLoading(false);
  };

  const handleOpen = () => {
    setOpen(true);
    fetchMotivation();
  };

  const handleReroll = () => {
    setQuote(getRandomQuote());
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={handleOpen}
              className="bg-primary text-white shadow-lg hover:bg-primary/90"
            >
              💡 Ask MAiN
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md text-center space-y-4">
          <DialogTitle className="text-xl font-bold tracking-tight">
            Your Motivation Boost
          </DialogTitle>

          {loading ? (
            <p className="text-muted-foreground italic animate-pulse">
              Thinking deeply...
            </p>
          ) : (
            <motion.p
              className="text-lg text-muted-foreground italic"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {quote}
            </motion.p>
          )}

          {!loading && (
            <Button
              variant="secondary"
              onClick={handleReroll}
              className="mt-4 w-full bg-primary text-white hover:bg-primary/90"
            >
              🔁 Show another
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
