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
      type: DataTypes.STRING,
    },
    skill_id: {
      type: DataTypes.INTEGER,

      references: {
        // This is a reference to another model
        model: Skills,
        // This is the column name of the referenced model
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
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