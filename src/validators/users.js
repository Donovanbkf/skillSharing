const { check } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");
const Users = require('../models/users');

const validateUserCreate = [
  check("name").exists().notEmpty(),
  check("username").exists().notEmpty().custom(async (value, {req}) => {
    const user = await Users.findOne({raw:true, where: { username: value } });
    if (user){
       throw new Error(`User ${value} already exists`);
    }
    return true;
  }),
  check("fullname").exists().notEmpty(),
  check("password").exists().notEmpty(),
  check("role").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {validateUserCreate}