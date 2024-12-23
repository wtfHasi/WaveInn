const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Assuming a User model exists
const Room = require('./Room'); // Room model

const Booking = sequelize.define('Booking', {
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true, // Ensure a valid date format
    },
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isAfterStartDate(value) {
        if (this.start_date && value <= this.start_date) {
          throw new Error('End date must be after the start date');
        }
      },
    },
  },
});

// Define relationships
User.hasMany(Booking, { foreignKey: 'userId', onDelete: 'CASCADE' });
Booking.belongsTo(User, { foreignKey: 'userId' });

Room.hasMany(Booking, { foreignKey: 'roomId', onDelete: 'CASCADE' });
Booking.belongsTo(Room, { foreignKey: 'roomId' });

module.exports = Booking;

