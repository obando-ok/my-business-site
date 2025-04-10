// components/evaluation/QuestionStep.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, CornerDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuestionStepProps {
  question: string;
  answer: string;
  onChange: (val: string) => void;
  index: number;
}

// Sample suggestions for different questions
const SUGGESTIONS = {
  "What are your main goals right now?": [
    "Develop a consistent morning routine",
    "Build muscle and improve physical health", 
    "Master emotional regulation"
  ],
  "What habits are holding you back?": [
    "Procrastination and poor time management",
    "Digital distractions and social media",
    "Negative self-talk patterns"
  ],
  "What qualities do you want to develop?": [
    "Discipline and consistency",
    "Mental resilience and grit",
    "Strategic thinking and focus"
  ],
  "Describe your ideal daily routine.": [
    "Early rise with meditation and exercise",
    "Deliberate deep work periods with breaks",
    "Evening reflection and preparation"
  ],
  "What motivates you to improve?": [
    "Building a legacy and lasting impact",
    "Setting an example for others",
    "Achieving my full potential"
  ]
};

export default function QuestionStep({ question, answer, onChange, index }: QuestionStepProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxChars = 300;
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);

  useEffect(() => {
    textareaRef.current?.focus();
    
    // Set suggestions based on current question
    const questionSuggestions = SUGGESTIONS[question as keyof typeof SUGGESTIONS] || [];
    setCurrentSuggestions(questionSuggestions);
  }, [question]);

  const remaining = maxChars - answer.length;
  const isNearLimit = remaining <= 25;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      const nextButton = form?.querySelector("button[type='submit']") as HTMLButtonElement;
      if (nextButton && !nextButton.disabled) {
        nextButton.click();
      }
    }
  };

  const applySuggestion = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, type: "spring", stiffness: 300, damping: 30 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold leading-snug">
        {question}
      </h2>

      <div className="relative">
        <textarea
          ref={textareaRef}
          rows={5}
          maxLength={maxChars}
          value={answer}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label={`Answer to: ${question}`}
          aria-describedby={`desc-${index}`}
          placeholder="Write your thoughts here..."
          className="w-full text-sm p-4 border border-border rounded-md bg-background shadow-sm focus:ring-2 focus:ring-primary outline-none resize-none transition-all"
        />

        <div className="flex items-center justify-between mt-2">
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            className="text-xs flex items-center text-muted-foreground hover:text-primary"
            onClick={() => setShowSuggestions(!showSuggestions)}
          >
            <Lightbulb className="mr-1 h-3 w-3" />
            {showSuggestions ? "Hide suggestions" : "Need inspiration?"}
          </Button>

          <div
            id={`desc-${index}`}
            className={`text-xs ${
              isNearLimit 
                ? remaining <= 10 
                  ? "text-red-500 font-medium" 
                  : "text-orange-500" 
                : "text-muted-foreground"
            }`}
          >
            {remaining} characters remaining
          </div>
        </div>
      </div>

      {showSuggestions && currentSuggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-muted/30 border border-border rounded-md p-3 space-y-2"
        >
          <p className="text-xs text-muted-foreground mb-2">
            Some ideas to help you get started:
          </p>
          {currentSuggestions.map((suggestion, i) => (
            <motion.button
              key={i}
              type="button"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-full text-left text-sm hover:text-primary flex items-center py-1.5 px-2 hover:bg-primary/5 rounded"
              onClick={() => applySuggestion(suggestion)}
            >
              <CornerDownRight className="mr-2 h-3 w-3 text-muted-foreground" />
              {suggestion}
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}