// File: backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateTotpSecret, verifyTotp } = require('../utils/totp');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Register: generates TOTP secret and returns QR
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    if (await User.findOne({ username }))
      return res.status(409).json({ message: 'Username already exists' });

    const { base32, qr } = await generateTotpSecret(username);
    const user = new User({ username, totpSecret: base32 });
    await user.setPassword(password);
    await user.save();
    res.json({ qr });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login: returns temp token if password ok but 2FA not verified
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.validatePassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    // If not yet 2FA verified, return temp token
    if (!user.is2faVerified) {
      const tempToken = jwt.sign({ id: user._id, step: '2fa' }, JWT_SECRET, { expiresIn: '5m' });
      return res.json({ tempToken });
    }

    // Full token after 2FA verified
    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
});

// 2FA token verification
router.post('/verify-2fa', async (req, res) => {
  const { token, tempToken } = req.body;

  try {
    const decoded = jwt.verify(tempToken, JWT_SECRET);
    if (decoded.step !== '2fa') return res.status(403).json({ message: 'Invalid temp token' });

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const verified = verifyTotp(token, user.totpSecret);
    if (!verified) return res.status(400).json({ message: 'Invalid 2FA token' });

    user.is2faVerified = true;
    await user.save();

    const finalToken = jwt.sign({ id: user._id, username: user.username, role: user.role }, JWT_SECRET);
    res.json({ token: finalToken });
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

module.exports = router;
