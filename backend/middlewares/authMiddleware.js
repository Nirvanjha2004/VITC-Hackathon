const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  console.log("Cookies:", req.cookies);
  console.log("Headers:", req.headers);

  // Try to get the token from different sources
  const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];

  console.log("Token:", token);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = authMiddleware;
