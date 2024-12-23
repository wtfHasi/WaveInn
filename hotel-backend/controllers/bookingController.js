const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { Op } = require('sequelize'); // Import Op for querying with conditions

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({ include: Room });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

const createBooking = async (req, res) => {
  const { userId, roomId, startDate, endDate } = req.body;

  // Input validation
  if (!userId || !roomId || !startDate || !endDate) {
    return res.status(400).json({ message: 'All fields (userId, roomId, startDate, endDate) are required' });
  }

  if (new Date(startDate) >= new Date(endDate)) {
    return res.status(400).json({ message: 'Start date must be before end date' });
  }

  try {
    // Check room availability
    const room = await Room.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (room.availability !== true) {
      return res.status(400).json({ message: 'Room is not available for booking' });
    }

    // Check for overlapping bookings
    const overlappingBookings = await Booking.findOne({
      where: {
        roomId,
        [Op.and]: [
          { start_date: { [Op.lt]: endDate } },  // Start date is before the requested end date
          { end_date: { [Op.gt]: startDate } },  // End date is after the requested start date
        ],
      },
    });

    if (overlappingBookings) {
      return res.status(400).json({ message: 'Room is already booked for the specified date range' });
    }

    // Calculate total price
    const totalPrice = ((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) * room.price;

    // Create booking
    const booking = await Booking.create({ userId, roomId, start_date: startDate, end_date: endDate, totalPrice });

    // Update room availability
    room.availability = false; // Room is no longer available
    await room.save();

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'An error occurred while creating the booking', error });
  }
};

module.exports = { getAllBookings, createBooking };

