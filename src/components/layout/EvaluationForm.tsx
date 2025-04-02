"use client";

import { useState } from "react";

const EvaluationForm = () => {
  const [name, setName] = useState("");
  const [goals, setGoals] = useState("");
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<string[]>([]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "goals") setGoals(value);
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCharacteristics([...selectedCharacteristics, value]);
    } else {
      setSelectedCharacteristics(selectedCharacteristics.filter((item) => item !== value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", { name, goals, selectedCharacteristics });
  };

  return (
    <div className="evaluation-form-container bg-transparent text-white py-12">
      <h2 className="text-center text-3xl font-semibold mb-8">Self-Evaluation</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-transparent p-8 rounded-lg shadow-xl">
        <div className="mb-6">
          <label htmlFor="name" className="block text-xl font-semibold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg text-black"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="goals" className="block text-xl font-semibold mb-2">
            Goals:
          </label>
          <textarea
            id="goals"
            name="goals"
            value={goals}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg text-black"
            rows={4}
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-xl font-semibold mb-2">Choose Self-Improvement Characteristics:</label>
          <div className="space-y-2">
            <label>
              <input
                type="checkbox"
                value="Discipline"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Discipline
            </label>
            <label>
              <input
                type="checkbox"
                value="Leadership"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Leadership
            </label>
            <label>
              <input
                type="checkbox"
                value="Stoicism"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Stoicism
            </label>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition duration-300 ease-in-out"
          >
            Submit Evaluation
          </button>
        </div>
      </form>
    </div>
  );
};

export default EvaluationForm;
