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
      unique: true,
    },
    fullname: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    saldo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM(["admin", "user"]),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

Users.sync({force: false}) // sync crear la tabla, force=true elimina la tabla si ya existia


module.exports = Users;
