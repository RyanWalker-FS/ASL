const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const Star = require("./Star");

class Planet extends Model {}

Planet.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Planet",
  }
);

Planet.belongsToMany(Star, { through: "StarsPlanets" });
Star.belongsToMany(Planet, { through: "StarsPlanets" });

module.exports = Planet;
