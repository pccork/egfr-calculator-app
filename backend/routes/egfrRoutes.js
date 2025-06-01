// File: backend/routes/egfrRoutes.js
const express = require('express');
const router = express.Router();
const { calculateEGFR } = require('../controllers/egfrController');
const authenticate = require('../middleware/auth');

// Calculate eGFR (authenticated)
router.post('/calculate-egfr', authenticate, calculateEGFR);

// Admin-only logs access
router.get('/admin/logs', authenticate, (req, res, next) => {
  if (req.user.role !== 'admin') return res.sendStatus(403); // Forbidden if not admin
  next();
}, getLogs);

// User-specific history
router.get('/my-history', authenticate, getMyLogs);

module.exports = router;
