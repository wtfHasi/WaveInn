const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const authenticateJWT = require('../middleware/authMiddleware'); // Import the auth middleware

const router = express.Router();

// Route for user registration - anyone can register, no authentication needed
router.post('/register', registerUser);

// Route for user login - anyone can log in, no authentication needed
router.post('/login', loginUser);

// Example of a protected route that only an authenticated user can access
// Add your protected route logic here
router.get('/profile', authenticateJWT(['guest', 'admin']), (req, res) => {
  res.json({ message: 'Welcome to your profile', user: req.user });
});

// Example of a route that only an admin user can access
router.get('/admin-dashboard', authenticateJWT(['admin']), (req, res) => {
  res.json({ message: 'Welcome Admin!' });
});

module.exports = router;

