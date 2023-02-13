const { body } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");

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
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateResponseCreate, validateResponseEdit }