// File: frontend/src/pages/Register.jsx
import React, { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/register', { username, password });
      setQrCode(res.data.qr); // Backend should return QR code image URI
    } catch (err) {
      alert('Registration failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleContinue = () => {
    alert('Now scan the QR in your authenticator app and log in.');
    navigate('/login');
  };

  return (
    <form onSubmit={handleRegister} className="p-4 flex flex-col gap-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Register</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Register
      </button>
      {qrCode && (
        <div className="mt-4 text-center">
          <p>Scan this QR code in your authenticator app:</p>
          <img src={qrCode} alt="2FA QR Code" className="mx-auto my-2" />
          <button onClick={handleContinue} type="button" className="bg-green-600 text-white px-4 py-2 rounded">
            I’ve Scanned the QR
          </button>
        </div>
      )}
    </form>
  );
}
