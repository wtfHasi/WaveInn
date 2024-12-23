const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT and check user role
const authenticateJWT = (roles = []) => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      return res.status(403).json({ error: 'Access denied: No token provided' });
    }

    // Verifying the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {  // Use environment variable for JWT secret
      if (err) {
        return res.status(403).json({ error: 'Access denied: Invalid token' });
      }

      // If roles are provided, check if the user's role is allowed
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ error: `Access forbidden: Insufficient role (required: ${roles.join(', ')})` });
      }

      req.user = user;  // Attach the user info to the request object
      next();  // Pass control to the next middleware or route handler
    });
  };
};

module.exports = authenticateJWT;