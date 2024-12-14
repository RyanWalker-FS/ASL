'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StarPlanet', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      starId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Stars', // Name of the referenced table
          key: 'id',      // Primary key in the Stars table
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
      },
        planetId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Planets', // Name of the referenced table
            key: 'id',        // Primary key in the Planets table
          },
          onDelete: 'CASCADE', 
          onUpdate: 'CASCADE'},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StarPlanet');
  }
};