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
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    asignature: {
      allowNull: false,
      type: DataTypes.ENUM(["mates", "castellano", "ingles", "valenciano", "programacion"]),
      unique: 'asignature_level'
    },
    level: {
      allowNull: false,
      type: DataTypes.ENUM(["principiante", "intermedio", "avanzado"]),
      unique: 'asignature_level'
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['asignature', 'level']
      }
    ]
  },
  {
    timestamps: true,
  }
);

Skills.sync({force: false})

module.exports = Skills;
