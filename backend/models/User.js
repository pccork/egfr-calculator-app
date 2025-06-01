// File: backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  totpSecret: String,
  is2faVerified: { type: Boolean, default: false },
});

// Instance method to set password with hashing
userSchema.methods.setPassword = async function (password) {
  this.passwordHash = await bcrypt.hash(password, 10);
};

// Instance method to validate password
userSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);