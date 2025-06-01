// File: backend/utils/totp.js
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

exports.generateTotpSecret = async (username) => {
  const secret = speakeasy.generateSecret({ name: `eGFR App (${username})` });
  const qr = await qrcode.toDataURL(secret.otpauth_url);
  return { base32: secret.base32, qr };
};

exports.verifyTotp = (token, secret) => {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 1,
  });
};
