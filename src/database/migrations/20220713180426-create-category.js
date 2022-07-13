'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('Categories', { 
      id: {
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      }
     }, {timeStamps: false});

  },

  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.dropTable('Categories');

  }
};

