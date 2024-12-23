require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Path to your SQLite database file
  logging: console.log, // Optional: log SQL queries for debugging
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Enable foreign key constraints
sequelize.query('PRAGMA foreign_keys = ON')
  .then(() => {
    console.log('Foreign key constraints are enabled');
  })
  .catch((err) => {
    console.error('Error enabling foreign key constraints:', err);
  });

module.exports = sequelize;


