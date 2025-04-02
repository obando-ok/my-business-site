import { useState } from 'react';

const EvaluationForm = () => {
  const [name, setName] = useState('');
  const [goals, setGoals] = useState('');
  const [habits, setHabits] = useState('');
  const [characteristics, setCharacteristics] = useState([]);
  
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "goals") setGoals(value);
    if (name === "habits") setHabits(value);
  };

  const handleCharacteristicSelection = (e) => {
    const selected = e.target.value;
    setCharacteristics(prev => prev.includes(selected)
      ? prev.filter(item => item !== selected)
      : [...prev, selected]);
  };

  // Submit form
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Send the data to the backend or AI API for processing (mocking AI here)
    const userData = { name, goals, habits, characteristics };
    console.log(userData);  // For now, we'll log the data

    // Simulate AI response (you can replace this with actual AI API calls later)
    const response = await fetch('/api/ai-agent', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    console.log(result);  // Handle AI's personalized plans
  };

  return (
    <div className="evaluation-form">
      <h2>Self-Evaluation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <textarea
            name="goals"
            placeholder="Your Goals"
            value={goals}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <textarea
            name="habits"
            placeholder="Current Habits"
            value={habits}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <h3>Choose Self-Improvement Characteristics</h3>
          <label>
            <input type="checkbox" value="discipline" onChange={handleCharacteristicSelection} />
            Discipline
          </label>
          <label>
            <input type="checkbox" value="leadership" onChange={handleCharacteristicSelection} />
            Leadership
          </label>
          <label>
            <input type="checkbox" value="stoicism" onChange={handleCharacteristicSelection} />
            Stoicism
          </label>
        </div>
        <button type="submit">Submit Evaluation</button>
      </form>
    </div>
  );
};

export default EvaluationForm;
