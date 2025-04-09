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
  const [errors, setErrors] = useState({
    name: "",
    goals: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
      setErrors((prev) => ({ ...prev, name: "" }));
    }
    if (name === "goals") {
      setGoals(value);
      setErrors((prev) => ({ ...prev, goals: "" }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedTraits((prev) =>
      checked ? [...prev, value] : prev.filter((trait) => trait !== value)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameError = validateName(name);
    const goalsError = validateGoals(goals);
    setErrors((prev) => ({ ...prev, name: nameError, goals: goalsError }));
    if (!nameError && !goalsError) {
      console.log("Evaluation Submitted:", { name, goals, selectedTraits });
    }
  };

  const validateName = (name: string) => {
    if (!name) return "Name is required";
    if (!/^[a-zA-Z ]+$/.test(name)) return "Name should only contain alphabets and spaces";
    return "";
  };

  const validateGoals = (goals: string) => {
    if (!goals) return "Goals are required";
    if (goals.length < 10) return "Goals should be at least 10 characters long";
    return "";
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
          <NameField
            value={name}
            onChange={handleInputChange}
            error={errors.name}
          />
          <GoalsField
            value={goals}
            onChange={handleInputChange}
            error={errors.goals}
          />
          <TraitsField
            traits={traits}
            selectedTraits={selectedTraits}
            onChange={handleCheckboxChange}
          />
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

const NameField = ({ value, onChange, error }: any) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium" htmlFor="name">
        Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={value}
        onChange={onChange}
        placeholder="e.g., Adam Baker"
        className={`w-full px-4 py-3 border border-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
          error ? "border-red-500" : ""
        }`}
        required
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

const GoalsField = ({ value, onChange, error }: any) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium" htmlFor="goals">
        What are your goals?
      </label>
      <textarea
        id="goals"
        name="goals"
        value={value}
        onChange={onChange}
        placeholder="Define your vision — what are you striving for?"
        rows={4}
        className={`w-full px-4 py-3 border border-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
          error ? "border-red-500" : ""
        }`}
        required
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

const TraitsField = ({ traits, selectedTraits, onChange }: any) => {
  return (
    <div>
      <label className="block mb-4 text-sm font-medium">
        Select areas you&rsquo;d like to improve:
      </label>
      <div className="grid grid-cols-2 gap-4">
        {traits.map((trait) => (
          <label key={trait} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={trait}
              checked={selectedTraits.includes(trait)}
              onChange={onChange}
              className="accent-primary"
            />
            <span>{trait}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default EvaluationForm;
