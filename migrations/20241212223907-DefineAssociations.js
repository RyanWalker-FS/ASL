'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {await queryInterface.addColumn('Stars', 'PlanetId', {
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: {
        tableName: 'Planets'
      },
      key: 'id'
    },
    allowNull: true
  })
  await queryInterface.addColumn('Planets', 'StarId', {
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: {
        tableName: 'Stars'
      },
      key: 'id'
    },
    allowNull: true
  })

  await queryInterface.addColumn('Galaxies', 'StarId', {
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: {
        tableName: 'Stars'
      },
      key: 'id'
    },
    allowNull: true
  })

  await queryInterface.addColumn('Stars', 'GalaxyId', {
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: {
        tableName: 'Galaxies'
      },
      key: 'id'
    },
    allowNull: true
  })

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Stars', 'PlanetId')
    await queryInterface.removeColumn('Galaxies', 'StarId')
    await queryInterface.removeColumn('Stars', 'GalaxyId')
    await queryInterface.removeColumn('Planets', 'StarId')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
