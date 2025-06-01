// === FRONTEND ===
// File: frontend/src/components/EGFRCalculator.jsx
import React, { useState } from 'react';

export default function EGFRCalculator({ onSubmit }) {
  const [age, setAge] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [sex, setSex] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ age: Number(age),
      creatinine: Number(creatinine),
      sex,});
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <input type="number" min="0" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
      <input type="number" min="10" value={creatinine} onChange={(e) => setCreatinine(e.target.value)} placeholder="Creatinine (mg/dL)" required />
      <select value={sex} onChange={(e) => setSex(e.target.value)} required>
        <option value="">Select Sex</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Calculate eGFR</button>
    </form>
  );
}