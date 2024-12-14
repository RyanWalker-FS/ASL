'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StarPlanet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    StarPlanet.belongsTo(models.Star,  { foreignKey: 'starId' });
    StarPlanet.belongsTo(models.Planet,  { foreignKey: 'planetId' });
      // define association here
    }
  }
  StarPlanet.init({
    StarId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Stars', // Table name for Star
        key: 'id',      // Primary key in Star table
      }
    },
    PlanetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Planets', // Table name for Planet
        key: 'id',        // Primary key in Planet table
      }
    }
  }, {
    sequelize,
    modelName: 'starplanets',
  });
  return StarPlanet;
};