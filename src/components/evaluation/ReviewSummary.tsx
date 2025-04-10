"use client";

import { FC, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ListOrdered, BadgeCheck, BookOpen, Edit2, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [showFullAnswers, setShowFullAnswers] = useState(false);
  
  const toggleAnswers = () => {
    setShowFullAnswers(!showFullAnswers);
  };
  
  // Limit answer length for the collapsed view
  const truncateText = (text: string, limit: number = 100) => {
    if (!text) return "—";
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold">Your Journey Outline</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Review your responses before finalizing.
        </p>
      </motion.div>

      {/* Answers section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <button 
          onClick={toggleAnswers}
          className="w-full flex items-center justify-between border-b border-border pb-2 mb-4 group"
        >
          <div className="flex items-center gap-2 text-primary">
            <ListOrdered className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Your Answers</h3>
          </div>
          <div className="flex items-center text-xs text-muted-foreground group-hover:text-primary transition-colors">
            {showFullAnswers ? (
              <>
                <span>Collapse</span>
                <ChevronUp className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                <span>Expand</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </>
            )}
          </div>
        </button>
        
        <ul className="space-y-4">
          {questions.map((q, idx) => (
            <motion.li 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * idx }}
            >
              <p className="text-sm font-medium text-foreground mb-1">{q}</p>
              <div className="relative">
                <p className={cn(
                  "text-base border-l-2 border-primary/60 pl-3 text-foreground/90",
                  !showFullAnswers && "line-clamp-2"
                )}>
                  {showFullAnswers ? answers[idx] || "—" : truncateText(answers[idx])}
                </p>
                {answers[idx]?.length > 100 && !showFullAnswers && (
                  <div className="absolute bottom-0 right-0 w-24 h-full bg-gradient-to-l from-background to-transparent" />
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Traits section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="p-4 border border-border rounded-lg bg-muted/10"
      >
        <div className="flex items-center gap-2 mb-3 text-primary">
          <BadgeCheck className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Selected Traits</h3>
        </div>
        {traits.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {traits.map((trait, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                className="px-3 py-1 rounded-md bg-primary/10 text-primary text-sm font-medium border border-primary/30 flex items-center"
              >
                <CheckCircle className="w-3 h-3 mr-1.5" />
                {trait}
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm italic">No traits selected.</p>
        )}
      </motion.div>

      {/* Faith section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="p-4 border border-border rounded-lg bg-muted/10"
      >
        <div className="flex items-center gap-2 mb-3 text-primary">
          <BookOpen className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Faith Integration</h3>
        </div>
        <div className="flex items-center">
          <div
            className={cn(
              "inline-block px-3 py-1 rounded-md text-sm font-medium border",
              faith
                ? "bg-primary/10 text-primary border-primary/30"
                : "text-muted-foreground border-border"
            )}
          >
            {faith || "None selected"}
          </div>
          {faith && <Edit2 className="w-3 h-3 ml-2 text-muted-foreground" />}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="border-t border-border pt-4 mt-4 text-center"
      >
        <p className="text-sm text-muted-foreground">
          Click <strong>Complete</strong> to finalize your evaluation and begin your journey.
        </p>
      </motion.div>
    </div>
  );
};

export default ReviewSummary;
