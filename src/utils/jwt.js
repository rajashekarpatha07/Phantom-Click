const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'qwer1234'; // Consistent secret

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, verifyToken };