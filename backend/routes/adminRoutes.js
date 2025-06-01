const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Calculation = require('../models/Calculation');
const auth = require('../middleware/auth');

router.get('/admin/users', auth, async (req, res) => {
  const users = await User.find({}, 'username');
  res.json(users);
});

router.get('/admin/calculations', auth, async (req, res) => {
  const logs = await Calculation.find().populate('user', 'username').sort({ createdAt: -1 });
  res.json(logs);
});

module.exports = router;
