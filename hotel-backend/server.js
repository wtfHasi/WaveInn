// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database'); // Your Sequelize configuration
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const roomsRoutes = require('./routes/roomsRoutes'); // Import rooms routes
const bookingsRoutes = require('./routes/bookingsRoutes'); // Import bookings routes

// Initialize dotenv to load environment variables
dotenv.config();

// Create an Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // If handling form data

// Test Database Connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully');
    return sequelize.sync({ alter: true }); // Sync database models
  })
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((err) => console.error('Unable to connect to the database:', err));

// Use authentication routes
app.use('/api/auth', authRoutes); // All authentication routes will be prefixed with /api/auth

// Use rooms and bookings routes
app.use('/api/rooms', roomsRoutes); // All room-related routes
app.use('/api/bookings', bookingsRoutes); // All booking-related routes

// Define a basic route for testing
app.get('/', (req, res) => {
  res.send('Express server is running and connected to the database!');
});

// Error handling middleware (must be placed after all routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong, please try again later' });
});

// Set the port from environment variables or use 5000 by default
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


