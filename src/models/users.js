const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");

const Users = sequelize.define(
  "users",
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    fullname: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM(["skp", "user"]),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

Users.sync({force: false}) // sync crear la tabla, force=true elimina la tabla si ya existia


module.exports = Users;
