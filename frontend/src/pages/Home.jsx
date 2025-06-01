// File: frontend/src/pages/Home.jsx
import React from 'react';
import EGFRCalculator from '../components/EGFRCalculator';
import axios from '../services/api';

export default function Home() {
  const handleSubmit = async (data) => {
    const token = localStorage.getItem('token');
    const response = await axios.post('/calculate-egfr', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert(`eGFR: ${response.data.egfr}`);
  };

  return <EGFRCalculator onSubmit={handleSubmit} />;
}