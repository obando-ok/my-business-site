// components/evaluation/QuestionStep.tsx
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface QuestionStepProps {
  question: string;
  answer: string;
  onChange: (val: string) => void;
  index: number;
}

export default function QuestionStep({ question, answer, onChange, index }: QuestionStepProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxChars = 300;

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const remaining = maxChars - answer.length;

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold leading-snug">
        {question}
      </h2>

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

      <div
        id={`desc-${index}`}
        className={`text-xs text-right ${
          remaining <= 25 ? "text-orange-500" : "text-muted-foreground"
        }`}
      >
        {remaining} characters remaining
      </div>
    </motion.div>
  );
}