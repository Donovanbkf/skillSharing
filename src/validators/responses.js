const { body, param } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");
const Responses = require('../models/response');

const validateResponseCreate = [
  body("description").exists().withMessage("description no recibido").notEmpty().withMessage("description vacío"),
  body("skill_id").exists().withMessage("skill_id no recibido").notEmpty().withMessage("skill_id vacío"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateResponseEdit = [
  body("description").exists().withMessage("description no recibido").notEmpty().withMessage("description vacío"),
  body("skill_id").exists().withMessage("skill_id no recibido").notEmpty().withMessage("skill_id vacío"),
  param("id").exists().withMessage("id no recibido").notEmpty().withMessage("id vacío").custom(async (value, {req}) => {
    const response = await Responses.findOne({raw:true, where: { id : value } });
    if (response == null) {
      req.status = 404
      throw new Error(`response actual no existe`);
    }else if (response.user_id != req.user.id){
      req.status = 403
      throw new Error(`response actual no te pertenece`);
    }
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateResponseCreate, validateResponseEdit }