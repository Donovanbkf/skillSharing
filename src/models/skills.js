const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");

const Skills = sequelize.define(
  "skills",
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    asignature: {
      type: DataTypes.ENUM(["mates", "castellano", "ingles", "valenciano", "programacion"]),
    },
  },
  {
    timestamps: true,
  }
);

Skills.sync({force: false})

module.exports = Skills;
