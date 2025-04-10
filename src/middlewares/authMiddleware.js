const { verifyToken } = require('../utils/jwt.js');

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token; // Get token from cookie
  if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach user ID to request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;