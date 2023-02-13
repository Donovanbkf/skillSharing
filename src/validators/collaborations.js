const { check, body, param } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");


const validateCollaborationCreate = [
  body("description").exists().withMessage("description no recibido").notEmpty().withMessage("description vacío"),
  body("skill_id").exists().withMessage("skill_id no recibido").notEmpty().withMessage("skill_id vacío"),
  (req, res, next) => {
    console.log(req.user)
    validateResult(req, res, next);
  },
];

const validateCollaborationEdit = [
  body("description").exists().withMessage("description no recibido").notEmpty().withMessage("description vacío"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateCollaborationCreate, validateCollaborationEdit }