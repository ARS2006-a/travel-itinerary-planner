const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'travel-planner-secret-key-2024';

/**
 * Strict auth middleware – rejects requests without a valid token.
 */
const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided. Access denied.' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

/**
 * Optional auth middleware – attaches user info if token is valid, but
 * does NOT block the request when no token is present.
 */
const optionalAuth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    }
  } catch (_) {
    // Ignore invalid token – treat as unauthenticated
  }
  next();
};

module.exports = { auth, optionalAuth };
