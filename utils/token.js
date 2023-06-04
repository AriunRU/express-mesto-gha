const jwt = require('jsonwebtoken');

const { SECRET_KEY = '12fbdb6e647a00514634eb137b2ecc64fc057f2c0f5c2006f5845e8a7d8a849e' } = process.env;

function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
}

function checkToken(token) {
  if (!token) {
    return false;
  }

  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return false;
  }
}

module.exports = { generateToken, checkToken };
