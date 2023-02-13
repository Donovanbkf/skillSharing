const { body } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");
const Users = require('../models/users');
const {compare} = require('../helpers/handleBcrypt')

const validateUserCreate = [
  body("name").exists().withMessage('name no recibido').isLength({min:5, max:20}).withMessage('tamaño incorrecto'),
  body("username").exists().withMessage('username no recibido').isLength({min:5, max:20}).withMessage('tamaño incorrecto').custom(async (value, {req}) => {
    const user = await Users.findOne({raw:true, where: { username: value } });
    if (user){
      req.status = 409
      throw new Error(`User ${value} already exists`);
    }
    return true;
  }),
  body("fullname").exists().withMessage('fullname no recibido').notEmpty().isLength({min:5, max:20}).withMessage('tamaño incorrecto'),
  body("password").exists().withMessage('password no recibido').notEmpty(),
  body("role").isIn(["user", "admin"]).exists().withMessage('role no recibido'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateUserLogin = [
    body("username").exists().withMessage('username no recibido').notEmpty().withMessage('username vacío').custom(async (value, {req}) => {
      const user = await Users.findOne({raw:true, where: { username: value } });
      req.user = user;
      if (!user){
        req.status = 404
        throw new Error(`User ${value} dont exists`);
      }
      return true;
    }),
    body("password").exists().withMessage('password no recibido').notEmpty().custom(async (value, {req}) => {
      const user = req.user;
      if(!await compare(value, user.password)){
        req.status = 401;
        throw new Error(`Contraseña no valida`);
      }     
      return true;
      }),
    (req, res, next) => {
      validateResult(req, res, next);
    },
  ];

module.exports = {validateUserCreate, validateUserLogin}