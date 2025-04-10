"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, ArrowRight } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  goals: z.string().min(10, "Goals must be at least 10 characters").max(1000),
  traits: z.array(z.string()).min(1, "Select at least one area to improve"),
});

type FormValues = z.infer<typeof formSchema>;

const traits = [
  { id: "discipline", label: "Discipline" },
  { id: "leadership", label: "Leadership" },
  { id: "stoicism", label: "Stoicism" },
  { id: "confidence", label: "Confidence" },
  { id: "resilience", label: "Resilience" },
  { id: "faith", label: "Faith" },
];

const EvaluationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      goals: "",
      traits: [],
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Evaluation Submitted",
        description: "Thank you for your submission. We'll review it shortly.",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="evaluation" className="bg-background py-24 px-6 border-t border-border">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold tracking-tight mb-6"
        >
          Self-Evaluation: Begin Your Journey
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-foreground mb-10"
        >
          This form helps us understand where you are — and where you want to go.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-accent/10 p-8 rounded-xl shadow-xl space-y-8 text-left"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="e.g., Adam Baker"
                {...register("name")}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="goals">What are your goals?</Label>
              <Textarea
                id="goals"
                placeholder="Define your vision — what are you striving for?"
                {...register("goals")}
                className={errors.goals ? "border-red-500" : ""}
                rows={4}
              />
              {errors.goals && (
                <p className="text-sm text-red-500 mt-1">{errors.goals.message}</p>
              )}
            </div>

            <div>
              <Label>Select areas you&rsquo;d like to improve:</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {traits.map((trait) => (
                  <div key={trait.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={trait.id}
                      value={trait.id}
                      {...register("traits")}
                    />
                    <Label
                      htmlFor={trait.id}
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {trait.label}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.traits && (
                <p className="text-sm text-red-500 mt-1">{errors.traits.message}</p>
              )}
            </div>
          </div>

          <div className="text-center pt-4">
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Evaluation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default EvaluationForm;
