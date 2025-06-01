// File: backend/utils/formulas.js
exports.calculateEGFRValue = (age, creatinine, sex) => {
  const k = sex === 'female' ? 0.742 : 1;
  return 186 * Math.pow(creatinine, -1.154) * Math.pow(age, -0.203) * k;
};
