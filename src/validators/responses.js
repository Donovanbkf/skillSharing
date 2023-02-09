const { check } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");

const validateResponseCreate = [
  check("description").exists().notEmpty(),
  check("skill_id").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateResponseEdit = [
  check("description").exists().notEmpty(),
  check("skill_id").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateResponseCreate, validateResponseEdit }