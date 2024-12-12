const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class StarsPlanets extends Model {}

StarsPlanets.init(
  {
    starId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    planetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "StarsPlanets",
  }
);

module.exports = StarsPlanets;
