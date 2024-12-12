const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const Galaxy = require("./Galaxy");

class Star extends Model {}

Star.init(
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
    modelName: "Star",
  }
);

Star.belongsTo(Galaxy);
Galaxy.hasMany(Star);

module.exports = Star;
