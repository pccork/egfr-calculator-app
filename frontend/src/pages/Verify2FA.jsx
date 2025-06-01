// File: frontend/src/pages/Verify2FA.jsx
import React, { useState } from 'react';
import axios from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Verify2FA() {
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const tempToken = location.state?.tempToken;

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/verify-2fa', { token, tempToken });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert('2FA verification failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleVerify} className="p-4 flex flex-col gap-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Two-Factor Authentication</h2>
      <input
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter 2FA Code"
        required
      />
      <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
        Verify
      </button>
    </form>
  );
}
