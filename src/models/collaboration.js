const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");
const Skills = require("./skills");
const Users = require("./users");

const Collaborations = sequelize.define(
  "Collaborations",
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
    user_id_req: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: Users,
        // This is the column name of the referenced model
        key: 'id'
      }
    },
    user_id_res: {
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

Collaborations.sync({force: false})

module.exports = Collaborations;
