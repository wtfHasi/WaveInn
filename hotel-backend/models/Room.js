const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import Sequelize instance

const Room = sequelize.define('Room', {
  room_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure each room name is unique
  },
  type: { // Add type field
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0, // Ensure price is non-negative
    },
  },
  availability: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // Default availability is true (room is available)
  },
});

module.exports = Room;



