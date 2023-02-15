const { body, param } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");
const Requests = require('../models/requests');


const validateRequestCreate = [
  body("description").exists().withMessage("description no recibido").notEmpty().withMessage("description vacío"),
  body("skill_id").exists().withMessage("skill_id no recibido").notEmpty().withMessage("skill_id vacío"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateRequestEdit = [
  body("description").exists().withMessage("description no recibido").notEmpty().withMessage("description vacío"),
  body("skill_id").exists().withMessage("skill_id no recibido").notEmpty().withMessage("skill_id vacío").isInt(),
  param("id").exists().withMessage("id no recibido").notEmpty().withMessage("id vacío").custom(async (value, {req}) => {
    const requests = await Requests.findOne({raw:true, where: { id : value } });
    if (requests == null) {
      req.status = 404
      throw new Error(`Request actual no existe`);
    }else if (requests.user_id != req.user.id ){
      req.status = 403
      throw new Error(`Request actual no te pertenece`);
    }
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateRequestCreate, validateRequestEdit }