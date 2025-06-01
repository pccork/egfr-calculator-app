const { calculateEGFRValue } = require('../utils/formulas');
const Calculation = require('../models/Calculation');

exports.calculateEGFR = async (req, res) => {
  const { age, creatinine, sex} = req.body;
  const egfr = calculateEGFRValue(age, creatinine, sex);

  const record = new Calculation({
    user: req.user._id,
    input: { age, creatinine, sex,},
    result: Math.round(egfr),
  });

  await record.save();

  res.json({ egfr: record.result });
};

exports.getLogs = async (req, res) => {
  const logs = await Calculation.find().populate('user', 'username').sort({ createdAt: -1 });

  const result = logs.map(log => ({
    username: log.user.username,
    input: log.input,
    result: log.result,
    timestamp: log.createdAt,
  }));

  res.json(result);
};

exports.getMyLogs = async (req, res) => {
  const logs = await Calculation.find({ user: req.user._id }).sort({ createdAt: -1 });

  const result = logs.map(log => ({
    input: log.input,
    result: log.result,
    timestamp: log.createdAt,
  }));

  res.json(result);
};

