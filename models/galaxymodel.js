const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Galaxy extends Model {}

Galaxy.init(
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
    modelName: "Galaxy",
  }
);

module.exports = Galaxy;
