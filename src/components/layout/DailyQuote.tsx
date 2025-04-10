"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RefreshCw, Quote as QuoteIcon, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Quote {
  text: string;
  author: string;
}

// Fallback quotes in case API fails
const fallbackQuotes = [
  {
    text: "Man cannot remake himself without suffering, for he is both the marble and the sculptor.",
    author: "Alexis Carrel"
  },
  {
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu"
  },
  {
    text: "The obstacle is the way.",
    author: "Marcus Aurelius"
  },
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle"
  }
];

export default function DailyQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Use a random fallback quote instead of API to avoid failures
      // This is a workaround since the API might be unreliable or blocked
      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      setQuote(randomQuote);
      
      /* 
      // Real API fetch code - commented out to ensure reliability
      const response = await fetch("https://api.quotable.io/random");
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      setQuote({ text: data.content, author: data.author });
      */
      
    } catch (err) {
      console.error("Failed to fetch quote:", err);
      setError("Could not fetch a new quote");
      
      // Use a fallback quote
      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      setQuote(randomQuote);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleRetry = () => {
    fetchQuote();
  };

  return (
    <SectionWrapper id="daily-quote" className="bg-accent relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/50 to-accent opacity-30" />
      <div className="max-w-3xl mx-auto text-center relative">
        {isLoading ? (
          <div className="h-32 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : (
          <>
            {error && (
              <Alert variant="destructive" className="mb-4 bg-destructive/10 border-destructive/20">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="ml-2">{error}</AlertDescription>
              </Alert>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex items-center justify-center mb-4"
            >
              <QuoteIcon className="w-8 h-8 text-primary/40" />
            </motion.div>
            
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-2xl md:text-3xl italic text-foreground leading-relaxed"
            >
              "{quote?.text}"
            </motion.blockquote>
            
            <div className="mt-6 flex items-center justify-center gap-4">
              <p className="text-sm text-muted-foreground">— {quote?.author}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
                className="hover:bg-accent-foreground/10"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                <span>New Quote</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </SectionWrapper>
  );
}
