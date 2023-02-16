const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");
const Users = require("./users");
const Skills = require("./skills");

const Responses = sequelize.define(
  "Responses",
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
    skill_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        // This is a reference to another model
        model: Skills,
        // This is the column name of the referenced model
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // This is a reference to another model
        model: Users,
        // This is the column name of the referenced model
        key: 'id'
      }
    }
  },
  {
    timestamps: true,
  }
);

Responses.sync({force: false})

module.exports = Responses;
