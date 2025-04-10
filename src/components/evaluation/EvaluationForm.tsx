"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepProgress from "./StepProgress";
import QuestionStep from "./QuestionStep";
import TraitSelector from "./TraitSelector";
import FaithSelector from "./FaithSelector";
import ReviewSummary from "./ReviewSummary";
import AnimatedCard from "./AnimatedCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Save, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Enhanced questions with more details
const questions = [
  {
    id: "goals",
    text: "What are your main goals right now?",
    placeholder: "Think about specific targets you want to achieve in your personal development journey."
  },
  {
    id: "obstacles",
    text: "What habits are holding you back?",
    placeholder: "Consider behaviors or thought patterns that might be limiting your growth."
  },
  {
    id: "qualities",
    text: "What qualities do you want to develop?",
    placeholder: "Reflect on character traits or skills you'd like to strengthen."
  },
  {
    id: "routine",
    text: "Describe your ideal daily routine.",
    placeholder: "Envision what a perfect, productive day would look like for you."
  },
  {
    id: "motivation",
    text: "What motivates you to improve?",
    placeholder: "Consider your deeper 'why' that will sustain you through challenges."
  },
];

const totalSteps = questions.length + 3;

export default function EvaluationForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [faith, setFaith] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [saveProgress, setSaveProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const progress = Math.floor((step / (totalSteps - 1)) * 100);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [step]);

  const handleNext = async () => {
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
      // Auto-save progress
      await saveFormProgress();
      setStep(step + 1);
    } else {
      await submitForm();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    setError(null);
  };

  const saveFormProgress = async () => {
    // Simulate saving progress to server
    setIsProcessing(true);
    
    // Fake progress animation
    for (let i = 0; i <= 100; i += 20) {
      setSaveProgress(i);
      await new Promise(r => setTimeout(r, 100));
    }
    
    setIsProcessing(false);
    setSaveProgress(0);
    
    toast({
      title: "Progress saved",
      description: "Your answers have been saved.",
      duration: 2000,
    });
  };

  const submitForm = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    for (let i = 0; i <= 100; i += 5) {
      setSaveProgress(i);
      await new Promise(r => setTimeout(r, 50));
    }
    
    setIsProcessing(false);
    setSaveProgress(0);
    setSubmitted(true);
  };

  const renderStep = () => {
    if (step < questions.length) {
      return (
        <QuestionStep
          question={questions[step].text}
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
        questions={questions.map(q => q.text)}
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

        <AnimatedCard
          key={`step-${step}`}
          variant={step === totalSteps - 1 ? "highlight" : "default"}
          className="p-6 space-y-6"
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }}
        >
          {!submitted ? (
            <>
              <StepProgress percentage={progress} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={`step-content-${step}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStep()}
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-3 text-sm text-red-500 font-medium flex items-center"
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      {error}
                    </motion.p>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between pt-6 items-center">
                <Button 
                  variant="ghost" 
                  onClick={handleBack} 
                  disabled={step === 0 || isProcessing}
                  className="gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
                
                <div className="text-xs text-muted-foreground">
                  {isProcessing && `Saving... ${saveProgress}%`}
                </div>
                
                <Button
                  onClick={handleNext}
                  disabled={(step < questions.length && !answers[step].trim()) || isProcessing}
                  className="gap-1"
                >
                  {step === totalSteps - 1 ? (
                    <>
                      <Save className="w-4 h-4" />
                      Complete
                    </>
                  ) : (
                    <>
                      Next Step
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
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
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-4xl">
                  🎯
                </div>
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
        </AnimatedCard>
      </div>
    </section>
  );
}