const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");
const Skills = require("./skills");
const Users = require("./users");

const Requests = sequelize.define(
  "Requests",
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    skill_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

Requests.sync({force: false})

module.exports = Requests;
