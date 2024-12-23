require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false, // Disable logging if not needed
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:', // Use in-memory SQLite for tests
    logging: false,
  },
  production: {
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
  },
};
