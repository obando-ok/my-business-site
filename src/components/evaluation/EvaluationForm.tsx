"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepProgress from "./StepProgress";
import QuestionStep from "./QuestionStep";
import TraitSelector from "./TraitSelector";
import FaithSelector from "./FaithSelector";
import ReviewSummary from "./ReviewSummary";
import { Button } from "@/components/ui/button";
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
  const containerRef = useRef<HTMLDivElement>(null);

  const progress = Math.floor((step / (totalSteps - 1)) * 100);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [step]);

  const handleNext = () => {
    if (step < questions.length && !answers[step].trim()) {
      setError("Please provide an answer before proceeding.");
      return;
    }
    if (step === questions.length && selectedTraits.length === 0) {
      setError("Please select at least one trait.");
      return;
    }
    if (step === questions.length + 1 && !faith.trim()) {
      setError("Please select a faith option or choose to skip.");
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
      return <FaithSelector value={faith} onSelect={setFaith} />;
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
    <section
      ref={containerRef}
      className="min-h-screen px-6 py-14 flex flex-col items-center justify-center bg-background text-foreground"
    >
      <div className="w-full max-w-3xl space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold uppercase tracking-widest text-primary mb-2">
            Self Evaluation
          </h1>
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground mb-1">
            Personal Mastery Evaluation
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
            This assessment defines your starting point. Be honest. Be thorough.
          </p>
        </motion.div>

        <div className="text-sm text-muted-foreground text-center uppercase tracking-wider font-semibold">
          Step {step + 1} of {totalSteps} — {progress}% Complete
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="bg-white/5 border border-border rounded-xl p-6 shadow-md backdrop-blur-sm space-y-6"
        >
          {!submitted ? (
            <>
              <StepProgress percentage={progress} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={`step-${step}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStep()}
                  {error && (
                    <p className="mt-3 text-sm text-red-500 font-medium">
                      {error}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between pt-6">
                <Button variant="ghost" onClick={handleBack} disabled={step === 0}>
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={step < questions.length && !answers[step].trim()}
                >
                  {step === totalSteps - 1 ? "Finish" : "Next Step"}
                </Button>
              </div>
            </>
          ) : (
            <motion.div
              className="text-center py-10 space-y-6"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-4xl">🎯</div>
                <h2 className="text-2xl font-bold text-primary tracking-tight">
                  Mission Logged
                </h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Welcome to the Brotherhood. Your evaluation has been recorded. You now have a mission—and the traits to complete it.
                </p>
              </motion.div>

              <div className="grid gap-4 max-w-md mx-auto text-left text-sm text-muted-foreground">
                {selectedTraits.length > 0 && (
                  <div>
                    <p className="text-foreground font-semibold mb-1">Selected Traits</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedTraits.map((trait, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-300 text-xs font-medium border border-orange-500/30"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {faith && (
                  <div>
                    <p className="text-foreground font-semibold mb-1">Faith Integrated</p>
                    <span className="inline-block px-3 py-1 rounded-full bg-orange-500/10 text-orange-300 text-xs font-medium border border-orange-500/30">
                      {faith}
                    </span>
                  </div>
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button size="lg" className="mt-4" onClick={() => router.push("/profile/mission")}>
                  View My Dashboard →
                </Button>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}