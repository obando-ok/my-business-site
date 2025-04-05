"use client";

import { FC } from "react";
import { CheckCircle, ListOrdered, BadgeCheck, BookOpen } from "lucide-react";

interface ReviewSummaryProps {
  questions: string[];
  answers: string[];
  traits: string[];
  faith: string;
}

const ReviewSummary: FC<ReviewSummaryProps> = ({
  questions,
  answers,
  traits,
  faith,
}) => {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-2 text-orange-500">
          <ListOrdered className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Your Answers</h3>
        </div>
        <ul className="space-y-4">
          {questions.map((q, idx) => (
            <li key={idx}>
              <p className="text-sm font-medium text-muted-foreground mb-1">{q}</p>
              <p className="text-base text-foreground border-l-2 border-orange-500 pl-3">
                {answers[idx] || "—"}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2 text-orange-500">
          <CheckCircle className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Selected Traits</h3>
        </div>
        <ul className="flex flex-wrap gap-2">
          {traits.length > 0 ? (
            traits.map((trait, index) => (
              <li
                key={index}
                className="px-3 py-1 rounded-md bg-orange-500/10 text-orange-300 text-sm font-medium border border-orange-500/30"
              >
                {trait}
              </li>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No traits selected.</p>
          )}
        </ul>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2 text-orange-500">
          <BookOpen className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Faith Selection</h3>
        </div>
        <p
          className={`inline-block px-3 py-1 rounded-md text-sm font-medium border ${
            faith
              ? "bg-orange-500/10 text-orange-300 border-orange-500/30"
              : "text-muted-foreground border-border"
          }`}
        >
          {faith || "None selected"}
        </p>
      </div>
    </div>
  );
};

export default ReviewSummary;
