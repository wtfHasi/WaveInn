// routes/bookingRoutes.js
const express = require('express');
const { getAllBookings, createBooking } = require('../controllers/bookingController');

const router = express.Router();

router.get('/', getAllBookings);
router.post('/', createBooking);

module.exports = router;
