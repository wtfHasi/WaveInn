const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // Ensures the name is not empty
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Ensures the email is valid
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 128], // Password should be between 8 and 128 characters
    },
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'guest',
    allowNull: false,
    validate: {
      isIn: [['admin', 'guest']], // Restricts roles to 'admin' or 'guest'
    },
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      // Hash the password before saving the user
      const bcrypt = require('bcrypt');
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    },
    beforeUpdate: async (user) => {
      // Only hash the password if it was changed
      if (user.changed('password')) {
        const bcrypt = require('bcrypt');
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
});

// Add instance method to compare passwords
User.prototype.validatePassword = async function (password) {
  const bcrypt = require('bcrypt');
  return await bcrypt.compare(password, this.password);
};

module.exports = User;

