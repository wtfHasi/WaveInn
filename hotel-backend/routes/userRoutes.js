const express = require('express');
const { deleteUser } = require('../controllers/authController'); // Adjust path as needed
const authenticateJWT = require('../middleware/authMiddleware'); // Ensure only authorized users can delete

const router = express.Router();

// Route to delete a user by ID
router.delete('/delete/:id', authenticateJWT, deleteUser);

module.exports = router;
