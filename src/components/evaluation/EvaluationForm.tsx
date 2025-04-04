"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepProgress from "./StepProgress";
import QuestionStep from "./QuestionStep";
import TraitSelector from "./TraitSelector";
import FaithSelector from "./FaithSelector";
import ReviewSummary from "./ReviewSummary";
import { Button } from "@/components/ui/button";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";

const questions = [
  "What are your main goals right now?",
  "What habits are holding you back?",
  "What qualities do you want to develop?",
  "Describe your ideal daily routine.",
  "What motivates you to improve?",
];

const totalSteps = questions.length + 3;

export default function EvaluationForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [faith, setFaith] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const progress = Math.floor((step / (totalSteps - 1)) * 100);

  const handleNext = () => {
    if (step < questions.length && !answers[step].trim()) {
      setError("Please provide an answer before proceeding.");
      return;
    }
    setError(null);

    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    setError(null);
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        router.push("/profile");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted, router]);

  const renderStep = () => {
    if (step < questions.length) {
      return (
        <QuestionStep
          question={questions[step]}
          answer={answers[step]}
          onChange={(val) => {
            const updated = [...answers];
            updated[step] = val;
            setAnswers(updated);
          }}
          index={step}
        />
      );
    }

    if (step === questions.length) {
      return (
        <TraitSelector
          selected={selectedTraits}
          onToggle={(trait) => {
            setSelectedTraits((prev) =>
              prev.includes(trait)
                ? prev.filter((t) => t !== trait)
                : [...prev, trait]
            );
          }}
        />
      );
    }

    if (step === questions.length + 1) {
      return (
        <FaithSelector
          value={faith}
          onSelect={setFaith}
        />
      );
    }

    return (
      <ReviewSummary
        questions={questions}
        answers={answers}
        traits={selectedTraits}
        faith={faith}
      />
    );
  };

  return (
    <section className="min-h-screen px-4 py-12 flex flex-col items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-3xl space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Self-Improvement Evaluation
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Your honest answers help tailor your growth journey. Take a moment to reflect as you go.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="bg-white/5 backdrop-blur-md border border-border rounded-xl p-6 shadow-lg space-y-6"
        >
          {!submitted ? (
            <>
              <StepProgress percentage={progress} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={`step-${step}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  {renderStep()}
                  {error && (
                    <p className="mt-2 text-sm text-red-500 font-medium">
                      {error}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between pt-4">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={step === 0}
                >
                  Back
                </Button>
                <Button onClick={handleNext}>
                  {step === totalSteps - 1 ? "Submit" : "Next"}
                </Button>
              </div>
            </>
          ) : (
            <>
              <Confetti recycle={false} numberOfPieces={180} />
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="p-6 bg-muted/10 backdrop-blur-md border border-border rounded-xl text-center space-y-4 shadow-xl"
              >
                <motion.h2
                  className="text-2xl font-semibold tracking-tight text-primary"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Evaluation Complete <span role="img" aria-label="target">🎯</span>
                </motion.h2>

                <motion.p
                  className="text-sm text-muted-foreground max-w-md mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Your responses have been recorded. You’ll be redirected to your profile shortly.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                >
                  <Button className="mt-3" onClick={() => router.push("/profile")}>
                    Go to Profile →
                  </Button>
                </motion.div>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
