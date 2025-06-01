// File: frontend/src/utils/auth.js
export const getUserFromToken = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
};

export const isAuthenticated = () => !!localStorage.getItem('token');
