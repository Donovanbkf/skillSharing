const { check, body } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");
const Users = require('../models/users');
const {compare} = require('../helpers/handleBcrypt')

const validateUserCreate = [
  check("name").exists().notEmpty(),
  check("username").exists().notEmpty().custom(async (value, {req}) => {
    const user = await Users.findOne({raw:true, where: { username: value } });
    if (user){
      req.status(409)
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

const validateUserLogin = [
    body("username").exists().withMessage('username no recibido').notEmpty(),
    body("password").exists().notEmpty().custom(async (value, {req}) => {
        const user = await Users.findOne({raw:true, where: { username: req.body.username } });
        req.user = user;
        if (!user){
          req.status = 404;
          throw new Error(`User ${req.body.username} dont exists`);
        }else{
          if(!await compare(value, user.password)){
            req.status = 401;
            throw new Error(`Contraseña no valida`);
          }
        }
        return true;
      }),
    (req, res, next) => {
      validateResult(req, res, next);
    },
  ];

module.exports = {validateUserCreate, validateUserLogin}