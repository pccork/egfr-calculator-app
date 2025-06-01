// File: frontend/src/pages/Login.jsx
import React, { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('/login', { username, password });
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } else if (res.data.tempToken) {
      navigate('/verify-2fa', { state: { tempToken: res.data.tempToken } });
    } else {
      alert('Unexpected response from server');
    }
  } catch {
    alert('Login failed');
  }
};
  return (
    <form onSubmit={handleLogin} className="p-4 flex flex-col gap-4">
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit" className="bg-green-600 text-white px-4 py-2">Login</button>
    </form>
  );
}
