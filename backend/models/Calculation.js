const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  input: {
    age: Number,
    creatinine: Number,
    sex: String,
  },
  result: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Calculation', calculationSchema);
