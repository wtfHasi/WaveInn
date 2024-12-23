const express = require('express');
const { getAllRooms, addRoom, updateRoomStatus, deleteRoom } = require('../controllers/roomController');
const authenticateJWT = require('../middleware/authMiddleware'); // Import the authentication middleware

const router = express.Router();

// Fetch all rooms (accessible by both guests and admins)
router.get('/', getAllRooms);

// Add a new room (only accessible by admin)
router.post('/', authenticateJWT(['admin']), addRoom);

// Update room status (availability) (only accessible by admin)
router.patch('/:roomId/status', authenticateJWT(['admin']), updateRoomStatus);

// Delete room (only accessible by admin)
router.delete('/:roomId', authenticateJWT(['admin']), deleteRoom);

module.exports = router;