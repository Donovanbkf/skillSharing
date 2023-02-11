const { check, body, validationResult } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");
const Users = require('../models/users');
const {compare} = require('../helpers/handleBcrypt')

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

const validateUserLogin = [
    body("username", "Ingrese username").exists().withMessage('no username').notEmpty().withMessage('esta vacio'),
    body("password").exists().notEmpty().custom(async (value, {req}) => {
        const user = await Users.findOne({raw:true, where: { username: req.body.username } });
        req.user = user;
        if (!user){
           throw new Error(`User ${req.body.username} dont exists`);
        }else{
            if(!await compare(value, user.password)){
                throw new Error(`Contraseña no valida`);
            }
        }
        return true;
      }),
    (req, res, next) => {
      const errors = validationResult(req)
      
      if (!errors.isEmpty()) {
          console.log(req.body)
          const valores = req.body
          const validaciones = errors.array()
          console.log(validaciones)
          res.render('auth/login', {validaciones:validaciones, valores: valores})
      }else{
          res.send('¡Validación Exitosa!')
      }
      
    },
  ];

module.exports = {validateUserCreate, validateUserLogin}