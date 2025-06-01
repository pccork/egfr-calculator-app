// File: frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Verify2FA from './pages/Verify2FA';


// Helper to check auth and extract role from token
const getUserFromToken = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
};

const isAuthenticated = () => !!localStorage.getItem('token');

function App() {
  const user = getUserFromToken();
  const isAdmin = user?.role === 'admin';

  return (
    <Router>
      <nav className="bg-gray-200 p-4 flex gap-4">
        <Link to="/">Home</Link>
        {isAdmin && (
          <>
            <Link to="/admin">Admin</Link>
          </>
        )}
        {!isAuthenticated() && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-2fa" element={<Verify2FA />} />
        <Route
          path="/admin"
          element={
            isAuthenticated() && isAdmin
              ? <Admin />
              : <Navigate to="/login" replace />
          }
        />
      
      </Routes>
    </Router>
  );
}

export default App;

