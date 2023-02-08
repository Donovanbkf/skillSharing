const { check } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");

const validateRequestCreate = [
  check("description").exists().notEmpty(),
  check("skill_id").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateRequestEdit = [
  check("description").exists().notEmpty(),
  check("skill_id").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateRequestCreate, validateRequestEdit }