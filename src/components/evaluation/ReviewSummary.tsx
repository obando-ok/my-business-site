// components/evaluation/ReviewSummary.tsx
"use client";

import { motion } from "framer-motion";

interface ReviewSummaryProps {
  questions: string[];
  answers: string[];
  traits: string[];
  faith: string;
}

export default function ReviewSummary({ questions, answers, traits, faith }: ReviewSummaryProps) {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-semibold">Review your answers before submission</h2>

      <div className="space-y-6">
        {/* Questions & Answers */}
        <div className="space-y-4">
          {questions.map((q, i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-muted/5 border border-border"
            >
              <p className="text-sm font-medium text-foreground mb-1">{q}</p>
              <p className="text-sm text-muted-foreground">
                {answers[i] ? answers[i] : "—"}
              </p>
            </div>
          ))}
        </div>

        {/* Traits */}
        <div className="p-4 rounded-lg bg-muted/5 border border-border space-y-2">
          <p className="text-sm font-medium text-foreground">
            Traits to Develop:
          </p>
          <p className="text-sm text-muted-foreground">
            {traits.length > 0 ? traits.join(", ") : "None selected"}
          </p>
        </div>

        {/* Faith */}
        <div className="p-4 rounded-lg bg-muted/5 border border-border space-y-2">
          <p className="text-sm font-medium text-foreground">
            Faith Preference:
          </p>
          <p className="text-sm text-muted-foreground">
            {faith || "Not specified"}
          </p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-2">
        You can go back and make any changes before submitting.
      </p>
    </motion.div>
  );
}
