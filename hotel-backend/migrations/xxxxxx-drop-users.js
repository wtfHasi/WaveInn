module.exports = {
    up: async (queryInterface, Sequelize) => {
      // Disable foreign key checks temporarily
      await queryInterface.sequelize.query('PRAGMA foreign_keys = OFF');
  
      // Drop the dependent tables first (Bookings depends on Users)
      await queryInterface.dropTable('Bookings');
      await queryInterface.dropTable('Users');
  
      // Re-enable foreign key checks after the migration
      await queryInterface.sequelize.query('PRAGMA foreign_keys = ON');
  
      // Create Users_backup table with a valid auto-increment id field
      await queryInterface.createTable('Users_backup', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,  // Auto-increment ensures unique ids
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true, // Ensure the email is unique
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        role: {
          type: Sequelize.STRING,
          defaultValue: 'guest',
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
  
      // Clean the Users table to ensure there are no null ids or duplicates before backup
      await queryInterface.sequelize.query(`
        DELETE FROM Users WHERE id IS NULL;  -- Remove any records with null ids
        -- Other cleanup can be added here if there are duplicates
      `);
  
      // Backup data into Users_backup table
      await queryInterface.sequelize.query(`
        INSERT INTO Users_backup (id, name, email, password, role, createdAt, updatedAt)
        SELECT id, name, email, password, role, createdAt, updatedAt
        FROM Users;
      `);
    },
  
    down: async (queryInterface, Sequelize) => {
      // Rollback logic to reverse the changes
      await queryInterface.dropTable('Users_backup');
      await queryInterface.createTable('Users', { 
        // Your original Users schema here 
      });
      await queryInterface.createTable('Bookings', { 
        // Your original Bookings schema here 
      });
    }
  };
  