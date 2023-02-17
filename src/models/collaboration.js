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
    user_id_req: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // This is a reference to another model
        model: Users,
        // This is the column name of the referenced model
        key: 'id'
      }
    },
    user_id_res: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // This is a reference to another model
        model: Users,
        // This is the column name of the referenced model
        key: 'id'
      }
    },
    state: {
      allowNull: false,
      type: DataTypes.ENUM(["iniciado", "terminado"]),
      defaultValue: "iniciado",
    }
  },
  {
    timestamps: true,
  }
);

Collaborations.sync({force: false})

module.exports = Collaborations;
