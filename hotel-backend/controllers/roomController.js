const Room = require('../models/Room');
const authenticateJWT = require('../middleware/authMiddleware'); // Import the middleware

// Fetch all rooms - Available for all users
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'An error occurred while fetching rooms', error });
  }
};

// Add a new room - Admin only
const addRoom = async (req, res) => {
  const { room_name, type, price, availability } = req.body;

  // Validate required fields
  if (!room_name || !type || !price) {
    return res.status(400).json({ message: 'Room name, type, and price are required' });
  }

  try {
    // Only allow admin users to add rooms
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied: Admin only' });
    }

    const room = await Room.create({ room_name, type, price, availability });
    res.status(201).json({ message: 'Room added successfully', room });
  } catch (error) {
    console.error('Error adding room:', error);
    res.status(500).json({ message: 'An error occurred while adding the room', error });
  }
};

// Update room properties - Admin only
const updateRoomStatus = async (req, res) => {
  const { roomId } = req.params;
  const { room_name, type, price, availability } = req.body;

  // Ensure at least one field to update is provided
  if (!room_name && !type && price === undefined && availability === undefined) {
    return res.status(400).json({ message: 'At least one field must be provided to update' });
  }

  try {
    // Only allow admin users to update rooms
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied: Admin only' });
    }

    const room = await Room.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Update the fields only if they are provided in the request body
    if (room_name !== undefined) room.room_name = room_name;
    if (type !== undefined) room.type = type;
    if (price !== undefined) room.price = price;
    if (availability !== undefined) room.availability = availability;

    await room.save(); // Save the updated room
    res.status(200).json({ message: 'Room updated successfully', room });
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ message: 'An error occurred while updating the room', error });
  }
};

// Delete a room - Admin only
const deleteRoom = async (req, res) => {
  const { roomId } = req.params;

  try {
    // Only allow admin users to delete rooms
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied: Admin only' });
    }

    const room = await Room.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    await room.destroy();
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ message: 'An error occurred while deleting the room', error });
  }
};

// Ensure all controller functions are exported
module.exports = { getAllRooms, addRoom, updateRoomStatus, deleteRoom };