// File: backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'Missing token' });

  try {
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user || !user.is2faVerified)
      return res.status(403).json({ message: '2FA verification required' });

    req.user = { id: user._id, username: user.username, role: user.role };
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
