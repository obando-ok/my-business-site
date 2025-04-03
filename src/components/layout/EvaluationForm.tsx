// MAiN - EvaluationForm.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const traits = [
  "Discipline",
  "Leadership",
  "Stoicism",
  "Confidence",
  "Resilience",
  "Faith"
];

const EvaluationForm = () => {
  const [name, setName] = useState("");
  const [goals, setGoals] = useState("");
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "goals") setGoals(value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedTraits((prev) =>
      checked ? [...prev, value] : prev.filter((trait) => trait !== value)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Evaluation Submitted:", { name, goals, selectedTraits });
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

        <p className="text-muted-foreground mb-10">
          This form helps us understand where you are — and where you want to go.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-accent/10 p-8 rounded-xl shadow-xl space-y-8 text-left"
        >
          <div>
            <label className="block mb-2 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              placeholder="e.g., Adam Baker"
              className="w-full px-4 py-3 border border-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">What are your goals?</label>
            <textarea
              name="goals"
              value={goals}
              onChange={handleInputChange}
              placeholder="Define your vision — what are you striving for?"
              rows={4}
              className="w-full px-4 py-3 border border-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block mb-4 text-sm font-medium">
              Select areas you'd like to improve:
            </label>
            <div className="grid grid-cols-2 gap-4">
              {traits.map((trait) => (
                <label key={trait} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={trait}
                    onChange={handleCheckboxChange}
                    className="accent-primary"
                  />
                  <span>{trait}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="text-center pt-4">
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="bg-primary text-white px-10 py-3 rounded-full font-semibold hover:bg-button-hover-bg transition duration-300 border border-secondary"
            >
              Submit Evaluation
            </motion.button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EvaluationForm;
