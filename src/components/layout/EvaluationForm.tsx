// src/components/layout/EvaluationForm.tsx
"use client";

import { useState } from "react";

const EvaluationForm = () => {
  const [name, setName] = useState("");
  const [goals, setGoals] = useState("");
  const [selectedCharacteristics, setSelectedCharacteristics] = useState({
    discipline: false,
    leadership: false,
    stoicism: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "goals") setGoals(value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSelectedCharacteristics((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Evaluation submitted!");
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Self-Evaluation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-lg">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="goals" className="block text-lg">
            Goals:
          </label>
          <textarea
            id="goals"
            name="goals"
            value={goals}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-lg">Choose Self-Improvement Characteristics:</label>
          <div className="space-y-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="discipline"
                checked={selectedCharacteristics.discipline}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Discipline
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="leadership"
                checked={selectedCharacteristics.leadership}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Leadership
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="stoicism"
                checked={selectedCharacteristics.stoicism}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Stoicism
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300"
        >
          Submit Evaluation
        </button>
      </form>
    </div>
  );
};

export default EvaluationForm;
